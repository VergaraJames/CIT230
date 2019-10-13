function actionMenu() {

    var point = document.getElementsByClassName("nav-link");
    for (var i = 0; i < point.length; i++) {
        point[i].classList.toggle("hideMenu");
    }
    /* 
    document.getElementsByClassName("menu")[0].classList.toggle("responsive");
*/
}