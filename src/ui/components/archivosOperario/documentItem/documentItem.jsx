import React from 'react';
import "./documentItem.css"
import { FiFile, FiEye, FiEdit } from 'react-icons/fi';
import { obtenerElArchivoPorUrl, convertirBase64FileEnBlobAndAbrir, editarEstadoDelDocumento } from '../../../../apis/documentosApis';

export const DocumentItem = ({ item }) => {
    const showDocument = async (ruta) => {
      const archivoBase64 = await obtenerElArchivoPorUrl(ruta);
      convertirBase64FileEnBlobAndAbrir(archivoBase64);
    }

    const handlerEditarDocumento = (item) => {
      if (item.estado) {
        editarEstadoDelDocumento(item.id, false)
        window.location.reload();
      } else {
        editarEstadoDelDocumento(item.id, true)
        window.location.reload();
      }
    }

    return (
        <div className="document-item">
        <div className="document-info">
          <div className="document-icon">
            <FiFile />
          </div>
          <span className="document-name">{item.tipoArchivo}</span>
        </div>
        <div className="document-actions">
          <button onClick={() => handlerEditarDocumento(item)} className={item.estado ? "action-btn edit" : "action-btn edit inactivo"}>{item.estado ? <FiEdit /> : <FiEdit />}</button>
          <span className="document-date">Fecha expedicion: {item.fecha_expedicion}</span>
          <div className="action-buttons">
            <button onClick={() => showDocument(item.ruta_archivo)} className="action-btn view1"><FiEye /></button>
          </div>
        </div>
      </div>
    )
};