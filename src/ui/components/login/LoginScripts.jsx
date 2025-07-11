export const handleLogin = async (event, navigate) =>{
    event.preventDefault();

    const nombre_usuario = document.getElementById('usuario').value;
    const contraseña = document.getElementById('contraseña').value;

    try{
        const response = await fetch('http://192.168.1.202:5000/usuario/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre_usuario, contraseña}),
        });

        const data = await response.json();

        if (response.ok){

            localStorage.setItem('token', data.token);

            alert('Bienvenido: ' + data.nombre_usuario);
            navigate('/operarios');
        } else {
            console.error('Error en login:', data);
            alert('Error al inciar sesión: ' + (data.message || 'Credenciales incorrectas'));
        }
        
    } catch (error){
        console.error(' Error en la petición:', error);
        alert('Error de conexión con el servidor.');
    }

};