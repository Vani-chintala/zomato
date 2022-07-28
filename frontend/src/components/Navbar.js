
import './Navbar.css'
import Modal from './Modal'
import Login from './Login'
import CreateAccount from './CreateAccount'
import {getLoggedOut} from './utilities'




const Navbar = (props) => {

  
    // get the loggedin user from local storage
    const activeUser = localStorage.getItem('loggedInUsername')
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: '#eb2929' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <label className="elogo">e!</label>
        </a>
        <button className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {
            activeUser
          ?
          <>
          <span className="text-light">Hello {activeUser}</span> &nbsp;
          <button className="btn btn-outline-light" onClick ={getLoggedOut}>Logout</button>
          </>
          :
          <>
             <ul className="navbar-nav me-auto mb-2 mb-lg-0"> 
             <li className="nav-item"> 
              <button type="button" className="btn btn-outline-light" 
                data-bs-toggle="modal"
                     data-bs-target="#mdllogin" >Login</button>
              </li>  
              &nbsp;
               <li className="nav-item"> 
                <button  type="button" className="btn btn-outline-light" 
                data-bs-toggle="modal"
                data-bs-target="#mdlcreateacc">Create Account</button>
               </li> 
              </ul> 
            
            </>
            }  
              <Modal modalid="mdllogin" modaltitle="Login">
        <Login />
      </Modal>
      <Modal modalid="mdlcreateacc" modaltitle="Create Account">
        <CreateAccount/>
      </Modal>

        </div>
      </div>
      
    </nav>


  )
}

export default Navbar