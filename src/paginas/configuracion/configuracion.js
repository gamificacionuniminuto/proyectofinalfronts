import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './configuracion.css';
import avatar1 from '.././configuracion/avatares/avartar1.png'; 
import avatar3 from '../configuracion/avatares/avatar3.png';
import avatar4 from '../configuracion/avatares/avatar4.png'; 
import avatar5 from '../configuracion/avatares/avatar5.png';
import avatar6 from '../configuracion/avatares/avatar6.png';
import avatar8 from '../configuracion/avatares/avatar8.png';

const Configuracion = () => {
    const avatares = [avatar1, avatar3, avatar4, avatar5, avatar6, avatar8];
    const navigate = useNavigate();
    
    // Estado inicial con valores por defecto
    const [formData, setFormData] = useState({
        username: '',
        tutorName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        selectedAvatar: avatares[0]
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
    const [editMode, setEditMode] = useState(false);
    const [originalData, setOriginalData] = useState(null);

    // Cargar datos del localStorage al montar el componente
    useEffect(() => {
        const savedUserData = localStorage.getItem('user');
        if (savedUserData) {
            const userData = JSON.parse(savedUserData);
            
            // Encontrar el índice del avatar guardado
            const savedAvatarIndex = avatares.findIndex(
                avatar => avatar === userData.selectedAvatar
            );
            
            // Actualizar el estado con los datos del localStorage
            const newFormData = {
                username: userData.name || '',
                tutorName: userData.parent || '',
                email: userData.email || '',
                confirmEmail: userData.email || '',
                password: userData.password || '',
                confirmPassword: userData.password || '',
                selectedAvatar: userData.selectedAvatar || avatares[0]
            };
            
            setFormData(newFormData);
            setOriginalData(newFormData);
            setCurrentAvatarIndex(savedAvatarIndex !== -1 ? savedAvatarIndex : 0);
        }
    }, []);

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
            // Guardar en localStorage
            const dataToSave = {
                name: formData.username,
                parent: formData.tutorName,
                email: formData.email,
                password: formData.password,
                selectedAvatar: formData.selectedAvatar
            };
            
            localStorage.setItem('user', JSON.stringify(dataToSave));
            setOriginalData(formData);
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);
            setEditMode(false);
        } else {
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    const toggleEditMode = () => {
        if (editMode) {
            // Si estamos cancelando la edición, restaurar los valores originales
            setFormData(originalData);
            setErrors({
                emailMatch: false,
                passwordMatch: false,
                emailValid: true,
                passwordValid: true
            });
        }
        setEditMode(!editMode);
    };

    const nextAvatar = () => {
        const newIndex = currentAvatarIndex === avatares.length - 1 ? 0 : currentAvatarIndex + 1;
        setCurrentAvatarIndex(newIndex);
        setFormData(prev => ({
            ...prev,
            selectedAvatar: avatares[newIndex]
        }));
    };

    const prevAvatar = () => {
        const newIndex = currentAvatarIndex === 0 ? avatares.length - 1 : currentAvatarIndex - 1;
        setCurrentAvatarIndex(newIndex);
        setFormData(prev => ({
            ...prev,
            selectedAvatar: avatares[newIndex]
        }));
    };

    const handleCloseAccount = () => {
        if(window.confirm('¿Estás seguro que deseas cerrar tu cuenta? Esta acción no se puede deshacer.')) {
            localStorage.removeItem('user');
            navigate('/login');
        }
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
                        placeholder="Ingresa tu nombre de usuario"
                        disabled={!editMode}
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
                        placeholder="Ingresa el nombre del tutor"
                        disabled={!editMode}
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
                        placeholder="ejemplo@correo.com"
                        disabled={!editMode}
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
                        placeholder="Confirma tu correo electrónico"
                        disabled={!editMode}
                    />
                    {errors.emailMatch && (
                        <p className="error-message">
                            Los correos electrónicos no coinciden
                        </p>
                    )}
                </div>
                
              
                <div className="form-actions">
                    {!editMode ? (
                        <button 
                            type="button"
                            onClick={toggleEditMode}
                            className="submit-button"
                        >
                            Editar información
                        </button>
                    ) : (
                        <>
                            <button type="submit" className="submit-button">
                                Guardar cambios
                            </button>
                            <button 
                                type="button"
                                onClick={toggleEditMode}
                                className="cancel-button"
                            >
                                Cancelar
                            </button>
                        </>
                    )}
                    
                    <div className="secondary-actions">
                        <button 
                            type="button"
                            onClick={() => navigate(-1)}
                            className="return-button"
                        >
                            Regresar
                        </button>
                        <button 
                            type="button"
                            onClick={handleCloseAccount}
                            className="cancel-button"
                        >
                            Cerrar cuenta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Configuracion;