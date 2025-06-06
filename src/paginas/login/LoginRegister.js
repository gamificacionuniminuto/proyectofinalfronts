
import React, { useState } from 'react';
import './../login/LoginRegister.css';
import Swal from 'sweetalert2';
import axios from 'axios';
const { REACT_APP_API } = process.env;

const LoginRegister = () => {
  const [formData, setFormData] = useState({
    parent: "",
    name: "",
    lastName: "",
    email: "",
    confirmEmail: "",
    emailparent: "",    
    password: "",
    passConfirmation: "",
   
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });
    
    // Limpiar error cuando el usuario corrige
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validación de campos requeridos
    if (!formData.parent.trim()) newErrors.parent = "Nombre del tutor es requerido";
    if (!formData.name.trim()) newErrors.name = "Nombre del niño es requerido";
    if (!formData.lastName.trim()) newErrors.lastName = "Apellido del niño es requerido";
    
    
    // Validación de emails
    if (!formData.email.trim()) {
      newErrors.email = "Email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email no válido";
    }
    
    // if (formData.email !== formData.confirmEmail) {
    //   newErrors.confirmEmail = "Los emails no coinciden";
    // }
    
    // Validación de contraseñas
    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    if (formData.password !== formData.passConfirmation) {
      newErrors.passConfirmation = "Las contraseñas no coinciden";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Entendido'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Mostrar el primer error encontrado
      const firstError = Object.values(errors)[0];
      showErrorAlert(firstError);
      return;
    }
    
    try {
     await axios.post(`${process.env.REACT_APP_API}/api/user`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      Swal.fire({
        title: '¡Éxito!',
        text: 'Usuario creado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      
      // Resetear formulario
      setFormData({
        parent: "",
        name: "",
        lastName: "",
        email: "",
        
        emailparent: "",
        password: "",
        passConfirmation: "",
       
      });
      
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      let errorMessage = "Hubo un error al enviar el formulario";
      
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      showErrorAlert(errorMessage);
    }
  };

  return (
    <div className="login-register-container">
      <h2>Registro de Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Datos del Tutor</legend>
          <div className="form-group">
            <label>Nombre completo del tutor*:</label>
            <input
              type="text"
              name="parent"
              value={formData.parent}
              onChange={handleChange}
            />
            {errors.parent && <span className="error">{errors.parent}</span>}
          </div>
          <div className="form-group">
            <label>Email del tutor:</label>
            <input
              type="email"
              name="emailparent"
              value={formData.emailparent}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Datos del Estudiante</legend>
          <div className="form-group">
            <label>Nombre del niñ@*:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Apellido del niñ@*:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        
        </fieldset>

        <fieldset>
          <legend>Datos de Acceso</legend>
          <div className="form-group">
            <label>Email*:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label>Contraseña*:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label>Confirmar Contraseña*:</label>
            <input
              type="password"
              name="passConfirmation"
              value={formData.passConfirmation}
              onChange={handleChange}
            />
            {errors.passConfirmation && <span className="error">{errors.passConfirmation}</span>}
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">Registrar</button>
      </form>
    </div>
  );
};

export default LoginRegister;



