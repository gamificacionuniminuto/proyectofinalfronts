import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './configuracion.css';
import avatar1 from '.././configuracion/avatares/avartar1.png'; 
import avatar3 from '../configuracion/avatares/avatar3.png';
import avatar4 from '../configuracion/avatares/avatar4.png'; 
import avatar5 from '../configuracion/avatares/avatar5.png';
import avatar6 from '../configuracion/avatares/avatar6.png';
import avatar8 from '../configuracion/avatares/avatar8.png';

const Configuracion = () => {
    const avatares = [avatar1, avatar3, avatar4, avatar5, avatar6,  avatar8];
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')) || {};

    const [formData, setFormData] = useState({
        username: user.name || '',
        tutorName: user.parent || '',
        email: user.email || '',
        confirmEmail: user.email || '',
        password: '',
        confirmPassword: '',
        selectedAvatar: user.image || avatares[0]
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const updateUser = async () => {
        try {
            const updatedUser = {
                name: formData.username,
                lastName: '',
                image: formData.selectedAvatar,
                emailparent: formData.email,
                email: formData.email,
                rol: user.rol || 'estudiante',
                isBlocked: user.isBlocked || false
            };

            const response = await axios.put(`http://localhost:3001/api/user/${user.id}`, updatedUser);

            const newUser = { ...user, ...updatedUser };
            localStorage.setItem('user', JSON.stringify(newUser));

            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser();
    };

    const nextAvatar = () => {
        const nextIndex = currentAvatarIndex === avatares.length - 1 ? 0 : currentAvatarIndex + 1;
        setCurrentAvatarIndex(nextIndex);
        setFormData(prev => ({ ...prev, selectedAvatar: avatares[nextIndex] }));
    };

    const prevAvatar = () => {
        const prevIndex = currentAvatarIndex === 0 ? avatares.length - 1 : currentAvatarIndex - 1;
        setCurrentAvatarIndex(prevIndex);
        setFormData(prev => ({ ...prev, selectedAvatar: avatares[prevIndex] }));
    };

    return (
        <div className="configuracion-container">
            <h1 className="configuracion-title">Configuración</h1>
            <h3 className="configuracion-subtitle">Modificar información de la cuenta</h3>
            <p className="configuracion-description">
                Modifica la información de tu cuenta. Recuerda que puedes cambiar tu correo electrónico, contraseña y avatar.
            </p>

            {showSuccessAlert && <div className="alert alert-success">¡Cambios guardados correctamente!</div>}
            {showErrorAlert && <div className="alert alert-error">Por favor corrige los errores en el formulario.</div>}

            <section className="avatar-section">
                <h2 className="section-title">👤 Avatar</h2>
                <div className="avatar-carousel">
                    <button className="carousel-button prev" onClick={prevAvatar}>&lt;</button>
                    <div className="avatar-display">
                        <img src={formData.selectedAvatar} alt="Avatar seleccionado" className="selected-avatar" />
                        <div className="avatar-preview-container">
                            {avatares.map((avatar, index) => (
                                <img
                                    key={index}
                                    src={avatar}
                                    alt={`Avatar ${index + 1}`}
                                    className={`avatar-preview ${avatar === formData.selectedAvatar ? 'active' : ''}`}
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, selectedAvatar: avatar }));
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
                    <input type="text" id="username" name="username" value={formData.username} className="form-input"  />
                </div>

                <div className="form-group">
                    <label htmlFor="tutorName" className="form-label">Nombre del Tutor:</label>
                    <input type="text" id="tutorName" name="tutorName" value={formData.tutorName} className="form-input" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Correo electrónico:</label>
                    <input type="email" id="email" name="email" value={formData.email} className="form-input" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmEmail" className="form-label">Confirmar Correo electrónico:</label>
                    <input type="email" id="confirmEmail" name="confirmEmail" value={formData.confirmEmail} className="form-input" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Contraseña:</label>
                    <input type="password" id="password" name="password" value={formData.password} className="form-input" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} className="form-input" disabled />
                </div>

                <button type="submit" className="submit-button" onClick={updateUser} >Guardar cambios</button>

                <div className="action-buttons">
                    <button type="button" onClick={() => {
                        if (window.history.length > 1) navigate(-1);
                        else navigate('/');
                    }} className="return-button">
                        Regresar
                    </button>
                    <button type="button" onClick={() => {}} className="cancel-button">
                        Cerrar cuenta
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Configuracion;
