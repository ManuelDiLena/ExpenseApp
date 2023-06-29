type Currency = 'EUR' | 'USD';

interface Price {
    number:number,
    currency:Currency
}

interface ExpenseItem {
    id:number,
    title:string,
    cost:Price
}

interface IExpenses {
    expenses:ArrayList<ExpenseItem>,
    finalCurrency:Currency,
    add(item:ExpenseItem):boolean,
    get():ExpenseItem|null,
    getTotal():string,
    remove(id:number):boolean
}

class ArrayList<T> {
    private items:T[];

    constructor() {
        this.items = [];
    }

    add(item:T):void {
        this.items.push(item);
    }

    get(index:number):T|null {
        const item:T[] = this.items.filter((x:T, i:number) => {
            return i === index;
        });

        if(item.length === 0) {
            return null;
        }else {
            return item[0];
        }
    }
}

class Expenses {

}