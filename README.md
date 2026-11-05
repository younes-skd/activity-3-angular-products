# Activité 3 — Angular 19 : gestion de produits

Application Standalone suivant les neuf pages du PDF « Activité Pratique Angular » et ses trois exercices complémentaires.

## Démarrer

Java 21, Node 22 et Python 3 recommandés.

```sh
./mvnw verify
cd frontend && npm ci && npm run build && cd ..
python3 dev.py
```

Frontend : http://localhost:4200 ; backend : http://localhost:8083 ; Swagger : http://localhost:8083/swagger-ui/index.html.

## Fonctionnalités

- Composants Standalone sans NgModule, routage Accueil / Produits, RouterLink et RouterOutlet.
- Bootstrap 5 et Bootstrap Icons importés dans la feuille de style globale.
- Blocs `@if`, `@else`, `@for` avec suivi par identifiant et gestion du catalogue vide.
- Injection de dépendances, HttpClient, provideHttpClient et Observables RxJS.
- Liste des produits, badge de sélection, suppression avec confirmation et recharge.
- Formulaire d'ajout avec validation ; PATCH de sélection ; filtre par nom en temps réel.
- États chargement, erreur, nouvelle tentative et désactivation pendant une mutation.
- CORS limité à l'origine locale `http://localhost:4200` pour l'API sur 8083.

## Progression à expliquer

Le PDF commence par un tableau en mémoire, le déplace dans un service, puis remplace ce service par HttpClient. `local-product.service.ts` conserve l'étape intermédiaire ; `api.ts` et `products.ts` constituent la version HTTP finale. Le modèle produit est typé plutôt que `any`. `CurrencyPipe` est explicitement importé dans le composant Standalone.

## Démonstration

1. Naviguer Accueil → Produits.
2. Chercher « portable », puis effacer le filtre.
3. Ajouter un produit nommé « Écran », prix 250, quantité 3.
4. Cliquer sur son badge et vérifier que la sélection persiste après rechargement.
5. Supprimer ce produit et confirmer.
6. Montrer l'onglet Network : GET, POST, PATCH, DELETE et OPTIONS CORS.
7. Arrêter le backend, recharger puis montrer l'erreur et le bouton Réessayer.

Tests backend : CRUD réel, sélection, requête invalide, prévol CORS. Build Angular de production avec vérification stricte des templates.
Référence : https://www.youtube.com/watch?v=7cy5MMkoMTo.
