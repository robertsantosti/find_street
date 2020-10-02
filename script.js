const endpoint = "http://viacep.com.br/ws/value/json/";
const form = document.querySelector("#form-cep");
const list = document.querySelector("#results");

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

  this.get(url);
  return;
});

function renderListElement(value) {
  const item = document.createElement("li");
  item.innerText = value;

  list.appendChild(item);
}
