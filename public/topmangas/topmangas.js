const contentContainer = document.getElementById('contentContainer'),
    loading = document.getElementById('loading'),
    searchIcon = document.getElementById('searchIcon'),
    searchInput = document.getElementById('searchInput'),
    warning = document.getElementById('warning');

const setItem = () => {
    localStorage.setItem('searchValue', searchInput.value);
};
const setTimeOut = () => {
    warning.classList.remove('hidden');
    setTimeout(() => {
        warning.classList.add('hidden');
    }, 2000);
}
searchIcon.addEventListener('click', () => {
    if (searchInput.value.length >= 3) setItem();
    else setTimeOut();
})
searchIcon.addEventListener('click', () => {
    if (searchInput.value.length >= 3) window.location.href = '/search';
    else setTimeOut();
})
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (searchInput.value.length >= 3) setItem();
        else setTimeOut();
    }
})
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (searchInput.value.length >= 3) window.location.href = '/search';
        else setTimeOut();
    }
})

const url = 'https://myanimelist.p.rapidapi.com/manga/top/all';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '28516ad153msh236950bf701cfd9p1de487jsna737faac0962',
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
    }
};

(async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        loading.style.display = 'none';
        console.log(result);
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
        console.log(anchorArr);
        anchorArr.forEach((element) => {
            element.addEventListener('click', async (e) => {
                const currentId = e.currentTarget.id;
                console.log(e.currentTarget.id);
                const response = await fetch(`http://localhost:3000/topanimes`, {
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
})();

console.log('Hello from topanimes.js')