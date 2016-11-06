/*
    needs xml_node.js
*/

function xml_parser(xml)
{
    var that = this;

    this.recursive_parse = function(node)
    {
        if(node.childNodes.length == 0){
            return new xml_text_node(node.textContent);
        }else{
            var tag = null, children = [], id = null, don = false, attr = null;

            tag = node.nodeName;

            for(var i = 0; i < node.attributes.length; i++){
                var attribute = node.attributes[i];
                if(attribute.name == "id")
                    id = attribute.value;
                else if(attribute.name == "don")
                    don = true;
                else if(attribute.name == "attr")
                    attr = attribute.value;
            }

            for(var i = 0; i < node.childNodes.length; i++){
                children.push(that.recursive_parse(node.childNodes[i]));
            }

            return new xml_tag_node(tag, children, id, don, attr);
        }
    }

    return this.recursive_parse(
        new DOMParser().parseFromString(xml, "text/xml").firstChild
    );
}
