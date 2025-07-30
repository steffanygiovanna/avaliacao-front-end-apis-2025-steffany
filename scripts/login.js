const API_BASE_URL = 'https://dummyjson.com';
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const errorMessage = document.getElementById('errorMessage');


document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
});


function checkAuthStatus() {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (token && refreshToken) {
        
        validateToken(token);
    }
}


async function validateToken(token) {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {

            window.location.href = 'posts.html';
        } else {
            
            await refreshAccessToken();
        }
    } catch (error) {
        console.error('Erro ao validar token:', error);
        clearAuthData();
    }
}


async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
        clearAuthData();
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                refreshToken: refreshToken
            })
        });

        if (response.ok) {
            const data = await response.json();
            
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userData', JSON.stringify(data));
            
         
            window.location.href = 'posts.html';
        } else {

            clearAuthData();
        }
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        clearAuthData();
    }
}

function clearAuthData() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
}

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) {
        showError('Por favor, preencha todos os campos.');
        return;
    }
    
    await performLogin(username, password);
});

async function performLogin(username, password) {
    try {
        setLoadingState(true);
        hideError();
        
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('accessToken', data.token);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('userData', JSON.stringify(data));

            window.location.href = 'posts.html';
        } else {

            showError(data.message || 'Credenciais inválidas. Tente novamente.');
        }
    } catch (error) {
        console.error('Erro no login:', error);
        showError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
        setLoadingState(false);
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    
    setTimeout(() => {
        hideError();
    }, 5000);
}


function hideError() {
    errorMessage.classList.remove('show');
}

function setLoadingState(loading) {
    loginBtn.disabled = loading;
    loginBtn.textContent = loading ? 'Entrando...' : 'Entrar';
    
    if (loading) {
        loginBtn.classList.add('loading');
    } else {
        loginBtn.classList.remove('loading');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    
    const loginCard = document.querySelector('.login-card');
    const testCredentials = document.createElement('div');
    testCredentials.innerHTML = ``
    loginCard.appendChild(testCredentials);
    
    usernameInput.value = 'emilys';
    passwordInput.value = 'emilyspass';
});

function debugAuth() {
    console.log('Access Token:', localStorage.getItem('accessToken'));
    console.log('Refresh Token:', localStorage.getItem('refreshToken'));
    console.log('User Data:', localStorage.getItem('userData'));
}