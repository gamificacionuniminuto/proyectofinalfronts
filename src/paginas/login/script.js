

document.getElementById('select-avatar-btn').addEventListener('click', function() {
    document.getElementById('avatar-modal').style.display = 'block';
});

document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('avatar-modal').style.display = 'none';
});

document.querySelectorAll('.avatar-img').forEach(function(img) {
    img.addEventListener('click', function() {
        document.getElementById('selected-avatar').style.display = 'block';
        document.getElementById('selected-avatar').innerText = 'Avatar seleccionado: ' + img.alt;
        document.getElementById('avatar-modal').style.display = 'none';
    });
});

document.getElementById('register-form').addEventListener('input', function() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const warning = document.getElementById('password-warning');
    if (password !== confirmPassword) {
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
    }
});

document.querySelector('.google-btn').addEventListener('click', function() {
    alert('Iniciar sesión con Google no está implementado en esta plantilla.');
});
