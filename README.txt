# Task Management Application

Application de gestion de projets et de tâches construite avec Spring Boot et Angular.

##  Technologies utilisées

### Backend
- **Java 17+**
- **Spring Boot 3.x**
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - JWT Authentication
- **Base de données**: PostgreSQL / MySQL / H2
- **Maven** - Gestionnaire de dépendances

### Frontend
- **Angular 18+**
- **TypeScript**
- **Tailwind CSS**
- **RxJS**
- **Angular Router**
- **HttpClient**

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Java JDK 17** ou supérieur : [Télécharger Java](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** et **npm** : [Télécharger Node.js](https://nodejs.org/)
- **Angular CLI** : `npm install -g @angular/cli`
- **PostgreSQL** (ou MySQL) : [Télécharger PostgreSQL](https://www.postgresql.org/download/)
- **Maven** : [Télécharger Maven](https://maven.apache.org/download.cgi) (optionnel si vous utilisez le wrapper Maven)

---

## Configuration de la base de données

### MySQL (Configuration actuelle du projet)

1. **Installer MySQL** et démarrer le service
   - Télécharger MySQL : [https://dev.mysql.com/downloads/](https://dev.mysql.com/downloads/)
   - Ou utiliser XAMPP/WAMP qui inclut MySQL

2. **Créer la base de données** :

Ouvrez MySQL en ligne de commande ou phpMyAdmin et exécutez :

```sql
CREATE DATABASE task;
```

**Note** : Si vous utilisez XAMPP, la base de données sera créée automatiquement par Hibernate grâce à `ddl-auto=create`.

3. **Configuration actuelle** - Fichier `backend/src/main/resources/application.properties` :

```properties
spring.application.name=Task
spring.datasource.url=jdbc:mysql://localhost:3306/task
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=create
jwt.secret=koCBIzgQtbzJ5SujgrTaY/F8Okq09VY+qsUe0Vny4Og=
jwt.expiration=36000000
```

** Important** : 
- `ddl-auto=create` **supprime et recrée** les tables à chaque démarrage
- Pour la production, utilisez `ddl-auto=update` pour conserver les données
- Le mot de passe MySQL est vide (configuration par défaut XAMPP)

### Alternatives de configuration

#### Pour conserver les données entre les redémarrages :
```properties
spring.jpa.hibernate.ddl-auto=update
```

#### Pour voir les requêtes SQL générées :
```properties
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

#### Si vous utilisez un mot de passe MySQL :
```properties
spring.datasource.password=votre_mot_de_passe
```

---

##  Installation et démarrage

### Backend (Spring Boot)

1. **Naviguer vers le dossier backend** :
```bash
cd backend
```

2. **Vérifier que MySQL est démarré** :
   - Si vous utilisez XAMPP : Démarrez Apache et MySQL depuis le panneau de contrôle XAMPP
   - Si MySQL est installé séparément : Vérifiez que le service MySQL est actif

3. **Créer la base de données** (si elle n'existe pas) :
```bash
# Ouvrir MySQL en ligne de commande
mysql -u root

# Créer la base de données
CREATE DATABASE task;
exit;
```

4. **Installer les dépendances Maven** :
```bash
./mvnw clean install
# ou si Maven est installé globalement
mvn clean install
```

5. **Démarrer le serveur** :
```bash
./mvnw spring-boot:run
# ou
mvn spring-boot:run
```

Le backend sera accessible sur : **http://localhost:8080**

**Note** : Au premier démarrage, Hibernate créera automatiquement les tables `users`, `projects`, et `tasks` dans la base de données grâce à `ddl-auto=create`.

#### Endpoints API principaux :
- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter
- `GET /api/projects` - Liste des projets (authentification requise)
- `POST /api/projects` - Créer un projet (authentification requise)
- `GET /api/tasks/{projectId}` - Tâches d'un projet
- `POST /api/tasks/{projectId}` - Créer une tâche
- `PUT /api/tasks/complete/{taskId}` - Marquer une tâche comme complétée
- `DELETE /api/tasks/{taskId}` - Supprimer une tâche
- `DELETE /api/projects/{id}` - Supprimer un projet

---

### Frontend (Angular)

1. **Naviguer vers le dossier frontend** :
```bash
cd frontend
# ou
cd task-frontend
```

2. **Installer les dépendances npm** :
```bash
npm install
```

3. **Démarrer le serveur de développement** :
```bash
ng serve
# ou
npm start
```

Le frontend sera accessible sur : **http://localhost:4200**

#### Build de production :
```bash
ng build --configuration production
```
Les fichiers compilés seront dans le dossier `dist/`.

---

## 🔧 Configuration

### Variables d'environnement Backend

Configuration actuelle dans `application.properties` :

```properties
# Application
spring.application.name=Task

# Database MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/task
spring.datasource.username=root
spring.datasource.password=

# Hibernate
spring.jpa.hibernate.ddl-auto=create
#  Attention : 'create' supprime et recrée les tables à chaque démarrage
# Pour la production, utilisez : spring.jpa.hibernate.ddl-auto=update

# JWT Security
jwt.secret=koCBIzgQtbzJ5SujgrTaY/F8Okq09VY+qsUe0Vny4Og=
jwt.expiration=36000000
# Expiration = 10 heures (36000000 ms)

# CORS (optionnel, à ajouter si nécessaire)
# cors.allowed-origins=http://localhost:4200
```

**Recommandations pour la production** :

```properties
# Conservez vos données
spring.jpa.hibernate.ddl-auto=update

# Activez les logs SQL (développement uniquement)
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Changez le secret JWT (générez un nouveau secret)
jwt.secret=votre_nouveau_secret_tres_long_et_securise

# Réduisez l'expiration du token (24 heures)
jwt.expiration=86400000
```

### Configuration Frontend

Modifiez `src/environments/environment.ts` :

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

---

##  Structure du projet

```
project-root/
│
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── org/example/task/
│   │   │   │       ├── Entity/        # Entités JPA
│   │   │   │       ├── Repository/    # Repositories
│   │   │   │       ├── Service/       # Services métier
│   │   │   │       ├── Resource/      # Controllers REST
│   │   │   │       └── Security/      # Configuration JWT
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/                   # Angular Frontend
    ├── src/
    │   ├── app/
    │   │   ├── auth/          # Module d'authentification
    │   │   ├── projects/      # Module projets
    │   │   ├── tasks/         # Module tâches
    │   │   └── app.routes.ts
    │   ├── environments/
    │   └── index.html
    ├── package.json
    └── angular.json
```

---



---

##  Dépannage

### Problème : CORS Errors
**Solution** : Vérifiez la configuration CORS dans `SecurityConfig.java` :
```java
@Bean
public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.addAllowedOrigin("http://localhost:4200");
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
}
```

### Problème : Port déjà utilisé
**Backend** : Changez le port dans `application.properties` :
```properties
server.port=8081
```

**Frontend** : Démarrez sur un autre port :
```bash
ng serve --port 4201
```

### Problème : Base de données ne se connecte pas
- Vérifiez que PostgreSQL est démarré
- Vérifiez les identifiants dans `application.properties`
- Vérifiez que la base de données existe

---

## 📝 Fonctionnalités

-  Authentification JWT
-  Gestion des utilisateurs
-  CRUD Projets
-  CRUD Tâches
-  Progression des projets
-  Marquer les tâches comme complétées
-  Interface utilisateur responsive

---

