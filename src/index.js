const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
localStorage.setItem('next_fetch', API);

const getData = api => {
  return fetch(api)
    .then(response => response.json())
}   
//Consulta Api
const loadData = async () => {
  const urlApi = localStorage.getItem('next_fetch')
  try {
    const response = await getData(urlApi)
    const characters = response.results;
    localStorage.setItem('next_fetch', response.info.next);
    if(response.info.next != ""){
      let output = characters.map(character => {
        return `
            <article class="Card">
              <img src="${character.image}" />
              <h2>${character.name}<span>${character.species}</span></h2>
            </article>
          `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    }else {
      let textMessage = document.createElement('h1');
      textMessage.classList.add('Items');
      textMessage.innerHTML ='Ya no hay personajes...';
      $app.appendChild(textMessage);
      $observe.parentNode.removeChild('observe');
    }

  } catch (error) {
    console.log(error)
  }
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

window.unload = function(e) {
  localStorage.clear
};
