import "./administradores.css"
import {
    BsPerson,
    BsPlus,
    BsTrash,
} from "react-icons/bs";
import { useAdministradores } from "./useAdministradores";

export const Administradores = ({isNavOpen}) => {
    const {
        listaAdministradores,
        mostrarModalAgregar,
        compararId,
        operarioEncontrado,
        setMostrarModalAgregar,
        handlerSubmitAgregarAdmin,
        onchangeInputsAgregarAdmin,
        handlerEliminarAdmin,
        buscarPorCedula,
        limpiarFormulario
    } = useAdministradores();

    const renderFormularioAgregarAdmin = () => {
        return (
            <form className="modal-overlay" onSubmit={handlerSubmitAgregarAdmin}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Añadir nuevo administrador</h3>
                    </div>
                    
                    <div className="modal-body">
                        <div className="form-section">
                            <div className="form-group">
                                <label className="form-label">Usuario</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el usuario"
                                    name="usuario"
                                    onChange={onchangeInputsAgregarAdmin}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Contraseña</label>
                                <input 
                                    required
                                    type="password" 
                                    className="form-input"
                                    placeholder="Ingrese la contraseña"
                                    name="contraseña"
                                    onChange={onchangeInputsAgregarAdmin}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Buscar por cedula</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese la cedula"
                                    name="cedula"
                                    onChange={onchangeInputsAgregarAdmin}
                                />
                                <button 
                                    type="button" 
                                    style={{width: "30%", marginTop: "10px"}} 
                                    onClick={buscarPorCedula}
                                >
                                    Buscar
                                </button>
                            </div>
                            <div className="form-group">
                                <label htmlFor="operarioId">Operario Seleccionado</label>
                                <input 
                                    type="text" 
                                    disabled 
                                    value={operarioEncontrado ? 
                                        `${operarioEncontrado.nombre} ${operarioEncontrado.apellido}`: 
                                        ""
                                    } 
                                    placeholder="Busca por la cédula para seleccionar un operario"
                                    style={{
                                        backgroundColor: '#f7fafc',
                                        color: operarioEncontrado ? '#2d3748' : '#a0aec0'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => {
                                setMostrarModalAgregar(false);
                                limpiarFormulario();
                            }}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn-add"
                            disabled={!operarioEncontrado}
                            style={{
                                opacity: operarioEncontrado ? 1 : 0.6,
                                cursor: operarioEncontrado ? 'pointer' : 'not-allowed'
                            }}
                        >
                            Añadir
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    return (
        <section className="seccion-centro-tranajo">
            <div className={`main-content ${isNavOpen ? 'nav-open' : 'nav-closed'}`}>
                <div className="empresa">
                    <div className="content-header">
                        <div className="header-left">
                            <BsPerson />
                            <h1 className="main-title">Administradores</h1>
                        </div>
                        <button 
                            className="add-btn"
                            onClick={() => setMostrarModalAgregar(true)}
                        >
                            <BsPlus size={20} />
                            Añadir admin
                        </button>
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Cedula</th>
                                    <th>Nombre</th>
                                    <th>Correo</th>
                                    <th>Telefono</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaAdministradores && listaAdministradores.length > 0 ? (
                                    listaAdministradores.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.informacion_operario.numeroCedula}</td>
                                            <td>{item.informacion_operario.nombre} {item.informacion_operario.apellido}</td>
                                            <td>{item.informacion_operario.correo}</td>
                                            <td>{item.informacion_operario.numeroTelefonico}</td>
                                            <td>
                                                <span className={`status-badge ${item.informacion_operario.estado ? "green" : "orange"}`}>
                                                    {item.informacion_operario.estado ? "Activado" : "Inactivo"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    {compararId === item.id ? (
                                                        <button 
                                                            onClick={() => alert("No te puedes eliminar a ti mismo")} 
                                                            className="action-btn blue disabled"
                                                        >
                                                            <BsTrash />
                                                        </button>
                                                    ) : (
                                                        <button 
                                                            onClick={() => handlerEliminarAdmin(item.id)} 
                                                            className="action-btn blue"
                                                        >
                                                            <BsTrash />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', color: '#718096', fontStyle: 'italic' }}>
                                            No hay administradores registrados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {mostrarModalAgregar && renderFormularioAgregarAdmin()}
                </div>
            </div>
        </section>
    );
}