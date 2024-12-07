# Brainbox – Your Desktop-Only Sticky Notes App  
A minimal, full-stack sticky notes app designed for desktops to organize important tasks efficiently.  

---

## 🌐 Deployed Link  
Access the live project here: **[BrainBox](https://brain-box-eta.vercel.app)**  

---

## 📖 Introduction  
**BrainBox** is a sleek and modern sticky notes application built with **React.js**, **Appwrite**, and **Tailwind CSS**, designed specifically for desktop users. It features a two-page design—login/signup and notes—allowing users to securely log in and access their notes. The app limits word count per note, ensuring it serves as a concise tool for recording essential tasks or daily highlights. With its user-friendly interface, real-time updates, and secure backend integration, Brainbox is perfect for managing your daily priorities efficiently.  

Key Technologies: **React.js**, **Appwrite**, **Tailwind CSS**, **React Router DOM**  

---

## ✨ Features  
- **Desktop-Only Design**: Optimized for desktop users with a clean and simple UI.  
- **Secure Authentication**: Integrated login/signup functionality using **Appwrite**.  
- **Sticky Notes with Word Limits**: Focus on essential tasks with concise note-taking.  
- **Customizable Colors**: Enhance note organization with personalized colors.  
- **Persistent Data Storage**: Notes are securely stored and accessible with Appwrite.  

---

## 🛠️ User Instructions  

### 1️⃣ Setting Up Locally  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Ash-oo7/BrainBox.git
   cd BrainBox
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Start the Development Server**  
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.  

---

### 2️⃣ Setting Up Appwrite  

1. **Install Appwrite**  
   - Install Appwrite on your local machine or use [Appwrite Cloud](https://appwrite.io).  
   - Follow the setup guide: [Appwrite Setup](https://appwrite.io/docs/installation).  

2. **Create a New Project**  
   - Add a project in Appwrite's console and name it `BrainBox`.  

3. **Create a Database**  
   - Add a collection named `notes` with the following attributes:  
     - `body` (string): Content of the note  
     - `color` (string): Color of the note  
     - `position` (string): Position of the note  

4. **Authentication Setup**  
   - Enable email/password authentication in Appwrite's authentication settings.  

5. **Update Environment Variables**  
   - Add the following variables to a `.env` file in the root of the project:  
     ```env
     VITE_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
     VITE_APPWRITE_PROJECT_ID=<your-appwrite-project-id>
     ```

---

## 🤝 Contribute  

We welcome contributions to make BrainBox even better!  

1. **Fork the Repository**  
   Click the "Fork" button in the top-right corner of the repository.  

2. **Clone the Forked Repository**  
   ```bash
   git clone https://github.com/your-username/BrainBox.git
   cd BrainBox
   ```

3. **Create a New Branch**  
   ```bash
   git checkout -b feature-name
   ```

4. **Make Your Changes**  
   Add features, fix bugs, or improve documentation.  

5. **Commit Your Changes**  
   ```bash
   git commit -m "Description of the feature or fix"
   ```

6. **Push to Your Branch**  
   ```bash
   git push origin feature-name
   ```

7. **Open a Pull Request**  
   Navigate to the original repository and click "Compare & pull request".  

---

## 📧 Contact  
For questions or feedback, feel free to reach out at **amitjambhale437@gmail.com**.  

---

**[GitHub Repository](https://github.com/Ash-oo7/BrainBox)**  
**[Live Demo](https://brain-box-eta.vercel.app)**
