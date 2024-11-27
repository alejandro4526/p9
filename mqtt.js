// Conexión MQTT utilizando WebSocket seguro (wss://)
const client = mqtt.connect('wss://n1781645.ala.us-east-1.emqxsl.com:8084/mqtt', {
    username: 'cochabamba',  // Si necesitas un usuario para autenticarte
    password: 'bolivia',  // Si necesitas una contraseña
    rejectUnauthorized: false   // Evita errores de certificado (solo en entornos de prueba)
});

client.on('connect', function () {
    console.log('Conectado al broker MQTT');
});

client.on('error', function (err) {
    console.error('Error de conexión:', err);
});

client.on('message', function (topic, message) {
    console.log('Mensaje recibido:', topic, message.toString());
});

// Función para encender o apagar el LED mediante MQTT
function toggleLED() {
    let message = 'on';  // O 'off' para apagar el LED
    if (client.connected) {
        client.publish('test/led1', message, { qos: 2, retain: true }, function (error) {
            if (error) {
                console.error('Error al enviar el mensaje:', error);
            } else {
                console.log('Mensaje enviado correctamente');
            }
        });
    } else {
        console.log('Cliente MQTT no está conectado');
    }
}
