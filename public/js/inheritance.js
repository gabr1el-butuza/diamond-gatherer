//TEMA CURS 4
class Person {
    constructor(options) {
        this.name = options.name;
    }

    canTalk() {
        return `${this.name} can talk!`;
    }

    canWalk() {
        return `${this.name} can walk!`;
    }
}

class Employee extends Person {
    constructor(options) {
        super(options);
        this.rank = options.rank;
        this.email = options.email;
        this.salary = options.salary;
    }

    getSalary() {
        return `${this.name} has salary: $${this.salary}`;
    }

    employeeRank() {
        return `The position of the employee is: ${this.rank}.`;
    }

    constactDetails() {
        return `Email : ${this.email}`;
    }

    print() {
        console.log(`${this.canTalk()}\n${this.canWalk()}\n${this.getSalary()}\n${this.employeeRank()}\n${this.constactDetails()}`);
    }
}

const propertiesEmp1 = {
    name: "Chuck Norris",
    rank: "ALL",
    email: "chuck_supreme@company.com",
    salary: "-"
};
const propertiesEmp2 = {
    name: "Elon Musk",
    rank: "Founder, CEO, CTO and chief designer of SpaceX, early investor, CEO and product architect of Tesla.",
    email: "elon.musky*_*@company.com",
    salary: "9.6 billion"
};

console.log("----- Emp1 -----");
const emp1 = new Employee(propertiesEmp1);
emp1.print();

console.log("----- Emp2 -----");
const emp2 = new Employee(propertiesEmp2);
emp2.print();


// TEMA 4.4  ****higher-order functions: map, sort, reduce, filter, forEach****
const arr = [1, -2, 6, -7, 10, 9, 14, true, false, null, undefined];
console.log("--- Tema 4 punctul 4 ---");
//1. Filtrati array-ul astfel incat sa obtineti doar valorile numerice.
let isNumber = nr => typeof nr === 'number';
let getNumbers = arr => (
    arr.filter(isNumber)
);
let numbersFromArr = getNumbers(arr)
console.log(numbersFromArr);
//2. Modificați array-ul rezultat înmulțind fiecare valoare cu 10.
let add = arr => (
    arr.map(val => val * 10)
);

//3. Afișați suma tuturor numerelor rezultate într-o variabila result.
let result = add(numbersFromArr);
console.log(result);