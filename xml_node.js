

function xml_text_node(text)
{
    var that = this;

    this.text = text;
    this.parent = null;
    this.view = null;

    this.set_view = function(view)
    {
        this.view = view;
        this.view.xml = that;
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
}

function xml_contents_node(contents)
{
    var that = this;

    this.contents = [];
    this.parent = null;
    this.view = null;

    this.set_view = function(view)
    {
        this.view = view;
        this.view.xml = that;
    }

    this.add_contents = function(contents)
    {
        this.contents.push(contents);
        contents.parent = that;
    }

    this.pretty_string = function(indentation)
    {
        var s = "\n";
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
            that.view.update_rows(position);
    }

    if(contents != null){
        for(var i = 0; i < contents.length; i++)
            that.add_contents(contents[i]);
    }
}

function xml_tag_node(tag, child)
{
    var that = this;

    this.tag = tag;
    this.child = null;
    this.parent = null;
    this.attributs = [];
    this.view = null;

    this.set_view = function(view)
    {
        this.view = view;
        this.view.xml = that;
    }

    this.set_child = function(child)
    {
        if(_.isString(child)){
            that.child = new xml_text_node(child);
        }else if(Array.isArray(child)){
            that.child = new xml_contents_node(child);
        }else{
            that.child = child;
        }

        if(that.child != null)
            that.child.parent = that;
    }

    this.pretty_string = function(indentation)
    {
        var attrs = "";

        for(var i = 0; i < that.attributs.length; i++){
            attrs += that.attributs[i];
            if(i < that.attributs.length -1)
                attrs += ", ";
        }

        return "[" + that.tag+ "] " + "(" + attrs + ") "+ that.child.pretty_string(indentation+"   ");
    }

    this.toString = function()
    {
        return that.pretty_string("");
    }

    // Remplace le node child par au plus 3 nodes text(before),
    // tag_text(tag, select) et text(after)
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

        that.set_child(new_nodes);

        if(that.view != null)
            that.view.update_child();
    }

    // Ajoute un attribut
    this.add_attribut = function(new_attribut){
        if(that.attributs.includes(new_attribut))
            return false;
        that.attributs.push(new_attribut);
        return true;
    }

    // Retire une attribut
    this.remove_attribut = function(attribut){
        if(!that.attributs.includes(attribut))
            return false;

        var index = that.attributs.indexOf(attribut);
        that.attributs.splice(index, 1);

        return true;
    }

    // Test si contient l'attribut
    this.contains_attribut = function(attribut){
        return that.attributs.includes(attribut);
    }

    this.set_child(child);
}
