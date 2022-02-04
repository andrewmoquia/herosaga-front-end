import { Workbox } from 'workbox-window'

export default function RegisterServiceWorker() {
   if ('serviceWorker' in navigator) {
      //Instantiate workbox
      const wb = new Workbox('/sw.js')
      //Show pop up if theres any change in the codebase
      wb.addEventListener('installed', (event) => {
         if (event.isUpdate) {
            if (confirm('New app update is available click ok to refresh')) {
               //Reload the page
               window.location.reload()
            }
         }
      })
      wb.register()
   }
}
