import { useContext, useEffect, useCallback } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { runDispatch } from '../../actions/dispatch'
import s from '../../../../scss/main.css'

export default function Pagination(props: any) {
   const { dispatch } = useContext(MainStore)
   const { handleGoToPage, nftData, minPage, maxPage, pages, dashboard } = props
   const { totalPage, page } = nftData

   //Control the next and back of pagination
   const handlePagiMovePage = (action: string) => {
      if (dashboard == 'marketplace') {
         if (action === 'next' && maxPage < pages[pages.length - 1]) {
            return runDispatch(dispatch, 'INC_USER_NFT_PAGES', {
               minPage: minPage + 5,
               maxPage: maxPage + 5,
            })
         }
         if (action === 'back' && minPage > 1) {
            return runDispatch(dispatch, 'DEC_USER_NFT_PAGES', {
               minPage: minPage - 5,
               maxPage: maxPage - 5,
            })
         }
      }
      if (dashboard == 'myNFT') {
         if (action === 'next' && maxPage < pages[pages.length - 1]) {
            return runDispatch(dispatch, 'INC_USER_NFT_PAGES', {
               myNFTMinPage: minPage + 5,
               myNFTMaxPage: maxPage + 5,
            })
         }
         if (action === 'back' && minPage > 1) {
            return runDispatch(dispatch, 'DEC_USER_NFT_PAGES', {
               myNFTMinPage: minPage - 5,
               myNFTMaxPage: maxPage - 5,
            })
         }
      }
   }

   //Create an array of page num for pagination to make
   const handleSetPages = useCallback(() => {
      const tempPages: any = []
      for (let i = 1; i <= totalPage; i++) {
         if (pages.length != totalPage) {
            tempPages.push(i)
         }
      }

      if (tempPages.length === totalPage) {
         if (dashboard == 'marketplace') {
            runDispatch(dispatch, 'SET_USER_NFT_PAGES', { pages: tempPages })
         }
         if (dashboard == 'myNFT') {
            runDispatch(dispatch, 'SET_USER_NFT_PAGES', { myNFTPages: tempPages })
         }
      }
   }, [dispatch, pages.length, totalPage, dashboard])

   //If new nfts data were loaded, update page array data for pagination
   useEffect(() => {
      if (nftData) {
         handleSetPages()
      }
   }, [handleSetPages, nftData])

   return (
      <div className={s.pagination_control}>
         <button className={s.pagi_button} onClick={() => handlePagiMovePage('back')}>
            &#60;
         </button>
         <div
            key={1}
            className={`${s.pagi_num} ${page == 1 ? s.active_page : ''}`}
            onClick={() => handleGoToPage({ page: 1 })}
         >
            1
         </div>
         {minPage > 5 && <div>...</div>}
         {pages.map((pageNum: any) => {
            if (pageNum >= minPage && pageNum <= maxPage && pageNum !== 1) {
               return (
                  <div
                     key={pageNum}
                     className={`${s.pagi_num} ${page == pageNum ? s.active_page : ''}`}
                     onClick={() => handleGoToPage({ page: pageNum })}
                  >
                     {pageNum}
                  </div>
               )
            }
         })}
         <button className={s.pagi_button} onClick={() => handlePagiMovePage('next')}>
            &#62;
         </button>
      </div>
   )
}
