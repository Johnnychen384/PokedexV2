// selectors ------------------------>
const theSearchBar = document.getElementById('search-input');
const submitBtn = document.getElementById('search-btn');
const filterBtn = document.getElementById('filter-btn');
const pokemonContainer = document.getElementById('pokemon-rendered-el');
const pokemonPopUp = document.getElementById('pokemon-popup');
const filterBox = document.getElementById('filterBox');
var firstSearch = true;
var boxHasBeenChecked = false;



// events --------------------------->

// on webapp loadup, this renders all pokemon.
document.addEventListener('DOMContentLoaded',
    getPokemonData()
        .then(renderAllPokemon)
        .catch(e => console.log(`Error: ${e}`))
);

pokemonContainer.addEventListener('click', showPokemonInfo);

submitBtn.addEventListener('click', searchIt);

filterBtn.addEventListener('click', () => {
    if(filterBox.classList[9] == "hidden" || filterBox.classList[11] == "hidden"){
        filterBox.classList.remove('hidden');
    } else {
        filterBox.classList.add('hidden');
    };
    
});


// had to call functions with conditions here
// instead of in the actual filterDiv function
// due to conditional causing certain pokemon to not load.
filterBox.addEventListener('click', (e) => {
    const target = e.target;
    if(boxHasBeenChecked == false && target.checked == true){
        filterDiv(e);
        hasItBeenTicked();
        turnItfalse();
    } else if(boxHasBeenChecked){
        filterDiv(e);
        hasItBeenTicked();
    };
});




// functions ------------------------>


// async function to get data from pokedex.json
async function getPokemonData(){
    let promise = await fetch('pokedex.json');
    let pokemon = await promise.json();
    return pokemon;
};


// renders all pokemon
function renderAllPokemon(data) {
    data.forEach((datas) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add(`${datas.type}`);
        newDiv.classList.add('flex', 'justify-start', 'content-center', 'gap-10', 'bg-white', 'w-11/12', 'h-auto', 'mx-auto', 'mb-1','pl-2', 'py-1', 'cursor-pointer', 'rounded', 'z-0', 'pointer-events-auto', "overflow-y-auto","hover:bg-gray-300", "sm:w-5/6",);
        newDiv.innerHTML = `
            <img src="asset/img/${datas.id}.png" class=" ${datas.id} h-13 w-12 pointer-events-none sm:h-18 sm:w-1/6" />
            <div class="${datas.name.english} self-center pointer-events-none sm:text-3xl sm:w-2/6">${datas.name.english}</div>
            <div class="flex w-3/6 justify-end  items-center  pointer-events-none">
                <h3 class="text-xs mr-4 pointer-events-none sm:text-lg">details</h3>
            </div>
        `
        document.getElementById('pokemon-rendered-el').appendChild(newDiv);
    });
};


// checks for what is clicked, if it is a pokemon, show information for pokemon in a popup
function showPokemonInfo(e){
    const pokemonClicked = e.target;
    const pokemonClickedID = pokemonClicked.firstElementChild.classList[0];
    const pokemonIndex = pokemonClicked.firstElementChild.classList[0] - 1;

    // checks to see if element clicked is actually a pokemon and not empty space
    if(pokemonClicked.firstElementChild.classList[0] !== 0){

        // removes the hidden class from div to show
        displayPopUp();
        // gets pokemon data
        getPokemonData()
        // based on data recieved from function render pokemon pictures/info into a popup
        .then(data => {

            // stores array of types for pokemon
            let pokemonClickedTypes = data[pokemonIndex].type;
            const pokemonClickedStats = data[pokemonIndex].base;
            pokemonPopUp.innerHTML = `
                <img src="asset/img/${data[pokemonIndex].id}.png" class="w-5/12 m-auto pt-2 lg:w-2/12"/>
                <div class="flex">
                    ${pokemonClickedTypes.map(type => {
                        // loops through array of types and creates new array
                        // Each new array will return each type and coloring for the background based on the type for a div
                        // check type to determine what bg coloring to use.
                        if(type == "Grass"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:green;">${type}</div>
                            `
                        } else if (type == "Poison"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#A040A0;">${type}</div>
                            `
                        } else if (type == "Water"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:blue;">${type}</div>
                            `
                        } else if (type == "Fire"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:orange;">${type}</div>
                            `
                        } else if (type == "Flying"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:gray;">${type}</div>
                            `
                        } else if (type == "Electric"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:yellow;">${type}</div>
                            `
                        } else if (type == "Normal"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#A8A878;">${type}</div>
                            `
                        } else if (type == "Ice"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#98D8D8;">${type}</div>
                            `
                        } else if (type == "Fighting"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:red;">${type}</div>
                            `
                        } else if (type == "Ground"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:lightbrown;">${type}</div>
                            `
                        } else if (type == "Psychic"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:darkpink;">${type}</div>
                            `
                        } else if (type == "Bug"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#A8B820;">${type}</div>
                            `
                        } else if (type == "Rock"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#B8A038;">${type}</div>
                            `
                        } else if (type == "Ghost"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#705898;">${type}</div>
                            `
                        } else if (type == "Dark"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#705848;">${type}</div>
                            `
                        } else if (type == "Dragon"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#7038F8;">${type}</div>
                            `
                        } else if (type == "Steel"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#B8B8D0;">${type}</div>
                            `
                        } else if (type == "Fairy"){
                            return ` 
                                <div class="m-auto px-1 text-slate-200 sm:text-3xl lg:text-xl" style="background-color:#EE99AC;">${type}</div>
                            `
                        };
                    }).join('')}
                </div>
                <div class="flex flex-col list-none mt-2">
                    <li class="text-white ml-2 sm:text-3xl lg:text-xl">HP : ${pokemonClickedStats.HP}</li>
                    <li class="text-white ml-2 sm:text-3xl lg:text-xl">Attack : ${pokemonClickedStats.Attack}</li>
                    <li class="text-white ml-2 sm:text-3xl lg:text-xl">Defense : ${pokemonClickedStats.Defense}</li>
                    <li class="text-white ml-2 sm:text-3xl lg:text-xl">Sp.Attack : ${pokemonClickedStats.SpAttack}</li>
                    <li class="text-white ml-2 sm:text-3xl lg:text-xl">Sp.Defense : ${pokemonClickedStats.SpDefense}</li>
                    <li class="text-white ml-2 sm:text-3xl lg:text-xl">Speed : ${pokemonClickedStats.Speed}</li>
                </div>
                <div class="flex justify-center mt-4">
                    <button class="hover:text-sm m-auto text-white pb-3 sm:text-3xl hover:text-md lg:text-xl hover:text-2xl" onclick="displayPopUp()">Close</button>
                </div>
                
            `
            // makes page scroll to the top
            window.scrollTo({
                top: 0, 
                left: 0, 
                behavior: 'smooth'
            });
        });
    };
};


// changes popup div display
function displayPopUp(){
    if(pokemonPopUp.classList[9] == "hidden" || pokemonPopUp.classList[10] == "hidden" || pokemonPopUp.classList[14] == "hidden"){
        pokemonPopUp.classList.remove('hidden');
    } else {
        pokemonPopUp.classList.add('hidden');
    };
    
};


// checks if divs have this pokemon name
// if no, it hides it.
function searchIt(){
    let searchedPokemon = theSearchBar.value;
    searchedPokemon = searchedPokemon.toLowerCase();
    const allPokemon = pokemonContainer.children;

    for (let data of allPokemon){
        if(theSearchBar.value !== null && firstSearch == true && !data.children[1].classList[0].toLowerCase().includes(searchedPokemon)){
            let newArry = [];
            newArry.push(data);
            newArry.forEach(pokemon => {
                pokemon.classList.add('hidden');
            })
            turnItfalse();
            theSearchBar.value = '';
            newArry = [];
        } else if(firstSearch == false && theSearchBar.value !== null){
            data.classList.remove("hidden")
            newArry = [];
            if(!data.children[1].classList[0].toLowerCase().includes(searchedPokemon)){
                let newArry = [];
                newArry.push(data);
                newArry.forEach(pokemon => {
                    pokemon.classList.add('hidden');
                })
                theSearchBar.value = '';
                turnItfalse();
                newArry = [];
            };
        };
        
    };

};


// changes the firstSearch boolean
// used for conditional for searchIt function
function turnItfalse() {
    if(firstSearch == true){
        firstSearch = false;
    } else {
        firstSearch = true;
    };
};



// checkbox triggers this function which allows 
// users to filter pokemon into types
function filterDiv(e) {
    const clickedBox = e.target;
    const allPokemon = pokemonContainer.children;

    for (let data of allPokemon){
        data.classList.remove("hidden");
        if(boxHasBeenChecked == false && !data.classList[0].includes(clickedBox.value)){
            data.classList.remove("hidden");
            let newArry = [];
            newArry.push(data);
            newArry.forEach(pokemon => {
                pokemon.classList.add('hidden');
            })
            filterBox.classList.add('hidden');
            clickedBox.checked = false;
        } else if (boxHasBeenChecked){
            data.classList.remove("hidden")
            if(!data.classList[0].includes(clickedBox.value)){
                let newArry = [];
                newArry.push(data);
                newArry.forEach(pokemon => {
                    pokemon.classList.add('hidden');
                })
                filterBox.classList.add('hidden');
                clickedBox.checked = false;
            };
        };
    };
};



// changes boolean variable boxHasBeenChecked
function hasItBeenTicked() {
    if(boxHasBeenChecked == false){
        boxHasBeenChecked = true;
    } else {
        boxHasBeenChecked = false;
    };
};