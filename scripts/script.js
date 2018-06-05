var imgFolder = "./img/";
var musicFolder = "./music/";
var data;


//requete ajax
function ajaxRequest(){
    fetch("./scripts/story2.json")
    .then(function(res){
        return res.json()
    }).then(function(story){
        data = story
    })

}

//ecran d'accueil
var home = {
    screen: document.querySelector(".home"),
    button: document.querySelector(".home_playButton")
}

home.button.addEventListener('click', function(){
    home.screen.classList.add('hidden');
})


//element du DOM à modifier
var storyUi = {
    music: document.querySelector(".gameMusic"),
    picture: document.querySelector(".gameImg"),
    message: document.querySelector(".messageBox"),
    choiceSection: document.querySelector(".choiceSection"),
};

//progression de l'histoire
var progression = {
    route: "Intro",
    step: 0
};

//fonction executée lorsqu'une réponse est choisie. Permet de choisir une route
function chosenRoute(route) {
    progression.step = 0
    progression.route = route;
    storyUi.message.innerHTML = "";
    storyUi.choiceSection.innerHTML = "";
    var newP = document.createElement('p');
    newP.textContent = data[progression.route].step[progression.step].message;
    storyUi.message.appendChild(newP);
    storyUi.message.innerHTML += '<img src="img/messageboxI.png" alt="messageboxI">';
    storyUi.message.classList.add('clickable')
    if(data[progression.route].step[progression.step].picture){
        storyUi.picture.src= imgFolder + data[progression.route].step[progression.step].picture;
        
    }
    
    musicAndPicture();
}

//fonction qui permet d'avancer dans le récit
function next() {
    if (progression.step >= data[progression.route].step.length - 1) {
        return;
    }
    progression.step++;
    storyUi.message.innerHTML = "";
    storyUi.choiceSection.innerHTML = "";
    var newP = document.createElement('p');
    newP.textContent = data[progression.route].step[progression.step].message;
    storyUi.message.appendChild(newP);

    if(data[progression.route].step[progression.step].picture){
        storyUi.picture.src= imgFolder + data[progression.route].step[progression.step].picture;
    }
    musicAndPicture();
    if (progression.step >= data[progression.route].step.length - 1) {
        getChoices();
        storyUi.message.classList.remove('clickable')
        
    } else {
        storyUi.message.innerHTML += '<img src="img/messageboxI.png" alt="messageboxI">';
        
    }
    
}

function getChoices() {
    for (let i = 0; i < data[progression.route].choice.length; i++) {
        var newBtn = document.createElement('button');
        newBtn.textContent = data[progression.route].choice[i].answer;
        newBtn.addEventListener('click', function() {
            chosenRoute(data[progression.route].choice[i].route);
        })
        storyUi.choiceSection.appendChild(newBtn);
    }
}

function musicAndPicture(){
    if(data[progression.route].step[progression.step].picture){
        storyUi.picture.src= imgFolder + data[progression.route].step[progression.step].picture;
    }
    if(data[progression.route].step[progression.step].music){
       
        if(data[progression.route].step[progression.step].music.function==="play"){
            storyUi.music.src= musicFolder + data[progression.route].step[progression.step].music.src;
            storyUi.music.play();
        } else if(data[progression.route].step[progression.step].music.function==="pause"){
            storyUi.music.pause();
            storyUi.music.currentTime=0;
        }
    }
}

storyUi.message.addEventListener('click', function() {
    next();
})


ajaxRequest();