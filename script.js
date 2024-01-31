const API = 'https://api.github.com/users/';

const userName = document.querySelector("#userName");
const button = document.querySelector("#buttonSearch");
const form = document.querySelector('.form');
const cardWrapper = document.querySelector('.card-wrapper');

async function controller(name){
    try {
        const request = await fetch(`${API}${name}`);
        const data = await request.json();
        return data;
    }
    catch(err) {
        console.log(err);
    }
}

async function getUserData(name){
    try {
        const data = await controller(name);
        data.message && data.message.toLowerCase() === 'not found' ? alert('User not found. Please enter a valid GitHub username.') : renderUser(data);
    }
    catch(err) {
        console.log(err);
    }
}

function renderUser(user){
    cardWrapper.innerHTML = `
        <ul>
        <li><img src="${user.avatar_url}" alt="User Avatar" class="avatar"></li>
        <li><h2>${user.login}</h2></li>
        <li><p>${user.bio || 'No bio available'}</p></li>
        <li><p>Location: ${user.location || 'Not specified'}</p></li>
        <li><p>Followers: ${user.followers}</p></li>
        </ul>
    `;
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    const userNameValue = userName.value;
    getUserData(userNameValue);
})