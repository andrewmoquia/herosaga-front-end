import axios from 'axios'
import { useCallback, useEffect, useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MainStore } from '../../reduceStore/StoreProvider'
import { runDispatch } from '../../actions/dispatch'
import s from '../../../../scss/main.css'
import { v4 as uuidv4 } from 'uuid'
import { config } from '../../../api'

const { CANCEL_SELL, BUY_NFT, SELL_NFT } = config

export default function ViewNFT() {
   const { state, dispatch } = useContext(MainStore)
   const {
      nft,
      isFetching,
      heroesData,
      isSold,
      isFetchingFailed,
      user,
      isFetchingProcessing,
      isBuySuccessful,
   } = state
   const { id }: any = useParams()
   const currDashboard = window.location.href.split('/')[3]

   const handleBackToDashbord = () => {
      runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
         isFetchingNFT: true,
         isFetchingTransacs: true,
      })
   }

   //Sent request to get nft through id
   const getNFTData = useCallback(() => {
      axios
         .get(`https://incumons.herokuapp.com/${currDashboard}/nft/${id}`, {
            withCredentials: true,
         })
         .then((res) => {
            console.log(res)
            const { status, payload }: any = res.data
            if (status == 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: false,
                  isFetchingProcessing: false,
                  nft: { ...payload },
               })
            } else if (status == 204) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: false,
                  isFetchingProcessing: false,
                  isSold: true,
               })
            } else {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: false,
                  isFetchingFailed: true,
                  isFetchingProcessing: false,
               })
            }
         })
         .catch(() => {
            runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
               isFetching: false,
               isFetchingFailed: true,
               isFetchingProcessing: false,
            })
         })
   }, [id, dispatch, currDashboard])

   //Fetch selected nft
   useEffect(() => {
      runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
         isBuySuccessful: false,
      })
      if (isFetching) {
         getNFTData()
      }
   }, [getNFTData, dispatch, isFetching, nft])

   return (
      <section className={s.main_bg}>
         <div className={s.vc_container}>
            <div className={s.vc_back_button}>
               <Link to={`/${currDashboard}`}>
                  <button onClick={() => handleBackToDashbord()}>Back</button>
               </Link>
            </div>
            {isFetching || isFetchingProcessing ? (
               <div className={s.vc_loading}>
                  <svg
                     version="1.1"
                     id="L4"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink"
                     x="0px"
                     y="0px"
                     viewBox="0 0 100 100"
                     enableBackground="new 0 0 0 0"
                     xmlSpace="preserve"
                  >
                     <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                        <animate
                           attributeName="opacity"
                           dur="1s"
                           values="0;1;0"
                           repeatCount="indefinite"
                           begin="0.1"
                        ></animate>
                     </circle>
                     <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                        <animate
                           attributeName="opacity"
                           dur="1s"
                           values="0;1;0"
                           repeatCount="indefinite"
                           begin="0.2"
                        ></animate>
                     </circle>
                     <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                        <animate
                           attributeName="opacity"
                           dur="1s"
                           values="0;1;0"
                           repeatCount="indefinite"
                           begin="0.3"
                        ></animate>
                     </circle>
                  </svg>
               </div>
            ) : isBuySuccessful ? (
               <div className={s.vc_sold}>Successfully purchased. Check your inventory.</div>
            ) : !isFetching && isSold ? (
               <div className={s.vc_sold}>Sold or not for sale.</div>
            ) : !isFetching && isFetchingFailed ? (
               <div className={s.vc_error}>Not found, error occured.</div>
            ) : !isFetching && !isSold && nft && !isFetchingProcessing ? (
               <CreateNFTCard
                  nftData={nft}
                  userData={user}
                  dispatch={dispatch}
                  heroesData={heroesData}
                  isFetchingProcessing={isFetchingProcessing}
               />
            ) : null}
            {/* {nft ? <CreateNFTCard data={nft} /> : <div className="vc-sold">Sold</div>} */}
         </div>
      </section>
   )
}

function CreateNFTCard(props: any) {
   const { nftData, userData, dispatch, heroesData, isFetchingProcessing }: any = props
   const { name, rarity, attributes, sellPrice, isForSale, ownerID, _id } = nftData
   const { physicalAttack, magicAttack, health, defense, speed } = attributes
   const [isProcessing, setIsProcessing] = useState(false)

   useEffect(() => {
      if (isFetchingProcessing) {
         setIsProcessing(true)
      }
   }, [isFetchingProcessing, isProcessing])

   //Sell nft
   const handleSellNFt = (e: any) => {
      e.preventDefault()
      const sellPrice = e.target.auctionPrice.value
      axios
         .get(`${SELL_NFT}/${_id}/${sellPrice}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { status } = res
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: true,
                  isFetchingProcessing: true,
                  notif: {
                     id: uuidv4(),
                     type: 'success',
                     message: 'Successfully put NFT on marketplace.',
                  },
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
      setIsProcessing(!isProcessing)
   }

   //Buy nft
   const handleBuyNFT = () => {
      runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
         isFetchingProcessing: true,
      })
      axios
         .get(`${BUY_NFT}/${_id}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { status } = res
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: false,
                  isFetchingProcessing: false,
                  isSold: false,
                  isBuySuccessful: true,
                  notif: {
                     id: uuidv4(),
                     type: 'success',
                     message: 'Successfully bought a NFT.',
                  },
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
      setIsProcessing(!isProcessing)
   }

   //Cancel sell of nft
   const handleCancelSellNFT = () => {
      axios
         .get(`${CANCEL_SELL}/${_id}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { data, status } = res
            console.log(data)
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: true,
                  isFetchingProcessing: true,
                  notif: {
                     id: uuidv4(),
                     type: 'success',
                     message: 'Successfully cancelled selling a NFT',
                  },
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
      setIsProcessing(!isProcessing)
   }

   const headerRarityCSS = `vc_nft_header_${rarity}`
   const headerContentCSS = `vc_nft_content_${rarity}`
   const heroHaloCSS = `hero_halo_${
      rarity === 'common' || rarity === 'uncommon' ? rarity + '1' : name.toLowerCase()
   }`

   return (
      <div className={s.vc_nft_card_container}>
         <div className={s[headerRarityCSS]}>
            <p>{name}</p>
            <p>{rarity.charAt(0).toUpperCase() + rarity.slice(1)}</p>
         </div>
         <div className={s[headerContentCSS]}>
            <div className={s.vc_nft_hero_data}>
               <div className={`${s.vc_nft_img} ${s[heroHaloCSS]}`}>
                  <span></span>
                  {heroesData.map((hero: any) => {
                     if (hero.name == name) {
                        const { wAnim } = hero.sprite
                        const heroAnimCSS = wAnim.animation
                           .split(',')[0]
                           .split(' ')[0]
                           .split('-')
                           .join('_')
                        return (
                           <div
                              key={name}
                              style={{
                                 ...hero.sprite.wAnim,
                                 transform: ' scale(2)',
                                 animation: `${s[heroAnimCSS]} 0.5s steps(4) infinite`,
                              }}
                           />
                        )
                     }
                  })}
               </div>
               <div className={s.vc_nft_stats}>
                  <div className={s.vc_nft_stat}>
                     <div className={s.nft_stat_img_pAttack}></div>
                     <div className={s.nft_stat_desc}>
                        <p>{physicalAttack}</p>
                        <p>Attack</p>
                     </div>
                  </div>
                  <div className={s.vc_nft_stat}>
                     <div className={s.nft_stat_img_mAttack}></div>
                     <div className={s.nft_stat_desc}>
                        <p>{magicAttack}</p>
                        <p>Magic</p>
                     </div>
                  </div>
                  <div className={s.vc_nft_stat}>
                     <div className={s.nft_stat_img_health}></div>
                     <div className={s.nft_stat_desc}>
                        <p>{health}</p>
                        <p>Health</p>
                     </div>
                  </div>
                  <div className={s.vc_nft_stat}>
                     <div className={s.nft_stat_img_defence}></div>
                     <div className={s.nft_stat_desc}>
                        <p>{defense}</p>
                        <p>Defense</p>
                     </div>
                  </div>
                  <div className={s.vc_nft_stat}>
                     <div className={s.nft_stat_img_speed}></div>
                     <div className={s.nft_stat_desc}>
                        <p>{speed}</p>
                        <p>Speed</p>
                     </div>
                  </div>
               </div>
            </div>
            {isForSale && (
               <div className={s.vc_nft_auction_data}>
                  <div className={s.vc_auction_price}>
                     <div></div>
                     <div className={s.vc_auction_price_text}>
                        <p>{sellPrice}</p>
                        <p>Price</p>
                     </div>
                  </div>
                  <div className={s.vc_auction_button}>
                     {isProcessing && <button>Processing....</button>}
                     {!isProcessing && isForSale && ownerID !== userData.id && (
                        <button onClick={() => handleBuyNFT()}>Buy</button>
                     )}
                     {!isProcessing && isForSale && ownerID == userData.id && (
                        <button onClick={() => handleCancelSellNFT()}>Cancel Sell</button>
                     )}
                  </div>
               </div>
            )}
            {!isForSale && ownerID == userData.id && (
               <form className={s.vc_nft_auction_data} action="" onSubmit={(e) => handleSellNFt(e)}>
                  <div className={s.vc_auction_price}>
                     <div></div>
                     <div className={s.vc_auction_input}>
                        <input
                           type="number"
                           placeholder="Set price"
                           required
                           min={1}
                           id="auctionPrice"
                        />
                        <p>Price</p>
                     </div>
                  </div>
                  <div className={s.vc_auction_button}>
                     {isProcessing && <button disabled>Processing....</button>}
                     {!isProcessing && <button type="submit">Sell</button>}
                  </div>
               </form>
            )}
         </div>
      </div>
   )
}
