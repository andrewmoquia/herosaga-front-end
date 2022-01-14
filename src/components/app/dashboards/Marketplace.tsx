import { runDispatch } from '../../actions/dispatch'
import { useContext, useEffect, useCallback, useState, useMemo } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import axios from 'axios'
import { useLocation, useHistory } from 'react-router'
import NFTCard from '../microsite/NFTCard'
import Pagination from '../microsite/Pagination'
import { Link } from 'react-router-dom'
import s from '../../../../scss/main.css'

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

export default function Marketplace() {
   const [resetFilter, setResetFilter] = useState(true)
   const { state, dispatch } = useContext(MainStore)
   const location = useLocation()
   const history = useHistory()
   const {
      mpQueryFilters,
      isFetchingNFT,
      user,
      mpNFTs,
      searchMPParamsOnLoad,
      isFetchingFailed,
      marketFilterData,
      minPage,
      maxPage,
      pages,
   } = state
   const { nftTotal, nfts, totalPage, page } = mpNFTs
   const { balance } = user

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

   //Update rarity filter
   const handleSetMPRarityFilter = (e: any) => {
      const { value, name } = e.target
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { ...mpQueryFilters, [name]: value, page: 1, heroes: 'all' },
         mpNFTs: emptyNFTs,
      })
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
   }

   //Update sort filter
   const handleSetMPSortFilter = (e: any) => {
      const { value, name } = e.target
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { ...mpQueryFilters, [name]: value, page: 1 },
         mpNFTs: emptyNFTs,
      })
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
   }

   //Update heroes filter
   const handleSetMPHeroesFilter = (e: any) => {
      const { value, name } = e.target
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { ...mpQueryFilters, [name]: value, page: 1, rarity: 'all' },
         mpNFTs: emptyNFTs,
      })
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
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
         mpNFTs: emptyNFTs,
      })
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
   }

   //Reset all filters value
   const handleResetMPFilter = () => {
      runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
         mpQueryFilters: { priceFilter: '', rarity: 'all', sort: 'latest', page: 1, heroes: 'all' },
      })
      setTimeout(() => {
         setResetFilter(!resetFilter)
         setResetFilter(true)
      }, 500)
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
   }

   //Update page filter
   const handleGoToPage = (props: any) => {
      const { page } = props
      if (page == 1) {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            pages: [1, 2, 3, 4, 5],
            minPage: 1,
            maxPage: 5,
            mpQueryFilters: { ...mpQueryFilters, page },
         })
      } else {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            mpQueryFilters: { ...mpQueryFilters, page },
         })
      }

      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
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

   //Fetch nfts
   const getMPNfts = useCallback(() => {
      const queryParams = createURLSearchParams()
      axios
         .get(`http://localhost:5000/nft/get-all/?${queryParams.toString()}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { status, payload } = res.data
            console.log(payload)
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingNFT: false,
                  mpNFTs: payload,
               })
            }
            if (status === 204) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingNFT: false,
                  mpNFTs: emptyNFTs,
                  isFetchingFailed: true,
               })
            }
         })
         .catch((err) => {
            console.log(err)
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
            return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', fetchingStart)
         } else {
            getMPNfts()
         }
      }
   }, [dispatch, searchMPParamsOnLoad, location.search, getMPNfts, fetchingStart])

   const paginationProps = {
      handleSetFilter: handleGoToPage,
      totalPage,
      nfts,
      page,
      minPage,
      maxPage,
      pages,
      dashboard: 'marketplace',
   }

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
                  <Pagination {...paginationProps} />
               </div>
            </div>
         </div>
      </section>
   )
}
