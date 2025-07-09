import { useEffect, useState } from "react";
import "./historial.css"
import  {obtenerTodosHistorial} from "../../../apis/historialApis"
import {
    FaHistory,
} from "react-icons/fa";

export const Historial = ({isNavOpen}) => {

    const [listaHistorial, setListaHistorial] = useState([])

    const handlerObtenerTodosLosHistorial = async () => {
        const data = await obtenerTodosHistorial()
        setListaHistorial(data)
    }

    useEffect(()=> {
        handlerObtenerTodosLosHistorial()
    }, [])

    return (
        <section className="seccion-centro-tranajo">
            <div className={`main-content ${isNavOpen ? 'nav-open' : 'nav-closed'}`}>
                <div className="empresa">
                    <div className="content-header">
                        <div className="header-left">
                            <FaHistory />
                            <h1 className="main-title">Historial de registros</h1>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Cedula</th>
                                    <th>Nombre</th>
                                    <th>Accion</th>
                                    <th>Descripcion</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaHistorial && listaHistorial.length > 0 ? (
                                    listaHistorial.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.usuario.informacion_operario.numeroCedula}</td>
                                            <td>{item.usuario.informacion_operario.nombre} {item.usuario.informacion_operario.apellido}</td>
                                            <td>{item.accion}</td>
                                            <td>{item.descripcion}</td>
                                            <td>{item.fecha}</td>
                                            <td>{item.hora}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', color: '#718096', fontStyle: 'italic' }}>
                                            No hay historial de registrs
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}