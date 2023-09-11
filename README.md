# Neochat

## About
This is a chat application that has a frontend built with Jetpack Compose in Android and a backend built with Ktor, which uses PostgreSQL as the database.

## Table of Contents
- [Bult using](#bult-using)
- [Server setup prerequisite](#server-setup-prerequisite)
- [Db structure](#db-structure)
- [Api documentation](#api-documentation)
- [Room for improvement](#room-for-improvement)
- [Upcoming Features and Enhancements](#upcoming-features-and-enhancements)
- [Current Demo](#current-demo)

### Bult using

* **Backend**
  - kotlin
  - ktor 
  - postgres
  - Exposed Library
  - JWT 
  - Web socket
    
* **Frontend**
  - kotlin
  - Jetpack compose
  - Paging2 library
  - Okhttp3 library
  - Retrofit
  - Datastore Preference

### Server setup prerequisite
 - Postgres must be installed with user and password as "postgres" and "postgres" respectively or change these in DatabaseFactory.kt
 - Create a table "neochat" in db or you can define your own in DatabaseFactory.kt
 - Add environment variable JWT_SECRET=anything in android studio

### Db structure
<img src="https://raw.githubusercontent.com/AnuragDevMastermind/Chat-application/main/Files/neochat-db.png">

### Api documentation
 - Import this collection in postman - [Collection](https://github.com/AnuragDevMastermind/Chat-application/blob/main/Files/neochat.json)
 - For description of the api click on this icon in postman
   <img src="https://raw.githubusercontent.com/AnuragDevMastermind/Chat-application/main/Files/description.png">
 - Api for sending message
   ![image](https://github.com/AnuragDevMastermind/Chat-application/assets/134276544/a27aa780-eb2d-465e-b0de-7edfbe2f1435)

### Room for improvement

* **Server side**
  - Apis access should be denied without authentication

* **Frontend side**
  - offline caching
 
### Upcoming Features and Enhancements
 - Support for all type of media
 - User will be able to edit and delete the message
 - Compose Multiplatform for IOS app
 - Neochat Website using kotlin

### Current Demo
<img src="https://raw.githubusercontent.com/AnuragDevMastermind/Chat-application/main/Files/Demo.gif">
