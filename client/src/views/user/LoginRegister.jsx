import { useState } from "react"
import UserForm from "../../components/UserForm"
import '../../styles/LoginRegister.css'
const LoginRegister = () => {
    const [registre , useRegistre] = useState(true);

    if(registre){
        return(
            <div className="containerBody">
                <div>
                    <h1 className="titleLogin">Bienvenido</h1>
                    <UserForm formType="login" />
                    <p className="changeLogin">NUEVO USUARIO ? <a onClick={()=>useRegistre(false)}>REGISTRARSE</a></p>
                </div>
            </div>
        );
    }else{
        return(
            <div className="containerBody">
                <div>
                    <h1 className="titleLogin">Registrarse</h1>
                    <div className="register">
                        <UserForm formType="registro" />
                    </div>
                    <p className="changeLogin">YA TIENES UNA CUENTA ? <a onClick={()=>useRegistre(true)}>INICIAR SECIÓN</a></p>
                </div>
            </div>
            
        )
    }
}

export default LoginRegister