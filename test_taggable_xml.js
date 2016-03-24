/*
  needs xml_contents.js
  needs test_acte.js
*/

$(document).ready(function (){

    // Test pour text_node
    //var text_node = new xml_node().set_text_node("test text node");
    //new taggable_xml(text_node, 'node').append_to($("#test"));


    // Test pout tag_text_node
    //var tag_text_node = new xml_node().set_tag_text_node("TAG TAG", "text text text");
    //new taggable_xml(tag_text_node, 'node').append_to($("#test"));


    // Test xml_contents
    /*
    var node = new xml_node().set_node("pere", new xml_contents()
        .add_tag_text("prenom", "Pedro")
        .add_tag_text("prenom", "José")
        .add_tag_text("nom", "de los Santos")
    );
    new taggable_xml(node, 'node').append_to($("#test"));
    */


    // Test global sur un acte
    var acte = test_acte();
    var acte_node = new xml_node().set_node("acte", acte);
    new taggable_xml(acte_node, 'acte').append_to($("#test"));
});
