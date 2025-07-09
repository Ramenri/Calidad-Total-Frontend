export const obtenerUsuarioDesdeToken = () => {
    const token = localStorage.getItem('token');

    if (!token) return null;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));
        const usuario = JSON.parse(payload.sub); 

        return usuario.nombre_usuario || null;
    } catch (error) {
        console.error('Error decodificando el token:', error);
        return null;
    }
};