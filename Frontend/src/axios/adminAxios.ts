import axios from 'axios'
const instance=axios.create({
    baseURL:import.meta.env.VITE_API_ADMIN_BASEURL,
    withCredentials:true
})
export default instance