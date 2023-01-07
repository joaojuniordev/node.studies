/**
 * @WEBSOCKET DEFAULT CONFIG
*/

module.exports = {
    SOCKETIO: {
        CORS: {
            origin: ["localhost:3000"],
            // "Access-Control-Allow-Origin": "*",
            methods: ["GET", "POST"],
            // allowedHeaders: ["my-custom-header"],
            credentials: true
        },
        SERVER: {
            url: "http://localhost",
            port: 8080
        }
    }
}