const btnAdd = document.querySelector('#btnAdd') as HTMLButtonElement;
const inputTitle = document.querySelector('#title') as HTMLInputElement;
const inputCost = document.querySelector('#cost') as HTMLInputElement;
const inputCurrency = document.querySelector('#currency') as HTMLInputElement;

const expenses = new Expenses('USD');

render();

btnAdd!.addEventListener('click', e => {
    if(inputTitle!.value !== '' && inputCost!.value !== '' && !isNaN(parseFloat(inputCost!.value))) {
        const title = inputTitle!.value;
        const cost:number = parseFloat(inputCost!.value);
        const currency:Currency = <Currency>(inputCurrency!.value);

        expenses.add({title:title, cost:{number:cost, currency:currency}});

        render();
    }else {
        alert('Fill in the data correctly');
    }
});

function render() {
    let html = '';

    expenses.getItems().forEach((item) => {
        const {id, title, cost} = item;
        const {number, currency} = cost;

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
            const id = (e.target as HTMLButtonElement).getAttribute('data-id');

            expenses.remove(parseInt(id!));

            render();
        })
    })
}

function $(selector:string):HTMLElement {
    return document.querySelector(selector) as HTMLElement;
}

function $$(selector:string):NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
}