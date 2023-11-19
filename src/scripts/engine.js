const state = {
    view: {
        time: document.querySelector('#time'),
        buttonChoice: document.querySelectorAll('.level button'),
        level: document.querySelector('.level-game'),
    },
    values: {
        interation: 0,
        currentTime: 0,
        initialTime: 0
    },
    actions: {
        stopTime: clearInterval(setInterval(countDown, 1000)),
    }
}


const emojis = [
  "antMan",
  "antMan",
  "deadpool",
  "deadpool",
  "gamora",
  "gamora",
  "groot",
  "groot",
  "hulk",
  "hulk",
  "iroman",
  "iroman",
  "spider",
  "spider",
  "ghostRider",
  "ghostRider" 
];
let openCards = [];

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for(let i = 0; i < emojis.length; i++){
    let box = document.createElement('div');
    box.className = "item";
    box.innerHTML = `<img src="./src/imgs/${shuffleEmojis[i]}.gif">`;
    box.onclick = handleClick;//CRIANDO UMA FUNÇÃO PARA QUANDO O USUÁRIO CLICAR NO ELEMENTO
    document.querySelector(".game").appendChild(box);
}

function countDown(){
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;
    
    if(state.values.currentTime <= 0){
        const div = document.createElement('div');
        const p = document.createElement('p');
        div.classList.add('lose');
        p.textContent = `TEMPO ESGOTADO!`;
        div.appendChild(p);
        document.querySelector(".game").appendChild(div);
        clearInterval(state.actions.stopTime);
    }
}


function handleClick() {
    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
        playaudio("cartas");
    }

    if(openCards.length == 2){
        setTimeout(checkMatch, 500);
    }
}

function playaudio(audioName,vol = 2, optionLoop = 0){
    let audio = new Audio(`./src/audio/${audioName}.m4a`);
    audio.volume = `0.${vol}`;
    if(optionLoop === 1){
        audio.loop = true;
    }
    audio.play();
}


function removeElement(){
    const li = document.querySelector('p');
    document.querySelector('.game').removeChild(li);
}

function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        openCards[0].classList.add("animFind");
        openCards[1].classList.add("animFind");
        const p = document.createElement('p');
        p.innerHTML = `<span class="great">GREAT!!</span>`;
        document.querySelector('.game').appendChild(p);
        playaudio("great");
        setTimeout(removeElement, 700);
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        playaudio("erro")
    }
    openCards = []

    if(document.querySelectorAll(".boxMatch").length == emojis.length){
        const div = document.createElement("div");
        const p = document.createElement('p');
        div.classList.add("youWin");
        p.innerHTML = `<p>VOCÊ VENCEU <br> em ${state.values.initialTime - state.values.currentTime} Segundos!!</p>`;
        div.appendChild(p);
        document.body.appendChild(div);
        state.values.currentTime = 1;
        setTimeout(state.actions.reload, 3000);
    }
}
function x(){
    state.values.interation++;
    document.querySelector('#bodyy').style.backgroundPosition=state.values.interation+"px";
}

function levelChoice(){
    state.view.buttonChoice.forEach((level) => {
        level.addEventListener('click', () => {
            if(level.className === 'easy'){
                state.values.currentTime = 60; 
                state.actions.stopTime = setInterval(countDown, 1000);
                state.view.time.textContent = state.values.currentTime;
                state.view.level.style.display = 'none'
            } else if(level.className === 'medium'){
                state.values.currentTime = 40;
                state.actions.stopTime = setInterval(countDown, 1000);
                state.view.time.textContent = state.values.currentTime;
                state.view.level.style.display = 'none';
            } else {
                state.values.currentTime = 30;
                state.actions.stopTime = setInterval(countDown, 1000);
                state.view.time.textContent = state.values.currentTime;
                state.view.level.style.display = 'none';
            }
            state.values.initialTime = state.values.currentTime;
        })
    })
}

function init(){
    playaudio('marvel',4, 1);
    setInterval(x, 15);
    levelChoice();
}
init();





