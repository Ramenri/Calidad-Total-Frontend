import { useState, useEffect } from "react";
import { obtenerTodasLasEmpresas } from "../../../apis/empresasApis";
import { crearNuevoCentroConEmpresa, eliminarCentroPorId, actualizarCentroPorId } from "../../../apis/centroApis";

export const useCentroTrabajo = () => {
    const [listEmpresas, setListEmpresas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [formDataNuevoCentro, setFormDataNuevoCentro] = useState({
        nombre: "",
        empresaId: "",
        codigo: ""
    });
    const [formDataEditarCentro, setFormDataEditarCentro] = useState({
        id: "",
        nombre: "",
        codigo: "",
        estado: true
    });

    const handlerSubmitNuevoCentro = async (e) => {
        e.preventDefault();
        await crearNuevoCentroConEmpresa(formDataNuevoCentro);
        window.location.reload();
    }

    const handlerSubmitEditarCentro = async (e) => {
        e.preventDefault();
        await actualizarCentroPorId(formDataEditarCentro);
        window.location.reload();
    }

    const onchangeInputsNuevoCentro = (e) => {
        setFormDataNuevoCentro({
            ...formDataNuevoCentro,
            [e.target.name]: e.target.value
        });
    }

    const onchangeInputsEditarCentro = (e) => {
        const { name, value, type, checked } = e.target;
        setFormDataEditarCentro({
            ...formDataEditarCentro,
            [name]: type === 'checkbox' ? checked : value
        });
    }

    const handlerAbrirModalEditar = (centro) => {
        setFormDataEditarCentro({
            id: centro.id,
            nombre: centro.nombre,
            codigo: centro.codigo,
            estado: centro.estado
        });
        setShowEditModal(true);
    }

    const handlerCerrarModalEditar = () => {
        setShowEditModal(false);
        setFormDataEditarCentro({
            id: "",
            nombre: "",
            codigo: "",
            estado: true
        });
    }

    const handlerObtenerEmpresas = async () => {
        const empresas = await obtenerTodasLasEmpresas();
        setListEmpresas(empresas);
    }

    const handlerEliminarCentro = async (idCentro) => {
        await eliminarCentroPorId(idCentro);
        window.location.reload();
    }

    useEffect(() => {
        handlerObtenerEmpresas();
    }, []);

    return {
        listEmpresas,
        showModal,
        setShowModal,
        showEditModal,
        setShowEditModal,
        formDataNuevoCentro,
        formDataEditarCentro,
        onchangeInputsNuevoCentro,
        onchangeInputsEditarCentro,
        handlerSubmitNuevoCentro,
        handlerSubmitEditarCentro,
        handlerAbrirModalEditar,
        handlerCerrarModalEditar,
        handlerEliminarCentro
    }
}