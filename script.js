const quizContainer = document.getElementById('quiz-container');

const images = {
    sad: 'images/sad-image.png', // Substitua pelo caminho da imagem de tristeza
    angryCake: 'images/angry-cake-image.png', // Substitua pelo caminho da imagem do bolo bravo
    pointer: 'images/pointer.png', // Substitua pelo caminho da imagem do boneco apontando
    cake: 'images/cake-image.png', // Substitua pelo caminho da nova imagem de bolo
    secret: 'images/secret-image.jpg', // Substitua pelo caminho da imagem secreta
};

const correctAnswerAudio = new Audio('audios/audiocorrect.mp3'); // Substitua pelo caminho do arquivo de áudio
const errorAnswerAudio = new Audio('audios/audioerror.mp3'); // Substitua pelo caminho do arquivo de áudio de erro
const quizStartAudio = new Audio('audios/audiostart.mp3'); // Substitua pelo caminho do arquivo de áudio de início do quiz
const birthdayAudio = new Audio('audios/audiobirthday.mp3'); // Substitua pelo caminho do arquivo de áudio de feliz aniversário

const quizData = [
    {
        type: 'intro',
        message: 'Oi, Aline, deseja participar do jogo?',
        options: [
            { text: 'Sim', next: 1, startQuiz: true },
            {
                text: 'Não',
                message: 'Nossa, fiz com tanto carinho e você não aceitou participar? :(',
                image: images.sad,
            },
        ],
    },
    {
        type: 'message',
        message: 'Então você aceitou o desafio hein? Ok, você terá que responder umas perguntas. Caso acerte, você irá progredir até a mensagem final. Caso erre, vou te chamar de tonta e o jogo reiniciará, ok?',
        options: [{ text: 'Ok', next: 2 }],
    },
    {
        type: 'question',
        question: '1. Quem mais responde o post um do outro?',
        options: [
            { text: 'Lucas', incorrect: true },
            { text: 'Aline', correct: true, next: 3 },
        ],
    },
    {
        type: 'question',
        question: '2. É verdade que a Aline já ganhou alguma vez no stop?',
        options: [
            { text: 'Verdade demais', incorrect: true },
            { text: 'Mentira demais', correct: true, next: 4 },
        ],
    },
    {
        type: 'question',
        question: '3. O que a Aline mais faz que irrita o Lucas?',
        options: [
            { text: 'Zoar ele', incorrect: true },
            { text: 'Pedir pra ele provar um abacate', incorrect: true },
            { text: 'Falar demais', incorrect: true },
            { text: 'Ficar quieta e não contar suas besteiras', correct: true, next: 5 },
        ],
    },
    {
        type: 'question',
        question: '4. A Aline deveria ter permissão pra sair de casa? Ou deveria ficar trancada pra sempre?',
        options: [
            { text: 'Deve sair quando quiser', incorrect: true },
            { text: 'Não, deve ficar presa no quarto do Lucas', correct: true, next: 6 },
        ],
    },
    {
        type: 'question',
        question: '5. O Lucas deveria falar com outras garotas?',
        options: [
            { text: 'Sim, quantas quiser', incorrect: true },
            { text: 'Não, nunca, never, ele não é nem doido', correct: true, next: 7 },
        ],
    },
    {
        type: 'message',
        message: 'Oh não! Aline, cuidado, você está sendo atacada por um bolo confeitado. Ele esteve te perseguindo durante todo o jogo. Ele está chateado, pois você não considera ele um bolo de aniversário. Sua missão é dizer ao bolo que ele também é um bolo de aniversário.',
        options: [
            { text: 'Você também é um bolo de aniversário :)', next: 8 },
            {
                text: 'Você nunca será um bolo de aniversário :(',
                message: 'Vish, pelo jeito o bolo ficou puto com você e te matou, tenta de novo, vai',
                image: images.angryCake,
            },
        ],
        image: images.cake, // Adiciona a nova imagem de bolo
    },
    {
        type: 'question',
        question: '6. Quem é mais fã de misturas doidas?',
        options: [
            { text: 'Lucas', incorrect: true },
            { text: 'Aline', correct: true, next: 9 },
        ],
    },
    {
        type: 'question',
        question: '7. O Lucas gosta de stalkear a Aline sempre que pode?',
        options: [
            { text: 'Sim, sempre', correct: true, next: 10 },
            { text: 'Não, ele não faz isso', incorrect: true },
        ],
    },
    {
        type: 'question',
        question: '8. Qual a palavra mais usada no dicionário da Aline?',
        options: [
            { text: 'Deixa', incorrect: true },
            { text: 'Eita', incorrect: true },
            { text: 'Vish', correct: true, next: 11 },
            { text: 'Nossa', incorrect: true },
        ],
    },
    {
        type: 'question',
        question: '9. Eu iria fazer a nona pergunta, mas... é... deixa pra lá, é besteira.',
        options: [
            { text: 'Ok, então', next: 14 },
            {
                text: 'FALA',
                next: 12
            },
        ],
    },
    {
        type: 'question',
        question: 'Você tem certeza que quer ler a nona pergunta? É bobeira, sabe.',
        options: [
            { text: 'Deixa pra lá', next: 14 },
            {
                text: 'FALA LOGO',
                next: 13
            },
        ],
    },
    {
        type: 'question',
        question: 'A Aline deveria mandar uma foto agora sorrindo pro Lucas?',
        options: [
            { text: 'Sim, óbvio', correct: true, next: 14 },
            { text: 'Não', incorrect: true },
        ],
    },
    {
        type: 'question',
        question: '10. Concordamos que a Aline mora muito longe de Lucas? E a culpa é dela.',
        options: [
            { text: 'Sim, a culpa é dela', correct: true, next: 15 },
            { text: 'Não, a culpa é do Lucas', incorrect: true },
        ],
    },
    {
        type: 'message',
        message: 'Feliz aniversário, Aline! 🥳 Eu estive programando essa página, e você não faz ideia do quanto foi difícil esconder isso de você kkkkk. Eu estava muito animado para te mostrar! Eu sei que é algo bobo e provavelmente idiota, até porque eu sou bobo, idiota e tonto, mas eu realmente queria fazer algo e deixar uma mensagem para ti, agradecendo por ter me deixado te conhecer, por você ter aceitado abrir o chat naquele momento e conversar comigo, porque, com certeza, foi uma das minhas melhores escolhas. Infelizmente, eu sei que tem a questão da nossa distância, e eu não posso estar aí para te dar um abraço e tentar te assustar com uma festa surpresa (e você acabar me matando sem querer ). Mas, de qualquer forma, fico feliz por poder falar com você, passar um tempo rindo e falando coisas estranhas. Espero que as coisas entre nós nunca mudem. E feliz aniversário! Aliás, eu não sou bom com mensagens de aniversário kkkkjkk.',
        playBirthdayAudio: true,
        showSecretButton: true,
    },
];

let currentStep = 0;

function loadStep(stepIndex) {
    const step = quizData[stepIndex];
  
    quizContainer.style.opacity = 0;
    setTimeout(() => {
        quizContainer.innerHTML = '';

        const questionContainer = document.createElement('div');
        questionContainer.className = 'question-container';
        questionContainer.innerHTML = `<p>${step.message || step.question}</p>`;
        
        if (step.image) {
            questionContainer.innerHTML += `<img src="${step.image}" alt="Imagem" class="question-image">`;
        }

        quizContainer.appendChild(questionContainer);

        if (step.options) {
            step.options.forEach(option => {
                const optionContainer = document.createElement('div');
                optionContainer.className = 'option-container';

                const pointerImage = document.createElement('img');
                pointerImage.src = images.pointer;
                pointerImage.className = 'pointer-image';

                const button = document.createElement('button');
                button.textContent = option.text;

                optionContainer.appendChild(pointerImage);
                optionContainer.appendChild(button);

                button.addEventListener('mouseenter', () => {
                    pointerImage.style.display = 'block';
                });
                button.addEventListener('mouseleave', () => {
                    pointerImage.style.display = 'none';
                });

                button.addEventListener('click', () => {
                    if (option.incorrect) {
                        errorAnswerAudio.play(); // Toca o áudio de erro quando a resposta incorreta é selecionada
                        quizContainer.innerHTML = `<p class="incorrect">Meu Deus, Aline, você é tão tonta, você errou!</p>`;
                        quizContainer.classList.add('shake');
                        setTimeout(() => quizContainer.classList.remove('shake'), 500);
                        const restartButton = document.createElement('button');
                        restartButton.textContent = 'Reiniciar';
                        restartButton.addEventListener('click', () => {
                            currentStep = 2; // Reinicia o quiz a partir da primeira pergunta
                            loadStep(currentStep);
                        });
                        quizContainer.appendChild(restartButton);
                        return;
                    } else if (option.correct) {
                        correctAnswerAudio.play(); // Toca o áudio quando a resposta correta é selecionada
                        quizContainer.innerHTML = `<p class="correct">Boa, você acertou!</p>`;
                        setTimeout(() => {
                            currentStep = option.next;
                            loadStep(currentStep);
                        }, 1000);
                    } else if (option.next !== undefined) {
                        if (stepIndex === 0 && option.startQuiz) {
                            quizStartAudio.play(); // Toca o áudio de início do quiz quando a resposta "Sim" é selecionada na primeira pergunta
                        }
                        currentStep = option.next;
                        loadStep(currentStep);
                    } else if (option.message) {
                        quizContainer.innerHTML = `<p>${option.message}</p>`;
                        if (option.image) {
                            quizContainer.innerHTML += `<img src="${option.image}" alt="Imagem">`;
                        }
                        const restartButton = document.createElement('button');
                        restartButton.textContent = 'Reiniciar';
                        restartButton.addEventListener('click', () => {
                            currentStep = 0;
                            loadStep(currentStep);
                        });
                        quizContainer.appendChild(restartButton);
                        return;
                    }
                });

                quizContainer.appendChild(optionContainer);
            });
        }

        if (step.playBirthdayAudio) {
            birthdayAudio.play(); // Toca o áudio de feliz aniversário quando a mensagem final aparece
        }

        if (step.showSecretButton) {
            const secretButton = document.createElement('button');
            secretButton.textContent = 'Foto Secreta!';
            secretButton.className = 'secret-button';
            secretButton.addEventListener('click', () => {
                secretButton.style.display = 'none';
                quizContainer.style.opacity = 0;
                setTimeout(() => {
                    quizContainer.innerHTML = `<img src="${images.secret}" alt="Imagem Secreta" class="secret-image">`;
                    setTimeout(() => quizContainer.style.opacity = 1, 300);
                }, 300);
            });
            questionContainer.appendChild(secretButton);
        }
      
        setTimeout(() => quizContainer.style.opacity = 1, 300);
    }, 300);
}

function navigateToStep(stepIndex) {
    currentStep = stepIndex;
    loadStep(currentStep);
}

document.addEventListener('DOMContentLoaded', () => {
    quizContainer.style.opacity = 0; // Inicia com opacidade 0
    setTimeout(() => {
        loadStep(currentStep);
        setTimeout(() => quizContainer.style.opacity = 1, 300); // Transição suave no início do quiz
    }, 300);
});