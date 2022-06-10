var nome;
var cognome;
var addBtn;
var elencoHTML;
var elenco = [];

window.addEventListener("load", init);

function init() {
	nome = document.getElementById("nome");
	cognome = document.getElementById("cognome");
	addBtn = document.getElementById("submit");
	elencoHTML = document.getElementById("elenco");
	printData();
	eventHandler();
}

function eventHandler() {
	addBtn.addEventListener("click", addData);
}

function printData() {
	axios.get("http://localhost:3000/elenco").then(function (response) {
		if (response.data.length > 0) {
			elenco = response.data;
			document.getElementById("errore").innerHTML = "";
			elencoHTML.innerHTML = "";
			for (i = 0; i < elenco.length; i++) {
				elencoHTML.innerHTML += '<li><button type="button" class="btn btn-danger" onClick="elimina(' + elenco[i].id + ')">X</button>' + elenco[i].nome + " " + elenco[i].cognome + " " + "</li>";
			}
		} else {
			document.getElementById("errore").innerHTML = "Nessun elemento presente";
		}
	});
}

function addData() {
	var data = {
		nome: nome.value,
		cognome: cognome.value,
	};
	axios.post("http://localhost:3000/elenco", data).then(function (response) {
		printData();
	});
}

function elimina(i) {
	axios.delete("http://localhost:3000/elenco/" + i);
}
