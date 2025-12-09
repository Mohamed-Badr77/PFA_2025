# PFA_2025
A github repository to keep track of all the progress on the PFA project of fifth year



# Plateforme de Mentoring Professionnelle – Application Mobile

## 1️⃣ Présentation du projet
Cette application mobile vise à mettre en relation des **mentors expérimentés** et des **mentees** au Maroc.  
Elle permet aux mentees de découvrir des mentors adaptés à leurs besoins, swiper les profils type Tinder, et communiquer facilement via un chat intégré.  
Les mentors peuvent mettre en avant leurs compétences, expériences et partager des conseils via un feed.  

Le design est **100% dark mode**, moderne et ergonomique. L’application intègre également des fonctionnalités de **matching intelligent et recommandations** basées sur la **Data Science et le Machine Learning**.

---

## 2️⃣ Objectifs fonctionnels

### Authentification
- Création de compte pour **mentee ou mentor**
- Connexion / déconnexion
- Gestion du mot de passe
- Authentification sécurisée via **Firebase Auth**

### Profils utilisateurs
- Mentors : photo, nom, secteur, compétences, années d’expérience, bio courte, langues, localisation
- Mentees : photo, nom, secteur recherché, compétences, objectifs, langues, localisation
- Possibilité d’**éditer le profil** à tout moment

### Page principale – type Tinder
- Affichage des profils mentors sous forme de **cartes swipeables**
- Swipe **gauche** : pas intéressé / Swipe **droite** : intéressé
- Chaque carte affiche : photo, nom, secteur, compétences clés, années d’expérience, bio courte
- Affichage d’un **score de compatibilité (0–100)** basé sur les compétences et le secteur du mentee
- Bouton pour accéder au **profil complet du mentor**
- Interface entièrement **dark mode**

### Matching et recommandations
- Matching **rules-based** : secteur + compétences
- Option avancée : **Machine Learning / embeddings textuels** pour calcul de similarité
- Génération d’une **liste de mentors recommandés** pour chaque mentee

### Messagerie
- Chat **temps réel** mentor ↔ mentee via **Firebase Firestore**
- Notifications push pour nouveaux messages (**Firebase Cloud Messaging**)
- Interface chat intégralement **dark mode**

### Highlights / Posts
- Mentors peuvent publier de courtes expériences ou conseils
- Affichage dans un **feed / timeline**
- Interface **dark mode**

### Notifications / Alertes
- Notification pour nouveaux messages ou nouveaux matches
- Notifications compatibles **dark mode**

---

## 3️⃣ Données et Machine Learning
- **Données nécessaires** : profils mentors et mentees (50 mentors et 50 mentees pour tests)
- **Techniques possibles** :
  - Recommandation simple rules-based (secteur, compétences)
  - Recommandation avancée : embeddings textuels + similarité cosine
  - Option score de compatibilité prédictif basé sur IA
- **Outils** : Python, transformers, FAISS, Gemini

---

## 4️⃣ Architecture technique
- **Frontend** : React-Native (iOS & Android)
- **Backend / Base de données** : Firebase Firestore
- **Authentification & Notifications** : Firebase Auth + Firebase Cloud Messaging
- **Machine Learning** : Embeddings avec Gemini & similarité
- **Dark mode** : tous les écrans et composants UI

---


