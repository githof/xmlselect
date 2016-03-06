
/*
  Uses jquery and lodash libraries
  (lodash for _.map function)
 */

function $xml_text(classname)
{
    return $('<p>',
	     {
		 'class': "xml_text " + classname,
	     });
}

function radio_input(label, base_id)
{
    var that = this;
    this.id = base_id + "_" + label;
    
    this.$input = $('<input>',
			{
			    'id': this.id,
			    'type': 'radio',
			    'name': 'tag',
			    'value': label
			});
    this.$label = $('<label>',
			{
			    'for': this.id,
			    text: label
			});

    this.checked = function()
    {
	that.$input.attr('checked', 'checked')
    }

    this.elements = function()
    {
	return [that.$input, that.$label];
    }
}

function radio_list(labels, base_id)
{
    var that = this;
    this.inputs = [];
    this.$ul = $('<ul>');

    this.create_input = function(label)
    {
	return new radio_input(label, base_id);
    }

    this.inputs = _.map(labels, that.create_input);

    this.default_index = function (i)
    {
	that.inputs[i].checked();
    }

    this.add_input = function(radio)
    {
	return $('<li>').append(radio.elements());
    }

    this.$ul.append(_.map(that.inputs, that.add_input));

    this.elements = function ()
    {
	return that.$ul;
    }
}


