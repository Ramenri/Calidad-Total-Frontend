export const obtenerTodosLosDocumentosPorIdContrato = async (idContrato) => {
    try {
        const response = await fetch(`http://192.168.1.202:5000/documento/buscarPorContrato/${idContrato}`);
        const data = await response.json();
        return data
    } catch (error) {
        alert("ocurrio un error al obtener documentos: " + error);
    }
}

export const obtenerElArchivoPorUrl = async (url) => {
    try {
        const response = await fetch(`http://192.168.1.202:5000/documento/archivos/${url}`)
        const data = response.json();
        return data
    } catch (error) {
        alert("ocurrio un error al obtener el archivo: " + error)
    }
}


export const subirDocumentosContrato = async (formData) => {
    try {
        const token = localStorage.getItem('token');

        const formDataNew = new FormData();
        
        formDataNew.append("id_contrato", formData.id_contrato);
        formDataNew.append("file", formData.file);
        formDataNew.append("tipoArchivo", formData.tipoArchivo);
        formDataNew.append("fecha_expedicion", formData.fecha_expedicion);
        formDataNew.append("cedula", formData.cedula);

        const response = await fetch("http://192.168.1.202:5000/documento/guardar", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formDataNew,
        });

        if (!response.ok) throw new Error("Error al subir documentos");

        const data = await response.json();
        alert("Documento subido exitosamente");
    } catch (error) {
        alert("Error al subir documentos: " + error);
    }
}

export const convertirBase64FileEnBlobAndAbrir = (base64) => {
    const byteCharacters = atob(base64);
    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
}

export const editarEstadoDelDocumento = async (idDocumento, estado) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.168.1.202:5000/documento/cambiar_estado/${idDocumento}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: estado }),
        });
        if (!response.ok) throw new Error("Error al editar estado del documento");
        const data = await response.json();
        alert("Estado del documento editado exitosamente");
    } catch (error) {
        alert("Error al editar estado del documento: " + error);
    }
}

export const generarPdfDelOperario = async (contrato_id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://192.168.1.202:5000/documento/pdf/${contrato_id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error("Error al generar pdf del operario");
        const data = await response.json();
        return data
    } catch (error) {
        alert("Error al generar pdf del operario: " + error);
    }
}