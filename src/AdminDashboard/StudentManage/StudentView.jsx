import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'
import { MDBNavbar, MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBNavbarBrand, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';

const StudentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Mock student data
  const mockStudentData = {
    _id: id,
    rollNo: 'CS-2024-001',
    firstName: 'Ahmed',
    lastName: 'Ali Khan',
    email: 'ahmed.ali@university.edu.pk',
    phoneNo: '+92 300 1234567',
    cnic: '12345-6789012-3',
    DOB: '2000-05-15',
    gender: 'Male',
    bloodGroup: 'A+',
    maritalStatus: 'Single',
    religion: 'Islam',
    nationality: 'Pakistani',
    province: 'Punjab',
    domicile: 'Lahore',
    presentAddress: '123 Main Street, Lahore, Pakistan',
    permanentAddress: '123 Main Street, Lahore, Pakistan',
    status: 'Active',
    registrationNo: 'REG-2024-CS-001',
    cgpa: 3.45,
    section: 'A',
    createdAt: '2024-01-15T10:30:00.000Z',
    enrollment: {
      department: 'Computer Science',
      program: 'BS Computer Science',
      semester: '4th',
      session: '2022-2026',
      campus: 'Main Campus',
      shift: 'Morning',
      appliedOn: '2022-09-15'
    },
    family: {
      fatherName: 'Ali Khan',
      motherName: 'Fatima Khan',
      fatherCnic: '12345-1234567-1',
      fatherMobile: '+92 300 9876543'
    },
    documents: {
      cnic: true,
      marksheet: true,
      photo: true,
      domicile: true
    }
  };

  useEffect(() => {
    const fetchStudentById = async () => {
      try {
        // Check if ID is valid
        if (!id || id === ":id") {
          toast.error("Invalid Student ID! Redirecting to Student List...");
          setTimeout(() => {
            navigate("/admin/dashboard/students/list");
          }, 2000);
          return;
        }

        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use mock data instead of API call
        setStudent(mockStudentData);
        setLoading(false);
        
      } catch (error) {
        console.log("Error fetching Student by id:", error);
        setNotFound(true);
        toast.error("Error fetching Student details!");
        setLoading(false);
      }
    }
    fetchStudentById();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading Student details...</p>
      </div>
    );
  }

  if (notFound || !student) {
    return (
      <div className="notfound-container">
        <h2>Student Not Found</h2>
        <p>The requested Student record doesn't exist.</p>
        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard/students/list")}
        >
          ← Back to Student List
        </button>
      </div>
    );
  }

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className='table-responsive'>
      <MDBContainer className='py-4'>
        <MDBCard className='shadow-4'>
          <MDBCardBody className=''>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className='text-primary fw-bold'>Student Information</h3>
              <button 
                className="btn btn-outline-primary"
                onClick={() => navigate("/admin/dashboard/students/list")}
              >
                ← Back to List
              </button>
            </div>
            
            <MDBTable bordered hover responsive className="align-middle custom-table">
              <MDBTableHead>
                <tr className='text-center table-primary'>
                  <th colSpan={4}>Student Details</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {/* Personal Information */}
                <tr>
                  <th scope='col'>Roll Number</th>
                  <td className='text-success fw-bold'>{student.rollNo || 'N/A'}</td>
                  <th scope='col'>Full Name</th>
                  <td className='text-success fw-bold'>
                    {student.firstName} {student.lastName}
                  </td>
                </tr>
                <tr>
                  <th scope='col'>Email</th>
                  <td className='text-warning fw-bold'>{student.email}</td>
                  <th scope='col'>Phone Number</th>
                  <td className='text-warning fw-bold'>{student.phoneNo || 'N/A'}</td>
                </tr>
                <tr>
                  <th scope='col'>CNIC</th>
                  <td className='text-info fw-bold'>{student.cnic || 'N/A'}</td>
                  <th scope='col'>Date of Birth</th>
                  <td className='text-info fw-bold'>{formatDate(student.DOB)}</td>
                </tr>
                <tr>
                  <th scope='col'>Gender</th>
                  <td className='text-warning fw-bold'>{student.gender || 'N/A'}</td>
                  <th scope='col'>Blood Group</th>
                  <td className='text-warning fw-bold'>{student.bloodGroup || 'N/A'}</td>
                </tr>
                <tr>
                  <th scope='col'>Marital Status</th>
                  <td className='text-info fw-bold'>{student.maritalStatus || 'N/A'}</td>
                  <th scope='col'>Religion</th>
                  <td className='text-info fw-bold'>{student.religion || 'N/A'}</td>
                </tr>
                <tr>
                  <th scope='col'>Nationality</th>
                  <td className='text-success fw-bold'>{student.nationality || 'N/A'}</td>
                  <th scope='col'>Status</th>
                  <td className='text-warning fw-bold'>
                    <span className={`badge ${
                      student.status === 'Active' || student.status === 'Assigned' ? 'bg-success' :
                      student.status === 'Suspended' ? 'bg-warning' :
                      student.status === 'rejected' ? 'bg-danger' : 'bg-secondary'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                </tr>

                {/* Address Information */}
                <tr>
                  <th scope='col'>Present Address</th>
                  <td colSpan={3}>{student.presentAddress || 'N/A'}</td>
                </tr>
                <tr>
                  <th scope='col'>Permanent Address</th>
                  <td colSpan={3}>{student.permanentAddress || 'N/A'}</td>
                </tr>
                <tr>
                  <th scope='col'>Province</th>
                  <td className='text-success fw-bold'>{student.province || 'N/A'}</td>
                  <th scope='col'>Domicile</th>
                  <td className='text-warning fw-bold'>{student.domicile || 'N/A'}</td>
                </tr>

                {/* Academic Information */}
                {student.enrollment && (
                  <>
                    <tr className="table-info">
                      <th colSpan={4} className="text-center">Academic Information</th>
                    </tr>
                    <tr>
                      <th scope='col'>Department</th>
                      <td className='text-success fw-bold'>{student.enrollment.department}</td>
                      <th scope='col'>Program</th>
                      <td className='text-success fw-bold'>{student.enrollment.program}</td>
                    </tr>
                    <tr>
                      <th scope='col'>Semester</th>
                      <td className='text-warning fw-bold'>{student.enrollment.semester}</td>
                      <th scope='col'>Session</th>
                      <td className='text-warning fw-bold'>{student.enrollment.session}</td>
                    </tr>
                    <tr>
                      <th scope='col'>Campus</th>
                      <td className='text-info fw-bold'>{student.enrollment.campus}</td>
                      <th scope='col'>Shift</th>
                      <td className='text-info fw-bold'>{student.enrollment.shift}</td>
                    </tr>
                    <tr>
                      <th scope='col'>Applied On</th>
                      <td colSpan={3} className='text-warning fw-bold'>
                        {formatDate(student.enrollment.appliedOn)}
                      </td>
                    </tr>
                  </>
                )}

                {/* Family Information */}
                {student.family && (
                  <>
                    <tr className="table-warning">
                      <th colSpan={4} className="text-center">Family Information</th>
                    </tr>
                    <tr>
                      <th scope='col'>Father's Name</th>
                      <td className='text-success fw-bold'>{student.family.fatherName}</td>
                      <th scope='col'>Mother's Name</th>
                      <td className='text-success fw-bold'>{student.family.motherName}</td>
                    </tr>
                    <tr>
                      <th scope='col'>Father's CNIC</th>
                      <td className='text-warning fw-bold'>{student.family.fatherCnic}</td>
                      <th scope='col'>Father's Mobile</th>
                      <td className='text-warning fw-bold'>{student.family.fatherMobile}</td>
                    </tr>
                  </>
                )}

                {/* Documents Information */}
                {student.documents && (
                  <>
                    <tr className="table-success">
                      <th colSpan={4} className="text-center">Documents Status</th>
                    </tr>
                    <tr>
                      <th scope='col'>CNIC Document</th>
                      <td>
                        <span className={`badge ${student.documents.cnic ? 'bg-success' : 'bg-danger'}`}>
                          {student.documents.cnic ? 'Verified' : 'Missing'}
                        </span>
                      </td>
                      <th scope='col'>Marksheet</th>
                      <td>
                        <span className={`badge ${student.documents.marksheet ? 'bg-success' : 'bg-danger'}`}>
                          {student.documents.marksheet ? 'Verified' : 'Missing'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope='col'>Photo</th>
                      <td>
                        <span className={`badge ${student.documents.photo ? 'bg-success' : 'bg-danger'}`}>
                          {student.documents.photo ? 'Verified' : 'Missing'}
                        </span>
                      </td>
                      <th scope='col'>Domicile</th>
                      <td>
                        <span className={`badge ${student.documents.domicile ? 'bg-success' : 'bg-danger'}`}>
                          {student.documents.domicile ? 'Verified' : 'Missing'}
                        </span>
                      </td>
                    </tr>
                  </>
                )}

                {/* Additional Information */}
                <tr>
                  <th scope='col'>Registration No</th>
                  <td className='text-info fw-bold'>{student.registrationNo || 'N/A'}</td>
                  <th scope='col'>CGPA</th>
                  <td className='text-info fw-bold'>
                    {student.cgpa ? student.cgpa.toFixed(2) : 'N/A'}
                  </td>
                </tr>
                <tr>
                  <th scope='col'>Created At</th>
                  <td colSpan={3} className='text-muted'>
                    {formatDate(student.createdAt)}
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  )
}

export default StudentView