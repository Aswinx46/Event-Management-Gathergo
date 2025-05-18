import UserRoute from './Routes/UserRoute'
import VendorRoute from './Routes/VendorRoute'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminRoute from './Routes/AdminRoute'
import { Toaster } from 'react-hot-toast'
import 'leaflet/dist/leaflet.css';
import ScrollToTop from './components/other components/ScrollToTop'
import SocketManager from './components/socketClient/SocketClientManage'
function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" />
      <SocketManager />
      <Routes>
        <Route path='/*' element={<UserRoute />}></Route>
        <Route path='/vendor/*' element={<VendorRoute />}></Route>
        <Route path='/admin/*' element={<AdminRoute />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
