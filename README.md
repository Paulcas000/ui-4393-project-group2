
# 📚 StudyTrack
### A Simple Student Assignment Planner

StudyTrack is a web application designed to help students organize their assignments, manage deadlines, and stay on top of their schoolwork.

Built with SvelteKit, StudyTrack focuses on simplicity, organization, and an easy-to-use interface.

---

## ✨ Features

### ✅ Assignment Management
- Add assignments with titles and descriptions
- Set due dates and priority levels
- Edit existing assignments
- Mark assignments as complete or incomplete
- Delete assignments
- Save assignments locally in the browser

### 🚧 Planned Features
- Sort assignments by due date or priority
- Filter completed and incomplete assignments
- Weekly calendar displaying upcoming deadlines
- Assignment completion progress tracker
- Light and dark mode
- Responsive layout for different screen sizes

---

## 🛠️ Technologies Used

- **Svelte 5** — User interface development
- **SvelteKit** — Application framework
- **JavaScript** — Application logic
- **HTML & CSS** — Structure and styling
- **LocalStorage** — Browser-based data persistence
- **GitHub** — Version control and collaboration

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Paulcas000/ui-4393-project-group2.git
```

**2. Open the project directory**

```bash
cd ui-4393-project-group2
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit:

http://localhost:5173/

---

## 👥 Team Responsibilities

| Member | Responsibilities |
|--------|------------------|
| Member 1 | Assignment management, editing, deleting, completion, and local saving |
| Member 2 | Sorting, filtering, weekly calendar, and progress tracking |
| Member 3 | UI design, responsive layout, light/dark mode, and integration |

All group members contributed to testing, documentation, and the final presentation.

---

## 📁 Project Structure

```text
src/
├── components/
│   └── TaskManager.svelte
├── lib/
│   └── taskStore.svelte.js
└── routes/
    └── +page.svelte
```

Additional components will be added as development continues.

---

## 💾 Data Storage

StudyTrack uses the browser's LocalStorage to save assignments.

Assignment information is saved when users:
- Create an assignment
- Edit assignment details
- Change completion status
- Delete an assignment

Data persists after refreshing or closing the browser.

**Note:** Data is stored locally and does not automatically synchronize between devices.

---

## 🎓 About the Project

The goal is to create a functional and intuitive application that demonstrates:

- User-centered interface design
- Clear organization and navigation
- Responsive layouts
- Practical application functionality
- Collaborative software development

---