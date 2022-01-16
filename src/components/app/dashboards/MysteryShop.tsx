import { useContext } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { runDispatch } from '../../actions/dispatch'
import axios from 'axios'
import s from '../../../../scss/main.css'
// const s = lazy(() => import('../../../../scss/main.css'))

const generateHeroes = (mintedNFT: any, heroesData: any) => {
   const cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
   const totalNumOfHero = heroesData.length
   const generatedHeroes = cards.map((card) => {
      const randomNum = Math.floor(Math.random() * totalNumOfHero)
      if (card === 10) {
         const findMintedChar = heroesData.filter((char: any) => {
            return char.name === mintedNFT.name
         })
         return { ...findMintedChar[0] }
      } else {
         return { ...heroesData[randomNum] }
      }
   })
   return generatedHeroes
}

function MintBoxAnim(props: any) {
   const { handleExitMinting, mintedNFT, starStyleOnRoulette, heroesData } = props
   const heroes = generateHeroes(mintedNFT, heroesData)
   const heroIdleAnimCSS = heroes[10].sprite.wAnim.animation
      .split(',')[0]
      .split(' ')[0]
      .split('-')
      .join('_')
   const heroFadeInCSS = heroes[10].sprite.wAnim.animation.split(',')[1].split(' ')[1]
   return (
      <div className={s.mint_anim_cont}>
         <div className={s.mint_hero_rarity}>
            <img
               src={
                  mintedNFT.rarity == 'common'
                     ? 'https://i.ibb.co/YX3c3CY/you-got-common.png'
                     : mintedNFT.rarity == 'uncommon'
                     ? 'https://i.ibb.co/XWcnTdv/you-got-uncommon.png'
                     : mintedNFT.rarity == 'rare'
                     ? 'https://i.ibb.co/3Nwrcs3/you-got-rare.png'
                     : mintedNFT.rarity == 'epic'
                     ? 'https://i.ibb.co/bFkCvYt/you-got-epic.png'
                     : 'https://i.ibb.co/CbfYFsP/you-got-legendary.png'
               }
               alt="Rarity text."
               className={s.rarity_img}
            />
         </div>
         <div className={s.mint_hero_char_cont}>
            <div className={s.mint_hero_char_cards}>
               {heroes.map((hero: any, index: any) => {
                  return (
                     <div className={s.mint_hero_char_card} key={`${hero.name}-${index}`}>
                        <div
                           style={
                              hero.name === 'Bahamut' || hero.name === 'Leviathan'
                                 ? { ...hero.sprite.wFilter, transform: 'scale(0.8)' }
                                 : { ...hero.sprite.wFilter, transform: 'scale(1)' }
                           }
                        />
                     </div>
                  )
               })}
            </div>
         </div>
         <div className={s.mint_frame_cont}>
            <img
               src="https://i.ibb.co/0Vkbrbj/mint-frame.png"
               alt="Mint Frame"
               className={s.mint_frame_img}
            />
            {starStyleOnRoulette.map((style: any, index: any) => {
               const starCSS = style.split(' ')[0].split('-').join('_')
               const starPosCSS = style.split(' ')[1].split('-').join('_')
               const starAnimCSS = style.split(' ')[2].split('-').join('_')
               const starFinalAnimCSS = `star_glow_${mintedNFT.rarity}`

               return (
                  <div
                     className={`${s[starCSS]} ${s[starPosCSS]} ${s[starAnimCSS]} ${s[starFinalAnimCSS]}`}
                     key={index}
                  >
                     <img src="https://i.ibb.co/svqGsXc/star.png" alt="Star" width={22} />
                  </div>
               )
            })}
         </div>
         <div className={s.mint_char_roulette}>
            <div
               className={s.char_roulette_anim}
               style={{
                  ...heroes[10].sprite.wAnim,
                  animation: `${s[heroIdleAnimCSS]} 0.5s steps(4) infinite, ${s[heroFadeInCSS]} 3s linear`,
               }}
            />
         </div>
         <div className={s.mint_anim_back_button} onClick={() => handleExitMinting()}>
            <img src="https://i.ibb.co/YXrfGdk/BACK.png" alt="Back" width={90} />
         </div>
      </div>
   )
}

function CreateMintBoxes(props: any) {
   const { data, handleMinting, isMinting } = props
   return data.map((box: any) => {
      const { image, tile, type, chances, price } = box
      return (
         <div className={s.mint_box} key={type[1]}>
            <div className={s.mint_box_img_cont}>
               <img src={image} alt={type[0]} />
            </div>
            <div className={s.mint_box_tile_cont}>
               <img src={tile} alt={type[0]} />
            </div>
            <div className={s.mint_box_buy_cont}>
               {isMinting ? (
                  <button className={s.mint_button} disabled>
                     <p>BUY</p>
                  </button>
               ) : (
                  <button className={s.mint_button} onClick={() => handleMinting(type[1])}>
                     <p>BUY</p>
                  </button>
               )}
               <div className={s.mint_desc}>
                  <p>{type[0]}</p>
                  <p>Price: {price} INMS</p>
               </div>
            </div>
            <div className={s.mint_box_desc_cont}>
               <div className={s.chances_desc_header}>
                  <p>Chances</p>
               </div>
               <div className={s.chances_perc_cont}>
                  {chances.map((chances: any) => {
                     const { chance, percentage } = chances
                     const chanceCSS = chance[1]
                     return (
                        <div className={s.chances_perc} key={chance}>
                           <div className={`${s.chances_percentage} ${s[chanceCSS]}`}>
                              {percentage}%
                           </div>
                           <p>{chance[0]}</p>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
      )
   })
}

export default function MysteryShop(): JSX.Element {
   const { state, dispatch } = useContext(MainStore)
   const { isMintingSuccess, mintedNFT, isMinting, mintBoxData, heroesData, starStyleOnRoulette } =
      state

   const handleMinting = (boxType: any) => {
      if (!isMinting) {
         runDispatch(dispatch, 'MINTING_ON_PROCESS', '')
         axios
            .get(`http://localhost:5000/mint/box/${boxType}`, {
               withCredentials: true,
            })
            .then((res) => {
               if (res.data.status === 200) {
                  return runDispatch(dispatch, 'MINTING_SUCCESS', res.data.payload)
               } else {
                  return runDispatch(dispatch, 'MINTING_SUCCESS', res.data.message)
               }
            })
            .catch((err) => {
               console.log(err)
            })
      }
   }

   const handleExitMinting = () => {
      runDispatch(dispatch, 'MINTING_DONE', '')
   }

   const props: any = {
      data: mintBoxData,
      handleMinting,
      heroesData,
      starStyleOnRoulette,
      handleExitMinting,
      mintedNFT,
      isMinting,
      dispatch,
   }

   return (
      <>
         {isMintingSuccess && <MintBoxAnim {...props} />}
         <section className={s.main_bg}>
            <div className={s.mint_boxes}>
               <CreateMintBoxes {...props} />
            </div>
         </section>
      </>
   )
}
