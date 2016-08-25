

$(document).ready(function(){
    var $html_edit = $(".xmlselect-edit");

    var acte_brut = $html_edit.text();
    $html_edit.text("");
    var acte = new_taggable_xml(xml_parser(acte_brut));
    acte.append_to($html_edit);
    $html_edit.parent().children("button").click(function(){
        console.log(acte.xml.toString());
    });
});
