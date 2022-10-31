const errorMsg = document.getElementById('error__message');
const correctMsg = document.getElementById('correct__message');
const input = document.getElementById('input__value');
const counter = document.getElementById('counter');
const isixhosaRadio = document.getElementById('isixhosa');
const englishRadio = document.getElementById('english');
const portugueseRadio = document.getElementById('portuguese');
const greetBtn = document.getElementById('greet__button');
const resetBtn = document.getElementById('reset__button');
const showGreetedBtn = document.getElementById('list__button');
const showGreeted = document.getElementById('show__greeted');
const showGreetedPara = document.createElement('p');
const correctHeading = document.createElement('h3');
const errorHeading = document.createElement('h3');

// Factory Function
const renderGreeting = (existingNames) => {

    let greetedNames = existingNames || {};

    const capitalizedName = (enteredName) => {
        const firstLetter = enteredName[0].toUpperCase();
        const remaining = enteredName.slice(1,).toLowerCase();
        const fullname = `${firstLetter}${remaining}`
        return fullname;
    }

    const sayHello = (enteredName) => {
        if (isixhosaRadio.checked) {
            return `Molo, ${capitalizedName(enteredName)}`;
        }else if (englishRadio.checked) {
            return `Hello, ${capitalizedName(enteredName)}`
        }else if (portugueseRadio.checked) {
            return `Olá, ${capitalizedName(enteredName)}`
        }
    }

    const uncheckedBtns = () => {
        {isixhosaRadio.checked, englishRadio.checked, portugueseRadio.checked}  false;
    }

    const emptyInput = () => "Please Enter Your Name!";
    const selectLanguage = () => "Please select a language!";
    const textOnly = () => "Please enter a name that only contains letters, not numbers.";
    const enterNameFirst = () => "Please enter a name in the text-box and select a language of your choice before viewing people greeted";
    const getCounter = () => Object.values(greetedNames).length;
    const getGreetedNames = () => Object.values(greetedNames);
    const clearMsg = () => null;

    const addName = (enteredName) => {
        if (Object.values(greetedNames).includes(capitalizedName(enteredName))) {
            // errorPara.classList.add('error__message');
            // errorMsg.appendChild(errorPara);

            // correctMsg.classList.add('correct__message');
            // correctMsg.appendChild(correctPara);

            errorPara.textContent = 'Greet the person once!';

            setTimeout(() => {
                errorPara.textContent = render.clearMsg();
            }, 4000)

            return;
        }

        greetedNames[sayHello(enteredName)] = capitalizedName(enteredName);
    }
    const showAllGreeted = () => {
        return `You have greeted: ${getGreetedNames()}`;
    }

    return {
        sayHello,
        emptyInput,
        textOnly,
        clearMsg,
        uncheckedBtns,
        selectLanguage,
        getCounter,
        addName,
        getGreetedNames,
        showAllGreeted,
        enterNameFirst,
    }
}

// DOM

let greetedNames;

const render = renderGreeting(greetedNames);

greetBtn.addEventListener('click', () => {
    correctMsg.classList.add('correct__message');
    correctMsg.appendChild(correctHeading);

    // errorPara.classList.add('error__message');
    // errorMsg.appendChild(errorPara);

    if (input.value) {
        if (isixhosaRadio.checked || englishRadio.checked || portugueseRadio.checked) {
            if (!input.value.match(/[0-9]/)){
                render.addName(input.value)
                correctHeading.textContent = render.sayHello(input.value);
                counter.textContent = render.getCounter();

                setTimeout(() => {
                    correctHeading.textContent = render.clearMsg()
                }, 4000)
            }
        }

    } else {
        setTimeout(() => {
            errorHeading.textContent = render.clearMsg();
        }, 4000)

        errorHeading.textContent = render.emptyInput();
    }

    // Other Error messages

    if (isixhosaRadio.checked === false && englishRadio.checked === false && portugueseRadio.checked === false) {
        setTimeout(() => {
            errorHeading.textContent = render.clearMsg();
        }, 4000)
        errorHeading.textContent = render.selectLanguage();
        input.value = null;
        return;
    }

    if (input.value.match(/[0-9]/)) {
        setTimeout(() => {
            errorHeading.textContent = render.clearMsg();
        }, 4000)
        errorHeading.textContent = render.textOnly();
        render.uncheckedBtns();
        input.value = null;
        return;
    }

    render.uncheckedBtns();
    input.value = null;
})

resetBtn.addEventListener('click', () => {
    location.reload();
})

showGreetedBtn.addEventListener('click', () => {
    correctMsg.classList.add('output_paragraph');
    correctMsg.appendChild(correctHeading);

    errorHeading.classList.add('error_paragraph');
    errorMsg.appendChild(errorHeading);

    showGreeted.appendChild(showGreetedPara);

    if (render.getCounter() > 0) {
        showGreetedPara.textContent = render.showAllGreeted();
    } else {
        errorHeading.textContent = render.enterNameFirst();
    }

    setTimeout(() => {
        showGreetedPara.textContent = render.clearMsg()
    }, 4000)
    setTimeout(() => {
        errorHeading.textContent = render.clearMsg()
    }, 4000)
})