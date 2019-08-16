// Fetch data based on page name
if (window.location.href.includes("senate") == true) {
    var url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else {
    var url = "https://api.propublica.org/congress/v1/113/house/members.json" 
}

function loadData(){

    fetch(url,{ headers:{
        "x-api-key": "2VpGVQrEodHgSlKxaOdIhIwh9UWtKcGh9K2fRfAL"
    }})
    .then(response => response.json())
    .then(data =>{
        let members = data.results["0"].members;
        document.getElementById("selector").innerHTML = createStateMenu(members);
        document.getElementById("checkboxes").addEventListener("click", function(){updateTable(members)});
        document.getElementById("selector").addEventListener("change", function(){updateTable(members)});
        updateTable(members);
    })  
    .catch(err => console.log(err));
}


//Create State Dropdown Menu:
function createStateMenu(members){
    let states = members.map(member => member.state).sort();
    let selectedDefault = `<option value="default"> Filter by State: </option>`;
    let unique = [...new Set(states)].forEach(state => {
        const selectedState =`<option value=`+ state + `>`+ state +`</option>`;
        selectedDefault += selectedState;
    })
    return selectedDefault;   


}

//Filter by checkboxes:
function filterByParty(members){
    let checkedBoxes = Array.from(document.querySelectorAll('input[name=party]:checked')).map(checkbox => checkbox.value);
    let filterParty = members.filter(member => checkedBoxes.includes(member.party));
    if (checkedBoxes.length === 0) {return members;}
    else {return filterParty;}
}

//Filter by Dropdown Menu:
function filterByState(members){
    var selector = document.getElementById('selector');
    var value= selector[selector.selectedIndex].value;
    let filterState = members.filter (member => member.state === value);
    if (value === "default"){return members;}
    else {return filterState;}
}

//Create table:
function createTable(members){
    var tableHTML =[];
    for (const member of members) {
        const rowHTML = 
        `<tr> <td><a href="${member.url}">${member.first_name} ${member.middle_name || ""} ${member.last_name}</a></td>
        <td>${member.party}</td>
        <td> ${member.state}</td>
        <td>${member.seniority}</td>
        <td>${member.votes_with_party_pct}% </td></tr>`;
        tableHTML += rowHTML;
    }
    document.getElementById("table").innerHTML = tableHTML;
}

function updateTable(members){
    var filterParty = filterByParty(members);
    var filterState = filterByState(filterParty);
    var filterResults = filterState;
    if (filterResults === 0) {createTable(members);}
    else {createTable(filterResults);}      
}

loadData()