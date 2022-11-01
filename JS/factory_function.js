const renderGreeting = (existingNames) => {
  let greetedNames = existingNames || {};

  const capitalizedName = (enteredName) => {
    const firstLetter = enteredName[0].toUpperCase();
    const remaining = enteredName.slice(1).toLowerCase();
    const fullname = `${firstLetter}${remaining}`;
    return fullname;
  };

  const sayHello = (enteredName) => {
    if (isixhosaRadio.checked) {
      return `Molo, ${capitalizedName(enteredName)}`;
    } else if (englishRadio.checked) {
      return `Hello, ${capitalizedName(enteredName)}`;
    } else if (portugueseRadio.checked) {
      return `Olá, ${capitalizedName(enteredName)}`;
    }
  };

  const uncheckedBtns = () => {
    isixhosaRadio.checked = false;
    englishRadio.checked = false;
    portugueseRadio.checked = false;
  };

  const emptyInput = () => "Please Enter Your Name!";
  const selectLanguage = () => "Please select a language!";
  const textOnly = () =>
    "Please enter a name that only contains letters, not numbers!";
  const enterNameFirst = () =>
    "Please enter a name in the text-box and select a language of your choice before viewing people greeted!";
  const greetOnce = () => "Greet the person once!";
  const uniqueNames = () =>
    getGreetedNames().filter(
      (name, index) => getGreetedNames().indexOf(name) === index
    );
  const getCounter = () => Object.values(uniqueNames()).length;
  const getGreetedNames = () => Object.values(greetedNames);
  const clearMsg = () => null;

  const addName = (enteredName) =>
    (greetedNames[sayHello(enteredName)] = capitalizedName(enteredName));

  const showAllGreeted = () => {
    return `${uniqueNames()}`;
  };

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
    capitalizedName,
    greetOnce,
    uniqueNames,
  };
};
