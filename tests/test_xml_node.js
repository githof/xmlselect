/*
  needs xml_node.js
  needs test_acte.js
 */

$(document).ready(function (){

    console.log(new xml_text_node("TEST text node").toString());
    console.log(new xml_tag_node("tag", "text node").toString());
    console.log(test_acte_simple().toString());
});
