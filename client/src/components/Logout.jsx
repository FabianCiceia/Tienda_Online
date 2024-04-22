import React, { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UserContext from '../context/UserContext';
function Logout() {
    const baseURL = "http://localhost:8000/api/auth/logout";
    const { setUser } = useContext(UserContext);
    const logoutUser = async () => {
        try {
            await axios.post("http://localhost:8000/api/auth/logout",
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
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
}

export default Logout;
