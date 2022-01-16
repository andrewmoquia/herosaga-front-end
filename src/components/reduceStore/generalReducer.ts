export function GeneralReducer(state: any, action: any) {
   switch (action.type) {
      case 'CLEAR_ALERT_MSG':
         return {
            ...state,
            isAlertNotifOn: false,
            alertMsg: action.payload,
         }
      case 'GET_CSRF_TOKEN':
         return {
            ...state,
            csrfToken: action.payload,
         }
      case 'REQ_PROCESSING':
         return {
            ...state,
            isReqProcessing: true,
         }
      case 'REQ_PROCESSING_DONE':
         return {
            ...state,
            isReqProcessing: false,
         }
      case 'TEST_ALERT_SUCCESS':
         return {
            ...state,
            alertType: 'success',
            isAlertNotifOn: true,
            alertMsg: action.payload,
         }
      case 'TEST_ALERT_FAILED':
         return {
            ...state,
            alertType: 'failed',
            isAlertNotifOn: true,
            alertMsg: action.payload,
         }
      case 'MINTING_ON_PROCESS':
         return {
            ...state,
            isMinting: true,
         }
      case 'MINTING_DONE':
         return {
            ...state,
            isMinting: false,
            isMintingSuccess: false,
         }
      case 'MINTING_SUCCESS':
         return {
            ...state,
            isMinting: true,
            isMintingSuccess: true,
            mintedNFT: action.payload,
         }
      case 'MINTING_FAILED':
         return {
            ...state,
            isMinting: false,
            isMintingSuccess: false,
            mintedNFT: {},
         }
      default:
         return state
   }
}

export function NFTActionReducer(state: any, action: any) {
   switch (action.type) {
      case 'GET_USER_NFT':
         return {
            ...state,
            usersNFT: action.payload.data,
            isReqProcessing: false,
            minPage: action.payload.minPage,
            maxPage: action.payload.maxPage,
         }
      case 'SET_USER_NFT_PAGES':
         return {
            ...state,
            ...action.payload,
         }
      case 'RESET_USER_NFT_PAGES':
         return {
            ...state,
            pages: [],
            minPage: 1,
            maxPage: 5,
         }
      case 'DEC_USER_NFT_PAGES':
         return {
            ...state,
            ...action.payload,
            // minPage: state.minPage - state.pageLimit,
            // maxPage: state.maxPage - state.pageLimit,
         }
      case 'INC_USER_NFT_PAGES':
         return {
            ...state,
            ...action.payload,
            // minPage: state.minPage + state.pageLimit,
            // maxPage: state.maxPage + state.pageLimit,
         }
      case 'GETTING_USER_NFT_PAGES':
         return {
            ...state,
            minPage: state.minPage + state.pageLimit,
            maxPage: state.maxPage + state.pageLimit,
         }
      case 'UPDATE_FILTERS':
         return {
            ...state,
            filters: { ...state.filters, ...action.payload.filters },
            queryFilters: { ...state.queryFilters, ...action.payload.queryFilters },
         }
      case 'UPDATE_PAGES':
         return {
            ...state,
            filters: action.payload.filters,
            queryFilters: action.payload.queryFilters,
         }
      case 'FETCH_NFT':
         return {
            ...state,
            isFetchingNFT: true,
            updateURLSearchParams: true,
         }
      case 'FETCH_NFT_DONE':
         return {
            ...state,
            isFetchingNFT: false,
            updateURLSearchParams: false,
         }
      case 'SEARCH_PARAMS_ON_L0AD_DONE':
         return {
            ...state,
            searchParamsOnLoad: false,
         }
      case 'SEARCH_MP_PARAMS_ON_L0AD_DONE':
         return {
            ...state,
            searchMPParamsOnLoad: false,
         }
      case 'UPDATE_MP_FILTERS':
         return {
            ...state,
            mpQueryFilters: { ...state.mpQueryFilters, ...action.payload.mpQueryFilters },
            mpNFTs: {},
         }
      case 'UPDATE_MP_NFTS':
         return {
            ...state,
            mpNFTs: action.payload,
         }
      case 'GET_ONE_NFT':
         return {
            ...state,
            nft: action.payload,
         }
      case 'UPDATE_NFT_FETCH_STATUS':
         return {
            ...state,
            ...action.payload,
         }
      case 'UPDATE_TRANSAC_FETCH_STATUS':
         return {
            ...state,
            ...action.payload,
         }
      case 'UPDATE_QUERY_FILTER':
         return {
            ...state,
            ...action.payload,
         }
      default:
         return state
   }
}
