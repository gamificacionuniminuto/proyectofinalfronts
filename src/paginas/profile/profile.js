import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import './profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState('actividades');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (localUser) {
      setUserData({
        tutor: {
          name: localUser.parent || 'Tutor',
          email: localUser.emailparent || 'tutor@email.com',
          avatar: '👩'
        },
        student: {
          name: localUser.name,
          lastName: localUser.lastName,
          grade: "3° Primaria",
          avatar: '🧒',
          points: 120,
          level: 5,
          achievements: ['Matemático Novato']
        },
        lastAccess: new Date().toLocaleDateString(),
        activities: [
          { name: "Matemáticas - Sumas", date: "05/06/2025", completed: true }
        ]
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(true);
    navigate('/home');
  };

  const completeActivity = (index) => {
    const updatedUserData = { ...userData };
    updatedUserData.activities[index].completed = true;
    updatedUserData.student.points += 10;
    setUserData(updatedUserData);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  if (!userData) return <div>Cargando perfil...</div>;

  return (
    <div className="main-container">
      <div className="background.imagen"></div>
        <div className="kids-profile-container">
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

      <header className="kids-profile-header">
        
        <div className="header-content">
          <div className="avatar-container">
            <div className="student-avatar">{userData.student.avatar}</div>
            <div className="welcome-message">
              <h1>¡Hola, {userData.student.name}! <span className="welcome-emoji">👋</span></h1>
              <p>Nivel {userData.student.level} • ⭐ {userData.student.points} puntos</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">Salir</button>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(userData.student.points % 100)}%` }}></div>
        </div>
      </header>

      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'actividades' ? 'active' : ''}`}
          onClick={() => setActiveTab('actividades')}
        >
          🎯 Mis Actividades
        </button>
        <button
          className={`tab-btn ${activeTab === 'logros' ? 'active' : ''}`}
          onClick={() => setActiveTab('logros')}
        >
          🏆 Mis Logros
        </button>
        <button
          className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          ℹ️ Información
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'actividades' && (
          <section className="activities-section">
            <h2 className="section-title">📅 Actividades Recientes</h2>
            <div className="activities-list">
              {userData.activities.map((activity, index) => (
                <div key={index} className={`activity-card ${activity.completed ? 'completed' : ''}`}>
                  <div className="activity-icon">
                    {activity.completed ? '✅' : '📝'}
                  </div>
                  <div className="activity-info">
                    <h3>{activity.name}</h3>
                    <p>{activity.date}</p>
                  </div>
                  {!activity.completed && (
                    <button
                      className="complete-btn"
                      onClick={() => completeActivity(index)}
                    >
                      Completar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'logros' && (
          <section className="achievements-section">
            <h2 className="section-title">🏆 Mis Logros</h2>
            <div className="badges-container">
              {userData.student.achievements.map((achievement, index) => (
                <div key={index} className="badge">
                  <div className="badge-icon">⭐</div>
                  <p>{achievement}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'info' && (
          <section className="info-section">
            <div className="info-card kid-info">
              <h2>👦 Sobre Mí</h2>
              <p><strong>Nombre:</strong> {userData.student.name} {userData.student.lastName}</p>
              <p><strong>Grado:</strong> {userData.student.grade}</p>
            </div>

            <div className="info-card tutor-info">
              <h2>👩 Mi Tutor</h2>
              <p><strong>Nombre:</strong> {userData.tutor.name}</p>
              <p><strong>Email:</strong> {userData.tutor.email}</p>
            </div>

            <div className="info-card last-access-Configuracion">
              <h2>🔑 Último Acceso</h2>
              <p>{userData.lastAccess}</p>
              <button className="config-btn" onClick={() => navigate('/configuracion')}>Configuración</button>
            </div>
          </section>
        )}

        <section className="quick-actions">
          <h2 className="section-title">🚀 Acciones Rápidas</h2>
          <div className="actions-grid">
            <button className="action-btn" onClick={() => navigate('/clases')}>
              <i className="icon">📚</i>
              <span>Clases</span>
            </button>
            <button className="action-btn" onClick={() => navigate('/juegos')}>
              <i className="icon">🎮</i>
              <span>Juegos</span>
            </button>
            <button className="action-btn" onClick={() => navigate('/material')}>
              <i className="icon">📁</i>
              <span>Material</span>
            </button>
       
          </div>
        </section>
        <div className="bubble" style={{ top: '19%', left: '30%', width: '80px', height: '80px' }} />
        <div className="bubble" style={{ top: '40%', left: '70%', width: '100px', height: '100px' }} />
        <div className="bubble" style={{ top: '60%', left: '30%', width: '60px', height: '60px' }} />
        <div className="bubble" style={{ top: '75%', left: '80%', width: '50px', height: '50px' }} />
        <div className="bubble" style={{ top: '15%', left: '10%', width: '70px', height: '70px' }} />
        <div className="bubble" style={{ top: '5%', left: '50%', width: '90px', height: '90px' }} />
          <div className="bubble" style={{ top: '20%', left: '50%', width: '120px', height: '120px' }} />

      </div>
    </div>
   </div> 
  );
};

export default Profile;