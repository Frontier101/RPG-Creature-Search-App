// DOM variables
const searchInput = document.getElementById('search-input');
const searchbtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form');
const dataElts = document.querySelectorAll('.data');
const baseElts = document.querySelectorAll('.base');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const creatureWeight = document.getElementById('weight');
const creatureHeight = document.getElementById('height');
const specialName = document.getElementById('sp-name');
const specialDescription = document.getElementById('sp-description');
const creatureHp = document.getElementById('hp');
const creatureAttack = document.getElementById('attack');
const creatureDefense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const creatureSpeed = document.getElementById('speed');

const apiLink = 'https://rpg-creature-api.freecodecamp.rocks/api/creature/';

// removing the default behavior when submitting a form
searchForm.addEventListener('submit', e => e.preventDefault());
// search button click event
searchbtn.addEventListener('click', async ()=>{
  if(searchInput.value === '') return;
  try{
    const stat = await fetch(apiLink + searchInput.value)
    .then(res => res.json());
    
    console.log(stat);

    baseElts.forEach(base => base.style.display = "block");

    creatureName.textContent = stat.name;
    creatureId.textContent = '#'+stat.id;
    creatureWeight.textContent = 'Weight: '+stat.weight;
    creatureHeight.textContent = 'Height: '+stat.height;
    specialName.textContent = stat.special.name+": ";
    specialDescription.textContent = stat.special.description;
    creatureHp.textContent = stat.stats[0].base_stat;
    creatureAttack.textContent = stat.stats[1].base_stat;
    creatureDefense.textContent = stat.stats[2].base_stat;
    specialAttack.textContent = stat.stats[3].base_stat;
    specialDefense.textContent = stat.stats[4].base_stat;
    creatureSpeed.textContent = stat.stats[5].base_stat;
    if('types' in stat) {
      const creatureTypes = document.getElementById('types');
      creatureTypes.innerHTML = '';
      stat.types.forEach(type => 
        creatureTypes.innerHTML += `<div class="type ${type.name}">${type.name.toUpperCase()}</div>`);
    } 
  }catch{
    alert("Creature not found");
    dataElts.forEach(elt => elt.textContent = '');
    baseElts.forEach(base => base.style.display = "none");
  }
});
