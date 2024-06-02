import { useState } from "react"
import userConversation from "../zustand/useConversation"
import { toast } from 'react-hot-toast'
function useSendMessage() {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation} = userConversation()

const sendMessage = async (message) => {
    setLoading(true)
    try {
        const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ message })
        })

        const data = await res.json()
        if (data.error) {
            throw new Error(data.error)
        }
        // Re-fetch messages to ensure state consistency
        await getMessage() 
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
}

const getMessage = async () => {
    setLoading(true)
    try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`)
        const data = await res.json()
        if (data.error) throw Error(data.error)

        setMessages(data)
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
}


    return {sendMessage, loading}
}

export default useSendMessage
