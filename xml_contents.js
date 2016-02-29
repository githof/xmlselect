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
	    return that.set_node(null, text);
    }

    /*
        Initialise un node(tag, text)
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
        if(that.tag != null)
            return that.get_contents().get_contents();

        if(that.tag == null)
            return that.contents;
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
        Ajoute un node(tag, contents)
     */
    this.add_node = function(tag, contents)
    {
        var node = new xml_node().set_node(tag, contents);
        return that.add_xml_node(node);
    }

    /*
        Ajoute un node(tag, text)
     */
    this.add_tag_text = function(tag, text)
    {
        var node = new xml_node().set_tag_text_node(tag, text);
        return that.add_xml_node(node);
    }

    /*
        Ajoute un node(null, text)
     */
    this.add_text = function(text)
    {
        var node = new xml_node().set_text_node(text);
        return that.add_xml_node(node);
    }

    /*
        Getter du tableau de contents
     */
    this.get_contents = function()
    {
        return that.contents;
    }

    /*
        Getter d'un node par index
     */
    this.get_node_by_index = function(index)
    {
        if(that.contents.length > index)
            return that.contents[index];
        return null;
    }

    /*
        Getter d'un node par tag
     */
    this.get_node_by_tag = function(tag)
    {
        for(var i = 0; i < that.contents.length; i++){
            if(that.contents[i].get_tag() == tag)
                return that.contents[i];
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
        for(var i = 0; i < that.contents.length; i++){
            s += indentation + that.contents[i].pretty_string(indentation);
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
    var contents = container_node.get_contents().get_contents();
    for(var i = 0; i < contents.length; i++){
        if(contents[i] === node){
            index = i;
            break;
        }
    }

    if(index == -1)
        return;

    contents.splice(index, 1);

    if(start > 0) {
        contents.splice(index, 0, new xml_node().set_text_node(text.substring(0, start)));
        index++;
    }

    contents.splice(index, 0, new xml_node().set_tag_text_node(tag, text.substring(start, end)));
    index++;

    if(end < text.length)
        contents.splice(index, 0, new xml_node().set_text_node(text.substring(end)));
}
