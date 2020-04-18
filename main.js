const ulElement = document.querySelector('body ul'),
    btnElement = document.querySelector('body button'),
    inputElement = document.querySelector('body input[name=user]');

function preencher(vetor) {
    for (obj of vetor) {
        const newLiElement = document.createElement('li');
        newLiElement.innerText = obj.name;
        ulElement.appendChild(newLiElement);
    }
}

function buscarUser() {
    ulElement.innerHTML = '';
    ulElement.innerHTML = '<li>Carregando...</li>';

    let user = inputElement.value;
    axios.get(`https://api.github.com/users/${user}/repos`)
        .then((response) => {
            ulElement.innerHTML = '';
            preencher(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
            ulElement.innerHTML = '<li>ERRO 404 / USER NOT FOUND</li>'
        })
}


btnElement.onclick = () => buscarUser();