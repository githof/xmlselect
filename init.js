

$(document).ready(function(){
    var $html_edit = $(".xmlselect-edit");
    if($html_edit.length > 0){
        var acte_brut = $html_edit.text();
        var is_editable = $html_edit.hasClass("editable");
        $html_edit.text("");
        var acte = new_taggable_xml(xml_parser(acte_brut), is_editable);
        acte.append_to($html_edit);
        $html_edit.parent().children("button").click(function(){
            console.log(acte.xml.toString());
        });
    }
});
