$(() => {
    nome = $('#nome');
    cognome = $('#cognome');
    addBtn = $('#submit');
    elencoHTML = $('#elenco');
    errore = $('#errore');
    form = $('#form');
    errore.html('');
    printData();

    function printData() {
        // Con axios
        /* axios.get('http://localhost:3004/elenco').then(function (response) {
            if (response.data.length > 0) {
                elenco = response.data;
                errore.html('');
                elencoHTML.html('');
                for (i = 0; i < elenco.length; i++) {
                    elencoHTML.append(`<li><button type="button" class="btn btn-danger nero" onClick="elimina('${elenco[i].id}')">X</button>${elenco[i].nome} ${elenco[i].cognome} </li>`);
                }
            } else {
                errore.html('Nessun elemento presente');
            }
        }); */

        // Con fetch
        fetch('http://localhost:3004/elenco')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                elenco = data;
                if (elenco.length > 0) {
                    errore.html('');
                    elencoHTML.html('');
                    elenco.map(function (element) {
                        elencoHTML.append(`<li><button type="button" class="btn btn-danger nero" onClick="elimina('${element.id}')">X</button>${element.nome} ${element.cognome} </li>`);
                    });
                } else {
                    errore.html('Nessun elemento presente');
                }
            });
    }

    addBtn.on('click', function () {
        if (nome.val() != '' && cognome.val() != '') {
            var data = {
                nome: nome.val(),
                cognome: cognome.val(),
            };

            // Con fetch
            let response = fetch('http://localhost:3004/elenco', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data),
            });

            // Con axios
            /* axios.post('http://localhost:3004/elenco', data).then(function (response) {
                printData();
            });
            nome.html('');
            cognome.html('');
            errore.html(''); */
        } else {
            errore.html('Riempire correttamente tutti i campi!');
        }
    });
});

function elimina(i) {
    axios.delete('http://localhost:3004/elenco/' + i);
}