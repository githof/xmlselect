/*
  xml_contents est une structure récursive qui contient des listes de
  xml_nodes
*/
function xml_node()
{
    var that = this;
    this.tag = null;
    this.contents = null;

    /*
        Initialise un node (tag, contents)
     */
    this.set_node = function(tag, contents)
    {
        that.tag = tag;
        that.contents = contents;
        return that;
    }

    /*
        Initialise un node (null, text)
     */
    this.set_text_node = function(text)
    {
	    return that.set_node(null, text);
    }

    /*
        Initialise un node (tag, text)
     */
    this.set_tag_text_node = function(tag, text)
    {
        var text_node = new xml_node().set_text_node(text);
        return that.set_node(tag, text_node);
    }

    /*
        Getter tag
     */
    this.get_tag = function()
    {
        return that.tag;
    }

    /*
        Getter contents
     */
    this.get_contents = function()
    {
        return that.contents;
    }

    /*
        Getter text
     */
    this.get_text = function()
    {
        return that.get_contents();
    }

    this.pretty_string = function(indentation)
    {
        if(that.tag == null)
            return that.contents.toString();

        return that.tag+": "+that.contents.pretty_string(indentation+"   ");
    }
}

function xml_contents()
{
    var that = this;
    this.contents = [];

    /*
        Ajoute un node
     */
    this.add_xml_node = function(node)
    {
        that.contents.push(node);
        return that;
    }

    /*
        Ajoute un node (tag, contents)
     */
    this.add_node = function (tag, contents)
    {
        var node = new xml_node().set_node(tag, contents);
        return that.add_xml_node(node);
    }

    /*
        Ajoute un node (tag, text)
     */
    this.add_tag_text = function(tag, text)
    {
        var node = new xml_node().set_tag_text_node(tag, text);
        return that.add_xml_node(node);
    }

    /*
        Ajoute un node (null, text)
     */
    this.add_text = function (text)
    {
        var node = new xml_node().set_text_node(text);
        return that.add_xml_node(node);
    }

    this.toString = function()
    {
        var s = "";
        that.pretty_string("");
        return s;
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
}

