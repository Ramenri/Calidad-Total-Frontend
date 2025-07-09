import { useState, useEffect } from "react";
import { fetchConManejoErrores } from "../helpers/FetchConManejoErrores";

export const useFormularioNuevoOperario = (buscarOperariosCallback) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [centros, setCentros] = useState([]);              
  const [centrosFiltrados, setCentrosFiltrados] = useState([]); 
  const [nuevoOperario, setNuevoOperario] = useState({
    nombre: "",
    apellido: "",
    empresa_id: "",
    numero_cedula: "",
    correo: "",
    telefono: "",
    fecha_inicio: "",
    fecha_fin: "",
    centro_id: "",
    cargo_id: "",
    "Hoja de vida": null,
    "Cedula": null,
    "Hoja de vida Empresa": null,
    "Certificado eps": null,
    "Certificado pensiones": null,
    "Libreta militar": null,
    "Cursos pregrado": null,
    "Cursos postgrado": null,
    "Induccion": null,
    "Otros cursos": null,
    "Certificado bachiller": null,
    "Certificado laboral": null,
    "Certificado de antecedentes": null,
    "Licencia conduccion": null,
    "Carnet de vacunas": null,
    "Contrato": null,
    "Incapacidades": null,
    "Licencia no remunerada": null,
    "Otros documentos": null,
    fecha_expedicion: "",
  });


  const abrirFormulario = () => setMostrarFormulario(true);
  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setNuevoOperario({
      nombre: "",
      apellido: "",
      empresa_id: "",
      numero_cedula: "",
      correo: "",
      telefono: "",
      fecha_inicio: "",
      fecha_fin: "",
      centro_id: "",
      cargo_id: "",
      "Hoja de vida": null,
      "Cedula": null,
      "Hoja de vida Empresa": null,
      "Certificado eps": null,
      "Certificado pensiones": null,
      "Libreta militar": null,
      "Cursos pregrado": null,
      "Cursos postgrado": null,
      "Induccion": null,
      "Otros cursos": null,
      "Certificado bachiller": null,
      "Certificado laboral": null,
      "Certificado de antecedentes": null,
      "Licencia conduccion": null,
      "Carnet de vacunas": null,
      "Contrato": null,
      "Incapacidades": null,
      "Licencia no remunerada": null,
      "Otros documentos": null,
      fecha_expedicion: "",
    });
  };

  useEffect(() => {
    const cargarTodosCentros = async () => {
      try {
        const data = await fetchConManejoErrores("http://192.160.1.202:5000/centroTrabajo/todo");
        setCentros(data);
      } catch (error) {
        console.error("Error al cargar centros:", error);
        setCentros([]);
      }
    };
    cargarTodosCentros();
  }, []);

  useEffect(() => {
    if (nuevoOperario.empresa_id) {
      const filtrados = centros.filter(
        (c) => String(c.empresaID) === String(nuevoOperario.empresa_id)
      );
      setCentrosFiltrados(filtrados);
    } else {
      setCentrosFiltrados([]);
    }
  }, [nuevoOperario.empresa_id, centros]);

  const handleNuevoOperarioChange = (e) => {
    const { name, value, files } = e.target;
    const actualValue = files ? files[0] : value;
    setNuevoOperario((prev) => ({ ...prev, [name]: actualValue }));

    if (name === "empresa_id") {
      setNuevoOperario((prev) => ({ ...prev, centro_id: "" }));
    }
  };

  const subirDocumentos = async (contratoId) => {
    const fechaExpedicion = nuevoOperario.fecha_expedicion || new Date().toISOString().split("T")[0];

    const archivos = Object.entries(nuevoOperario).filter(([_, value]) => value instanceof File);

    for (const [tipoArchivo, file] of archivos) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tipoArchivo", tipoArchivo);
      formData.append("id_contrato", contratoId);
      formData.append("fecha_expedicion", fechaExpedicion);
      formData.append("cedula", nuevoOperario.numero_cedula);

      const response = await fetch("http://192.160.1.202:5000/documento/guardar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Error al subir ${tipoArchivo}:`, errorData);
        throw new Error(`Fallo al subir ${tipoArchivo}`);
      }
    }
  };

  const guardarNuevoOperario = async (e) => {
    e.preventDefault();
    let operarioId = null;
    let contratoId = null;

    try {
      const operarioResponse = await fetchConManejoErrores("http://192.160.1.202:5000/operario/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          nombre: nuevoOperario.nombre,
          apellido: nuevoOperario.apellido,
          numeroCedula: nuevoOperario.numero_cedula,
          numeroTelefonico: nuevoOperario.telefono,
          correo: nuevoOperario.correo,
          empresa_id: nuevoOperario.empresa_id,
        }),
      });

      operarioId = operarioResponse.id;

      const contratoResponse = await fetchConManejoErrores("http://192.160.1.202:5000/contrato/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          fechaInicio: nuevoOperario.fecha_inicio,
          fechaFin: nuevoOperario.fecha_fin,
          centro_id: nuevoOperario.centro_id,
          cargo: nuevoOperario.cargo_id,
          operario_id: operarioId,
        }),
      });

      contratoId = contratoResponse.id;

      await subirDocumentos(contratoId);

      alert("Operario guardado con éxito");
      await buscarOperariosCallback();
      cerrarFormulario();
    } catch (error) {
      console.error("Error guardando operario:", error);
      if (operarioId) {
        try {
          await fetchConManejoErrores(`http://192.160.1.202:5000/operario/eliminar/${operarioId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          console.log(`Operario ${operarioId} eliminado por error en el proceso.`);
        } catch (rollbackError) {
          console.error("Error al revertir la creación del operario:", rollbackError);
        }
      }
      alert("Hubo un error al guardar el operario. Intenta nuevamente.");
    }
  };

  return {
    mostrarFormulario,
    abrirFormulario,
    cerrarFormulario,
    nuevoOperario,
    handleNuevoOperarioChange,
    centrosFiltrados,
    guardarNuevoOperario,
  };
};
