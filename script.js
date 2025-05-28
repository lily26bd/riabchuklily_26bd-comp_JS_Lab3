document.addEventListener('DOMContentLoaded', () => {
   
    const contentX = document.querySelector('.content-x');
    const contentY = document.querySelector('.content-y');
    const task2Btn = document.getElementById('task2Btn');
    const task3Btn = document.getElementById('task3Btn');
    const task4Btn = document.getElementById('task4Btn');
    const block3 = document.querySelector('.block-3');
  
    task2Btn.addEventListener('click', () => {
        const tempContent = contentX.innerHTML;
        contentX.innerHTML = contentY.innerHTML;
        contentY.innerHTML = tempContent;
        alert('Контент полів "x" та "y" поміняно місцями!');
    });
  
  
    task3Btn.addEventListener('click', () => {
       
        const existingFields = block3.querySelector('.task3-fields');
        const existingResult = block3.querySelector('.task3-result');
        if (existingFields) existingFields.remove();
        if (existingResult) existingResult.remove();
  
        const formDiv = document.createElement('div');
        formDiv.classList.add('task3-fields');
        formDiv.innerHTML = `
            <label for="radiusInput">Введіть радіус кола:</label>
            <input type="number" id="radiusInput" step="any" placeholder="Наприклад, 10.5">
            <button id="calculateAreaBtn">Обчислити площу</button>
        `;
        block3.appendChild(formDiv);
  
        const calculateAreaBtn = document.getElementById('calculateAreaBtn');
        calculateAreaBtn.addEventListener('click', () => {
            const radiusInput = document.getElementById('radiusInput');
            const radius = parseFloat(radiusInput.value);
  
            if (isNaN(radius) || radius <= 0) {
                alert('Будь ласка, введіть коректний позитивний радіус.');
                return;
            }
  
            const area = Math.PI * Math.pow(radius, 2);
  
            const resultP = document.createElement('p');
            resultP.classList.add('task3-result');
            resultP.textContent = `Площа кола з радіусом ${radius} дорівнює: ${area.toFixed(2)}`;
  
            const currentResult = block3.querySelector('.task3-result');
            if (currentResult) {
                currentResult.replaceWith(resultP);
            } else {
                block3.appendChild(resultP);
            }
        });
    });

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
  
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
  
    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999; path=/';
    }
  
    const maxNumbersCookieName = 'maxNumbersResult';
  
    const savedResult = getCookie(maxNumbersCookieName);
    if (savedResult) {
        const confirmDelete = confirm(`В куках знайдена інформація: ${savedResult}. Бажаєте видалити ці дані з куків?`);
        if (confirmDelete) {
            
            eraseCookie(maxNumbersCookieName);
            alert('Дані з куків видалено. Сторінка буде перезавантажена.');
            window.location.reload(); 
        } else {
          
            alert('Дані в куках залишаються. Якщо ви бажаєте ввести нові дані, перезавантажте сторінку.');
         
            task4Btn.classList.add('hidden');
        }
    }
  
    task4Btn.addEventListener('click', () => {
    
        if (getCookie(maxNumbersCookieName) && !task4Btn.classList.contains('hidden')) {
             alert('Дані в куках вже існують. Будь ласка, перезавантажте сторінку, щоб видалити їх і ввести нові дані.');
             return;
        }
        const existingForm = block3.querySelector('.task4-form');
        const existingResult = block3.querySelector('.task4-result');
        if (existingForm) existingForm.remove();
        if (existingResult) existingResult.remove();
  
        const formDiv = document.createElement('div');
        formDiv.classList.add('task4-form');
        let formHTML = '<h3>Введіть 10 чисел:</h3>';
        for (let i = 0; i < 10; i++) {
            formHTML += `
                <div class="input-group">
                    <label for="num${i}">${i + 1}.</label>
                    <input type="number" id="num${i}" step="any">
                </div>
            `;
        }
        formHTML += `<button id="calculateMaxBtn">Визначити максимальні</button>`;
        formDiv.innerHTML = formHTML;
        block3.appendChild(formDiv);
  
        const calculateMaxBtn = document.getElementById('calculateMaxBtn');
        calculateMaxBtn.addEventListener('click', () => {
            const numbers = [];
            for (let i = 0; i < 10; i++) {
                const inputElement = document.getElementById(`num${i}`);
                const value = parseFloat(inputElement.value);
                if (isNaN(value)) {
                    alert(`Будь ласка, введіть коректне число в поле ${i + 1}.`);
                    return;
                }
                numbers.push(value);
            }
  
            if (numbers.length === 0) {
                alert('Необхідно ввести числа.');
                return;
            }
  
            const maxNumber = Math.max(...numbers);
            const maxCount = numbers.filter(num => num === maxNumber).length;
  
            const resultText = `Максимальне число: ${maxNumber}, Кількість його входжень: ${maxCount}.`;
  
            alert(resultText); 
            setCookie(maxNumbersCookieName, resultText, 7); 
        });
    });
  
  });