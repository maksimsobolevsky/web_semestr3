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

    toJson()
    {
        return {
            firstName: this.#firstName,
            lastName: this.#lastName,
            age: this.#age,
            averageMark: this.#averageMark,
        };
    }

    writeIntoTable = (order) => {
        const tr = document.createElement('tr');
        document.getElementsByTagName('table')[0].appendChild(tr);
        tr.appendChild(this.createTD('first-name', this.getFirstName));
        tr.appendChild(this.createTD('last-name', this.getLastName));
        tr.appendChild(this.createTD('age', this.getAge));
        tr.appendChild(this.createTD('average-mark', this.getAverageMark));

        let editBtn = document.createElement("td");
        editBtn.className = 'btn';
        editBtn.textContent = "Edit";
        editBtn.addEventListener('click', (e) => {
            studentToEdit = Students.find(x => x.getLastName == this.getLastName);
            document.querySelector('.add_first_name').value = studentToEdit.getFirstName;
            document.querySelector('.add_second_name').value = studentToEdit.getLastName;
            document.querySelector('.add_age').value = studentToEdit.getAge;
            document.querySelector('.add_average_mark').value = studentToEdit.getAverageMark;
            document.querySelector('.add__row--btn').textContent = 'Save';
            
        });
        tr.appendChild(editBtn);
    
        let btn = document.createElement("td");
        btn.className = 'btn';
        btn.textContent = "Delete";
        btn.addEventListener('click', (e) => {
            let index = Students.findIndex(x => x.getLastName == this.getLastName);
            Students.splice(index, 1);
            tr.remove();
            updateAverage();
            saveData();
        });
        tr.appendChild(btn);
    }
}

getAverageMarkFromTable = () => {
    let sum = 0;

    for (let i = 0; i < Students.length; i++) {
        const mark = document.getElementsByClassName('average-mark')[i];
        sum += +mark.textContent;
    }

    let totalAverageMark = Math.round((sum / Students.length) * 100) / 100 ;
    return totalAverageMark;
}

const getData = () => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/json', false);
    xhr.send();
    if (xhr.status != 200) {
        alert( xhr.status + ': ' + xhr.statusText );
    };
    const obj = JSON.parse(xhr.responseText);
    return obj;
};

const saveData = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/json', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(Students.map(s => s.toJson())));
};

const obj = getData();

let Students = [];
let studentToEdit = null;

for (let i = 0; i < obj.length; i++)
{
    const student = new Student(obj[i].firstName, obj[i].lastName, obj[i].age, obj[i].averageMark);
    Students.push(student);
    student.writeIntoTable(i);
}

const textArea = document.createElement('span');
textArea.textContent = 'Average mark of all the student equals ' + getAverageMarkFromTable();
document.getElementById('text-content').appendChild(textArea);

const updateAverage = () => {
    textArea.textContent = 'Average mark of all the student equals ' + getAverageMarkFromTable();
}

const clearForm = () => {
    document.querySelector('.add_first_name').value = '';
    document.querySelector('.add_second_name').value = '';
    document.querySelector('.add_age').value = '';
    document.querySelector('.add_average_mark').value = '';
    document.querySelector('.add__row--btn').textContent = 'Add row';
};

const addButton = document.querySelector('.add__row--btn');
addButton.addEventListener('click', () => {
    const firstNameFromInput = document.querySelector('.add_first_name').value;
    const secondNameFromInput = document.querySelector('.add_second_name').value;
    const ageFromInput = document.querySelector('.add_age').value;
    const averageMarkFromInput = document.querySelector('.add_average_mark').value;
    const student = new Student(firstNameFromInput, secondNameFromInput, ageFromInput, averageMarkFromInput)

    if (studentToEdit)
    {
        let index = Students.findIndex(x => x.getLastName == studentToEdit.getLastName);
        Students[index] = student;
        const row = document.getElementsByTagName('tr')[index + 1];
        row.children[0].textContent = student.getFirstName;
        row.children[1].textContent = student.getLastName;
        row.children[2].textContent = student.getAge;
        row.children[3].textContent = student.getAverageMark;
    }
    else
    {
        Students.push(student);
        student.writeIntoTable(Student.length);
    }
    clearForm();
    saveData();
    updateAverage();
});
