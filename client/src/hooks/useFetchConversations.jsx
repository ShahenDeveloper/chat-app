import { useEffect } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"

function useFetchConversations() {
    const { setConversations } = useConversation()

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await fetch('/api/conversations')
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                
                setConversations(data)
            } catch (error) {
                toast.error(error.message)
            }
        }

        fetchConversations()
    }, [setConversations])
}

export default useFetchConversations
