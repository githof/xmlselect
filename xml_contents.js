/*
  xml_contents est une structure récursive qui contient des listes de
  xml_nodes
*/

function xml_node()
{
    var node_types = {
        XML_NODE: 0,
        TEXT_NODE: 1,
        TAG_TEXT_NODE: 2
    };

    var that = this;
    this.tag = null;
    this.contents = null;
    this.type = node_types.XML_NODE;

    /*
        Initialise un node(tag, contents)
     */
    this.set_node = function(tag, contents)
    {
        that.tag = tag;
        that.contents = contents;
        return that;
    }

    /*
        Initialise un node(null, text)
     */
    this.set_text_node = function(text)
    {
	that.set_node(null, text);
        that.type = node_types.TEXT_NODE;
        return that;
    }

    /*
        Initialise un node(tag, text)
     */
    this.set_tag_text_node = function(tag, text)
    {
        var text_node = new xml_node().set_text_node(text);
        that.set_node(tag, text_node);
        that.type = node_types.TAG_TEXT_NODE;
        return that;
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
        if(that.tag != null)
            return that.get_contents().get_contents();

        if(that.tag == null)
            return that.contents;
    }

    this.is_text_node = function()
    {
        return that.type == node_types.TEXT_NODE;
    }

    this.is_tag_text_node = function()
    {
        return that.type == node_types.TAG_TEXT_NODE;
    }

    this.toString = function()
    {
        return that.pretty_string("");
    }

    this.pretty_string = function(indentation)
    {
        if(that.tag == null)
            return that.contents.toString();

        return "["+that.tag+"] "+that.contents.pretty_string(indentation+"   ");
    }
}

function xml_contents()
{
    var that = this;
    this.nodes = [];

    /*
        Adds a node
     */
    this.add_xml_node = function(node)
    {
        that.nodes.push(node);
        return that;
    }

    /* 
       ________________________________________________
       Below, syntactic sugar to create and add nodes

       new_* returns a new node
       add_* adds a new node and returns this
             (the contents to which the node is added)
     */

    this.new_node = function(tag, contents)
    {
        return new xml_node().set_node(tag, contents);
    }

    this.add_node = function(tag, contents)
    {
        return that.add_xml_node(that.new_node(tag, contents));
    }

    this.new_tag_text = function(tag, text)
    {
        return new xml_node().set_tag_text_node(tag, text);
    }

    this.add_tag_text = function(tag, text)
    {
        return that.add_xml_node(that.new_tag_text(tag, text));
    }

    this.new_text = function(text)
    {
        return new xml_node().set_text_node(text);
    }

    this.add_text = function(text)
    {
        return that.add_xml_node(that.new_text(text));
    }

    /*
        Getter du tableau de nodes
     */
    this.get_nodes = function()
    {
        return that.nodes;
    }

    /*
        Getter d'un node par index
     */
    this.get_node_by_index = function(index)
    {
        if(that.nodes.length > index)
            return that.nodes[index];
        return null;
    }

    /*
        Getter d'un node par tag
     */
    this.get_node_by_tag = function(tag)
    {
        for(var i = 0; i < that.nodes.length; i++){
            if(that.nodes[i].get_tag() == tag)
                return that.nodes[i];
        }
        return null;
    }

    this.toString = function()
    {
        return that.pretty_string("");
    }

    this.pretty_string = function(indentation)
    {
        var s = "\n";
        for(var i = 0; i < that.nodes.length; i++){
            s += indentation + that.nodes[i].pretty_string(indentation);
            if(!s.endsWith("\n"))
                s += "\n";
        }
        return s;
    }
}

/**
 * Divise un node (null, text) en trois node(null, text), node(tag, text) et node(null, text)
 * Si start est 0, il n'y a pas de premier node(null, text)
 * Si end est égale à la longueur du texte, il n'y a pas de dernier node(null, text)
 *
 * @param node node à découper
 * @param container_node parent du node à découper
 * @param tag nouveau tag
 * @param start index de début (inclu) du texte pour le nouveau node(tag, text)
 * @param end index de end (exclu) du texte pour le nouveau node(tag, text)
 */
function tag_text_node(node, container_node, tag, start, end)
{
    if(node == null || node.get_tag() != null)
        return;

    var text = node.get_text();

    if(text == null)
        return;

    if(start < 0 || start >= text.length)
        return;

    if(end < 1 || end > text.length)
        return;

    if(end <= start)
        return;

    var index = -1;
    var nodes = container_node.get_contents().get_nodes();
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i] === node){
            index = i;
            break;
        }
    }

    if(index == -1)
        return;

    nodes.splice(index, 1);

    if(start > 0) {
        nodes.splice(index, 0, new xml_node().set_text_node(text.substring(0, start)));
        index++;
    }

    nodes.splice(index, 0, new xml_node().set_tag_text_node(tag, text.substring(start, end)));
    index++;

    if(end < text.length)
        nodes.splice(index, 0, new xml_node().set_text_node(text.substring(end)));
}
