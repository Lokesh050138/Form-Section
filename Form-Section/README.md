# Form-Validation-With-Yup
A dynamic and interactive registration form built with React and Yup validation. This component ensures user input adheres to required formats through schema-based validation, providing clear error messages and a smooth UI experience. Upon successful submission, the form presents a modal confirming the data has been saved.

# Form With Yup - React Registration Form

This project is a responsive registration form component created with **React** and **Yup** for client-side validation. It provides a smooth user experience by validating input data with custom rules and giving feedback on each field. Upon successful form submission, a modal displays a confirmation message.

## Features

- **Form Validation**: Using **Yup** to enforce rules on fields like email, phone number, password, etc.
- **Dynamic Error Display**: Real-time error messages for each form field based on Yup schema.
- **Customizable Modal**: Modal appears after successful form submission to confirm data was saved.
- **Styled Components**: Basic styling applied through `Form-with-yup.css`.

## Getting Started

Follow these instructions to get a copy of this project up and running on your local machine.

### Prerequisites

Ensure you have the following software installed:

- **Node.js** and **npm**
- **React** (if not using `create-react-app`)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/form-with-yup.git
   cd form-with-yup

### Install dependencies:

## bash
npm install

### Start the development server:

## bash
npm run dev
## The app will be available at http://localhost:3000.

## Project Structure

- **FormWithYup.jsx**: The main form component, handling form data, validation, and submission.
- **Modal**: A custom component for displaying a confirmation message upon successful submission.
- **Form-with-yup.css**: Styling file for the form and modal components.

## Form Validation Rules

The form fields are validated based on the following rules:

- **First Name / Last Name**: Required
- **Email**: Required and must be a valid email format
- **Phone Number**: Must be exactly 10 digits
- **Password**: Minimum of 8 characters, must contain at least one uppercase letter, one lowercase letter, one symbol, and one number
- **Confirm Password**: Must match the password field
- **Age**: Must be a number between 18 and 100
- **Gender**: Required
- **Interests**: At least one interest must be selected
- **Date of Birth**: Required

## Usage

1. Fill out each form field according to the validation rules.
2. Submit the form by clicking the **Submit** button.
3. If there are validation errors, they will appear below each field.
4. Upon successful validation, a modal will appear with the message "Data successfully saved!"

## Customization

To customize validation rules, modify the `validationSchema` defined in `FormWithYup.jsx`. You can also add or remove form fields and adjust the form layout using the accompanying CSS file.

## Technologies Used

- **React**: Component-based UI library
- **Yup**: Validation schema builder
- **CSS**: For styling the components

## License

This project is licensed under the **MIT License**. Feel free to modify and use it in your own projects.
