// NavBar.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavBar.css";
import { 
    BsPersonFill,        
    BsBuildingsFill,     
    BsBuildingFill,     
    BsShieldFillCheck,   
    BsClockHistory,   
    BsXCircleFill 
} from "react-icons/bs";

export const NavBar = ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState("");

    // Sincronizar selectedMenu con la ruta actual
    useEffect(() => {
        const path = location.pathname;
        
        if (path.includes('/operarios')) {
            setSelectedMenu("operarios");
        } else if (path.includes('/centroTrabajo')) {
            setSelectedMenu("centros");
        } else if (path.includes('/empresa')) {
            setSelectedMenu("empresas");
        } else if (path.includes('/admin')) {
            setSelectedMenu("admin");
        } else if (path.includes('/historial')) {
            setSelectedMenu("historial");
        } else {
            setSelectedMenu("operarios"); // default
        }
    }, [location.pathname]);

    const handleMenuClick = (menuName, route) => {
        setSelectedMenu(menuName);
        navigate(route);
        // Opcional: cerrar el menú en móvil después de navegar
        // setIsOpen(false);
    };

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section >
            <div className={`interior ${isOpen ? "" : "closed"}`}>
                {isOpen ? (
                    <>
                        <button className="close-btn-menu" onClick={toggleNav}>
                            <BsXCircleFill/>
                        </button>
                        <nav className="navegacion">
                            <button 
                                className={selectedMenu === "operarios" ? "selected nav-link" : "nav-link"} 
                                onClick={() => handleMenuClick("operarios", "/operarios")}
                            >
                                <BsPersonFill/>
                                Operarios
                            </button>
                            <button 
                                className={selectedMenu === "centros" ? "selected nav-link" : "nav-link"} 
                                onClick={() => handleMenuClick("centros", "/centroTrabajo")}
                            >
                                <BsBuildingsFill/>
                                Centros de trabajo
                            </button>
                            <button 
                                className={selectedMenu === "empresas" ? "selected nav-link" : "nav-link"} 
                                onClick={() => handleMenuClick("empresas", "/empresa")}
                            >
                                <BsBuildingFill/>
                                Empresas
                            </button>
                            <button 
                                className={selectedMenu === "admin" ? "selected nav-link" : "nav-link"} 
                                onClick={() => handleMenuClick("admin", "/admin")}
                            >
                                <BsShieldFillCheck/>
                                Administradores
                            </button>
                            <button 
                                className={selectedMenu === "historial" ? "selected nav-link" : "nav-link"} 
                                onClick={() => handleMenuClick("historial", "/historial")}
                            >
                                <BsClockHistory/>
                                Historial
                            </button>
                        </nav>
                    </>
                ) : (
                    <button className="open-btn" onClick={toggleNav}>☰</button>
                )}
            </div>
        </section>
    );
};