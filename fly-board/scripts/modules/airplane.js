import { setStorage, getStorage } from "../service/storage.js";
import createElement from "./createElement.js";
import declOfNum from "./declOfnum.js";

//
const createCockpit = (title) => {
  const cockpit = createElement("div", {
    className: "cockpit",
  });

  const title1 = createElement("h1", {
    className: "cockpit-title",
    textContent: title,
  });

  const button = createElement("button", {
    className: "cockpit-confirm",
    type: "submit",
    textContent: "Подтвердить",
  });

  cockpit.append(title1, button);
  return cockpit;
};

//
const createExit = () => {
  const fuselage = createElement("div", {
    className: "fuselage exit",
  });
  return fuselage;
};

//
const createBlockSeat = (n, count, bookingSeat) => {
  const letters = ["A", "B", "C", "D", "E", "F"];
  const fuselage = createElement("ol", {
    className: "fuselage",
  });

  for (let i = n; i < count + n; i++) {
    const wrapperRow = createElement("li");
    const seats = createElement("ol", {
      className: "seat",
    });

    const seatsRow = letters.map((letter) => {
      const seat = createElement("li", {
        className: "seat",
      });

      const wrapperCheck = createElement("label");
      const seatValue = `${i}${letter}`;
      const check = createElement("input", {
        name: "seat",
        type: "checkbox",
        value: seatValue,
        disabled: bookingSeat.includes(seatValue),
      });

      wrapperCheck.append(check);
      seat.append(wrapperCheck);
      return seat;
    });

    seats.append(...seatsRow);
    wrapperRow.append(seats);
    fuselage.append(wrapperRow);
  }

  return fuselage;
};

//
const createAirplane = (title, tourData) => {
  const scheme = tourData.scheme;
  const bookingSeat = getStorage(tourData.id).map((item) => item.seat);

  const choisesSeat = createElement("form", {
    className: "choises-seat",
  });

  const plane = createElement("fieldset", {
    className: "plane",
    name: "plane",
  });

  const cockpit = createCockpit(title);

  // схема самолета
  let n = 1;

  const elements = scheme.map((type) => {
    if (type === "exit") {
      return createExit();
    }

    if (typeof type === "number") {
      const blockSeat = createBlockSeat(n, type, bookingSeat);
      n = n + type;
      return blockSeat;
    }
  });

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);
  return choisesSeat;
};

const checkSeat = (form, data, tourID) => {
  const bookingSeat = getStorage(tourID).map((item) => item.seat);

  form.addEventListener("change", () => {
    const formData = new FormData(form);
    const checked = [...formData].map(([, value]) => value);
    if (checked.length === data.length) {
      [...form].forEach((item) => {
        if (item.checked === false && item.name === "seat") {
          item.disabled = true;
        }
      });
    } else {
      [...form].forEach((item) => {
        if (!bookingSeat.includes(item.value)) {
          item.disabled = false;
        }
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const booking = [...formData].map(([, value]) => value);

    for (let i = 0; i < data.length; i++) {
      data[i].seat = booking[i];
    }

    setStorage(tourID, data);

    form.remove();

    document.body.innerHTML = `
    <h1 class="title">Спасибо, хорошего Вам полета!</h1>
    <h2 class="title">${
      booking.length === 1 ? `Ваше место ${booking}` : `Ваши места ${booking}`
    }</h2>
    `;
  });
};

const airplane = (main, data, tourData) => {
  const title = `Выберете ${declOfNum(data.length, [
    "место",
    "места",
    "мест",
  ])}`;

  const choiceForm = createAirplane(title, tourData);

  checkSeat(choiceForm, data, tourData.id);

  main.append(choiceForm);
};

export default airplane;
