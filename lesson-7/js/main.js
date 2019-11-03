function toggleMenu() {
    document.getElementsByClassName("navigation")[0].classList.toggle("responsive");
}

function showhide() {
    var d = new Date();
    var s = document.getElementById(+d.getDay());
    s.style.display = (s.style.display == 'block') ? 'none' : 'block';
}