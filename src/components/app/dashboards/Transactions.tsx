import s from '../../../../scss/main.css'
import { useCallback, useContext, useEffect, useMemo } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { runDispatch } from '../../actions/dispatch'
import { useLocation, useHistory } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { EmptyArrowUp, EmptyArrowDown, FilledArrowUp, FilledArrowDown } from '../misc/svg'
import { config } from '../../../api'

const { GET_TRANSACS } = config

export default function Transactions() {
   return (
      <section className={s.main_bg}>
         <div className={s.transac_container}>
            <span className={s.transac_filter_text}>Filters: </span>
            <TransacFilters />
            <TransacContents />
            <TransacPagination />
         </div>
      </section>
   )
}

function TransacFilters() {
   const { state, dispatch } = useContext(MainStore)
   const { transacQueryFilters, isFetchingTransacs, searchTransacParamsOnLoad } = state
   const { createdAt, isCompleted, transaction } = transacQueryFilters
   const emptyTransacs = useMemo(() => {
      return {
         page: 1,
         totalPage: 1,
         transacsHits: 0,
         transacsTotal: 0,
         transacs: [],
      }
   }, [])

   const location = useLocation()
   const history = useHistory()

   //Control filter to sort by date
   const handleSetDateFilter = () => {
      if (createdAt == '-createdAt') {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            transacQueryFilters: { ...transacQueryFilters, createdAt: 'createdAt', page: 1 },
         })
      } else {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            transacQueryFilters: { ...transacQueryFilters, createdAt: '-createdAt', page: 1 },
         })
      }
      return runDispatch(dispatch, 'UPDATE_TRANSAC_FETCH_STATUS', {
         isFetchingTransacs: true,
         isFetchingTransacsFailed: false,
         transacsMinPage: 1,
         transacsMaxPage: 5,
      })
   }

   //Control filter to sort if transaction completed or not
   const handleSetStatusFilter = () => {
      if (isCompleted == '-isCompleted') {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            transacQueryFilters: { ...transacQueryFilters, isCompleted: 'isCompleted', page: 1 },
         })
      } else {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            transacQueryFilters: { ...transacQueryFilters, isCompleted: '-isCompleted', page: 1 },
         })
      }
      return runDispatch(dispatch, 'UPDATE_TRANSAC_FETCH_STATUS', {
         isFetchingTransacs: true,
         isFetchingTransacsFailed: false,
         transacsMinPage: 1,
         transacsMaxPage: 5,
      })
   }

   //Control filter to show only selected transaction type
   const handleSetTransacTypeFilter = (transacType: string) => {
      // console.log(transacQueryFilters)
      if (transacType == 'All') {
         const removeTransacQuery = Object.keys(transacQueryFilters).reduce(
            (newQuery: any, query: any) => {
               let tempQuery: any = undefined
               if (query !== 'transaction') {
                  tempQuery = { [query]: `${transacQueryFilters[query]}` }
               }
               return { ...newQuery, ...tempQuery }
            },
            {}
         )
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            transacQueryFilters: { ...removeTransacQuery, page: 1 },
         })
      } else {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            transacQueryFilters: { ...transacQueryFilters, transaction: transacType, page: 1 },
         })
      }
      return runDispatch(dispatch, 'UPDATE_TRANSAC_FETCH_STATUS', {
         isFetchingTransacs: true,
         isFetchingTransacsFailed: false,
         transacsMinPage: 1,
         transacsMaxPage: 5,
      })
   }

   //Create query based on filters value
   const createURLSearchParams = useCallback(() => {
      return new URLSearchParams(transacQueryFilters)
   }, [transacQueryFilters])

   //Update search params in browser
   const handleSetURLSearchParams = useCallback(() => {
      const searchParams: any = createURLSearchParams()
      const params = new URLSearchParams(searchParams)
      history.replace({ pathname: location.pathname, search: params.toString() })
   }, [history, location.pathname, createURLSearchParams])

   //Get request transactions in the server
   const getTransactions = useCallback(() => {
      const queries = createURLSearchParams()
      axios
         .get(`${GET_TRANSACS}?${queries}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { status, payload } = res.data
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingTransacs: false,
                  transacsData: payload,
               })
            } else if (status === 204) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetchingTransacs: false,
                  transacsData: emptyTransacs,
                  isFetchingTransacsFailed: true,
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
   }, [dispatch, createURLSearchParams, emptyTransacs, handleSetURLSearchParams])

   //Detect if filter is activated fetch transac from server
   useEffect(() => {
      if (isFetchingTransacs) {
         getTransactions()
      }
   }, [isFetchingTransacs, getTransactions])

   useEffect(() => {
      if (searchTransacParamsOnLoad) {
         if (location.search != '') {
            //Convert search string to function
            const query = new URLSearchParams(location.search)
            //Convert search function to object
            const queries: any = {
               createdAt: query.get('createdAt'),
               isCompleted: query.get('isCompleted'),
               transaction: query.get('transaction'),
               page: query.get('page'),
            }
            const queriesFilter: any = {}
            //Remove null properties on the object
            Object.keys(queries).map((item) => {
               if (queries[item]) {
                  queriesFilter[item] = queries[item]
               }
            })
            return runDispatch(dispatch, 'UPDATE_TRANSAC_FETCH_STATUS', {
               searchTransacParamsOnLoad: false,
               transacQueryFilters: queriesFilter,
               isFetchingTransacs: true,
            })
         } else {
            return runDispatch(dispatch, 'UPDATE_TRANSAC_FETCH_STATUS', {
               searchTransacParamsOnLoad: false,
               isFetchingTransacs: true,
            })
         }
      } else {
         return runDispatch(dispatch, 'UPDATE_TRANSAC_FETCH_STATUS', {
            isFetchingTransacs: true,
         })
      }
   }, [searchTransacParamsOnLoad, location.search, dispatch, getTransactions])

   return (
      <div className={s.transac_filters}>
         <div className={s.simple_filters}>
            <div
               className={s.simpler_filter}
               onClick={() => !isFetchingTransacs && handleSetDateFilter()}
            >
               <span>Date</span>
               <div className={s.simpler_filter_control}>
                  <span>{createdAt == '-createdAt' ? <FilledArrowUp /> : <EmptyArrowUp />}</span>
                  <span>{createdAt == 'createdAt' ? <FilledArrowDown /> : <EmptyArrowDown />}</span>
               </div>
            </div>
            <div
               className={s.simpler_filter}
               onClick={() => !isFetchingTransacs && handleSetStatusFilter()}
            >
               <span>Status</span>
               <div className={s.simpler_filter_control}>
                  <span>{isCompleted == 'isCompleted' ? <FilledArrowUp /> : <EmptyArrowUp />}</span>
                  <span>
                     {isCompleted == '-isCompleted' ? <FilledArrowDown /> : <EmptyArrowDown />}
                  </span>
               </div>
            </div>
         </div>
         <div className={s.simpler_filter_2}>
            <div
               className={`${!transaction ? s.active : ''}`}
               onClick={() => !isFetchingTransacs && handleSetTransacTypeFilter('All')}
            >
               All
            </div>
            <div
               className={`${transaction == 'Mint' ? s.active : ''}`}
               onClick={() => !isFetchingTransacs && handleSetTransacTypeFilter('Mint')}
            >
               Mint
            </div>
            <div
               className={`${transaction == 'Sell' ? s.active : ''}`}
               onClick={() => !isFetchingTransacs && handleSetTransacTypeFilter('Sell')}
            >
               Sell
            </div>
            <div
               className={`${transaction == 'Buy' ? s.active : ''}`}
               onClick={() => !isFetchingTransacs && handleSetTransacTypeFilter('Buy')}
            >
               Buy
            </div>
         </div>
      </div>
   )
}

function TransacContents() {
   const { state, dispatch } = useContext(MainStore)
   const { transacsData, isFetchingTransacsFailed } = state
   const { transacs } = transacsData

   const handleFetchNFT = () => {
      runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
         isFetching: true,
         isSold: false,
         isFetchingFailed: false,
         isFetchingProcessing: false,
         nft: {},
      })
   }

   return (
      <div className={s.transac_contents}>
         {isFetchingTransacsFailed && <div className={s.vc_error}>Not found, error occured.</div>}
         {transacs &&
            !isFetchingTransacsFailed &&
            transacs.map((item: any) => {
               const { transaction, nftID, isCompleted, _id, createdAt } = item
               const transacsType = transaction.toLowerCase()
               const date = new Date(createdAt)
               return (
                  <div className={s.transac_receipt} key={_id}>
                     <div className={`${s.transac_type} ${s[transacsType]}`}>{transaction}</div>
                     <div className={s.transac_stats}>
                        {isCompleted ? ': Completed' : ': Ongoing'}
                     </div>
                     <Link
                        to={`/transactions/nft/${nftID}`}
                        className={`${s.transac_type} ${s.nft}`}
                        onClick={() => handleFetchNFT()}
                     >
                        NFT
                     </Link>
                     <Link
                        to={`/transactions/nft/${nftID}`}
                        className={s.transac_stats_view}
                        onClick={() => handleFetchNFT()}
                     >
                        : View
                     </Link>
                     <div className={`${s.transac_type} ${s.date} ${s.d_none} ${s.d_md_flex}`}>
                        Date
                     </div>
                     <div
                        className={`${s.transac_stats_date} ${s.d_none} ${s.d_md_flex}`}
                     >{`: ${date}`}</div>
                  </div>
               )
            })}
      </div>
   )
}

function TransacPagination() {
   const { state, dispatch } = useContext(MainStore)
   const { transacsData, transacsPages, transacsMinPage, transacsMaxPage, transacQueryFilters } =
      state
   const { totalPage, page } = transacsData

   const handlePagiMovePage = (action: any) => {
      if (action === 'next' && transacsMaxPage < transacsPages[transacsPages.length - 1]) {
         return runDispatch(dispatch, 'INC_USER_NFT_PAGES', {
            transacsMinPage: transacsMinPage + 5,
            transacsMaxPage: transacsMaxPage + 5,
         })
      }
      if (action === 'back' && transacsMinPage > 1) {
         return runDispatch(dispatch, 'DEC_USER_NFT_PAGES', {
            transacsMinPage: transacsMinPage - 5,
            transacsMaxPage: transacsMaxPage - 5,
         })
      }
   }

   const handleGoToPage = (props: any) => {
      const { page } = props
      if (page == 1) {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            transacsMinPage: 1,
            transacsMaxPage: 5,
            transacQueryFilters: { ...transacQueryFilters, page },
         })
      } else {
         runDispatch(dispatch, 'UPDATE_QUERY_FILTER', {
            transacQueryFilters: { ...transacQueryFilters, page },
         })
      }
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', { isFetchingTransacs: true })
   }

   //Create an array of page num for pagination to make
   const handleSetPages = useCallback(() => {
      const tempPages: any = []
      //Add page to the pages array
      for (let i = 1; i <= totalPage; i++) {
         if (transacsPages.length != totalPage) {
            tempPages.push(i)
         }
      }

      //If pages array match to the totalPage from the request set it
      const calculateMaxPage = Math.ceil(page / 5) * 5
      const calculateMinPage = calculateMaxPage - 5
      if (tempPages.length === totalPage) {
         runDispatch(dispatch, 'SET_USER_NFT_PAGES', {
            transacsPages: tempPages,
            transacsMinPage: calculateMinPage + 1,
            transacsMaxPage: calculateMaxPage,
         })
      }
   }, [dispatch, totalPage, transacsPages.length, page])

   //If new nfts data were loaded, update page array data for pagination
   useEffect(() => {
      if (transacsData) {
         handleSetPages()
      }
   }, [transacsData, handleSetPages])

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
         {transacsMinPage > 5 && <div>...</div>}
         {transacsPages.map((pageNum: any) => {
            if (pageNum >= transacsMinPage && pageNum <= transacsMaxPage && pageNum !== 1) {
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
