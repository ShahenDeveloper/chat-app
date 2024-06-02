import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../Context/AuthContext'

function UseSignUp() {
  const [loading, setLoading] = useState(false)

  const { setAuthUser} = useAuthContext()
  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = handleInputError({ fullName, username, password, confirmPassword, gender })
    if (!success) return

    try {
      setLoading(true)
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('chat-user', JSON.stringify(data))
        setAuthUser(data)
        toast.success("Account created successfully")
      } else {
        toast.error(data.error || 'Signup failed try again')
      }
      console.log(data)
    } catch (error) {
      toast.error(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return { loading, signup }
}

export default UseSignUp

function handleInputError({ fullName, username, password, confirmPassword, gender }) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields")
    return false
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match.')
    return false
  }
  if (password.length < 8) {
    toast.error('Password must be 8 characters long.')
    return false
  }
  return true
}
