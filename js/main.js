const authButton = document.querySelector('.button-auth');
const logoutButton = document.querySelector('.button-out');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.getElementById('logInForm');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');
const userName = document.querySelector('.user-name');
const cardsContainer = document.querySelector('.cards-restaurants');
const restaurantKey = localStorage.getItem('restaurant');

const restaurantTitle = document.querySelector('.restaurant-title');
const menuContainer = document.querySelector('.cards-menu');
const ratingEl = document.querySelector('.rating');
const priceEl = document.querySelector('.price');
const categoryEl = document.querySelector('.category');


const restaurants = [
  {
    image: 'img/pizza-plus/preview.jpg',
    name: 'Піца плюс',
    time: '50 хвилин',
    rating: '4.5',
    price: 'від 200 ₴',
    category: 'Піца',
    link: 'restaurant.html'
  },
  {
    image: 'img/tanuki/preview.jpg',
    name: 'Танукі',
    time: '60 хвилин',
    rating: '4.5',
    price: 'від 1200 ₴',
    category: 'Суші, роли',
    link: 'restaurant.html'
  },
  {
    image: 'img/food-band/preview.jpg',
    name: 'FoodBand',
    time: '40 хвилин',
    rating: '4.5',
    price: 'від 150 ₴',
    category: 'Піца',
    link: 'restaurant.html'
  },
  {
    image: 'img/palki-skalki/preview.jpg',
    name: 'Ikigai',
    time: '55 хвилин',
    rating: '4.5',
    price: 'від 250 ₴',
    category: 'Піца',
    link: 'restaurant.html'
  },
  {
    image: 'img/gusi-lebedi/preview.jpg',
    name: 'Пузата хата',
    time: '75 хвилин',
    rating: '4.5',
    price: 'від 300 ₴',
    category: 'Українські страви',
    link: 'restaurant.html'
  },
  {
    image: 'img/pizza-burger/preview.jpg',
    name: 'PizzaBurger',
    time: '45 хвилин',
    rating: '4.5',
    price: 'від 700 ₴',
    category: 'Піца',
    link: 'restaurant.html'
  }
];

const restaurantsData = {
  'піца-плюс': {
    name: 'Піца Плюс',
    rating: '4.5',
    price: 'від 300 ₴',
    category: 'Піца',
    menu: [
      {
        title: 'Піца Везувій',
        image: 'img/pizza-plus/pizza-vesuvius.jpg',
        ingredients: 'Соус томатний, сир «Моцарелла», шинка, пепероні, перець «Халапіння», соус «Тобаско», томати.',
        price: '545 ₴'
      },
      {
        title: 'Піца BBQ',
        image: 'img/pizza-plus/pizza-girls.jpg',
        ingredients: 'Соус томатний, пісне тісто, нежирний сир, кукурудза, цибуля, маслини, гриби, помідори, болгарський перець',
        price: '150 ₴'
      },
      {
        title: 'Піца Оле-Оле',
        image: 'img/pizza-plus/pizza-oleole.jpg',
        ingredients: 'Соус томатний, сир «Моцарелла», черрі, маслини, зелень, майонез',
        price: '440 ₴'
      },
      {
        title: 'Піца Плюс',
        image: 'img/pizza-plus/pizza-plus.jpg',
        ingredients: 'Соус томатний, сир «Моцарелла», сир «Чеддер», томат, пепероні, телятина, гриби, бекон, болгарський перець.',
        price: '405 ₴'
      },
      {
        title: 'Піца Гавайська',
        image: 'img/pizza-plus/pizza-hawaiian.jpg',
        ingredients: 'Соус томатний, сир «Моцарелла», шинка, ананаси',
        price: '340 ₴'
      },
      {
        title: 'Піца Класика',
        image: 'img/pizza-plus/pizza-classic.jpg',
        ingredients: 'Соус томатний, сир «Моцарелла», сир «Пармезан», шинка, салямі, гриби.',
        price: '310 ₴'
      }
    ]
  }
};
const restaurant = restaurantsData[restaurantKey];


function renderRestaurants(data) {
  if (!cardsContainer) return;

  cardsContainer.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('a');
    card.className = 'card card-restaurant';
    card.href = item.link;

    const restaurantKey = item.name.toLowerCase().replace(/\s+/g, '-');
    card.dataset.restaurant = restaurantKey;

    card.innerHTML = `
      <img src="${item.image}" class="card-image" alt="${item.name}">
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${item.name}</h3>
          <span class="card-tag tag">${item.time}</span>
        </div>
        <div class="card-info">
          <div class="rating">${item.rating}</div>
          <div class="price">${item.price}</div>
          <div class="category">${item.category}</div>
        </div>
      </div>
    `;

    card.addEventListener('click', (event) => {
      const user = localStorage.getItem('user');

      if (!user) {
        event.preventDefault();
        openAuthModal();
        return;
      }

      localStorage.setItem('restaurant', card.dataset.restaurant);
    });

    cardsContainer.append(card);
  });
}


const openAuthModal = () => {
  if (modalAuth) modalAuth.classList.add('is-open');
  window.disableScroll();
};

const closeAuthModal = () => {
  if (modalAuth){
    modalAuth.classList.remove('is-open');
    loginInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
    window.enableScroll();
  }
};

function authorizedUser(username) {
  if (userName) {
    userName.textContent = username;
    userName.style.display = 'inline';
  }
  if (authButton) authButton.style.display = 'none';
  if (logoutButton) logoutButton.style.display = 'flex';
}

function notAuthorizedUser() {
  if (userName) userName.textContent = '';
  if (authButton) authButton.style.display = 'flex';
  if (logoutButton) logoutButton.style.display = 'none';
}

function toggleModalAuth(){
  modalAuth.classList.toggle('is-open');
}

window.disableScroll = function(){
  document.body.dbScrollY = window.scrollY;
  document.body.style.cssText=`
    position: fixed;
    top: ${-window.scrollY}px;
    left: 0;
    width: 100%;
    overflow: hidden;
    heigh: 100vh;
  `;
}

window.enableScroll = function(){
  document.body.style.cssText = '';
  window.scroll({top: document.body.dbScrollY})
}

if (authButton) authButton.addEventListener('click', openAuthModal);
if (closeAuth) closeAuth.addEventListener('click', closeAuthModal);

if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const login = loginInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!login) {
      loginInput.classList.add('input-error');
      loginInput.focus();
      return;
    }

    if (!password){
      passwordInput.classList.add('input-error');
      passwordInput.focus();
      return;
    }

    loginInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');

    localStorage.setItem('user', login);
    authorizedUser(login);
    closeAuthModal();
    loginForm.reset();
  });
}

if (loginInput) {
  loginInput.addEventListener('input', () => {
    loginInput.classList.remove('input-error');
  });
}
if (passwordInput) {
  passwordInput.addEventListener('input', () => {
    passwordInput.classList.remove('input-error');
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('user');
    notAuthorizedUser();
  });
}

if(modalAuth){
  modalAuth.addEventListener('click', function(event){
  if(event.target.classList.contains('is-open')){
    toggleModalAuth();
    loginInput.classList.remove('input-error');
    passwordInput.classList.remove('input-error');
    window.enableScroll();
  }
});
}



const savedUser = localStorage.getItem('user');

if (savedUser) {
  authorizedUser(savedUser);
} else {
  notAuthorizedUser();
}

if (restaurant && restaurantTitle && menuContainer) {

  restaurantTitle.textContent = restaurant.name;
  ratingEl.textContent = restaurant.rating;
  priceEl.textContent = restaurant.price;
  categoryEl.textContent = restaurant.category;

  menuContainer.innerHTML = '';

  restaurant.menu.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${item.image}" class="card-image">
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title card-title-reg">${item.title}</h3>
        </div>
        <div class="card-info">
          <div class="ingredients">${item.ingredients}</div>
        </div>
        <div class="card-buttons">
          <button class="button button-primary button-add-cart">
            У кошик
          </button>
          <strong class="card-price-bold">${item.price}</strong>
        </div>
      </div>
    `;

    menuContainer.append(card);
  });

}


renderRestaurants(restaurants);
