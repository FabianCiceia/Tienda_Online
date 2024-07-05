import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import { useState } from 'react'
import UserContext from './context/UserContext'

import PublicRoute from './components/PublicRoute'
import Navbar from './views/Navbar'
import Footer from './views/Footer'
import LoginRegister from './views/user/LoginRegister'
import Home from './views/store/Home'
import Product from './views/store/Product'
import SearchProduct from './views/store/SearchProduct'
import Category from './views/store/Category'
import PruebaComponente from './views/PruebaComponente'


import PrivateRoute from './components/PrivateRoute'
import Profile from './views/user/Profile'
import ShCart from './views/user/ShCart'


// import AdminRoute from './components/admin/AdminRoute'
// import Edit from './views/admin/Edit'
// import Add from './views/admin/Add'
// import PanelControl from './views/admin/PanelControl'

import './styles/admin/common.css'
import './styles/components/container.css'
import './styles/components/button.css'
import './styles/Card.css'
const App = () => {

    const userDetails = JSON.parse(localStorage.getItem("user"));
    const userInfo = userDetails ? userDetails : null;
    const [user, setUser] = useState(userInfo);
    const setUserKeyValue = (clave, valor) => {
        setUser({ ...user, [clave]: valor })
    }
    const objetoContexto = {
        user,
        setUser,
        setUserKeyValue
    }

    return (

        <UserContext.Provider value={objetoContexto}>
            <div className='container-body'>
                <Navbar />
                <Routes>

                    <Route path="/" element={<Navigate to="/store/home" />} />
                    <Route path="/login" element={
                        <PublicRoute>
                            <LoginRegister />
                        </PublicRoute>
                    } />

                    {/* Parte de la tienda todo publico */}
                    <Route path='/store' >
                        <Route path="home" element={<Home />} />
                        <Route path="search/:search" element={<SearchProduct />} />
                        <Route path="category/:category" element={<Category />} />
                        <Route path="product/:id" element={<Product />} />
                        <Route path='prueba' element={<PruebaComponente />} />
                    </Route>

                    {/* Parte del usuario solo para cuando se logea */}
                    <Route path="/user/" element={
                        <PrivateRoute>
                            <Outlet />
                        </PrivateRoute>

                    }>
                        <Route path='cart' element={<ShCart />} />
                        <Route path='profile' element={<Profile />} />
                    </Route>

                    {/* Parte para administrador solo admins */}
                    {/* <Route path="/admin/" element={
                        <AdminRoute>
                            <Outlet />
                        </AdminRoute>

                    }>
                        <Route path='panel' element={<PanelControl />} />
                        <Route path="add" element={<Add />} />
                        <Route path="edit/:id" element={<Edit />} />
                    </Route> */}
                </Routes>
            </div>
                <Footer />
        </UserContext.Provider>
    )
}

export default App

