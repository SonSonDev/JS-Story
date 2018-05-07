var data;

function ajaxRequest() {
    var request = new XMLHttpRequest();
    request.open("POST", "scripts/story.json", true);
    request.onreadystatechange = function() {
        if (request.readyState != 4 || request.status != 200) return;

        data = JSON.parse(request.responseText);

    };
    request.send();
}

function consoleData(data) {
    console.log(data);
}

var ui = {
    ajaxRqBtn: document.querySelector(".ajaxRqBtn"),
    sayDataBtn: document.querySelector(".sayDataBtn"),
    startBtn:document.querySelector(".startBtn")
}


ui.ajaxRqBtn.addEventListener('click', ajaxRequest);

ui.sayDataBtn.addEventListener('click', function() {
    consoleData(data)
});

var storyUI = {
    message: document.querySelector(".messageBox"),
    choiceSection : document.querySelector(".choiceSection")
}


function next(route){
    storyUI.message.innerHTML="";
    storyUI.choiceSection.innerHTML="";
    for (var i = 0; i < data[route].message.length; i++) {
        var newP=document.createElement('p');
        newP.textContent=data[route].message[i];
        storyUI.message.appendChild(newP);
    }
    for (let i = 0; i < data[route].choice.length; i++) {
        var newBtn = document.createElement('button');
        newBtn.textContent = data[route].choice[i];
        newBtn.addEventListener('click', function(){
            next(data[route].route[i]);
        })
        storyUI.choiceSection.appendChild(newBtn);
    }
}

ui.startBtn.addEventListener('click', function(){
    next('Intro');
})

ajaxRequest();
