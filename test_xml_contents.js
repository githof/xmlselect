/*
  pour tester xml_contents au fur et à mesure.
 */

$(document).ready(function (){
    var texte_epoux = "Felipe José de los SANTOS, natural de Lisboa, hijo legítimo de Pedro José de los Santos, y de Francisca Angélica Almeida";
    var texte_epouse = "María Sinforosa SUAREZ, natural de ésta, hija legítima de Pedro Suárez, y de María Bernardina Chavarría. Ts.: Manuel Argerich, y Rufina Marín, (f. 62v)."

    var xml = new xml_contents()
	.add_tag_text("epoux", texte_epoux)
	.add_tag_text("epouse", texte_epouse);

});
