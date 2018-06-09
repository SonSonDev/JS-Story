var imgFolder = "./img/story/";
var musicFolder = "./music/";
var data;

//élément de l'écran d'accueil
var home = {
    screen: document.querySelector(".home"),
    button: document.querySelector(".home_playButton")
}

//element du DOM à modifier
var storyUi = {
    audioIcon: document.querySelector(".audioIcon"),
    music: document.querySelector(".storyMusic"),
    picture: document.querySelector(".storyImg"),
    text: document.querySelector(".textBox"),
    choiceSection: document.querySelector(".choiceSection"),
};

//progression de l'histoire
var progression = {
    route: "Intro",
    step: 0
};

//requete ajax pour stocker le json dans la variable data
function ajaxRequest() {
    fetch("./story.json")
        .then(function (res) {
            return res.json();
        }).then(function (story) {
            data = story;
            loadAssets()
        })
}

//fonction executée lorsqu'une réponse est choisie. Permet de choisir une route
function chosenRoute(route) {
    progression.step = 0;
    progression.route = route;

    showText();
    musicAndPicture();

    storyUi.text.innerHTML += '<img src="img/other/textboxI.png" alt="textboxI">';
    storyUi.text.classList.add('clickable');
}

//fonction qui permet d'avancer dans le récit
function next() {

    if (progression.step >= data[progression.route].step.length - 1) {
        showText();
        getChoices();
        storyUi.text.classList.remove('clickable');
    }
    if (progression.step < data[progression.route].step.length - 1) {
        progression.step++;
        showText();
        storyUi.text.innerHTML += '<img src="img/other/textboxI.png" alt="textboxI">';
        musicAndPicture();
    }
}

//fonction qui affiche le texte
function showText() {
    storyUi.text.innerHTML = "";
    storyUi.choiceSection.innerHTML = "";
    var newP = document.createElement('p');
    newP.textContent = data[progression.route].step[progression.step].text;
    storyUi.text.appendChild(newP);
}

//fonction qui affiche les réponses aux questions
function getChoices() {
    for (let i = 0; i < data[progression.route].choice.length; i++) {
        var newBtn = document.createElement('button');
        newBtn.textContent = data[progression.route].choice[i].answer;
        newBtn.addEventListener('click', function () {
            chosenRoute(data[progression.route].choice[i].route);
        })
        storyUi.choiceSection.appendChild(newBtn);
    }
}

//fonction qui change la musique et l'image
function musicAndPicture() {
    if (data[progression.route].step[progression.step].picture) {
        storyUi.picture.src = imgFolder + data[progression.route].step[progression.step].picture;
    }

    if (data[progression.route].step[progression.step].music) {
        if (data[progression.route].step[progression.step].music.function === "pause") {
            storyUi.music.pause();
            storyUi.music.currentTime = 0;
        } else {
            storyUi.music.src = musicFolder + data[progression.route].step[progression.step].music.src;
            storyUi.music.play();
        }
    }
}

//lorsqu'on clique sur le play de l'écran d'accueil
home.button.addEventListener('click', function () {
    home.screen.classList.add('hidden');
    storyUi.music.play();
})

//lorsqu'on clique sur la boite de texte, on avance dans le récit
storyUi.text.addEventListener('click', function () {
    next();
})

//fonction mute
storyUi.audioIcon.addEventListener('click', function () {
    if (storyUi.music.muted === false) {
        storyUi.music.muted = true;
        this.src = "./img/other/mute.svg"
    } else if (storyUi.music.muted === true) {
        storyUi.music.muted = false;
        this.src = "./img/other/musicnote.svg"
    }
})

//lance la requête ajax
ajaxRequest();


//loading

loading = document.querySelector('.loading')

function loadAssets() {
    var count = 0
    for (const key in data) {
        const step = data[key].step;
        step.forEach(element => {
            if (element.music && element.music.src) {
                var preloadLink = document.createElement("link");
                preloadLink.href = musicFolder + element.music.src;
                preloadLink.rel = "preload";
                preloadLink.as = "audio";
                document.head.appendChild(preloadLink);
            }
            if (element.picture) {
                var preloadLink = document.createElement("link");
                preloadLink.href = imgFolder + element.picture;
                preloadLink.rel = "preload";
                preloadLink.as = "image";
                document.head.appendChild(preloadLink);
            }
        })
        count++;
        if (count === Object.keys(data).length) {
            window.addEventListener("load", function (event) {
                loading.classList.add("hidden")
            })
        }
    }
}

loading.addEventListener('transitionend', function () {
    this.remove()
})
