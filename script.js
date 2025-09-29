// Fetch de l'api Pokemon
async function fetchPokemonData() {
    const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
    const status = response.status;
    const data = await response.json();
    
    
    return data;
}

// Récupération des données du Fetch de l'api Pokémon
async function getPokemonData() {
    const pokemonData_array = await fetchPokemonData();
    console.table(pokemonData_array);
    return pokemonData_array;

    
}
getPokemonData();


function pokemonList() {
    const pokemonData_array = getPokemonData;
    pokemonData_array.forEach(pokemon => {
        // Création de la cellule
        const pokemonListContainer = document.createElement("div");
        pokemonListContainer.classList.add("pokemon-list-container");

    });

}

