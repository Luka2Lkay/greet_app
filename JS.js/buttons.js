
let greetedNames;

const render = renderGreeting(greetedNames);

greetBtn.addEventListener("click", () => {
  correctMsg.classList.add("correct__message");
  correctMsg.appendChild(correctHeading);

  errorHeading.classList.add("error__message");
  errorMsg.appendChild(errorHeading);

  if (input.value) {
    if (
      isixhosaRadio.checked ||
      englishRadio.checked ||
      portugueseRadio.checked
    ) {
      if (!input.value.match(/[0-9]/)) {
        render.addName(input.value);

        const repeatedNames = render.getGreetedNames().filter((item, index) => {
          return render.getGreetedNames().indexOf(item) !== index;
        });

        if (repeatedNames.includes(render.capitalizedName(input.value))) {
          errorHeading.textContent = render.greetOnce();
          render.uncheckedBtns();
          input.value = null;

          setTimeout(() => {
            errorHeading.textContent = render.clearMsg();
          }, 4000);
          return;
        } else {
          const uniqueNames = render.getGreetedNames().filter((name, index) => {
            const seen = {}
            return render.getGreetedNames().indexOf(name) ===index
          })
          console.log(uniqueNames)
          correctHeading.textContent = render.sayHello(input.value);
          counter.textContent = render.getCounter();
        }
        setTimeout(() => {
          correctHeading.textContent = render.clearMsg();
        }, 4000);
      }
    }
  } else {
    errorHeading.textContent = render.emptyInput();
    setTimeout(() => {
      errorHeading.textContent = render.clearMsg();
    }, 4000);
  }

  if (
    isixhosaRadio.checked === false &&
    englishRadio.checked === false &&
    portugueseRadio.checked === false
  ) {
    setTimeout(() => {
      errorHeading.textContent = render.clearMsg();
    }, 4000);
    errorHeading.textContent = render.selectLanguage();
    input.value = null;
    return;
  }

  if (input.value.match(/[0-9]/)) {
    setTimeout(() => {
      errorHeading.textContent = render.clearMsg();
    }, 4000);
    errorHeading.textContent = render.textOnly();
    render.uncheckedBtns();
    input.value = null;
    return;
  }
  render.uncheckedBtns();
  input.value = null;
});

resetBtn.addEventListener("click", () => {
  location.reload();
});

showGreetedBtn.addEventListener("click", () => {
  correctHeading.classList.add("correct__message");
  correctMsg.appendChild(correctHeading);

  errorHeading.classList.add("error__message");
  errorMsg.appendChild(errorHeading);

  showGreeted.appendChild(showGreetedPara);

  if (render.getCounter() > 0) {
    showGreetedPara.textContent = render.showAllGreeted();
  } else {
    errorHeading.textContent = render.enterNameFirst();
  }

  setTimeout(() => {
    showGreetedPara.textContent = render.clearMsg();
  }, 4000);
  setTimeout(() => {
    errorHeading.textContent = render.clearMsg();
  }, 4000);
});
