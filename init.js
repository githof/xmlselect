
function setup_xmlselect(){
    var $html_edit = $(".xmlselect-edit");
    var $html_raw_xml = $html_edit.children(".raw-xml");
    $html_edit.children(".tag-node").remove();
    if($html_raw_xml.length > 0){
        var acte_brut = $html_raw_xml.text();
        var is_editable = $html_edit.hasClass("editable");
        $html_raw_xml.hide();
        var acte = new_taggable_xml(xml_parser(acte_brut), is_editable);
        acte.append_to($html_edit);
        $html_edit.parent().children("button").click(function(){
            console.log(acte.xml.toString());
        });
    }
}

$(document).ready(function(){
        setup_xmlselect();

        var clipboard = new Clipboard("#btn-copy-xml",{
            text: function(trigger){
                return $(".raw-xml").text();
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
            setup_xmlselect();
        });

        $("#btn-cancel-edit-xml").click(function(){
            $(this).hide();
            $("#btn-save-edit-xml").hide();
            $("#btn-copy-xml").show();
            $("#btn-edit-xml").show();

            $(".xmlselect-edit").removeClass("editable");
            setup_xmlselect();
        });

        $("#btn-save-edit-xml").click(function(){
            $(this).hide();
            $("#btn-cancel-edit-xml").hide();
            $("#btn-copy-xml").show();
            $("#btn-edit-xml").show();

            $(".xmlselect-edit").removeClass("editable");
            setup_xmlselect();
        });
});
