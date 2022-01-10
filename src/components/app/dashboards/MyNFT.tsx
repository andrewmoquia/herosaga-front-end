import { useEffect, useCallback, useContext, useState, useMemo } from 'react'
import axios from 'axios'
import { MainStore } from '../../reduceStore/StoreProvider'
import { runDispatch } from '../../actions/dispatch'
import { useLocation, useHistory } from 'react-router'
import Pagination from '../microsite/Pagination'
import NFTCard from '../microsite/NFTCard'
import { filterData } from '../../data/filtersData'
import { Link } from 'react-router-dom'

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
      <div className="user-nfts-filter-cont">
         <div className="user-nfts-filter">
            <div className="filter-total-heroes">
               <span></span>
               <p>{`Heroes Owned: ${nftTotal ? nftTotal : 0}`}</p>
            </div>
            <div className="filter-selection">
               <span></span>
               <div className="filter-selection-cont">
                  <p>Filter:</p>
                  {filterData.map((filterSelect: any) => {
                     const { filterType, options } = filterSelect
                     return (
                        <div className="custom-select" key={filterType}>
                           <div
                              className="custom-option-selected"
                              onClick={() => handleDDFilterAnim(filterType)}
                           >
                              {!filters[filterType]
                                 ? filterType.charAt(0).toUpperCase() + filterType.slice(1)
                                 : filters[filterType]}
                           </div>
                           <div
                              className={`custom-select-options ${
                                 currDDFilter === filterType && activeDropdownFilter ? 'active' : ''
                              }`}
                           >
                              {options.map((option: any) => {
                                 return (
                                    <div
                                       className="custom-select-option"
                                       onClick={() => handleSetFilter({ [filterType]: option })}
                                       key={option}
                                    >
                                       {option}
                                    </div>
                                 )
                              })}
                           </div>
                           <div className="custom-arrow"></div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default function MyNFT() {
   const { state, dispatch } = useContext(MainStore)
   const {
      userNFTs,
      filters,
      userQueryFilters,
      isFetchingNFT,
      searchParamsOnLoad,
      isFetchingFailed,
   } = state
   const { nfts, nftTotal, totalPage, page } = userNFTs

   const emptyNFTs = useMemo(() => {
      return {
         nbhits: 0,
         nftTotal: 0,
         nfts: [],
         totalPage: 1,
      }
   }, [])

   const fetchingStart = useMemo(() => {
      return {
         isFetchingNFT: true,
         updateURLSearchParams: true,
      }
   }, [])

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
                    },
                    userNFTs: emptyNFTs,
                 })
               : runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { rarity: rarity.charAt(0).toUpperCase() + rarity.slice(1) },
                    userQueryFilters: { ...userQueryFilters, rarity: 'all', page: 1 },
                    userNFTs: emptyNFTs,
                 })
         }
         if (sort) {
            sort === 'For Sale' || sort === '-isForSale'
               ? runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { sort: 'For Sale' },
                    userQueryFilters: { ...userQueryFilters, sort: '-isForSale', page: 1 },
                    userNFTs: emptyNFTs,
                 })
               : sort === 'Not For Sale' || sort === 'isForSale'
               ? runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { sort: 'Not For Sale' },
                    userQueryFilters: { ...userQueryFilters, sort: 'isForSale', page: 1 },
                    userNFTs: emptyNFTs,
                 })
               : runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
                    filters: { sort: 'All' },
                    userQueryFilters: { ...userQueryFilters, sort: 'all', page: 1 },
                    userNFTs: emptyNFTs,
                 })
         }
         if (page) {
            runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
               filters: { page: page },
               userQueryFilters: { ...userQueryFilters, page },
            })
         }
         return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
      },
      [dispatch, emptyNFTs, fetchingStart, userQueryFilters]
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
         .get(`http://localhost:5000/user/nft/get-all/?${queryParams.toString()}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { status, payload } = res.data
            console.log(res.data)
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingNFT: false,
                  userNFTs: payload,
               })
            }
            if (status === 204) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingNFT: false,
                  userNFTs: emptyNFTs,
                  isFetchingFailed: true,
               })
            }
         })
         .catch((err) => {
            console.log(err)
         })
      return handleSetURLSearchParams()
   }, [dispatch, handleSetURLSearchParams, createURLSearchParams, emptyNFTs])

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
            return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
         } else {
            getUserNFTs()
         }
      }
   }, [dispatch, fetchingStart, getUserNFTs, location.search, searchParamsOnLoad])

   //Close dropdown when click to other elem when dropdown is open
   useEffect(() => {
      const body: any = document.getElementById('root')
      if (activeDropdownFilter) {
         const handleSetSelect = (e: any): any => {
            e.stopImmediatePropagation()
            e.stopPropagation()
            if (
               e.target.className === 'custom-select-options' ||
               e.target.className === 'custom-select-options active'
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
      filterData,
      currDDFilter,
      activeDropdownFilter,
      filters,
      handleDDFilterAnim,
      handleSetFilter,
   }

   return (
      <section className="main-bg">
         <div className="mynft-container">
            <CreateNFTFIlter {...props} />
            <div className="user-nfts-cont">
               <div className="user-nfts-cards">
                  {isFetchingFailed && <div className="no-nft-found-for-myNFT ">No NFT found.</div>}
                  {isFetchingNFT && (
                     <div className="loading-container-for-myNFT">
                        <svg
                           version="1.1"
                           id="L4"
                           xmlns="http://www.w3.org/2000/svg"
                           xmlnsXlink="http://www.w3.org/1999/xlink"
                           x="0px"
                           y="0px"
                           viewBox="0 0 100 100"
                           enableBackground="new 0 0 0 0"
                           xmlSpace="preserve"
                        >
                           <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                              <animate
                                 attributeName="opacity"
                                 dur="1s"
                                 values="0;1;0"
                                 repeatCount="indefinite"
                                 begin="0.1"
                              ></animate>
                           </circle>
                           <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                              <animate
                                 attributeName="opacity"
                                 dur="1s"
                                 values="0;1;0"
                                 repeatCount="indefinite"
                                 begin="0.2"
                              ></animate>
                           </circle>
                           <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                              <animate
                                 attributeName="opacity"
                                 dur="1s"
                                 values="0;1;0"
                                 repeatCount="indefinite"
                                 begin="0.3"
                              ></animate>
                           </circle>
                        </svg>
                     </div>
                  )}
                  {nfts && !isFetchingNFT
                     ? nfts.map((nft: any) => {
                          return (
                             <Link key={nft._id} to={`/myNFT/nft/${nft._id}`} className="nft-link">
                                <NFTCard type="Sell" data={nft} />
                             </Link>
                          )
                       })
                     : null}
               </div>
            </div>
            <Pagination {...props} />
         </div>
      </section>
   )
}
