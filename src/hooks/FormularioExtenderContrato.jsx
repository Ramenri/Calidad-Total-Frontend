import { useState } from 'react';
import { useSubidaDocumentos } from '../ui/components/archivosOperario/ArchivosOperarioScripts';

export const FormularioExtenderContrato = ({
  contrato,
  onCancelar,
  onGuardadoExitoso,
  cedulaOperario,
}) => {
  const [form, setForm] = useState({
    nuevaFechaFin: '',
    file: null,
    fechaExpedicion: '',
  });

  const { 
    handleSubirDocumento, 
    setArchivoSeleccionado,
    setTipoDocumentoSeleccionado,
    setFechaExpedicion
   } = useSubidaDocumentos();

  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeFile = (e) => {
    const { name, files } = e.target;
    setForm({
      ...form,
      [name]: files[0],
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCargando(true);

      const token = localStorage.getItem('token');
      

      const respuesta = await fetch(`http://192.160.1.202:5000/contrato/extender/${contrato.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nueva_fecha_fin: form.nuevaFechaFin
        }),
      });
      const data = await respuesta.json();

      const formData = new FormData();
      formData.append('file', form.file);
      formData.append('tipoArchivo', 'otro si');  
      formData.append('fecha_expedicion', form.fechaExpedicion);
      formData.append('id_contrato', contrato.id);                
      formData.append('cedula', cedulaOperario);  

      const respuestaFile = await fetch(`http://192.160.1.202:5000/documento/guardar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      const dataFile = await respuestaFile.json();

      console.log('✅ Documento subido:', dataFile);

      if (respuesta.ok) {
        console.log('✅ Contrato extendido:', data);
        onGuardadoExitoso(data);
          try {
            const contratosActualizados = await recargarContratos(contrato.operario_id, contrato.empresa_id);
            onGuardadoExitoso(contratosActualizados);
        } catch (error) {
            console.error('❌ Error al recargar contratos:', error);
        }
      } else {
        console.error('❌ Error al extender contrato:', data.error || data);
        alert('Error al extender contrato: ' + (data.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('❌ Error de red o servidor:', error);
      alert('Error de red o servidor: ' + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <form className="formulario-extender-contrato" onSubmit={handleSubmit}>
      <h4>Extender contrato</h4>

      <div className="campo">
        <label>Nueva fecha de finalización:</label>
        <input
          type="date"
          name="nuevaFechaFin"
          value={form.nuevaFechaFin}
          onChange={handleChange}
          required
        />
      </div>

      <div className="campo">
        <label>Fecha de expedición:</label>
        <input type="date" name="fechaExpedicion" value={form.fechaExpedicion} onChange={handleChange} required />
      </div>

      <div className="campo">
        <label>Cargar otro si:</label>
        <input type="file" name="file" id="file" onChange={handleChangeFile} required />
      </div>

      <div className="acciones">
        <button type="submit" className="btn-guardar" disabled={cargando}>
          {cargando ? 'Guardando...' : 'Guardar'}
        </button>
        <button type="button" onClick={onCancelar} className="btn-cancelar">
          Cancelar
        </button>
      </div>
    </form>
  );
};
