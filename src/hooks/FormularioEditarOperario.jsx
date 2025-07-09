import { useState } from 'react';

export const FormularioEditarOperario = ({ operario, onCancelar, onGuardadoExitoso }) => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    numeroCedula: '',
    numeroTelefonico: '',
    correo: '',
    estado: operario.estado === true ? 'activo' : 'inactivo',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const datosParaEnviar = {
        nombre: form.nombre.trim() || operario.nombre,
        apellido: form.apellido.trim() || operario.apellido,
        numeroCedula: form.numeroCedula.trim() || operario.numeroCedula,
        numeroTelefonico: form.numeroTelefonico.trim() || operario.numeroTelefonico,
        correo: form.correo.trim() || operario.correo,
        estado: form.estado === 'activo',
    };

    try {

        const token = localStorage.getItem('token');

        const respuesta = await fetch(`http://127.0.0.1:5000/operario/actualizar/${operario.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(datosParaEnviar),
        });

        if (!respuesta.ok) throw new Error('Error al guardar cambios');

        const dataActualizada = await respuesta.json();
        onGuardadoExitoso(dataActualizada); 
        onCancelar(); 
    } catch (error) {
        alert('Error al editar el operario: ' + error.message);
    }
    };

  return (
    <form className="formulario-editar-operario" onSubmit={handleSubmit}>
      <h4>Editar información del operario</h4>

      <div className="campo">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder={operario.nombre}
        />
      </div>

      <div className="campo">
        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          placeholder={operario.apellido}
        />
      </div>

      <div className="campo">
        <label>Cédula:</label>
        <input
          type="text"
          name="numeroCedula"
          value={form.numeroCedula}
          onChange={handleChange}
          placeholder={operario.numeroCedula}
        />
      </div>

      <div className="campo">
        <label>Teléfono:</label>
        <input
          type="text"
          name="numeroTelefonico"
          value={form.numeroTelefonico}
          onChange={handleChange}
          placeholder={operario.numeroTelefonico}
        />
      </div>

      <div className="campo">
        <label>Correo:</label>
        <input
          type="email"
          name="correo"
          value={form.correo}
          onChange={handleChange}
          placeholder={operario.correo}
        />
      </div>

      <div className="campo">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          value={form.estado}
          onChange={handleChange}
        >
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>

      <div className="acciones">
        <button type="submit" className="btn-guardar">Guardar cambios</button>
        <button type="button" onClick={onCancelar} className="btn-cancelar">Cancelar</button>
      </div>
    </form>
  );
};
