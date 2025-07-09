export const obtenerEmpresaPorId = async (idEmpresa) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/empresa/buscarPorUuid?uuid=${idEmpresa}`);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("lo siento courrio un error: " + error)
    }
}
export const obtenerTodasLasEmpresas = async () => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/empresa/todo`);
        const data = await response.json();
            return data;
    } catch (error) {
        alert("Errpr al obtener todas las empresas: " + error)
    }
}

export const crearNuevaEmpresa = async (empresa) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/empresa/crear`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: empresa.nombre,
                codigo: empresa.codigo
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        alert("ocurrio un error al crear la empresa: " + error)
    }
}
    
export const actualizarEmpresaPorId = async (empresa) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://127.0.0.1:5000/empresa/actualizar/${empresa.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nombre: empresa.nombre,
                codigo: empresa.codigo,
                estado: empresa.estado
            }),
        });
        const data = await response.json();
        console.log(data)
    } catch (error) {
        alert("ocurrio un error al actualizar la empresa: " + error)
    }
}

export const obtenerEmpresasDelOperarioNoAfiliadas = async (cedulaOperario) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/empresa/obtenerEmpresasDelOperarioNoAfiliadas/${cedulaOperario}`);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("ocurrio un error al obtener las empresas del operario no afiliadas: " + error)
    }
}