# WTWR (What to Wear?)

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![License](https://img.shields.io/badge/License-MIT-green)

WTWR (What to Wear?) is a responsive full-stack web application that recommends clothing based on real-time weather conditions. The app uses geolocation and live weather data to help users decide what to wear each day.

The project demonstrates modern frontend architecture, API integration, authentication flows, and full-stack deployment on cloud infrastructure.

---

## Full Stack Repository Links

Frontend:  
https://github.com/itsjaydenking/se_project_react

Backend API:  
https://github.com/itsjaydenking/se_project_express

---

## Project Status

WTWR is actively under development.  
Features are continuously being added, refined, and refactored as part of ongoing coursework and personal improvement.

---

## Features

### Implemented

- **Live Weather Integration**  
  Retrieves real-time weather data using the OpenWeatherMap API and browser geolocation.

- **Clothing Recommendations**  
  Displays clothing items filtered by current weather conditions.

- **User Authentication**  
  Secure user registration and login with JWT-based authorization.

- **Add and Delete Garments**  
  Authorized users can add new clothing items and remove items they own.

- **Likes and Dislikes**  
  Users can like and unlike clothing items, with changes reflected immediately in the UI.

- **Profile Management**  
  Users can edit their profile name and avatar.

- **Responsive Design**  
  Mobile-first layout with a hamburger menu and adaptive modals.

- **Animated Modals and Transitions**  
  Smooth open and close animations for improved user experience.

- **Temperature Unit Toggle**  
  Switch between Fahrenheit and Celsius.

---

## Live Demo

**Production Application**

https://www.royalcloset.serverpit.com/

This version connects to the deployed cloud backend API and represents the full production stack.

**Backend API Endpoint**

https://api.royalcloset.serverpit.com

---

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS3-Styling-1572B6?logo=css3&logoColor=white)

### Backend Services

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)

### APIs and Services

![OpenWeather](https://img.shields.io/badge/OpenWeatherMap-API-FF7F00)
![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white)

### Deployment

![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Compute%20Engine-4285F4?logo=googlecloud&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-Reverse%20Proxy-009639?logo=nginx&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-Process%20Manager-2B037A)

The application is deployed on a **Google Cloud Compute Engine virtual machine** with:

- **Nginx** as a reverse proxy
- **PM2** for Node.js process management
- **MongoDB Atlas** for the cloud database

---

## Architecture Overview

The WTWR application follows a full-stack architecture:

Frontend:

- React single-page application built with Vite

Backend:

- Node.js and Express REST API
- JWT authentication
- MongoDB Atlas database

Infrastructure:

- Google Cloud Compute Engine virtual machine
- Nginx reverse proxy
- PM2 process manager

The frontend communicates with the backend API to retrieve weather data, manage user authentication, and perform CRUD operations for clothing items.

---

## Design Reference

Figma design used as the visual and UX reference for this project:

https://www.figma.com/design/wo8wr1Mdmm9hna34fEQOeR/Sprint-14_-WTWR--Copy

---

## Development Overview

WTWR began as a weather-based clothing recommendation app and evolved into a full-stack React application with authentication, protected routes, and user-generated content.

Through this project, I focused on:

- Building reusable and accessible React components
- Managing global and local state using hooks and context
- Integrating frontend and backend APIs securely
- Implementing declarative UI updates based on application state
- Creating responsive layouts and mobile-friendly interactions
- Structuring a scalable React project
- Deploying a production-ready application

The codebase is actively refactored to improve clarity, maintainability, and performance as new concepts are introduced.

## Key Concepts Demonstrated

- Component-driven React architecture
- Custom React hooks and context for state management
- Secure JWT authentication flows
- RESTful API integration
- Conditional rendering based on application state
- Responsive UI design
- Cloud deployment using Google Cloud infrastructure

---

## License

This project is licensed under the MIT License.

---

## Contributing and Feedback

Feedback, suggestions, and constructive critique are welcome.  
If you find a bug or have an idea for improvement, feel free to open an issue or reach out.
