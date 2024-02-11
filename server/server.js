const express = require("express")
const app = express();
const userRoutes = require('./routes/userRoutes')
const rooms = ['general', 'Mern', 'Java', 'Coaching'];

const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
// const Mssages = require('./models/Message');
const Message = require("./models/Message");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/users', userRoutes)
require("./connection")
const server = require("http").createServer(app)
const PORT = 5001;
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})
async function getLastMessagesFromRoom(room) {
    let roomMessages = await Message.aggregate([
        { $match: { to: room } },
        { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } }
    ])

    return roomMessages;
}

function sortRoomMessagesByDate(messages) {
    return messages.sort(function (a, b) {
        // Check if _id is defined and not null for both messages
        if (a._id && b._id) {
            let date1 = a._id.split('/');
            let date2 = b._id.split('/');

            // Ensure the date components are zero-padded for correct comparison.
            date1 = date1[2] + '/' + date1[0].padStart(2, '0') + '/' + date1[1].padStart(2, '0');
            date2 = date2[2] + '/' + date2[0].padStart(2, '0') + '/' + date2[1].padStart(2, '0');

            return date1 < date2 ? -1 : 1;
        } else {
            // Handle cases where _id is null or undefined
            return 0; // No comparison can be made; consider the elements equal.
        }
    });
}


io.on('connection', (socket) => {
    try {
        socket.on('new-user', async () => {
            const members = await User.find({});

            io.emit('new-user', members);
        })
        socket.on('join-room', async (newRoom,previousRoom) => {
            socket.join(newRoom);
            socket.leave(previousRoom);
            let roomMessages = await getLastMessagesFromRoom(newRoom);
            roomMessages = sortRoomMessagesByDate(roomMessages);
            socket.emit('room-messages', roomMessages)
        })
    } catch (err) {
        console.log("error here", err)
    }
    socket.on('message-room', async (room, content, sender, time, date) => {
        // console.log("new message", content)
        const newMessage = await Message.create({ content, from: sender, time, date, to: room });
        let roomMessages = await getLastMessagesFromRoom(room);
        roomMessages = sortRoomMessagesByDate(roomMessages);
        //sending message to room
        io.to(room).emit('room-messages', roomMessages);

        socket.broadcast.emit('notifications', room);
    })
    app.delete("/logout",async(req,res)=>{
        try{
            const{_id,newMessages} =req.body;
            const user = await User.findById(_id);
            user.status = 'offline';
            user.newMessages = newMessages;
            await user.save();
            const members = await User.find();
            socket.broadcast.emit("new-user",members);
            res.status(200).send();
        }catch(error){
            console.log(error);
            res.status(400).send();
        }
    })
})
app.get('/rooms', (req, res) => {
    res.json(rooms)
})


server.listen(PORT, () => {
    console.log(`the server is runing on port  ${PORT}`)
})