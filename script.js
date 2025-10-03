// Récupération des données de 100 Pokémon (Limité à 100 pour éviter les latences)
async function getAllPokemonsDatas() {
    try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
        const allPokemonsDatas = await response.json();

        return allPokemonsDatas;
    } catch (error) {
        console.error("Erreur lors de la récupération des données de tout les pokémons", error);
        return null;
    }
}

// Récupération des données d'un Pokémon par une recherche (ID/Nom)
async function getPokemonDatasById(id) {
    try {
        const response = await fetch(`https://pokebuildapi.fr/api/v1/${id}`);
        const pokemonDatasById = await response.json();

        console.table(pokemonDatasById);
        return pokemonDatasById;
    } catch (error) {
        console.error("Erreur lors de la récupération des données du Pokémon par ID ou Nom");
        return null;
    }
}

// Récupération des données de l'évolution d'un Pokémon
async function getPokemonEvolutionDatas(pokemonDatas) {
    try {
        // Récupération de l'ID
        pokemonDatas.apiEvolutions.forEach((evolution) => {
            const pokemonEvoId = evolution.pokedexId;
            return pokemonEvoId;
        })
    } catch (error) {
        console.error("Erreur lors de la récupération de l'ID du Pokémon evolué");
        return null;
    }
}

function getPokemonTypesImg(pokemonDatas) {
    try {
        pokemonDatas.apiTypes.forEach((type) => {
            const pokemonTypesImg = type.image
            return pokemonTypesImg;
        })
    } catch (error) {
        console.error("Erreur lors de la récupération de/des images des types du Pokémon", error);
        return null;
    }
}

// Création du container de Pokémon List
function createPokemonListContainerCard(pokemonDatas) {
    pokemonDatas.forEach((pokemon) => {
        // Création des divs
        const pokemonListContainer = document.createElement("div")
        const pokemonListTextInfosDiv = document.createElement("div");
        const pokemonListImgDiv = document.createElement("div");

        // Ajout des classes aux divs
        pokemonListContainer.classList.add("pokemon-list-container");
        pokemonListTextInfosDiv.classList.add("pokemon-list-text-infos");
        pokemonListImgDiv.classList.add("pokemon-list-img");

        // Créations des élements
        const pokemonListId = document.createElement("p");
        const pokemonListName = document.createElement("p");
        const pokemonListImg = document.createElement("img");

        // Insertion des données dans les élements
        pokemonListId.innerText = pokemon.id;
        pokemonListName.innerText = pokemon.name
        pokemonListImg.setAttribute("src", pokemon.image);

        // Insertion des élements dans leur div correspondants
        pokemonListTextInfosDiv.appendChild(pokemonListId);
        pokemonListTextInfosDiv.appendChild(pokemonListName);
        pokemonListImgDiv.appendChild(pokemonListImg);

        // Insertion des divs dans le container
        pokemonListContainer.appendChild(pokemonListTextInfosDiv);
        pokemonListContainer.appendChild(pokemonListImgDiv);

        return pokemonListContainer;

    });

}

function createPokemonInfoCard(pokemonDatas) {
    // Récupération des infos nécessaires
    const pokemonId = pokemonDatas.id;
    const pokemonImg = pokemonDatas.image;
    const pokemonName = pokemonDatas.name;
    const pokemonTypesImgs = getPokemonTypesImg(pokemonDatas);

    // Récupération du container de pokemon info
    const pokemonInfoContainer = document.querySelector(".pokemon-infos-container");

    // Création des élements nécessaires
    const pokemonIdText_element = document.createElement("h1");
    const pokemonNameText_element = document.createElement("h1");
    const pokemonImg_element = document.createElement("img");
    const pokemonEvolution_element = createPokemonListContainerCard(pokemonDatas);

    // Insertion des données dans les élements
    pokemonIdText_element = pokemonId;
    pokemonImg_element = pokemonImg;
    pokemonNameText_element = pokemonName;

    // Insertion dans le container
    pokemonInfoContainer.appendChild(pokemonIdText_element);
    pokemonInfoContainer.appendChild(pokemonNameText_element);
    pokemonInfoContainer.appendChild(pokemonImg_element);
    pokemonTypesImgs.forEach((img) => {
        const pokemonTypeImg_element = document.createElement("img");
        pokemonTypeImg_element.setAttribute("src", img);
    });
    pokemonInfoContainer.appendChild(pokemonEvolution_element);

}

function fetchUserSearchInput () {
    // Récupération du formulaire
    const form = document.querySelector("#search-bar");
    // Ecoute de l'évenement submit sur le fomulaire de recherche de Pokémon
    form.addEventListener("submit", (event) => {
        event.preventDefault;
        const formData = new FormData(form);
        const searchValue = formData.get("search-input");
        return searchValue;
    })
}

function displayPokemonInfo (searchInput){
    // Récupération des données du Pokemon
    const pokemonDatas = getPokemonDatasById(searchInput);
    // Récupération du formulaire
    const searchPokemonForm = document.querySelector("#search-bar");
    // Ecoute de l'évenement submit sur le formulaire pour afficher les infos du Pokémon
    searchPokemonForm.addEventListener("submit", createPokemonInfoCard(pokemonDatas));
}

function main() {
    const searchInput = fetchUserSearchInput();
    console.log("input search = " + searchInput);
    getPokemonDatasById(searchInput)
    displayPokemonInfo(searchInput);
}


// EXEC DEBUG
// EXEC
main();