/*
    needs xml_node.js
*/

$(document).ready(function(){

    new xml_parser(
        '<ACTE num="1">1) <date>4-2-1656</date>: <epoux don="true">Capitán Juan de ZACARIAS de la SIERRA y MORALES,</epoux> con <epouse>Da. María de CARAVAJAL, viuda del Capitán Cristóbal Cabral. </epouse>. Ts.: <temoins><temoin> el Capitán Diego Gutiérrez de Humanes</temoin>, <temoin>Juan de Ibarra o Izarra</temoin>, <temoin>el Alférez Juan Rodríguez Estela</temoin>, y <temoin>otros muchos</temoin>, </temoins>(f. 1).</ACTE>'
    );

    new xml_parser(
        '<ACTE>3) <date>28-2-1656</date>: <epoux><prenom>Jerónimo</prenom> de <nom de="true">ILLESCAS</nom>,</epoux> con <epouse>Da. Petrona de TAPIA. </epouse>. Ts.: <temoins><temoin> el Licenciado Melchor Agustín de Mesa</temoin>,<temoin> Canónigo de esta Santa Iglesia</temoin>,<temoin> el General Dn. Luis de Aresti</temoin>,<temoin> el Capitán Tomás de Rojas y Acevedo y otros. Agregado: Jerónimo de Illescas y Da. Petrona Tapia de Agüero</temoin>,<temoin> hija legítima del Capitán Dn. Ñuño Fernández y Da. Juana de Agüero Tapia y Valdenebro</temoin>,<temoin> padres también del General Dn. Ignacio Fernández de Agüero. Al margen: murió el dicho</temoin>,</temoins>(f. 1).</ACTE>'
    );
});
