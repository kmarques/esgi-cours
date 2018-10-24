# Projet Javascript

## Règles

- Sujet libre soumis à validation
	- sujet proposé: Créer un mini-react
		- Gestion 
- 3 personnes par groupes maximum
- Groupement libre
- Soumission sur Github: github.com/user/esgi-javascript/project

## Objectif

Mise en place des différents bases vues en cours.

## Obligations

Norme Javascript: ES6/ES2015

Notions présentes:
- Prototypes d'objet natif (String, Object, Number, ...)
	- Object.prop_access
	- String.interpolate(animal)
		- remplace toutes les chaines entourées de "{{ }}" par la valeur de l'objet
		-  `machaine = "Type d'animal: {{ type.name }}"`
		- `animal = {type: {name: "chien"}}`
		- `machaine.interpolate(animal)  => "Type d'animal: chien"`
- Création d'objet et objet hérité dont certains avec attributs/méthodes privés
- Création de modules
- Gestion de l'historique (système de routage)
- Utilisation des Promises
- Utilisation du type_checker
	- version minimum: 2
	- exemples cas d'utilisation: Vérifier les données en entrée de constructeur 

Contenu index.html:

    <html>
	    <head>
		    ...
		    <script type="module" src="./main.js"/>
	    </head>
	    <body>
		    <div id="root"></div>
		</body>
	</html>

## Interdictions

- Utilisation de task-runners
- Utilisation de Framework (React, Angular, VueJS, ...)

## Evaluation

- Code Source + Soutenance
- Durée de la soutenance: 20min
	- Démo: 15min
	- Questions: 5min
- Audience: Devant la promotion ou huis-clos
- Bonus: 2 points max
	- Participation à la communauté OpenSource (0.5pt)
	- Utilisation de l'API FileReader (0.5pt)
	- ServiceWorker:
		- gestion online/offline (0.5pt)
		- WebPush (0.5pt)
		- ... (0.5pt)
	- Sensors API
		- Proximity (0.5pt)
		- Orientation (0.5pt)
		- ... (0.5pt)
