// Fetch de l'api Pokemon
async function fetchPokemonData() {
    const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon/limit/70");
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
        // Création des sous div
        const pokemonListText_div = document.createElement("div");
        pokemonListText_div.classList.add("pokemon-list-text");
        pokemonListContainer.appendChild(pokemonListText_div);

        const pokemonListImg_div = document.createElement("div");
        pokemonListImg_div.classList.add("pokemon-list-img");
        pokemonListContainer.appendChild(pokemonListImg_div);
        // Création des elements du container
        const pokemonListId = document.createElement("p");
        pokemonListId.innerText = pokemon['id'];
        const pokemonListName = document.createElement("p");
        pokemonListName.innerText = pokemon['name'];
        const pokemonListImg = document.createElement("img");
        pokemonListImg.setAttribute("src", pokemon['image']);
        // Insertion des elements dans les sous div correspondante
        pokemonListText_div.appendChild(pokemonListId);
        pokemonListText_div.appendChild(pokemonListName);
        pokemonListImg_div.appendChild(pokemonListImg);
        // Insertion du container dans l'elément parent
        pokemonListParentElem.appendChild(pokemonListContainer);

        // Ajout d'un événement click pour afficher les infos du Pokémon
        pokemonListContainer.addEventListener("click", async () => {
            // Récupération des infos détaillées du Pokémon
            const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemon['id']}`);
            const pokemonInfo = await response.json();
            // Nettoyage de la zone d'affichage
            document.querySelector(".pokemon-infos-container").innerHTML = "";
            // Affichage des infos principales
            const pokemonInfoParentDiv = document.createElement("div");
            pokemonInfoParentDiv.classList.add("pokemon-infos-div");
            document.querySelector(".pokemon-infos-container").appendChild(pokemonInfoParentDiv);

            const pokemonInfo_div = document.createElement("div");
            pokemonInfo_div.classList.add("pokemon-info-text");
            pokemonInfoParentDiv.appendChild(pokemonInfo_div);

            const pokemonInfoName = document.createElement("h1");
            pokemonInfoName.innerText = pokemonInfo['name'];
            pokemonInfo_div.appendChild(pokemonInfoName);

            const pokemonInfoId = document.createElement("p");
            pokemonInfoId.innerText = "ID°" + pokemonInfo['id'];
            pokemonInfo_div.appendChild(pokemonInfoId);

            const pokemonInfoImg = document.createElement("img");
            pokemonInfoImg.setAttribute("src", pokemonInfo['image']);
            pokemonInfo_div.appendChild(pokemonInfoImg);

            // Affichage des types
            const pokemonInfoTypes_div = document.createElement("div");
            pokemonInfoTypes_div.classList.add("pokemon-info-types");
            pokemonInfoParentDiv.appendChild(pokemonInfoTypes_div);

            const pokemonInfoTypeName = document.createElement("p");
            pokemonInfoTypeName.innerText = "Types :";
            pokemonInfoTypes_div.appendChild(pokemonInfoTypeName);

            const pokemonInfoTypesImg_div = document.createElement("div");
            pokemonInfoTypesImg_div.classList.add("pokemon-info-types-img");
            pokemonInfoTypes_div.appendChild(pokemonInfoTypesImg_div);

            pokemonInfo['apiTypes'].forEach((type) => {
                const pokemonInfoTypesImg = document.createElement("img");
                pokemonInfoTypesImg.setAttribute("src", type.image);
                pokemonInfoTypesImg_div.appendChild(pokemonInfoTypesImg);
            });

            // Affichage des évolutions
            const pokemonInfoEvo = document.createElement("div");
            pokemonInfoEvo.classList.add("pokemon-info-evo");
            pokemonInfoParentDiv.appendChild(pokemonInfoEvo);

            const pokemonInfoEvolutionText = document.createElement("p");
            pokemonInfoEvolutionText.innerText = "Evolution :";
            pokemonInfoEvo.appendChild(pokemonInfoEvolutionText);

            const pokemonInfoEvoText = document.createElement("div");
            pokemonInfoEvoText.classList.add("pokemon-info-evo-text");
            pokemonInfoEvo.appendChild(pokemonInfoEvoText);

            pokemonInfo['apiEvolutions'].forEach((type) => {
                const pokemonEvoId = document.createElement("p");
                const pokemonEvoName = document.createElement("p");
                const pokemonEvoImg = document.createElement("img");

                pokemonEvoId.innerText = "ID°" + type.pokedexId;
                pokemonEvoName.innerText = type.name;
                // pokemonEvoImg.setAttribute("src", type.image);

                pokemonInfoEvoText.appendChild(pokemonEvoId);
                pokemonInfoEvoText.appendChild(pokemonEvoName);
                pokemonInfoEvoText.appendChild(pokemonEvoImg);
            });
        });
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
        document.querySelector(".pokemon-infos-container").innerHTML = "" 
        
        // Récupération de la section parente de Pokémon info
        const pokemonInfoParentElem = document.querySelector(".pokemon-infos");
        // Récupération du container des infos
        const pokemonInfoContainer = document.querySelector(".pokemon-infos-container");
        // Récupération de la div parente
        const pokemonInfoParentDiv = document.createElement("div");
        pokemonInfoParentDiv.classList.add("pokemon-infos-div");
        pokemonInfoContainer.appendChild(pokemonInfoParentDiv);

        
        // Clean le canva du parent pour eviter la duplication
        pokemonInfoParentDiv.innerHTML = "";
        // Création des sous div
        const pokemonInfo_div = document.createElement("div");
        pokemonInfo_div.classList.add("pokemon-info-text");
        pokemonInfoParentDiv.appendChild(pokemonInfo_div);

        const pokemonInfoTypes_div = document.createElement("div");
        pokemonInfoTypes_div.classList.add("pokemon-info-types");
        pokemonInfoParentDiv.appendChild(pokemonInfoTypes_div);

        const pokemonInfoTypesImg_div = document.createElement("div");
        pokemonInfoTypesImg_div.classList.add("pokemon-info-types-img");
        pokemonInfoTypes_div.appendChild(pokemonInfoTypesImg_div);

        const pokemonInfoEvo = document.createElement("div");
        pokemonInfoEvo.classList.add("pokemon-info-evo");
        pokemonInfoParentDiv.appendChild(pokemonInfoEvo);

        const pokemonInfoEvoText = document.createElement("div");
        pokemonInfoEvoText.classList.add("pokemon-info-evo-text");
        pokemonInfoEvo.appendChild(pokemonInfoEvoText);

        //Création des elements nécessaires à l'affichage des données du Pokémon
        const pokemonInfoName = document.createElement("h1");
        pokemonInfoName.innerText = pokemonInfo['name'];
        pokemonInfo_div.appendChild(pokemonInfoName);

        const pokemonInfoId = document.createElement("p");
        pokemonInfoId.innerText = "ID°" + pokemonInfo['id'];
        pokemonInfo_div.appendChild(pokemonInfoId);

        const pokemonInfoImg = document.createElement("img");
        pokemonInfoImg.setAttribute("src", pokemonInfo['image']);
        pokemonInfo_div.appendChild(pokemonInfoImg);

        const pokemonInfoTypeName = document.createElement("p");
        pokemonInfoTypeName.innerText = "Types :";
        pokemonInfoTypes_div.appendChild(pokemonInfoTypeName);

        pokemonInfo['apiTypes'].forEach((type) => {
            const pokemonInfoTypesImg = document.createElement("img");
            pokemonInfoTypesImg.setAttribute("src", type.image);
            pokemonInfoTypesImg_div.appendChild(pokemonInfoTypesImg);
        })

        const pokemonInfoEvolutionText = document.createElement("p");
        pokemonInfoEvolutionText.innerText = "Evolution :";
        pokemonInfoEvo.appendChild(pokemonInfoEvolutionText);

        pokemonInfo['apiEvolutions'].forEach(async (type) => {
            const pokemonEvoId = document.createElement("p");
            const pokemonEvoName =document.createElement("p");
            const pokemonEvoImg = document.createElement("img");

            pokemonEvoId.innerText = "ID°" + type.pokedexId;
            pokemonEvoName.innerText = type.name;
            // Récupération de l'image de l'évo
            async function getEvoData() {
                const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${type.pokedexId}`);
                const pokemonEvoData = await response.json();

                return pokemonEvoData;
            }
            // Données du Pokémon évolué
            const pokemonEvoData = await getEvoData();
            // Insertion de l'image
            pokemonEvoImg.setAttribute("src", pokemonEvoData['image']);

            // DEBUG
            console.table(pokemonEvoData);
            



            pokemonInfoEvoText.appendChild(pokemonEvoId);
            pokemonInfoEvoText.appendChild(pokemonEvoName);
            pokemonInfoEvoText.appendChild(pokemonEvoImg);
        })
        

        // Insertion du container dans la section parente
        pokemonInfoParentElem.appendChild(pokemonInfoContainer);
        



        // DEBUG
        if (searchValue != "") {
            console.table(pokemonInfo);
            console.log(pokemonInfo['image']);
            console.table(pokemonInfo[apiEvolutions]);
        }
    })
    
}

// Appel des fonctions
getPokemonData();
pokemonList();
displayPokemonInfoBySearch();
