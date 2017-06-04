function changeProject(event){
    clearSelected();
    var elements = document.getElementsByClassName(event.target.name);
    for (var key = 0; key < elements.length; key++) {
        elements[key].className = elements[key].className + " selected";
    }
}

function clearSelected(){
    var elements = document.getElementsByClassName("selected");
    console.log(document.getElementsByClassName("selected"));
    //loop needs to run backwards because elements looses a value every time we remove "selected" from an element
    for (var key = elements.length - 1; key >= 0; key--){
        console.log("now on: ", elements[key]);
        var classes = [];
        for (var i = 0; i < elements[key].classList.length; i++) {
            if (elements[key].classList[i] !== "selected"){
                classes.push(elements[key].classList[i]);
            }
        }
        elements[key].className = classes.join(" ");
    }
}

window.onload = function(){
    var buttons = document.getElementsByTagName("nav")[0].children
    for (var key = 0; key < buttons.length; key++){
        buttons[key].addEventListener("click", changeProject);
    }
};
