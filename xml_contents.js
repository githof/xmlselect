/*
  xml_contents est une structure récursive qui contient des listes de
  xml_nodes
*/
function xml_node()
{
    var that = this;
    this.tag = null;
    this.contents = null;

    this.set_node = function(tag, contents)
    {
	that.tag = tag;
	that.contents = contents;
	return that;
    }

    this.set_text_node = function(text)
    {
	return that.set_node(null, text);
    }

    this.set_tag_text_node = function(tag, text)
    {
	var text_node = new xml_node().set_text_node(text);
	return that.set_node(tag, text_node);
    }
}

function xml_contents()
{
    var that = this;
    this.contents = [];

    this.add_xml_node = function(node)
    {
	that.contents.push(node);
	return that;
    }

    this.add_node = function (tag, contents)
    {
	var node = new xml_node().set_node(tag, contents);
	return that.add_xml_node(node);
    }

    this.add_tag_text = function(tag, text)
    {
	var node = new xml_node().set_tag_text_node(tag, text);
	return that.add_xml_node(node);
    }

    this.add_text = function (text)
    {
	var node = new xml_node().set_text_node(text);
	return that.add_xml_node(node);
    }
}

