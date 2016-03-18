/*
  pour tester xml_contents au fur et à mesure.

  needs xml_contents.js
  needs test_acte.js
 */

$(document).ready(function (){

    console.log('# test_xml_contents');

    console.log('## Tests plus ou moins unitaires');

    var texte_epoux = "Felipe José de los SANTOS, natural de Lisboa, hijo legítimo de Pedro José de los Santos, y de Francisca Angélica Almeida";
    var texte_epouse = "María Sinforosa SUAREZ, natural de ésta, hija legítima de Pedro Suárez, y de María Bernardina Chavarría"

    var n_text = new xml_node().set_text_node(texte_epoux);
    console.log('n_text');
    console.log(n_text.toString());
    console.log('is?');
    console.log(n_text.is_text_node());

    var n_tag_text = new xml_node().set_tag_text_node('epouse', texte_epouse);
    console.log('n_tag_text');
    console.log(n_tag_text.toString());
    console.log('is?');
    console.log(n_tag_text.is_tag_text_node());


    console.log('## Test xml_contents 2 tag_text epoux epouse');
    var xml = new xml_contents()
	.add_tag_text("epoux", texte_epoux)
	.add_tag_text("epouse", texte_epouse);

    console.log(xml.toString());

    console.log('## Gros test (acte complet)');

    var acte = test_acte();

    console.log(acte.toString());

});
