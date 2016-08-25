

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

    this.to_XML = function(indentation = null)
    {
        if(indentation != null)
            return indentation + that.text;
        return that.text;
    }

    this.toString = function()
    {
        return that.to_XML("");
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

        //before = that.text.substring(0, start).replace(/\s/g, '');
        //if(before.length > 0)
            before = that.text.substring(0, start);

        select = that.text.substring(start, end);

        //after = that.text.substring(end).replace(/\s/g, '');
        //if(after.length > 0)
            after = that.text.substring(end);

        if(that.view != null)
            that.view.remove_from_DOM();

        that.parent.split_child(that, tag, before, select, after);
    }

    this.ascend_text = function(start, end)
    {
        if(start < 0 || start >= that.text.length)
            return false;

        if(end < 1 || end > that.text.length)
            return false;

        if(end <= start)
            return false;

        if(start != 0 && end != that.text.length)
            return false;

        if(!that.can_ascend())
            return false;

        var select = other = "";
        var is_before = false;
        var can_before = false, can_after = false;

        var index = that.parent.contents.indexOf(that);
        if(index < 0)
            return false;

        can_before = index == 0;
        can_after = index == that.parent.contents.length -1;

        if(start == 0 && can_before){
            select = that.text.substring(0, end);
            other = that.text.substring(end);
            is_before = true;
        }else if(end == that.text.length && can_after){
            other = that.text.substring(0, start);
            select = that.text.substring(start);
            is_before = false;
        }else{
            return false;
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

        return true;
    }

    this.can_ascend = function()
    {
        if(that.parent == null || that.parent.parent == null)
            return false;

        var index = that.parent.contents.indexOf(that);
        return index == 0 || index == that.parent.contents.length -1;
    }

    this.go_up = function()
    {
        if(that.parent.contents.length == 1)
            that.parent.parent.move_child(that.parent, -1);
        else
            that.parent.move_child(that, -1);
    }

    this.go_down = function()
    {
        if(that.parent.contents.length == 1)
            that.parent.parent.move_child(that.parent, 1);
        else
            that.parent.move_child(that, 1);
    }

    this.can_go_up = function()
    {
        if(that.parent == null)
            return false;

        var index = 0;
        if(that.parent.contents.length == 1){
            if(that.parent.parent != null)
                index = that.parent.parent.contents.indexOf(that.parent);
            else
                return false;
        }else{
            index = that.parent.contents.indexOf(that);
        }
        return index > 0;
    }

    this.can_go_down = function()
    {
        if(that.parent == null)
            return false;

        var index = 0;
        var length = 0;
        if(that.parent.contents.length == 1){
            if(that.parent.parent != null){
                length = that.parent.parent.contents.length;
                index = that.parent.parent.contents.indexOf(that.parent);
            }else
                return false;
        }else{
            length = that.parent.contents.length;
            index = that.parent.contents.indexOf(that);
        }
        return index < length-1;
    }
}

function xml_tag_node(tag, children, attributes = [])
{
    var that = this;

    this.tag = null;
    this.parent = null;
    this.contents = [];
    this.attributes = [];
    this.view = null;

    this.init = function(tag, children, attributes)
    {
        that.tag = tag;

        if(_.isString(children) || children instanceof xml_text_node){
            that.add_child(children);
        }else if(Array.isArray(children)){
            for(var i = 0; i < children.length; i++)
                that.add_child(children[i]);
        }

        for(var i = 0; i < attributes.length; i++)
            that.add_attribut(attributes[i]);
    }

    this.set_view = function(view)
    {
        this.view = view;
        this.view.xml = that;
    }

    this.add_child = function(child, position = -1)
    {
        var node = null;
        if(_.isString(child)){
            node = new xml_text_node(child);
        }else if(child instanceof xml_text_node
            || child instanceof xml_tag_node){
            node = child;
        }

        if(position < 0 || position >= that.contents.length)
            that.contents.push(node);
        else
            that.contents.splice(position, 0, node);

        node.parent = that;
    }

    this.remove_child = function(child)
    {
        var index = that.contents.indexOf(child);
        if(index < 0)
            return;

        that.contents.splice(index, 1);
    }

    this.merge_consecutive_text_node = function()
    {
        var last = null;
        var current = null;
        for(var i = that.contents.length -1; i >= 0; i--){
            current = that.contents[i];
            if(last != null
                && last instanceof xml_text_node
                && current instanceof xml_text_node){
                current.text = current.text + last.text;
                that.contents.splice(i+1, 1);
                if(last.view != null)
                    last.view.remove_from_DOM();
            }
            last = current;
        }
    }

    this.to_XML = function(indentation = null)
    {
        var s = "";

        if(indentation != null)
            s += indentation;

        s += "<"+that.tag;

        for(var i = 0; i < that.attributes.length; i++){
            s += " " + that.attributes[i] + '="true"';
        }

        s += ">";

        if(indentation != null)
            s += "\n";

        for(var i = 0; i < that.contents.length; i++){
            s += that.contents[i].to_XML((indentation != null) ? indentation + "  " : null);
            s += "\n";
        }

        if(indentation != null)
            s += indentation;

        s += "</" + that.tag + ">";

        return s;
    }

    this.toString = function()
    {
        return that.to_XML("");
    }

    this.split_child = function(child, tag, before, select, after)
    {
        var index = that.contents.indexOf(child);
        that.contents.splice(index, 1);

        if(after.length != 0)
            that.add_child(after, index);

        that.add_child(new xml_tag_node(tag, select), index);

        if(before.length != 0)
            that.add_child(before, index);

        if(that.view != null)
            that.view.update_children();
    }

    this.ascend_text = function(child, text, is_before)
    {
        var index = that.contents.indexOf(child);

        if(is_before)
            that.add_child(text, index);
        else
            that.add_child(text, index+1);

        if(child.contents.length == 0){
            index = that.contents.indexOf(child);
            that.contents.splice(index, 1);

            if(child.view != null)
                child.view.remove_from_DOM();
        }

        that.merge_consecutive_text_node();

        if(that.view != null)
            that.view.update_children();
    }

    this.move_child = function(child, position_relative)
    {
        var index = that.contents.indexOf(child);
        that.remove_child(child);
        that.add_child(child, index + position_relative);

        that.merge_consecutive_text_node();

        if(that.view != null)
            that.view.update_children();
    }

    this.add_attribut = function(new_attribut)
    {
        if(that.attributes.includes(new_attribut))
            return false;
        that.attributes.push(new_attribut);

        if(that.view != null)
            that.view.update();
        return true;
    }

    this.remove_attribut = function(attribut)
    {
        if(!that.attributes.includes(attribut))
            return false;

        var index = that.attributes.indexOf(attribut);
        that.attributes.splice(index, 1);

        if(that.view != null)
            that.view.update();
        return true;
    }

    this.contains_attribut = function(attr)
    {
        return that.attributes.includes(attr);
    }

    this.init(tag, children, attributes);
}
