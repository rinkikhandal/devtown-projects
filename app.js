let fetchReceipe = () => {
  const appId = "f98d4788";
  const appKey = "0105810e95442a333725e749c4a4c913";
  var query = document.getElementById("searchInput").value;
  console.log(query);

  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;
  searchValue.innerHTML = "Searching...";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayRecipes(data.hits);
      // console.log(data.hits);
    })
    .catch((error) => console.log(error));
};

function displayRecipes(recipes) {
  var recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.innerHTML = "";
  // console.log("hello");
  recipes.forEach((recipe) => {
    var recipeTitle = recipe.recipe.label;
    var recipeImage = recipe.recipe.image;
    var source = recipe.recipe.source;
    var mealtype = recipe.recipe.mealType;
    var ingredients = recipe.recipe.ingredientLines;
    //======= ingredients count  =======
    
    //======= end of ingredients count  =======

    var recipeElement = document.createElement("div");
    recipeElement.classList.add("recipeElement");
    recipeElement.innerHTML = `
    <img src="${recipeImage}" alt="${recipeTitle} "class="rounded-t-lg object-center ">

      <div class="recipeContent">
        <h3 class="text-md font-semibold mb-2 text-start">${recipeTitle}</h3>
        <p class="capitalize ml-0 m-[5px] font-semibold">${mealtype}</p>
        <p class="ingredients text-sm text-cyan-700">${ingredients}</p>
        <figcaption class="font-medium italic mt-2 text-sm">--${source}</figcaption>
      </div>`;

    recipeContainer.appendChild(recipeElement);
  });
  searchValue.innerHTML = "Search";
}



let searchValue = document.getElementById("search");

const search = document.getElementById("search");
navigator.geolocation.getCurrentPosition(function (position) {
  console.log(position);
});