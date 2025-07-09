import React from "react";
import { BsFileEarmark, BsPerson } from 'react-icons/bs';
import "./FormularioNuevoContrato.css"
import { useFormularioNuevoContrato } from "../../../../hooks/UseFormularioNuevoContrato";
import { cargos } from "../../../../models/filtros";

export const FormularioNuevoContrato = ({ setMostrarFormularioContrato, operario, empresa }) => {
    const {
        pasoActual,
        formData,
        archivos,
        fechasExpedicion,
        centros,
        uploadingFiles,
        handleSiguiente,
        handleAnterior,
        handleInputChange,
        handleFileChange,
        handleFechaExpedicionChange,
        handlerCancelar,
        validarPaso1
    } = useFormularioNuevoContrato(setMostrarFormularioContrato, operario, empresa);

    const archivosConfig = [
        { key: 'cedula', label: 'Cédula' },
        { key: 'antecedentes', label: 'Antecedentes' },
        { key: 'certificadoLaboral', label: 'Certificado Laboral' },
        { key: 'bachillerato', label: 'Bachillerato' },
        { key: 'carnetVacunas', label: 'Carnet de Vacunas' },
        { key: 'certificadoEPS', label: 'Certificado EPS' },
        { key: 'induccion', label: 'Inducción' },
        { key: 'otrosCursos', label: 'Otros Cursos' },
        { key: 'cursosPosgrado', label: 'Cursos Posgrado' },
        { key: 'cursosPregrado', label: 'Cursos Pregrado' },
        { key: 'libretaMilitar', label: 'Libreta Militar' },
        { key: 'conduccion', label: 'Conducción' },
        { key: 'contrato', label: 'Contrato' },
        { key: 'licenciaNoRemunerada', label: 'Licencia No Remunerada' },
        { key: 'hojaVida', label: 'Hoja de Vida' },
        { key: 'liquidacion', label: 'Liquidación' },
        { key: 'otroSi', label: 'Otro Si' },
        { key: 'otrosDocumentos', label: 'Otros Documentos' },
    ];

    const renderPaso1 = () => (
        <div className="contenido-paso">
            <div className="encabezado-paso">
                <BsPerson size={24} />
                <h2>Paso 1: Datos del Contrato</h2>
            </div>
            
            <div className="contenedor-etiquetas">
                <div className="contenedor-columna-1">
                    <label htmlFor="fechaInicio" className="etiqueta-formulario">
                        <span className="texto-etiqueta">Fecha de inicio *</span>
                        <input 
                            name="fechaInicio" 
                            type="date" 
                            value={formData.fechaInicio}
                            onChange={handleInputChange}
                            className="campo-entrada"
                            required 
                        />
                    </label>
                    
                    <label htmlFor="fechaFin" className="etiqueta-formulario">
                        <span className="texto-etiqueta">Fecha de fin *</span>
                        <input 
                            name="fechaFin" 
                            type="date" 
                            value={formData.fechaFin}
                            onChange={handleInputChange}
                            className="campo-entrada"
                            required 
                        />
                    </label>
                </div>
                
                <div className="contenedor-columna-2">
                    <label htmlFor="centroTrabajo" className="etiqueta-formulario">
                        <span className="texto-etiqueta">Centro de trabajo *</span>
                        <select 
                            name="centroTrabajo" 
                            value={formData.centroTrabajo}
                            onChange={handleInputChange}
                            className="campo-seleccion"
                            required
                        >
                            <option value="">Seleccione un centro</option>
                            {centros.map((centro, index) => (
                                <option key={index} value={centro.id}>{centro.nombre}</option>
                            ))}
                        </select>
                    </label>
                    
                    <label htmlFor="cargo" className="etiqueta-formulario">
                        <span className="texto-etiqueta">Cargo *</span>
                        <select 
                            name="cargo" 
                            value={formData.cargo}
                            onChange={handleInputChange}
                            className="campo-seleccion"
                            required
                        >
                            <option value="">Seleccione un cargo</option>
                            {cargos.map((cargo, index) => (
                                <option key={index} value={cargo}>{cargo}</option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );

    const renderPaso2 = () => (
        <div className="contenido-paso">
            <div className="encabezado-paso">
                <BsFileEarmark size={24} />
                <h2>Paso 2: Documentos (Opcionales)</h2>
            </div>
            
            <p className="descripcion-paso">
                Puede adjuntar los siguientes documentos. Todos son opcionales:
            </p>
            
            <div className="grilla-archivos">
                {archivosConfig.map((archivo) => (
                    <div key={archivo.key} className="elemento-archivo">
                        <div className="contenedor-archivo">
                            <label className="etiqueta-formulario">
                                <span className="texto-etiqueta">{archivo.label}</span>
                                <input
                                    type="file"
                                    className="campo-entrada entrada-archivo"
                                    onChange={(e) => handleFileChange(archivo.key, e.target.files[0])}
                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                />
                                {archivos[archivo.key] && (
                                    <span className="archivo-seleccionado">
                                        ✓ {archivos[archivo.key].name}
                                    </span>
                                )}
                            </label>
                            
                            {archivos[archivo.key] && (
                                <label className="etiqueta-formulario fecha-expedicion">
                                    <span className="texto-etiqueta">Fecha de Expedición</span>
                                    <input
                                        type="date"
                                        className="campo-entrada"
                                        value={fechasExpedicion[archivo.key]}
                                        onChange={(e) => handleFechaExpedicionChange(archivo.key, e.target.value)}
                                        placeholder="Fecha de expedición"
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="superposicion-formulario-archivos">
            <form className="formulario-nuevo-contrato">
                <div className="encabezado-formulario-archivos">
                    <h1>Nuevo Contrato - {operario.nombre} {operario.apellido}</h1>
                    <button 
                        type="button" 
                        className="boton-cerrar" 
                        onClick={handlerCancelar}
                    >
                        ×
                    </button>
                </div>

                <div className="contenedor-progreso">
                    <div className="progreso-pasos">
                        <div className="indicador-paso">
                            <div className={`paso ${pasoActual >= 1 ? 'activo' : ''}`}>1</div>
                            <div className={`paso ${pasoActual >= 2 ? 'activo' : ''}`}>2</div>
                        </div>
                        <div className="texto-progreso">
                            <span className={pasoActual === 1 ? 'activo' : ''}>
                                Datos del Contrato
                            </span>
                            <span className={pasoActual === 2 ? 'activo' : ''}>
                                Documentos
                            </span>
                        </div>
                    </div>
                </div>

                <div className="contenido-formulario">
                    {pasoActual === 1 && renderPaso1()}
                    {pasoActual === 2 && renderPaso2()}
                </div>

                <div className="contenedor-botones">
                    {pasoActual > 1 && (
                        <button 
                            type="button"
                            className="boton-anterior"
                            onClick={handleAnterior}
                        >
                            Anterior
                        </button>
                    )}
                    
                    <button 
                        type="button"
                        className="boton-cancelar"
                        onClick={handlerCancelar}
                    >
                        Cancelar
                    </button>
                    
                    <button 
                        type="button"
                        className="boton-siguiente"
                        onClick={handleSiguiente}
                        disabled={pasoActual === 1 ? !validarPaso1() : uploadingFiles}
                    >
                        {pasoActual === 1 ? 'Siguiente' : 
                         uploadingFiles ? 'Creando...' : 'Crear Contrato'}
                    </button>
                </div>
            </form>
        </div>
    );
};