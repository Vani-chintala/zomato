
import { useState } from "react"
import { getLoggedIn } from "./utilities"
import validate from './validator'


const Login = (props) => {

  // state which stores the username and password
  const [formdata, setFormData] = useState({
    email: 'youremail@domain.com',
    password: ''
  })

   // save the status
  const [message, setMessage] = useState('')


  //handle the change
  const handleChange = ce => {
    //make a copy of the data
    const copy_state = { ...formdata }
    // manipulate the copy
    copy_state[ce.target.id] = ce.target.value
    // update the actual formdata using the copy
    setFormData(copy_state)
  }


  //login  fse = formsubmitevent
  const login = async fse => {
    //prevent the default action
    fse.preventDefault()
    
    // validate your login info
    const { validationStatus, validationMessage } = validate(formdata)

    //only if validation passes only then do the login
    if (validationStatus) {
      try {
        // only then do the login
        //fetch : API => http:localhost:8888/user/login
        const response = await fetch('http://localhost:8888/user/login', {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify(formdata)
        })
        const data = await response.json()
        //success msg
        setMessage('You have successfully  logged in!')
        //login action
        getLoggedIn(data.firstname)
      } catch (error) {
        console.log(error)
        setMessage('Sorry! something went wrong!')
      }
    } else {
      alert(validationMessage)
    }
  }


  return (
    <form onSubmit={login}>
      <div className="mb-3">
        <label for="email" className="form-label">Email address</label>
        <input type="email"
          className="form-control"
          id="email"
          value={formdata.email}
          onChange={handleChange}
          placeholder="Enter your email id"
          aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label for="password" className="form-label">Password</label>
        <input type="password"
          className="form-control"
          value={formdata.password}
          onChange={handleChange}
          placeholder="Enter your password"
          id="password" />
      </div>
      <i>{message}</i> <br/>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  )
}

export default Login;