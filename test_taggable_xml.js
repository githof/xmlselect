/*
  needs xml_contents.js
  needs test_acte.js
*/

$(document).ready(function (){

    var acte = test_acte_simple();
    new taggable_xml(acte, 'acte').append_to($("#test1"));

    acte = test_acte_incomplet();
    new taggable_xml(acte, 'acte').append_to($("#test2"));
});
