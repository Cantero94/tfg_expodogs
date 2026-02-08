
export const restringirIP = (req, res, next) => {
    // Obtener la IP del cliente (con soporte para proxys si trust proxy está activado)
    let ipCliente = req.ip || req.connection.remoteAddress || '';

    // Algunos entornos devuelven la IP con prefijo IPv6 ::ffff:
    if (ipCliente.substr(0, 7) == "::ffff:") {
        ipCliente = ipCliente.substr(7);
    }

    // Obtener IPs permitidas desde .env (formato CSV: "127.0.0.1,::1")
    const ipsPermitidas = (process.env.ALLOWED_IPS || '127.0.0.1,::1').split(',');
    const rangoPermitido = process.env.ALLOWED_IP_RANGE || '100.'; // Por defecto Tailscale

    // Comprobar si la IP está en la lista blanca o dentro del rango permitido
    if (ipsPermitidas.includes(ipCliente) || ipCliente.startsWith(rangoPermitido)) {
        return next();
    }

    console.log(`⛔ Acceso denegado al panel admin desde IP: ${ipCliente}`);
    return res.status(403).send('<h1>Error 403</h1><p>Acceso restringido a la red de administración 👎.</p>');
};
