ITMD543-F24-Lab2

## Project: Calculate Your Fortune

### Overview

This project is a simple web application that allows users to calculate their "fortune" for the day based on various
inputs such as mood, breakfast, wake-up time, and the color they are wearing. The application uses a basic scoring
system to simulate a "fortune" percentage and provide a fun, light-hearted result to the user.

The project is built using standard web technologies—HTML, CSS, and JavaScript—along with the utility-first CSS
framework **Tailwind CSS** for styling. The project is deployed using **Azure's automatic service**, and the CI/CD
pipeline is handled by **GitHub Actions** for seamless deployment and continuous integration.

### Features

- **Interactive Form**: Users can input their mood, breakfast choice, wake-up time, and the color they are wearing to
  calculate their fortune.
- **Responsive Design**: The application is fully responsive, ensuring a seamless experience across devices.
- **Tailwind CSS**: Tailwind CSS is used to simplify the styling process, allowing for rapid development of consistent
  and modern UI components.
- **Fortune Calculation**: A simple algorithm calculates the user's fortune based on their inputs and displays a fun
  message.
- **CI/CD with GitHub Actions**: Automated deployment and continuous integration using GitHub Actions.
- **Azure Deployment**: The application is deployed on Azure's automatic service, ensuring high availability and
  scalability.

### Technology Stack

- **Frontend**:
    - HTML
    - CSS (Tailwind CSS)
    - JavaScript
- **Deployment**:
    - Azure Automatic Service
- **CI/CD**:
    - GitHub Actions

### How to Run the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/oreoft/ITMD543-F24
   ```

2. **Navigate to the project directory**:
   ```bash
   cd lab-2 && cd calculate-your-fortune
   ```

3. **Open the project in a browser**:
    - You can open the `index.html` file directly in your browser to view the application.

4. **Tailwind CSS**:
    - Tailwind CSS is included via CDN, so no additional setup is required for development.

### Lessons Learnt and Best Practices

1. **Leverage Existing Tools and Frameworks**:
    - One of the key lessons I learned from this project is the importance of *not reinventing the wheel*. By using *
      *Tailwind CSS**, I was able to significantly speed up the development process while maintaining a clean and
      maintainable codebase. Tailwind’s utility-first approach allowed me to rapidly prototype and simplify the process
      of creating responsive, modern designs without having to write custom CSS from scratch. Leveraging such frameworks
      saved me a lot of development time and effort, while also ensuring consistency across the application.

2. **CI/CD Automation**:
    - Setting up **GitHub Actions** for CI/CD was another valuable learning experience. Automating the deployment
      process not only saved time but also reduced the risk of human errors. It ensured that every change I made was
      properly tested and deployed in a consistent manner. This is a best practice I will continue to adopt in future
      projects, regardless of size, to streamline development workflows and ensure that the application is always
      up-to-date and free from manual deployment errors.

3. **Focus on Responsive Design from the Start**:
    - Ensuring that the application was responsive from the beginning was crucial. By using **Tailwind CSS** and its
      responsive utilities, I was able to easily make the application look good on all screen sizes. This is a best
      practice I learned to follow in modern web development, as users access websites on a variety of devices.
      Designing with responsiveness in mind from the start prevented the need for additional media queries or custom
      styles later in the development process.

4. **Keep the Code Simple, Modular, and Maintainable**:
    - Throughout the project, I focused on keeping the code simple and modular. The logic for calculating the fortune
      was separated from the form handling and UI logic, making it easier to maintain and extend. This approach improved
      code readability and made it easier to debug or add new features in the future. I learned the importance of
      separating concerns and keeping the code modular to ensure maintainability and scalability in any project.

5. **Validate User Inputs**:
    - Validating user inputs was essential for creating a robust and user-friendly application. I learned the importance
      of validating user inputs to prevent unexpected behavior or errors. Always validating user inputs is a
      best practice I will continue to follow to ensure the application behaves as expected and provides a smooth user
      experience.
