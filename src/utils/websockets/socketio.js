const { Server } = require('socket.io')

// DEFAULT CONF:
const { SOCKETIO:{ CORS, SERVER } } = require('../../constants/ws')


module.exports = (conf={}) => {

    const cors   = { ...CORS, ...conf?.cors }
    const server = { ...SERVER, ...conf?.server }
    console.log('UTILS::websockets: socketio -> ', true, { 'cors.oring':cors?.origin, 'server.port':server.port })
    
    // SERVER SOCKETIO:
    const io = new Server(server.port,{ cors })

    return { io }
}