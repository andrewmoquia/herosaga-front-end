const userState = {
   usersNFT: '',
   mintBoxData: {},
   navMenuLogoData: {},
   userNFTfilterData: [],
   marketFilterData: [],
   filterBrightness: {},
   spriteBg: {},
   heroesData: [],
   starStyleOnRoulette: {},
}

const authState = {
   isAuthenticated: false,
   isAuthenticating: false,
   isReqProcessing: false,
   isAlertNotifOn: false,
   alertType: '',
   alertMsg: '',
   csrfToken: '',
   isReqCooldown: false,
   reqTimer: 60,
   reqInterval: '',
}
const mintingState = {
   isMinting: false,
   isMintingSuccess: false,
   mintedNFT: '',
}

const nftState = {
   pages: [],
   pageLimit: 5,
   minPage: 1,
   maxPage: 5,
   currPage: 1,
   filters: {
      rarity: '',
      sort: '',
      page: '',
   },
   queryFilters: {},
   isFetchingNFT: false,
   updateURLSearchParams: false,
   searchParamsOnLoad: true,
   userQueryFilters: {
      rarity: 'all',
      sort: 'latest',
      page: 1,
   },
   mpQueryFilters: {
      priceFilter: '',
      rarity: 'all',
      sort: 'latest',
      page: 1,
      heroes: 'all',
   },
   mpNFTs: {},
   userNFTs: {},
   searchMPParamsOnLoad: true,
   nft: undefined,
   isSold: false,
   isFetching: true,
   isFetchingProcessing: true,
   isFetchingFailed: false,
   isBuySuccessful: false,
}

export const state = Object.assign(userState, authState, mintingState, nftState)
