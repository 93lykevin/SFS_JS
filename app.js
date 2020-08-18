function getData() {
    fetch("https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json")
        .then((res) => res.json())
        .then((data) => appendData(data))
        .catch((err) => console.log(err));
}

getData();

function appendData(data) {
    let tbody = document.getElementById("table-body");
    for (let i = 0; i < data.length; i++) {
        let tr = document.createElement("tr");
        tr.setAttribute("class", "table-row");
        let chkbx = document.createElement("input");
        chkbx.setAttribute("type", "checkbox");
        chkbx.setAttribute("checked", true);
        chkbx.setAttribute("class", "checkbox");
        let td0 = document.createElement("td");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        td5.setAttribute("class", "balance");
        td1.innerHTML = data[i].creditorName;
        td2.innerHTML = data[i].firstName;
        td3.innerHTML = data[i].lastName;
        td4.innerHTML = formatPercentage(data[i].minPaymentPercentage) + "%";
        td5.innerHTML = data[i].balance;
        td0.appendChild(chkbx);
        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
    }
}

function formatPercentage(num) {
    return num.toFixed(2);
}

document.getElementById("add-debt").addEventListener("click", (e) => {
    e.preventDefault();
    let tbody = document.getElementById("table-body");
    let tr = document.createElement("tr");
    tr.setAttribute("class", "table-row");
    let chkbx = document.createElement("input");
    chkbx.setAttribute("type", "checkbox");
    chkbx.setAttribute("checked", true);
    chkbx.setAttribute("class", "checkbox");
    let td0 = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    td1.innerHTML = "Navy FCU";
    td5.innerHTML = "3000";
    td0.appendChild(chkbx);
    tr.appendChild(td0);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tbody.appendChild(tr);

    sum();
    countRows();
});

document.getElementById("remove-debt").addEventListener("click", (e) => {
    let tbody = document.getElementById("table-body");
    tbody.removeChild(tbody.lastChild);

    sum();
    countRows();
});

document.getElementById("check-all").addEventListener("change", (e) => {
    if (e.target.checked) {
        e.target.checked = true;
        let checkboxes = document.getElementsByClassName("checkbox");
        for (let checkbox of checkboxes) {
            checkbox.checked = true;
        }
    } else {
        e.target.checked = false;
        let checkboxes = document.getElementsByClassName("checkbox");
        for (let checkbox of checkboxes) {
            checkbox.checked = false;
        }
    }
    countRows();
});

function sumAll() {
    let sum = 0;
    let balances = document.getElementsByClassName("balance");
    for (let balance of balances) {
        sum += parseInt(balance.innerHTML);
    }
    document.getElementById("sum").innerHTML = "$" + sum;
}

function sum() {
    let sum = 0;
    let rows = document.getElementsByClassName("table-row");
    for (let row of rows) {
        if (row.firstChild.firstChild.checked) {
            sum += parseInt(row.lastChild.innerHTML);
        }
    }
    document.getElementById("sum").innerHTML = "$" + sum;
}

document.addEventListener("DOMContentLoaded", (e) => {
    setTimeout(cb, 50); // to wait for the DOM to be loaded

    function cb() {
        sumAll();

        let checkboxes = document.getElementsByClassName("checkbox");
        for (let checkbox of checkboxes) {
            checkbox.addEventListener("change", () => {
                sum();
                countRows();
            });
        }
        document.getElementById("check-all").addEventListener("change", () => {
            const checkAll = document.getElementById("check-all");
            if (checkAll.checked) {
                sumAll();
            } else {
                document.getElementById("sum").innerHTML = "$0";
            }
        });

        countRows();
    }
});

function countRows() {
    let rows = document.querySelectorAll(".table-row");
    document.getElementById("row-count").innerHTML = "Row Count: " + rows.length;

    let checkedCount = 0;
    let checkboxes = document.getElementsByClassName("checkbox");
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            checkedCount += 1;
        }
    }
    document.getElementById("checked-count").innerHTML = "Checked Row Count: " + checkedCount;
}
