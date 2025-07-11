import { useState, useEffect } from "react";
import { cargos } from "../../../../models/filtros";
import { handlerObtenerCentroPorEmpresaId } from "../../../../apis/centroApis";
import "./formularioEditarContrato.css"

export const FormularioEditarContrato = ({ contrato, onClose, onSubmit, idEmpresa }) => {
  const [formData, setFormData] = useState({
    id: "",          
    cargo: "",
    fechaInicio: "",
    fechaFin: "",
    centro_id: "",
    estado: true,
  });

  const [centrosTrabajo, setCentrosTrabajo] = useState([]);

  useEffect(() => {
    if (idEmpresa) {
      handlerObtenerCentroPorEmpresaId(idEmpresa).then((centros) => {
        setCentrosTrabajo(centros || []);
      });
    }
  }, [idEmpresa]);

  // Cargar datos iniciales al abrir el formulario
    useEffect(() => {
    if (contrato) {
        setFormData({
            id: contrato.id ?? "",
            cargo: contrato.cargo ?? "",
            fechaInicio: contrato.fechaInicio ?? "",
            fechaFin: contrato.FechaFin ?? "",
            centro_id: contrato.centro_id ?? "",
            estado: contrato.estado ?? false,
        });
    }
    }, [contrato]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Envía los datos actualizados
  };

  if (!contrato) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal formulario-editar-contrato">
        <h2>Editar contrato</h2>
        <form onSubmit={handleSubmit}>
            <label className="form-label">
            <span>Cargo *</span>
                <select
                className="form-input"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
                >
                <option value="">Seleccione un cargo</option>
                {cargos.map((cargo, index) => (
                <option key={index} value={cargo}>
                    {cargo}
                </option>
                ))}
            </select>
            </label>
            <label>
                Fecha inicio:
                <input name="fechaInicio" type="date" value={formData.fechaInicio} onChange={handleChange} />
            </label>

            <label>
                Fecha fin:
                <input name="fechaFin" type="date" value={formData.fechaFin} onChange={handleChange} />
            </label>

            <label>
              Centro de trabajo:
              <select name="centro_id" value={formData.centro_id} onChange={handleChange}>
                <option value="">Seleccione un centro</option>
                {centrosTrabajo.map((centro) => (
                  <option key={centro.id} value={centro.id}>
                    {centro.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label>
                Estado:
                <input type="checkbox" name="estado" checked={formData.estado} onChange={handleChange} />
            </label>

            <div className="modal-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </div>
        </form>
      </div>
      </div>
    </div>
  );
};
