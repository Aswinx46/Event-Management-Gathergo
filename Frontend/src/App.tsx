import UserRoute from './Routes/UserRoute'

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

function App() {
 

  return (
   <BrowserRouter>
    {/* <Header/> */}
   <Routes>
    <Route path='/*' element={<UserRoute/>}></Route>
   </Routes>
   </BrowserRouter>

 
  )
}

export default App
