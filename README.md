# WTWR (What to Wear?)

**WTWR** is a responsive React web application that recommends clothing based on the current weather in your location.  
This project is actively being developed as part of my journey to master modern frontend development, focusing on React, responsive design, and API integration.

---

## 🚧 Project Status

> **Note:**  
> WTWR is a work in progress.  
> I am continuously improving features, fixing bugs, and refining the user experience.  
> Your feedback and suggestions are welcome!

---

## ✨ Features (Current & Upcoming)

- **Live Weather Integration:**  
  Fetches real-time weather data using the OpenWeatherMap API and your device's geolocation.

- **Clothing Recommendations:**  
  Suggests appropriate clothing items for the current weather conditions.

- **Add Garments:**  
  Users can add new clothing items through a modal form.  
  Newly added garments are sorted alphabetically for easy browsing.

- **Responsive Design:**  
  Mobile-first layout with a hamburger menu and bottom-sheet modal for mobile users.

- **Smooth Animations:**  
  Animated modals and menus for a polished, modern feel.

- **User Avatar:**  
  Displays a user avatar and name in the header.

- **Preview Garments:**  
  Click any clothing item to preview details in a modal.

- **Temperature Unit Toggle:**  
  Switch between Fahrenheit and Celsius.

---

## 📸 Demo

[Live Demo on GitHub Pages](https://itsjaydenking.github.io/se_project_react/)

---

## 📁 Project Structure

```
src/
  components/
    App/
    Header/
    Main/
    Footer/
    WeatherCard/
    ItemCard/
    ModalWithForm/
    ItemModal/
    AddItemModal/
    ToggleSwitch/
  context/
    CurrentTemperatureUnitContext.jsx
  hooks/
    useForm.js
  utils/
    weatherApi.js
    constants.js
  assets/
    images/
  index.css
  main.jsx
```

---

## 🧰 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [normalize.css](https://necolas.github.io/normalize.css/)
- [GitHub Pages](https://pages.github.com/)

---

## 🎨 Design

- [Figma Design](https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR)

---

## 🛠️ Development Story

WTWR began as a simple weather app for the TripleTen bootcamp, but quickly evolved into a platform for experimenting with interactive UI, state management, and real-world API integration.  
Every feature is built with scalability and user experience in mind.  
As I develop, I am learning to:

- Build fully responsive React apps from scratch
- Integrate third-party APIs and handle asynchronous data
- Manage state and UI transitions for modals and menus
- Write clean, maintainable, and scalable component-based code
- Deploy React apps to Github Pages

I am actively refactoring, adding new features, and improving accessibility and performance.  
Stay tuned for more updates!

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Contributing & Feedback

If you have ideas, spot bugs, or want to collaborate, please open an issue or reach out!  
Your feedback helps me learn and improve!
