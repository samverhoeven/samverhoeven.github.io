//array met alle groenten
var aGroenten = [
    ["aardappelen", 0.95, "kg"],
    ["avocado", 2.69, "stuk"],
    ["bloemkool", 1.93, "stuk"],
    ["brocoli", 1.29, "stuk"],
    ["champignons", 0.89, "250g"],
    ["chinese kool", 1.59, "stuk"],
    ["groene kool", 1.69, "stuk"],
    ["knolselder", 1.29, "stuk"],
    ["komkommer", 2.49, "stuk"],
    ["kropsla", 1.69, "stuk"],
    ["paprika", 0.89, "net"],
    ["prei", 2.99, "bundel"],
    ["princessenbonen", 1, "250g"],
    ["rapen", 0.99, "bundel"],
    ["rode kool", 1.39, "stuk"],
    ["sla iceberg", 1.49, "stuk"],
    ["spinazie vers", 1.89, "300g"],
    ["sjalot", 0.99, "500g"],
    ["spruiten", 1.86, "kg"],
    ["trostomaat", 2.99, "500g"],
    ["ui", 0.89, "kg"],
    ["witloof 1ste keus", 1.49, "700g"],
    ["wortelen", 2.59, "kg"],
    ["courgetten", 1.5, "stuk"]
];

//array object met alle winkels
var aoWinkels = [
    {naam: "de fruitmand", adres: "steenstraat 34", post: 8000, gemeente: "Brugge", tel: "050342218", manager: "Francine Lapoule"},
    {naam: "Jos & Anneke", adres: "visserijstraat 1", post: 8400, gemeente: "Oostende", tel: "059463689", manager: "Jos Leman"},
    {naam: "groene vingers", adres: "hoogstraat 108", post: 9000, gemeente: "Gent", tel: "091342218"},
    {naam: "de buurtwinkel", adres: "die laene 22", post: 2000, gemeente: "Antwerpen", tel: "0230342218", manager: "Bert Simoens"}
];

//object met fouten (boodschap + test functie)
var oFouten = {
    required: {
        msg: "verplicht veld",
        test: function (elem) {
            return(elem.value != "");
        }
    },
    aantal: {
        msg: "aantal verwacht (groter dan 0)",
        test: function (elem) {
            //aantal is op zich niet verplicht, maar als er inhoud is, dan moet het een getal zijn
            if (elem.value != "") {
                return  !isNaN(elem.value) && elem.value > 0;
            } else {
                return true;
            }


        }
    }
};

function windowLoad() {
    //noscript verbergen als javascript werkt
    var eNoScript = document.getElementById("noscript");
    eNoScript.style.display = "none";
    
    //midden div weergeven als javascript werkt
    var eMidden = document.getElementById("midden");
    eMidden.style.display = "block";

    //DOM referenties
    var eFrmBestel = document.frmBestel;
    var eWinkel = document.frmBestel.winkel;
    var eGroente = document.frmBestel.groente;
    var eAantal = document.frmBestel.aantal;
    
    //functies om select velden te vullen met options
    winkelsVullen();
    groentenVullen();
    
    console.log(eWinkel);
    //formulier submit
    eFrmBestel.addEventListener('submit', function (e) {
        e.preventDefault();
        var bValid = valideer(this);
        console.log('formulier ' + this.name + ' valideert ' + bValid);
        if (bValid === true)//als formulier goed (true) valideert wordt de functie winkelmandje aangeroepen om het winkelmandje op te stellen
            winkelmandje(this);
    });
}

//opties van select element met id winkel invullen
function winkelsVullen() {
    var eWinkels = document.getElementById("winkel");
    var eDF = document.createDocumentFragment();

    for (var i = 0; i < aoWinkels.length; i++) {
        var eOption = document.createElement("option");
        var sValue = document.createTextNode(aoWinkels[i]["naam"]);
        eOption.appendChild(sValue);
        //title van option samenstellen
        eOption.title = aoWinkels[i]["adres"] + ", " + aoWinkels[i]["post"] + " " + aoWinkels[i]["gemeente"];
        eDF.appendChild(eOption);
    }

    eWinkels.appendChild(eDF);
}

//opties van select element met id groente invullen
function groentenVullen() {
    var eGroenten = document.getElementById("groente");
    var eDF = document.createDocumentFragment();

    for (var i = 0; i < aGroenten.length; i++) {
        var eOption = document.createElement("option");
        //groente option samenstellen
        var sValue = document.createTextNode(aGroenten[i][0] + " (" + aGroenten[i][1] + " \u20AC/" + aGroenten[i][2] + ")");
        eOption.appendChild(sValue);
        eDF.appendChild(eOption);
    }

    eGroenten.appendChild(eDF);
}

//doorloopt alle form elementen (velden) en past daar de valideerVeld functie op toe
function valideer(frm) {
    var bValid = true;
    for (var i = 0; i < frm.elements.length; i++) {
        hideErrors(frm.elements[i]);
        //elk veld dorloopt functie valideerVeld
        var bVeld = valideerVeld(frm.elements[i]);
        //als er één veld false valideert (bVeld === false), blijft bValid of false staan en valideert form dus false
        if (bVeld === false) {
            bValid = false;
        }
    }

    return bValid;
}

//bij elk veld word er gecheckt of er een fout in staat aan de hand van de classname van het veld,
//dit an de hand van het object aFout een RegExp om de classname 
function valideerVeld(elem) {
    //array waar foutboodschappen inkomen
    var aFoutBoodschappen = [];

    for (var fout in oFouten) {
        //regular expression om te zien of de betreffende fout bij het betreffende element als classname voorkomt
        var re = new RegExp("(^|\\s)" + fout + "(\\s|$)");
        if (re.test(elem.className)) {
            //valideert elem adhv functie test uit het object oFouten (niet dezelfde test als bovenstaande regel!)
            var bTest = oFouten[fout].test(elem);
            if (bTest === false) {
                //zet foutboodschap in array
                aFoutBoodschappen.push(oFouten[fout].msg);
            }
        }
    }
    //als er een foutboodschap in de array staat wordt showError aangeroepen
    if (aFoutBoodschappen.length > 0) {
        showErrors(elem, aFoutBoodschappen);
    }
    //als er geen fout in de array wordt gezet valideert het veld true
    return !(aFoutBoodschappen.length > 0);
}

//error bericht laten zien vlak achter de input waarbij een error is gevonden
function showErrors(elem, aErrors) {

    var eBroertje = elem.nextSibling;
    if (!eBroertje || !(eBroertje.nodeName === "UL" && eBroertje.className === "fouten")) {
        eBroertje = document.createElement('ul');
        eBroertje.className = "fouten";
        elem.parentNode.insertBefore(eBroertje, elem.nextSibling);
    }
    for (var i = 0; i < aErrors.length; i++) {
        var eLi = document.createElement('li');
        eLi.innerHTML = aErrors[i];
        eBroertje.appendChild(eLi);
    }
}

//elke keer bij het submitten van form worden eerst alle errors van vorige submit verwijderd
function hideErrors(elem) {
    var eBroertje = elem.nextSibling;
    if (eBroertje && eBroertje.nodeName === "UL" && eBroertje.className === "fouten") {
        elem.parentNode.removeChild(eBroertje);
    }
}

function winkelmandje(frm) {
    var eTotaal = document.getElementById("totaal");
    var eLeeg = document.getElementById("leeg");
    var eRij = document.createElement("div");
    eRij.className = "item keuze";
    
    //rij met "mijn mandje is leeg" verbergen
    eLeeg.style.display = "none";

    //gekozen groente in winkelmandje zetten
    var eGroente = document.createElement("div");
    eGroente.className = "cel cellinks groente";
    var arrGroente = frm.groente.value.split(" (");//split groente naam van stukprijs
    var sGroente = document.createTextNode(arrGroente[0]);
    eGroente.appendChild(sGroente);
    eRij.appendChild(eGroente);

    //gekozen aantal in winkelmandje zetten en in winkelmandje zetten
    var eAantal = document.createElement("div");
    eAantal.className = "cel celrechts aantal";
    var nAantal = frm.aantal.value;
    var sAantal = document.createTextNode(nAantal);
    eAantal.appendChild(sAantal);
    eRij.appendChild(eAantal);

    //stukprijs van gekozen groente er uit halen en in winkelmandje zetten
    var eStukprijs = document.createElement("div");
    eStukprijs.className = "cel celrechts stukprijs";
    var arrStukprijs = arrGroente[1].split(" \u20AC/");//split op euroteken/ om stukprijs te verkrijgen
    var nStukprijs = arrStukprijs[0];
    var sStukprijs = document.createTextNode(nStukprijs);
    eStukprijs.appendChild(sStukprijs);
    eRij.appendChild(eStukprijs);

    //subtotaal berekenen en in winkelmandje zetten
    var eSubtotaal = document.createElement("div");
    eSubtotaal.className = "cel celrechts subtotaal";
    console.log(nAantal + " " + nStukprijs);
    var nSubtotaal = (parseFloat(nAantal) * parseFloat(nStukprijs)).toFixed(2);//toFixed(2) zorgt voor max 2 decimalen
    var sSubtotaal = document.createTextNode(nSubtotaal);
    eSubtotaal.appendChild(sSubtotaal);
    eRij.appendChild(eSubtotaal);

    //rij met keuze plaatsen voor rij van totaal
    eTotaal.parentNode.insertBefore(eRij, eTotaal);

    //totaal berekenen en in totaal vakje zetten
    var eTotaal = document.getElementById("totNum");
    var aSubtotalen = document.querySelectorAll(".subtotaal");
    var nTotaal = 0;
    for (var i = 0; i < aSubtotalen.length; i++) {//doorloopt alle elementen met class .subtotaal om de inhoud daarvan bij totaal op te tellen
        console.log(aSubtotalen[i].innerHTML);
        nTotaal += parseFloat(aSubtotalen[i].innerHTML);
    }
    nTotaal = parseFloat(nTotaal).toFixed(2);//toFixed(2) zorgt voor max 2 decimalen
    eTotaal.innerHTML = nTotaal;
}

