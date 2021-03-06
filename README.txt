
# Structure

+ L'idée générale est la suivante :

  - text_node et  tag_text_node doivent hériter de xml_node.  Les
  trois auront des comportements en commun, mais les deux prototypes
  hérités auront des comportements spécifiques

  - un objet taggable_xml (dans un fichier taggable_xml.js) servira de
  contrôleur pour la vue associée à un objet xml_node.
  L'attribut de nom xml stockera le xml_node
  L'attribut $elements contiendra l'objet jquery dans lequel tous les
  éléments html sont préparés (quels éléments html, ça dépendra du
  type de xml_node spécifique, voir ci-dessous)
  La méthode append_to($where) permettra d'intégrer les éléments html
  dans une page :
  dans la fonction appelante, on fera par exemple
	new taggable_xml(xml).append_to($("#test"));

  - Dans un premier temps, on ne fait que construire les éléments
    html, sans y associer d'interaction, pour s'assurer qu'on est ok
    sur tous les cas.

+ Les éléments html associés aux trois types de xml_nodes :

  - text_node (un exemple)

      <section class="text_node">
	<p class="xml_text source">
	  Text contents of the text_node
	</p>
	<button>OK</button>
	<section class="selection_panel">
	  <form class="tag_choice">
	    <ul>
	    <li>
	      <input id="xml_epoux_tag_prenom"
	                  type="radio" name="tag" value="prenom">
	      <label for="xml_epoux_tag_prenom">prenom</label>
	    </li>
            <li>
              <input id="xml_epoux_tag_nom"
                          type="radio" name="tag" value="nom">
              <label for="xml_epoux_tag_nom">nom</label>
            </li>
            </ul>
          </form>
	  <p class="xml_text show">
	  </p>
	</section>
      </section>

    NB : les input radio sont générés par un objet radio_list de
    elements.js
    Dans un premier temps, on peut laisser de côté la question des id,
    on la traitera par la suite

  - tag_text_node

        <dt>tag</dt>
        <dd>
	  text_node (donc la structure ci-dessus)
	</dd>

  - xml_node

        <dt>tag</dt>
	<dd>
	  <ul class="xml_contents">
	    suite de xml_nodes
	  </ul>
	</dd>
