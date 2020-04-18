// EXERCÍCIO 1
/* function checaIdade(idade) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            if (idade > 18) {
                resolve('Maior que 18');
            } else {
                reject('Menor que 18');
            }
        }, 2000);

    })
}


checaIdade(20)
    .then(function(message) {
        console.log(message)
    }).catch(function(message) {
        console.log(message);
    }) */



//EXERCÍCIO 2

const ulElement = document.querySelector('body ul'),
    btnElement = document.querySelector('body button'),
    inputElement = document.querySelector('body input[name=user]'),
    xhr = new XMLHttpRequest();



function preencher(vetor) {

    for (obj of vetor) {
        const newLiElement = document.createElement('li');
        newLiElement.innerText = obj.name;
        ulElement.appendChild(newLiElement);
    }
}

function buscarUser() {
    return new Promise(function(resolve, reject) {
        let user = inputElement.value;

        xhr.open('GET', `https://api.github.com/users/${user}/repos`, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 300) {
                    reject("Error, status code = " + xhr.status)
                } else {
                    resolve(JSON.parse(xhr.responseText));
                }
            }
        }
    })
}

function procura() {
    ulElement.innerHTML = '';
    ulElement.innerHTML = '<li>Carregando...</li>';
    buscarUser()
        .then(function(response) {
            ulElement.innerHTML = '';
            preencher(response);
        })
        .catch(function(message) {
            console.log(message);
            ulElement.innerHTML = '<li>ERRO 404 / USER NOT FOUND</>'
        })
}