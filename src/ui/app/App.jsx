import {Login} from "../components/login/Login";
import { ArchivosOperario } from "../components/archivosOperario/ArchivosOperario";
import { CentroTrabajo } from "../components/centroTrabajo/centroTrabajo";
import { Empresa } from "../components/empresa/empresa";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/privateRoute/PrivateRoute";
import { NavBar } from "../layouts/navBar/NavBar";
import { TopBar } from "../layouts/topBar/TopBar";
import { useState } from "react";
import { Administradores } from "../components/administradores/administradores";
import { Operarios } from "../components/operarios/operarios";
import { Historial } from "../components/historial/historial";

export const App = () =>{

    const [isNavOpen, setIsNavOpen] = useState(true);

    const renderPaginas = (componente) => {
        return (
            <div className="contenedor-principal-pagina">
                <TopBar />
                <NavBar isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
                {componente}
            </div>
        )
    }

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/operarios" element={<PrivateRoute  rolesPermitidos={["administrador", "usuario"]} >
                        {renderPaginas(<Operarios isNavOpen={isNavOpen} />)}
                    </PrivateRoute>}/>
                    <Route path="/archivo/:idOperario" element={<PrivateRoute  rolesPermitidos={["administrador", "usuario"]} >
                        {<ArchivosOperario />}
                    </PrivateRoute>}/>
                    <Route path="/centroTrabajo" element={<PrivateRoute  rolesPermitidos={["administrador"]} >
                        {renderPaginas(<CentroTrabajo isNavOpen={isNavOpen} />)}
                    </PrivateRoute>}/>
                    <Route path="/empresa" element={<PrivateRoute  rolesPermitidos={["administrador"]} >
                        {renderPaginas(<Empresa isNavOpen={isNavOpen} />)}
                    </PrivateRoute>}/>
                    <Route path="/admin" element={<PrivateRoute  rolesPermitidos={["administrador"]} >
                        {renderPaginas(<Administradores isNavOpen={isNavOpen} />)}
                    </PrivateRoute>}/>
                    <Route path="/historial" element={<PrivateRoute  rolesPermitidos={["administrador"]} >
                        {renderPaginas(<Historial isNavOpen={isNavOpen} />)}
                    </PrivateRoute>}/>
                </Routes>
            </Router>
        </>
    )

}


    