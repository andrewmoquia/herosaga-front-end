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
            route: 'mysteryshop',
            label: 'Mystery Shop',
         },
         img: 'https://i.ibb.co/8c0hdC6/UI-Graphic-Resource-Gems.png',
         alt: 'Spell-Book-Preface-14',
      },
      {
         type: {
            route: 'marketplace',
            label: 'Marketplace',
         },
         img: 'https://i.ibb.co/zNmxRH1/UI-Graphic-Resource-Coins.png',
         alt: 'UI-Graphic-Resource-Wood',
      },
      {
         type: {
            route: 'myNFT',
            label: 'My NFT',
         },
         img: 'https://i.ibb.co/JydCdMs/UI-Graphic-Resource-Iron.png',
         alt: 'UI-Graphic-Resource-Iron',
      },
      {
         type: {
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
            route: 'profile',
            label: 'Profile',
         },
         img: 'https://i.ibb.co/thCCPfj/Menu.png',
         alt: 'Profile logo.',
      },
      {
         type: {
            route: 'logout',
            label: 'Logout',
         },
         img: 'https://i.ibb.co/mGY9ncP/Pause.png',
         alt: 'Logout logo.',
      },
   ],
}
