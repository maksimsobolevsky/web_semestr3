function getArr() {
    const arr = arrInput.value.trim().split(' ');

    for (let i = 0; i < arr.length; i++)
    {
        arr[i] = +arr[i];
    }

    return arr;
}

function sort(arr) {
    for (let i = 0; i < arr.length - 1; i++)
     { 
        let min = i;
        for (let j = i + 1; j < arr.length; j++)
        {
            if (arr[j] < arr[min]) 
                min = j; 
        } 
       let t = arr[min]; 
       arr[min] = arr[i]; 
       arr[i] = t;
     }             

    return arr;
}

function minOfArr(arr) {
    let low = arr[0];
    for (let i = 1; i < arr.length; i++) {
        let num = arr[i];
        low = (low <= num) ? low : num;
    }
    return low;
}

function maxOfArr(arr) {
    let high = arr[0];
    for (let i = 1; i < arr.length; i++) {
        let num = arr[i];
        high = (high >= num) ? high : num;
    }
    return high;
}

function sumOfArr(arr) {
    let sum = 0;

    for (let i = 0; i < arr.length; i++)
    {
        sum += arr[i];
    }

    return sum;
}

const inputBtn = document.getElementById('input-btn'),
    arrInput = document.getElementById('arr-input'),
    sortResultValue = document.getElementById('sort-result-value'),
    maxResultValue = document.getElementById('max-result-value'),
    minResultValue = document.getElementById('min-result-value'),
    sumResultValue = document.getElementById('sum-result-value');

inputBtn.addEventListener('click', function() {
    const arr = getArr();
    sortResultValue.textContent = sort(arr);
    maxResultValue.textContent = maxOfArr(arr);
    minResultValue.textContent = minOfArr(arr);
    sumResultValue.textContent = sumOfArr(arr);
});