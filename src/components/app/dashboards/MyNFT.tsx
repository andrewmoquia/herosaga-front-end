import { useEffect, useCallback, useContext, useState } from 'react'
import axios from 'axios'
import { MainStore } from '../../reduceStore/StoreProvider'
import { runDispatch } from '../../actions/dispatch'
import { useLocation, useHistory } from 'react-router'
import NFTCard from '../microsite/NFTCard'
import { Link } from 'react-router-dom'
import s from '../../../../scss/main.css'
import { v4 as uuidv4 } from 'uuid'
import { LoadingSVG } from '../misc/svg'
import { config } from '../../../api'

const { GET_ALL_NFT } = config

export default function MyNFT() {
   const { state, dispatch } = useContext(MainStore)
   const {
      userNFTs,
      filters,
      userQueryFilters,
      isFetchingNFT,
      searchParamsOnLoad,
      userNFTfilterData,
      isFetchingFailed,
      myNFTPages,
      myNFTMinPage,
      myNFTMaxPage,
   } = state
   const { nfts, nftTotal, totalPage, page } = userNFTs

   const history = useHistory()
   const location = useLocation()

   const [currDDFilter, setCurrDDFilter] = useState('')
   const [activeDropdownFilter, setActiveDropdownFilter] = useState(false)

   //Open options in dropdown in css when filter is actived
   const handleDDFilterAnim = (selectedDDFilter: any) => {
      setActiveDropdownFilter(!activeDropdownFilter)
      setCurrDDFilter(selectedDDFilter)
   }

   //Handle query value changes on user selections in filter drop down
   const handleSetFilter = useCallback(
      (props: any) => {
         const { rarity, sort, page } = props
         if (rarity) {
            rarity.toLowerCase() != 'all'
               ? runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { rarity: rarity.charAt(0).toUpperCase() + rarity.slice(1) },
                    userQueryFilters: {
                       ...userQueryFilters,
                       rarity: rarity.toLowerCase(),
                       page: 1,
                       myNFTMinPage: 1,
                       myNFTMaxPage: 5,
                    },
                 })
               : runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { rarity: rarity.charAt(0).toUpperCase() + rarity.slice(1) },
                    userQueryFilters: { ...userQueryFilters, rarity: 'all', page: 1 },
                    myNFTMinPage: 1,
                    myNFTMaxPage: 5,
                 })
         }
         if (sort) {
            sort === 'For Sale' || sort === '-isForSale'
               ? runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { sort: 'For Sale' },
                    userQueryFilters: { ...userQueryFilters, sort: '-isForSale', page: 1 },
                    myNFTMinPage: 1,
                    myNFTMaxPage: 5,
                 })
               : sort === 'Not For Sale' || sort === 'isForSale'
               ? runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { sort: 'Not For Sale' },
                    userQueryFilters: { ...userQueryFilters, sort: 'isForSale', page: 1 },
                    myNFTMinPage: 1,
                    myNFTMaxPage: 5,
                 })
               : runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { sort: 'All' },
                    userQueryFilters: { ...userQueryFilters, sort: 'all', page: 1 },
                    myNFTMinPage: 1,
                    myNFTMaxPage: 5,
                 })
         }
         if (page) {
            if (page == 1) {
               runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                  filters: { page: page },
                  myNFTMinPage: 1,
                  myNFTMaxPage: 5,
                  userQueryFilters: { ...userQueryFilters, page },
               })
            } else {
               runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                  filters: { page: page },
                  userQueryFilters: { ...userQueryFilters, page },
               })
            }
         }
         return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
            isFetchingNFT: true,
         })
      },
      [dispatch, userQueryFilters]
   )

   //Create url query
   const createURLSearchParams = useCallback(() => {
      const queriesFilter: any = {}
      Object.keys(userQueryFilters).map((item) => {
         if (userQueryFilters[item] && userQueryFilters[item] !== 'all') {
            return userQueryFilters[item] == 'latest'
               ? (queriesFilter[item] = '-dateMinted')
               : userQueryFilters[item] == 'oldest'
               ? (queriesFilter[item] = 'dateMinted')
               : userQueryFilters[item] == 'highest price'
               ? (queriesFilter[item] = '-sellPrice')
               : userQueryFilters[item] == 'lowest price'
               ? (queriesFilter[item] = 'sellPrice')
               : (queriesFilter[item] = userQueryFilters[item])
         }
      })
      return new URLSearchParams(queriesFilter)
   }, [userQueryFilters])

   //Update search params in browser
   const handleSetURLSearchParams = useCallback(() => {
      const searchParams: any = createURLSearchParams()
      const params = new URLSearchParams(searchParams)
      history.replace({ pathname: location.pathname, search: params.toString() })
   }, [history, location.pathname, createURLSearchParams])

   //Fetch nfts
   const getUserNFTs = useCallback(() => {
      const queryParams = createURLSearchParams()
      axios
         .get(`${GET_ALL_NFT}/?${queryParams.toString()}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { status, payload } = res.data
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingNFT: false,
                  userNFTs: payload,
               })
            } else if (status === 204) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingNFT: false,
                  isFetchingFailed: true,
               })
            } else {
               runDispatch(dispatch, 'SET_NOTIF_STATUS', {
                  notif: {
                     id: uuidv4(),
                     type: 'error',
                     message: 'Something went wrong. Please try again later',
                  },
               })
            }
         })
         .catch(() => {
            runDispatch(dispatch, 'SET_NOTIF_STATUS', {
               notif: {
                  id: uuidv4(),
                  type: 'error',
                  message: 'Something went wrong. Please try again later',
               },
            })
         })
      return handleSetURLSearchParams()
   }, [dispatch, handleSetURLSearchParams, createURLSearchParams])

   //If query is updated fetch the data based on changes
   useEffect(() => {
      if (isFetchingNFT) {
         runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
            isFetchingFailed: false,
         })
         getUserNFTs()
      }
   }, [dispatch, isFetchingNFT, getUserNFTs])

   //Check url query on firt time website load
   useEffect(() => {
      if (searchParamsOnLoad) {
         if (location.search != '') {
            const query = new URLSearchParams(location.search)
            const queries: any = {
               rarity: query.get('rarity'),
               sort: query.get('sort'),
               page: query.get('page'),
            }
            const queriesFilter: any = {}
            Object.keys(queries).map((item) => {
               if (queries[item]) {
                  queriesFilter[item] = queries[item]
               }
            })
            runDispatch(dispatch, 'SEARCH_PARAMS_ON_L0AD_DONE', '')
            runDispatch(dispatch, 'UPDATE_QUERY_FILTER', { userQueryFilters: queriesFilter })
            return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
         } else {
            getUserNFTs()
         }
      }
   }, [dispatch, getUserNFTs, location.search, searchParamsOnLoad])

   //Close dropdown when click to other elem when dropdown is open
   useEffect(() => {
      const body: any = document.getElementById('root')
      if (activeDropdownFilter) {
         const handleSetSelect = (e: any): any => {
            e.stopImmediatePropagation()
            e.stopPropagation()
            if (
               e.target.className === 'custom_select_options' ||
               e.target.className === 'custom_select_options active'
            ) {
            } else {
               setActiveDropdownFilter(!activeDropdownFilter)
            }
            body.onclick = null
         }
         body.onclick = (e: any) => handleSetSelect(e)
      }
      //Prevent memory leak
      return () => {
         body.onclick = null
      }
   }, [activeDropdownFilter])

   const props = {
      nfts,
      nftTotal,
      totalPage,
      page,
      filterData: userNFTfilterData,
      currDDFilter,
      activeDropdownFilter,
      filters,
      handleDDFilterAnim,
      handleSetFilter,
      minPage: myNFTMinPage,
      maxPage: myNFTMaxPage,
      pages: myNFTPages,
      dashboard: 'myNFT',
   }

   return (
      <section className={s.main_bg}>
         <div className={s.mynft_container}>
            <CreateNFTFIlter {...props} />
            <div className={s.user_nfts_cont}>
               <div className={s.user_nfts_cards}>
                  {isFetchingFailed && (
                     <div className={s.no_nft_found_for_myNFT}>No NFT found.</div>
                  )}
                  {isFetchingNFT && (
                     <div className={s.loading_container_for_myNFT}>
                        <LoadingSVG />
                     </div>
                  )}
                  {nfts && !isFetchingNFT
                     ? nfts.map((nft: any) => {
                          return (
                             <Link
                                key={nft._id}
                                to={`/myNFT/nft/${nft._id}`}
                                className={s.nft_link}
                             >
                                <NFTCard type="Sell" data={nft} />
                             </Link>
                          )
                       })
                     : null}
               </div>
            </div>
            <CreateCustomPagination />
         </div>
      </section>
   )
}

function CreateNFTFIlter(props: any) {
   const {
      nftTotal,
      handleDDFilterAnim,
      filterData,
      filters,
      currDDFilter,
      activeDropdownFilter,
      handleSetFilter,
   } = props

   return (
      <div className={s.user_nfts_filter_cont}>
         <div className={s.user_nfts_filter}>
            <div className={s.filter_total_heroes}>
               <span></span>
               <p>{`Heroes Owned: ${nftTotal ? nftTotal : 0}`}</p>
            </div>
            <div className={s.filter_selection}>
               <span></span>
               <div className={s.filter_selection_cont}>
                  <p>Filter:</p>
                  {filterData.map((filterSelect: any) => {
                     const { filterType, options } = filterSelect
                     return (
                        <div className={s.custom_select} key={filterType}>
                           <div
                              className={s.custom_option_selected}
                              onClick={() => handleDDFilterAnim(filterType)}
                           >
                              {!filters[filterType]
                                 ? filterType.charAt(0).toUpperCase() + filterType.slice(1)
                                 : filters[filterType]}
                           </div>
                           <div
                              className={`${s.custom_select_options} ${
                                 currDDFilter === filterType && activeDropdownFilter ? s.active : ''
                              }`}
                           >
                              {options.map((option: any) => {
                                 return (
                                    <div
                                       className={s.custom_select_option}
                                       onClick={() => handleSetFilter({ [filterType]: option })}
                                       key={option}
                                    >
                                       {option}
                                    </div>
                                 )
                              })}
                           </div>
                           <div className={s.custom_arrow}></div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

function CreateCustomPagination() {
   const { state, dispatch } = useContext(MainStore)
   const { userNFTs, myNFTPages, myNFTMinPage, myNFTMaxPage, userQueryFilters } = state
   const { totalPage, page } = userNFTs

   const handlePagiMovePage = (action: any) => {
      if (action === 'next' && myNFTMaxPage < myNFTPages[myNFTPages.length - 1]) {
         return runDispatch(dispatch, 'INC_USER_NFT_PAGES', {
            myNFTMinPage: myNFTMinPage + 5,
            myNFTMaxPage: myNFTMaxPage + 5,
         })
      }
      if (action === 'back' && myNFTMinPage > 1) {
         return runDispatch(dispatch, 'DEC_USER_NFT_PAGES', {
            myNFTMinPage: myNFTMinPage - 5,
            myNFTMaxPage: myNFTMaxPage - 5,
         })
      }
   }

   const handleGoToPage = (props: any) => {
      const { page } = props
      if (page == 1) {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            myNFTMinPage: 1,
            myNFTMaxPage: 5,
            userQueryFilters: { ...userQueryFilters, page },
         })
      } else {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            userQueryFilters: { ...userQueryFilters, page },
         })
      }
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
   }

   //Create an array of page num for pagination to make
   const handleSetPages = useCallback(() => {
      const tempPages: any = []
      //Add page to the pages array
      for (let i = 1; i <= totalPage; i++) {
         if (myNFTPages.length != totalPage) {
            tempPages.push(i)
         }
      }

      //If pages array match to the totalPage from the request set it
      const calculateMaxPage = Math.ceil(page / 5) * 5
      const calculateMinPage = calculateMaxPage - 5
      if (tempPages.length === totalPage) {
         runDispatch(dispatch, 'SET_USER_NFT_PAGES', {
            myNFTPages: tempPages,
            myNFTMaxPage: calculateMaxPage,
            myNFTMinPage: calculateMinPage + 1,
         })
      }
   }, [dispatch, myNFTPages.length, page, totalPage])

   //If new nfts data were loaded, update page array data for pagination
   useEffect(() => {
      if (userNFTs) {
         handleSetPages()
      }
   }, [userNFTs, handleSetPages])

   return (
      <div className={s.pagination_control}>
         <button className={s.pagi_button} onClick={() => handlePagiMovePage('back')}>
            &#60;
         </button>
         <div
            key={1}
            className={`${s.pagi_num} ${page == 1 ? s.active_page : ''}`}
            onClick={() => handleGoToPage({ page: 1 })}
         >
            1
         </div>
         {myNFTMinPage > 5 && <div>...</div>}
         {myNFTPages.map((pageNum: any) => {
            if (pageNum >= myNFTMinPage && pageNum <= myNFTMaxPage && pageNum !== 1) {
               return (
                  <div
                     key={pageNum}
                     className={`${s.pagi_num} ${page == pageNum ? s.active_page : ''}`}
                     onClick={() => handleGoToPage({ page: pageNum })}
                  >
                     {pageNum}
                  </div>
               )
            }
         })}
         <button className={s.pagi_button} onClick={() => handlePagiMovePage('next')}>
            &#62;
         </button>
      </div>
   )
}
