import { Navigate } from "react-router-dom";

const isTokenValid = (rolesPermitidos) => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        const exp = payload.exp;

        if (exp && Date.now() >= exp * 1000) {
            localStorage.removeItem("token");
            return false;
        }

        const user = JSON.parse(payload.sub);
        const rol = user.rol;

        if (rolesPermitidos && rolesPermitidos.length > 0) {
            if (!rolesPermitidos.includes(rol)) {
                return "unauthorized";
            }
        }

        //guardar id del usuari en localStorage
        localStorage.setItem("idUsuario", user.id);
        return true;
    } catch (error) {
        console.error("Token inválido:", error);
        return false;
    }
};

export const PrivateRoute = ({ children, rolesPermitidos }) => {
    const validacion = isTokenValid(rolesPermitidos);

    if (validacion === true) return children;
    if (validacion === "unauthorized") return <Navigate to="/" />;

    return <Navigate to="/" />;
};