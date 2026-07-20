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
        
        if (respuesta && Array.isArray(respuesta.data)) {
          setCertificados(respuesta.data);
        } else {
          console.warn("PHP no devolvió un array. Esto fue lo que llegó:", respuesta.data);
          setCertificados([]);
        }
      } catch (error) {
        console.error("Error al obtener los certificados:", error);
        setCertificados([]);
      } finally {
        setCargando(false);
      }
    };
    cargarCertificados();
  }, []);

  // Función para mandar a imprimir el formato real basado en tu BD
  const manejarImpresion = (certificado) => {
    const ventanaImpresion = window.open('', '_blank');
    ventanaImpresion.document.write(`
      <html>
        <head>
          <title>Certificado Médico - Folio ${certificado.folio}</title>
          <style>
            body { 
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
              padding: 50px; 
              color: #333;
              line-height: 1.8; 
            }
            .header { 
              text-align: center; 
              border-bottom: 3px double #0d6efd; 
              padding-bottom: 20px;
              margin-bottom: 40px; 
            }
            .titulo { font-size: 26px; font-weight: bold; color: #0d6efd; text-transform: uppercase; letter-spacing: 1px; }
            .subtitulo { font-size: 14px; color: #666; margin-top: 5px; }
            .folio-fecha { display: flex; justify-content: space-between; margin-bottom: 40px; font-size: 16px; font-weight: bold; }
            .contenido { font-size: 18px; text-align: justify; text-indent: 30px; }
            .detalles { margin-top: 30px; background: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 5px solid #0d6efd; }
            .firmas { margin-top: 120px; text-align: center; }
            .linea-firma { width: 250px; margin: 0 auto; border-top: 1px solid #333; margin-bottom: 10px; }
            @media print {
              body { padding: 20px; }
              .detalles { background: #f8f9fa !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="titulo">Certificado Médico Oficial</div>
            <div class="subtitulo">Servicios Médicos Profesionales - Grupo Grajales</div>
          </div>
          
          <div class="folio-fecha">
            <div>FOLIO: <span style="color: #dc3545;">#${certificado.folio}</span></div>
            <div>Fecha de Emisión: ${certificado.fecha || 'N/A'}</div>
          </div>

          <div class="contenido">
            <p>Por medio de la presente se hace constar de manera oficial que el (la) paciente 
            <strong>${certificado.nombre_paciente || 'N/A'}</strong> ha sido sometido(a) a una valoración médica completa 
            cumpliendo con los estándares correspondientes al tipo de certificado: <strong>${certificado.tipo || 'General'}</strong>.</p>
          </div>

          <div class="detalles">
            <strong>Información Institucional registrada:</strong><br/>
            • <strong>Escuela / Institución:</strong> ${certificado.escuela || 'No especificada'}<br/>
            • <strong>Nivel de Escolaridad:</strong> ${certificado.escolaridad || 'No especificado'}<br/>
            • <strong>Fecha de Registro en Sistema:</strong> ${certificado.fecha_creacion || 'N/A'}
          </div>

          <div class="contenido" style="margin-top: 30px;">
            <p>Se extiende la presente para los fines legales, institucionales o personales que al interesado convengan.</p>
          </div>
          
          <div class="firmas">
            <div class="linea-firma"></div>
            <strong>Firma y Sello del Médico Evaluador</strong><br/>
            <span style="font-size: 14px; color: #666;">Cédula Profesional e Institucional</span>
          </div>

          <script>
            // Espera a que cargue el diseño y abre la ventana de impresión/guardar PDF automáticamente
            setTimeout(() => { 
              window.print(); 
              window.close(); 
            }, 500);
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
                <th>Folio</th>
                <th>Paciente</th>
                <th>Tipo de Certificado</th>
                <th>Escuela / Institución</th>
                <th>Fecha Emisión</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {certificados.map((cert, index) => (
                <tr key={cert.id || index}>
                  <td><span className="badge bg-secondary">#{cert.folio}</span></td>
                  <td><strong>{cert.nombre_paciente || 'Paciente'}</strong></td>
                  <td><span className="badge bg-info text-dark">{cert.tipo}</span></td>
                  <td>{cert.escuela || 'N/A'} ({cert.escolaridad})</td>
                  <td>{cert.fecha}</td>
                  <td className="text-center">
                    <button 
                      onClick={() => manejarImpresion(cert)} 
                      className="btn btn-primary btn-sm px-3 shadow-sm"
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