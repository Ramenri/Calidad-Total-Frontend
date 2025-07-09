export const obtenerUsuarioPorId = async (idUsuario) => {
    try {
        const response = await fetch(`http://192.160.1.202:5000/usuario/buscar/${idUsuario}`)
        const data = await response.json();
        return data
    } catch (error) {
        alert("Ahi un error en la peticion del operario: " + error)
    }
}

export const crearUnionConOperario = async (dataInfo) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.160.1.202:5000/usuario/crearUnionConOperario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre_usuario: dataInfo.usuario,
                contraseña: dataInfo.contraseña,
                operarioId: dataInfo.operarioId,
            }),
        });
        const data = await response.json();
        alert("Union creada correctamente")
        return data;
    } catch (error) {
        alert("lo siento courrio un error: " + error)
    }
}

export const crearAdmin = async (dataInfo) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.160.1.202:5000/usuario/crearAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: dataInfo.nombre,
                apellido: dataInfo.apellido,
                numero_cedula: dataInfo.numero_cedula,
                correo: dataInfo.correo,
                numero_telefonico: dataInfo.numero_telefonico,
                estado: true,
                contraseña: dataInfo.contraseña,
                rol: "administrador",
            }),
        });
        const data = await response.json();
        alert("Administrador creado correctamente")
        return data;
    } catch (error) {
        alert("lo siento courrio un error: " + error)
    }
}

export const eliminarAdmin = async (idAdmin) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.160.1.202:5000/usuario/eliminarAdmin/${idAdmin}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        alert("Administrador eliminado correctamente")
        return data;
    } catch (error) {
        alert("lo siento courrio un error: " + error)
    }
}
    