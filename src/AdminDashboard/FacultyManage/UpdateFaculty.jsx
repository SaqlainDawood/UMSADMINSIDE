import React, { useEffect, useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";

// Mock data to simulate API response for a specific faculty member ID
const mockFacultyData = {
    employeeID: "F-1024",
    name: "Dr. Evelyn Reed",
    email: "evelyn.reed@example.edu",
    phone: "123-456-7890",
    cnic: "42101-1234567-8",
    dateOfBirth: "1978-05-15",
    gender: "Female",
    city: "Lahore",
    department: "Computer Science",
    designation: "Associate Professor",
    qualification: "Ph.D. in AI",
    specialization: "Machine Learning",
    experience: 12, // Number type for experience
    joiningDate: "2013-08-20",
    salary: 185000, // Number type for salary
    accountTitle: "Evelyn Reed Salary",
    accountNumber: "9876543210",
    bankName: "Global Bank Ltd",
    emergencyContact: "0300-1112233",
    emergencyPerson: "David Reed (Husband)",
};

// Mock function to simulate navigation
const useNavigate = () => (path) => {
    console.log(`Navigation simulated to: ${path}`);
    // In a real app, you would use React Router's navigate function here.
    alert(`Update Successful! Navigating to: ${path}`);
};

// Mock function to simulate URL parameter (ID)
const useParams = () => ({ id: "1024" });

// Mock function to simulate toast notifications
const toast = {
    success: (message) => console.log(`SUCCESS: ${message}`),
    error: (message) => console.error(`ERROR: ${message}`),
};

const App = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        employeeID: "",
        name: "",
        email: "",
        phone: "",
        cnic: "",
        dateOfBirth: "",
        gender: "",
        city: "",
        department: "",
        designation: "",
        qualification: "",
        specialization: "",
        experience: 0,
        joiningDate: "",
        salary: 0,
        accountTitle: "",
        accountNumber: "",
        bankName: "",
        emergencyContact: "",
        emergencyPerson: "",
    });

    const [loading, setLoading] = useState(true);

    // --- MOCK DATA FETCHING ---
    useEffect(() => {
        if (!id) {
            toast.error("Invalid Faculty ID! Redirecting...");
            navigate("/faculty/list");
            return;
        }

        // Simulate network delay for fetching data
        const timer = setTimeout(() => {
            // Apply mock data
            setFormData({
                ...mockFacultyData,
                // Ensure dates are correctly formatted for input[type="date"]
                joiningDate: mockFacultyData.joiningDate.substring(0, 10),
                dateOfBirth: mockFacultyData.dateOfBirth.substring(0, 10),
                // Ensure numerical fields are parsed as numbers if needed, 
                // but setting initial state often handles this fine.
                experience: Number(mockFacultyData.experience) || 0,
                salary: Number(mockFacultyData.salary) || 0,
            });
            setLoading(false);
            toast.success(`Loaded data for ID: ${id}`);
        }, 1500);

        return () => clearTimeout(timer);
    }, [id, navigate]);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? Number(value) : value
        });
    };

    // --- MOCK SUBMIT HANDLER ---
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, the real application would make an axios.put call.
        // We simulate a successful update:
        console.log("Updated Faculty Data (MOCK SUBMIT):", formData);
        toast.success(`Faculty member ${formData.name} updated successfully! (Mocked)`);

        // Simulate navigation after successful update
        navigate("/admin/dashboard/faculty/list");
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                <p className="mt-4 text-lg font-medium text-gray-700">Loading Faculty Data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-6 lg:p-10">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-indigo-700 mb-2 sm:mb-0">
                        Update Faculty Information
                    </h1>
                    <button
                        onClick={() => navigate('/admin/dashboard/faculty/list')}
                        className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition duration-150 shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to List</span>
                    </button>
                </div>
                
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-indigo-100">
                                <tr>
                                    <th colSpan={4} className="py-3 px-6 text-xl font-bold text-indigo-800 text-center uppercase">
                                        Personal & Professional Details (ID: {formData.employeeID})
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                
                                {/* Row 1: ID (Disabled) & Name */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap w-1/4">Employee ID</th>
                                    <td className="px-6 py-3 w-1/4">
                                        <input
                                            type="text"
                                            name="employeeID"
                                            value={formData.employeeID}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:ring-0"
                                            disabled
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap w-1/4">Full Name</th>
                                    <td className="px-6 py-3 w-1/4">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>

                                {/* Row 2: Email & Phone */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Email</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Phone</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>

                                {/* Row 3: Department & Designation */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Department</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Designation</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>

                                {/* Row 4: Qualification & Specialization */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Qualification</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="qualification"
                                            value={formData.qualification}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Specialization</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>

                                {/* Row 5: Experience & Joining Date */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Experience (Years)</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="number"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleChange}
                                            min="0"
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="e.g., 5 years"
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Joining Date</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="date"
                                            name="joiningDate"
                                            value={formData.joiningDate}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>
                                
                                {/* Row 6: CNIC & Gender */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">CNIC</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="cnic"
                                            value={formData.cnic}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Gender</th>
                                    <td className="px-6 py-3">
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </td>
                                </tr>

                                {/* Row 7: City & Salary */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">City</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Salary (PKR)</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="number"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleChange}
                                            min="0"
                                            required
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>

                                {/* Row 8: Account Title & Account Number */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Account Title</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="accountTitle"
                                            value={formData.accountTitle}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Account Number</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>

                                {/* Row 9: Bank Name & Emergency Person */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Bank Name</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="bankName"
                                            value={formData.bankName}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Emergency Person</th>
                                    <td className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="emergencyPerson"
                                            value={formData.emergencyPerson}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>

                                {/* Row 10: Emergency Contact (Full width) */}
                                <tr className="hover:bg-indigo-50 transition-colors">
                                    <th className="px-6 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">Emergency Contact</th>
                                    <td colSpan={3} className="px-6 py-3">
                                        <input
                                            type="text"
                                            name="emergencyContact"
                                            value={formData.emergencyContact}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-12 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50"
                        >
                            Update Faculty
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default App;