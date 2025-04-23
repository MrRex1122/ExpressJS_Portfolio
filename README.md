# Author: Evgenii Korolev  
# XML-Driven Express Site

This is a simple web project powered by **Node.js**, **Express**, and **EJS**, where users can browse pages, leave reviews, and contact the developer via email form. The reviews are stored in an **XML file** and parsed dynamically using `xml2js`.

<!-- more -->

## ✨ Features

- **Dynamic Routing**: The site supports multiple pages like:
  - `/` – Homepage
  - `/contactme` – Contact form
  - `/signup` – Signup page
  - `/reviews` – Displays all user-submitted reviews

- **XML Review Storage**:  
  Reviews submitted via form are stored in `reviews.xml` using structured `<review>` tags. They include:
  - `username`
  - `review` text
  - `date` (auto-added)

- **Secure Login**:  
  There's a basic `/register` POST handler that validates login credentials against `.env` file variables (`USER_NAME`, `USER_PASSWORD`).

- **EJS Templating**:  
  The views are written in EJS and include reusable components like `header` and `footer`. Social media and GitHub links are included in the footer.

- **Review Visualization**:  
  Reviews are parsed and rendered on the `/reviews` page. The XML is converted to JavaScript objects with `xml2js` and passed to the EJS template.

- **Email Contact Form**:  
  The `/contactme` form uses the `mailto:` protocol to send an email directly via the user's default client.

- **Modular Structure**:
  - `app.js` – Main Express setup and route handlers
  - `views/` – EJS templates
  - `public/` – Static CSS and images

---

## 🧠 Tech Stack

- **Backend**: Node.js, Express.js
- **Templating**: EJS
- **Data Storage**: XML (with `xml2js`)
- **Environment Config**: `dotenv`
- **Frontend**: HTML + CSS

---

## 📌 Notes

- Login is validated against values set in `.env`.
- Reviews are not stored in a database but in a flat XML file.
- Error handling is provided for read/write and XML parsing errors.
- The server falls back to port `3000` if `PORT` is not set in `.env`.

