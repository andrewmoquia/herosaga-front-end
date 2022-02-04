import { runDispatch } from '../../actions/dispatch'
import { MainStore } from '../../reduceStore/StoreProvider'
import { useContext } from 'react'
import s from '../../../../scss/main.css'

export default function NFTCard(props: any) {
   const { state, dispatch } = useContext(MainStore)
   const { heroesData } = state
   const { data, type } = props
   const { _id, rarity, name, sellPrice, price, isForSale } = data
   const heroBg = `hero_card_bg_${name.toLowerCase()}`

   const handleSelectNFTAction = () => {
      return runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
         isFetching: true,
         isSold: false,
         isFetchingFailed: false,
      })
   }

   return (
      <div className={s.user_nfts_card} key={_id} onClick={() => handleSelectNFTAction()}>
         <div className={s.user_nfts_card_hero}>
            <div
               className={`${s.hero_card_img} ${
                  rarity === 'common'
                     ? s[`hero_card_bg_common`]
                     : rarity === 'uncommon'
                     ? s[`hero_card_bg_uncommon1`]
                     : s[heroBg]
               }`}
            >
               {heroesData.map((hero: any, index: any) => {
                  if (name === hero.name) {
                     const { wAnim } = hero.sprite
                     const heroAnimCSS = wAnim.animation
                        .split(',')[0]
                        .split(' ')[0]
                        .split('-')
                        .join('_')
                     return (
                        <div
                           style={
                              hero.name === 'Bahamut' || hero.name === 'Leviathan'
                                 ? {
                                      ...hero.sprite.wAnim,
                                      animation: `${s[heroAnimCSS]} 0.5s steps(4) infinite`,
                                      transform: 'scale(1.4)',
                                   }
                                 : {
                                      ...hero.sprite.wAnim,
                                      animation: `${s[heroAnimCSS]} 0.5s steps(4) infinite`,
                                      transform: 'scale(1.8)',
                                   }
                           }
                           key={`${hero.name}-${index}`}
                        ></div>
                     )
                  }
               })}
            </div>
            <div className={s.hero_card_desc}>{name}</div>
            <div className={s.hero_card_sell_button}>
               <button className={type}>
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
         <div
            className={
               rarity == 'common'
                  ? s.nfts_card_header_common
                  : rarity == 'uncommon'
                  ? s.nfts_card_header_uncommon
                  : rarity == 'rare'
                  ? s.nfts_card_header_rare
                  : rarity == 'epic'
                  ? s.nfts_card_header_epic
                  : s.nfts_card_header_legendary
            }
         >
            {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
         </div>
      </div>
   )
}
