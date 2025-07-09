export const obtenerTodosHistorial = async () => {
    const response = await fetch("http://192.168.1.202:5000/historial/obtenerTodos", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data)
    return data;
}
