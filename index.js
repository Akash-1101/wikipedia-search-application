let searchInputEl = document.getElementById("searchInput")
let searchresultcontainer = document.getElementById("searchResults")
let loadingEl = document.getElementById("spinner")

function createresultandappend(search_results) {
    let {
        title,
        link,
        description
    } = search_results
    let result1el = document.createElement("div")
    result1el.classList.add("result-item")
    let titleEl = document.createElement("a")
    titleEl.href = link
    titleEl.target = "_blank"
    titleEl.classList.add("result-title")
    titleEl.textContent = title
    result1el.appendChild(titleEl)
    let brekel = document.createElement("br")
    result1el.appendChild(brekel)
    let linkEl = document.createElement("a")
    linkEl.classList.add("result-url")
    linkEl.href = link
    linkEl.textContent = link
    result1el.appendChild(linkEl)
    let brekel1 = document.createElement("br")
    result1el.appendChild(brekel1)
    let descriptionEl = document.createElement("p")
    descriptionEl.classList.add(link - description)
    descriptionEl.textContent = description
    result1el.appendChild(descriptionEl)
    searchresultcontainer.appendChild(result1el)
}



function displaySearchresults(jsonData) {
    let {
        search_results
    } = jsonData
    loadingEl.classList.toggle("d-none")
    for (let eachitem of search_results) {
        createresultandappend(eachitem)
    }
}

function fetchresults(event) {
    let userinput = searchInputEl.value
    searchresultcontainer.textContent = ""
    if (userinput !== "" && event.key === "Enter") {
        let url = "https://apis.ccbp.in/wiki-search?search=" + userinput
        let options = {
            method: "GET",
        }
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(jsonData) {
                loadingEl.classList.toggle("d-none")
                displaySearchresults(jsonData)
            })
    }
}

searchInputEl.addEventListener("keydown", fetchresults)