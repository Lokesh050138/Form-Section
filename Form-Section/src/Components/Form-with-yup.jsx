import { useState } from "react";
import * as Yup from "yup";
import './Form-with-yup.css';


const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const FormWithYup = () => {
    
    const initialFormData = {
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
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); 

    
    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().required("Email is required").email("Invalid email format"),
        phoneNumber: Yup.string()
            .matches(/^\d{10}$/, "Phone Number must be 10 digits")
            .required("Phone Number is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[!@#$%^&*(),.?":{}<>]/, "Password must contain at least one symbol")
            .matches(/[0-9]/, "Password must contain at least one number")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
        age: Yup.number()
            .typeError("Age must be a number")
            .min(18, "You must be at least 18 years old")
            .max(100, "You cannot be older than 100 years")
            .required("Age is required"),
        gender: Yup.string().required("Gender is required"),
        interests: Yup.array().min(1, "Select at least one interest"),
        birthDate: Yup.date().required("Date of birth is required"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            
            await validationSchema.validate(formData, { abortEarly: false });
            console.log("Form Submitted", formData);

            
            setIsModalOpen(true);

            
            

        } catch (error) {
            const newErrors = {};
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
            console.log("Validation Errors", newErrors);
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
        const { value, checked } = e.target;
        let updatedInterests = [...formData.interests];

        if (checked) {
            updatedInterests.push(value);
        } else {
            updatedInterests = updatedInterests.filter((interest) => interest !== value);
        }

        setFormData({
            ...formData,
            interests: updatedInterests,
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormData(initialFormData); 
    };

    return (
        <div>
            <div className="circle"></div>
            <div className="circle2"></div>
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
                        placeholder="Confirm Your Password"
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
                            value="coding"
                            checked={formData.interests.includes("coding")}
                            onChange={handleCheckboxChange}
                        />
                        Coding
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="sports"
                            checked={formData.interests.includes("sports")}
                            onChange={handleCheckboxChange}
                        />
                        Sports
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            value="reading"
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

            {/* Modal to show success message */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal} 
                message="Data successfully saved!"
            />
        </div>
    );
};

export default FormWithYup;
