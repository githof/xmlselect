/*
  Interface objects for xml nodes
 */

// affichage d'un message d'erreur temporaire
function show_error_message(message, $where)
{
    var $span = $("<span>",{
        'class': "warning",
        text: message
    });

    $where.append($span);
    $span.show(0).fadeTo(2000, 0, function(){
        $span.hide(0);
    });
}

// taggable d'un xml text node
function taggable_text_xml(xml, is_editable = false)
{
    var that = this;

    this.xml = null;
    this.$root = null;
    this.sel_show = null;
    this.id = null;
    this.duplicate_tags = {};
    this.is_editable = is_editable;

    this.set_xml = function(xml)
    {
        that.xml = xml;
        that.xml.view = that;
    }

    this.remove_from_DOM = function()
    {
        that.$root.hide().remove();
    }

    this.update = function()
    {
        if(that.sel_show != null){
            that.sel_show.$select.text(that.xml.text);
            that.sel_show.clean_bounds();
            that.sel_show.extract_text();
            that.sel_show.$show.text("");
        }else{
            that.$root.find("p").text(that.xml.text);
        }

        that.check_buttons();
    }

    this.html_button_ascend = function()
    {
        var $button = $("<button data-toggle='tooltip' data-placement='top' title='Remonter' class='button-tag button-ascend btn btn-sm'>");
        $button.html("<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'></span>");
        $button.tooltip();

        $button.click(function(){
            var start = that.sel_show.before.length;
            var end = start + that.sel_show.select.length;

            if(start == end)
                that.sel_show.show_selected(true);
            else
                that.xml.ascend_text(start, end);
        });

        return $button;
    }

    this.html_button_up = function()
    {
        var $button = $("<button title='Avant' class='button-tag button-up btn btn-sm'>");
        $button.html("<span class='glyphicon glyphicon-chevron-up' aria-hidden='true'></span>");

        $button.click(function(){
            that.xml.go_up();
        });

        return $button;
    }

    this.html_button_down = function()
    {
        var $button = $("<button title='Après' class='button-tag button-down btn btn-sm'>");
        $button.html("<span class='glyphicon glyphicon-chevron-down' aria-hidden='true'></span>");

        $button.click(function(){
            that.xml.go_down();
        });

        return $button;
    }

    this.html_button_tag = function(tag)
    {
        var $button = $("<button>", {
            'class': 'button-tag btn btn-sm',
            'text': tag
        });

        $button.click(function(){
            var start = that.sel_show.before.length;
            var end = start + that.sel_show.select.length;

            if(start == end)
                that.sel_show.show_selected(true);
            else
                that.xml.split_text(tag, start, end);
        });

        return $button;
    }

    this.html_buttons_tag = function()
    {
        var tag = that.xml.parent.tag;
        var input_tags = wedding_tags[tag.toLowerCase()];
        var buttons = [];

        if(input_tags != null){
            for(var i = 0; i < input_tags.length; i++)
                buttons.push(that.html_button_tag(input_tags[i]));
        }

        return buttons;
    }

    this.check_buttons = function()
    {
        var $button = that.$root.find(".button-up");
        if(that.xml.can_go_up())
            $button.show();
        else
            $button.hide();

        $button = that.$root.find(".button-down");
        if(that.xml.can_go_down())
            $button.show();
        else
            $button.hide();

        $button = that.$root.find(".button-ascend");
        if(that.xml.can_ascend())
            $button.show();
        else
            $button.hide();
    }

    this.html_buttons = function()
    {
        $buttons = $("<div data-toggle='tooltip' data-placement='left' title='Options sur la sélection (Double clic pour tout sélectionner)' class='buttons-tag'>");

        $buttons.append(
            that.html_button_ascend(),
            that.html_buttons_tag()
        );
        $buttons.tooltip();
        return $buttons;
    }

    this.html_container_edit = function($source)
    {
        var $container_edit = $("<div class='text-node-edit-container'>");

        var $show = $("<div>", {
            class: 'xml-text show'
        });

        $container_edit.append(
            that.html_buttons(),
            $show
        );

        that.sel_show = new select_and_show($source, $show);

        return $container_edit;
    }

    this.show_edit = function()
    {
        that.$root.find(".text-node-edit-container").show();
        that.$root.find(".text-node-edit-close").show();
        that.$root.find(".text-node-edit-side-buttons").show();
        that.$root.addClass("text-node-edit");
    }

    this.hide_edit = function()
    {
        that.$root.find(".text-node-edit-container").hide();
        that.$root.find(".text-node-edit-close").hide();
        that.$root.find(".text-node-edit-side-buttons").hide();
        that.$root.removeClass("text-node-edit");
    }

    this.close_others_edit = function()
    {
        var $root = that.xml;
        while($root.parent != null)
            $root = $root.parent;
        $root = $root.view.$root;

        $root.find(".text-node-edit-container").hide();
        $root.find(".text-node-edit-close").hide();
        $root.find(".text-node-edit-side-buttons").hide();
        $root.find(".text-node-edit").removeClass("text-node-edit");
        var $inline_disabled = $root.find(".inline-node-disabled");
        $inline_disabled.removeClass("inline-node-disabled");
        $inline_disabled.addClass("inline-node");
    }

    this.html = function(is_editable)
    {
        var $text_node = $("<div>", {
            class: "text-node"
        });
        that.$root = $text_node;

        var $source = $("<div>", {
            class: "xml-text source",
            text: that.xml.text
        });

        if(that.is_editable){
            var $close = $("<span>", {
                class: "text-node-edit-close",
                html: "&times;",
                "aria-label": "close"
            });
            $close.hide();

            var $side_buttons = $("<div>", {
                class: "text-node-edit-side-buttons"
            });
            $side_buttons.append(
                that.html_button_up(),
                that.html_button_down()
            );
            $side_buttons.hide();

            var $container_edit = that.html_container_edit($source);
            $container_edit.hide();

            $source.click(function(){
                if(!$container_edit.is(":visible")){
                    that.close_others_edit();
                    that.show_edit();
                    var $parent = that.$root.parent();
                    if($parent.hasClass("inline-node")){
                        $parent.removeClass("inline-node");
                        $parent.addClass("inline-node-disabled");
                    }
                }
            });
            $close.click(function(){
                that.hide_edit();
                var $parent = that.$root.parent();
                if($parent.hasClass("inline-node-disabled")){
                    $parent.removeClass("inline-node-disabled");
                    $parent.addClass("inline-node");
                }
            });

            $text_node.append(
                $close,
                $side_buttons,
                $source,
                $container_edit
            );
            that.check_buttons();
        }else{
            $text_node.append($source);
        }
    }

    this.append_to = function($where)
    {
        $where.append(that.$root);
    }

    this.set_xml(xml);
    this.html();
}

// taggable d'un xml tag node
function taggable_tag_xml(xml, is_editable = false)
{
    var that = this;

    this.xml = null;
    this.$root = null;
    this.$root_attributes = null;
    this.$root_children = null;
    this.is_editable = is_editable

    this.set_xml = function(xml)
    {
        that.xml = xml;
        that.xml.view = that;
    }

    this.remove_from_DOM = function()
    {
        that.$root.hide().remove();
    }

    this.html_attribute = function(attribute)
    {
        $attribute = $("<div class='attribute' title='Supprimer'>");
        $attribute.text(attribute);

        $attribute.click(function(){
            that.xml.remove_attribut(attribute);
        });
        return $attribute;
    }

    this.add_attribute = function(key, val)
    {
        if(key.length == 0 || val.length == 0)
            return;

        var attr = key+"="+val;
        if(that.xml.contains_attribut(attr))
            return;

        that.xml.add_attribut(attr);
    }

    this.html_attributes = function()
    {
        $attributes = $("<div class='attributes'>");

        for(var i = 0; i < that.xml.attributes.length; i++)
            $attributes.append(that.html_attribute(that.xml.attributes[i]));

        var $button_add = $("<button title='Ajouter attribut' class='button-add-attribute btn btn-sm'>");
        $button_add.html("<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>");
        that.$root_attributes = $attributes;

        var $form_add = $("<div class='attribute-new'>");
        var $form_key = $("<input type='text' placeholder='Attribut'>");
        var $span_equal = $("<span>=</span>");
        var $form_value = $("<input type='text' placeholder='Valeur'>");
        var $button_submit = $("<button title='Ajouter' class='button-add-attribute btn btn-sm'>");
        $button_submit.html("<span class='glyphicon glyphicon-ok' aria-hidden='true'></span>");
        var $button_cancel = $("<button title='Annuler' class='button-add-attribute btn btn-sm'>");
        $button_cancel.html("<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>");

        $form_add.append(
            $form_key,
            $span_equal,
            $form_value,
            $button_submit,
            $button_cancel
        );
        $form_add.hide();

        $button_add.click(function(){
            $button_add.hide();
            $form_add.show();
        });

        $button_submit.click(function(){
            var key = $form_key.val();
            var val = $form_value.val();

            that.add_attribute(key, val);

            $button_add.show();
            $form_add.hide();
            $form_key.val("");
            $form_value.val("");
        });

        $button_cancel.click(function(){
            $button_add.show();
            $form_add.hide();
            $form_key.val("");
            $form_value.val("");
        });

        $attributes.append(
            $button_add,
            $form_add
        );

        return $attributes;
    }

    this.html_child = function(xml)
    {
        return new_taggable_xml(xml, that.is_editable);
    }

    this.html_children = function()
    {
        var children = [];

        for(var i = 0; i < that.xml.contents.length; i++){
            var child = that.html_child(that.xml.contents[i]);
            children.push(child);
        }

        return children;
    }

    this.html = function()
    {
        var is_inline = (that.xml.contents.length <= 1)? "inline-node" : "";
        var $balise_ouvrante = $("<div class='xml-tag "+is_inline+"'>");

        var $balise_fermante = $("<div class='xml-tag "+is_inline+"'>");

        $balise_ouvrante.append(
            $("<span class='xml-tag-arrow'><</span>"),
            $("<span class='xml-tag-name'>"+that.xml.tag+"</span>")
        );
        if(that.is_editable)
            $balise_ouvrante.append(that.html_attributes());
        $balise_ouvrante.append($("<span class='xml-tag-arrow'>></span>"));

        $balise_fermante.append(
            $("<span>", {class:"xml-tag-arrow", text: "</"}),
            $("<span class='xml-tag-name'>"+that.xml.tag+"</span>"),
            $("<span class='xml-tag-arrow'>></span>")
        );

        var $children = $("<div>", {
            class: 'children '+is_inline
        });

        var children = that.html_children();
        for(var i = 0; i< children.length; i++)
            children[i].append_to($children);

        that.$root_children = $children;

        that.$root = $("<div>", {
            'class': 'tag-node'
        });

        that.$root.append(
            $balise_ouvrante,
            $children,
            $balise_fermante
        );
    }

    this.update_children = function()
    {
        var children = that.xml.contents;
        var current_child_view = null;
        var need_update = [];

        that.$root_children.children().detach();

        for(var i = 0; i < children.length; i++){
            if(children[i].view == null)
                current_child_view = that.html_child(children[i]);
            else{
                current_child_view = children[i].view;
                need_update.push(current_child_view);
            }
            current_child_view.append_to(that.$root_children);
        }

        for(var i = 0; i < need_update.length; i++)
            need_update[i].update();
    }

    this.update = function()
    {
        that.$root_attributes.detach();
        that.$root.children(".xml-tag").first().children(".xml-tag-name").after(that.html_attributes());
        that.update_children();
    }

    this.append_to = function($where)
    {
        $where.append(that.$root);
    }

    this.set_xml(xml);
    this.html();
}

// Instanciation facile d'un xml node
function new_taggable_xml(xml, is_editable = false)
{
    if(xml instanceof xml_text_node)
        return new taggable_text_xml(xml, is_editable);
    if(xml instanceof xml_tag_node)
        return new taggable_tag_xml(xml, is_editable);
    return null;
}
