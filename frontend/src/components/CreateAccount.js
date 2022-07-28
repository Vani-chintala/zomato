
import { useState } from "react"
import validate from './validator'


const CreateAccount = (props) => {

  const [formdata, setFormData] = useState({
    firstname: 'tom',
    lastname: 'jerry',
    email: 'youremail@domain.com',
    password: ''
  })

 // message to state
  const [message,setMessage] = useState('')

  // onChange event to allow ppl to change those values
  //handle the change
  const handleChange = ce => {
    //make a copy of the data
    const copy_state = { ...formdata }
    // manipulate the copy
    copy_state[ce.target.id] = ce.target.value//state.field = value{field = ln,fn,email,pawd}
    // update the actual formdata using the copy
    console.log(copy_state)
    setFormData(copy_state)
  }


  //signup
  const signup = async fse=> {
    //prevent the default action
    fse.preventDefault() // using this to avoid the split sec beh of 
    //reading the data from state-->step-1
    console.log(formdata)
    // validate your signup info-->step-2
    const { validationStatus, validationMessage } = validate(formdata)// takes formdata gives status,message

    //only if validation passes only then do the signup
    if (validationStatus) {
      try {
        // only then do the signup
        //fetch : API => http:localhost:8888/user/register
        const response = await fetch('http://localhost:8888/user/register', {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify(formdata)
        })
        const data = await response.json()
        console.log(data)
        //success msg
        setMessage('You have successfully signed up and you may now proceed to login!')
      } catch (error) {
        console.log(error)
        setMessage('Sorry! something went wrong!')
      }
    } else {
      alert(validationMessage)
    }
  }



  return (
    <form onSubmit={signup}>

      <div className="mb-3">
        <label for="firstname" className="form-label">First Name</label>
        <input type="text"
          className="form-control"
          value={formdata.firstname}
          onChange={handleChange}
          id="firstname"
          placeholder="Enter your first name" />
      </div>

      <div className="mb-3">
        <label for="lastname" className="form-label">Last Name</label>
        <input type="text"
          className="form-control"
          value={formdata.lastname}
          onChange={handleChange}
          id="lastname"
          placeholder="Enter your first name" />
      </div>


      <div className="mb-3">
        <label for="email" className="form-label">Email address</label>
        <input type="email"
          className="form-control"
          value={formdata.email}
          onChange={handleChange}
          id="email"
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
      <i>{message}</i>
      <button type="submit" className="btn btn-primary">Signup</button>
    </form>
  )
}

export default CreateAccount;