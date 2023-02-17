const url1 = `http://127.0.0.1:8000/perfume?perfume_list=perfume_list`
const perfumeList = []
/// This function returns a list of all perfumes for use in autocompletion.
getPerfumeName()


function getPerfumeName() {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open("GET", url1, true);
    ajaxRequest.getResponseHeader("Content-type", "application/json");
    ajaxRequest.onload = function () {
        hideSpinner();
        let obj = JSON.parse(this.response)
        let values = Object.values(obj)
        Array.prototype.push.apply(perfumeList, values);

    }
    ajaxRequest.send();

    /// Creating an autocomplete list
    let input = document.querySelector("#input")
    const perfumeSuggestions = document.querySelector(".list")
    input.addEventListener("keyup", (e) => {
        removeElements();
        for (let i of perfumeList) {
            if (
                i.toLowerCase().startsWith(input.value.toLowerCase()) &&
                input.value != ""

            ) {
                let listItem = document.createElement("li");
                listItem.classList.add("list-items");
                listItem.style.cursor = "pointer";
                let word = "<b>" + i.substr(0, input.value.length) + "</b>";
                word += i.substr(input.value.length);
                listItem.innerHTML = word;
                perfumeSuggestions.appendChild(listItem);

            }
        }
    });
    function hideSpinner() {
        if ($("#spinner").is(":visible")) { $("#spinner").hide() }
    }
    function removeElements() {
        //clear all the items
        let items = document.querySelectorAll(".list-items");
        items.forEach((item) => {
            item.remove();
        });
    }
    function useSuggestions(e) {

        input.value = e.target.innerText;
        input.focus();
        perfumeSuggestions.innerHTML = "";
        perfumeSuggestions.classList.remove("list-items")


    }
    perfumeSuggestions.addEventListener('click', useSuggestions);
    const form =
        document.querySelector("form")


};


/// listening for an event
form.addEventListener("submit", (e) => {
    e.preventDefault();

    var perfumeNameList = document.querySelector(".roundinput.icon1.p3")
    var perfumeName = perfumeNameList.value;
    let lowerCasePerf = []
    for (let perf of perfumeList) {
        lowerCasePerf.push(perf.toLowerCase())
    }
    if (!lowerCasePerf.includes(perfumeName.toLowerCase())) { alert("Oops! Your perfume smells too good to be true...in our list at least:)") }

    const url = `http://127.0.0.1:8000/perfume/${perfumeName}`
    ///This function returns the list of suggested perfumes
    getPerfumeList(url);
    /// Clearing the input form
    form.reset()


});








/// Let's create the function that submits input and renders the results
async function getPerfumeList(url) {
    const displayTable = document.querySelector("#displayResults")
    //Sending a GET Request
    let response = await fetch(url)
    // store the data in form of JSON
    var data = await response.json()
    var perfumeResults = []
    for (var i in data) perfumeResults.push(data[i]);
    perfumeSuggestionsTable();
    function perfumeSuggestionsTable() {

        let col = [];
        for (let i = 0; i < perfumeResults.length; i++) {
            for (let key in perfumeResults[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }

        }
        //creating a new table element and setting a class attribute

        const perfumeTable = document.createElement("table");
        perfumeTable.setAttribute("class", "perfumes_table_suggestion");
        // creating the header row
        let tr = perfumeTable.insertRow(-1);
        for (let i = 0; i < col.length; i++) {
            let th = document.createElement("th")
            th.innerHTML = col[i];
            tr.appendChild(th)
        }
        // adding the JSON Data as rows
        for (let i = 0; i < perfumeResults.length; i++) {
            tr = perfumeTable.insertRow(-1);
            for (let j = 0; j < col.length; j++) {
                let perfumeTableCell = tr.insertCell(-1);
                perfumeTableCell.innerHTML = perfumeResults[i][col[j]];
            }
        }
        // Hiding the poem and the informative popup once results are returned.
        if ($("#poem").is(":visible")) { $("#poem").hide() }
        if ($("#launcher").is(":visible")) { $("#launcher").hide() }
        displayTable.innerHTML = "";
        displayTable.appendChild(perfumeTable);




    };


}



















