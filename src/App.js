import { useState, useEffect } from "react";

function App() {
  const initialValues = { username: "", email: "", password: "" };//diaplay on the data form  ui
  const [formValues, setFormValues] = useState(initialValues);//store the values
  const [formErrors, setFormErrors] = useState({});//any errors display
  const [isSubmit, setIsSubmit] = useState(false);// in case errors false i will update true

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });//passing one handler as funtion inside the input inside as funtion [name]-key
    // console.log(formValues)
  };

  const handleSubmit = (e) => {  //passing from as the form level
    e.preventDefault();//overridding the data 
    setFormErrors(validate(formValues));//anyerrors validate the function and pass the true
    setIsSubmit(true);//true upate thing
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) { //object the key  setting the stricty typed has checkiin 
     console.log(formValues);
    }
  }, [formErrors]);//store display errors
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } 
    else if (!regex.test(values.email)) { //not taking the @ throw error
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } 
    else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } 
    else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? ( // setting the display succefully
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 1)}</pre>//to print the one by one 
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
      
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
        
          <p>{formErrors.username}</p>
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          
          <p>{formErrors.email}</p>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        
      </form>
    </div>
  );
}

export default App;