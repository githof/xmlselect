/*
  needs xml_node.js
  needs xml_parser.js
  needs test_acte.js
*/

function test_acte(nom, acte){
    var $test = $("<div>");

    var $button = $("<button>", {
        text: "print acte"
    });

    $test.append(
        $("<h1>", {
            text: nom
        }),
        $button,
        $("<div>",{
            class: "xmlselect_edit",
            text: acte
        })
    );

    $("body").append($test);
}

var acte_jeronimo = '<ACTE>3) <date>28-2-1656</date>: <epoux><prenom>Jerónimo</prenom> de <nom de="true">ILLESCAS</nom>,</epoux> con <epouse>Da. Petrona de TAPIA. </epouse>. Ts.: <temoins><temoin> el Licenciado Melchor Agustín de Mesa</temoin>,<temoin> Canónigo de esta Santa Iglesia</temoin>,<temoin> el General Dn. Luis de Aresti</temoin>,<temoin> el Capitán Tomás de Rojas y Acevedo y otros. Agregado: Jerónimo de Illescas y Da. Petrona Tapia de Agüero</temoin>,<temoin> hija legítima del Capitán Dn. Ñuño Fernández y Da. Juana de Agüero Tapia y Valdenebro</temoin>,<temoin> padres también del General Dn. Ignacio Fernández de Agüero. Al margen: murió el dicho</temoin>,</temoins>(f. 1).</ACTE>';
var acte_calderon = '<ACTE num="4789">4811) <date>13-6-1785</date>: Dn. <epoux don="true" id="459"><prenom>José </prenom><prenom>María</prenom>     <nom>CALDERON</nom> de la <nom de="true" la="true">BARCA</nom>, natural de     la ciudad de <naissance-lieu>Sevilla</naissance-lieu>, hijo legítimo de     <pere don="true" id="402">Dn. <prenom>Antonio </prenom><prenom>Francisco</prenom>     <nom>Calderón</nom> de la <nom de="true" la="true">Barca</nom></pere>, y     de <mere don="true" id="403">Da. <prenom>Isabel </prenom><prenom>Ana</prenom> de     <nom de="true">Vera</nom></mere></epoux>, con <epouse don="true" id="401">Da.     <prenom>María </prenom><prenom>Josefa</prenom> <nom>BELGRANO</nom>     <nom>PEREZ</nom>, natural de <naissance-lieu>ésta</naissance-lieu>, <pere don="true" id="404">hija legítima del r (Dn. <prenom>Domingo</prenom> Belgrano     Pérez) [<nom>Belgrano</nom> Capitán de Milicias Urbanas y Alférez Real que     ha sido de ésta y Regidor y su Síndico Procurador<nom>Peri</nom>] </pere>y     de<mere don="true" id="515"> Da. <prenom>Josefa     </prenom><nom>González</nom></mere>.</epouse> Ts.: <temoins><temoin don="true" id="404">Dn. <prenom>Domingo </prenom><nom>Belgrano </nom>     <nom>Peri</nom> <condition>Capitán de Milicias Urbanas </condition>y     <condition>Alférez Real </condition>que ha sido de ésta y     <condition>Regidor </condition>y su <condition>Síndico Procurador     </condition></temoin>y <temoin don="true" id="405">Da. <prenom>Josefa     </prenom><nom>González</nom></temoin></temoins>, padres de la contrayente.     Al margen: "saqué copia a 30-6-1786". (f. 430).</ACTE>';

$(document).ready(function (){

    // test_acte("ACTE BRUTE", test_acte_brut());

    // test_acte("ACTE SIMPLE", test_acte_simple());

    // test_acte("ACTE INCOMPLET", test_acte_incomplet());

    // test_acte("ACTE COMPLET", test_acte_complet());

    test_acte("XML PARSE", acte_jeronimo);
//    test_acte("Belgrano", xml_parser(acte_calderon));
});
