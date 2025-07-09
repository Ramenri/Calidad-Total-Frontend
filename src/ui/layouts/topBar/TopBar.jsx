import "./TopBar.css";
import { useEffect, useState } from "react";
import { obtenerUsuarioDesdeToken } from "./TopBarScripts";



export const TopBar = () => {
    const [usuario, setUsuario] = useState("");

    useEffect(() =>{
        const nombre = obtenerUsuarioDesdeToken();
        if (nombre) setUsuario(nombre);
    }, []);


    return (
        <div className="top-bar">
            <div className="top-bar-left">
                <h3>Hub Operario</h3>
            </div>
            <div className="top-bar-right">
                <img 
                    src="/Img_Calidad_Total.png" 
                    alt="Imagen de perfil"
                    className="profile-img"
                />
                <span className="user-name">{usuario}</span>
                <img
                    src="/Cerrar_sesion.png" 
                    alt="Cerrar sesión"
                    className="logout-img"
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/';
                    }}
                />
            </div>
        </div>
    );
};