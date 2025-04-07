
import React, { useState } from 'react';
import './../login/LoginRegister.css'; 
import Swal from 'sweetalert2';
import axios from 'axios';
const LoginRegister = () => {
    const [formData, setFormData] = useState({
        parent: "",
    name: "",
    lastName: "",
    email: "",
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
    };

    const validateForm = () => {
        // const newErrors = {};
        
        // if (formData.email !== formData.confirmEmail) {
        //     newErrors.email = "Los emails no coinciden";
        // }
        
        // if (formData.password !== formData.confirmPassword) {
        //     newErrors.password = "Las contraseñas no coinciden";
        // }
        
        // if (!formData.tutorName) {
        //     newErrors.tutorName = "Este campo es requerido";
        // }
        
        // // Agrega más validaciones según necesites
        
        // setErrors(newErrors);
        // return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.passConfirmation) {
          alert("Las contraseñas no coinciden");
          return;
        }
    
        try {
          
          const formDataToSend = new FormData();
          for (const key in formData) {
            formDataToSend.append(key, formData[key]);
          }
    
          const response = await axios.post("http://localhost:3001/api/user", formDataToSend, {
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
          setFormData({
            parent: "",
            name: "",
            lastName: "",
            email: "",
            emailparent: "",
            image: null,
            password:"" ,
            passConfirmation: "",
          });
        } catch (error) {
          console.error("Error al enviar el formulario", error);
          alert("Hubo un error al enviar el formulario");
        }
      
    
      const handleAvatarSelect = (avatar) => {
       
      };
    }

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
                            required
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
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellido del niñ@*:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>Grado académico*:</label>
                        <select
                            name="studentGrade"
                            value={formData.studentGrade}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un grado</option>
                            <option value="Transicion">Transicion</option>
                            <option value="1° Primaria">1° Primaria</option>
                            <option value="2° Primaria">2° Primaria</option>
                            <option value="3° Primaria">3° Primaria</option>
                            <option value="4° Primaria">4° Primaria</option>
                            <option value="5° Primaria">5° Primaria</option>
                           
                        </select>
                    </div> */}
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
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    {/* <div className="form-group">
                        <label>Confirmar Email*:</label>
                        <input
                            type="email"
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                            required
                        />
                    </div> */}
                    <div className="form-group">
                        <label>Contraseña*:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
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
                            required
                        />
                    </div>
                </fieldset>

                <button type="submit" className="submit-btn">Registrar</button>
            </form>
        </div>
    );
};

export default LoginRegister;

