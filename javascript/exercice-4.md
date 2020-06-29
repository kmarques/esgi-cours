# Mario Kart Simulator

![Here we go](https://metrouk2.files.wordpress.com/2016/02/mario-kart.png?w=1200&h=630&crop=1)

Rendu : ./exercice-4/mario-kart.js

## Objectifs

### Fun

Plusieurs véhicules circulent sur un circuit définit sur une seule direction.
Le premier a dépassé la distance du circuit gagne.
Les véhicules pourront ramasser des objets pendant la course et le renvoyer.

### Technique

Il s'agit de mettre en place les techniques de création d'objets javascript vu en cours.

## Etapes de conception

### Le pilote

Le pilote possède un nom (_publique_) et un état (_privé_).
Il peut agir de 3 manières différentes:

- receiveData(data): (_publique_) permet de recevoir des données de la voiture
    ```javascript
    {
        state: "normal"|"happy"|"sad"|"ready",
        origin: "Luigi"
    }
    ```
- needUpdate(): (_publique_) Vérifie selon les infos si on doit appeler la fonction _speak_
- getState(): (_privilégié_) permet de connaître l'état du pilote
- speak(): (_publique_) permet de générer des phrases, selon les données reçues
  - state: "ready" => "Here we go!"
  - state: "happy" => "Let's have some fun!"
  - state: "sad" => "Outch!!! Damn {origin}"
  - state: "normal" => ""

Si le pilote reçoit 2 fois une même instruction, il ne doit rien faire.

### Le véhicule

Un véhicule peut avoir 2 catégories différentes (Moto, Voiture), les deux catégories seront modélisées par deux objets héritants de l'objet Véhicule.
Un véhicule possède un pilote (_privé_), un numéro (_publique_) et potentiellement une arme (_privé_) et une distance (_privé_)
Un véhicule peut agir de X manières :

- init(conf): (constructor) permet d'initialiser un véhicule
    ```javascript
        {
            name: "Mario",
            number: 1,
            maxVelocity: 12,
            onFire: callback(victim)
        }
    ```
- receiveData(data): (_publique_) permet de recevoir des données du circuit
    ```javascript
        {
            event: "start"|"info"|"weapon"|"attack"|"finish",
            value:
                - (si event = attack)
                    {
                        origin: "Luigi",
                        effect: null|-X
                    }
                - (si event = weapon)
                    weapon,
            competitors: {
                "Mario": 132,
                "Luigi": 140,
                ...
            },
            distance: 147
        }
    ```
- needUpdate(): (_publique_) Vérifie selon les infos si on doit appeler la fonction _display_
- ride(X): (_privé_) Avance le véhicule de X unités, signale au pilote le status "normal" si aucun autre status soulevé
- getWeapon(weapon): (_privé_) Stocke l'arme récupérée grâce aux données du circuit, signale au pilote le status "happy" et avance le véhicule
- fireWeapon(): (_privé_) Avance le véhicule et retourne sa victime grâce à la callback _onFire_
- touched(data={origin, effect}): (_privé_) Agit selon la valeur de l'event "attack" puis signale le status "sad" et son origine au pilote
  - null: Le véhicule n'avance pas
  - -X: Le véhicule recule de X unités
  - si bubble, la protection est détruite et le véhicule avance
- display(): (_publique_) Affiche l'état suivant du véhicule (distance, arme, pilote, vitesse courante)

### Les armes

- tank : Attaque le véhicule devant soi
- bubble : Protection pendant 1 attaque
- banana : Lance une banane à la position précédente, le premier véhicule qui dépasse cette position est attaquée
- switch : Switch de position entre le 1er et soi

## Le Workflow

Le board (Circuit) gère les tours de jeu et garde en mémoire tout ce qui se passe.

- Circuit => constructor()
  - Circuit => this.initRun()
    - Génère la distance totale du circuit
    - Génère les positions des différentes boîtes d'armes
  - Circuit => this.initVehicules()
    - Génère les véhicules (chacun a la même vitesse maximal calculée selon la longueur du circuit)
- Pour chaque tour (intervalle d'1 seconde)
  - Pour chaque véhicule
    - Circuit => calcule les infos du véhicule
    - Circuit => appelle vehicule.receiveData(vehiculeInfo)
      - Vehicule => calcule les infos du pilote
      - Si besoin, Vehicule => pilot.receiveData(piloteInfo)
    - Circuit => appelle vehicule.needUpdate()
    - Si true, Circuit => appelle vehicule.display()
      - Vehicule => pilot.needUpdate()
      - Si true, Vehicule => pilot.speak()
