/*
  pour tester xml_contents au fur et à mesure.
 */

$(document).ready(function (){
    var texte_epoux = "Felipe José de los SANTOS, natural de Lisboa, hijo legítimo de Pedro José de los Santos, y de Francisca Angélica Almeida";
    var texte_epouse = "María Sinforosa SUAREZ, natural de ésta, hija legítima de Pedro Suárez, y de María Bernardina Chavarría. Ts.: Manuel Argerich, y Rufina Marín, (f. 62v)."

    /*
    var xml = new xml_contents()
	.add_tag_text("epoux", texte_epoux)
	.add_tag_text("epouse", texte_epouse);
	*/

    var acte = new xml_contents()
        .add_node("epoux", new xml_contents()
            .add_tag_text("prenom", "Felipe")
            .add_tag_text("prenom", "José")
            .add_tag_text("nom", "de los Santos")
            .add_text(", natural de Lisboa, hijo legítimo de ")
            .add_node("pere", new xml_contents()
                .add_tag_text("prenom", "Pedro")
                .add_tag_text("prenom", "José")
                .add_tag_text("nom", "de los Santos"))
            .add_text(",_y_de_")
            .add_node("mere", new xml_contents()
                .add_tag_text("prenom", "Francisca")
                .add_tag_text("prenom", "Angélica")
                .add_tag_text("nom", "Almedia"))
        )
        .add_node("epouse", new xml_contents()
            .add_tag_text("prenom", "María")
            .add_tag_text("prenom", "Sinforosa")
            .add_tag_text("nom", "SUAREZ")
            .add_text(", natural de ésta, hija legítima de_")
            .add_node("pere", new xml_contents()
                .add_tag_text("prenom", "Pedro")
                .add_tag_text("nom", "Suárez"))
            .add_text(",_y_de_")
            .add_node("mere", new xml_contents()
                .add_text("María Bernardina Chavarría"))
        );
    var temoin1 = new xml_node().
        set_tag_text_node("temoin", "Manuel Argerich");
    var temoin2 = new xml_node().
        set_tag_text_node("temoin", "Rufina Marín");
    var temoins = new xml_node()
	.set_node("temoins", new xml_contents()
            .add_xml_node(temoin1)
            .add_text(", y ")
            .add_xml_node(temoin2)
        );
    acte.add_xml_node(temoins)
        .add_text(", (f. 62v).");

    //console.log(xml);
    console.log(acte.toString());

    // Tests getter xml_node
    /*var node_test = new xml_node().set_tag_text_node("a", "b");
    console.log(node_test.get_tag());
    console.log(node_test.get_contents());
    console.log(node_test.get_text());
    console.log(node_test.get_contents().get_tag());
    console.log(node_test.get_contents().get_text());*/

    // Tests getter xml_contents
    /*console.log(acte.get_nodes().toString());
    console.log(acte.get_node_by_index(1).toString());
    console.log(acte.get_node_by_index(6));
    console.log(acte.get_node_by_tag("epoux").toString());
    console.log(acte.get_node_by_tag("mere"));
    console.log(acte.get_node_by_tag("epoux").get_contents().get_node_by_tag("prenom").get_text());*/

    // Test split
    /*
    var epoux = acte.get_node_by_tag("epoux");
    var epouse = acte.get_node_by_tag("epouse");

    var test1 = epoux.get_contents().get_node_by_index(5);
    var test2 = epouse.get_contents().get_node_by_index(3);
    var test3 = epouse.get_contents().get_node_by_index(5);

    tag_text_node(test1, epoux, "test1", 2, 4);
    tag_text_node(test2, epouse, "test2", 0, 10);
    tag_text_node(test3, epouse, "test3", 2, 6);
    */

    var mere_epouse = acte.get_node_by_tag("epouse").get_contents().get_node_by_tag("mere");
    console.log(mere_epouse.toString());

    var text = mere_epouse.get_contents().get_node_by_index(0);
    tag_text_node(text, mere_epouse, "prenom", 6, 16);
    console.log(mere_epouse.toString());

    text = mere_epouse.get_contents().get_node_by_index(0);
    tag_text_node(text, mere_epouse, "prenom", 0, 5);
    console.log(mere_epouse.toString());

    text = mere_epouse.get_contents().get_node_by_index(3);
    tag_text_node(text, mere_epouse, "nom", 1, 10);
    console.log(mere_epouse.toString());

    console.log(acte.toString());
});
