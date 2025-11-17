import React from 'react'
import './Faculty.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { MDBNavbar, MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBNavbarBrand, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const ViewFaculty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Mock faculty data
  const mockFacultyData = {
    employeeID: "FAC-001",
    name: "Dr. John Smith",
    email: "john.smith@university.edu",
    designation: "Associate Professor",
    department: "Computer Science",
    qualification: "PhD in Computer Science",
    specialization: "Artificial Intelligence",
    experience: "8 years",
    phone: "+1-555-0123",
    status: "Active",
    cnic: "12345-6789012-3",
    city: "New York",
    dateOfBirth: "1985-05-15",
    gender: "Male",
    salary: "$85,000",
    bankName: "City Bank",
    accountTitle: "John Smith",
    accountNumber: "12345678901",
    emergencyPerson: "Sarah Smith",
    emergencyContact: "+1-555-0124",
    joiningDate: "2016-08-01"
  };

  useEffect(() => {
    if (!id || id === ":id") {
      toast.error("Invalid Faculty ID! Redirecting to Faculty List...");
      setTimeout(() => {
        navigate("/admin/dashboard/faculty/list");
      }, 2000);
      return;
    }
    
    // Simulate API call with mock data
    const fetchFacultyById = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data instead of API call
        setFaculty(mockFacultyData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching Faculty by id:", error);
        setNotFound(true);
        setLoading(false);
      }
    }
    
    fetchFacultyById();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading faculty details...</p>
      </div>
    );
  }

  if (notFound || !faculty) {
    return (
      <div className="notfound-container">
        <h2>Faculty Not Found</h2>
        <p>The requested faculty record doesn't exist.</p>
        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard/faculty/list")}
        >
          ← Back to Faculty List
        </button>
      </div>
    );
  }

  return (
    <>
      <div className='table-responsive'>
        <MDBContainer className='py-4'>
          <MDBCard className='shadow-4'>
            <MDBCardBody className=''>
              <div className='d-flex justify-content-between align-item-center mb-4'>
                <h3 className='text-primary fw-bold'>View Faculty Information</h3>
                <button className="btn btn-outline-primary"
                  onClick={() => navigate('/admin/dashboard/faculty/list')}
                >Back to List</button>
              </div>
              <MDBTable bordered hover responsive className="align-middle custom-table">
                <MDBTableHead>
                  <tr className='text-center table-primary'>
                    <th colSpan={4}>View Faculty Member</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <th scope='col'>Faculty ID</th>
                    <td className='text-success fw-bold'>{faculty?.employeeID}</td>
                    <th scope='col'>Faculty Name</th>
                    <td className='text-success fw-bold'>{faculty?.name}</td>
                  </tr>
                  <tr>
                    <th scope='col'>Email</th>
                    <td className='text-warning fw-bold'>{faculty?.email}</td>
                    <th scope='col'>Designation</th>
                    <td className='text-warning fw-bold'>{faculty?.designation}</td>
                  </tr>
                  <tr>
                    <th scope='col'>Department</th>
                    <td className='text-info fw-bold'>{faculty?.department}</td>
                    <th scope='col'>Qualification</th>
                    <td className='text-info fw-bold'>{faculty?.qualification}</td>
                  </tr>
                  <tr>
                    <th scope='col'>Specialization</th>
                    <td className='text-warning fw-bold'>{faculty?.specialization}</td>
                    <th scope='col'>Experience Level</th>
                    <td className='text-warning fw-bold'>{faculty?.experience}</td>
                  </tr>
                  <tr>
                    <th scope='col'>Phone Number</th>
                    <td className='text-info fw-bold'>{faculty?.phone}</td>
                    <th scope='col'>Status</th>
                    <td className='text-info fw-bold'>{faculty?.status}</td>
                  </tr>
                  <tr>
                    <th scope='col'>CNIC</th>
                    <td className='text-success fw-bold'>{faculty.cnic}</td>
                    <th scope='col'>City</th>
                    <td className='text-warning fw-bold'>{faculty?.city}</td>
                  </tr>
                  <tr>
                    <th scope='col'>Date of Birth</th>
                    <td>{faculty.dateOfBirth}</td>
                    <th scope='col'>Gender</th>
                    <td className='text-success fw-bold'>{faculty?.gender}</td>
                  </tr>
                  <tr>
                    <th>Salary</th>
                    <td className='text-success fw-bold'>{faculty?.salary}</td>
                    <th>Bank Name</th>
                    <td className='text-danger fw-bold'>{faculty?.bankName}</td>
                  </tr>
                  <tr>
                    <th scope='col'>Account Title</th>
                    <td className='text-ternary fw-bold'>{faculty.accountTitle}</td>
                    <th scope='col'>Account Number</th>
                    <td>{faculty.accountNumber}</td>
                  </tr>
                  <tr>
                    <th scope='col'>Emergency Contact Person</th>
                    <td className='text-warning fw-bold'>{faculty.emergencyPerson}</td>
                    <th scope='col'>Emergency Contact Number</th>
                    <td className='text-info fw-bold'>{faculty?.emergencyContact}</td>
                  </tr>
                  <tr>
                    <th scope='col'>Joining Date</th>
                    <td colSpan={3} className='text-info fw-bold'>{faculty?.joiningDate}</td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </div>
    </>
  )
}

export default ViewFaculty