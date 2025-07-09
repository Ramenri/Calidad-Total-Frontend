import { filtros } from "../../../../models/filtros";
import "./filtrosDatosContrato.css"
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { DocumentItem } from "../documentItem/documentItem";


export const FiltrosDatosContrato = ({
    expandedDocumentos,
    handlerExnpandedDocumentos,
    documentosDelContratoFiltrados
}) => {

    return (
        <>
        <div className='document-title color-type'>
            Licencia No Remunerada
            <div className="document-title-actions">
                <button 
                onClick={() => handlerExnpandedDocumentos(filtros.licenciaNoRemunerada)}
                className="document-button" 
                >{expandedDocumentos.licenciaNoRemunerada ? <FiChevronUp /> : <FiChevronDown />}</button>
            </div>
        </div>
        {expandedDocumentos.licenciaNoRemunerada && (
            documentosDelContratoFiltrados.licenciaNoRemunerada && documentosDelContratoFiltrados.licenciaNoRemunerada.length > 0 ? documentosDelContratoFiltrados.licenciaNoRemunerada.map((item, index) => (
            <DocumentItem key={index} item={item} />
            )) : <p className="document-no-hay">No hay documentos</p>
        )}

        <div className='document-title color-type'>
            Contrato
            <div className="document-title-actions">
                <button 
                onClick={() => handlerExnpandedDocumentos(filtros.contrato)}
                className="document-button" 
                >{expandedDocumentos.contrato ? <FiChevronUp /> : <FiChevronDown />}</button>
            </div>
        </div>
        {expandedDocumentos.contrato && (
            documentosDelContratoFiltrados.contrato && documentosDelContratoFiltrados.contrato.length > 0 ? documentosDelContratoFiltrados.contrato.map((item, index) => (
            <DocumentItem key={index} item={item} />
            )) : <p className="document-no-hay">No hay documentos</p>
        )}

        <div className='document-title color-type'>
            Incapacidades
            <div className="document-title-actions">
                <button 
                onClick={() => handlerExnpandedDocumentos(filtros.incapacidades)}
                className="document-button" 
                >{expandedDocumentos.incapacidades ? <FiChevronUp /> : <FiChevronDown />}</button>
            </div>
        </div>
        {expandedDocumentos.incapacidades && (
            documentosDelContratoFiltrados.incapacidades && documentosDelContratoFiltrados.incapacidades.length > 0 ? documentosDelContratoFiltrados.incapacidades.map((item, index) => (
            <DocumentItem key={index} item={item} />
            )) : <p className="document-no-hay">No hay documentos</p>
        )}

        <div className='document-title color-type'>
            Otro Si
            <div className="document-title-actions">
                <button 
                onClick={() => handlerExnpandedDocumentos(filtros.otroSi)}
                className="document-button" 
                >{expandedDocumentos.otroSi ? <FiChevronUp /> : <FiChevronDown />}</button>
            </div>
        </div>
        {expandedDocumentos.otroSi && (
            documentosDelContratoFiltrados.otroSi && documentosDelContratoFiltrados.otroSi.length > 0 ? documentosDelContratoFiltrados.otroSi.map((item, index) => (
            <DocumentItem key={index} item={item} />
            )) : <p className="document-no-hay">No hay documentos</p>
        )}

        <div className='document-title color-type'>
            Otros Documentos
            <div className="document-title-actions">
                <button 
                onClick={() => handlerExnpandedDocumentos(filtros.otrosDocumentos)}
                className="document-button" 
                >{expandedDocumentos.otrosDocumentos ? <FiChevronUp /> : <FiChevronDown />}</button>
            </div>
        </div>
        {expandedDocumentos.otrosDocumentos && (
            documentosDelContratoFiltrados.otrosDocumentos && documentosDelContratoFiltrados.otrosDocumentos.length > 0 ? documentosDelContratoFiltrados.otrosDocumentos.map((item, index) => (
            <DocumentItem key={index} item={item} />
            )) : <p className="document-no-hay">No hay documentos</p>
        )}

        <div className='document-title color-type'>
            Liquidacion
            <div className="document-title-actions">
                <button 
                onClick={() => handlerExnpandedDocumentos(filtros.liquidacion)}
                className="document-button" 
                >{expandedDocumentos.liquidacion ? <FiChevronUp /> : <FiChevronDown />}</button>
            </div>
        </div>
        {expandedDocumentos.liquidacion && (
            documentosDelContratoFiltrados.liquidacion && documentosDelContratoFiltrados.liquidacion.length > 0 ? documentosDelContratoFiltrados.liquidacion.map((item, index) => (
            <DocumentItem key={index} item={item} />
            )) : <p className="document-no-hay">No hay documentos</p>
        )}
        </>
    )
}