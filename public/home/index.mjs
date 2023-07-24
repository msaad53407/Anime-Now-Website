console.log("Hello from main.js");
const searchIcon = document.getElementById("searchIcon"),
    searchInput = document.getElementById("searchInput"),
    warning = document.getElementById("warning");

const setItem = () => {
    localStorage.setItem("searchValue", searchInput.value);
};
/*
*/
const setTimeOut = () => {
    warning.classList.remove("hidden");
    setTimeout(() => {
        warning.classList.add("hidden");
    }, 2000);
};
searchIcon.addEventListener("click", () => {
    if (searchInput.value.length >= 3) setItem();
    else setTimeOut();
});
searchIcon.addEventListener("click", () => {
    if (searchInput.value.length >= 3) window.location.href = "/search";
    else setTimeOut();
});
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        if (searchInput.value.length >= 3) setItem();
        else setTimeOut();
    }
});
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        if (searchInput.value.length >= 3) window.location.href = "/search";
        else setTimeOut();
    }
});
