import { INavLiElement } from '../interfaces/navInterface'

export const navLiElement: INavLiElement = {
   mysteryshop: '',
   marketplace: '',
   farm: '',
   myNFT: '',
   profile: '',
   transactions: '',
}

export const navMenuLogoData = {
   generalMenu: [
      {
         type: {
            class: 'mysteryshop',
            route: 'mysteryshop',
            label: 'Mystery Shop',
         },
         img: 'https://i.ibb.co/8c0hdC6/UI-Graphic-Resource-Gems.png',
         alt: 'Spell-Book-Preface-14',
      },
      {
         type: {
            class: 'marketplace',
            route: 'marketplace',
            label: 'Marketplace',
         },
         img: 'https://i.ibb.co/zNmxRH1/UI-Graphic-Resource-Coins.png',
         alt: 'UI-Graphic-Resource-Wood',
      },
      {
         type: {
            class: 'myNFT',
            route: 'myNFT/query',
            label: 'My NFT',
         },
         img: 'https://i.ibb.co/JydCdMs/UI-Graphic-Resource-Iron.png',
         alt: 'UI-Graphic-Resource-Iron',
      },
      {
         type: {
            class: 'transactions',
            route: 'transactions',
            label: 'Transactions',
         },
         img: 'https://i.ibb.co/2y06sSm/Reload.png',
         alt: 'Transaction logo.',
      },
   ],
   profileMenu: [
      {
         type: {
            class: 'profile',
            route: 'profile',
            label: 'Profile',
         },
         img: 'https://i.ibb.co/thCCPfj/Menu.png',
         alt: 'Profile logo.',
      },
      {
         type: {
            class: 'logout',
            route: 'logout',
            label: 'Logout',
         },
         img: 'https://i.ibb.co/mGY9ncP/Pause.png',
         alt: 'Logout logo.',
      },
   ],
}
