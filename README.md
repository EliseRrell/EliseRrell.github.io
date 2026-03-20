Portfolio made for the course Web Development for the .NET25 developer program. 
The portfolio is created as a part of an iterative process that originates from a Figma prototype. 
Link to the prototype and first draft is here:
https://www.figma.com/proto/gnGFwGYAKB7NhcDefXRnaf/Elise-Rellmars-portfolio-page?node-id=1-2&starting-point-node-id=1%3A2&scaling=scale-down-width&content-scaling=fixed&t=ij6AjfpiHPim9A6X-1
The portfolio follows WCAG guidelines to ensure an inclusive and accessible user experience.

Features
- Hero section with about‑me information and external links to social media and CV download.
- Project cards with button functionality for both developer projects and UX projects. 
  The cards open in an overlay to display external links to GitHub or Figma and a project description.
- Contact form with email, name and message linked with form submit, with rejection‑based validation.
- OpenWeather API integration that displays the current weather in Ängelholm, including a descriptive icon and text in the footer.

Accessibility measures implemented
- Inert action for hidden elements in the project card to disable interaction and hide content from screen readers.
- Event listeners support both pointer and keyboard activation for full functionallity.
- ARIA roles and attributes applied to enhance semantic meaning where needed.
- Pictures have descriptive alt text.
- Good contrast and easy‑to‑read fonts.
- The contact form preserves user input when validation errors occur to support error recovery.

Responsive measures implemented
- Responsive design working for multiple screen sizes.
- Flexbox and CSS grid used to create adaptive and scalable structures.
- Media queries are used to change the design for mobile interfaces.

Design patterns
- Class names follow clear and descriptive naming standards.
- Separation of concerns applied to HTML, CSS and JavaScript for maintainability and clarity.
- Accessibility implementation

UX design choices
- The page has big buttons for easy usage on mobile devices.
- Due to Safaris updated interface, the navigation is placed at the top of the page to prevent accidental interaction with the browsers search field.
- The confirmation page for the contact form opens in a smaller window, allowing users to remain on the main page without switching tabs. 
  If pop‑ups are blocked, the confirmation instead opens in a new tab to ensure functionality.
- The confirmation window has a close button for fast usage.
