import React from 'react'
// import { NavBar } from '../components/NavBar/NavBar'
import NavBar from '../components/NavBar/NavBar'
import { Home } from '../components/Home/Home'
import { RestaurantDetails } from '../components/Restaurant/RestaurantDetails'
import { Cart } from '../components/Cart/Cart'
import { Profile } from '../components/Profile/Profile'
import { Route, Routes } from 'react-router-dom'
import Auth from '../components/Auth/Auth'
import { PaymentSuccess } from '../components/Payment/PaymentSuccess'
import Search from '../components/Search/Search'

export const CustomerRoutes = () => {
  const [openSideBar, setOpenSideBar] = React.useState(false);
  const handleOpenSide = () => setOpenSideBar(!openSideBar);
  const handleCloseSide = () => setOpenSideBar(!openSideBar);


  return (
    <div>
    <NavBar handleOpenSide={handleOpenSide}/>
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/account/:register' element={<Home/>}/>
        <Route exact path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/my-profile/*' element={<Profile handleCloseSide={handleCloseSide} openSideBar={openSideBar}/>}/>
        <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>

        <Route path='/search' element={<Search/>}/>
        {/* <Route path='/admin/add-restaurant' element={<CreateRestaurantForm/>}/>
        <Route exact path='/password_change_success' element={<PasswordChangeSuccess/>}/>
        <Route exact path='/*' element={<NotFound/>}/> */}
    </Routes>
    <Auth/>
    </div>
  )
}
