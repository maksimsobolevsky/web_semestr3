class Student
{
    #firstName = '';
    #lastName = '';
    #age = 0;
    #averageMark = 0;

    constructor(firstName, lastName, age, averageMark)
    {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#age = age;
        this.#averageMark = averageMark;
    }

    get getFirstName() { return this.#firstName; }
    get getLastName() { return this.#lastName; }
    get getAge() { return this.#age; }
    get getAverageMark() { return this.#averageMark; }

    createTD(className, content)
    {
        const td = document.createElement('td');
        td.className = className;
        td.textContent = content;
        return td;
    }

    fillTable = (order) => {
        const tr = document.getElementsByTagName('tr')[order + 1];
        tr.appendChild(this.createTD('first-name', this.getFirstName));
        tr.appendChild(this.createTD('last-name', this.getLastName));
        tr.appendChild(this.createTD('age', this.getAge));
        tr.appendChild(this.createTD('average-mark', this.getAverageMark));
    }
}

getAverageMark = (n) => {
    let markSum = 0;

    for (let i = 0; i < n; i++)
    {
        const mark = document.getElementsByClassName('average-mark')[i];
        markSum += +mark.textContent;
    }

    let totalAverageMark = Math.round((markSum / n) * 100) / 100 ;
    return totalAverageMark;
}

const n = 3;

let firstNames = ['Alexander', 'Ivan', 'Petr'];
let lastNames = ['Alexandrov', 'Ivanov', 'Petrov'];
let ages = [18, 19, 23];
let averageMarks = [8.0, 9.5, 6.75];

let Students = [];

for (let i = 0; i < n; i++)
{
    Students.push(new Student(firstNames[i], lastNames[i], ages[i], averageMarks[i]));
    Students[i].fillTable(i);
}

const textArea = document.createElement('span');
textArea.textContent = 'Average mark of all the student equals ' + getAverageMark(n);
document.getElementById('text-content').appendChild(textArea);
