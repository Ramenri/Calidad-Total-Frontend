import { FaCircleXmark } from "react-icons/fa6";
import "./formularioSubirArchivo.css"
import { useState } from "react";
import { filtros } from "../../../../models/filtros";

export const FormularioSubirArchivo = ({ idContrato, handlerCloseForm, handlerSubirDocumentoPorIdDelContrato, tipoArchivo }) => {
  
  const [formData, setFormData] = useState({
    file: "",
    fecha_expedicion: "",
    tipoArchivo: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleInputChangeFile = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.id_contrato = idContrato;
    if(tipoArchivo !== filtros.contratoInfo){
      formData.tipoArchivo = tipoArchivo;
    }

    handlerCloseForm("", false);
    handlerSubirDocumentoPorIdDelContrato(formData);
    window.location.reload();
  }

  return (
    <form className="formulario-subir-archivo" onSubmit={handleSubmit}>
      <div className="container-formulario">
        <h1 className="title">Subir archivo</h1>
        <button className="close-btn" type="button" onClick={() => handlerCloseForm("", false)}><FaCircleXmark size={100} /></button>
        <label className="label-file" name="file" htmlFor="file">
            <span>Subir archivo</span>
            <input required name="file" type="file" id="file" onChange={handleInputChangeFile}/>
        </label>
        <label className="label-file" name="fecha_expedicion" htmlFor="fecha_expedicion">
            <span>Fecha de expedicion</span>
            <input required name="fecha_expedicion" type="date" placeholder="Fecha de expedicion" onChange={handleInputChange}/>
        </label>
        <label style={{display: tipoArchivo === filtros.contratoInfo ? "block" : "none"}} className="label-file" htmlFor="tipoArchivo">
          {tipoArchivo === filtros.contratoInfo && (
            <>
              <span>Tipo de archivo</span>
              <select required className="select-tipo-archivo" name="tipoArchivo" id="tipoArchivo" onChange={handleInputChange}>
                <option value="">Seleccione un tipo de archivo</option>
                <option value={filtros.licenciaNoRemunerada}>Licencia no remunerada</option>
                <option value={filtros.incapacidades}>Incapacidades</option>
                <option value={filtros.otrosDocumentos}>Otros documentos</option>
                <option value={filtros.contrato}>Contrato</option>
                <option value={filtros.liquidacion}>Liquidacion</option>
                <option value={filtros.otroSi}>Otro si</option>
              </select>
            </>
            )}
        </label>
        <button className="btn" type="submit">Subir archivo</button>
      </div>
    </form>
  );
};