let side = {};
let indhold;
let filter = "Alle";

document.addEventListener("DOMContentLoaded", start);

function start() {
    hentNav();
    hentFooter();

    hentJson();
    const filterKnapper = document.querySelectorAll(".filterknapper");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerCykler));
}

async function hentNav() {
    //henter nav.html
    const responseNav = await fetch("inc/nav.html");

    //fortæller at indholdet i nav skal være text
    const inclusionNav = await responseNav.text();

    //indsætter nav.html ind i <nav></nav> på alle sider.
    document.querySelector("nav").innerHTML = inclusionNav;
}

async function hentFooter() {
    //henter footer.html
    const responseFooter = await fetch("inc/footer.html");

    //fortæller at indholdet i footer skal være text
    const inclusionFooter = await responseFooter.text();

    //indsætter footer.html ind i <footer></footer> på alle sider.
    document.querySelector("footer").innerHTML = inclusionFooter;
}

//Sæt filter via kategori
function filtrerCykler() {
    filter = this.dataset.kategori;
    console.log(filter);
    visIndhold();
}
//hent JSON fil i asynkron function
async function hentJson() {
    const url = "http://annesofienielsen.dk/kea/09-cms/koga/wordpress/wp-json/wp/v2/cykler/?per_page=100";

    //henter data filen
    const myJson = await fetch(url);
    //den hentee ata skal tolkes som json
    indhold = await myJson.json();
    //kald funktion der viser data som json
    visIndhold();
}
//da kategorier kommer ud som et array, er vi nødt til at putte vores loop ind i en if-sætning
function visIndhold() {
    const liste = document.querySelector("#modeller");
    liste.textContent = "";

    indhold.forEach((enkelt) => {
        enkelt.kategori.forEach(k => {
            if (k == filter || filter == "Alle") {
                console.log("jhgkjhk", k, filter);
                const klon = document.querySelector("template").cloneNode(true).content;
                klon.querySelector("h2").textContent = enkelt.model;
                klon.querySelector(".pris").innerHTML = enkelt.pris;
                //                        klon.querySelector(".kategori").innerHTML = enkelt.kategori;
                klon.querySelector(".cykel").src = enkelt.foto_cykel.guid;
                liste.appendChild(klon);
            }
        });

    });


    //            document.querySelector(".overskrift").innerHTML = indhold.title.rendered;
    //            document.querySelector(".indhold").innerHTML = indhold.content.rendered;
}
