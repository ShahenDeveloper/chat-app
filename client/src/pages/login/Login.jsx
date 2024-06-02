import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'

function Login() {
  const [loading, setLoading] = useState(false)
  const { setAuthUser} = useAuthContext()
  const [ inputs, setInputs ] = useState({
    username: "",
    password: ""
  })
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setInputs((prev) => ({
      ...prev,
      [name]:value
    })) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {username, password} = inputs
    if(!username){
      return toast.error("Fill the username filed.")
    }else if(!password){
      return toast.error("Fill the Password filed.")
    }
    try {
      setLoading(true)
      const response = await fetch('/api/auth/login', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username, password})
      })
      const data = await response.json()
      console.log(data)
      if(response.status === 201){
        localStorage.setItem('chat-user', JSON.stringify(data))
        setAuthUser(data)
        toast.success("User Login successfully")
      }else{
        toast.error(data.error || "Failed login try again")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className=' felx flex-col items-center justify-center sm:w-96 w-[98vh] mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className=' text-3xl font-semibold text-center text-gray-300'>Login
            <span className=' text-blue-500 mx-2'>WaveChat</span>
            </h1>

            <form onSubmit={handleSubmit}>
              <div>
                <label className='label p-2'>
                  <span className=' text-base label-text'>Username</span>
                </label>
                <input type="text" placeholder='John' className='w-full input input-bordered h-10' name='username' value={inputs.username} onChange={handleChange} />
              </div>

              <div>
              <label className='label'>
                  <span className=' text-base label-text'>Password</span>
                </label>
                <input type="password" placeholder='1234' className='w-full input input-bordered h-10' name='password' onChange={handleChange}/>
              </div>
              <Link to={'/signup'} className=' text-sm hover:underline hover:text-blue-500 mt-2 inline-block'>Don't have account</Link>
              <div>
                <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : "Login"}</button>
              </div>
            </form>
        </div>
    </div>
  )
}

export default Login
