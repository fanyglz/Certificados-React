import React, { useEffect, useState } from 'react';
import { obtenerCertificados } from '../services/certificadoService';

export const ImprimirCertificados = () => {
  const [certificados, setCertificados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar los certificados al abrir la pantalla
  useEffect(() => {
    const cargarCertificados = async () => {
      try {
        const respuesta = await obtenerCertificados();
        // Ajusta según cómo devuelva los datos tu PHP (usualmente respuesta.data)
        setCertificados(respuesta.data || []); 
      } catch (error) {
        console.error("Error al obtener los certificados:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarCertificados();
  }, []);

  // Función mágica para mandar a imprimir la ventana actual
  const manejarImpresion = (certificado) => {
    // Creamos una ventana temporal limpia solo con el formato del certificado
    const ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.write(`
      <html>
        <head>
          <title>Certificado Médico - ${certificado.nombre_paciente || 'Paciente'}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            .CONTEO { text-align: center; margin-bottom: 50px; }
            .titulo { font-size: 24px; font-weight: bold; text-transform: uppercase; }
            .contenido { margin-top: 30px; font-size: 18px; text-align: justify; }
            .firmas { margin-top: 100px; text-align: center; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="CONTEO">
            <div class="titulo">Certificado Médico Oficial</div>
          </div>
          <div class="contenido">
            <p>Por la presente se certifica que el paciente <strong>${certificado.nombre_paciente || 'N/A'}</strong> ha sido evaluado clínicamente.</p>
            <p><strong>Diagnóstico:</strong> ${certificado.diagnostico}</p>
            <p>Se sugieren <strong>${certificado.dias_reposo || certificado.diasReposo} días de reposo</strong>, comenzando desde el día <strong>${certificado.fecha_inicio || certificado.fechaInicio}</strong> hasta el día <strong>${certificado.fecha_fin || certificado.fechaFin}</strong>.</p>
            <p><strong>Observaciones adicionales:</strong> ${certificado.observaciones || 'Ninguna.'}</p>
          </div>
          <div class="firmas">
            <br/><br/>
            ___________________________<br/>
            Firma y Sello Médico
          </div>
          <script>
            setTimeout(() => { window.print(); window.close(); }, 500);
          </script>
        </body>
      </html>
    `);
    ventanaImpresion.document.close();
  };

  if (cargando) return <div className="text-center p-4 text-dark">Cargando certificados...</div>;

  return (
    <div className="card shadow-sm p-4 bg-white text-dark">
      <h2 className="mb-4 text-primary border-bottom pb-2">Historial e Impresión de Certificados</h2>
      
      {certificados.length === 0 ? (
        <div className="alert alert-info">No hay certificados registrados aún.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>Paciente</th>
                <th>Diagnóstico</th>
                <th>Días de Reposo</th>
                <th>Vigencia</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {certificados.map((cert, index) => (
                <tr key={cert.id || index}>
                  <td><strong>{cert.nombre_paciente || 'Paciente Prueba'}</strong></td>
                  <td>{cert.diagnostico}</td>
                  <td>{cert.dias_reposo || cert.diasReposo} días</td>
                  <td>{cert.fecha_inicio || cert.fechaInicio} al {cert.fecha_fin || cert.fechaFin}</td>
                  <td className="text-center">
                    <button 
                      onClick={() => manejarImpresion(cert)} 
                      className="btn btn-primary btn-sm px-3"
                    >
                      🖨️ Imprimir PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ImprimirCertificados;