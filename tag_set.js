
var person_tags = [
    'epoux',
    'epouse',
    'pere',
    'mere',
    'temoin',
    'parrain'
]

/*
function dico_from_keys(keys, value)
{
    // fonction fold au feeling, ajuster avec la doc (quand je serai en ligne)
    var add_kv = function(key, dico)
    {
	dico[key] = value ;
	return dico;
    };
    return _.fold(keys, {}, add_kv);
}

var wt = dico_from_keys(person_tags, ['prenom', 'nom', 'condition', 'veuf'])

ajouter les tags qui manquent
*/

var wedding_tags = {
	'epoux': [
	    "prenom", "nom", "condition", "naissance-lieu", "age", "veuf", "pere", "mere"
	],
	'epouse': [
		"prenom", "nom", "condition", "naissance-lieu", "age", "veuve", "pere", "mere"
	],
	'pere': [
		"prenom", "nom", "condition", "veuf"
	],
	'mere': [
		"prenom", "nom", "condition", "veuf"
	],
	'temoins': [
		"temoin"
	],
	'temoin': [
		"prenom", "nom", "condition", "veuf"
	],
	'parrains': [
		"parrain"
	],
	'parrain': [
		"prenom", "nom", "condition", "veuf"
	],
	'veuf': [
		"prenom", "nom"
	],
	'veuve': [
		"prenom", "nom"
	]
};

var attributs_set = {
	'epoux': [
		"Don"
	],
	'epouse': [
		"Don"
	],
	'parrain': [
		"Don"
	],
	'veuf': [
		"Don"
	],
	'veuve': [
		"Don"
	],
	'nom': [
	    "de", "la", "los"
	]
}

var option_other = "Autre";
