
function setup_xmlselect(){
    var $html_edit = $(".xmlselect-edit");
    var $html_raw_xml = $("#raw-xml");
    $html_edit.children(".tag-node").remove();
    if($html_raw_xml.length > 0){
        var acte_brut = $html_raw_xml.val();
        var is_editable = $html_edit.hasClass("editable");
        var acte = new_taggable_xml(xml_parser(acte_brut), is_editable);
        acte.append_to($html_edit);
        acte.$root.children("button").click(function(){
            $html_raw_xml.val(acte.xml.to_XML());
        });
        return acte;
    }
    return null;
}

$(document).ready(function(){
    var acte;
    acte = setup_xmlselect();

    var clipboard = new Clipboard("#btn-copy-xml",{
        text: function(trigger){
            return $("#raw-xml").val();
        }
    });
    clipboard.on("success", function(e){
        alert_add(
            $("<div class='alert alert-info fade in'>\
            <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>\
            XML copié dans le presse-papier</div>")
        );
    });

    $("#btn-edit-xml").click(function(){
        $(this).hide();
        $("#btn-copy-xml").hide();
        $("#btn-save-edit-xml").show();
        $("#btn-cancel-edit-xml").show();

        $(".xmlselect-edit").addClass("editable");
        acte = setup_xmlselect();
    });

    $("#btn-cancel-edit-xml").click(function(){
        $(this).hide();
        $("#btn-save-edit-xml").hide();
        $("#btn-copy-xml").show();
        $("#btn-edit-xml").show();

        $(".xmlselect-edit").removeClass("editable");
        acte = setup_xmlselect();
    });

    $("#btn-save-edit-xml").click(function(){
        $("#raw-xml").val(acte.xml.to_XML());
        $("#form-raw-xml").submit();
    });
});
