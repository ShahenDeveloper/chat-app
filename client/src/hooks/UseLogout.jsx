import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/AuthContext'

function UseLogout() {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const logout = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/auth/logout', {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()
      if(res.ok){
        toast.success(data.message)
      }
      if (data.error) {
        toast.error(data.error)
        throw new Error(data.error)
      }
      localStorage.removeItem('chat-user')
      setAuthUser(null)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { loading, logout }
}

export default UseLogout
