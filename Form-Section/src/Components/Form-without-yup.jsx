import { useState } from "react";

const FormWithoutYup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        age: "",
        gender: "",
        interests: [],
        birthDate: "",
    });

    const [errors, setErrors] = useState({});

    // Validation functions
    const isValidEmail = (email) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/; // Validates 10 digits
        return phoneRegex.test(phoneNumber);
    };

    const isValidPassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const isValidAge = (age) => {
        const ageNumber = Number(age);
        return ageNumber >= 18 && ageNumber <= 100;
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!isValidPhoneNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be 10 digits";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!isValidPassword(formData.password)) {
            newErrors.password = "Password must be at least 8 characters long and contain one symbol, one number, one uppercase letter, and one lowercase letter";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.age) {
            newErrors.age = "Age is required";
        } else if (!isValidAge(formData.age)) {
            newErrors.age = "You must be at least 18 years old and not older than 100 years";
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        if (formData.interests.length === 0) {
            newErrors.interests = "Select at least one interest";
        }

        if (!formData.birthDate) {
            newErrors.birthDate = "Date of birth is required";
        }

        setErrors(newErrors);

        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            console.log("Form Submitted", formData);
        } else {
            console.log("Form Validation Failed");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        let updatedInterests = [...formData.interests];

        if (checked) {
            updatedInterests.push(name);
        } else {
            updatedInterests = updatedInterests.filter((interest) => interest !== name);
        }

        setFormData({
            ...formData,
            interests: updatedInterests,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h2>Registration Form</h2>

            {/* First Name */}
            <div className="form-group">
                <label>First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Enter Your First Name"
                    onChange={handleChange}
                />
                {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="form-group">
                <label>Last Name:</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Enter Your Last Name"
                    onChange={handleChange}
                />
                {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>

            {/* Email */}
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Enter Your Email"
                    onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
                <label>Phone Number:</label>
                <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Enter Your Phone Number"
                    onChange={handleChange}
                />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </div>

            {/* Password */}
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Enter Your Password"
                    onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
                <label>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    placeholder="Enter Your Confirm Password"
                    onChange={handleChange}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>

            {/* Age */}
            <div className="form-group">
                <label>Age:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    placeholder="Enter Your Age"
                    onChange={handleChange}
                />
                {errors.age && <p className="error">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div className="form-group">
                <label>Gender:</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="error">{errors.gender}</p>}
            </div>

            {/* Interests */}
            <div className="form-group">
                <label>Interests:</label>
                <label>
                    <input
                        type="checkbox"
                        name="coding"
                        checked={formData.interests.includes("coding")}
                        onChange={handleCheckboxChange}
                    />
                    Coding
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="sports"
                        checked={formData.interests.includes("sports")}
                        onChange={handleCheckboxChange}
                    />
                    Sports
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="reading"
                        checked={formData.interests.includes("reading")}
                        onChange={handleCheckboxChange}
                    />
                    Reading
                </label>
                {errors.interests && <p className="error">{errors.interests}</p>}
            </div>

            {/* Date Of Birth */}
            <div className="form-group">
                <label>Date Of Birth:</label>
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                />
                {errors.birthDate && <p className="error">{errors.birthDate}</p>}
            </div>

            <button type="submit" className="submit-button">
                Submit
            </button>
        </form>
    );
};

export default FormWithoutYup;
