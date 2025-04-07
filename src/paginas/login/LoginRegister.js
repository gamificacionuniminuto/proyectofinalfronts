
import React, { useState } from 'react';
import './../login/LoginRegister.css'; 
const LoginRegister = () => {
    const [formData, setFormData] = useState({
        // Datos del tutor
        tutorName: '',
        tutorEmail: '',
        // Datos del estudiante
        studentName: '',
        studentLastName: '',
        studentGrade: '',
        // Datos de acceso
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
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
        const newErrors = {};
        
        if (formData.email !== formData.confirmEmail) {
            newErrors.email = "Los emails no coinciden";
        }
        
        if (formData.password !== formData.confirmPassword) {
            newErrors.password = "Las contraseñas no coinciden";
        }
        
        if (!formData.tutorName) {
            newErrors.tutorName = "Este campo es requerido";
        }
        
        // Agrega más validaciones según necesites
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log('Datos enviados:', {
                tutor: {
                    name: formData.tutorName,
                    email: formData.tutorEmail
                },
                student: {
                    name: formData.studentName,
                    lastName: formData.studentLastName,
                    grade: formData.studentGrade
                },
                account: {
                    email: formData.email,
                    password: formData.password
                }
            });
            // Aquí iría tu lógica para enviar los datos al servidor
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
                            name="tutorName"
                            value={formData.tutorName}
                            onChange={handleChange}
                            required
                        />
                        {errors.tutorName && <span className="error">{errors.tutorName}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email del tutor:</label>
                        <input
                            type="email"
                            name="tutorEmail"
                            value={formData.tutorEmail}
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
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellido del niñ@*:</label>
                        <input
                            type="text"
                            name="studentLastName"
                            value={formData.studentLastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
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
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Confirmar Email*:</label>
                        <input
                            type="email"
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                            name="confirmPassword"
                            value={formData.confirmPassword}
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

