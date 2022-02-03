const URL_API = "https://61f4662310f0f7001768c90f.mockapi.io/api/airplane";

const getData = () =>
  fetch(URL_API)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.status);
    })
    .catch((err) => {
      console.log(err);
    });

export default getData;
