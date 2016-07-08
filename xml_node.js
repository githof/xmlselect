

function xml_text_node(text)
{
    var that = this;

    this.text = text;
    this.parent = null;
    this.view = null;

    this.set_view = function(view)
    {
        that.view = view;
        that.view.xml = that;
    }

    this.pretty_string = function(indentation)
    {
        return indentation + that.text.toString();
    }

    this.toString = function()
    {
        return that.pretty_string("");
    }

    // Découpe le texte en 3 et demande au père de diviser les nodes
    this.split_text = function(tag, start, end)
    {
        if(start < 0 || start >= that.text.length)
            return;

        if(end < 1 || end > that.text.length)
            return;

        if(end <= start)
            return;

        var before = select = after = "";

        before = that.text.substring(0, start).replace(/\s/g, '');
        if(before.length > 0)
            before = that.text.substring(0, start);

        select = that.text.substring(start, end);

        after = that.text.substring(end).replace(/\s/g, '');
        if(after.length > 0)
            after = that.text.substring(end);

        if(that.view != null)
            that.view.remove_from_DOM();

        that.parent.split_child(that, tag, before, select, after);
    }

    this.ascend_text = function(start, end)
    {
        if(start < 0 || start >= that.text.length)
            return;

        if(end < 1 || end > that.text.length)
            return;

        if(end <= start)
            return;

        if(start != 0 && end != that.text.length)
            return;

        var select = other = "";
        var is_before = false;

        if(start == 0){
            select = that.text.substring(0, end);
            other = that.text.substring(end);
            is_before = true;
        }else{
            other = that.text.substring(0, start);
            select = that.text.substring(start);
            is_before = false;
        }

        that.text = other;

        if(other.length == 0)
            that.parent.remove_child(that);

        that.parent.parent.ascend_text(that.parent, select, is_before);

        if(that.view != null){
            if(that.text.length == 0)
                that.view.remove_from_DOM();
            else
                that.view.update();
        }
    }
}

function xml_tag_node(tag, child)
{
    var that = this;

    this.tag = tag;
    this.parent = null;
    this.contents = [];
    this.attributes = [];
    this.view = null;

    this.set_view = function(view)
    {
        this.view = view;
        this.view.xml = that;
    }

    this.add_child = function(child)
    {
        if(_.isString(child)){
            var n = new xml_text_node(child);
            that.contents.push(n);
            n.parent = that;
        }else if(Array.isArray(child)){
            for(var i = 0; i < child.length; i++){
                that.contents.push(child[i]);
                child[i].parent = that;
            }
        }
    }

    this.remove_child = function(child)
    {
        var index = that.contents.indexOf(child);
        if(index < 0)
            return;

        that.contents.splice(index, 1);
    }

    this.pretty_string = function(indentation)
    {
        var s = "";
        var attrs = "";

        for(var i = 0; i < that.attributes.length; i++){
            attrs += that.attributes[i];
            if(i < that.attributes.length -1)
                attrs += ", ";
        }

        s = indentation + "[" + that.tag + "] "
            + "(" + attrs + ") ";

        s += "\n";
        for(var i = 0; i < that.contents.length; i++){
            s += indentation + that.contents[i].pretty_string(indentation + "  ");
            if(!s.endsWith("\n"))
                s += "\n";
        }

        return s;
    }

    this.toString = function()
    {
        return that.pretty_string("");
    }

    this.split_child = function(child, tag, before, select, after)
    {
        var new_nodes = [];
        var tmp;

        if(before.length != 0){
            tmp = new xml_text_node(before);
            tmp.parent = that;
            new_nodes.push(tmp);

        }

        tmp = new xml_tag_node(tag, select);
        tmp.parent = that;
        new_nodes.push(tmp);

        if(after.length != 0){
            tmp = new xml_text_node(after);
            tmp.parent = that;
            new_nodes.push(tmp);
        }

        var index = that.contents.indexOf(child);
        that.contents.splice(index, 1);

        for(var i = new_nodes.length -1; i >= 0; i--)
            that.contents.splice(index, 0, new_nodes[i]);

        if(that.view != null)
            that.view.update_children();
    }

    this.ascend_text = function(child, text, is_before)
    {
        var index = that.contents.indexOf(child);

        if(is_before){
            var before = null;
            if(index > 0){
                before = that.contents[index -1];
            }

            if(before != null && before instanceof xml_text_node){
                before.text = before.text + ' ' + text;

                if(before.view != null)
                    before.view.update();
            }else{
                var node = new xml_text_node(text);
                node.parent = that;
                that.contents.splice(index, 0, node);
            }
        }else{
            var after = null;
            if(index < that.contents.length -1){
                after = that.contents[index + 1];
            }

            if(after != null && after instanceof xml_text_node){
                after.text = text + ' ' + after.text;

                if(after.view != null)
                    after.view.update();
            }else{
                var node = new xml_text_node(text);
                node.parent = that;
                that.contents.splice(index+1, 0, node);
            }
        }

        if(child.contents.length == 0){
            index = that.contents.indexOf(child);
            that.contents.splice(index, 1);

            if(child.view != null)
                child.view.remove_from_DOM();
        }

        if(that.view != null)
            that.view.update_children();
    }

    this.add_attribut = function(new_attribut){
        if(that.attributes.includes(new_attribut))
            return false;
        that.attributes.push(new_attribut);
        return true;
    }

    this.remove_attribut = function(attribut){
        if(!that.attributes.includes(attribut))
            return false;

        var index = that.attributes.indexOf(attribut);
        that.attributes.splice(index, 1);

        return true;
    }

    this.contains_attribut = function(attribut){
        return that.attributes.includes(attribut);
    }

    this.add_child(child);
}
