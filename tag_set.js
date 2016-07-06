
var wedding_tags = {
    'acte': [
	"epoux", "epouse", "temoins", "parrains"
    ],
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

var attributes_set = {
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
		"de", "la"
	]
}

var option_other = "Autre";
