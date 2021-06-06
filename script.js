const errorMsg = document.getElementById('error_message');
const outputName = document.getElementById('output');
const input = document.getElementById('input_value');
const counter = document.getElementById('counter');
const isixhosaRadio = document.getElementById('isixhosa');
const englishRadio = document.getElementById('english');
const portugueseRadio = document.getElementById('portuguese');
const greetBtn = document.getElementById('greet_button');
const resetBtn = document.getElementById('reset_button');
const showGreetedBtn = document.getElementById('list_button');
const showGreeted = document.getElementById('show_greeted');
const showGreetedPara = document.createElement('p');
const outputPara = document.createElement('p');
const errorPara = document.createElement('p');


// Factory Function
const renderGreeting = (existingNames) => {

    let greetedNames = existingNames || {};

    const sayHello = (enteredName) => {

        const name = enteredName;
        const firstLetter = name[0].toUpperCase();
        const remaining = name.slice(1,).toLowerCase();
        const fullname = `${firstLetter}${remaining}`
    
        if(isixhosaRadio.checked){
            return `Molo, ${fullname}`;
        }

        if(englishRadio.checked){
            return `Hello, ${fullname}`
        }

        if(portugueseRadio.checked){
            return `Olá, ${fullname}`
        }
    }

    const uncheckedBtns = () => {
        isixhosaRadio.checked = false;
        englishRadio.checked = false;
        portugueseRadio.checked = false;
    }
    
    const emptyInput = () => "Please Enter Your Name!";
    
    const selectLanguage = () => "Please select a language!";

    const textOnly = () => "Please enter a name that only contains letters, not numbers.";

    const enterNameFirst = () => "Please enter a name in the text-box and select a language of your choice before viewing people greeted";
    
    const getCounter = () => Object.values(greetedNames).length;
    

    const getValues = () => Object.values(greetedNames);

    const clearMsg = () => null;

    const greeted = () => greetedNames;

    const addToObject = (enteredName) =>{
        const name = enteredName;
        const firstLetter = name[0].toUpperCase();
        const remaining = name.slice(1,).toLowerCase();
        const fullname = `${firstLetter}${remaining}`

        if(Object.values(greetedNames).includes(fullname)){
            errorPara.classList.add('error_paragraph');
            errorMsg.appendChild(errorPara);

            outputName.classList.add('output_paragraph');
            outputName.appendChild(outputPara);

            outputName.textContent = null;

            errorPara.textContent = 'You have already greeted this person';

            setTimeout(() => {
                errorPara.textContent = render.clearMsg();
            }, 4000)
           
            return;
        }
         
        greetedNames[sayHello(enteredName)] = fullname;
    } 
    const showAllGreeted = () => {
        return `You have greeted: ${getValues()}`;
    }

    return{
        sayHello,
        emptyInput,
        textOnly,
        clearMsg,
        uncheckedBtns,
        selectLanguage,
        getCounter,
        addToObject,
        getValues,
        showAllGreeted,
        greeted,
        enterNameFirst,
    }
}

// DOM

let greetedNames;

const render = renderGreeting(greetedNames);

greetBtn.addEventListener('click', () =>{
    outputName.classList.add('output_paragraph');
    outputName.appendChild(outputPara);

    errorPara.classList.add('error_paragraph');
    errorMsg.appendChild(errorPara);

    if(input.value){
        render.addToObject(input.value)
        outputPara.textContent = render.sayHello(input.value);
   
        setTimeout(() => {
            outputPara.textContent = render.clearMsg()
        }, 4000)

    }else{
        setTimeout(() => {
            errorPara.textContent = render.clearMsg();
        }, 4000)
       
        errorPara.textContent = render.emptyInput();
    }

    // Other Error messages

    if(isixhosaRadio.checked === false && englishRadio.checked === false && portugueseRadio.checked === false){
        setTimeout(() => {
            errorPara.textContent = render.clearMsg();
        }, 4000)
        errorPara.textContent = render.selectLanguage();
        outputName.textContent = null;
    }

    if(input.value.match(/[0-9]/)){
        setTimeout(() => {
            errorPara.textContent = render.clearMsg();
        }, 4000)
        errorPara.textContent = render.textOnly();
        outputName.textContent = null;
    }

    counter.textContent = render.getCounter();
    render.uncheckedBtns();
    input.value= null;

})

resetBtn.addEventListener('click', () =>{
    localStorage.clear();
    location.reload();
})

showGreetedBtn.addEventListener('click', () =>{
    outputName.classList.add('output_paragraph');
    outputName.appendChild(outputPara);

    errorPara.classList.add('error_paragraph');
    errorMsg.appendChild(errorPara);

    showGreeted.appendChild(showGreetedPara);
     
    if(render.getCounter() > 0){
    showGreetedPara.textContent = render.showAllGreeted();
    }else{
    errorPara.textContent  = render.enterNameFirst();
    }

    setTimeout(() => {
        showGreetedPara.textContent = render.clearMsg()
    }, 4000)
    setTimeout(() => {
        errorPara.textContent = render.clearMsg()
    }, 4000)
})