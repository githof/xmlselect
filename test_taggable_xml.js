/*
  needs xml_contents.js
  needs test_acte.js
*/

$(document).ready(function (){
    var acte = test_acte();
    var acte_node = new xml_node().set_node("acte", acte);
    new taggable_xml(acte_node).append_to($("#test"));
});
