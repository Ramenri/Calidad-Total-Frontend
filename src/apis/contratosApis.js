export const obtenerTodosLosContratosPorIdOperarioYEmpresa =  async (idEmpresa, idOperario) => {
    try {
        const response = await fetch(`http://192.168.1.202:5000/contrato/buscarPorOperario/${idOperario}?empresa=${idEmpresa}`);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("un error al obtener contratos: " + error)
    }
}

export const handleDescargarContrato = async (idContrato) => {
    try {
  
      const token = localStorage.getItem('token');
      const response = await fetch(`http://192.168.1.202:5000/documento/juntar/pdf/${idContrato}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      alert("Error al descargar contrato:", error);
    }
}

export async function handlerActualizarContrato(datosActualizados) {
  try {
    const token = localStorage.getItem('token');

    const datosTransformados = {
      id: datosActualizados.id,
      cargo: datosActualizados.cargo,
      fecha_inicio: datosActualizados.fechaInicio,
      fecha_fin: datosActualizados.FechaFin || datosActualizados.fechaFin, // compatible con ambas
      centro_id: datosActualizados.centro_id,
      estado: datosActualizados.estado,
    };

    const response = await fetch(`http://192.168.1.202:5000/contrato/actualizar/${datosActualizados.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datosTransformados),
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error al actualizar contrato:", error);
    throw error;
  }
}



export const crearContrato = async (formData) => {
    try {

        const token = localStorage.getItem('token');

        const response = await fetch("http://192.168.1.202:5000/contrato/crear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                operario_id: formData.operario_id,
                centro_id: formData.centroTrabajo,
                fechaInicio: formData.fechaInicio,
                fechaFin: formData.fechaFin,
                cargo: formData.cargo,
              }),
        });

        if (!response.ok) throw new Error("Error al crear contrato");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al crear el contrato:", error);
        throw error;
    }
}

export const handlerEditarFechaFinDelContrato = async (idContrato, fechaFin) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://192.168.1.202:5000/contrato/extender/${idContrato}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fechaFin: fechaFin }),
    });
    const data = await response.json();
    alert("Fecha cambiada satisfactoriamente")
    console.log(data)
  } catch (error) {
    console.error("Error al cambiar la fecha del contrato:", error);
  }
};