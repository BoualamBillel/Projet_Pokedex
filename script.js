// Fetch de l'api Pokemon
async function fetchPokemonData() {
    const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/5");
    const status = response.status;
    const data = await response.json();


    return data;
}

// Récupération des données du Fetch de l'api Pokémon
async function getPokemonData() {
    const pokemonData_array = await fetchPokemonData();
    return pokemonData_array;


}
// Création des éléments nécessaires à la liste de Pokémon
async function pokemonList() {
    // Récupération des données des Pokémons
    const pokemonData_array = await getPokemonData();
    // Récupération de la section parente de pokemonList
    const pokemonListParentElem = document.querySelector(".pokemons-list");
    // Je parcours le tableau de données de l'api Pokémon
    pokemonData_array.forEach(pokemon => {
        // Création du container de la liste
        const pokemonListContainer = document.createElement("div");
        pokemonListContainer.classList.add("pokemon-list-container");
        // Création des elements du container
        const pokemonListId = document.createElement("p");
        pokemonListId.innerText = pokemon['id'];
        const pokemonListName = document.createElement("p");
        pokemonListName.innerText = pokemon['name'];
        const pokemonListImg = document.createElement("img");
        pokemonListImg.setAttribute("src", pokemon['image']);
        // Insertion des elements dans le container
        pokemonListContainer.appendChild(pokemonListId);
        pokemonListContainer.appendChild(pokemonListName);
        pokemonListContainer.appendChild(pokemonListImg);
        // Insertion du container dans l'elément parent
        pokemonListParentElem.appendChild(pokemonListContainer);
    });
}

// Barre de recherche
async function displayPokemonInfoBySearch() {
    const searchForm = document.querySelector("#search-bar");
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(searchForm);
        const searchValue = formData.get("search-input");

        //Récupération des données du Pokemon de la recherche
        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/" + searchValue);
        const pokemonInfo = await response.json();
        
        // Récupération de la section parente de Pokémon info
        const pokemonInfoParentElem = document.querySelector(".pokemon-infos");
        // Création du container des infos
        const pokemonInfoContainer = document.createElement("div");
        pokemonInfoContainer.classList.add("pokemon-infos-container");
        //Création des elements nécessaires à l'affichage des données du Pokémon
        const pokemonInfoId = document.createElement("p");
        pokemonInfoId.innerText = "N°" + pokemonInfo['id'];
        pokemonInfoContainer.appendChild(pokemonInfoId);

        const pokemonInfoImg = document.createElement("img");
        pokemonInfoImg.setAttribute("src", pokemonInfo['image']);
        pokemonInfoContainer.appendChild(pokemonInfoImg);

        const pokemonInfoName = document.createElement("p");
        pokemonInfoName.innerText = pokemonInfo['name'];
        pokemonInfoContainer.appendChild(pokemonInfoName);

        const pokemonInfoTypeName = document.createElement("p");
        pokemonInfoTypeName.innerText = "Types";
        pokemonInfoContainer.appendChild(pokemonInfoTypeName);

        pokemonInfo['apiTypes'].forEach((type) => {
            const pokemonInfoTypesImg = document.createElement("img");
            pokemonInfoTypesImg.setAttribute("src", type.image);
            pokemonInfoContainer.appendChild(pokemonInfoTypesImg);
        })

        const pokemonInfoEvolutionText = document.createElement("p");
        pokemonInfoEvolutionText.innerText = "Evolution";
        pokemonInfoContainer.appendChild(pokemonInfoEvolutionText);
        
        // Insertion du container dans la section parente
        pokemonInfoParentElem.appendChild(pokemonInfoContainer);
        



        // DEBUG
        if (searchValue != "") {
            console.table(pokemonInfo);
            console.log(pokemonInfo['image']);
        }
    })
    
}
// Appel des fonctions
getPokemonData();
pokemonList();
displayPokemonInfoBySearch();
