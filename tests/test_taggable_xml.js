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
    $button.click(function(){
        console.log(acte.toString());
    });

    $test.append(
        $("<h1>", {
            text: nom
        }),
        $button
    );

    new_taggable_xml(acte).append_to($test);

    $("body").append($test);
}

$(document).ready(function (){

    // test_acte("ACTE BRUTE", test_acte_brut());

    // test_acte("ACTE SIMPLE", test_acte_simple());

    // test_acte("ACTE INCOMPLET", test_acte_incomplet());

    // test_acte("ACTE COMPLET", test_acte_complet());

    test_acte("XML PARSE", xml_parser(
        '<ACTE>3) <date>28-2-1656</date>: <epoux><prenom>Jerónimo</prenom> de <nom de="true">ILLESCAS</nom>,</epoux> con <epouse>Da. Petrona de TAPIA. </epouse>. Ts.: <temoins><temoin> el Licenciado Melchor Agustín de Mesa</temoin>,<temoin> Canónigo de esta Santa Iglesia</temoin>,<temoin> el General Dn. Luis de Aresti</temoin>,<temoin> el Capitán Tomás de Rojas y Acevedo y otros. Agregado: Jerónimo de Illescas y Da. Petrona Tapia de Agüero</temoin>,<temoin> hija legítima del Capitán Dn. Ñuño Fernández y Da. Juana de Agüero Tapia y Valdenebro</temoin>,<temoin> padres también del General Dn. Ignacio Fernández de Agüero. Al margen: murió el dicho</temoin>,</temoins>(f. 1).</ACTE>'
    ));
});
