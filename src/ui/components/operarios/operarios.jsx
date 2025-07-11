import "./operarios.css"
import { useOperarios } from "./useOperarios";
import {FormularioOperariosPasos} from "../formularios/FormularioNuevoOperario/formularioNuevoOperario";
import {
    BsPerson,
    BsPlus,
    BsPencil,
    BsTrash,
    BsEye,
    BsFileText
} from "react-icons/bs";

export const Operarios = ({isNavOpen}) => {
    const {
        listOperarios,
        empresas,
        centrosTrabajo,
        cargos,
        formDataFiltrarOperarios,
        onchangeInputsFiltrarOperarios,
        filtrarOperarios,
        onChangeEmpresa,
        limpiarFiltros,
        toogleAgregarOperario,
        setToogleAgregarOperario,
        navigate,
        navegarAlArchivo, // Usar la nueva función
        handlerDescargarPdf,
        onChangeInputActualizarOperario,
        abrirActualizarOperario,
        operarioSeleccionado,
        handlerAbrirActualizarOperario,
        setAbrirActualizarOperario,
        handlerActualizarOperario,
        obtenerEstadoOperario
    } = useOperarios();

    const renderActualizarFormularioOperario = () => {
        return (
            <form className="modal-overlay" onSubmit={handlerActualizarOperario}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Actualizar operario</h3>
                    </div>
                    
                    <div className="modal-body">
                        <div className="form-section">
                            <div className="form-group">
                                <label className="form-label">Nombre</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el nombre"
                                    name="nombre"
                                    value={operarioSeleccionado.nombre || ''}
                                    onChange={onChangeInputActualizarOperario}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Apellido</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el apellido"
                                    name="apellido"
                                    value={operarioSeleccionado.apellido || ''}
                                    onChange={onChangeInputActualizarOperario}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Cédula</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el cedula"
                                    name="numeroCedula"
                                    value={operarioSeleccionado.numeroCedula}
                                    onChange={onChangeInputActualizarOperario}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Correo</label>
                                <input 
                                    required
                                    type="email" 
                                    className="form-input"
                                    placeholder="Ingrese el correo"
                                    name="correo"
                                    value={operarioSeleccionado.correo || ''}
                                    onChange={onChangeInputActualizarOperario}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Telefono</label>
                                <input 
                                    required
                                    type="text" 
                                    className="form-input"
                                    placeholder="Ingrese el telefono"
                                    name="numeroTelefonico"
                                    value={operarioSeleccionado.numeroTelefonico || ''}
                                    onChange={onChangeInputActualizarOperario}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Estado</label>
                                <select 
                                    name="estado" 
                                    id="estado" 
                                    className="form-input" 
                                    value={String(operarioSeleccionado.estado)}
                                    onChange={onChangeInputActualizarOperario}
                                >
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer">
                        <button 
                            type="button" 
                            className="btn-cancel"
                            onClick={() => setAbrirActualizarOperario(false)}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn-add">
                            Actualizar
                        </button>
                    </div>
                </div>
            </form>
        )
    }

    return (
        <section className="seccion-centro-tranajo">
            <div className={`main-content ${isNavOpen ? 'nav-open' : 'nav-closed'}`}>
                <div className="operarios-bien">
                    <div className="content-header">
                        <div className="header-left">
                            <BsPerson />
                            <h1 className="main-title">Operarios</h1>
                        </div>
                        <button 
                            className="add-btn"
                            onClick={() => setToogleAgregarOperario(true)}
                        >
                            <BsPlus size={20} />
                            Añadir operario
                        </button>
                    </div>
                    <div className="operarios">
                        <h2>Filtrar operarios</h2>
                        <label htmlFor="empresa" className="form-label">
                            <span>Empresa</span>
                            <select 
                                name="empresa" 
                                id="empresa" 
                                className="form-input" 
                                value={formDataFiltrarOperarios.empresa}
                                onChange={(e) => onChangeEmpresa(e)}
                            >
                                <option value="">Todas las empresas</option>
                                {empresas.map((item, index) => (
                                    <option key={index} value={item.id}>{item.nombre}</option>
                                ))}
                            </select>
                        </label>
                        <div className="contenedor-datos">
                            <label htmlFor="cedula">
                                <input 
                                    placeholder="Ingrese la cédula"
                                    type="text" 
                                    className="form-input"
                                    name="cedula"
                                    value={formDataFiltrarOperarios.cedula}
                                    onChange={(e) => onchangeInputsFiltrarOperarios(e)}
                                />
                            </label>
                            <label htmlFor="nombre">
                                <input 
                                    placeholder="Ingrese el nombre"
                                    type="text" 
                                    className="form-input"
                                    name="nombre"
                                    value={formDataFiltrarOperarios.nombre}
                                    onChange={(e) => onchangeInputsFiltrarOperarios(e)}
                                />
                            </label>
                        </div>
                        <div className="contenedor-datos-finales">
                            <label htmlFor="cargo" className="inputs-finales">
                                <select 
                                    name="cargo" 
                                    id="cargo" 
                                    className="form-input" 
                                    value={formDataFiltrarOperarios.cargo}
                                    onChange={(e) => onchangeInputsFiltrarOperarios(e)}
                                >
                                    <option value="">Todos los cargos</option>
                                    {cargos.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </label>
                            <label htmlFor="estado" className="inputs-finales">
                                <select 
                                    name="estado" 
                                    id="estado" 
                                    className="form-input" 
                                    value={formDataFiltrarOperarios.estado}
                                    onChange={(e) => onchangeInputsFiltrarOperarios(e)}
                                >
                                    <option value="">Todos los estados</option>
                                    <option value="true">ACTIVO</option>
                                    <option value="false">INACTIVO</option>
                                </select>
                            </label>
                            <label htmlFor="centroTrabajo" className="inputs-finales">
                                <select 
                                    name="centroTrabajo" 
                                    id="centroTrabajo" 
                                    className="form-input" 
                                    value={formDataFiltrarOperarios.centroTrabajo}
                                    onChange={(e) => onchangeInputsFiltrarOperarios(e)}
                                >
                                    <option value="">Todos los centros</option>
                                    {centrosTrabajo.map((item, index) => (
                                        <option key={index} value={item.id}>{item.nombre}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="botones-filtros">
                            <button onClick={filtrarOperarios} type="button" className="btn-add-operarios">
                                Filtrar
                            </button>
                            <button onClick={limpiarFiltros} type="button" className="btn-limpiar-filtros">
                                <BsTrash size={16} />
                                Limpiar
                            </button>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="data-table operarios-table">
                            <thead>
                                <tr>
                                    <th>Cédula</th>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listOperarios && listOperarios.length > 0 ? (                                   
                                    listOperarios
                                    .slice()
                                    .sort((a, b) => {
                                        const nombreA = `${a.apellido} ${a.nombre}`.toLowerCase();
                                        const nombreB = `${b.apellido} ${b.nombre}`.toLowerCase();
                                        return nombreA.localeCompare(nombreB);
                                    })
                                    .map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.numeroCedula}</td>
                                            <td>{`${item.apellido} ${item.nombre}`}</td>
                                            <td>{item.numeroTelefonico}</td>
                                            <td>{item.correo}</td>
                                            <td>
                                                <span className={`status-badge ${obtenerEstadoOperario(item) ? "green" : "orange"}`}>
                                                    {obtenerEstadoOperario(item) ? "Activado" : "Inactivo"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button onClick={() => handlerAbrirActualizarOperario(item)} className="action-btn blue">
                                                        <BsPencil />
                                                    </button>
                                                    <button onClick={() => handlerDescargarPdf(item.contrato_id)} className="action-btn orange">
                                                        <BsFileText />
                                                    </button>
                                                    {/* Cambio aquí: usar navegarAlArchivo en lugar de navigate */}
                                                    <button onClick={() => navegarAlArchivo(item.id)} className="action-btn blue">
                                                        <BsEye />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', color: '#718096', fontStyle: 'italic' }}>
                                            No hay operarios que coincidan con los filtros
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {abrirActualizarOperario && renderActualizarFormularioOperario()}
                {toogleAgregarOperario && (
                    <FormularioOperariosPasos 
                        empresas={empresas}
                        cargos={cargos}
                        onClose={() => setToogleAgregarOperario(false)}
                    />
                )}
            </div>
        </section>
    );
};