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
   balance: 0,
}

const notifState = {
   notif: null,
}

const authState = {
   isAuthenticated: false,
   isAuthDone: false,
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
   myNFTPages: [],
   myNFTPageLimit: 5,
   myNFTMinPage: 1,
   myNFTMaxPage: 5,
   myNFTCurrPage: 1,
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

const transactionsState = {
   transacQueryFilters: {
      isCompleted: 'isCompleted',
      createdAt: '-createdAt',
      page: 1,
   },
   isFetchingTransacs: false,
   isFetchingTransacsFailed: false,
   transacsData: {},
   searchTransacParamsOnLoad: true,
   transacsPages: [],
   transacsPageLimit: 5,
   transacsMinPage: 1,
   transacsMaxPage: 5,
}

const pwValidationState = {
   inputPw: '',
   isPwLengthValid: false,
   isPwHasSpecialCharacter: false,
   isPwHasCapitalLetter: false,
   isPwHasSmallLetter: false,
   isPwHasNumber: false,
}

export const state = Object.assign(
   userState,
   authState,
   mintingState,
   nftState,
   transactionsState,
   notifState,
   pwValidationState
)
