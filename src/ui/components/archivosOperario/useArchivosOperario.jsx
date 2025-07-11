import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { obtenerOperarioPorId } from "./../../../apis/operariosApis"
import { obtenerTodosLosContratosPorIdOperarioYEmpresa } from "./../../../apis/contratosApis"
import { obtenerEmpresaPorId } from "./../../../apis/empresasApis"
import { handlerActualizarContrato } from "./../../../apis/contratosApis";
import { subirDocumentosContrato } from "./../../../apis/documentosApis"

export const useArchivosOperario = () => {
    
    const { idOperario } = useParams();
    const [searchParams] = useSearchParams();
    const navigation = useNavigate();
    const [formularioEditarContrato, setFormularioEditarContrato] = useState(null);
    
    const [operario, setOperario] = useState({});
    const [contratos, setContratos] = useState([]);
    const [empresa, setEmpresa] = useState({});
    const [toggleFormularioNuevoContrato, setToggleFormularioNuevoContrato] = useState(false);
    const [empresaId, setEmpresaId] = useState(null);

    const handleBack = () => {
        navigation('/operarios');
    };
        
    const handleToggleFormularioNuevoContrato = () => {
        setToggleFormularioNuevoContrato(!toggleFormularioNuevoContrato);
    };

    const obtenerOperario = async (idOperario) => {
        const operario = await obtenerOperarioPorId(idOperario);
        setOperario(operario);
        
        // Obtener el ID de empresa de los parámetros de la URL
        const empresaIdFromUrl = searchParams.get('empresa');
        
        let empresaIdToUse;
        if (empresaIdFromUrl) {
            // Si viene el ID de empresa desde la URL, usarlo
            empresaIdToUse = empresaIdFromUrl;
        } else {
            // Si no, usar la primera empresa del operario
            empresaIdToUse = operario.empresaIDs[0];
        }
        
        setEmpresaId(empresaIdToUse);
        obtenerEmpresa(empresaIdToUse);
        obtenerContratosDelOperario(empresaIdToUse, operario.id);
    }

    const obtenerContratosDelOperario = async (idEmpresa, idOperario) => {
        const contratosDelOperario = await obtenerTodosLosContratosPorIdOperarioYEmpresa(idEmpresa, idOperario);
        setContratos(contratosDelOperario);
    }

    const obtenerEmpresa = async (idEmpresa) => {
        const empresa = await obtenerEmpresaPorId(idEmpresa);
        setEmpresa(empresa);
    }

    const handlerEditarContrato = async (datosActualizados) => {
    await handlerActualizarContrato(datosActualizados);
    };
    
    const handlerSubirDocumentosContrato = async (formData) => {
        formData.cedula = operario.numeroCedula;
        await subirDocumentosContrato(formData);
        obtenerContratosDelOperario(empresaId, operario.id);
    }

    useEffect(() => {
        if (idOperario) {
            obtenerOperario(idOperario);
        }
    }, [idOperario, searchParams]);

    return {
        handleBack,
        toggleFormularioNuevoContrato,
        handleToggleFormularioNuevoContrato,
        operario,
        empresa,
        handlerSubirDocumentosContrato,
        handlerEditarContrato,
        obtenerContratosDelOperario,
        contratos,
        empresaId
    };
};