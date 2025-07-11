import React, { useState } from 'react';
import { useArchivosOperario } from './useArchivosOperario';
import { FormularioEditarContrato } from '../formularios/FormularioEditarContrato/formularioEditarContrato';
import "./ArchivosOperario.css"
import { FormularioNuevoContrato } from '../formularios/FormularioNuevoContrato/FormularioNuevoContrato';
import { ContratosItems } from './contratosItems/contratosItems';
import {  
  FiArrowLeft,
  FiPlus,
  FiFileText
} from 'react-icons/fi';

export const ArchivosOperario = () => {

  const {
    handleBack,
    toggleFormularioNuevoContrato,
    handleToggleFormularioNuevoContrato,
    operario,
    empresa,
    handlerEditarContrato,
    handlerSubirDocumentosContrato,
    obtenerContratosDelOperario,
    contratos
  } = useArchivosOperario();
  const [formularioEditarContrato, setFormularioEditarContrato] = useState(null);

  return (
    <div className="archivos-operario">
      <header className="header">
        <div className="header-left">
          <button className="back-btn" onClick={handleBack}>
            <FiArrowLeft size={20} />
          </button>
          <div className="header-title">
            <div className="file-icon">
              <FiFileText />
            </div>
            <div className="title-text">
              <h1>Archivo de operario</h1>
              <p>ID: {operario.id}</p>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <button className="header-btn primary" onClick={handleToggleFormularioNuevoContrato}>
            <FiPlus size={14} />
            Nuevo contrato
          </button>
        </div>
      </header>

      <div className="user-info">
        <div className="user-details">
          <div className="user-field">
            <h4>Nombre</h4>
            <p>{operario.nombre} {operario.apellido}</p>
          </div>
          <div className="user-field">
            <h4>Cedula</h4>
            <p>{operario.numeroCedula}</p>
          </div>
          <div className="user-field">
            <h4>Numero telefonico</h4>
            <p>{operario.numeroTelefonico}</p>
          </div>
          <div className="user-field">
            <h4>Empresa</h4>
            <p>{empresa.nombre}</p>
          </div>
          <div className="user-field">
            <h4>Correo Electrónico</h4>
            <p>{operario.correo}</p>
          </div>
        </div>
          {(() => {
            const asociacion = operario.empresas?.find(e => e.id === empresa.id);
            const estadoActivo = asociacion?.estado_operario_en_empresa === true;

            return (
              <div className={estadoActivo ? 'status-badge-bn' : 'status-badge-bn inactivo'}>
                {estadoActivo ? "activo" : "inactivo"}
              </div>
            );
          })()}
      </div>

      <div className="contract-section">
        {contratos.map((contrato, index) => (
            <ContratosItems 
                key={index} 
                contrato={contrato}
                onEditarContrato={() => setFormularioEditarContrato(contrato)}
                handlerSubirDocumentosContrato={handlerSubirDocumentosContrato}
            />
        ))}
      </div>
      <FormularioEditarContrato
        contrato={formularioEditarContrato}
        idEmpresa={empresa.id}
        onClose={() => setFormularioEditarContrato(null)}
        onSubmit={async (datosActualizados) => {
          await handlerEditarContrato(datosActualizados); // ahora ya existe
          obtenerContratosDelOperario(empresa.id, operario.id);
          setFormularioEditarContrato(null);
        }}
      />

      { toggleFormularioNuevoContrato && (
        <div className="formulario-nuevo-contrato-div">
          <FormularioNuevoContrato 
            setMostrarFormularioContrato={handleToggleFormularioNuevoContrato} 
            operario={operario} 
            empresa={empresa} 
          />
        </div>
      )}
    </div>
  );
};