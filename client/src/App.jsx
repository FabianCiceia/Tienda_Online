import { Navigate, Route, Routes, Outlet } from 'react-router-dom'
import LoginRegister from './views/LoginRegister'
import { useState } from 'react'
import UserContext from './context/UserContext'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import Add from './views/Add'
import Navbar from './views/Navbar'
import Card from './views/Card'
import Home from './views/Home'
import Product from './views/Product'

const App = () => {

    const userDetails = JSON.parse(localStorage.getItem("user"));
    const userInfo = userDetails ? userDetails : null;
    const [user, setUser] = useState(userInfo)

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
            <div className='container'>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/store/home" />} />
                    <Route path="/login" element={
                        <PublicRoute>
                            <LoginRegister />
                        </PublicRoute>
                    } />
                    <Route path='/store' element={
                        <Outlet/>
                    }>
                        <Route path="home" element={<Home/>} />
                        <Route path="add" element={<Add/>} />
                        <Route path="product/:id" element={<Product/>} />
                    </Route>
                    <Route path="/user/" element={
                        <PrivateRoute>
                            <Outlet/>
                        </PrivateRoute>
                        
                    }>
                        <Route path='card' element={<Card/>}/>
                    </Route>
                </Routes>
            </div>
        </UserContext.Provider>
    )
}

export default App

