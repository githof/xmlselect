/*
  needs xml_contents.js
  needs test_acte.js
*/

$(document).ready(function (){
    var acte_node = new xml_node().set_node("acte", acte);
    new taggable_text(acte_node).append_to($("#test"));
});
