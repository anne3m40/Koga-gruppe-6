let side = {};
document.addEventListener("DOMContentLoaded", start);

function start() {
    hentNav();
}

async function hentNav() {
    //henter nav.html
    const response = await fetch("inc/nav.html");
    //fortæller at indholdet i nav skal være text
    const inclusion = await response.text();
    //indsætter nav.html ind i <nav></nav> på alle sider.
    document.querySelector("nav").innerHTML = inclusion;
}
