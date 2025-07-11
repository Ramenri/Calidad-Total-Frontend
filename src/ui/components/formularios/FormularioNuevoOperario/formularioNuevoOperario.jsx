import React, { useState, useEffect } from 'react';
import { BsPerson, BsExclamationTriangle, BsCheckCircle, BsFileEarmark } from 'react-icons/bs';
import { crearOperarioConDatosBasicos } from '../../../../apis/operariosApis';
import { filtros } from "../../../../models/filtros"
import { subirDocumentosContrato } from "../../../../apis/documentosApis"
import { obtenerEmpresasDelOperarioNoAfiliadas } from "../../../../apis/empresasApis"
import "./formularioNuevoOperario.css";

export const FormularioOperariosPasos = ({ empresas, cargos, onClose }) => {
    const [pasoActual, setPasoActual] = useState(0);
    const [datosGuardados, setDatosGuardados] = useState(false);
    const [operarioNuevo, setOperarioNuevo] = useState({})
    const [uploadingFiles, setUploadingFiles] = useState(false);
    const [empresasNoAfiliadas, setEmpresasNoAfiliadas] = useState([]);
    const [cargandoEmpresas, setCargandoEmpresas] = useState(false);
    
    const [datosPersonales, setDatosPersonales] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        telefono: "",
        correo: "",
        cedula: ""
    });

    const [datosContrato, setDatosContrato] = useState({
        fechaInicioContrato: "",
        fechaFinContrato: "",
        centroTrabajo: "",
        cargo: ""
    });

    const [archivos, setArchivos] = useState({
        cedula: null,
        antecedentes: null,
        certificadoLaboral: null,
        bachillerato: null,
        carnetVacunas: null,
        certificadoEPS: null,
        induccion: null,
        otrosCursos: null,
        cursosPosgrado: null,
        cursosPregrado: null,
        libretaMilitar: null,
        conduccion: null,
        contrato: null,
        licenciaNoRemunerada: null,
        autorizacionDatos: null,
        hojaVida: null,
        liquidacion: null,
        otroSi: null,
        otrosDocumentos: null,
    });

    const [fechasExpedicion, setFechasExpedicion] = useState({
        cedula: "",
        antecedentes: "",
        certificadoLaboral: "",
        bachillerato: "",
        carnetVacunas: "",
        certificadoEPS: "",
        induccion: "",
        otrosCursos: "",
        cursosPosgrado: "",
        cursosPregrado: "",
        libretaMilitar: "",
        conduccion: "",
        contrato: "",
        licenciaNoRemunerada: "",
        hojaVida: "",
        liquidacion: "",
        otroSi: "",
        otrosDocumentos: "",
    });

    const [centrosFiltrados, setCentrosFiltrados] = useState([]);

    // useEffect para filtrar centros de trabajo cuando cambia la empresa
    useEffect(() => {
        if (datosPersonales.empresa) {
            const empresaSeleccionada = empresasNoAfiliadas.find(emp => emp.id === Number(datosPersonales.empresa));
            setCentrosFiltrados(empresaSeleccionada?.centrosTrabajo || []);
        } else {
            setCentrosFiltrados([]);
        }
    }, [datosPersonales.empresa, empresasNoAfiliadas]);

    // useEffect para obtener empresas no afiliadas cuando cambia la cédula
    useEffect(() => {
        const obtenerEmpresasNoAfiliadas = async () => {
            if (datosPersonales.cedula && datosPersonales.cedula.length >= 6) { // Validar que tenga al menos 6 dígitos
                setCargandoEmpresas(true);
                try {
                    const dataEmpresas = await obtenerEmpresasDelOperarioNoAfiliadas(datosPersonales.cedula);
                    console.log("dataEmpresas", dataEmpresas);
                    setEmpresasNoAfiliadas(dataEmpresas || []);
                    
                    // Si la empresa seleccionada ya no está disponible, limpiarla
                    if (datosPersonales.empresa && !dataEmpresas?.find(emp => emp.id === datosPersonales.empresa)) {
                        setDatosPersonales(prev => ({
                            ...prev,
                            empresa: ""
                        }));
                    }
                } catch (error) {
                    console.error("Error al obtener empresas no afiliadas:", error);
                    setEmpresasNoAfiliadas([]);
                } finally {
                    setCargandoEmpresas(false);
                }
            } else {
                // Si no hay cédula válida, limpiar empresas y empresa seleccionada
                setEmpresasNoAfiliadas([]);
                if (datosPersonales.empresa) {
                    setDatosPersonales(prev => ({
                        ...prev,
                        empresa: ""
                    }));
                }
            }
        };

        const timeoutId = setTimeout(obtenerEmpresasNoAfiliadas, 500); // Debounce de 500ms
        return () => clearTimeout(timeoutId);
    }, [datosPersonales.cedula]);

    const handleInputChange = (seccion, campo, valor) => {
        if (seccion === 'personales') {
            setDatosPersonales(prev => ({
                ...prev,
                [campo]: valor
            }));

        } else if (seccion === 'contrato') {
            setDatosContrato(prev => ({
                ...prev,
                [campo]: valor
            }));
        }
    };

    const handleFileChange = (campo, archivo) => {
        setArchivos(prev => ({
            ...prev,
            [campo]: archivo
        }));
    };

    const handleFechaExpedicionChange = (campo, fecha) => {
        setFechasExpedicion(prev => ({
            ...prev,
            [campo]: fecha
        }));
    };

    const validarPaso1 = () => {
        return datosPersonales.nombre && 
               datosPersonales.apellido && 
               datosPersonales.empresa && 
               datosPersonales.telefono && 
               datosPersonales.correo &&
               datosPersonales.cedula &&
               datosPersonales.cedula.length >= 6; // Validación adicional para cédula
    };

    const validarPaso2 = () => {
        return datosContrato.fechaInicioContrato && 
               datosContrato.fechaFinContrato && 
               datosContrato.centroTrabajo && 
               datosContrato.cargo;
    };

    const guardarDatosBasicos = async () => {
        try {
            const operarioData = {
                ...datosPersonales,
                ...datosContrato
            };
            
            console.log("Guardando datos básicos:", operarioData);
            const response = await crearOperarioConDatosBasicos(operarioData);
            console.log("Response de todo:", response);
            setOperarioNuevo(response.operario)
            setDatosGuardados(true);
            return response.operario;
        } catch (error) {
            console.error("Error al guardar datos básicos:", error);
            alert("Error al guardar los datos. Por favor intente nuevamente.");
            return false;
        }
    };

    const finalizarFormulario = async (operario) => {
        try {
            setUploadingFiles(true);
            const cedula = operario.numeroCedula;
            const contratoId = operario.contrato_id;

            console.log("Contrato ID:", contratoId);
            console.log("Cédula:", cedula);
            
            const uploadPromises = [];
            
            Object.keys(archivos).forEach(campo => {
                if (archivos[campo] && filtros[campo]) {
                    console.log("Subiendo archivo tipo:", campo);
                    
                    const fechaExpedicion = fechasExpedicion[campo] || new Date().toISOString().split('T')[0];
                    
                    const uploadPromise = subirDocumentosContrato({
                        id_contrato: contratoId,
                        file: archivos[campo],
                        tipoArchivo: filtros[campo],
                        fecha_expedicion: fechaExpedicion,
                        cedula: cedula
                    }).catch(error => {
                        console.error(`Error subiendo ${campo}:`, error);
                        return { error: true, campo, message: error.message };
                    });
                    
                    uploadPromises.push(uploadPromise);
                }
            });
            
            if (uploadPromises.length > 0) {
                const results = await Promise.all(uploadPromises);
                
                const errors = results.filter(result => result && result.error);
                if (errors.length > 0) {
                    console.warn("Algunos archivos no se pudieron subir:", errors);
                    alert(`Operario registrado, pero algunos documentos no se pudieron subir: ${errors.map(e => e.campo).join(', ')}`);
                } else {
                    alert("Operario registrado exitosamente con todos los documentos");
                }
            } else {
                alert("Operario registrado exitosamente");
            }
            
            setUploadingFiles(false);
            window.location.reload();
            onClose();
        } catch (error) {
            console.error("Error al finalizar formulario:", error);
            alert("Error al finalizar el registro. Por favor intente nuevamente.");
            setUploadingFiles(false);
        }
    };

    const siguientePaso = async () => {
        if (pasoActual === 1 && validarPaso1()) {
            setPasoActual(2);
        } else if (pasoActual === 2 && validarPaso2()) {
            const operario = await guardarDatosBasicos();
            if (operario) {
                setPasoActual(3);
            }
        } else if (pasoActual === 3) {
            const operario = operarioNuevo;
            await finalizarFormulario(operario);
        } else {
            setPasoActual(prev => prev + 1);
        }
    };

    const anteriorPaso = () => {
        if (pasoActual > 2 && datosGuardados) {
            alert("No se puede retroceder después del paso 2. Los datos ya han sido guardados.");
            return;
        }
        setPasoActual(prev => prev - 1);
    };

    const renderPaso0 = () => (
        <div className="paso-advertencia">
            <div className="advertencia-content">
                <BsExclamationTriangle size={60} color="#e53e3e" />
                <h2>⚠️ ADVERTENCIA IMPORTANTE ⚠️</h2>
                <div className="advertencia-texto">
                    <p>Antes de continuar, lea atentamente:</p>
                    <ul>
                        <li>Una vez que comience el formulario, debe completarlo de manera correcta</li>
                        <li>NO podrá retroceder después del paso 2</li>
                        <li>Los datos se guardarán automáticamente después del paso 2</li>
                        <li>Debe finalizar completamente el proceso una vez iniciado</li>
                        <li>Asegúrese de tener toda la información necesaria antes de comenzar</li>
                    </ul>
                    <p><strong>¿Está seguro de que desea continuar?</strong></p>
                </div>
            </div>
        </div>
    );

    const renderPaso1 = () => (
        <div className="paso-contenido">
            <h2><BsPerson /> Paso 1: Datos Personales</h2>
            <div className="operarios">
                <label className="form-label">
                    <span>Nombre *</span>
                    <input
                        type="text"
                        className="form-input"
                        value={datosPersonales.nombre}
                        onChange={(e) => handleInputChange('personales', 'nombre', e.target.value)}
                        placeholder="Ingrese el nombre"
                        required
                    />
                </label>

                <label className="form-label">
                    <span>Apellidos *</span>
                    <input
                        type="text"
                        className="form-input"
                        value={datosPersonales.apellido}
                        onChange={(e) => handleInputChange('personales', 'apellido', e.target.value)}
                        placeholder="Ingrese los apellidos"
                        required
                    />
                </label>

                <label className="form-label">
                    <span>Cédula *</span>
                    <input
                        type="text"
                        className="form-input"
                        value={datosPersonales.cedula}
                        onChange={(e) => handleInputChange('personales', 'cedula', e.target.value)}
                        placeholder="Ingrese la cédula"
                        required
                    />
                    {datosPersonales.cedula && datosPersonales.cedula.length < 6 && (
                        <small style={{color: 'orange'}}>
                            Ingrese al menos 6 dígitos para filtrar empresas
                        </small>
                    )}
                </label>

                <label className="form-label">
                    <span>Empresa *</span>
                    <select
                        className="form-input"
                        value={datosPersonales.empresa}
                        onChange={(e) => handleInputChange('personales', 'empresa', e.target.value)}
                        required
                        disabled={!datosPersonales.cedula || datosPersonales.cedula.length < 6 || cargandoEmpresas}
                    >
                        <option value="">
                            {!datosPersonales.cedula || datosPersonales.cedula.length < 6 
                                ? "Primero ingrese una cédula válida" 
                                : cargandoEmpresas 
                                ? "Cargando empresas..." 
                                : empresasNoAfiliadas.length === 0 
                                ? "No hay empresas disponibles o el operario ya está en todas" 
                                : "Seleccione una empresa"}
                        </option>
                        {empresasNoAfiliadas.map((empresa) => (
                            <option key={empresa.id} value={empresa.id}>
                                {empresa.nombre}
                            </option>
                        ))}
                    </select>
                    {datosPersonales.cedula && datosPersonales.cedula.length >= 6 && empresasNoAfiliadas.length === 0 && !cargandoEmpresas && (
                        <small style={{color: 'red'}}>
                            Este operario ya está afiliado a todas las empresas disponibles
                        </small>
                    )}
                </label>

                <div className="contenedor-datos">
                    <label>
                        <input
                            type="tel"
                            className="form-input"
                            value={datosPersonales.telefono}
                            onChange={(e) => handleInputChange('personales', 'telefono', e.target.value)}
                            placeholder="Teléfono *"
                            required
                        />
                    </label>
                    <label>
                        <input
                            type="email"
                            className="form-input"
                            value={datosPersonales.correo}
                            onChange={(e) => handleInputChange('personales', 'correo', e.target.value)}
                            placeholder="Correo electrónico *"
                            required
                        />
                    </label>
                </div>
            </div>
        </div>
    );

    const renderPaso2 = () => (
        <div className="paso-contenido">
            <h2><BsCheckCircle /> Paso 2: Datos del Contrato</h2>
            <div className="operarios">
                <div className="contenedor-datos">
                    <label className='form-label' style={{height: "60px" }}>
                        <span style={{height: "20%"}}>Fecha Inicio Contrato *</span>
                        <input
                            style={{height: "80%", border: "none"}}
                            type="date"
                            value={datosContrato.fechaInicioContrato}
                            onChange={(e) => handleInputChange('contrato', 'fechaInicioContrato', e.target.value)}
                            required
                        />
                    </label>
                    <label className='form-label' style={{height: "60px" }}>
                        <span style={{height: "20%"}}>Fecha Fin Contrato *</span>
                        <input
                            style={{height: "80%", border: "none"}}
                            type="date"
                            className="fecha-contrato"
                            value={datosContrato.fechaFinContrato}
                            onChange={(e) => handleInputChange('contrato', 'fechaFinContrato', e.target.value)}
                            required
                        />
                    </label>
                </div>

                <label className="form-label">
                    <span>Centro de Trabajo *</span>
                    <select
                        className="form-input"
                        value={datosContrato.centroTrabajo}
                        onChange={(e) => handleInputChange('contrato', 'centroTrabajo', e.target.value)}
                        required
                        disabled={!datosPersonales.empresa}
                    >
                        <option value="">Seleccione un centro de trabajo</option>
                        {centrosFiltrados.map((centro) => (
                            <option key={centro.id} value={centro.id}>
                                {centro.nombre}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="form-label">
                    <span>Cargo *</span>
                    <select
                        className="form-input"
                        value={datosContrato.cargo}
                        onChange={(e) => handleInputChange('contrato', 'cargo', e.target.value)}
                        required
                    >
                        <option value="">Seleccione un cargo</option>
                        {cargos.map((cargo, index) => (
                            <option key={index} value={cargo}>
                                {cargo}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
        </div>
    );

    const renderPaso3 = () => {
        const archivosConfig = [
            { key: filtros.cedula, label: 'Cédula' },
            { key: filtros.antecedentes, label: 'Antecedentes' },
            { key: filtros.certificadoLaboral, label: 'Certificado Laboral' },
            { key: filtros.bachillerato, label: 'Bachillerato' },
            { key: filtros.carnetVacunas, label: 'Carnet de Vacunas' },
            { key: filtros.certificadoEPS, label: 'Certificado EPS' },
            { key: filtros.induccion, label: 'Inducción' },
            { key: filtros.otrosCursos, label: 'Otros Cursos' },
            { key: filtros.cursosPosgrado, label: 'Cursos Posgrado' },
            { key: filtros.cursosPregrado, label: 'Cursos Pregrado' },
            { key: filtros.libretaMilitar, label: 'Libreta Militar' },
            { key: filtros.conduccion, label: 'Conducción' },
            { key: filtros.contrato, label: 'Contrato' },
            { key: filtros.licenciaNoRemunerada, label: 'Licencia No Remunerada' },
            { key: filtros.hojaVida, label: 'Hoja de Vida' },
            { key: filtros.liquidacion, label: 'Liquidación' },
            { key: filtros.otroSi, label: 'Otro Si' },
            { key: filtros.otrosDocumentos, label: 'Otros Documentos' },
        ];

        return (
            <div className="paso-contenido">
                <h2><BsFileEarmark /> Paso 3: Documentos</h2>
                <p>Puede adjuntar los siguientes documentos.</p>
                
                <div className="archivos-grid">
                    {archivosConfig.map((archivo) => (
                        <div key={archivo.key} className="archivo-item">
                            <div className="archivo-contenedor">
                                <label className="form-label">
                                    <span>{archivo.label}</span>
                                    <input
                                        type="file"
                                        className="form-input file-input"
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
                                    <label className="form-label fecha-expedicion">
                                        <span>Fecha de Expedición</span>
                                        <input
                                            type="date"
                                            className="form-input"
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
    };

    const renderPasos = () => {
        switch (pasoActual) {
            case 0: return renderPaso0();
            case 1: return renderPaso1();
            case 2: return renderPaso2();
            case 3: return renderPaso3();
            default: return null;
        }
    };

    const puedeAvanzar = () => {
        switch (pasoActual) {
            case 0: return true;
            case 1: return validarPaso1();
            case 2: return validarPaso2();
            case 3: return !uploadingFiles;
            default: return false;
        }
    };

    return (
        <div className="formulario-overlay">
            <div className="formulario-modal">
                <div className="formulario-header">
                    <h1>Registro de Nuevo Operario</h1>
                    <button className="btn-cerrar" onClick={onClose}>×</button>
                </div>

                {pasoActual > 0 && (
                    <div className="progreso-pasos">
                        <div className="paso-indicador">
                            <div className={`paso ${pasoActual >= 1 ? 'activo' : ''}`}>1</div>
                            <div className={`paso ${pasoActual >= 2 ? 'activo' : ''}`}>2</div>
                            <div className={`paso ${pasoActual >= 3 ? 'activo' : ''}`}>3</div>
                        </div>
                    </div>
                )}

                <div className="formulario-contenido">
                    {renderPasos()}
                </div>

                <div className="formulario-botones">
                    {pasoActual > 0 && (
                        <button 
                            className="btn-anterior"
                            onClick={anteriorPaso}
                            disabled={pasoActual > 2 && datosGuardados}
                        >
                            Anterior
                        </button>
                    )}
                    
                    <button 
                        className="btn-siguiente"
                        onClick={siguientePaso}
                        disabled={!puedeAvanzar()}
                    >
                        {pasoActual === 0 ? 'Comenzar' : 
                         pasoActual === 3 ? (uploadingFiles ? 'Subiendo...' : 'Finalizar') : 'Siguiente'}
                    </button>
                </div>
            </div>
        </div>
    );
};  