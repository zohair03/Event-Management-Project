import React,{useState} from 'react'

const SignUpPage = () => {

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')



  return (
    <div>
      <form onSubmit={handleSubmit}>

        <input type="text" value={name} onChange={handleChange} name='name'/>
        <input type="text" value={email} onChange={handleChange} name='email'/>
        <input type="text" value={password} onChange={handleChange} name='password'/>

        <button type='Submit'>
          Sign Up
        </button>


      </form>
    </div>
  )
}

export default SignUpPage