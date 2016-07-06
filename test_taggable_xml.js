/*
  needs xml_contents.js
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

    test_acte("ACTE BRUTE", test_acte_brut());

    test_acte("ACTE SIMPLE", test_acte_simple());

    test_acte("ACTE INCOMPLET", test_acte_incomplet());

    test_acte("ACTE COMPLET", test_acte_complet());
});
