import createElement from "./createElement.js";

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
const createBlockSeat = (n, count) => {
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
      const check = createElement("input", {
        name: "seat",
        type: "checkbox",
        value: `${i}${letter}`, // 40^00
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
const createAirplane = (title, scheme) => {
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
      const blockSeat = createBlockSeat(n, type);
      n = n + type;
      return blockSeat;
    }
  });

  plane.append(cockpit, ...elements);
  choisesSeat.append(plane);
  return choisesSeat; // 26^39
};

const airplane = (main, data) => {
  const title = `Выберете места`;
  const scheme = ["exit", 11, "exit", 1, "exit", 17, "exit"];

  main.append(createAirplane(title, scheme));
};

export default airplane;
