import { useEffect, useState } from "react";
import { obtenerTodasLasEmpresas, crearNuevaEmpresa, actualizarEmpresaPorId } from "../../../apis/empresasApis";

export const useEmpresa = () => {
    const [listEmpresas, setListEmpresas] = useState([]);
    const [agregarEmpresaModal, setAgregarEmpresaModal] = useState(false);
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
    const [formDataEditarEmpresa, setFormDataEditarEmpresa] = useState({
        id: "",
        nombre: "",
        codigo: "",
        estado: false
    })
    const [formDataNuevaEmpresa, setFormDataNuevaEmpresa] = useState({
        nombre: "",
        codigo: ""
    })

    const onchangeInputsEditarEmpresa = (e) => {
        const { name, value, type, checked } = e.target;
        setFormDataEditarEmpresa({
            ...formDataEditarEmpresa,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const onchangeInputsAgregarEmpresa = (e) => {
        setFormDataNuevaEmpresa({
            ...formDataNuevaEmpresa,
            [e.target.name]: e.target.value
        })
    }

    const handlerSubmitAgregarEmpresa = async (e) => {
        e.preventDefault();
        await crearNuevaEmpresa(formDataNuevaEmpresa);
        window.location.reload();
    }

    const handlerModalEditar = (empresa) => {
        setMostrarModalEditar(true);
        setFormDataEditarEmpresa({
            id: empresa.id,
            nombre: empresa.nombre,
            codigo: empresa.codigo,
            estado: empresa.estado
        })
    } 

    const handlerSubmitEditarEmpresa = async (e) => {
        e.preventDefault();
        await actualizarEmpresaPorId(formDataEditarEmpresa);
        window.location.reload();
    }

    const handlerModalAgregarEmpresa = () => {
        setAgregarEmpresaModal(true);
    }

    const handlerObtenerEmpresas = async () => {
            const empresas = await obtenerTodasLasEmpresas();
            setListEmpresas(empresas);
    }



    useEffect(() => {
        handlerObtenerEmpresas();
    }, []);
    
    return {
        listEmpresas,
        mostrarModalEditar,
        handlerModalEditar,
        agregarEmpresaModal,
        handlerModalAgregarEmpresa,
        setAgregarEmpresaModal,
        onchangeInputsAgregarEmpresa,
        onchangeInputsEditarEmpresa,
        handlerSubmitAgregarEmpresa,
        formDataEditarEmpresa,
        setMostrarModalEditar,
        handlerSubmitEditarEmpresa
    }
}