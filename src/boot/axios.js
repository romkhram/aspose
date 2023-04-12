import { boot } from 'quasar/wrappers'
import axios from 'axios'

const barcode = axios.create({ baseURL: '/barcode' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
})

export { axios, barcode }
