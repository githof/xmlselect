
/*
  needs xml_contents.js
 */

function new_acte(contents)
{
    return new xml_node().set_node("acte", contents);
}

function test_acte_brut()
{
    var contents = new xml_node().set_text_node(
        "Felipe José de los SANTOS, natural de Lisboa, hijo legítimo de Pedro José de los Santos, y de Francisca Angélica Almeida"
    );

    return new_acte(contents);
}

function test_acte_simple()
{
    var contents = new xml_contents()
        .add_node("epoux", new xml_contents()
		  .add_text("Felipe José de los SANTOS"))
        .add_node("epouse", new xml_contents()
		  .add_text("María Sinforosa SUAREZ"))
        .add_node("temoins", new xml_contents()
            .add_node("temoin", new xml_contents()
                .add_text("Manuel Argerich"))
            .add_node("temoin", new xml_contents()
                .add_text("Rufina Marín"))
        );

    return new_acte(contents);
}

function test_acte()
{
    var contents = new xml_contents()
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

    var temoins = new xml_node()
	.set_node("temoins", new xml_contents()
            .add_node("temoin", new xml_contents()
                .add_text("Manuel Argerich"))
            .add_text(", y ")
            .add_node("temoin", new xml_contents()
                .add_text("Rufina Marín"))
        );
    contents.add_xml_node(temoins)
        .add_text(", (f. 62v).");

    return new_acte(contents);
}

function test_acte_incomplet()
{
    var contents = new xml_contents()
        .add_node("epoux", new xml_contents()
            .add_text("Felipe José")
            .add_tag_text("nom", "de los Santos")
            .add_text(", natural de Lisboa, hijo legítimo de ")
            .add_node("pere", new xml_contents()
                .add_text("Pedro José de los Santos"))
            .add_text(",_y_de_")
            .add_node("mere", new xml_contents()
                .add_tag_text("prenom", "Francisca")
                .add_tag_text("prenom", "Angélica")
                .add_tag_text("nom", "Almedia"))
        )
        .add_node("epouse", new xml_contents()
            .add_text("Maria Sinforosa SUAREZ")
            .add_text(", natural de ésta, hija legítima de_")
            .add_node("pere", new xml_contents()
                .add_tag_text("prenom", "Pedro")
                .add_tag_text("nom", "Suárez"))
            .add_text(",_y_de_María Bernardina Chavarría")
        );

    var temoin1 = new xml_node().
        set_node("temoin", new xml_contents()
            .add_tag_text("Prenom", "Manuel")
            .add_tag_text("Nom", "Argerich")
    );

    var temoin2 = new xml_node().
        set_node("temoin", new xml_contents()
            .add_text("Rufina Marín")
    );

    var temoins = new xml_node()
        .set_node("temoins", new xml_contents()
            .add_xml_node(temoin1)
            .add_text(", y ")
            .add_xml_node(temoin2)
        );

    contents.add_xml_node(temoins)
        .add_text(", (f. 62v).");

    return new_acte(contents);
}
