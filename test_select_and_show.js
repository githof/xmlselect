$(document).ready(function(){

	// Test pour text_node
	//var text_node = new xml_node().set_text_node("Prenom Nom");
	//new taggable_xml(text_node, 'text_node').append_to($("#test"));


	// Test pout tag_text_node
	//var tag_text_node = new xml_node().set_tag_text_node("epoux", "Nom Prenom");
	//new taggable_xml(tag_text_node, 'tag_text_node').append_to($("#test"));


	// Test xml_contents
	// var node = new xml_node().set_node("pere", new xml_contents()
	//	 .add_tag_text("prenom", "Pedro")
	//	 .add_tag_text("prenom", "José")
	//	 .add_tag_text("nom", "de los Santos")
	//	 .add_text("text sans tag")
	// );
	// new taggable_xml(node, 'node').append_to($("#test"));



	// Test global sur un acte
	var acte = test_acte();
	var acte_node = new xml_node().set_node("acte", acte);
	new taggable_xml(acte_node, 'acte').append_to($("#test"));

});
