const apikey = "?";

const form = document.getElementById("form");
const input = document.getElementById("search_input");
const list = document.createElement("ul");
list.classList.add("list-group", "mt-3");
const nav = document.querySelector("nav");

nav.appendChild(list);

function getUrl(inputvalue) {
    list.innerHTML = "";
    fetch(`http://www.omdbapi.com/?s=${inputvalue}&apikey=${apikey}`)
        .then(response => response.json())
        .then(data => {
            rendMovies(data.Search)
        })
}

function rendMovies(arr) {
    arr.forEach((element => {
        const item = document.createElement("li");
        const text = document.createElement("h5");
        const img = document.createElement("img");
        const year = document.createElement("p");
        const plot = document.createElement("p");
        const readBtn = document.createElement("button");
        item.classList.add("list-group-item", "mb-3", "text-center");
        img.classList.add("img", "mb-3");
        plot.classList.add("hidden")

        img.src = element.Poster;
        text.textContent = element.Title;
        year.textContent = element.Year
        plot.textContent = element.Plot

        readBtn.textContent = "Read More"
        readBtn.classList.add("btn", "btn-primary", "my-3");
        readBtn.addEventListener("click", () => {
            plot.classList.remove("hidden")
        });
        item.append(img, text, year, readBtn, plot);
        list.appendChild(item);
    }))
}

form.addEventListener("submit", function (evt) {
    evt.preventDefault();

    let inputvalue = input.value;
    getUrl(inputvalue)
})
