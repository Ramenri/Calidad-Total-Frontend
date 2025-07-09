import { useState, useEffect } from "react"
import { crearContrato } from "../apis/contratosApis";
import { handlerObtenerCentroPorEmpresaId } from "../apis/centroApis";
import { subirDocumentosContrato } from "../apis/documentosApis";
import { filtros } from "../models/filtros";

export const useFormularioNuevoContrato = (setMostrarFormularioContrato, operario, empresa) => {
    const [pasoActual, setPasoActual] = useState(1);
    const [uploadingFiles, setUploadingFiles] = useState(false);
    const [centros, setCentros] = useState([]);
    
    const [formData, setFormData] = useState({
        fechaInicio: "",
        fechaFin: "",
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

    const obtenerCentroPorEmpresaId = async (idEmpresa) => {
        const centros = await handlerObtenerCentroPorEmpresaId(idEmpresa);
        setCentros(centros);
    }

    const validarPaso1 = () => {
        return formData.fechaInicio && 
               formData.fechaFin && 
               formData.centroTrabajo && 
               formData.cargo;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

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

    const subirArchivos = async (contratoId) => {
        try {
            setUploadingFiles(true);
            const cedula = operario.numeroCedula;
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
                    alert(`Contrato creado, pero algunos documentos no se pudieron subir: ${errors.map(e => e.campo).join(', ')}`);
                } else {
                    alert("Contrato creado exitosamente con todos los documentos");
                }
            } else {
                alert("Contrato creado exitosamente");
            }
            
            setUploadingFiles(false);
        } catch (error) {
            console.error("Error al subir archivos:", error);
            alert("Error al subir documentos. El contrato se creó pero sin documentos.");
            setUploadingFiles(false);
        }
    };

    const handleSubmit = async () => {
        try {
            if (!validarPaso1()) {
                alert("Por favor, completa todos los campos obligatorios.");
                return;
            }

            const contratoData = {
                ...formData,
                operario_id: operario.id
            };
            
            console.log("Creando contrato:", contratoData);
            const response = await crearContrato(contratoData);
            
            if (response && response.id) {
                await subirArchivos(response.id);
            }
            
            handlerCancelar();
        } catch (error) {
            console.error("Error al crear contrato:", error);
            alert("Error al crear el contrato. Por favor intente nuevamente.");
            setUploadingFiles(false);
        }
    };

    const handleSiguiente = () => {
        if (pasoActual === 1 && validarPaso1()) {
            setPasoActual(2);
        } else if (pasoActual === 2) {
            handleSubmit();
        }
    };

    const handleAnterior = () => {
        if (pasoActual > 1) {
            setPasoActual(pasoActual - 1);
        }
    };

    const handlerCancelar = () => {
        setMostrarFormularioContrato(false);
        window.location.reload();
    }

    useEffect(() => {
        obtenerCentroPorEmpresaId(empresa.id);
    }, [empresa.id]);

    return {
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
    }
}