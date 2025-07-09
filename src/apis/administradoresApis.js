export const obtenerTodosLosAdmin = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch("http://http://192.160.1.202:5000/usuario/obtenerTodos", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        console.log("todos los admin: ", data)
        return data;
    } catch (error) {
        alert("lo siento courrio un error: " + error)
    }
}