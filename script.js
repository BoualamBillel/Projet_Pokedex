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

