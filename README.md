# Projet Angular
Le but de ce projet était de découvrir le framework Angular et de maitriser les concepts fondamentaux.
    Compte admin:
        username:     admin
        mot de passe: admin
    
    Compte simple utilisateur
         username:     noumouke
         mot de passe: noumouke

Le lien de la video: https://youtu.be/kH4LiJ7tN9A

Le lien de l'application hébergée sur vercel: https://angular-front-m1-miage2022-2023-y2s6.vercel.app/assignments
                                              https://angular-back-end-m1-miage2022-2023.vercel.app/api/assignments

Le lien git : https://github.com/Nouke/angularFrontM1Miage2022_2023
              https://github.com/Nouke/angularBackEndM1Miage2022_2023
# Fonctionnalités

Ajout d'un nouvel assignment.
Connexion en tant qu'admin.
Connexion en tant que simple utilisateur.
Modifification et ajout d'un assignment si on est simple utilisateur.
Modifification et suppression d'un assignment si on est simple utilisateur.
Liste des assignments dans un tableau.
Acceder au détail d'un assignment.
Fonction de pagination.
La recherche sur les assignments soit par nom, matière, remarque, ...
Le tri par rendu, ou non rendu sur les assignments.
Fonction bouton grisé si pas admin.
Ajout d'un auteur, matière(nom matière, image professeur, image de la matière, note de la matière), pour chacun des assignments. 
Fonction devoir rendu ou non.
On ne peut pas rendre, un assignment qui n'a pas été noté.


# Comment lancer ce projet?

Pour démarrer ce projet, vous aurez besoin de:

Node.js, version v16.17.0
Angular CLI,version 14.2.3
npm, version 8.19.3

Ensuite, clonez le dépôt sur votre ordinateur avec la commande: git clone "url"
Ouvrez un terminal et naviguez jusqu'à la racine du projet
Tapez la commande npm install pour pouvoir installer les dépendances nécessaires au démarrage du projet
Tapez la commande ng serve pour démarrer l'application (coté front end)
Ensuite, tapez la commande node server.js, pour demarrrer le backend
Ouvrez votre navigateur et accédez à l'URL http://localhost:4200 pour accéder à l'application

# Ressources
Angular documentation
Node.js
[Angular material] (https://material.angular.io/)





# AssignmentApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
