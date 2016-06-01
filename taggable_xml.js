/*
  Interface objects for xml_contents
 */

function taggable_xml (xml, id, tag, parent)
{
    var that = this;
    this.xml = xml;
    this.id = id;
    this.$element = null;
    this.$source = null;
    this.$show = null;
    this.sel_show = null;
    this.duplicate_tags = {};
    this.tag = tag;
    this.parent = parent;

    this.get_id = function(tag)
    {
        var base = that.id + '_' + ( tag != null ? tag : "" );
        if (that.duplicate_tags[tag] == undefined)
        {
            that.duplicate_tags[tag] = 1;
            return base;
        }
        return base + ++that.duplicate_tags[tag];
    }

    this.set_html_tag = function()
    {
        var $div_tag = $("<div>", {
            text: that.xml.get_tag(),
            class: 'xml_tag'
        });

        var attributs_available = attributs_set[that.xml.get_tag()];
        if(attributs_available == null){
            return $div_tag;
        }

        var $container_attributs = $("<div>", {
            'class': 'attributs_tag'
        });

        var $label_attribut = $("<span>", {
            text: "Attributs :"
        });

        var $combo_box_attributs = $("<select>");
        $combo_box_attributs.hide();

        var $button_add = $("<button>", {
            text: "+"
        });

        for(var i = 0; i < attributs_available.length; i++){
            $combo_box_attributs.append(
                $("<option>", {
                    'value': attributs_available[i],
                    text: attributs_available[i]
                })
            );
        }

        $button_add.click(function(){
            if($combo_box_attributs.is(":hidden")){
                $combo_box_attributs.show();
                return;
            }

            var new_attribut = $combo_box_attributs.val();

            if(that.xml.attributs.includes(new_attribut)){
                var $span = $("<span>",{
                    'class': "warning",
                    text: "L'attribut existe déjà"
                });

                $div_container_add_attribut.append($span);
                $span.show(0).fadeTo(2000, 0, function(){
                    $span.hide(0);
                });
                return;
            }

            var $div_attribut = $("<div>", {
                text: new_attribut,
                'class': 'attribut'
            });
            $container_attributs.append($div_attribut);
            that.xml.attributs.push(new_attribut);

            $combo_box_attributs.hide();
        })

        var $container_add_attribut = $("<span>", {
            'class': 'attribut_add_container'
        });
        $container_add_attribut.append(
            $combo_box_attributs,
            $button_add
        );

        var $section_attributs = $("<section>", {
            'class': 'section_attributs'
        });
        $section_attributs.append(
            $label_attribut,
            $container_attributs,
            $container_add_attribut
        );

        return [
            $div_tag,
            $section_attributs
        ];
    }

    this.set_html_xml_node = function()
    {
        var $ul = $("<ul>",
            {
                'class': 'xml_contents'
            });

        var $dt = $("<dt>", {});
        $dt.append(that.set_html_tag());

        var $dd = $("<dd>", {});

        var nodes = that.xml.get_contents().get_nodes();
        for(var i = 0; i < nodes.length; i++){
            var $li = $("<li>", {});
            $ul.append($li);

            var fils = new taggable_xml(
                nodes[i],
                that.get_id(nodes[i].get_tag()),
                that.xml.get_tag(),
                that);

            $li.append(fils.$element);
        }

        $dd.append($ul);

        that.$element = [$dt, $dd];
    }

    this.set_html_tag_text_node = function()
    {
        var $dt = $("<dt>", {});
        $dt.append(that.set_html_tag());

        var $dd = $("<dd>", {});

	    var tg_text = new taggable_xml(
            that.xml.get_text_node(),
            that.id,
            that.xml.get_tag(),
            that);
	    $dd.append(tg_text.$element);

        that.$element = [$dt, $dd];
    }

    this.set_html_text_node = function()
    {
        var input_tags = wedding_tags[that.tag];
        if(input_tags == null){
            var $p_text = $("<p>", {
                text: that.xml.get_text()
            });

            var $section_leaf = $("<section>", {
                'class': 'text_node leaf'
            });

            $section_leaf.append($p_text);

            that.$element = $section_leaf;
        }else {
            var $p_source = $("<p>",
                {
                    'class': 'xml_text source',
                    text: that.xml.get_text()
                });

            var $button_ok = $("<button>",
                {
                    text: 'Ok'
                });

            var $form_tag_choice = $("<form>",
                {
                    'class': 'tag_choice',
                    'id': that.get_id('form')
                });

            var $p_show_title = $("<div>", {
                text: "Selection :"
            });

            var $p_show = $("<p>",
                {
                    'class': 'xml_text show'
                });

            var $section_panel = $("<section>",
                {
                    'class': 'selection_panel'
                });

            var $section_text_node = $("<section>",
                {
                    'class': 'text_node'
                });

            var choices = new radio_list(input_tags, that.get_id('input'));
            choices.default_index(0);
            $form_tag_choice.append(choices.$element());

            $section_panel.append($form_tag_choice);

            $section_text_node.append(
                $p_source,
                $section_panel,
                $button_ok,
                $p_show_title,
                $p_show);

	        that.$source = $p_source;
	        that.$show = $p_show;
            that.sel_show = new select_and_show(that.$source, that.$show);

            $button_ok.click(function(){
                var tag = $form_tag_choice.find('input[type=radio]:checked').val();
                var start = that.sel_show.before.length;
                var end = start + that.sel_show.select.length;

                var updated_infos = tag_text_node(
                    that.xml,
                    that.parent.xml,
                    tag,
                    start,
                    end);

                var index_start = updated_infos.index_start;
                var nb = updated_infos.nb;
                var $li_old = that.$element.parent();
                var nodes = that.parent.xml.get_contents().get_nodes();

                for(var i = index_start; i < index_start + nb; i++){
                    var $li = $("<li>", {});
                    var fils = new taggable_xml(
                        nodes[i],
                        that.parent.get_id(nodes[i].get_tag()),
                        that.parent.xml.get_tag(),
                        that.parent);

                    fils.append_to($li);
                    $li_old.before($li);
                }

                that.$element.parent().fadeOut().remove();
            });

            that.$element = $section_text_node;
        }
    }

    this.append_to = function($where)
    {
        $where.append(that.$element);
    }

    this.set_html = function() {
        if (that.xml.is_text_node()) {
            that.set_html_text_node();
        } else if (that.xml.is_tag_text_node()) {
            that.set_html_tag_text_node();
        } else {
            that.set_html_xml_node();
        }
    }

    that.set_html();
}
