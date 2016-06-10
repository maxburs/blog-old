var smallThumbnails = true;
var wrappedTitle = false;
var imgLinks;
var title;
window.onload = function() {
    imgLinks = document.getElementsByClassName("img-link");
    title = document.getElementsByTagName("h1")[0];
    layoutCheck();
    window.addEventListener("resize", layoutCheck, false);
}

function layoutCheck(){
    if (!wrappedTitle && document.body.clientWidth < 550) {
        title.innerHTML = "Maxwell<br>Burson";
        wrappedTitle = true;
    }
    else if (wrappedTitle && document.body.clientWidth >= 550) {
        title.innerHTML = "Maxwell Burson";
        wrappedTitle = false;
    }
    if (smallThumbnails && document.body.clientWidth < 450) {
        smallThumbnails = false;
        for (var i = 0; i < imgLinks.length; i++){
            imgLinks[i].style.width = "100%";
        }
    }
    else if (!smallThumbnails && document.body.clientWidth >= 450) {
        smallThumbnails = true;
        for (var i = 0; i < imgLinks.length; i++){
            imgLinks[i].style.width = "50%";
        }
    }
}