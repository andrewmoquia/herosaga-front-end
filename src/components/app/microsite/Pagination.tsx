import { useContext, useEffect, useCallback } from 'react'
import { MainStore } from '../../reduceStore/StoreProvider'
import { runDispatch } from '../../actions/dispatch'

export default function Pagination(props: any) {
   const { state, dispatch } = useContext(MainStore)
   const { minPage, maxPage, pages } = state
   const { handleSetFilter, totalPage, nfts, page } = props

   //Control the next and back of pagination
   const handlePagiMovePage = (action: string) => {
      if (action === 'next' && maxPage < pages[pages.length - 1]) {
         return runDispatch(dispatch, 'INC_USER_NFT_PAGES', '')
      }
      if (action === 'back' && minPage > 1) {
         return runDispatch(dispatch, 'DEC_USER_NFT_PAGES', '')
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
         runDispatch(dispatch, 'SET_USER_NFT_PAGES', tempPages)
      }
   }, [dispatch, pages.length, totalPage])

   //If new nfts data were loaded, update page array data for pagination
   useEffect(() => {
      if (nfts) {
         handleSetPages()
      }
   }, [handleSetPages, nfts])

   return (
      <div className="pagination-control">
         <button className="pagi-button" onClick={() => handlePagiMovePage('back')}>
            &#60;
         </button>
         <div
            key={1}
            className={`pagi-num ${page == 1 ? 'active-page' : ''}`}
            onClick={() => handleSetFilter({ page: 1 })}
         >
            1
         </div>
         {minPage > 5 && <div>...</div>}
         {pages.map((pageNum: any) => {
            if (pageNum >= minPage && pageNum <= maxPage && pageNum !== 1) {
               return (
                  <div
                     key={pageNum}
                     className={`pagi-num ${page == pageNum ? 'active-page' : ''}`}
                     onClick={() => handleSetFilter({ page: pageNum })}
                  >
                     {pageNum}
                  </div>
               )
            }
         })}
         <button className="pagi-button" onClick={() => handlePagiMovePage('next')}>
            &#62;
         </button>
      </div>
   )
}
