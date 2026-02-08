
import { Perro, Exposicion, Inscripcion, Pago } from '../models/relaciones.js';

const panelControl = async (req, res) => {
    try {
        // En un futuro aquí podrías cargar contadores reales para el dashboard
        // const totalPerros = await Perro.count();
        // const totalInscripciones = await Inscripcion.count();

        res.render('admin/dashboard', {
            pagina: 'Panel de Control',
            // totalPerros,
            // totalInscripciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al cargar el panel de administración');
    }
};

export {
    panelControl
};
