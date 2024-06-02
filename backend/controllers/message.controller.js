import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js"


export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })
        
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
            shouldShake: true
        })

        if(newMessage){
            conversation.message.push(newMessage._id)
        }
        // await newMessage.save()
        // conversation.message.push(newMessage._id)
        // await conversation.save()

        //this is more faster
        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage)

        //socket io code
        const receiverShocketId = getReceiverSocketId(receiverId)   
        if(receiverShocketId){
            //io.to(<socket._id>).emit() used to send events to specific client or user
            io.to(receiverShocketId).emit("newMessage", newMessage)
        }
      
    } catch (error) {
        console.log('ERROR in sendMessage controller', error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getMessages = async ( req, res ) => {
    try {
        const {id: userToChatId} = req.params
        const senderId = req.user._id

        const conversations = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]}
        }).populate("message") //not reference but actual messages

        if(!conversations){
            return res.status(200).json([])
        }

        const messages = conversations.message

        res.status(200).json(messages)
    } catch (error) {
        console.log('ERROR in getMessages controller', error)
        res.status(500).json({ error: "Internal server error" })
    }
} 

