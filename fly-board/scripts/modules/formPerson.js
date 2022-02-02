import createElement from "./createElement.js";

const createFormPerson = (count) => {
  const form = createElement("form", {
    className: "person",
  });

  const title = createElement("h2", {
    className: "person__title",
    textContent: `Пассажир #${count + 1}`,
  });

  const fieldName = createElement("div", {
    className: "field",
  });

  const labelName = createElement("label", {
    className: "field__label",
    for: `name${count}`,
    textContent: `ФИО`,
  });

  const inputName = createElement("input", {
    className: "field__input",
    id: `name${count}`,
    name: "name",
    type: "text",
    placeholder: "Введите ваше ФИО",
    required: true,
  });

  // билет
  const fieldTicked = createElement("div", {
    className: "field",
  });

  const labelTicked = createElement("label", {
    className: "field__label",
    for: `ticket${count}`,
    textContent: `Номер билета (10 цифр)`,
  });

  const inputTicked = createElement("input", {
    className: "field__input",
    id: `ticket${count}`,
    name: "ticket",
    type: "text",
    placeholder: "Номер билета",
    required: true,
    minLength: "10",
    maxLength: "10",
  });

  const button = createElement("button", {
    className: "btn-confirm",
    type: "submit",
    textContent: "Подтвердить",
  });

  fieldTicked.append(labelTicked, inputTicked);
  fieldName.append(labelName, inputName);

  form.append(title, fieldName, fieldTicked, button);

  return form;
};

const getFormPerson = (count) => {
  if (count > 6) count = 6;
  const forms = [];
  for (let i = 0; i < count; i++) {
    forms.push(createFormPerson(i));
  }
  return forms;
};

export default getFormPerson;
