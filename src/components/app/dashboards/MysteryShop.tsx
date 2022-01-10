import { mintBoxData } from '../../data/mintBoxData'
import { useContext } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { heroesData, starStyleOnRoulette } from '../../data/imagesData'
import { runDispatch } from '../../actions/dispatch'
import axios from 'axios'

const generateHeroes = (mintedNFT: any) => {
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
   const { handleExitMinting, mintedNFT } = props
   const heroes = generateHeroes(mintedNFT)
   return (
      <div className="mint-anim-cont">
         <div className="mint-hero-rarity">
            <img
               src={`http://localhost:3000/images/you-got-${mintedNFT.rarity}.png`}
               alt="Rarity text."
               className="rarity-img"
            />
         </div>
         <div className="mint-hero-char-cont">
            <div className="mint-hero-char-cards">
               {heroes.map((hero: any, index: any) => {
                  return (
                     <div className="mint-hero-char-card" key={`${hero.name}-${index}`}>
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
         <div className="mint-frame-cont">
            <img
               src="http://localhost:3000/images/mint-frame.png"
               alt="Mint Frame"
               className="mint-frame-img"
            />
            {starStyleOnRoulette.map((style, index) => {
               return (
                  <div className={`${style} star-glow-${mintedNFT.rarity}`} key={index}>
                     <img src="http://localhost:3000/images/star.png" alt="Star" width={22} />
                  </div>
               )
            })}
         </div>
         <div className="mint-char-roulette">
            <div className={`char-roulette-anim`} style={{ ...heroes[10].sprite.wAnim }} />
         </div>
         <div className="mint-anim-back-button" onClick={() => handleExitMinting()}>
            <img src="http://localhost:3000/images/BACK.png" alt="Back" width={90} />
         </div>
      </div>
   )
}

function CreateMintBoxes(props: any) {
   const { data, handleMinting, isMinting } = props
   return data.map((box: any) => {
      const { image, tile, type, chances, price } = box
      return (
         <div className="mint-box" key={type[1]}>
            <div className="mint-box-img-cont">
               <img src={image} alt={type[0]} />
            </div>
            <div className="mint-box-tile-cont">
               <img src={tile} alt={type[0]} />
            </div>
            <div className="mint-box-buy-cont">
               {isMinting ? (
                  <button className="mint-button" disabled>
                     <p>BUY</p>
                  </button>
               ) : (
                  <button className="mint-button" onClick={() => handleMinting(type[1])}>
                     <p>BUY</p>
                  </button>
               )}
               <div className="mint-desc">
                  <p>{type[0]}</p>
                  <p>Price: {price} INMS</p>
               </div>
            </div>
            <div className="mint-box-desc-cont">
               <div className="chances-desc-header">
                  <p>Chances</p>
               </div>
               <div className="chances-perc-cont">
                  {chances.map((chances: any) => {
                     const { chance, percentage } = chances
                     return (
                        <div className="chances-perc" key={chance}>
                           <div className={`chances-percentage ${chance[1]}`}>{percentage}%</div>
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
   const { isMintingSuccess, mintedNFT, isMinting } = state

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
      handleExitMinting,
      mintedNFT,
      isMinting,
      dispatch,
   }

   return (
      <>
         {isMintingSuccess && <MintBoxAnim {...props} />}
         <section className="main-bg">
            <div className="mint-boxes">
               <CreateMintBoxes {...props} />
            </div>
         </section>
      </>
   )
}
