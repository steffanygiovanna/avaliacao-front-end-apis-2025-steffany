const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';
const DUMMYJSON_API_URL = 'https://dummyjson.com';

const logoutBtn = document.getElementById('logoutBtn');
const searchInput = document.getElementById('searchInput');
const postsContainer = document.getElementById('postsContainer');
const loadingMessage = document.getElementById('loadingMessage');
const postModal = document.getElementById('postModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close');

let allPosts = [];
let filteredPosts = [];


document.addEventListener('DOMContentLoaded', function() {
    checkAuthentication();
    setupEventListeners();
    loadPosts();
});

function checkAuthentication() {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      
        window.location.href = 'login.html';
        return;
    }
    
    
    validateToken(token);
}


async function validateToken(token) {
    try {
        const response = await fetch(`${DUMMYJSON_API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
           
            await refreshAccessToken();
        }
    } catch (error) {
        console.error('Erro ao validar token:', error);
        logout();
    }
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
        logout();
        return;
    }

    try {
        const response = await fetch(`${DUMMYJSON_API_URL}/auth/refresh`, {
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
        } else {
     
            logout();
        }
    } catch (error) {
        console.error('Erro ao renovar token:', error);
        logout();
    }
}


function setupEventListeners() {
 
    logoutBtn.addEventListener('click', logout);
  
    searchInput.addEventListener('input', handleSearch);
 
    closeModal.addEventListener('click', closePostModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === postModal) {
            closePostModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && postModal.classList.contains('show')) {
            closePostModal();
        }
    });
}

function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    
   
    window.location.href = 'login.html';
}


async function loadPosts() {
    try {
        showLoadingMessage(true);
        
        const response = await fetch(POSTS_API_URL);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar posts');
        }
        
        const posts = await response.json();
        allPosts = posts;
        filteredPosts = posts;
        
        displayPosts(filteredPosts);
        
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        showErrorMessage('Erro ao carregar posts. Tente novamente mais tarde.');
    } finally {
        showLoadingMessage(false);
    }
}


function displayPosts(posts) {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        showNoPostsMessage();
        return;
    }
    
    posts.forEach(post => {
        const postCard = createPostCard(post);
        postsContainer.appendChild(postCard);
    });
}

function createPostCard(post) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.setAttribute('data-post-id', post.id);
    
    postCard.innerHTML = `
        <h3>${capitalizeTitle(post.title)}</h3>
        <div class="post-id">Post #${post.id}</div>
    `;
   
    postCard.addEventListener('click', () => openPostModal(post));
    
    return postCard;
}

function capitalizeTitle(title) {
    return title.charAt(0).toUpperCase() + title.slice(1);
}


function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredPosts = allPosts;
    } else {
        filteredPosts = allPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm)
        );
    }
    
    displayPosts(filteredPosts);
}


function openPostModal(post) {
    modalTitle.textContent = capitalizeTitle(post.title);
    modalBody.textContent = capitalizeFirstLetter(post.body);
    
    postModal.classList.add('show');
    document.body.style.overflow = 'hidden'; 
}

function closePostModal() {
    postModal.classList.remove('show');
    document.body.style.overflow = 'auto'; 
}


function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}


function showLoadingMessage(show) {
    if (show) {
        loadingMessage.style.display = 'block';
        postsContainer.style.display = 'none';
    } else {
        loadingMessage.style.display = 'none';
        postsContainer.style.display = 'grid';
    }
}


function showErrorMessage(message) {
    postsContainer.innerHTML = `
        <div class="no-posts">
            <h3>Ops! Algo deu errado</h3>
            <p>${message}</p>
            <button onclick="loadPosts()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
                Tentar Novamente
            </button>
        </div>
    `;
}


function showNoPostsMessage() {
    const searchTerm = searchInput.value.trim();
    const message = searchTerm 
        ? `Nenhum post encontrado para "${searchTerm}"`
        : 'Nenhum post disponível';
    
    postsContainer.innerHTML = `
        <div class="no-posts">
            <h3>Nenhum post encontrado</h3>
            <p>${message}</p>
        </div>
    `;
}


async function getPostDetails(postId) {
    try {
        const response = await fetch(`${POSTS_API_URL}/${postId}`);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar detalhes do post');
        }
        
        const post = await response.json();
        return post;
        
    } catch (error) {
        console.error('Erro ao carregar detalhes do post:', error);
        return null;
    }
}


function debugPosts() {
    console.log('Total de posts:', allPosts.length);
    console.log('Posts filtrados:', filteredPosts.length);
    console.log('Termo de busca:', searchInput.value);
}


function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


function addLoadingAnimation() {
    const cards = document.querySelectorAll('.post-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'slideUp 0.6s ease-out forwards';
    });
}

let searchTimeout;
function debouncedSearch(event) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        handleSearch(event);
    }, 300);
}

searchInput.removeEventListener('input', handleSearch);
searchInput.addEventListener('input', debouncedSearch);