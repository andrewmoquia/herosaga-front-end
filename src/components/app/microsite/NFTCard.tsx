import { heroesData } from '../../data/imagesData'
import { runDispatch } from '../../actions/dispatch'
import { MainStore } from '../../reduceStore/StoreProvider'
import { useContext } from 'react'

export default function NFTCard(props: any) {
   const { dispatch } = useContext(MainStore)
   const { data, type } = props
   const { _id, rarity, name, sellPrice, price, isForSale } = data

   const handleSelectNFTAction = () => {
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
         isFetching: true,
         isSold: false,
         isFetchingFailed: false,
      })
   }

   return (
      <div className="user-nfts-card" key={_id} onClick={() => handleSelectNFTAction()}>
         <div className="user-nfts-card-hero">
            <div
               className={`hero-card-img hero-card-bg-${
                  rarity === 'common'
                     ? 'common'
                     : rarity === 'uncommon'
                     ? 'uncommon1'
                     : name.split(' ').join('').toLowerCase()
               }`}
            >
               {heroesData.map((hero: any, index: any) => {
                  if (name === hero.name) {
                     return (
                        <div
                           style={
                              hero.name === 'Bahamut' || hero.name === 'Leviathan'
                                 ? {
                                      ...hero.sprite.wAnim,
                                      transform: 'scale(1.4)',
                                   }
                                 : {
                                      ...hero.sprite.wAnim,
                                      transform: 'scale(1.8)',
                                   }
                           }
                           key={`${hero.name}-${index}`}
                        ></div>
                     )
                  }
               })}
            </div>
            <div className="hero-card-desc">{name}</div>
            <div className="hero-card-sell-button">
               <button id={type}>
                  {type === 'Buy'
                     ? type
                     : type === 'Sell' && isForSale
                     ? 'Selling'
                     : 'Not For Sale'}
               </button>
               {type === 'Buy' && <p>Price: {sellPrice ? sellPrice : price}</p>}
               {type === 'Sell' && <p>{isForSale && `Price: ${sellPrice}`}</p>}
            </div>
         </div>
         <div className={`nfts-card-header-${rarity}`}>
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
         </div>
      </div>
   )
}
