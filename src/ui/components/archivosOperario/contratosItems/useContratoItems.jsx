import { useState } from "react";
import { obtenerTodosLosDocumentosPorIdContrato } from "../../../../apis/documentosApis";
import { convertirBase64FileEnBlobAndAbrir, subirDocumentosContrato } from "../../../../apis/documentosApis";
import { handleDescargarContrato } from "../../../../apis/contratosApis";
import { handlerEditarFechaFinDelContrato } from "../../../../apis/contratosApis";

export const useContratoItems = (contrato, handlerEditarEstadoDelContrato, handlerSubirDocumentosContrato) => {
    const [expandedSections, setExpandedSections] = useState(false);
    const [closeForm, setCloseForm] = useState(false);
    const [tipoArchivo, setTipoDeArchivo] = useState("");
    const [documentosDelContrato, setDocumentosDelContrato] = useState([]);
    const [fechaExtender, setFechaExtender] = useState("");
    const [fechaExpedicion, setFechaExpedicion] = useState("");
    const [contratoEditar, setContratoEditar] = useState({});
    const [showExtenderForm, setShowExtenderForm] = useState(false);
    const [archivoExtender, setArchivoExtender] = useState(null);
    const [documentosDelContratoFiltrados, setDocumentosDelContratoFiltrados] = useState({
        hojaVida: [],
        contrato: [],
        incapacidades: [],
        licenciaNoRemunerada: [],
        otrosDocumentos: [],
        cedula: [],
        carnetVacunas: [],
        liquidacion: [],
        otroSi: [],
        conduccion: [],
        antecedentes: [],
        certificadoLaboral: [],
        bachillerato: [],
        certificadoEPS: [],
        induccion: [],
        otrosCursos: [],
        cursosPosgrado: [],
        cursosPregrado: [],
        libretaMilitar: []
    });

    const [expandedDocumentos, setExpandedDocumentos] = useState({
        hojaVida: false,
        contrato: false,
        incapacidades: false,
        licenciaNoRemunerada: false,
        otrosDocumentos: false,
        cedula: false,
        carnetVacunas: false,
        liquidacion: false,
        otroSi: false,
        conduccion: false,
        antecedentes: false,
        certificadoLaboral: false,
        bachillerato: false,
        certificadoEPS: false,
        induccion: false,
        otrosCursos: false,
        cursosPosgrado: false,
        cursosPregrado: false,
        libretaMilitar: false,
        contratoInfo: false
    });

    const handlerShowExtenderForm = (estado = null) => {
        if (estado !== null) {
            setShowExtenderForm(estado);
        } else {
            setShowExtenderForm(!showExtenderForm);
        }
        
        // Limpiar formulario al abrir/cerrar
        if (!showExtenderForm || estado === false) {
            setFechaExtender("");
            setFechaExpedicion("");
            setArchivoExtender(null);
            setContratoEditar(contrato);
        }
    };

    const onChangeArchivoExtender = (e) => {
        const file = e.target.files[0];
        setArchivoExtender(file);
    };

    const onChangeFechaExpedicion = (e) => {
        setFechaExpedicion(e.target.value);
    };

    const onChnageDateExtender = (e) => {
        setFechaExtender(e.target.value);
    };

    const handlerExtenderContrato = async () => {
        if (!fechaExtender || !archivoExtender || !fechaExpedicion) {
            alert("Por favor complete todos los campos requeridos");
            return;
        }

        try {
            // 1. Primero extender la fecha del contrato
            await handlerEditarFechaFinDelContrato(contratoEditar.id, fechaExtender);
            
            // 2. Subir el archivo como "otrosDocumentos"
            const formData = {
                id_contrato: contratoEditar.id,
                file: archivoExtender,
                tipoArchivo: "otroSi",
                fecha_expedicion: fechaExpedicion,
                cedula: contratoEditar.cedula || ""
            };

            await subirDocumentosContrato(formData);
            
            // 3. Cerrar formulario y limpiar estados
            setShowExtenderForm(false);
            setFechaExtender("");
            setFechaExpedicion("");
            setArchivoExtender(null);
            
            alert("Contrato extendido exitosamente");
            window.location.reload();
            
        } catch (error) {
            console.error("Error al extender contrato:", error);
            alert("Error al extender contrato: " + error.message);
        }
    };

    const extenderContrato = (contrato) => {
        const fechaFinInput = document.getElementById("fechaFin");
        setContratoEditar(contrato);
        fechaFinInput.showPicker();
    };

    const editarFechaFin = async () => {
        console.log(fechaExtender);
        console.log(contratoEditar);
        await handlerEditarFechaFinDelContrato(contratoEditar.id, fechaExtender);
        window.location.reload();
    };
        
    const toggleSection = () => {
        setExpandedSections(!expandedSections);
        if (!expandedSections) {
            obtenerDocumentosDelContrato(contrato.id);
        }
    };
    
    const obtenerDocumentosDelContrato = async (idContrato) => {
        const documentosDelContrato = await obtenerTodosLosDocumentosPorIdContrato(idContrato);
        setDocumentosDelContrato(documentosDelContrato);
    };
    
    const handleDescargarContratoUnido = async (idContrato) => {
        const base64File = await handleDescargarContrato(idContrato);
        convertirBase64FileEnBlobAndAbrir(base64File);
    };
    
    const handleEditarContrato = async (idContrato, estadoContrato) => {
        if (estadoContrato) {
            handlerEditarEstadoDelContrato(idContrato, false);
        } else {
            handlerEditarEstadoDelContrato(idContrato, true);
        }
    }; 

    const handlerFiltrarDocumentosPorTipoDeArchivo = (tipoDeArchivo) => {
        documentosDelContratoFiltrados[tipoDeArchivo] = documentosDelContrato.filter((documento) => documento.tipoArchivo === tipoDeArchivo);
        setDocumentosDelContratoFiltrados(documentosDelContratoFiltrados);
    };

    const handlerExnpandedDocumentos = (tipoDeArchivoAbrir) => {
        setExpandedDocumentos({...expandedDocumentos, [tipoDeArchivoAbrir]: !expandedDocumentos[tipoDeArchivoAbrir]});
        handlerFiltrarDocumentosPorTipoDeArchivo(tipoDeArchivoAbrir);
    };

    const handlerSubirDocumentoPorIdDelContrato = (formData) => {
        handlerSubirDocumentosContrato(formData);
    };

    const handlerCloseForm = (tipoArchivo, estado) => {
        setCloseForm(estado);
        setTipoDeArchivo(tipoArchivo);
    };

    return {
        expandedSections,
        documentosDelContratoFiltrados,
        expandedDocumentos,
        toggleSection,
        handleDescargarContratoUnido,
        handleEditarContrato,
        handlerExnpandedDocumentos,
        handlerSubirDocumentoPorIdDelContrato,
        closeForm,
        handlerCloseForm,
        tipoArchivo,
        fechaExtender,
        extenderContrato,
        onChnageDateExtender,
        editarFechaFin,
        showExtenderForm,
        handlerShowExtenderForm,
        archivoExtender,
        onChangeArchivoExtender,
        handlerExtenderContrato,
        fechaExpedicion,
        onChangeFechaExpedicion
    };
};