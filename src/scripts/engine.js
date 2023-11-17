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
    let img = document.createElement('img')
    box.className = "item"
    box.innerHTML = `<img src="./src/imgs/${shuffleEmojis[i]}.gif">`;
    box.onclick = handleClick;//CRIANDO UMA FUNÇÃO PARA QUANDO O USUÁRIO CLICAR NO ELEMENTO
    document.querySelector(".game").appendChild(box)
}

function handleClick() {
    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
        playaudio("cartas")
    }

    if(openCards.length == 2){
        setTimeout(checkMatch, 500);
    }
}

function playaudio(audioName){
    let audio = new Audio(`./src/audio/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        openCards[0].classList.add("animFind");
        openCards[1].classList.add("animFind");
        playaudio("great")

    } else {
        openCards[0].classList.remove("boxOpen")
        openCards[1].classList.remove("boxOpen")
        playaudio("erro")
    }

    openCards = []

    if(document.querySelectorAll(".boxMatch").length == emojis.length){
        const div = document.createElement("div")
        const p = document.createElement('p')
        div.classList.add("youWin")
        p.innerHTML = `<p>VOCÊ VENCEU!!!</p>`
        div.appendChild(p)
        document.body.appendChild(div)
        
       // window.location.reload()
    }
}