/*
  Interface objects for xml_contents
 */

function taggable_xml (xml, id, tag)
{
    var that = this;
    this.xml = null;
    this.id = id;
    this.$element = null;
    this.$source = null;
    this.$show = null;
    this.sel_show = null;
    this.duplicate_tags = {};
    this.tag = tag;

    this.get_id = function(tag)
    {
        var base = that.id + '_' + ( tag != null ? tag : "" );
        if (that.duplicate_tags[tag] == undefined)
        {
            that.duplicate_tags[tag] = 1
            return base;
        }
        return base + ++that.duplicate_tags[tag];
    }

    this.set_html_xml_node = function()
    {
        var $ul = $("<ul>",
            {
                'class': 'xml_contents'
            });

        var $dd = $("<dd>", {});

        var $dt = $("<dt>",
            {
                text: that.xml.get_tag()
            });

        var nodes = that.xml.get_contents().get_nodes();
        for(var i = 0; i < nodes.length; i++){
            var $li = $("<li>", {});
            $ul.append($li);

            var fils = new taggable_xml(nodes[i], that.get_id(nodes[i].get_tag()), that.xml.get_tag());
            $li.append(fils.$element);
        }

        $dd.append($ul);

        that.$element = [$dt, $dd];
    }

    this.set_html_tag_text_node = function()
    {
        var $dt = $("<dt>", {
            text: that.xml.get_tag()
        });

        var $dd = $("<dd>", {});

	    var tg_text = new taggable_xml(that.xml.get_text_node(), that.id, that.xml.get_tag());
	    $dd.append(tg_text.$element);

        that.$element = [$dt, $dd];
    }

    this.set_html_text_node = function()
    {
        var input_tags = wedding_tags[that.tag];
        console.log(input_tags);
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
            $form_tag_choice.append(choices.$element());

            $section_panel.append($form_tag_choice);
            $section_panel.append($p_show);

            $section_text_node.append($p_source);
            $section_text_node.append($button_ok);
            $section_text_node.append($section_panel);

	    that.$source = $p_source;
	    that.$show = $p_show;
            that.sel_show = new select_and_show(that.$source, that.$show);

            that.$element = $section_text_node;
        }
    }

    this.append_to = function($where)
    {
        $where.append(that.$element);
    }

    this.set_html = function()
    {
        if(that.xml.is_text_node()){
            that.set_html_text_node();
        }else if(that.xml.is_tag_text_node()){
            that.set_html_tag_text_node();
        }else{
            that.set_html_xml_node();
        }
    }


    that.xml = xml;

    that.set_html();

}
