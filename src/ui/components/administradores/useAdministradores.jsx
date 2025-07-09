import { useEffect, useState } from "react";
import { obtenerTodosLosAdmin } from "../../../apis/administradoresApis";
import { obtenerUsuarioPorId, crearUnionConOperario, eliminarAdmin } from "../../../apis/usuarioApis";
import { obtenerTodosLosOperarios } from "../../../apis/operariosApis";

let idLocal = "";

export const useAdministradores = () => {
    const [listaAdministradores, setListaAdministradores] = useState([]);
    // Inicializar con null en lugar de objeto vacío
    const [operarioEncontrado, setOperarioEncontrado] = useState(null);
    const [listaOperarios, setListaOperarios] = useState([]);
    const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
    const [compararId, setCompararId] = useState("");
    const [formDataAgregarAdmin, setFormDataAgregarAdmin] = useState({
        usuario: "",
        contraseña: "",
        operarioId: "",
        cedula: ""
    });

    const buscarPorCedula = () => {
        const cedulaBuscada = formDataAgregarAdmin.cedula.trim();
        const operarioEncontrado = listaOperarios.find((operario) => {
            return operario.numeroCedula.toString() === cedulaBuscada;
        });
        console.log("lista de operarios: ", listaOperarios)
        console.log("encontrado: ", operarioEncontrado)
        
        if (operarioEncontrado) {
            setOperarioEncontrado(operarioEncontrado);
            setFormDataAgregarAdmin(prev => ({
                ...prev,
                operarioId: operarioEncontrado.id
            }));
        } else {
            alert("No existe un operario con esa cedula");
            setOperarioEncontrado(null);
            setFormDataAgregarAdmin(prev => ({
                ...prev,
                operarioId: ""
            }));
        }
    }

    const handlerObtenerTodosLosOperarios = async () => {
        const data = await obtenerTodosLosOperarios();
        setListaOperarios(data);
    }

    const handlerObtenerTodosLosAdmin = async () => {
        const data = await obtenerTodosLosAdmin();
        setListaAdministradores(data);
        console.log("lista de administradores: ", data)
        const data2 = await obtenerUsuarioPorId(idLocal);
        setCompararId(data2?.id || ""); // Asegurarse de que compararId tenga un valor
    }

    const onchangeInputsAgregarAdmin = (e) => {
        const { name, value } = e.target;
        setFormDataAgregarAdmin({
            ...formDataAgregarAdmin,
            [name]: value
        });
        
        // Si cambia la cédula, limpiar el operario encontrado
        if (name === 'cedula') {
            setOperarioEncontrado(null);
            setFormDataAgregarAdmin(prev => ({
                ...prev,
                [name]: value,
                operarioId: ""
            }));
        }
    }

    const handlerSubmitAgregarAdmin = async (e) => {
        e.preventDefault();
        
        // Validar que se haya seleccionado un operario
        if (!operarioEncontrado || !formDataAgregarAdmin.operarioId) {
            alert("Debe buscar y seleccionar un operario válido");
            return;
        }
        
        console.log("agregando admin: ", formDataAgregarAdmin);
        await crearUnionConOperario(formDataAgregarAdmin);
        setMostrarModalAgregar(false);
        window.location.reload();
    }

    const handlerEliminarAdmin = async (idAdmin) => {
        await eliminarAdmin(idAdmin);
        window.location.reload();
    }

    // Función para limpiar el formulario
    const limpiarFormulario = () => {
        setFormDataAgregarAdmin({
            usuario: "",
            contraseña: "",
            operarioId: "",
            cedula: ""
        });
        setOperarioEncontrado(null);
    }

    useEffect(() => {
        idLocal = localStorage.getItem("idUsuario");
        handlerObtenerTodosLosAdmin();
        handlerObtenerTodosLosOperarios();
    }, [])

    return {
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
    }
}