"use strict";
const btnAdd = document.querySelector('#btnAdd');
const inputTitle = document.querySelector('#title');
const inputCost = document.querySelector('#cost');
const inputCurrency = document.querySelector('#currency');
const expenses = new Expenses('USD');
btnAdd.addEventListener('click', e => {
    if (inputTitle.value !== '' && inputCost.value !== '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = parseFloat(inputCost.value);
        const currency = (inputCurrency.value);
        expenses.add({ title: title, cost: { number: cost, currency: currency } });
        render();
    }
    else {
        alert('Fill in the data correctly');
    }
});
function render() {
    let html = '';
    expenses.getItems().forEach((item) => {
        const { id, title, cost } = item;
        const { number, currency } = cost;
        html += `
            <div class="item">
                <div><span class="currency">${currency}</span> ${number}</div>
                <div>${title}</div>
                <div><button class="btnRemove" data-id="${id}">Remove</button></div>
            </div>
        `;
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.btnRemove').forEach(btnRemove => {
        btnRemove.addEventListener('click', e => {
            const id = e.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
