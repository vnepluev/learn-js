import start from "./modules/start.js";
import getFormPerson from "./modules/formPerson.js";
import readyPlain from "./modules/readyPlain.js";
import getData from "./service/getTour.js";

const init = async (selectorApp, title) => {
  const app = document.querySelector(selectorApp);
  const data = await getData();
  const { main, firstForm, h1 } = start(app, title, data);

  firstForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const tourData = data.find((tour) => tour.id === firstForm.tour.value);
    h1.textContent = tourData.tour;

    const forms = getFormPerson(firstForm.count.value);
    firstForm.remove();

    main.append(...forms);
    readyPlain(forms, main, tourData);
  });
};

init(".app", "Выберите тур");
