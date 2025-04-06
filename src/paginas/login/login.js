import React, { useState } from 'react';
import './../../paginas/login/LoginRegister.css'; // Asegúrate de crear este archivo CSS
import axios from 'axios';
import Swal from 'sweetalert2';

export default function InscriptionForm() {
  const [formData, setFormData] = useState({
    parent: "",
    name: "",
    lastName: "",
    email: "",
    emailparent: "",    
    password: "",
    passConfirmation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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
   

      {/* Formulario de Registro */}
      <div className="form-container">
        <h2>Registro de Nuevo Usuario</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="parent"
             placeholder="Nombre de tutor"
            value={formData.parent}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange }
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellido"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {/* <input
            type="number"
            name="age"
            placeholder="Edad"
            value={registerData.age}
            onChange={handleRegisterChange}
            required
          /> */}
          <input
            type="email"
            name="emailparent"
            placeholder="Email acudiente"
            value={formData.emailparent}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="passConfirmation"
            placeholder="Confirmar Contraseña"
            value={formData.passConfirmation}
            onChange={handleChange}
            required
          />
        <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}



