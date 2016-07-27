

$(document).ready(function(){
    var $html_edit = $(".xmlselect_edit");
    var $html_view = $(".xmlselect_view");

    var acte_brut = $html_edit.text();
    $html_edit.text("");
    new_taggable_xml(xml_parser(acte_brut)).append_to($html_edit);
});
