// Récupération des données de tout les Pokémons
async function getAllPokemonsDatas() {
    try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/100")
        const AllPokemonsDatas_array = await response.json();
        // console.log("[getAllPokemonsDatas] : Données retournés par : ", AllPokemonsDatas_array);
        return AllPokemonsDatas_array;
    } catch (error) {
        console.error("[getAllPokemonsDatas] : Erreur lors de la récuperation des données de tout les Pokémons ", error);
        return null;
    }
}
// Récupération des données d'un Pokémon par ID ou Nom
async function getPokemonDatasById(pokemonId) {
    console.log("[getPokemonDatasById] : Données reçu : Pokémon ID = ", pokemonId);
    try {
        const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId}`);
        const pokemonDataById = await response.json();
        console.log("[getPokemonDatasById] : Données retournés : ", pokemonDataById);
        return pokemonDataById;
    } catch (error) {
        console.error("[getPokemonDatasById] : Erreur lors de la récupération de données par ID ou Nom de Pokémon ", error);
        return null;
    }
}
// Récupération des données de types du Pokémon
function getPokemonTypesImg(pokemonDatas) {
    let pokemonTypesImg_array = [];
    try {
        pokemonDatas.apiTypes.forEach(type => {
            pokemonTypesImg_array.push(type.image);
        });
        console.log("[getPokemonTypesImg] :  Données retournés : ", pokemonTypesImg_array);
        return pokemonTypesImg_array;
    } catch (error) {
        console.error("[getPokemonTypesImg] : Erreur lors de la récupération des img de type du Pokémon", error);
        return null;
    }
}
// Récupération des infos de l"évolution du Pokémon
async function getPokemonEvolutionInfo(pokemonDatas) {
    try {
        const pokemonEvolutionID = pokemonDatas.apiEvolutions[0].pokedexId;
        // Récupération des données de l'évolution du Pokémon
        const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonEvolutionID}`);
        const pokemonEvolutionData_array = await response.json();
        console.log("[getPokemonEvolutionInfo] : Données retournés : ", pokemonEvolutionData_array);
        return pokemonEvolutionData_array;
    } catch (error) {
        console.error("[getPokemonEvolutionInfo] : Erreur lors de la récuperation des infos de l'évolution du Pokémon", error);
        return null;
    }
}
// Création de la card de Pokémon List
function createPokemonCardList(pokemonDatas) {
    // console.log("[createPokemonCardList] : Données reçu : ", pokemonDatas);
    // Création de la div card
    const pokemonCard_div = document.createElement("div");
    // Création des sous-div
    const pokemonCardTextInfos_div = document.createElement("div");
    const pokemonCardImg_div = document.createElement("div");
    // Assignation de classe pour les divs
    pokemonCard_div.classList.add("pokemon-card");
    pokemonCardTextInfos_div.classList.add("pokemon-card-text-infos");
    pokemonCardImg_div.classList.add("pokemon-card-img");
    // Création des élements de la card
    const pokemonCardId_element = document.createElement("h1");
    const pokemonCardName_element = document.createElement("h1");
    const pokemonCardImg_element = document.createElement("img");
    // Insertion des données correspondantes
    pokemonCardId_element.innerText = pokemonDatas.id;
    pokemonCardName_element.innerText = pokemonDatas.name;
    pokemonCardImg_element.setAttribute("src", pokemonDatas.image);
    // Insertion des élements dans leur div
    pokemonCardTextInfos_div.appendChild(pokemonCardId_element);
    pokemonCardTextInfos_div.appendChild(pokemonCardName_element);
    pokemonCardImg_div.appendChild(pokemonCardImg_element);
    // Insertion des sous-div dans la card
    pokemonCard_div.appendChild(pokemonCardTextInfos_div);
    pokemonCard_div.appendChild(pokemonCardImg_div);

    // Stockage du PokemonId dans la card
    pokemonCard_div.setAttribute("data-pokemon-id", pokemonDatas.id);

    // console.log("[createPokemonCardList] : Div retournés : ", pokemonCard_div)
    return pokemonCard_div;

}
// Création du container Pokemon Info
async function createPokemonInfoCard(pokemonDatas, pokemonTypesImgs) {
    // Récupération du container Pokemon Info
    const pokemonInfoContainer_div = document.querySelector(".pokemon-infos-container");
    // Néttoyage du container pour eviter la duplication
    pokemonInfoContainer_div.innerHTML = "";
    // Récupération des données de l'évolution du Pokémon
    const pokemonEvolutionsData = await getPokemonEvolutionInfo(pokemonDatas);
    // Récupération de la card style Pokémon List
    const pokemonEvolutionCard = createPokemonCardList(pokemonEvolutionsData);
    // Création des sous-div
    const pokemonInfosElements_div = document.createElement("div");
    const pokemonInfoTypes_div = document.createElement("div");
    const pokemonInfoTypesText_div = document.createElement("div");
    const pokemonInfoTypesImg_div = document.createElement("div");
    const pokemonInfoEvolutionElements_div = document.createElement("div");
    // Ajout des classes dans les sous-div
    pokemonInfosElements_div.classList.add("pokemon-infos-info");
    pokemonInfoTypes_div.classList.add("pokemon-infos-types");
    pokemonInfoTypesText_div.classList.add("pokemon-info-types-text");
    pokemonInfoTypesImg_div.classList.add("pokemon-info-types-img");
    pokemonInfoEvolutionElements_div.classList.add("pokemon-infos-evolution");
    // Créations des élements
    const pokemonInfoId_elem = document.createElement("h1");
    const pokemonInfoImg_elem = document.createElement("img");
    const pokemonInfoName_elem = document.createElement("h1");
    const pokemonInfoTypesTitle_elem = document.createElement("h1");
    const pokemonInfoEvolutionTitle_elem = document.createElement("h1");
    // Insertion des données
    pokemonInfoId_elem.innerText = pokemonDatas.id;
    pokemonInfoImg_elem.setAttribute("src", pokemonDatas.image);
    pokemonInfoName_elem.innerText = pokemonDatas.name;
    pokemonInfoTypesTitle_elem.innerText = "Types";
    pokemonInfoEvolutionTitle_elem.innerText = "Evolution"

    // Insertion des élements dans leurs div 
    pokemonInfosElements_div.appendChild(pokemonInfoId_elem);
    pokemonInfosElements_div.appendChild(pokemonInfoImg_elem);
    pokemonInfosElements_div.appendChild(pokemonInfoName_elem);

    pokemonInfoTypes_div.appendChild(pokemonInfoTypesTitle_elem);
    pokemonTypesImgs.forEach((img) => {
        const pokemonInfoTypeImg = document.createElement("img");
        pokemonInfoTypeImg.setAttribute("src", img);
        pokemonInfoTypesImg_div.appendChild(pokemonInfoTypeImg);
    });

    pokemonInfoEvolutionElements_div.appendChild(pokemonInfoEvolutionTitle_elem);
    pokemonInfoEvolutionElements_div.appendChild(pokemonEvolutionCard);

    // Insertion des sous-divs de Types
    pokemonInfoTypes_div.appendChild(pokemonInfoTypesImg_div);
    // Insertion des divs dans le container present dans le DOM
    pokemonInfoContainer_div.appendChild(pokemonInfosElements_div);
    pokemonInfoContainer_div.appendChild(pokemonInfoTypes_div);
    pokemonInfoContainer_div.appendChild(pokemonInfoEvolutionElements_div);

    // DEBUG
    console.log("[createPokemonInfoCard] : Div retournés : ", pokemonInfoContainer_div);

}

function displayPokemonInPokemonList(pokemonDatas) {
    const listContainer = document.querySelector(".pokemons-list");
    pokemonDatas.forEach((pokemon) => {
        const card = createPokemonCardList(pokemon);
        listContainer.appendChild(card);
    })
}

function getUserResearch() {
    // Récupération du formulaire de recherche
    const searchForm = document.querySelector("#search-bar");
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(searchForm);
        const searchValue = formData.get("search-input");
        console.log("[getUserSearch] : Donnés renvoyés : Input de recherche : ", searchValue);
        return searchValue;
    })
}

// DEBUG
getPokemonDatasById(1);

async function afficherDebug() {
    const pokemonDatas = await getPokemonDatasById(1);
    const allPokemonsDatas = await getAllPokemonsDatas();
    getPokemonTypesImg(await pokemonDatas);
    getPokemonEvolutionInfo(await pokemonDatas);
    createPokemonCardList(await pokemonDatas);
    createPokemonInfoCard(await pokemonDatas, getPokemonTypesImg(await pokemonDatas));
    displayPokemonInPokemonList(allPokemonsDatas);

}

// afficherDebug();

// EXEC
async function main() {
    // Récupération des données de tout les pokémons
    const allPokemonsDatas = await getAllPokemonsDatas();
    displayPokemonInPokemonList(allPokemonsDatas);
    // Récupération du formulaire de recherche et affichage des infos du Pokémon rechercher
    const searchForm = document.querySelector("#search-bar");
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(searchForm);
        const userSearchValue = formData.get("search-input");
        console.log("user input = ", userSearchValue);
        const researchedPokemonData = await getPokemonDatasById(userSearchValue);
        console.log("reseacher data pokemon : ", researchedPokemonData);
        createPokemonInfoCard(researchedPokemonData, getPokemonTypesImg(await researchedPokemonData));
    })

    // Quand on click sur une card Pokémon, les infos de celui ci sont affichés
    const pokemonCard = document.querySelectorAll(".pokemon-card");
    console.log(pokemonCard);
    if (pokemonCard) {
        pokemonCard.forEach(pokemon => {
            const pokemonCardId = pokemon.getAttribute("data-pokemon-id");
            pokemon.addEventListener("click", async (event) => {
                const pokemonDatas = await getPokemonDatasById(pokemonCardId);
                console.log("[Click sur Card] : Données reçu : ", pokemonDatas);
                createPokemonInfoCard(pokemonDatas, getPokemonTypesImg(pokemonDatas));
            })
        })
    }



}

main();