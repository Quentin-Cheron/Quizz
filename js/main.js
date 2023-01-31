const answer = document.querySelectorAll("input");
const question = document.querySelectorAll(".blockForm");

//Détecte les bonnes réponses et les fausses

function correctResponse() {
    if (this.classList.contains("correct")) {
        this.parentNode.parentNode.classList.add("true");
    } else {
        this.parentNode.parentNode.classList.add("false");
    }
}

for (let i = 0; i < answer.length; i++) {
    answer[i].addEventListener("click", correctResponse);
}

//Va dire combien de bonne réponse la personne a eux

const numberOfResponse = document.querySelector(".numberOfResponse");
let counterTrue = 0;
numberOfResponse.innerHTML = `Vous avez ${counterTrue}/${question.length}`;

function onClick() {
    const response = document.querySelector(".response");
    const countOfNumber = document.querySelector(".countOfNumbers");

    for (let i = 0; i < question.length; i++) {
        const WrongError = document.createElement("p");

        function correctResponse() {
            WrongError.textContent = "Veuillez entrez la bonne réponse";
            question[i].append(WrongError);
            question[i].classList.add("wrongAnswer");
            question[i].classList.remove("correctAnswer");
            question[i].classList.remove("true");
            question[i].classList.add("wrongEffect");
            question[i].removeChild(question[i].lastElementChild)
        }
        WrongError.setAttribute("class", "WrongError");

        //Va détecter si la personne a répondu correctement 

        if (question[i].classList.contains("true")) {
            question[i].classList.remove("wrongAnswer");
            question[i].classList.remove("wrongEffect");
            question[i].classList.remove("false");
            question[i].classList.add("true");
            question[i].classList.add("correctAnswer");
            countOfNumber.innerHTML = "Vous devez remplir le formulaire !";
            counterTrue++;
            //Va détecter si la personne a eux faux

        } else if (question[i].classList.contains("false") && !question[i].children[4]) {
            correctResponse();
        } else if (question[i].classList.contains("wrongAnswer") && question[i].children[4]) {
            correctResponse();
        } else if (question[i].classList.contains("true") && question[i].hasChildNodes(WrongError)) {
            question[i].remove(question.lastElementChild);
        } else {
            WrongError.textContent = "Veuillez entrez la bonne réponse";
            question[i].append(WrongError);
            question[i].classList.add("wrongAnswer");
            question[i].classList.remove("correctAnswer");
            question[i].classList.remove("true");
            question[i].classList.add("wrongEffect");
        }

        /*else {
            WrongError.textContent = "Veuillez remplir correctement la question ci-dessus";
            question[i].append(WrongError);
            question[i].classList.add("wrongAnswer");
            question[i].classList.remove("correctAnswer");
            question[i].classList.remove("true");
            question[i].classList.add("wrongEffect");
            console.log(WrongError.textContent);
        }*/


        if (counterOfTrue < 2 && !question[i].classList.contains("wrongAnswer")) {
            WrongError.textContent = "Veuillez entrez la totalités des bonnes réponses";
            question[i].append(WrongError);
            question[i].classList.add("wrongAnswer");
            question[i].classList.remove("correctAnswer");
            question[i].classList.remove("true");
            question[i].classList.add("wrongEffect");
        }
        if (counterOfTrue == 2 && question[i].classList.contains("true")) {
            question[i].classList.remove("wrongAnswer");
            question[i].classList.add("correctAnswer");
            question[i].classList.add("true");
            question[i].classList.remove("wrongEffect");
            
            console.log(question[i].removeChild(question[i].lastChild));
            counterOfTrue = 0;
        }
    }

    //Va détecter si la personne n'a qu'une erreurs, plusieurs erreurs ou aucune

    const numberOfFalse = document.querySelectorAll(".false");
    for (let i = 0; i < numberOfFalse.length; i++) {
        if (numberOfFalse.length === 1) {
            countOfNumber.innerHTML = "Vous avez une erreur.";
        } else {
            countOfNumber.innerHTML = "Vous avez des erreurs.";
        }
    }

    //Va afficher le résultas si la personne a 10/10 cela affichera un gif de félicitation

    response.classList.replace("hide", ["show"]);
    response.classList.remove("wrongAnswer");
    numberOfResponse.innerHTML = `Vous avez ${counterTrue}/${question.length} bonne réponses`;

    const main = document.querySelector("main");
    const finishForm = document.querySelector(".finishForm");
    const winNote = document.querySelector(".winNote");

    if (counterTrue === question.length) {
        console.log(counterTrue);
        main.classList.replace("show", ["hide"]);
        finishForm.classList.replace("hide", ["show"]);
        winNote.innerHTML = `Vous avez eux ${counterTrue}/${question.length} bravo !!!`;
    }
}

const button = document.querySelector(".btn");
button.addEventListener("click", onClick);

//Va forcer le reload de la page à l'appuie du bouton recommencer

const retry = document.querySelector(".retry").addEventListener("click", () => window.location.reload());

let counterOfTrue = 0;

answer.forEach(input => {
    input.addEventListener("click", () => {
        question.forEach(question => {
            if (question.classList.contains("true") && input.classList.contains("correct") && counterOfTrue <= 1) {
                counterOfTrue++;
                console.log(counterOfTrue);
            }
        })
    })
})

