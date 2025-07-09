import { useState, useEffect } from "react";
import { fetchConManejoErrores } from "../helpers/FetchConManejoErrores";

export const UseFiltrosOperarios = () => {
    const [empresas, setEmpresas] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [centros, setCentros] = useState([]);
    const [operarios, setOperarios] = useState([]);
    const [filtros, setFiltros] = useState({
        empresa_id: "",
        numero_cedula: "",
        nombre: "",
        cargo: "",
        estado: "",
        centro_id: ""
    });

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            await fetchEmpresas();
            await fetchCargos();
            await fetchCentros();
        };
        cargarDatosIniciales();
    }, []);

    useEffect(() => {
        if (empresas.length > 0 && filtros.empresa_id === "") {
            const primeraEmpresaId = empresas[0].id;
            setFiltros(prev => ({ ...prev, empresa_id: primeraEmpresaId }));
            buscarOperariosConEmpresa(primeraEmpresaId);
        }
    }, [empresas]);

    const fetchEmpresas = async () => {
        try {
            const data = await fetchConManejoErrores("http://192.160.1.202:5000/empresa/todo");
            setEmpresas(data);
        } catch (error) {
            console.error("Error al cargar empresas:", error);
        }
    };

    const fetchCargos = async () => {
        try {
            const data = await fetchConManejoErrores("http://192.160.1.202:5000/contrato/cargos");
            setCargos(data);
        } catch (error) {
            console.error("Error al cargar cargos:", error);
        }
    };

    const fetchCentros = async () => {
        try {
            const data = await fetchConManejoErrores("http://192.160.1.202:5000/centroTrabajo/todo");
            setCentros(data);
        } catch (error) {
            console.error("Error al cargar centros de trabajo:", error);
        }
    };

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        if (name === "empresa_id") {
            setFiltros({
                empresa_id: value,
                numero_cedula: "",
                nombre: "",
                cargo: "",
                estado: "",
                centro_id: "" 
            });
            buscarOperariosConEmpresa(value);
        } else {
            setFiltros(prev => ({ ...prev, [name]: value }));
        }
    };

    const buscarOperarios = async () => {
        try {
            const filtrosLimpios = Object.fromEntries(
                Object.entries(filtros).filter(([_, v]) => v !== "")
            );
            const data = await fetchConManejoErrores("http://192.160.1.202:5000/operario/filtrarOperarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filtrosLimpios)
            });
            if (data && Array.isArray(data)) {
                setOperarios(data);
            }
        } catch (error) {
            console.error("Error al buscar operarios", error);
        }
    };

    const buscarOperariosConEmpresa = async (empresaId) => {
        try {
            const filtrosConEmpresa = {
                ...filtros,
                empresa_id: empresaId
            };
            const data = await fetchConManejoErrores(`http://192.160.1.202:5000/operario/operariosPorEmpresa/${empresaId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(filtrosConEmpresa)
            });

            setOperarios(data);
        } catch (error) {
            console.error("Error al buscar operarios automáticamente", error);
        }
    };

    const centrosFiltrados = filtros.empresa_id
        ? centros.filter(c => String(c.empresaID) === String(filtros.empresa_id))
        : [];
    return {
        empresas,
        cargos,
        centros: centrosFiltrados,  
        filtros,
        handleFiltroChange,
        buscarOperarios,
        operarios,
    };
};

export const redirigirArchivos = (operarioId, navigate) => {
  console.log("Redirigiendo a archivos del operario:", operarioId);
  if (!operarioId) {
    console.warn("ID del operario no definido");
    return;
  }
  navigate(`/archivo/${operarioId}`);
};
