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
  // const location = window.location
  // const path = location.pathname.split('/')[1]
  // // console.log(path)
  // const [data, setData] = useState(null)
  // const [notification, setNotification] = useState<boolean>(false)
  // const client = useSelector((state: RootState) => state.clientSlice.client)
  // const vendor = useSelector((state: RootState) => state.vendorSlice.vendor)
  // let user = null
  // if (path == 'vendor') {
  //   user = vendor
  // } else {
  //   user = client
  // }
  // console.log(user)
  // useEffect(() => {
  //   if (!user) return
  //   socket.connect()
  //   socket.emit('register', { userId: user._id, name: user.name });

  //   socket.on('notification', (data) => {
  //     // toast.info(data)
  //     setData(data)
  //     setNotification(true)
  //     // toast.info(
  //     //   <div>
  //     //     <strong>{`New Message from ${data.from}`}</strong>
  //     //     <div style={{ fontSize: '14px' }}>{data.message}</div>
  //     //   </div>
  //     // );
  //     // console.log('notification console ', data)
  //   });

  //   return () => {
  //     socket.disconnect()
  //     socket.off('notification')
  //   }

  // }, [user])
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
