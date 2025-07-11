import "./contratosItems.css"
import { FiEdit, FiChevronDown, FiChevronUp, FiFileText, FiDownload, FiPlus, FiCalendar, FiX} from "react-icons/fi";
import { DocumentItem } from "../documentItem/documentItem";
import { useContratoItems } from "./useContratoItems";
import { FormularioSubirArchivo } from "../../formularios/FormularioSubirArchivo/formularioSubirArchivo";
import { filtros } from "../../../../models/filtros";
import { FiltrosDatosContrato } from "../filtrosDatosContrato/filtrosDatosContrato";


export const ContratosItems = ({contrato, handlerEditarEstadoDelContrato, handlerSubirDocumentosContrato, onEditarContrato}) => {
 
  const {
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
    onChnageDateExtender,
    showExtenderForm,
    handlerShowExtenderForm,
    archivoExtender,
    onChangeArchivoExtender,
    handlerExtenderContrato,
    fechaExpedicion,
    onChangeFechaExpedicion
  } = useContratoItems(contrato, handlerEditarEstadoDelContrato, handlerSubirDocumentosContrato);

 
    return (
        <>
            <div className="section-header">
              <div className="section-title">
                <div className="section-icon">
                  <FiFileText />
                  <div className='section-title-text'>
                    <h3>Contrato {contrato.cargo}</h3>
                    <div className={contrato.estado ? 'status-badge-bn section-subtitle"' : 'section-subtitle status-badge-bn inactivo'}>{contrato.estado ? "activo" : "inactivo" }</div>
                    <div className="section-subtitle">{contrato.nombre_empresa}</div>
                  </div>
                </div>
                <div className="section-actions">
                  <button type="button" onClick={handlerShowExtenderForm} className="action-btn extend">
                    <FiCalendar />
                  </button>
                  <button onClick={onEditarContrato} className={contrato.estado ? "action-btn edit" : "action-btn edit inactivo"}>
                    <FiEdit />
                  </button>
                  <button onClick={() => handleDescargarContratoUnido(contrato.id)} className="action-btn view"><FiDownload /></button>
                  <span style={{fontSize: '12px', color: '#5f6368'}}>Inicio {contrato.fechaInicio}</span>
                  <span style={{fontSize: '12px', color: '#5f6368'}}>Fin {contrato.FechaFin}</span>
                  <button onClick={toggleSection} className="expand-btn" >
                    {expandedSections ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                 </div>
              </div>
              
              {showExtenderForm && (
                <div className="extender-form-overlay">
                  <div className="extender-form">
                    <div className="extender-form-header">
                      <h3>Extender Contrato</h3>
                      <button onClick={() => handlerShowExtenderForm(false)} className="close-btn">
                        <FiX />
                      </button>
                    </div>
                    <div className="extender-form-body">
                      <div className="form-group">
                        <label htmlFor="fechaFinExtender">Nueva Fecha Fin *</label>
                        <input 
                          type="date" 
                          id="fechaFinExtender"
                          value={fechaExtender}
                          onChange={onChnageDateExtender}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="fechaExpedicion">Fecha de Expedición *</label>
                        <input 
                          type="date" 
                          id="fechaExpedicion"
                          value={fechaExpedicion}
                          onChange={onChangeFechaExpedicion}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="archivoExtender">Archivo Requerido *</label>
                        <input 
                          type="file" 
                          id="archivoExtender"
                          onChange={onChangeArchivoExtender}
                          required
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                      </div>
                    </div>
                    <div className="extender-form-footer">
                      <button 
                        type="button" 
                        onClick={() => handlerShowExtenderForm(false)} 
                        className="btn-cancelar"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="button" 
                        onClick={handlerExtenderContrato} 
                        className="btn-aceptar"
                        disabled={!fechaExtender || !archivoExtender || !fechaExpedicion}
                      >
                        Aceptar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {expandedSections && (
                <div className="document-list">
                    <div className='document-title'>
                        Hojas de vida
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.hojaVida, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.hojaVida)} 
                          className="document-button" 
                          >{expandedDocumentos.hojaVida ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.hojaVida && (
                      documentosDelContratoFiltrados.hojaVida.length > 0 ? documentosDelContratoFiltrados.hojaVida.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Cedula
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.cedula, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.cedula)} 
                          className="document-button" 
                          >{expandedDocumentos.cedula ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.cedula && (
                      documentosDelContratoFiltrados.cedula.length > 0 ? documentosDelContratoFiltrados.cedula.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Carnet vacunas
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.carnetVacunas, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.carnetVacunas)} 
                          className="document-button" 
                          >{expandedDocumentos.carnetVacunas ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.carnetVacunas && (
                      documentosDelContratoFiltrados.carnetVacunas.length > 0 ? documentosDelContratoFiltrados.carnetVacunas.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Induccion
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.induccion, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.induccion)} 
                          className="document-button" 
                          >{expandedDocumentos.induccion ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.induccion && (
                      documentosDelContratoFiltrados.induccion.length > 0 ? documentosDelContratoFiltrados.induccion.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Conduccion
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.conduccion, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.conduccion)} 
                          className="document-button" 
                          >{expandedDocumentos.conduccion ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.conduccion && (
                      documentosDelContratoFiltrados.conduccion.length > 0 ? documentosDelContratoFiltrados.conduccion.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Antecedentes
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.antecedentes, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.antecedentes)} 
                          className="document-button" 
                          >{expandedDocumentos.antecedentes ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.antecedentes && (
                      documentosDelContratoFiltrados.antecedentes.length > 0 ? documentosDelContratoFiltrados.antecedentes.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Bachillerato
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.bachillerato, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.bachillerato)} 
                          className="document-button" 
                          >{expandedDocumentos.bachillerato ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.bachillerato && (
                      documentosDelContratoFiltrados.bachillerato.length > 0 ? documentosDelContratoFiltrados.bachillerato.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Certificado laboral
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.certificadoLaboral, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.certificadoLaboral)} 
                          className="document-button" 
                          >{expandedDocumentos.certificadoLaboral ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.certificadoLaboral && (
                      documentosDelContratoFiltrados.certificadoLaboral.length > 0 ? documentosDelContratoFiltrados.certificadoLaboral.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Certificado EPS
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.certificadoEPS, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.certificadoEPS)} 
                          className="document-button" 
                          >{expandedDocumentos.certificadoEPS ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.certificadoEPS && (
                      documentosDelContratoFiltrados.certificadoEPS.length > 0 ? documentosDelContratoFiltrados.certificadoEPS.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Otros cursos
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.otrosCursos, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.otrosCursos)} 
                          className="document-button" 
                          >{expandedDocumentos.otrosCursos ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.otrosCursos && (
                      documentosDelContratoFiltrados.otrosCursos.length > 0 ? documentosDelContratoFiltrados.otrosCursos.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Cursos posgrado
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.cursosPosgrado, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.cursosPosgrado)} 
                          className="document-button" 
                          >{expandedDocumentos.cursosPosgrado ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.cursosPosgrado && (
                      documentosDelContratoFiltrados.cursosPosgrado.length > 0 ? documentosDelContratoFiltrados.cursosPosgrado.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Cursos pregrado
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.cursosPregrado, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.cursosPregrado)} 
                          className="document-button" 
                          >{expandedDocumentos.cursosPregrado ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.cursosPregrado && (
                      documentosDelContratoFiltrados.cursosPregrado.length > 0 ? documentosDelContratoFiltrados.cursosPregrado.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        libreta militar
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.libretaMilitar, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.libretaMilitar)} 
                          className="document-button" 
                          >{expandedDocumentos.libretaMilitar ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.libretaMilitar && (
                      documentosDelContratoFiltrados.libretaMilitar.length > 0 ? documentosDelContratoFiltrados.libretaMilitar.map((item, index) => (
                      <DocumentItem key={index} item={item} />
                      )) : <p className="document-no-hay">No hay documentos</p>
                    )}

                    <div className='document-title'>
                        Informacion Del Contrato
                        <div className="document-title-actions">
                          <button 
                          onClick={() => handlerCloseForm(filtros.contratoInfo, true)} 
                          className="action-btn subir"
                          ><FiPlus /></button>
                          <button 
                          onClick={() => handlerExnpandedDocumentos(filtros.contratoInfo)} 
                          className="document-button" 
                          >{expandedDocumentos.contratoInfo ? <FiChevronUp /> : <FiChevronDown />}</button>
                        </div>
                    </div>
                    {expandedDocumentos.contratoInfo && (
                      <FiltrosDatosContrato 
                      expandedDocumentos={expandedDocumentos} 
                      handlerExnpandedDocumentos={handlerExnpandedDocumentos}
                      handlerCloseForm={handlerCloseForm}
                      documentosDelContratoFiltrados={documentosDelContratoFiltrados}
                       />
                    )}
                    </div>

                
              )}
              {closeForm && <FormularioSubirArchivo 
                tipoArchivo={tipoArchivo} 
                handlerCloseForm={handlerCloseForm} 
                idContrato={contrato.id} 
                handlerSubirDocumentoPorIdDelContrato={handlerSubirDocumentoPorIdDelContrato} 
              />}
          </div>
        </>
    );
};