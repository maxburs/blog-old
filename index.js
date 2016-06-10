var layoutLarge = true;
var imgLinks;
window.onload = function() {
    imgLinks = document.getElementsByClassName("img-link");
    layoutCheck();
    window.addEventListener("resize", layoutCheck, false);
    console.log(imgLinks);
}

function layoutCheck(){
    if (layoutLarge && document.body.clientWidth < 450) {
        layoutLarge = false;
        for (var i = 0; i < imgLinks.length; i++){
            imgLinks[i].style.width = "100%";
        }
    }
    else if (!layoutLarge && document.body.clientWidth >= 450) {
        layoutLarge = true;
        for (var i = 0; i < imgLinks.length; i++){
            imgLinks[i].style.width = "50%";
        }
    }
}