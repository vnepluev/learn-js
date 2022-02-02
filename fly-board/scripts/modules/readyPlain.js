import airplane from "./airplane.js";

const readyPlain = (forms, main) => {
  const data = [];

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      for (const element of form.elements) {
        element.disabled = true;
      }

      data.push({
        name: form.name.value,
        ticket: form.ticket.value,
      });

      // когда все данные пассажиров подтверждены
      // показываем самолет
      if (data.length === forms.length) {
        forms.forEach((form) => form.remove());
        airplane(main, data);
      }
    });
  });
};

export default readyPlain;
