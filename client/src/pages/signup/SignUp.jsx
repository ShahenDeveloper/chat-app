import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import UseSignUp from '../../hooks/UseSignUp'

function SignUp() {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const { loading, signup } = UseSignUp()
  const handleCheckboxChange = (gender) => {
    setInput({...input, gender})
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(input)
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>SignUp
          <span className='text-blue-500 mx-2'>WaveChat</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10' name='fullName' value={input.fullName} onChange={handleChange} />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type="text" placeholder='johndoe' className='w-full input input-bordered h-10' name='username' value={input.username} onChange={handleChange} />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10' name='password' value={input.password} onChange={handleChange} />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input type="password" placeholder='Confirm password' className='w-full input input-bordered h-10' name='confirmPassword' value={input.confirmPassword} onChange={handleChange} />
          </div>

          <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={input.gender}/>

          <Link to={'/login'} className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block'>Already have an account</Link>

          <div>
            <button className='btn btn-block btn-sm mt-3 border border-slate-700' disabled={loading}>{loading ? <span className='spinner loading loading-sm'></span> : "Sign Up"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
