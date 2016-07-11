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
            var tag = null, children = [], attributes = [];

            tag = node.nodeName;

            for(var i = 0; i < node.attributes.length; i++){
                if(node.attributes[i].value === "true")
                    attributes.push(node.attributes[i].name);
            }

            for(var i = 0; i < node.childNodes.length; i++){
                children.push(that.recursive_parse(node.childNodes[i]));
            }

            return new xml_tag_node(tag, children, attributes);
        }
    }

    return this.recursive_parse(
        new DOMParser().parseFromString(xml, "text/xml").firstChild
    );
}
