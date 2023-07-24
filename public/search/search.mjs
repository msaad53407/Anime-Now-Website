// Accessing DOM Elements
const searchIcon = document.getElementById('searchIcon'),
    searchInput = document.getElementById('searchInput'),
    contentContainer = document.getElementById('contentContainer'),
    searchResultName = document.getElementById('searchResultName'),
    loading = document.getElementById('loading'),
    warning = document.getElementById('warning');

const searchValue = localStorage.getItem('searchValue');

document.title = `"${searchValue}" Search Results`;

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '28516ad153msh236950bf701cfd9p1de487jsna737faac0962',
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
    }
};

//Some Necessary Functions
// Function To Display Data From API
const displayFunction = async (value) => {
    try {
        const response = await fetch(`https://myanimelist.p.rapidapi.com/anime/search/${value}/50`, options);
        const result = await response.json();
        loading.style.display = 'none';
        searchResultName.innerText = `Search Results for: ${value}`
        result.forEach(element => {
            contentContainer.insertAdjacentHTML('beforeend', `<div class="bg-red-500 bg-opacity-90 lg:w-1/4 md:w-1/2 p-4 mt-2 mb-2 mr-2 ml-1 w-full rounded-lg">
            <a class="block relative h-60 rounded overflow-hidden flex justify-center align-items-center cursor-pointer" id="${element.myanimelist_id}">
            <img alt="" class="object-cover object-center block h-max-content" src="${element.picture_url}" id="img">
            </a>
            <div class="mt-9">
            <h2 class="text-gray-50 title-font text-3xl font-medium text-center break-words" id="title">
            ${element.title}
            </h2>
            </div>
            </div>`)
        });
        const anchorArr = Array.from(contentContainer.querySelectorAll('a'))
        anchorArr.forEach((element) => {
            element.addEventListener('click', async (e) => {
                const currentId = e.currentTarget.id;
                console.log(e.currentTarget.id);
                const response = await fetch(`http://localhost:3000/search`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: currentId
                    }),
                })
                const result = await response.json();
                console.log(result);

                window.location.href = `/searchresults`;
            })
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to pass the Data to Window when It is Loaded
const displayData = () => {
    displayFunction(searchValue);
};

// Function To Update Data When Search Value Changes
const displayUpdatedData = async () => {
    localStorage.searchValue = searchInput.value;
    const updatedSearch = localStorage.getItem('searchValue');
    document.title = `"${updatedSearch}" Search Results`;
    searchResultName.innerText = `Search Results for:`
    contentContainer.innerHTML = '';
    loading.style.display = 'block';
    displayFunction(updatedSearch);
};

// Function To Show Warning When Search Value Too Short
const setTimeOut = () => {
    warning.classList.remove('hidden');
    setTimeout(() => {
        warning.classList.add('hidden');
    }, 2000);
}

// Displaying Data When Page Loads
window.addEventListener('load', displayData)

// Displaying updated Data When user CLick Search Icon
searchIcon.addEventListener('click', () => {
    if (searchInput.value.length >= 3) displayUpdatedData();
    else setTimeOut();
})

// Displaying updated Data When user presses Enter Key
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (searchInput.value.length >= 3) displayUpdatedData();
        else setTimeOut();
    }
})

console.log('Hello from search.js')