import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './configuracion.css';
import avatar1 from '.././configuracion/avatares/avartar1.png'; 
import avatar3 from '../configuracion/avatares/avatar3.png';
import avatar4 from '../configuracion/avatares/avatar4.png'; 
import avatar5 from '../configuracion/avatares/avatar5.png';
import avatar6 from '../configuracion/avatares/avatar6.png';
import avatar8 from '../configuracion/avatares/avatar8.png';


const Configuracion = () => {
    // Lista de avatares locales
    const avatares = [avatar1, avatar3, avatar4, avatar5, avatar6,  avatar8]; // Reemplaza con tus avatares locales
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        tutorName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        selectedAvatar: avatares[0] // Avatar por defecto
    });
    
    const [errors, setErrors] = useState({
        emailMatch: false,
        passwordMatch: false,
        emailValid: true,
        passwordValid: true
    });
    

  
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {
            emailMatch: formData.email !== formData.confirmEmail,
            passwordMatch: formData.password !== formData.confirmPassword,
            emailValid: formData.email.includes('@') && formData.email.includes('.'),
            passwordValid: formData.password.length >= 8
        };
        
        setErrors(newErrors);
        
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Aquí iría la lógica para guardar los cambios
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } else {
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    const nextAvatar = () => {
        setCurrentAvatarIndex((prevIndex) => 
            prevIndex === avatares.length - 1 ? 0 : prevIndex + 1
        );
        setFormData(prev => ({
            ...prev,
            selectedAvatar: avatares[currentAvatarIndex === avatares.length - 1 ? 0 : currentAvatarIndex + 1]
        }));
    };

    const prevAvatar = () => {
        setCurrentAvatarIndex((prevIndex) => 
            prevIndex === 0 ? avatares.length - 1 : prevIndex - 1
        );
        setFormData(prev => ({
            ...prev,
            selectedAvatar: avatares[currentAvatarIndex === 0 ? avatares.length - 1 : currentAvatarIndex - 1]
        }));
    };
   

    return (
        <div className="configuracion-container">
            <h1 className="configuracion-title">Configuración</h1>
            <h3 className="configuracion-subtitle">Modificar información de la cuenta</h3>
            <p className="configuracion-description">
                Modifica la información de tu cuenta. Recuerda que puedes cambiar tu correo electrónico, contraseña y avatar.
            </p>

            {/* Alertas */}
            {showSuccessAlert && (
                <div className="alert alert-success">
                    ¡Cambios guardados correctamente!
                </div>
            )}
            
            {showErrorAlert && (
                <div className="alert alert-error">
                    Por favor corrige los errores en el formulario.
                </div>
            )}

            <section className="avatar-section">
                <h2 className="section-title">👤 Avatar</h2>
                <div className="avatar-carousel">
                    <button className="carousel-button prev" onClick={prevAvatar}>&lt;</button>
                    
                    <div className="avatar-display">
                        <img 
                            src={formData.selectedAvatar} 
                            alt="Avatar seleccionado" 
                            className="selected-avatar" 
                        />
                        <div className="avatar-preview-container">
                            {avatares.map((avatar, index) => (
                                <img
                                    key={index}
                                    src={avatar}
                                    alt={`Avatar ${index + 1}`}
                                    className={`avatar-preview ${avatar === formData.selectedAvatar ? 'active' : ''}`}
                                    onClick={() => {
                                        setFormData(prev => ({...prev, selectedAvatar: avatar}));
                                        setCurrentAvatarIndex(index);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <button className="carousel-button next" onClick={nextAvatar}>&gt;</button>
                </div>
            </section> 
            
            <form className="configuracion-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Nombre de usuario:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={formData.username}
                        onChange={handleChange}
                        className="form-input" 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="tutorName" className="form-label">Nombre del Tutor:</label>
                    <input 
                        type="text" 
                        id="tutorName" 
                        name="tutorName" 
                        value={formData.tutorName}
                        onChange={handleChange}
                        className="form-input" 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Correo electrónico:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${!errors.emailValid ? 'input-error' : ''}`} 
                    />
                    {!errors.emailValid && (
                        <p className="error-message">
                            Por favor ingresa un correo electrónico válido
                        </p>
                    )}
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmEmail" className="form-label">Confirmar Correo electrónico:</label>
                    <input 
                        type="email" 
                        id="confirmEmail" 
                        name="confirmEmail" 
                        value={formData.confirmEmail}
                        onChange={handleChange}
                        className={`form-input ${errors.emailMatch ? 'input-error' : ''}`} 
                    />
                    {errors.emailMatch && (
                        <p className="error-message">
                            Los correos electrónicos no coinciden
                        </p>
                    )}
                </div>
                
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${!errors.passwordValid ? 'input-error' : ''}`} 
                    />
                    {!errors.passwordValid && (
                        <p className="error-message">
                            La contraseña debe tener al menos 8 caracteres
                        </p>
                    )}
                </div>
                
                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`form-input ${errors.passwordMatch ? 'input-error' : ''}`} 
                    />
                    {errors.passwordMatch && (
                        <p className="error-message">
                            Las contraseñas no coinciden
                        </p>
                    )}
                </div>
                
                <button type="submit" className="submit-button">
                    Guardar cambios
                </button>
            <div className="action-buttons">
 
              <button 
                type="button"
                    onClick={() => {
                   if (window.history.length > 1) {
                  navigate(-1);  // Regresa si hay historial
                 } else {
                    navigate('/');  // Va al inicio si no hay historial
                    }
                 }}
                 className="return-button"
                >
                 Regresar
              </button>
            <button 
                type="button"
                onClick={() => {/* lógica para cerrar cuenta */}}
                className="cancel-button"
              >
                Cerrar cuenta
            </button>
         </div>

            </form>
        </div>
    );
};

export default Configuracion;