import "../login/Login.css"
import { handleLogin} from "./LoginScripts";
import { useNavigate } from "react-router-dom";

export const Login = () =>{
    const navigate = useNavigate();
    
    const onSubmit = (event) =>{
        handleLogin(event, navigate);
    };

    return(      
        <div className="section-login">
        <div className="container">
            <img src="/Candado.png" alt="Candado" className="logo"/>

            <h2>¡Bienvenido de vuelta!</h2>
            <p> Por favor ingrese su información para entrar </p>
            <form onSubmit={onSubmit}>
                <div className="input-group">

                <label htmlFor="usuario">Usuario</label>

                <div className="input-con-icono">

                    <img src="/icono_usuario.png" alt="Icono Usuario" className="input-icon"/>
                    <input type="text" id="usuario" name="usuario" placeholder="Ingrese su usuario..."/>

                </div>
                </div>
                
                <div className="input-group">
                <label htmlFor="contraseña">Contraseña</label>
                <div className="input-con-icono">
                    <img src="/icono_contraseña.png" alt="Icono Contraseña" className="input-icon"/>
                    <input type="password" id="contraseña" name="contraseña" placeholder="Ingrese su contraseña..."></input>
                </div>
                </div>
                <button type="submit">Ingresar</button>
            </form>
        </div>
        </div>
    )
}