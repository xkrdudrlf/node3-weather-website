console.log("Client Side Javascript file id loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const address = search.value;
  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) return (messageOne.textContent = data.error);
      messageOne.textContent = `${data.location}`;
      messageTwo.textContent = `${data.forecast}`;
    });
});
