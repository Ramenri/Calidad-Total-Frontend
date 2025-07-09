import "./empresa.css"
import { useEmpresa } from "./useEmpresa"
import {
    BsBuilding,
    BsPlus,
    BsPencil
} from "react-icons/bs";

export const Empresa = ({isNavOpen}) => {
    const {
        listEmpresas,
        handlerModalEditar,
        agregarEmpresaModal,
        handlerModalAgregarEmpresa,
        handlerSubmitAgregarEmpresa,
        onchangeInputsAgregarEmpresa,
        setAgregarEmpresaModal,
        formDataEditarEmpresa,
        onchangeInputsEditarEmpresa,
        handlerSubmitEditarEmpresa,
        mostrarModalEditar,
        setMostrarModalEditar
    } = useEmpresa();

    const renderFormularioEditarEmpresa = () => {
        return (
            <form className="modal-overlay" onSubmit={handlerSubmitEditarEmpresa}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Editar empresa</h3>
                    </div>
                    
                    <div className="modal-body">
                        <div className="form-section">
                            
                            <div className="form-group">
                                <label className="form-label">Nombre</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el nombre del centro"
                                    name="nombre"
                                    value={formDataEditarEmpresa.nombre}
                                    onChange={onchangeInputsEditarEmpresa}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Código</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el código"
                                    name="codigo"
                                    value={formDataEditarEmpresa.codigo}
                                    onChange={onchangeInputsEditarEmpresa}
                                />
                            </div>

                            <div className="form-group">
                                <div className="checkbox-group">
                                    <input
                                        type="checkbox" 
                                        id="estado"
                                        name="estado"
                                        checked={formDataEditarEmpresa.estado}
                                        onChange={onchangeInputsEditarEmpresa}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="estado" className="checkbox-label">
                                        Empresa activa
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => setMostrarModalEditar(false)}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn-add">
                            Actualizar
                        </button>
                    </div>
                </div>
            </form>
        );
    }


    const renderFormularioAgregarEmpresa = () => {
        return (
            <form className="modal-overlay" onSubmit={handlerSubmitAgregarEmpresa}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Añadir nueva empresa</h3>
                    </div>
                    
                    <div className="modal-body">
                        <div className="form-section">
                            
                            <div className="form-group">
                                <label className="form-label">Nombre</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el nombre de la empresa"
                                    name="nombre"
                                    onChange={onchangeInputsAgregarEmpresa}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Código</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el código"
                                    name="codigo"
                                    onChange={onchangeInputsAgregarEmpresa}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => setAgregarEmpresaModal(false)}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn-add">
                            Añadir
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    return (
        <>
        <section className="seccion-centro-tranajo">
                    <div className={`main-content ${isNavOpen ? 'nav-open' : 'nav-closed'}`}>
                        <div className="empresa">
                            <div className="content-header">
                                <div className="header-left">
                                    <BsBuilding />
                                    <h1 className="main-title">Empresas</h1>
                                </div>
                                <button 
                                    className="add-btn"
                                    onClick={() => handlerModalAgregarEmpresa()}
                                >
                                    <BsPlus size={20} />
                                    Añadir empresa
                                </button>
                            </div>
                                <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Nombre de empresa</th>
                                            <th>Estado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listEmpresas && listEmpresas.length > 0 ? (
                                            listEmpresas.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.codigo}</td>
                                                    <td>{item.nombre}</td>
                                                    <td>
                                                        <span className={`status-badge ${item.estado ? "green" : "orange"}`}>
                                                            {item.estado ? "Activado" : "Inactivo"}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="action-buttons">
                                                            <button className="action-btn blue" onClick={() => handlerModalEditar(item)}>
                                                                <BsPencil />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" style={{ textAlign: 'center', color: '#718096', fontStyle: 'italic' }}>
                                                    No hay empresas registradas
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {agregarEmpresaModal && renderFormularioAgregarEmpresa()}
                        {mostrarModalEditar && renderFormularioEditarEmpresa()}
                    </div>
                </section>
        </>
    )
}