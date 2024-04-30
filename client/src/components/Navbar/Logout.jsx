import React, { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';


function Logout() {
    const navigate = useNavigate()


    const baseURL = "http://localhost:8000/api/auth/logout";
    const { setUser } = useContext(UserContext);
    const logoutUser = async () => {
        try {
            await axios.post(`${baseURL}`,       //Le puse el base Url
                { withCredentials: true }
            );
            localStorage.removeItem("user");
            setUser(null)
            navigate("/login") 
        } catch (err) {
            console.log("Error: ", err)
        }
    }
    const handleLogout = () => {
        logoutUser();                       
    };

    return (
        <div>
            <a  onClick={handleLogout}>Cerrar sesión</a>
        </div>
    );
}

export default Logout;
