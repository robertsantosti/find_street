const endpoint = "https://viacep.com.br/ws/value/json/";

const body = document.querySelector("body");
const form = document.querySelector("#form-cep");
const list = document.querySelector("#results");
const switchTheme = document.querySelector("#switchTheme");

const searched = [];

async function get(url) {
  const response = await fetch(url);
  const result = await response.json();

  if (result.hasOwnProperty("erro")) {
    alert("Endereço não existe");
    return;
  }

  renderListElement(
    `${result.logradouro}, ${result.bairro} - ${result.localidade} - ${result.cep}`
  );
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const cepInput = document.querySelector("#cep");

  const url = endpoint.replace("value", cepInput.value);

  if (searched.filter(search => search == cepInput.value).length > 0) {
    alert(`CEP ${cepInput.value} Já consultado`);
    return;
  }

  searched.push(cepInput.value);

  cepInput.value = null;
  cepInput.focus();

  this.get(url);
  return;
});

function renderListElement(value) {
  const item = document.createElement("li");
  item.innerText = value;

  list.appendChild(item);
}

switchTheme.addEventListener("click", event => {
  event.preventDefault();

  if (body.classList.contains("darkmode")) {
    body.classList.remove("darkmode");
    return;
  }

  body.classList.add("darkmode");
});
