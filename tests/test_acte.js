
/*
  needs xml_node.js
 */

function test_acte_brut()
{
    return new xml_tag_node(
        "acte",
        "Felipe José de los SANTOS, natural de Lisboa, hijo legítimo de Pedro José de los Santos, y de Francisca Angélica Almeida"
    );
}


function test_acte_simple()
{
    return new xml_tag_node("acte", [
            new xml_tag_node("epoux", [
                new xml_tag_node("prenom", "Felipe"),
                new xml_tag_node("nom", "de los Santos")
            ]),
            new xml_tag_node("epouse", [
                new xml_tag_node("prenom", "Maria"),
                new xml_text_node(" Sinforosa "),
                new xml_tag_node("nom", "SUAREZ")
            ])
        ]);
}


function test_acte_complet()
{
    return new xml_tag_node("acte", [
        new xml_tag_node("epoux", [
            new xml_tag_node("prenom", "Felipe"),
            new xml_tag_node("prenom", "José"),
            new xml_tag_node("nom", "de los Santos"),
            new xml_text_node(", natural de Lisboa, hijo legítimo de "),
            new xml_tag_node("pere", [
                new xml_tag_node("prenom", "Pedro"),
                new xml_tag_node("prenom", "José"),
                new xml_tag_node("nom", "de los Santos")
            ]),
            new xml_text_node(", y de "),
            new xml_tag_node("mere", [
                new xml_tag_node("prenom", "Francisca"),
                new xml_tag_node("prenom", "Angélica"),
                new xml_tag_node("nom", "Almedia")
            ])
        ]),
        new xml_tag_node("epouse", [
            new xml_tag_node("prenom", "Maria"),
            new xml_tag_node("prenom", "Sinforosa"),
            new xml_tag_node("nom", "SUAREZ"),
            new xml_text_node(", natural de ésta, hija legítima de"),
            new xml_tag_node("pere", [
                new xml_tag_node("prenom", "Pedro"),
                new xml_tag_node("nom", "SUAREZ")
            ]),
            new xml_text_node(", y de "),
            new xml_tag_node("mere", [
                new xml_tag_node("prenom", "Maria"),
                new xml_tag_node("prenom", "Bernardina"),
                new xml_tag_node("nom", "Chavarria")
            ])
        ]),
        new xml_tag_node("temoins", [
            new xml_tag_node("temoin", [
                new xml_tag_node("prenom", "Manuel"),
                new xml_tag_node("nom", "Argerich")
            ]),
            new xml_text_node(", y "),
            new xml_tag_node("temoin", [
                new xml_tag_node("prenom", "Rufina"),
                new xml_tag_node("nom", "Marin")
            ])
        ]),
        new xml_text_node(", (f. 62v).")
    ]);
}

function test_acte_incomplet()
{
    return new xml_tag_node("acte", [
        new xml_tag_node("epoux", [
            new xml_text_node("Felipe José"),
            new xml_tag_node("nom", "de los Santos"),
            new xml_text_node(", natural de Lisboa, hijo legítimo de "),
            new xml_tag_node("pere", [
                new xml_tag_node("prenom", "Pedro"),
                new xml_tag_node("prenom", "José"),
                new xml_tag_node("nom", "de los Santos")
            ]),
            new xml_text_node(", y de Francisca Angélica Almedia")
        ]),
        new xml_tag_node("epouse", [
            new xml_text_node("Maria Sinforosa SUAREZ, natural de ésta, hija legítima de"),
            new xml_tag_node("pere", [
                new xml_tag_node("prenom", "Pedro"),
                new xml_tag_node("nom", "SUAREZ")
            ]),
            new xml_text_node(", y de "),
            new xml_tag_node("mere", [
                new xml_text_node("Maria Bernadina Chavarria")
            ])
        ]),
        new xml_tag_node("temoins", [
            new xml_text_node("Manuel Argerich, y "),
            new xml_tag_node("temoin", [
                new xml_text_node("Rufina Marin")
            ])
        ]),
        new xml_text_node(", (f. 62v).")
    ]);
}
