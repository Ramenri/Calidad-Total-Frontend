export const obtenerTodosHistorial = async () => {
    const response = await fetch("http://localhost:5000/historial/obtenerTodos", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data)
    return data;
}
