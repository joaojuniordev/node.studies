const socketio = require('../../utils/websockets/socketio')
const { lookup } = require('geoip-lite')

const visitorMW = require('../../utils/middlewares/visitor.mw')

const messages = [{ skt:'' ,id:'0', name:'Bot', text:"Bem-vindo", date:new Date().toLocaleString() }]


module.exports = async (app) => {
    const {
        constants:{ SOCKET:{ CHAT } }
    } = app
    // console.log('Events::chat-> ', true)
    
    // VARS:
    const conf = {
        cors:{
            origin:[CHAT?.FRONT.URL,"localhost:3000"],
        },
        server:{
            url: CHAT?.BACK.URL,
            port: CHAT?.BACK.PORT
        }
    }

    const [ registerVisitorMW ] = visitorMW(app)

    // SOCKET.IO:
    const { io } = socketio(conf)

    
    // CONNECTION:
    io.on('connection', (socket) => {
        const { headers, address } = socket.handshake
        const reqSKT = { ip:headers?.['x-real-ip'], headers, socket:{ address } }
        console.log('Events::Chat: [SOCKET] connected.', [socket.id, headers?.['x-forwarded-for'], lookup(headers?.['x-real-ip'])])
        
        // SET SOCKET ID:
        if(messages.length===1){ 
            messages[0].skt = socket.id 
            // registerVisitorMW(reqSKT, {}, ()=>{})
        }
        
        // INITIAL MESSAGE:
        // socket.to("news").emit("hello")
        socket.emit('chat.socketId', socket.id)
        socket.emit('previousMessages',messages)

        // RESPONSE MSG:
        socket.on('chat.message', (data) => {
            console.log('Msg:', { skt:socket.id, ...data })
            messages.unshift({ skt:socket.id, ...data })

            socket.emit('chat.message', { skt:socket.id, ...data })         // response: o proprio user
            socket.broadcast.emit('chat.message',{ skt:socket.id, ...data })// response: outros user
        })

        // DISCONNECT:
        socket.on('disconnect', (data) => {
            console.log('Events::Chat: [SOCKET] Disconnect => A connection was disconnected:', data)
        })
    })

    return true
}