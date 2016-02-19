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

    var xml = new xml_contents()
        .add_node("epoux", new xml_contents()
            .add_tag_text("prenom", "Felipe José")
            .add_tag_text("nom", "de los Santos")
            .add_text(", natural de Lisboa, hijo legítimo de ")
            .add_node("pere", new xml_contents()
                .add_tag_text("prenom", "Pedro José")
                .add_tag_text("nom", "de los Santos"))
            .add_text(", y de ")
            .add_node("mere", new xml_contents()
                .add_tag_text("prenom", "Francisca Angélica")
                .add_tag_text("nom", "Almedia"))
        )
        .add_node("epouse", new xml_contents()
            .add_tag_text("prenom", "María Sinforosa")
            .add_tag_text("nom", "SUAREZ")
            .add_text(", natural de ésta, hija legítima de ")
            .add_node("pere", new xml_contents()
                .add_tag_text("prenom", "Pedro")
                .add_tag_text("nom", "Suárez"))
            .add_text(", y de ")
            .add_node("mere", new xml_contents()
                .add_tag_text("prenom", "María Bernardina")
                .add_tag_text("nom", "Chavarría"))
            .add_text(". Ts.: Manuel Argerich, y Rufina Marín, (f. 62v).")
        );

    //console.log(xml);
    console.log(xml.pretty_string(""));
});
