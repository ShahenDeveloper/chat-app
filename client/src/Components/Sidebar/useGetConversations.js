import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function useGetConversations() {
    const [ loading, setLoading ]= useState(false)
    const [ conversations, setConversations ] = useState([])
  useEffect(() => {
    const getConversations = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/users')
            const data = await res.json()
            if(res.status === 200){
              setConversations(data)
            }
            if(data.error){
              toast.error(data.error)
                throw new Error(data.error)
            }
        } catch (error) {
          console.log(error)
         toast.error(error.message)   
        }finally{
          setLoading(false)
        }
    }
    
    getConversations()
  },[])
  return {loading, conversations}
}

export default useGetConversations
