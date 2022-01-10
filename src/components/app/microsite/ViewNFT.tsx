import axios from 'axios'
import { useCallback, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MainStore } from '../../reduceStore/StoreProvider'
import { runDispatch } from '../../actions/dispatch'
import { heroesData } from '../../data/imagesData'

function CreateNFTCard(props: any) {
   const { nftData, userData, dispatch }: any = props
   const { name, rarity, attributes, sellPrice, isForSale, ownerID, _id } = nftData
   const { physicalAttack, magicAttack, health, defense, speed } = attributes
   const url = window.location.href

   //Sell nft
   const handleSellNFt = (e: any) => {
      e.preventDefault()
      const sellPrice = e.target.auctionPrice.value
      axios
         .get(`http://localhost:5000/sell/nft/${_id}/${sellPrice}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { data, status } = res
            console.log(data, url)
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: true,
                  isFetchingProcessing: true,
               })
            }
         })
   }

   //Buy nft
   const handleBuyNFT = () => {
      runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
         isFetchingProcessing: true,
      })
      axios
         .get(`http://localhost:5000/buy/nft/${_id}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { data, status } = res
            console.log(data)
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: false,
                  isFetchingProcessing: false,
                  isSold: false,
                  isBuySuccessful: true,
               })
            }
         })
   }

   //Cancel sell of nft
   const handleCancelSellNFT = () => {
      axios
         .get(`http://localhost:5000/cancel/sell/nft/${_id}`, {
            withCredentials: true,
         })
         .then((res) => {
            const { data, status } = res
            console.log(data)
            if (status === 200) {
               runDispatch(dispatch, 'UPDATE_NFT_FETCH_STATUS', {
                  isFetching: true,
                  isFetchingProcessing: true,
               })
            }
         })
      console.log('cancel sell nft')
   }

   return (
      <div className="vc-nft-card-container">
         <div className={`vc-nft-header-${rarity}`}>
            <p>{name}</p>
            <p>{rarity.charAt(0).toUpperCase() + rarity.slice(1)}</p>
         </div>
         <div className={`vc-nft-content-${rarity}`}>
            <div className="vc-nft-hero-data">
               <div
                  className={`vc-nft-img hero-halo-${
                     rarity === 'common' || rarity === 'uncommon'
                        ? rarity + '1 '
                        : name.charAt(0).toLowerCase() + name.slice(1)
                  }`}
               >
                  <span></span>
                  {heroesData.map((hero: any) => {
                     if (hero.name == name) {
                        return (
                           <div
                              key={name}
                              style={{ ...hero.sprite.wAnim, transform: ' scale(2)' }}
                           />
                        )
                     }
                  })}
               </div>
               <div className="vc-nft-stats">
                  <div className="vc-nft-stat">
                     <div className="nft-stat-img-pAttack"></div>
                     <div className="nft-stat-desc">
                        <p>{physicalAttack}</p>
                        <p>Attack</p>
                     </div>
                  </div>
                  <div className="vc-nft-stat">
                     <div className="nft-stat-img-mAttack"></div>
                     <div className="nft-stat-desc">
                        <p>{magicAttack}</p>
                        <p>Magic</p>
                     </div>
                  </div>
                  <div className="vc-nft-stat">
                     <div className="nft-stat-img-health"></div>
                     <div className="nft-stat-desc">
                        <p>{health}</p>
                        <p>Health</p>
                     </div>
                  </div>
                  <div className="vc-nft-stat">
                     <div className="nft-stat-img-defence"></div>
                     <div className="nft-stat-desc">
                        <p>{defense}</p>
                        <p>Defense</p>
                     </div>
                  </div>
                  <div className="vc-nft-stat">
                     <div className="nft-stat-img-speed"></div>
                     <div className="nft-stat-desc">
                        <p>{speed}</p>
                        <p>Speed</p>
                     </div>
                  </div>
               </div>
            </div>
            {isForSale && (
               <div className="vc-nft-auction-data">
                  <div className="vc-auction-price">
                     <div></div>
                     <div className="vc-auction-price-text">
                        <p>{sellPrice}</p>
                        <p>Price</p>
                     </div>
                  </div>
                  <div className="vc-auction-button">
                     {isForSale && ownerID !== userData.id && (
                        <button onClick={() => handleBuyNFT()}>Buy</button>
                     )}
                     {isForSale && ownerID == userData.id && (
                        <button onClick={() => handleCancelSellNFT()}>Cancel Sell</button>
                     )}
                  </div>
               </div>
            )}
            {!isForSale && ownerID == userData.id && (
               <form className="vc-nft-auction-data" action="" onSubmit={(e) => handleSellNFt(e)}>
                  <div className="vc-auction-price">
                     <div></div>
                     <div className="vc-auction-input">
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
                  <div className="vc-auction-button">
                     <button type="submit">Sell</button>
                  </div>
               </form>
            )}
         </div>
      </div>
   )
}

export default function ViewNFT() {
   const { state, dispatch } = useContext(MainStore)
   const {
      nft,
      isFetching,
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
      })
   }

   //Sent request to get nft through id
   const getNFTData = useCallback(() => {
      axios
         .get(`http://localhost:5000/${currDashboard}/nft/${id}`, {
            withCredentials: true,
         })
         .then((res) => {
            console.log(res.data)
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
      <section className="main-bg">
         <div className="vc-container">
            <div className="vc-back-button">
               <Link to={`/${currDashboard}`}>
                  <button onClick={() => handleBackToDashbord()}>Back</button>
               </Link>
            </div>
            {isFetching || isFetchingProcessing ? (
               <div className="vc-loading">
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
               <div className="vc-sold">Successfully purchased. Check your inventory.</div>
            ) : !isFetching && isSold ? (
               <div className="vc-sold">Sold or not for sale.</div>
            ) : !isFetching && isFetchingFailed ? (
               <div className="vc-error">Not found, error occured.</div>
            ) : !isFetching && !isSold && nft && !isFetchingProcessing ? (
               <CreateNFTCard nftData={nft} userData={user} dispatch={dispatch} />
            ) : null}
            {/* {nft ? <CreateNFTCard data={nft} /> : <div className="vc-sold">Sold</div>} */}
         </div>
      </section>
   )
}
