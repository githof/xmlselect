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
function taggable_text_xml(xml)
{
    var that = this;

    this.xml = null;
    this.$root = null;
    this.sel_show = null;
    this.id = null;
    this.duplicate_tags = {};

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
    }

    this.html = function()
    {
        var $text_node = $("<div>", {
            class: "text-node"
        });

        var $source = $("<div>", {
            class: "xml-text source",
            text: that.xml.text
        });

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

        $text_node.append(
            $close,
            $side_buttons,
            $source,
            $container_edit
        );

        that.$root = $text_node;
        that.check_buttons();

        $source.click(function(){
            if(!$container_edit.is(":visible")){
                that.close_others_edit();
                that.show_edit();
            }
        });
        $close.click(function(){
            that.hide_edit();
        });
    }

    this.append_to = function($where)
    {
        $where.append(that.$root);
    }

    this.set_xml(xml);
    this.html();
}

// taggable d'un xml tag node
function taggable_tag_xml(xml)
{
    var that = this;

    this.xml = null;
    this.$root = null;
    this.$root_attributes = null;
    this.$root_children = null;

    this.set_xml = function(xml)
    {
        that.xml = xml;
        that.xml.view = that;
    }

    this.remove_from_DOM = function()
    {
        that.$root.hide().remove();
    }

    this.html_attribut = function(value)
    {
        var $div_attribut = $("<div>", {
            text: value,
            'class': 'attribut'
        });

        $div_attribut.click(function(){
            if(that.xml.remove_attribut(value))
                $div_attribut.hide().remove();
        });

        return $div_attribut;
    }

    this.add_attribut = function(value, $where_error)
    {
        if(value.length == 0){
            show_error_message("L'attribut est vide", $where_error);
            return;
        }

        if(that.xml.contains_attribut(value)){
            show_error_message("L'attribut existe déjà", $where_error);
            return;
        }

        if(that.xml.add_attribut(value))
            that.$root_attributes.append(that.html_attribut(value));
    }

    this.html_attributes = function()
    {
        var attributes_available = attributes_set[that.xml.tag];
        if(attributes_available == null){
            return null;
        }

        that.$root_attributes = $("<div>", {
            'class': 'attributes_tag'
        });

        var $label_attribut = $("<span>", {
            text: "Attributs :"
        });

        var $combo_box_attributes = $("<select>");
        $combo_box_attributes.hide();

        var $attribut_add_other = $("<input>", {
            'type': "text",
            'placeholder': ' Autre attribut'
        });
        $attribut_add_other.hide();

        var $button_add = $("<button>", {
            text: "+"
        });

        var $container_add_attribut = $("<span>", {
            'class': 'attribut_add_container'
        });
        $container_add_attribut.append(
            $combo_box_attributes,
            $attribut_add_other,
            $button_add
        );

        var $section_attributes = $("<section>", {
            'class': 'section_attributes'
        });
        $section_attributes.append(
            $label_attribut,
            that.$root_attributes,
            $container_add_attribut
        );

        // ajoute attributs du set au combo box
        for(var i = 0; i < attributes_available.length; i++){
            $combo_box_attributes.append(
                $("<option>", {
                    'value': attributes_available[i],
                    text: attributes_available[i]
                })
            );
        }

        // ajoute 'autre' au combo box
        $combo_box_attributes.append(
            $("<option>", {
                'value': option_other,
                text: option_other
            })
        );

        // si changement au combo box
        $combo_box_attributes.change(function(){
            var new_attribut = $combo_box_attributes.val();

            if(new_attribut == option_other)
                $attribut_add_other.show();
            else
                $attribut_add_other.hide();
        });

        // ajout des attributs déjà présent
        for(var i = 0; i < that.xml.attributes.length; i++){
            that.$root_attributes.append(that.html_attribut(that.xml.attributes[i]));
        }

        // si click sur button ajouter new attribut
        $button_add.click(function(){
            var new_attribut = $combo_box_attributes.val();

            if($combo_box_attributes.is(":hidden")){
                $combo_box_attributes.show();

                if(new_attribut == option_other)
                    $attribut_add_other.show();
                else
                    $attribut_add_other.hide();

                return;
            }

            if(new_attribut == option_other)
                new_attribut = $attribut_add_other.val();

            that.add_attribut(
                new_attribut,
                $container_add_attribut);

            $combo_box_attributes.hide();
            $attribut_add_other.val("");
            $attribut_add_other.hide();
        });

        return $section_attributes;
    }

    this.html_child = function(xml)
    {
        return new_taggable_xml(xml);
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
        var $balise_ouvrante = $("<div>", {
            text: "<"+that.xml.tag+">",
            class: "xml-tag"
        });

        var $balise_fermante = $("<div>", {
            text: "</"+that.xml.tag+">",
            class: "xml-tag"
        });

        var $children = $("<div>", {
            class: 'children'
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
function new_taggable_xml(xml)
{
    if(xml instanceof xml_text_node)
        return new taggable_text_xml(xml);
    if(xml instanceof xml_tag_node)
        return new taggable_tag_xml(xml);
    return null;
}
