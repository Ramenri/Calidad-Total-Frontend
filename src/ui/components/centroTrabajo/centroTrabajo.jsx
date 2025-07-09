import { useCentroTrabajo } from "./useCentroTrabajo";
import "./centroTrabajo.css"
import {
    BsBuildings,
    BsPlus,
    BsTrash,
    BsPencil
} from "react-icons/bs";

export const CentroTrabajo = ({isNavOpen}) => {
    const {
        listEmpresas,
        showModal,
        setShowModal,
        showEditModal,
        formDataEditarCentro,
        handlerSubmitNuevoCentro,
        handlerSubmitEditarCentro,
        onchangeInputsNuevoCentro,
        onchangeInputsEditarCentro,
        handlerAbrirModalEditar,
        handlerCerrarModalEditar,
        handlerEliminarCentro
    } = useCentroTrabajo()

    const renderTable = (data) => (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre del centro</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((item, index) => (
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
                                        <button className="action-btn blue" onClick={() => handlerAbrirModalEditar(item)}>
                                            <BsPencil />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', color: '#718096', fontStyle: 'italic' }}>
                                No hay centros de trabajo registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
    
    const renderFormularioAgregarCentro = () => {
        return (
            <form className="modal-overlay" onSubmit={handlerSubmitNuevoCentro}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Añadir nueva centro de trabajo</h3>
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
                                    onChange={onchangeInputsNuevoCentro}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Empresa afiliada</label>
                                <select 
                                    required
                                    className="form-select"
                                    name="empresaId"
                                    onChange={onchangeInputsNuevoCentro}
                                >
                                    <option value="">Seleccionar empresa</option>
                                    {listEmpresas.map((empresa, index) => {
                                        return (
                                            <option key={index} value={empresa.id}>
                                                {empresa.nombre}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Código</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el código"
                                    name="codigo"
                                    onChange={onchangeInputsNuevoCentro}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => setShowModal(false)}
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

    const renderFormularioEditarCentro = () => {
        return (
            <form className="modal-overlay" onSubmit={handlerSubmitEditarCentro}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Editar centro de trabajo</h3>
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
                                    value={formDataEditarCentro.nombre}
                                    onChange={onchangeInputsEditarCentro}
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
                                    value={formDataEditarCentro.codigo}
                                    onChange={onchangeInputsEditarCentro}
                                />
                            </div>

                            <div className="form-group">
                                <div className="checkbox-group">
                                    <input
                                        type="checkbox" 
                                        id="estado"
                                        name="estado"
                                        checked={formDataEditarCentro.estado}
                                        onChange={onchangeInputsEditarCentro}
                                        className="form-checkbox"
                                    />
                                    <label htmlFor="estado" className="checkbox-label">
                                        Centro activo
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={handlerCerrarModalEditar}
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

    return (
        <section className="seccion-centro-tranajo">
            <div className={`main-content ${isNavOpen ? 'nav-open' : 'nav-closed'}`}>
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="header-left">
                            <BsBuildings />
                            <h1 className="main-title">Centros de trabajo</h1>
                        </div>
                        <button 
                            className="add-btn"
                            onClick={() => setShowModal(true)}
                        >
                            <BsPlus size={20} />
                            Añadir centro
                        </button>
                    </div>
                    {listEmpresas.length > 0 ? (
                        listEmpresas.map((empresa, index) => {
                            return (
                                <div key={index} className="section">
                                    <h2 className="section-title">{empresa.nombre}</h2>
                                    {renderTable(empresa.centrosTrabajo)}
                                </div>
                            )
                        })
                    ): (
                        <p>No hay centros</p>
                    )}
                </div>
            </div>
            {showModal && renderFormularioAgregarCentro()}
            {showEditModal && renderFormularioEditarCentro()}
        </section>
    );
}