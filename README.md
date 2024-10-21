# React Questionnaire App

This is a simple questionnaire web page built using **React** and **Framer Motion** for animations. The app features a 1-minute timer, a question with multiple options, and feedback on the correctness of the selected answer.

## Features

- **1-minute Timer**: A countdown timer on top of the page.
- **Question with 4 Options**: Renders a question with four answer options.
- **Option Selection**: Clickable options, where the selected option is highlighted.
- **Submit Answer**: On submitting, feedback is provided based on correctness.
  - If the answer is correct, the selected option turns **green**.
  - If the answer is incorrect, the selected option turns **red**, and the correct answer turns **green**.
- **Timer Expiry**: If time runs out, a pop-up prompts the user to reload the page and try again.
- **Next Question**: After submitting an answer, the submit button changes to "Next", enabling further actions.

## Tech Stack

- **React**: Used for building the UI components and managing the application state.
- **Framer Motion**: Used for adding smooth animations to the UI interactions.

## Getting Started

### Prerequisites

Ensure you have Node.js installed. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/questionnaire-app.git
2. cd questionnaire-app
3. npm install
4. npm run dev

<br>
The application will run at http://localhost:3000.
