/*
  Interface objects for xml_contents
 */

function taggable_xml (xml)
{
    that = this;
    this.xml = null;
    this.$element = null;
    this.$attach_child = null;

    that.xml = xml;

    this.set_html_xml_node = function()
    {
        var ul = $("<ul>",
            {
                'class': 'xml_contents'
            });

        var dd = $("<dd>", {});

        var dt = $("<dt>",
            {
                text: that.xml.get_tag()
            });

        dd.append(ul);

        that.$element = [dt, dd];
    }

    this.set_html_tag_text_node = function()
    {
        var dt = $("<dt>", {
            text: that.xml.get_tag()
        });

        var dd = $("<dd>", {});

	var tg_text = new taggable_xml(that.xml.get_text_node());
	dd.append(tg_text.$element);

        that.$element = [dt, dd];
    }

    this.set_html_text_node = function()
    {
        var p_source = $("<p>",
            {
                'class': 'xml_text source',
                text: that.xml.get_text()
            });

        var button_ok = $("<button>",
            {
                text: 'Ok'
            });

        var form_tag_choice = $("<form>",
            {
                'class': 'tag_choice',
            });

        var p_show = $("<p>",
            {
                'class': 'xml_text show'
            });

        var section_panel = $("<section>",
            {
                'class': 'selection_panel',
            });

        var section_text_node = $("<section>",
            {
                'class': 'text_node',
            });

        var choices = new radio_list(choice_tags, 'ID');
        form_tag_choice.append(choices.$element());

        section_panel.append(form_tag_choice);
        section_panel.append(p_show);

        section_text_node.append(p_source);
        section_text_node.append(button_ok);
        section_text_node.append(section_panel);

        that.$element = section_text_node;
    }

    this.append_to = function($where)
    {
        $where.append(that.$element);
/*
        if(that.xml.is_tag_text_node()){
            var tmp = that.$attach_child;
            var fils = new taggable_text(that.xml.get_contents());
            fils.append_to(tmp);
        }else if(!that.xml.is_text_node()){
            var nodes = that.xml.get_contents().get_nodes();
            var tmp = that.$attach_child;
            for(var i = 0; i < nodes.length; i++){
                var li = $("<li>", {});
                tmp.append(li);

                var fils = new taggable_text(nodes[i]);
                fils.append_to(li);
            }
        }
*/
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

    that.set_html();

}
