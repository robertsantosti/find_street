const endpoint = "https://viacep.com.br/ws/value/json/";

const body = document.querySelector("body");
const form = document.querySelector("#form-cep");
const list = document.querySelector("#results");
const table = document.querySelector("#table-enderecos");
const tableBody = document.querySelector("#enderecos-tbody");
const startWrapper = document.querySelector("#start-wrapper");
const cepInput = document.querySelector("#cep");
const btnClean = document.querySelector("#btn-clean");

let listaEnderecos = JSON.parse(localStorage.getItem("enderecos"));

table.classList.add("d-none");
startWrapper.classList.add("d-block");
btnClean.classList.add("d-none");

if (!!listaEnderecos && listaEnderecos.length > 0) {
  listaEnderecos.map((endereco) => render(endereco));

  table.classList.remove("d-none");
  startWrapper.classList.remove("d-block");
  startWrapper.classList.add("d-none");
  btnClean.classList.remove("d-none");
  btnClean.classList.add("d-block");
}

function filtro(cep) {
  return listaEnderecos.filter(
    (endereco) => normalizeString(endereco.cep) === normalizeString(cep)
  );
}

function normalizeString(str) {
  return str.replace("-", "").trim();
}

function render(endereco) {
  if (!listaEnderecos) {
    startArrayEnderecos(endereco);
  }

  if (!!listaEnderecos && listaEnderecos.indexOf(endereco) === -1) {
    listaEnderecos.push(endereco);
  }

  localStorage.setItem("enderecos", JSON.stringify(listaEnderecos));

  renderTable(endereco);
  table.classList.remove("d-none");
  startWrapper.classList.remove("d-block");
  startWrapper.classList.add("d-none");
  btnClean.classList.remove("d-none");
  btnClean.classList.add("d-block");
}

function renderTable(endereco) {
  const { logradouro, bairro, localidade, uf, cep } = endereco;
  const tableRow = document.createElement("tr");

  const colunas = {
    cep,
    logradouro,
    bairro,
    localidade,
  };

  Object.entries(colunas).map(([key, value]) => {
    const tableColumn = document.createElement("td");
    tableColumn.innerText = key === "localidade" ? `${value} (${uf})` : value;
    tableRow.appendChild(tableColumn);
  });

  tableBody.appendChild(tableRow);
}

function startArrayEnderecos(endereco) {
  listaEnderecos = [];
  listaEnderecos.push(endereco);
}

async function get(cep) {
  const res = await fetch(endpoint.replace("value", normalizeString(cep)));
  const body = await res.json();

  body.hasOwnProperty("erro") ? alert("Endereço não existe") : render(body);
}

//LISTENERS
form.addEventListener("submit", (e) => {
  e.preventDefault();

  !!listaEnderecos &&
  !!listaEnderecos.length &&
  !!listaEnderecos.find(
    (e) => normalizeString(e.cep) === normalizeString(cepInput.value)
  )
    ? alert(
        `CEP ${cepInput.value} ja foi consultado, favor verificar na lista.`
      )
    : get(cepInput.value);

  cepInput.value = null;
  cepInput.focus();
});

btnClean.addEventListener("click", (e) => {
  e.preventDefault();

  localStorage.removeItem("enderecos", null);
  listaEnderecos = JSON.parse(localStorage.getItem("enderecos"));

  tableBody.innerHTML = "";
  table.classList.remove("d-block");
  table.classList.add("d-none");
  btnClean.classList.remove("d-block");
  btnClean.classList.add("d-none");
  startWrapper.classList.remove("d-none");
  startWrapper.classList.add("d-block");
});
