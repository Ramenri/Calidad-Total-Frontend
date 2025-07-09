import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cargos } from "../../../models/filtros";
import { 
    obtenerTodosLosOperarios, 
    actualizarOperarioPorId,
    filtrarOperariosCompleto 
} from "../../../apis/operariosApis";
import { obtenerTodasLasEmpresas } from "../../../apis/empresasApis";
import { generarPdfDelOperario, convertirBase64FileEnBlobAndAbrir } from "../../../apis/documentosApis";

export const useOperarios = () => {

    const navigate = useNavigate();

    const [operarioSeleccionado, setOperarioSeleccionado] = useState({});
    const [abrirActualizarOperario, setAbrirActualizarOperario] = useState(false);
    const [toogleAgregarOperario, setToogleAgregarOperario] = useState(false);
    const [listOperarios, setListOperarios] = useState([]);
    const [operariosFiltrados, setOperariosFiltrados] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [centrosTrabajo, setCentrosTrabajo] = useState([]);
    const [cargandoFiltros, setCargandoFiltros] = useState(false);
    const [formDataFiltrarOperarios, setFormDataFiltrarOperarios] = useState({
        empresa: "",
        cedula: "",
        nombre: "",
        cargo: "",
        estado: "",
        centroTrabajo: ""
    });

    const onChangeEmpresa = (e) => {
        const { value } = e.target;
        
        const newFormData = {
            ...formDataFiltrarOperarios,
            empresa: value,
            centroTrabajo: ""
        };
        setFormDataFiltrarOperarios(newFormData);

        if (value === "") {
            const todosCentros = empresas.flatMap(empresa => empresa.centrosTrabajo || []);
            setCentrosTrabajo(todosCentros);
        } else {
            const empresaSeleccionada = empresas.find(item => item.id === value);
            setCentrosTrabajo(empresaSeleccionada?.centrosTrabajo || []);
        }

        // Aplicar filtros automáticamente cuando cambie la empresa
        aplicarFiltrosBackend(newFormData);
    };

    const onchangeInputsFiltrarOperarios = (e) => {
        const { name, value } = e.target;
        const newFormData = {
            ...formDataFiltrarOperarios,
            [name]: value
        };
        setFormDataFiltrarOperarios(newFormData);
        
        // Opcional: aplicar filtros automáticamente mientras se escribe
        // aplicarFiltrosBackend(newFormData);
    };

    // Función para aplicar filtros usando el backend
    const aplicarFiltrosBackend = async (filtros = formDataFiltrarOperarios) => {
        setCargandoFiltros(true);
        try {
            const operariosFiltrados = await filtrarOperariosCompleto(filtros);
            setOperariosFiltrados(operariosFiltrados);
        } catch (error) {
            console.error("Error al aplicar filtros:", error);
            setOperariosFiltrados([]);
        } finally {
            setCargandoFiltros(false);
        }
    };

    // Función para filtrar (llamada desde el botón)
    const filtrarOperarios = () => {
        aplicarFiltrosBackend();
    };

    // Función para limpiar filtros
    const limpiarFiltros = () => {
        // Mantener la primera empresa seleccionada al limpiar filtros
        const primeraEmpresa = empresas.length > 0 ? empresas[0].id : "";
        
        const filtrosLimpios = {
            empresa: primeraEmpresa,
            cedula: "",
            nombre: "",
            cargo: "",
            estado: "",
            centroTrabajo: ""
        };
        setFormDataFiltrarOperarios(filtrosLimpios);
        
        // Actualizar centros de trabajo según la primera empresa
        if (primeraEmpresa) {
            const empresaSeleccionada = empresas.find(item => item.id === primeraEmpresa);
            setCentrosTrabajo(empresaSeleccionada?.centrosTrabajo || []);
        } else {
            const todosCentros = empresas.flatMap(empresa => empresa.centrosTrabajo || []);
            setCentrosTrabajo(todosCentros);
        }
        
        // Aplicar filtros con la primera empresa
        aplicarFiltrosBackend(filtrosLimpios);
    };

    const handlerObtenerTodosLosOperarios = async () => {
        try {
            const data = await obtenerTodosLosOperarios();
            console.log("Operarios obtenidos:", data);
            setListOperarios(data);
            setOperariosFiltrados(data);
        } catch (error) {
            console.error("Error al obtener operarios:", error);
            setListOperarios([]);
            setOperariosFiltrados([]);
        }
    };

    const handlerObtenerTodasLasEmpresas = async () => {
        try {
            const data = await obtenerTodasLasEmpresas();
            console.log("Empresas obtenidas:", data);
            setEmpresas(data);
            
            const todosCentros = data.flatMap(empresa => empresa.centrosTrabajo || []);
            setCentrosTrabajo(todosCentros);

            // Configurar automáticamente la primera empresa como filtro inicial
            if (data.length > 0) {
                const primeraEmpresa = data[0];
                const filtrosIniciales = {
                    empresa: primeraEmpresa.id,
                    cedula: "",
                    nombre: "",
                    cargo: "",
                    estado: "",
                    centroTrabajo: ""
                };
                
                setFormDataFiltrarOperarios(filtrosIniciales);
                setCentrosTrabajo(primeraEmpresa.centrosTrabajo || []);
                
                // Aplicar filtros iniciales
                aplicarFiltrosBackend(filtrosIniciales);
            }
        } catch (error) {
            console.error("Error al obtener empresas:", error);
            setEmpresas([]);
            setCentrosTrabajo([]);
        }
    };

    const handlerDescargarPdf = async (contratoId) => {
        const data = await generarPdfDelOperario(contratoId);
        convertirBase64FileEnBlobAndAbrir(data);
    };

    const onChangeInputActualizarOperario = (e) => {
        const { name, value } = e.target;
        
        setOperarioSeleccionado(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlerAbrirActualizarOperario = (operario) => {
        console.log("operario: ", operario);
        setOperarioSeleccionado({...operario});
        setAbrirActualizarOperario(true);
    };

    const handlerActualizarOperario = async (e) => {
        e.preventDefault();
        try {
            console.log("data: ", operarioSeleccionado);
            const dataBien = {
                idOperario: operarioSeleccionado.id,
                nombre: operarioSeleccionado.nombre,
                apellido: operarioSeleccionado.apellido,
                numeroCedula: operarioSeleccionado.numeroCedula,
                correo: operarioSeleccionado.correo,
                numeroTelefonico: operarioSeleccionado.numeroTelefonico,
                estado: operarioSeleccionado.estado
            };
            const data = await actualizarOperarioPorId(dataBien);
            
            // En lugar de recargar la página, actualizar la lista
            await handlerObtenerTodosLosOperarios();
            setAbrirActualizarOperario(false);
            
        } catch (error) {
            console.error("Error al actualizar operario:", error);
        }
    };

    // Función para navegar al archivo del operario con la empresa seleccionada
    const navegarAlArchivo = (operarioId) => {
        const empresaSeleccionada = formDataFiltrarOperarios.empresa;
        navigate(`/archivo/${operarioId}?empresa=${empresaSeleccionada}`);
    };

    useEffect(() => {
        handlerObtenerTodasLasEmpresas();
        handlerObtenerTodosLosOperarios();
    }, []);

    return {
        listOperarios: operariosFiltrados,
        listOperariosCompleta: listOperarios,
        empresas,
        centrosTrabajo,
        cargos,
        formDataFiltrarOperarios,
        onchangeInputsFiltrarOperarios,
        filtrarOperarios,
        onChangeEmpresa,
        setToogleAgregarOperario,
        toogleAgregarOperario,
        limpiarFiltros,
        navigate,
        navegarAlArchivo, // Nueva función para navegar con empresa
        handlerDescargarPdf,
        onChangeInputActualizarOperario,
        abrirActualizarOperario,
        handlerAbrirActualizarOperario,
        setAbrirActualizarOperario,
        operarioSeleccionado,
        handlerActualizarOperario,
        cargandoFiltros,
    };
};