/* =========================================================
   ENTRE NÓS — V3
   ========================================================= */


/* =========================================================
   TRANSIÇÃO ENTRE PÁGINAS
   ========================================================= */

const transition =
    document.querySelector(".page-transition");

function navigateTo(page) {

    if (transition) {

        transition.classList.add("active");

        setTimeout(() => {
            window.location.href = page;
        }, 600);

    } else {

        window.location.href = page;

    }
}


/* =========================================================
   PÁGINA INICIAL
   ========================================================= */

const nameForm =
    document.getElementById("nameForm");

if (nameForm) {

    const input =
        document.getElementById("nameInput");

    nameForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const name =
                input.value.trim();

            if (!name) {

                input.focus();

                return;
            }

            sessionStorage.setItem(
                "entreNosNome",
                name
            );

            navigateTo("pessoa.html");

        }
    );

}


/* =========================================================
   PÁGINA DA PESSOA
   ========================================================= */

const personName =
    document.getElementById("personName");

if (personName) {

    const savedName =
        sessionStorage.getItem("entreNosNome");

    if (!savedName) {

        navigateTo("index.html");

    } else {

        personName.textContent =
            savedName;

    }

}


/* =========================================================
   CONTEÚDO DA CARTA
   ========================================================= */

const partes = [

    {
        titulo:
            "Uma coisa que eu precisava dizer",

        texto:
`[COLOQUE SEU TEXTO AQUI]

Este é o primeiro espaço da sua mensagem.

Escreva aqui exatamente aquilo que você quer que ela leia.`
    },

    {
        titulo:
            "Sobre nós",

        texto:
`[COLOQUE SEU TEXTO AQUI]

Aqui você pode falar sobre a amizade.

Sobre os momentos que vocês viveram, as coisas que você valoriza e aquilo que tornou essa relação importante para você.`
    },

    {
        titulo:
            "O que mudou",

        texto:
`[COLOQUE SEU TEXTO AQUI]

Aqui entra a parte mais sincera.

Você pode falar sobre aquilo que percebeu e sobre como se sente, sem transformar isso em uma cobrança.`
    },

    {
        titulo:
            "E, no fim...",

        texto:
`[COLOQUE SEU TEXTO AQUI]

Aqui fica aquilo que você realmente gostaria que ela entendesse depois de ler tudo.`
    }

];


let parteAtual = 0;


/* =========================================================
   ELEMENTOS
   ========================================================= */

const startButton =
    document.getElementById("startButton");

const intro =
    document.getElementById("intro");

const letter =
    document.getElementById("letter");

const finalScreen =
    document.getElementById("final");

const partNumber =
    document.getElementById("partNumber");

const partTitle =
    document.getElementById("partTitle");

const partText =
    document.getElementById("partText");

const progressBar =
    document.getElementById("progressBar");

const backButton =
    document.getElementById("backButton");

const nextButton =
    document.getElementById("nextButton");


/* =========================================================
   ANIMAÇÃO DO TEXTO DA CARTA
   ========================================================= */

function reiniciarAnimacaoTexto() {

    if (!partTitle || !partText) {
        return;
    }

    const copy =
        document.querySelector(".letter-copy");

    if (!copy) {
        return;
    }

    copy.style.animation = "none";

    /*
       Força o navegador a reconhecer
       que a animação deve começar novamente.
    */
    void copy.offsetWidth;

    copy.style.animation =
        "letterTextIn .65s cubic-bezier(.2,.8,.2,1) both";
}


/* =========================================================
   COMEÇAR A CARTA
   ========================================================= */

if (startButton) {

    startButton.addEventListener(
        "click",
        () => {

            intro.classList.add("hidden");

            letter.classList.remove("hidden");

            atualizarParte();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   ATUALIZAR PARTE
   ========================================================= */

function atualizarParte() {

    if (!partNumber) {
        return;
    }

    const parte =
        partes[parteAtual];

    partNumber.textContent =
        String(parteAtual + 1)
            .padStart(2, "0");

    partTitle.textContent =
        parte.titulo;

    partText.textContent =
        parte.texto;

    const progresso =
        ((parteAtual + 1) /
        partes.length) * 100;

    progressBar.style.width =
        `${progresso}%`;


    /* BOTÃO VOLTAR */

    if (parteAtual === 0) {

        backButton.style.visibility =
            "hidden";

    } else {

        backButton.style.visibility =
            "visible";

    }


    /* BOTÃO PRÓXIMO */

    if (
        parteAtual ===
        partes.length - 1
    ) {

        nextButton.innerHTML = `
            finalizar
            <span>→</span>
        `;

    } else {

        nextButton.innerHTML = `
            continuar
            <span>→</span>
        `;

    }


    reiniciarAnimacaoTexto();

}


/* =========================================================
   PRÓXIMO
   ========================================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        () => {

            if (
                parteAtual <
                partes.length - 1
            ) {

                parteAtual++;

                atualizarParte();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            } else {

                letter.classList.add("hidden");

                finalScreen.classList.remove("hidden");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================================================
   VOLTAR
   ========================================================= */

if (backButton) {

    backButton.addEventListener(
        "click",
        () => {

            if (parteAtual > 0) {

                parteAtual--;

                atualizarParte();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }

        }
    );

}


/* =========================================================
   MICROINTERAÇÃO DO MOUSE — APENAS PC
   ========================================================= */

const isTouchDevice =
    window.matchMedia(
        "(hover: none), (pointer: coarse)"
    ).matches;

if (!isTouchDevice) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                (event.clientX /
                window.innerWidth - .5) * 10;

            mouseY =
                (event.clientY /
                window.innerHeight - .5) * 10;

        }
    );


    function animateMouse() {

        currentX +=
            (mouseX - currentX) * .04;

        currentY +=
            (mouseY - currentY) * .04;


        document.documentElement.style.setProperty(
            "--mouse-x",
            `${currentX}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${currentY}px`
        );


        requestAnimationFrame(
            animateMouse
        );

    }

    animateMouse();

}


/* =========================================================
   EVITA O ENVIO ACIDENTAL COM ENTER VAZIO
   ========================================================= */

const nameInput =
    document.getElementById("nameInput");

if (nameInput) {

    nameInput.addEventListener(
        "input",
        () => {

            nameInput.value =
                nameInput.value
                    .replace(/\s{2,}/g, " ");

        }
    );

}