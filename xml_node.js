

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
        return that.text.toString();
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

    /*
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

        if(start == 0){
            select = that.text.substring(0, end);
            other = that.text.substring(end);

            that.parent.parent.ascend_text(that.parent, select, true);
        }else{
            other = that.text.substring(0, start);
            select = that.text.substring(start);

            that.parent.parent.ascend_text(that.parent, select, false);
        }

        that.text = other;

        if(that.text.length == 0){
            that.parent.remove_child(that);
        }else{
            if(that.view != null)
                that.view.update();
        }
    }
    */
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

    this.pretty_string = function(indentation)
    {
        var s = "";
        var attrs = "";

        for(var i = 0; i < that.attributes.length; i++){
            attrs += that.attributes[i];
            if(i < that.attributes.length -1)
                attrs += ", ";
        }

        s = "[" + that.tag + "] "
            + "(" + attrs + ") ";

        s += "\n";
        for(var i = 0; i < that.contents.length; i++){
            s += indentation + that.contents[i].pretty_string(indentation);
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

    /*
    this.ascend_text = function(child, text, is_before)
    {
        var index = that.contents.indexOf(child);
        console.log("index:"+index+" is_before:"+is_before);

        if(is_before && index > 0){
            var before = that.contents[index -1];
            if(before instanceof xml_text_node){
                before.text = before.text + ' ' + text;
                return;
            }
        }else if(!is_before && index < that.contents.length){
            var after = that.contents[index + 1];
            if(after instanceof xml_text_node){
                after.text = text + ' ' + after.text;
                return;
            }
        }

        var node = new xml_text_node(text);

        if(is_before)
            that.contents.splice(index, 0, node);
        else{
            if(index == that.contents.length -1)
                that.contents.push(node);
            else
                that.contents.splice(index+1, 0, node);
        }

        if(that.view != null)
            that.view.update_rows();
    }
    */

    // Ajoute un attribut
    this.add_attribut = function(new_attribut){
        if(that.attributes.includes(new_attribut))
            return false;
        that.attributes.push(new_attribut);
        return true;
    }

    // Retire une attribut
    this.remove_attribut = function(attribut){
        if(!that.attributes.includes(attribut))
            return false;

        var index = that.attributes.indexOf(attribut);
        that.attributes.splice(index, 1);

        return true;
    }

    // Test si contient l'attribut
    this.contains_attribut = function(attribut){
        return that.attributes.includes(attribut);
    }

    this.add_child(child);
}
