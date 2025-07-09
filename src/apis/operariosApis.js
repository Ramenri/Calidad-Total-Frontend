export const obtenerOperarioPorId = async (idOperario) => {
    try {
        const response = await fetch(`http://192.160.1.202:5000/operario/buscar/${idOperario}`)
        const data = await response.json();
        return data
    } catch (error) {
        alert("Ahi un error en la peticion del operario: " + error)
    }
}

export const obtenerTodosLosOperarios = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.160.1.202:5000/operario/obtenerTodos`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json();
        return data
    } catch (error) {
        alert("Ahi un error en la peticion del operario: " + error)
    }
}

export const crearOperarioConDatosBasicos = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.160.1.202:5000/operario/crearOperarioRelacionandoTodo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            nombre: formData.nombre,
            apellido: formData.apellido,
            cedula: formData.cedula,
            correo: formData.correo,
            telefono: formData.telefono,
            empresa: formData.empresa,
            centroTrabajo: formData.centroTrabajo,
            cargo: formData.cargo,
            fechaInicioContrato: formData.fechaInicioContrato,
            fechaFinContrato: formData.fechaFinContrato,
        }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear el operario:", error);
        throw error;
    }
}

export const actualizarOperarioPorId = async (formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.160.1.202:5000/operario/actualizar/${formData.idOperario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: formData.nombre,
                apellido: formData.apellido,
                numero_cedula: formData.numeroCedula,
                correo: formData.correo,
                numero_telefonico: formData.numeroTelefonico,
                estado: formData.estado,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar el operario:", error);
        throw error;
    }
}

// Función para filtrar operarios con todos los criterios
export const filtrarOperariosCompleto = async (filtros) => {
    try {
        const token = localStorage.getItem('token');
        
        // Preparar los filtros para el backend
        const filtrosBackend = {};
        
        // Mapear los filtros del frontend al formato esperado por el backend
        if (filtros.empresa && filtros.empresa !== "") {
            filtrosBackend.empresa_id = filtros.empresa;
        }
        
        if (filtros.cedula && filtros.cedula.trim() !== "") {
            filtrosBackend.numero_cedula = filtros.cedula.trim();
        }
        
        if (filtros.nombre && filtros.nombre.trim() !== "") {
            filtrosBackend.nombre = filtros.nombre.trim();
        }
        
        if (filtros.cargo && filtros.cargo !== "") {
            filtrosBackend.cargo = filtros.cargo;
        }
        
        if (filtros.estado !== "") {
            // Convertir el valor booleano a string para el backend
            filtrosBackend.estado_operario = filtros.estado === "true" ? "activo" : "inactivo";
        }
        
        if (filtros.centroTrabajo && filtros.centroTrabajo !== "") {
            filtrosBackend.centro_trabajo_id = filtros.centroTrabajo;
        }
        
        console.log("Filtros enviados al backend:", filtrosBackend);
        
        const response = await fetch(`http://192.160.1.202:5000/operario/filtrarOperariosCompleto`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(filtrosBackend)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error en la respuesta del servidor');
        }
        
        console.log("Respuesta del backend:", data);
        return data.operarios || []; // Retornar solo el array de operarios
        
    } catch (error) {
        console.error("Error al filtrar operarios:", error);
        alert("Hay un error en el filtrado de operarios: " + error.message);
        return []; // Retornar array vacío en caso de error
    }
}