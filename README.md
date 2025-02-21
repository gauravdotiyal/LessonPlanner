# Lesson Plan Generator with PDF Download

## 💻 Usage

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:5173`

3. Log in using your credentials- Demo credentials are shown in login page

4. Create a lesson plan by providing the following information: Fill these details properly with good keywords so ai will generate it properly
   - Topic
   - Date
   - Subject
   - Grade Level
   - Main Concept
   - Subtopics
   - Materials
   - Learning Objectives
   - Lesson Outline
   - Notes

5. For the lesson outline, use the following format for better organization in the downloaded version:
```javascript
const outline = "10:00-10:15 | Introduction | Overview of today's lesson\n" +
                "10:15-10:45 | Main Activity | Group work on problem sets\n" +
                "10:45-11:00 | Conclusion | Review and homework assignment"
```
6. Wait for some time as it make the **gemini api call** which is generating lesson plan which takes time.
7. The AI will generate the lesson plan using the Google Gemini API.
6. Click the "Download Lesson Plan" button to save your lesson plan as an HTML file.



 

A React application built with Vite that allows users to create and download lesson plans. The application features a modern UI built with shadcn/ui components and Tailwind CSS, with the ability to download lesson plans as HTML files.

## 🚀 Features

- Create detailed lesson plans with structured sections
- Modern, responsive UI using shadcn/ui components
- Clean and intuitive interface with Tailwind CSS styling
- Download lesson plans as HTML files
- Interactive form inputs with real-time preview
- Organized content sections for different parts of the lesson plan

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14.0 or higher)
- npm (Node Package Manager) or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd lesson-plan-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required packages:
```bash
# Install shadcn/ui
npx shadcn-ui@latest init

# Add required shadcn/ui components
npx shadcn-ui@latest add card
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add button
npx shadcn-ui@latest add label
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add input

# Install additional dependencies
npm install lucide-react
# or
yarn add lucide-react
```

## 🏗️ Project Structure

```
src/
├── App.jsx                    # Root application component
├── main.jsx                   # Entry point
└── components/
    ├── ui/                    # shadcn/ui components
    │   ├── alert.jsx         # Alert component
    │   ├── button.jsx        # Button component
    │   ├── card.jsx          # Card component
    │   ├── label.jsx         # Label component
    │   ├── textarea.jsx      # Textarea component
    │   └── input.jsx         # Input component
    ├── GeneratedOutput.jsx    # Component for lesson plan display and download
    ├── LessonPlanner.jsx     # Main form component for creating lesson plans
    └── Login.jsx             # Authentication component
```

### Component Descriptions

- **App.jsx**: Root component that handles routing and main application layout
- **main.jsx**: Entry point of the application, renders the root component

Components:
- **ui/**: Directory containing shadcn/ui components
  - **alert.jsx**: Notification and alert messages
  - **button.jsx**: Custom button styles and variants
  - **card.jsx**: Container component for grouped content
  - **label.jsx**: Form label component
  - **textarea.jsx**: Multiline text input component
  - **input.jsx**: Single-line text input component
- **GeneratedOutput.jsx**: Handles the display and download functionality of the lesson plan
- **LessonPlanner.jsx**: Contains the form and logic for creating lesson plans
- **Login.jsx**: Manages user authentication and login functionality


## 🎨 Customization

### Styling
- The application uses Tailwind CSS for styling. You can modify the styles in the component files.
- shadcn/ui components can be customized through their respective configuration files.

### Component Modification
- The main components (`GeneratedOutput.jsx` and `LessonPlanner.jsx`) can be modified to add or remove sections as needed.
- Download format can be adjusted by modifying the `handleDownload` function in `GeneratedOutput.jsx`.
- Authentication logic can be customized in `Login.jsx`.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
 

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the icons
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the development framework
