
//validate is not a component it is fn so it don't return jsx
//validate email and password
const validate = ({ email, password }) => {
    // keeeping 2 fields to track validation status,validationMessage
    let validationStatus = true
    let validationMessage = ''


    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // validate the email
    if (!emailRegex.test(email)) {
        //if the validation is failing
        validationStatus = false
        validationMessage = 'Your email is not in correct format'
    }
    // validate the password to be of atleast 8chars
    if (password.length<7) {
        //if the validation is failing
        validationStatus = false
        validationMessage += 'Your password needs to be atleast 8 characters long!'
    }
    return {validationStatus, validationMessage }
}

export default validate;