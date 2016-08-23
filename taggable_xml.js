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
    }

    this.button_ascend = function()
    {
        if(!that.xml.can_ascend())
            return;

        var $button = $("<button>", {
            'class': 'button_ascend',
            text: '<'
        });

        $button.click(function(){
            var start = that.sel_show.before.length;
            var end = start + that.sel_show.select.length;

            if(start == end)
                that.sel_show.show_selected(true);
            else
                that.xml.ascend_text(start, end);
        })

        return $button;
    }

    this.buttons_up_down = function()
    {
        var $button_up = $("<button>", {
            text: '^'
        });

        var $button_down = $("<button>", {
            text: 'v'
        });

        return [$button_up, $button_down];
    }

    this.button_tag = function(tag)
    {
        var $button = $("<button>", {
            'class': 'button_tag',
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

    this.html_leaf = function()
    {
        var $p_text = $("<p>", {
            text: that.xml.text
        });

        var $div_leaf = $("<div>", {
            'class': 'text_node leaf'
        });

        $div_leaf.append($p_text);

        return $div_leaf;
    }

    this.html_splittable = function(input_tags)
    {
        var $p_source = $("<p>", {
            'class': 'xml_text source',
            text: that.xml.text
        });

        var $p_show_title = $("<div>", {
            text: "Selection :"
        });

        var $p_show = $("<p>", {
            'class': 'xml_text show'
        });

        var $section_selection_panel = $("<section>", {
            'class': 'selection_panel'
        });

        var $div_text_node = $("<div>", {
            'class': 'text_node'
        });

        var $div_left = $("<div>", {
            'class': 'left'
        });

        var $div_right = $("<div>", {
            'class': 'right'
        });

        for(var i = 0; i < input_tags.length; i++){
            $section_selection_panel.append(that.button_tag(input_tags[i]));
        }

        $div_right.append(that.buttons_up_down());
        $div_right.append(that.button_ascend());

        $div_left.append(
            $p_source,
            $section_selection_panel,
            $p_show_title,
            $p_show
        );

        $div_text_node.append(
            $div_left,
            $div_right
        );

        that.sel_show = new select_and_show($p_source, $p_show);

        return $div_text_node;
    }

    this.html = function()
    {
        var tag = that.xml.parent.tag;

        var input_tags = wedding_tags[tag.toLowerCase()];
        if(input_tags == null){
            that.$root = that.html_leaf();
        }else {
            that.$root = that.html_splittable(input_tags);
        }
    }

    this.html_buttons_tag = function()
    {
        var tag = that.xml.parent.tag;
        var input_tags = wedding_tags[tag.toLowerCase()];

        $container_buttons = $("<div>", {
            class: "selection_panel"
        });

        if(input_tags != null){
            for(var i = 0; i < input_tags.length; i++)
                $container_buttons.append(that.button_tag(input_tags[i]));
        }

        return $container_buttons;
    }

    this.html_container_edit = function($p_source)
    {
        var $container_edit = $("<div>");

        var $p_show = $("<p>", {
            class: 'xml_text show'
        });

        $container_edit.append(
            that.html_buttons_tag(),
            that.buttons_up_down(),
            that.button_ascend(),
            $p_show
        );

        that.sel_show = new select_and_show($p_source, $p_show);

        return $container_edit;
    }

    this.html_bis = function()
    {
        var $div_text_node = $("<div>", {
            class: "text_node"
        });

        var $p_source = $("<p>", {
            class: "xml_text source",
            text: that.xml.text
        });

        var $container_edit = that.html_container_edit($p_source);
        $container_edit.hide();

        $div_text_node.append(
            $p_source,
            $container_edit
        );

        that.$root = $div_text_node;

        $p_source.click(function(){
            if($container_edit.is(":visible")){
                $container_edit.hide();
                $div_text_node.removeClass("text_node_edit");
            }else{
                $container_edit.show();
                $div_text_node.addClass("text_node_edit");
            }
        });
    }

    this.append_to = function($where)
    {
        $where.append(that.$root);
    }

    this.set_xml(xml);
    this.html_bis();
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
        var $div_tag = $("<div>", {
            text: that.xml.tag,
            class: 'tag_title'
        });

        var $dt = $("<dt>", {});
        $dt.append(
            $div_tag,
            that.html_attributes()
        );

        var $dd = $("<dd>", {
            'class': 'children'
        });

        var children = that.html_children();
        for(var i = 0; i< children.length; i++)
            children[i].append_to($dd);

        that.$root_children = $dd;

        that.$root = $("<div>", {
            'class': 'tag_node'
        });

        that.$root.append([$dt, $dd]);
    }

    this.html_bis = function()
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

        that.$root_children.children().detach();

        for(var i = 0; i < children.length; i++){
            if(children[i].view == null)
                current_child_view = that.html_child(children[i]);
            else
                current_child_view = children[i].view;
            current_child_view.append_to(that.$root_children);
        }
    }

    this.append_to = function($where)
    {
        $where.append(that.$root);
    }

    this.set_xml(xml);
    this.html_bis();
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
