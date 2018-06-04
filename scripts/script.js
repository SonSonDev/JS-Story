var imgFolder = "./img/"
var data;

function ajaxRequest() {
    var request = new XMLHttpRequest();
    request.open("POST", "scripts/story2.json", true);
    request.onreadystatechange = function() {
        if (request.readyState != 4 || request.status != 200) return;
        data = JSON.parse(request.responseText);
    };
    console.log(request.readyState);
    request.send();
};

function aaaaaajax(){
    fetch("./scripts/story2.json")
    .then(function(res){
        return res.json()
    }).then(function(res){
        data = res
    })

}

aaaaaajax();

var ui = {
    startBtn: document.querySelector(".startBtn")
};

var storyUi = {
    picture: document.querySelector(".gameImg"),
    message: document.querySelector(".messageBox"),
    choiceSection: document.querySelector(".choiceSection")
};

var progression = {
    route: "Intro",
    step: 0
};

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
    if (progression.step >= data[progression.route].step.length - 1) {
        getChoices();
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

function chosenRoute(route) {
    progression.step = 0
    progression.route = route;
    storyUi.message.innerHTML = "";
    storyUi.choiceSection.innerHTML = "";
    var newP = document.createElement('p');
    newP.textContent = data[progression.route].step[progression.step].message;
    storyUi.message.appendChild(newP);
    if(data[progression.route].step[progression.step].picture){
        storyUi.picture.src= imgFolder + data[progression.route].step[progression.step].picture;
    }
}


ui.startBtn.addEventListener('click', function() {
    chosenRoute("Intro")
})

storyUi.message.addEventListener('click', function() {
    next();
})

aaaaaajax();
