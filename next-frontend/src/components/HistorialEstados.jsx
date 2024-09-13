import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

function HistorialEstados({ historialEstados }) {
  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'ACEPTADO':
      case "RECIBIDO":
        return 'border-blue-500';
      case 'EN_PREPARACION':
        return 'border-yellow-500';
      case 'ENTREGADO':
        return 'border-green-500';
      case 'CANCELADO':
      case 'RECHAZADO':
        return 'border-red-500';
      default:
        return 'border-gray-500';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
        case "RECHAZADO":
            return "Rechazado";
        case "CANCELADO":
            return "Cancelado";
        case "EN_PREPARACION":
            return "En preparación";
        case "ACEPTADO":
            return "Aceptado";
        case "RECIBIDO":
            return "Recibido";
        case "ENTREGADO":
            return "Entregado";
        default:
            return "Desconocido";
    }
}


  return (
    <div className="flex items-center space-x-4 mt-6 overflow-x-auto">
      {historialEstados.map((estado, index) => (
        <div key={index} className="flex items-center">
          {/* Caja de estado */}
          <div
            className={`p-4 rounded-md border-2 ${getEstadoColor(
              estado.estado
            )} bg-gray-800 text-white`}
            style={{ minWidth: '150px', textAlign: 'center' }}
          >
            <p className="font-semibold"><b className={getEstadoColor(estado)}>{getEstadoText(estado.estado)}</b></p>
            <p className="text-sm text-gray-300">
              {moment(estado.fechaEstado).format('LLL')}
            </p>
            <p className="text-sm text-gray-300">{estado.userEstado}</p>

            <p className="text-sm text-gray-300 mt-5"><b> Detalle:</b> {estado.detalle}</p>
          </div>
          {/* Flecha entre estados, excepto en el último */}
          {index !== historialEstados.length - 1 && (
            <div className="mx-2 text-white">→</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default HistorialEstados;
