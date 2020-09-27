export function handle(err) {
    const {status} = err.response;
    switch (status) {          
        case 401:
            return {
                title: 'Error de autenticación',
                message: 'Por favor ingrese a OriginMaster para continuar.',
                code: status
            }
        case 404:
            return {
                title: 'Error 404',
                message: 'El recurso solicitado no fue encontrado.',
                code: status
            }

        case 422:
            return {
                title: 'Error de validación',
                message: 'La información ingresada no es válida',
                code: status
            }

        case 500:
            return {
                title: '¡Ups, esto no debió pasar!',
                message: 'Ocurrio un error desconocido en la plataforma y nuestro equipo está trabando para solucionarlo. Por favor, intente nuevamente más tarde.',
                code: status
            }
    
        default:
            break;
    }
}