import React from 'react';

function LoginPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Página de Login</h1>
      {/* Aquí iría tu componente LoginRegister que convertimos antes */}
      <div style={{ border: '1px solid #ccc', padding: '20px', maxWidth: '400px' }}>
        <h3>Formulario de Login</h3>
        <input type="text" placeholder="Usuario" style={{ margin: '10px 0', padding: '8px' }} />
        <input type="password" placeholder="Contraseña" style={{ margin: '10px 0', padding: '8px' }} />
        <button style={{ padding: '8px 15px' }}>Ingresar</button>
      </div>
    </div>
  );
}

export default LoginPage;