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

  // Función para mandar a imprimir replicando el formato de la imagen (Cruz Roja / Formato Oficial)
  const manejarImpresion = (certificado) => {
    const ventanaImpresion = window.open('', '_blank');
    
    // Asignación de variables con valores por defecto para prevención de nulos
    const folio = certificado.folio || 'PUEATL-000';
    const tipoCertificado = certificado.tipo ? `CERTIFICADO MÉDICO ${certificado.tipo.toUpperCase()}` : 'CERTIFICADO MÉDICO';
    const medicoNombre = certificado.medico_nombre || 'DRA. GILDA MARQUEZ ZUBIETA';
    const medicoCedula = certificado.medico_cedula || '5291113';
    const pacienteNombre = certificado.nombre_paciente || 'CRISTIAN EMILIANO CERVERA LUNA';
    
    const fechaNac = certificado.fecha_nacimiento || '18-05-2014';
    const edad = certificado.edad || '12 años';
    const sexo = certificado.sexo || 'MASCULINO';
    const curp = certificado.curp || 'CELC140518HPLRNRA7';

    const peso = certificado.peso ? `${certificado.peso} kg` : 'N/A';
    const talla = certificado.talla ? `${certificado.talla} m` : 'N/A';
    const imc = certificado.imc || 'N/A';
    const ta = certificado.ta ? `${certificado.ta} mm Hg` : 'N/A';
    const satO2 = certificado.sat_o2 ? `${certificado.sat_o2} SpO2` : 'N/A';
    const fc = certificado.fc ? `${certificado.fc} lat/min` : 'N/A';
    const fr = certificado.fr ? `${certificado.fr} rpm` : 'N/A';
    const temp = certificado.temperatura ? `${certificado.temperatura} °C` : 'N/A';
    const sangre = certificado.san || 'O+';

    const patologias = certificado.patologias || 'INTERROGADO Y NEGADO.';
    const alergias = certificado.alergias || 'INTERROGADO Y NEGADO.';
    const toxicomanias = certificado.toxicomanias || 'INTERROGADO Y NEGADO.';
    const otras = certificado.otras || 'NO SE CORROBORA GRUPO SANGUINEO Y RH.';
    const recomendaciones = certificado.recomendaciones || 'BAÑO DIARIO. ACTIVIDAD FISICA DE 150 A 175 MINUTOS POR SEMANA. APTO FÍSICAMENTE RECOMENDACIONES: PARA EL DESEMPEÑO DE SUS ACTIVIDADES FÍSICAS, PROFESIONALES O DEPORTIVAS.';
    const estadoPaciente = certificado.estado_paciente || 'SANO';
    const aptitudFisica = certificado.fisicas || 'APTO';
    const fechaLugar = certificado.lugar_fecha || `ATLIXCO, PUE. A ${new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}`;

    ventanaImpresion.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificado CRM - ${folio}</title>
          <style>
            @page {
              size: letter;
              margin: 15mm;
            }
            body { 
              font-family: Arial, Helvetica, sans-serif; 
              color: #000;
              margin: 0;
              padding: 0;
              font-size: 11px;
              line-height: 1.3;
            }
            .header-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 15px;
            }
            .logo-cross {
              color: #D32F2F;
              font-size: 38px;
              font-weight: bold;
              line-height: 1;
            }
            .header-title {
              font-size: 13px;
              font-weight: bold;
              color: #000;
              text-transform: uppercase;
            }
            .header-sub {
              font-size: 9px;
              color: #333;
              font-weight: bold;
            }
            .folio-text {
              color: #D32F2F;
              font-size: 14px;
              font-weight: bold;
              text-align: right;
            }
            .doc-title {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              margin: 15px 0 20px 0;
              letter-spacing: 0.5px;
            }
            .certifica-text {
              text-align: center;
              font-size: 13px;
              font-weight: bold;
              margin: 15px 0;
              letter-spacing: 1px;
            }
            .patient-box {
              text-align: center;
              font-size: 18px;
              font-weight: bold;
              margin: 15px 0;
              text-transform: uppercase;
            }
            .divider-red {
              border-top: 1.5px solid #D32F2F;
              margin: 8px 0;
            }
            .patient-info-row {
              display: flex;
              justify-content: space-around;
              font-size: 10px;
              font-weight: bold;
              margin-bottom: 15px;
            }
            .section-header {
              text-align: center;
              font-weight: bold;
              font-size: 11px;
              margin: 12px 0 8px 0;
            }
            .vitals-table {
              width: 100%;
              max-width: 650px;
              margin: 0 auto 15px auto;
              border-collapse: collapse;
              font-size: 10px;
            }
            .vitals-table td {
              padding: 4px 6px;
              vertical-align: top;
            }
            .vitals-table td.label {
              font-weight: bold;
              width: 15%;
            }
            .vitals-table td.value {
              width: 18%;
            }
            .history-table {
              width: 100%;
              border-collapse: collapse;
              font-size: 10px;
              margin-bottom: 20px;
            }
            .history-table td {
              padding: 4px 0;
              vertical-align: top;
            }
            .history-table td.label {
              font-weight: bold;
              width: 22%;
            }
            .history-table td.value {
              width: 78%;
              text-align: justify;
            }
            .conclusion-text {
              text-align: center;
              font-size: 10px;
              margin: 20px 0 30px 0;
              line-height: 1.4;
            }
            .location-date {
              font-weight: bold;
              font-size: 10px;
              margin-top: 30px;
            }
            .watermark-container {
              position: fixed;
              bottom: 40px;
              left: 0;
              right: 0;
              display: flex;
              justify-content: center;
              pointer-events: none;
              opacity: 0.15;
              z-index: -1;
            }
            .watermark-heart {
              width: 180px;
              height: 180px;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>

          <!-- ENCABEZADO -->
          <table className="header-table">
            <tr>
              <td style="width: 50px; vertical-align: top;">
                <div className="logo-cross">+</div>
              </td>
              <td style="vertical-align: top;">
                <div className="header-title">Cruz Roja Mexicana</div>
                <div className="header-sub">DELEGACIÓN ATLIXCO, PUEBLA</div>
              </td>
              <td style="vertical-align: top;" className="folio-text">
                FOLIO: ${folio}
              </td>
            </tr>
          </table>

          <!-- TÍTULO -->
          <div className="doc-title">${tipoCertificado}</div>

          <!-- PÁRRAFO INICIAL -->
          <p style="margin: 0 0 4px 0;">A quien corresponda:</p>
          <p style="margin: 0 0 12px 0;">
            El que suscribe <strong>${medicoNombre}</strong> con cedula profesional <strong>${medicoCedula}</strong><br/>
            Legálmente autorizado por la Dirección General de Profesiones para ejercer
          </p>

          <div className="certifica-text">CERTIFICA</div>

          <p style="margin: 0 0 8px 0;">Que se ha practicado examen médico a:</p>

          <!-- NOMBRE DEL PACIENTE -->
          <div className="patient-box">${pacienteNombre}</div>

          <div className="divider-red"></div>

          <!-- DATOS PACIENTE -->
          <div className="patient-info-row">
            <div><strong>Fecha de nacimiento:</strong> ${fechaNac}</div>
            <div><strong>Edad:</strong> ${edad}</div>
            <div><strong>Sexo:</strong> ${sexo}</div>
            <div><strong>Curp:</strong> ${curp}</div>
          </div>

          <!-- SIGNOS VITALES -->
          <div className="section-header">SIGNOS VITALES</div>
          
          <table className="vitals-table">
            <tr>
              <td className="label">Peso:</td>
              <td className="value">${peso}</td>
              <td className="label">Talla:</td>
              <td className="value">${talla}</td>
              <td className="label">IMC:</td>
              <td className="value">${imc}</td>
            </tr>
            <tr>
              <td className="label">T.A.:</td>
              <td className="value">${ta}</td>
              <td className="label">Sat. O₂:</td>
              <td className="value">${satO2}</td>
              <td className="label">F.C.:</td>
              <td className="value">${fc}</td>
            </tr>
            <tr>
              <td className="label">F.R.:</td>
              <td className="value">${fr}</td>
              <td className="label">T°:</td>
              <td className="value">${temp}</td>
              <td className="label" style="line-height:1.1;">Tipo de Sangre:</td>
              <td className="value">${sangre}</td>
            </tr>
          </table>

          <!-- ANTECEDENTES -->
          <div className="section-header">ANTECEDENTES</div>

          <table className="history-table">
            <tr>
              <td className="label">PATOLOGÍAS:</td>
              <td className="value">${patologias}</td>
            </tr>
            <tr>
              <td className="label">ALERGIAS:</td>
              <td className="value">${alergias}</td>
            </tr>
            <tr>
              <td className="label">TOXICOMANÍAS:</td>
              <td className="value">${toxicomanias}</td>
            </tr>
            <tr>
              <td className="label">OTRAS:</td>
              <td className="value">${otras}</td>
            </tr>
            <tr>
              <td className="label" style="padding-top: 8px;">RECOMENDACIONES:</td>
              <td className="value" style="padding-top: 8px;">${recomendaciones}</td>
            </tr>
          </table>

          <!-- CONCLUSIÓN -->
          <div className="conclusion-text">
            Encontrándose clínicamente: <strong>${estadoPaciente}</strong> . <strong>${aptitudFisica}</strong> físicamente para el desempeño de sus actividades físicas, profesionales o deportivas.<br/>
            Se extiende el presente para los fines que al interesado convenga.
          </div>

          <!-- LUGAR Y FECHA -->
          <div className="location-date">
            ${fechaLugar}
          </div>

          <!-- MARCA DE AGUA INFERIOR -->
          <div className="watermark-container">
            <svg className="watermark-heart" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              <path d="M12 7v6"/>
              <path d="M9 10h6"/>
            </svg>
          </div>

          <script>
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

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial, sans-serif', color: '#64748b' }}>
        Cargando certificados...
      </div>
    );
  }

  return (
    <div className="form-card-wrapper" style={{ width: '100%', maxWidth: '1000px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <style>{`
        .form-card {
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .form-header {
          background: #1E293B;
          color: #ffffff;
          padding: 18px 24px;
        }
        .form-title {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
        }
        .modern-body {
          padding: 24px;
        }
        .section-title {
          font-size: 15px;
          font-weight: 700;
          color: #DC2626;
          border-bottom: 2px solid #FEE2E2;
          padding-bottom: 6px;
          margin-bottom: 16px;
          margin-top: 0;
        }
        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }
        .custom-table th {
          background-color: #F8FAFC;
          color: #334155;
          font-weight: 700;
          padding: 12px 14px;
          border-bottom: 2px solid #CBD5E1;
        }
        .custom-table td {
          padding: 12px 14px;
          border-bottom: 1px solid #E2E8F0;
          color: #334155;
        }
        .custom-table tbody tr:hover {
          background-color: #F1F5F9;
        }
        .badge-folio {
          background-color: #FEE2E2;
          color: #DC2626;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 700;
          font-size: 12px;
        }
        .badge-type {
          background-color: #E0F2FE;
          color: #0369A1;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 12px;
        }
        .btn-primary {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: background-color 0.2s;
        }
        .btn-primary:hover {
          background-color: #218838;
        }
        .empty-alert {
          background-color: #F0F7FF;
          border: 1px dashed #B6D4FE;
          color: #004085;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
          font-size: 14px;
        }
        .table-responsive {
          overflow-x: auto;
        }
      `}</style>

      <div className="form-card">
        <div className="form-header">
          <div className="form-title">Historial e Impresión de Certificados</div>
        </div>

        <div className="modern-body">
          <h4 className="section-title">Certificados Emitidos</h4>

          {certificados.length === 0 ? (
            <div className="empty-alert">
              No hay certificados registrados aún en el sistema.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Paciente</th>
                    <th>Tipo de Certificado</th>
                    <th>Escuela / Institución</th>
                    <th>Fecha Emisión</th>
                    <th style={{ textAlign: 'center' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {certificados.map((cert, index) => (
                    <tr key={cert.id || index}>
                      <td>
                        <span className="badge-folio">#{cert.folio}</span>
                      </td>
                      <td>
                        <strong>{cert.nombre_paciente || 'Paciente'}</strong>
                      </td>
                      <td>
                        <span className="badge-type">{cert.tipo}</span>
                      </td>
                      <td>
                        {cert.escuela || 'N/A'} {cert.escolaridad ? `(${cert.escolaridad})` : ''}
                      </td>
                      <td>{cert.fecha}</td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          onClick={() => manejarImpresion(cert)} 
                          className="btn-primary"
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
      </div>
    </div>
  );
};

export default ImprimirCertificados;