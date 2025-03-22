import UserRoute from './Routes/UserRoute'
import VendorRoute from './Routes/VendorRoute'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import AdminRoute from './Routes/AdminRoute'
function App() {
 

  return (
   <BrowserRouter>
    {/* <Header/> */}
   <Routes>
    <Route path='/*' element={<UserRoute/>}></Route>
    <Route path='/vendor/*' element={<VendorRoute/>}></Route>
    <Route path='/admin/*' element={<AdminRoute/>}></Route>
   </Routes>
   </BrowserRouter>

 
  )
}

export default App
