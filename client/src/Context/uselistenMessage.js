// import { useEffect } from "react"
// import userConversation from "../zustand/useConversation"
// import { useSocketContext } from "./SocketContext"

// function uselistenMessage() {
//     const { socket } = useSocketContext()
//     const {messages, setMessages }= userConversation()

//     useEffect(() => {
//         socket?.on("newMessage", (newMessage) => {
//             setMessages({...messages, newMessage})
//         })
//         return () => socket.off("newMessage")
//     },[socket, setMessages, messages])
// }

// export default uselistenMessage

import { useEffect } from "react"
import userConversation from "../zustand/useConversation"
import { useSocketContext } from "./SocketContext"
import notificationSound from '../assets/sound/notification.mp3'
function uselistenMessage() {
    const { socket } = useSocketContext()
    const { messages, setMessages } = userConversation()

    useEffect(() => {
        const handleMessage = (newMessage) => {
            const sound = new Audio(notificationSound)
            sound.play()
            setMessages([...messages, newMessage])
        }

        socket?.on("newMessage", handleMessage)

        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
}

export default uselistenMessage
