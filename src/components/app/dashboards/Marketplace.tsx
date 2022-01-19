import { runDispatch } from '../../actions/dispatch'
import { useContext, useEffect, useCallback, useState, useMemo } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import axios from 'axios'
import { useLocation, useHistory } from 'react-router'
import NFTCard from '../microsite/NFTCard'
import { Link } from 'react-router-dom'
import s from '../../../../scss/main.css'
import { v4 as uuidv4 } from 'uuid'
import { LoadingSVG } from '../misc/svg'
import { config } from '../../../api'

const { GET_MP_NFT } = config

export default function Marketplace() {
   const [resetFilter, setResetFilter] = useState(true)
   const { state, dispatch } = useContext(MainStore)
   const location = useLocation()
   const history = useHistory()
   const {
      mpQueryFilters,
      isFetchingNFT,
      mpNFTs,
      searchMPParamsOnLoad,
      isFetchingFailed,
      marketFilterData,
      balance,
   } = state
   const { nftTotal, nfts } = mpNFTs

   const emptyNFTs = useMemo(() => {
      return {
         nbhits: 0,
         nftTotal: 0,
         nfts: [],
         totalPage: 1,
         page: 1,
      }
   }, [])

   //Update rarity filter
   const handleSetMPRarityFilter = (e: any) => {
      const { value, name } = e.target
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { ...mpQueryFilters, [name]: value, page: 1, heroes: 'all' },
      })
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
   }

   //Update sort filter
   const handleSetMPSortFilter = (e: any) => {
      const { value, name } = e.target
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { ...mpQueryFilters, [name]: value, page: 1 },
         minPage: 1,
         maxPage: 5,
      })
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
   }

   //Update heroes filter
   const handleSetMPHeroesFilter = (e: any) => {
      const { value, name } = e.target
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { ...mpQueryFilters, [name]: value, page: 1, rarity: 'all' },
      })
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
   }

   //Update price filter
   const handleSetMPPriceFilter = (e: any) => {
      const minPrice = e.target.min.value
      const maxPrice = e.target.max.value
      const x = minPrice.toString()
      const y = maxPrice.toString()
      const priceFilter = `sellPrice>=${x}<=${y}`
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { ...mpQueryFilters, priceFilter, page: 1 },
      })
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
   }

   //Reset all filters value
   const handleResetMPFilter = () => {
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { priceFilter: '', rarity: 'all', sort: 'latest', page: 1, heroes: 'all' },
         minPage: 1,
         maxPage: 5,
      })
      setTimeout(() => {
         setResetFilter(!resetFilter)
         setResetFilter(true)
      }, 500)
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
   }

   //Create url query
   const createURLSearchParams = useCallback(() => {
      const queriesFilter: any = {}
      Object.keys(mpQueryFilters).map((item) => {
         if (mpQueryFilters[item] && mpQueryFilters[item] !== 'all') {
            return mpQueryFilters[item] == 'latest'
               ? (queriesFilter[item] = '-datePostedOnMarketplace')
               : mpQueryFilters[item] == 'oldest'
               ? (queriesFilter[item] = 'datePostedOnMarketplace')
               : mpQueryFilters[item] == 'highest price'
               ? (queriesFilter[item] = '-sellPrice')
               : mpQueryFilters[item] == 'lowest price'
               ? (queriesFilter[item] = 'sellPrice')
               : (queriesFilter[item] = mpQueryFilters[item])
         }
      })
      return new URLSearchParams(queriesFilter)
   }, [mpQueryFilters])

   //Update search params in browser
   const handleSetURLSearchParams = useCallback(() => {
      const searchParams: any = createURLSearchParams()
      const params = new URLSearchParams(searchParams)
      history.replace({ pathname: location.pathname, search: params.toString() })
   }, [history, location.pathname, createURLSearchParams])

   const getUserBalance = useCallback(() => {
      axios
         .get('http://localhost:5000/user/balance', {
            withCredentials: true,
         })
         .then((res) => {
            const { status, balance } = res.data
            if (status === 200) {
               console.log(balance)
               runDispatch(dispatch, 'GET_USER_BALANCE', {
                  balance,
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
   }, [dispatch])

   //Fetch nfts
   const getMPNfts = useCallback(() => {
      const queryParams = createURLSearchParams()
      axios
         .get(`${GET_MP_NFT}/?${queryParams.toString()}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { status, payload } = res.data
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingNFT: false,
                  mpNFTs: payload,
               })
            } else if (status === 204) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingNFT: false,
                  mpNFTs: emptyNFTs,
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
   }, [dispatch, handleSetURLSearchParams, createURLSearchParams, emptyNFTs])

   //Detect to reqest nft in the server
   useEffect(() => {
      if (isFetchingNFT) {
         runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
            isFetchingFailed: false,
         })
         getMPNfts()
      }
   }, [isFetchingNFT, getMPNfts, dispatch])

   useEffect(() => {
      getUserBalance()
   }, [getUserBalance])

   //Check url query on firt time website load
   useEffect(() => {
      if (searchMPParamsOnLoad) {
         if (location.search != '') {
            const query = new URLSearchParams(location.search)
            const queries: any = {
               rarity: query.get('rarity'),
               sort: query.get('sort'),
               page: query.get('page'),
               priceFilter: query.get('priceFilter'),
               heroes: query.get('heroes'),
            }
            const queriesFilter: any = {}
            Object.keys(queries).map((item) => {
               if (queries[item]) {
                  queriesFilter[item] = queries[item]
               }
            })
            runDispatch(dispatch, 'SEARCH_MP_PARAMS_ON_L0AD_DONE', '')
            runDispatch(dispatch, 'UPDATE_MP_FILTERS', { mpQueryFilters: queriesFilter })
            return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
         } else {
            getMPNfts()
         }
      }
   }, [dispatch, searchMPParamsOnLoad, location.search, getMPNfts])

   const filterProps = {
      mpQueryFilters,
      marketFilterData,
      handleSetMPPriceFilter,
      handleSetMPRarityFilter,
      handleSetMPHeroesFilter,
      handleSetMPSortFilter,
   }

   return (
      <section className={s.main_bg}>
         <div className={s.mp_container}>
            <div className={s.mp_filters_1}>
               <label
                  htmlFor="mp_filter_mobile_checkbox"
                  className={`${s.mp_filter_mobile} ${s.d_flex} ${s.d_md_none}`}
               >
                  Open Filter Menu
               </label>
               <input
                  type="checkbox"
                  className={s.mp_filter_1_input}
                  id="mp_filter_mobile_checkbox"
               />
               <div className={s.mp_filters_container}>
                  <div className={s.mp_filters_header}>
                     <span>Filters:</span>
                     <span onClick={() => handleResetMPFilter()}>Reset</span>
                  </div>
                  {resetFilter && <CreateFilter {...filterProps} />}
               </div>
            </div>
            <div className={s.mp_content}>
               <div className={s.mp_filters_2}>
                  <span>Heroes Found: {nftTotal}</span>
                  <span>Balance: {balance}</span>
               </div>
               <div className={s.mp_cards}>
                  {isFetchingFailed && <div className={s.no_nft_found}>No NFT found.</div>}
                  {isFetchingNFT && (
                     <div className={s.loading_container}>
                        <LoadingSVG />
                     </div>
                  )}
                  {nfts && !isFetchingNFT && !isFetchingFailed
                     ? nfts.map((nft: any) => {
                          return (
                             <Link
                                key={nft._id}
                                to={`/marketplace/nft/${nft._id}`}
                                className={s.nft_link}
                             >
                                <NFTCard type="Buy" data={nft} />
                             </Link>
                          )
                       })
                     : null}
               </div>
               <div className={s.mp_pagination}>
                  <CreateCustomPagination />
               </div>
            </div>
         </div>
      </section>
   )
}

function CreateFilter(props: any) {
   const {
      mpQueryFilters,
      marketFilterData,
      handleSetMPPriceFilter,
      handleSetMPRarityFilter,
      handleSetMPHeroesFilter,
      handleSetMPSortFilter,
   } = props
   return (
      <>
         {Object.keys(mpQueryFilters).map((filter: any) => {
            if (filter == 'priceFilter') {
               return (
                  <CustomPriceFilter
                     onClick={(e: any) => handleSetMPPriceFilter(e)}
                     defaultValue={''}
                     key={filter}
                  />
               )
            } else if (filter == 'rarity') {
               return (
                  <CustomDropdown
                     value={marketFilterData[filter][0]}
                     options={marketFilterData[filter]}
                     title={filter}
                     onClick={(e: any) => handleSetMPRarityFilter(e)}
                     key={filter}
                  />
               )
            } else if (filter == 'heroes') {
               return (
                  <CustomDropdown
                     value={marketFilterData[filter][0]}
                     options={marketFilterData[filter]}
                     title={filter}
                     onClick={(e: any) => handleSetMPHeroesFilter(e)}
                     key={filter}
                  />
               )
            } else if (filter == 'sort') {
               return (
                  <CustomDropdown
                     value={marketFilterData[filter][0]}
                     options={marketFilterData[filter]}
                     title={filter}
                     onClick={(e: any) => handleSetMPSortFilter(e)}
                     key={filter}
                  />
               )
            }
         })}
      </>
   )
}

function CustomDropdown(props: any) {
   const { title, options, value, onClick } = props
   return (
      <div className={s.mp_filter_container}>
         <label className={s.mp_filter_button} htmlFor={title}>
            <p>{title.charAt(0).toUpperCase() + title.slice(1)}</p>
            <span></span>
         </label>
         <input
            type="checkbox"
            name={`${title}_checkbox`}
            id={title}
            className={s.mp_dropdown_input}
         />
         <div className={s.mp_filter_selections}>
            {options.map((option: any) => {
               return (
                  <label className={s.mp_filter_option} key={option}>
                     {option.charAt(0).toUpperCase() + option.slice(1)}
                     {option == 'all' && !value ? (
                        <input
                           type="radio"
                           defaultChecked
                           name={title}
                           onClick={(e) => onClick(e)}
                           value={option}
                        />
                     ) : value === option ? (
                        <input
                           type="radio"
                           name={title}
                           defaultChecked
                           onClick={(e) => onClick(e)}
                           value={option}
                        />
                     ) : (
                        <input
                           type="radio"
                           name={title}
                           onClick={(e) => onClick(e)}
                           value={option}
                        />
                     )}
                     <span className={s.checkmark}></span>
                  </label>
               )
            })}
         </div>
      </div>
   )
}

function CustomPriceFilter(props: any) {
   const { onClick, defaultValue } = props
   const handleOnClick = (e: any) => {
      e.preventDefault()
      onClick(e)
   }
   return (
      <form className={s.mp_price_filter} onSubmit={(e) => handleOnClick(e)} action="">
         <p>Price Range</p>
         <input
            type="number"
            placeholder="Min"
            min={1}
            defaultValue={defaultValue}
            name={'>='}
            id="min"
            required
         />
         <input
            type="number"
            placeholder="Max"
            min={1}
            defaultValue={defaultValue}
            name={'<='}
            id="max"
            required
         />
         <button type="submit">Set</button>
      </form>
   )
}

function CreateCustomPagination() {
   const { state, dispatch } = useContext(MainStore)
   const { mpNFTs, pages, minPage, maxPage, mpQueryFilters } = state
   const { totalPage, page } = mpNFTs

   const handlePagiMovePage = (action: any) => {
      if (action === 'next' && maxPage < pages[pages.length - 1]) {
         return runDispatch(dispatch, 'INC_USER_NFT_PAGES', {
            minPage: minPage + 5,
            maxPage: maxPage + 5,
         })
      }
      if (action === 'back' && minPage > 1) {
         return runDispatch(dispatch, 'DEC_USER_NFT_PAGES', {
            minPage: minPage - 5,
            maxPage: maxPage - 5,
         })
      }
   }

   const handleGoToPage = (props: any) => {
      const { page } = props
      if (page == 1) {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            minPage: 1,
            maxPage: 5,
            mpQueryFilters: { ...mpQueryFilters, page },
         })
      } else {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            mpQueryFilters: { ...mpQueryFilters, page },
         })
      }
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingNFT: true })
   }

   //Create an array of page num for pagination to make
   const handleSetPages = useCallback(() => {
      const tempPages: any = []
      //Add page to the pages array
      for (let i = 1; i <= totalPage; i++) {
         if (pages.length != totalPage) {
            tempPages.push(i)
         }
      }

      //If pages array match to the totalPage from the request set it
      const calculateMaxPage = Math.ceil(page / 5) * 5
      const calculateMinPage = calculateMaxPage - 5
      if (tempPages.length === totalPage) {
         runDispatch(dispatch, 'SET_USER_NFT_PAGES', {
            pages: tempPages,
            maxPage: calculateMaxPage,
            minPage: calculateMinPage + 1,
         })
      }
   }, [dispatch, totalPage, pages.length, page])

   //If new nfts data were loaded, update page array data for pagination
   useEffect(() => {
      if (mpNFTs) {
         handleSetPages()
      }
   }, [mpNFTs, handleSetPages])

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
         {minPage > 5 && <div>...</div>}
         {pages.map((pageNum: any) => {
            if (pageNum >= minPage && pageNum <= maxPage && pageNum !== 1) {
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
