$(document).ready(function(){

	// Test global sur un acte
	var acte = test_acte();
	var acte_node = new xml_node().set_node("acte", acte);
	new taggable_xml(acte_node, 'acte').append_to($("#test"));

});
