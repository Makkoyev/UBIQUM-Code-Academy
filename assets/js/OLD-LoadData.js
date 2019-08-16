const url = `https://api.propublica.org/congress/v1/113/senate/members.json`; // SENATE OR HOUSE ${type}


function fetchSenateAPI() {
    fetch(url, {
            method: "GET",
            headers: {
                'X-API-Key': '2VpGVQrEodHgSlKxaOdIhIwh9UWtKcGh9K2fRfAL'
            }
        }).then(response => response.json())
        .then(data => {
            let members = data.results['0'].members;
            let states = [];
            let table = document.getElementById('table');
            let stateSelect = document.getElementById("selector");
            members.forEach(member => {
                fullName = function () {
                    if (member.middle_name == null) {
                        return fullName = `${member.first_name} ${member.last_name}`;
                    } else {
                        return fullName = `${member.first_name} ${member.middle_name} ${member.last_name}`;
                    }
                }
                //console.log(member);
                table.innerHTML += `<tr><td> ${fullName()} </td><td> ${member.party} </td><td> ${member.state} </td><td> ${member.seniority} </td><td> ${member.votes_with_party_pct} </td></tr>`
                states.push(member.state);
            })
            unique = [...new Set(states)].sort().forEach(state => {
                stateSelect.innerHTML += `<option>${state}</option>`
            });
        })
        .catch(err => console.log(err));
}

function createTable() {
    let table = document.getElementById('table');
    fullName = function () {
        if (member.middle_name == null) {
            return fullName = `${member.first_name} ${member.last_name}`;
        } else {
            return fullName = `${member.first_name} ${member.middle_name} ${member.last_name}`;
        }
    }
    table.innerHTML += `<tr><td> ${fullName()} </td><td> ${member.party} </td><td> ${member.state} </td><td> ${member.seniority} </td><td> ${member.votes_with_party_pct} </td></tr>`
}

function filterByState() {
    var statesDropdown = document.getElementById('selector');
    var value = statesDropdown[statesDropdown.selectedIndex].value;
    let filterState = members.filter(member => member.state === value);
    if (value === "ALL") {
        return members;
    } else {
        return filterState;
    }
}

function filterByGov() {
    let checkedBoxes = Array.from(document.querySelectorAll('input[name=party]:checked'));
    let filterParty = members.filter(member => checkedBoxes.includes(member.party));
    if (checkedBoxes.length === 0) {
        return members;
    } else {
        return filterParty;
    }
}

function createSelector() {

}

function updateTable() {
    let table = document.getElementById('table');
    table.innerHTML = '';
    let checkedBoxes = Array.from(document.querySelectorAll('input[name=party]:checked')).values;
    var selector = document.getElementById('selector');
    var value = selector[selector.selectedIndex].value;

    console.log(value);

    //FETCH
    fetch(url, {
        method: "GET",
        headers: {
            'X-API-Key': '2VpGVQrEodHgSlKxaOdIhIwh9UWtKcGh9K2fRfAL'
        }
    }).then(response => response.json())
    .then(data => {
        let members = data.results['0'].members;
        //var filtredByState = members.filter(member => member.state === value);
        var filtredByParty = members.filter(member => cbsValues.includes(member.party));
        //console.log(filtredByState);
        console.log(filtredByParty);
    })
    .catch(err => console.log(err));
}



fetchSenateAPI();




var stateFilter = document.getElementById('selector');
var cbs = document.querySelectorAll('input[type=checkbox]');
var cbsValues = [];
var selectedCheck = [...new Set(cbsValues)];
cbs.forEach((element, i) => {
    element.addEventListener('change', function () {
        if (this.checked) {
            console.log('Checkbox Checked', this.value, i)
            selectedCheck.push(this.value);
        } else {
            console.log('Non checked', this.value, i)
            selectedCheck.splice(i, 1);
        }
        updateTable();
        console.log(selectedCheck);
        
    })
})
stateFilter.addEventListener('change', function () {
    console.log(this.value);
    updateTable();
})