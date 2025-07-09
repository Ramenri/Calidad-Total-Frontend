export const handlerObtenerCentroPorEmpresaId = async (idEmpresa) => {
    try {
        const response = await fetch(`http://192.160.1.202:5000/centroTrabajo/obtener/${idEmpresa}`);
        const data = await response.json();
        console.log(data)
        return data.centros_de_trabajo;
    } catch (error) {
        alert("ocurrio un error al obtener centro: " + error)
    }
}

export const crearNuevoCentroConEmpresa = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://192.160.1.202:5000/centroTrabajo/crear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: formData.nombre,
                empresa_id: formData.empresaId,
                codigo: formData.codigo
            }),
        });
        const data = await response.json();
        alert("Centro creado correctamente")
    } catch (error) {
        alert("Hubo un error al crea el centro: " + error)
    }
}

export const eliminarCentroPorId = async (idCentro) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.160.1.202:5000/centroTrabajo/eliminar/${idCentro}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        alert("Centro eliminado correctamente")
    } catch (error) {
        alert("Hubo un error al eliminar el centro: " + error)
    }
}

export const actualizarCentroPorId = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.160.1.202:5000/centroTrabajo/actualizar/${formData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: formData.nombre,
                codigo: formData.codigo,
                estado: formData.estado
            }),
        });
        const data = await response.json();
        alert("Centro actualizado correctamente")
    } catch (error) {
        alert("Hubo un error al actualizar el centro: " + error)
    }
}
    