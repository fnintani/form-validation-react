import '../styling/form.css';
import { useState } from "react"
import * as Validator from 'validatorjs';


function Form() {
   const [formData, setFormData] = useState(
        {
            nama: "",
            alamat: "",
            email: "",
            password: "",  
            errors: []
        }
    )

	function handleChange(event) {
   		// console.log(event)
       const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
      })
	}

	function handleSubmit(event) {
        event.preventDefault()
       	const {nama, alamat, email, password} = formData

       	let data = {nama, alamat, email, password}

       	let rules = {
          nama: 'min:3|required',
          alamat: 'min:10|required',
       		email: 'required|email',
       		password: 'min:8|required'
       	};

       	let validation = new Validator(data, rules);
       	validation.passes();

       	setFormData(prevFormData => {
            return {
                ...prevFormData,
                errors: [
                  ...validation.errors.get('nama'),
                  ...validation.errors.get('alamat'),
                	...validation.errors.get('email'),
                	...validation.errors.get('password')
                ]
            }
      })
    }

   const errorMsg = formData.errors
   const showError = errorMsg.map((item, i) => (
        <p className="error-msg" key={i}>{item}</p>       
    ))

    // console.log(formData)

  return (
    <div className="form-container">
      <h3 className="title-form">Registration</h3>
       {formData.errors.length !== 0 && <div className="error-container">{showError}</div>}
      <form className="form-control" onSubmit={handleSubmit}>
      	<input 
        type="text" 
        name="nama" 
        className="nama"
        value={formData.nama}
        placeholder="nama"
        onChange={handleChange}
      />
      <input 
        type="text" 
        name="alamat" 
        className="alamat"
        value={formData.alamat}
        placeholder="alamat"
        onChange={handleChange}
      />
        <input 
	      type="email" 
	      name="email" 
	      className="email"
	      value={formData.email}
	      placeholder="email"
	      onChange={handleChange}
	    />
	    <input 
	      type="password" 
	      name="password" 
	      className="password"
	      value={formData.password}
	      placeholder="password"
	      onChange={handleChange}
	    />
      	<button className="submitBtn">Submit</button>
      </form>
    </div>
  );
}

export default Form;