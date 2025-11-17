import React, { useEffect, useState } from 'react';
import './Student.css';
import { toast } from 'react-toastify'

const StudentApprovals = () => {
  const [pendingStudents, setPendingStudents] = useState([
    {
      _id: 1,
      firstName: 'Usman',
      lastName: 'Ahmed',
      email: 'usman.ahmed@gmail.com',
      phoneNo: '+92 300 9876543',
      cnic: '12345-1234567-1',
      family: {
        fatherName: 'Ahmed Ali'
      },
      enrollment: {
        department: 'Computer Science',
        program: 'BS',
        semester: '1st'
      },
      admissionDate: '2024-09-20',
      documents: {
        cnic: { url: 'https://example.com/cnic1.jpg' },
        marksheet: { url: 'https://example.com/marksheet1.jpg' },
        photo: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
        domicile: { url: 'https://example.com/domicile1.jpg' }
      },
      profileImage: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      status: 'pending',
      appliedDate: '2024-09-15'
    },
    {
      _id: 2,
      firstName: 'Zainab',
      lastName: 'Fatima',
      email: 'zainab.fatima@gmail.com',
      phoneNo: '+92 301 8765432',
      cnic: '12345-2345678-2',
      family: {
        fatherName: 'Muhammad Yousuf'
      },
      enrollment: {
        department: 'Electrical Engineering',
        program: 'BS',
        semester: '1st'
      },
      admissionDate: '2024-09-20',
      documents: {
        cnic: { url: 'https://example.com/cnic2.jpg' },
        marksheet: { url: 'https://example.com/marksheet2.jpg' },
        photo: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
        domicile: { url: 'https://example.com/domicile2.jpg' }
      },
      profileImage: { url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      status: 'pending',
      appliedDate: '2024-09-16'
    },
    {
      _id: 3,
      firstName: 'Bilal',
      lastName: 'Hassan',
      email: 'bilal.hassan@gmail.com',
      phoneNo: '+92 302 7654321',
      cnic: '12345-3456789-3',
      family: {
        fatherName: 'Hassan Mahmood'
      },
      enrollment: {
        department: 'Mechanical Engineering',
        program: 'BS',
        semester: '1st'
      },
      admissionDate: '2024-09-20',
      documents: {
        cnic: { url: 'https://example.com/cnic3.jpg' },
        marksheet: { url: 'https://example.com/marksheet3.jpg' },
        photo: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
        domicile: { url: 'https://example.com/domicile3.jpg' }
      },
      profileImage: { url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
      status: 'pending',
      appliedDate: '2024-09-17'
    },
    {
      _id: 4,
      firstName: 'Mariam',
      lastName: 'Khan',
      email: 'mariam.khan@gmail.com',
      phoneNo: '+92 303 6543210',
      cnic: '12345-4567890-4',
      family: {
        fatherName: 'Imran Khan'
      },
      enrollment: {
        department: 'Software Engineering',
        program: 'BS',
        semester: '1st'
      },
      admissionDate: '2024-09-20',
      documents: {
        cnic: { url: 'https://example.com/cnic4.jpg' },
        marksheet: { url: 'https://example.com/marksheet4.jpg' },
        photo: { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
        domicile: { url: 'https://example.com/domicile4.jpg' }
      },
      profileImage: { url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      status: 'pending',
      appliedDate: '2024-09-18'
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'
  const [rejectReason, setRejectReason] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call with timeout
    const fetchPendingStudents = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Data is already set in state, no need to fetch
        console.log("Loaded mock pending students data");
      } catch (error) {
        console.log("Fetch Pending students Error!!!", error);
        toast.error("Failed to load student data");
      }
    };
    fetchPendingStudents();
  }, []);

  const handleApprove = (student) => {
    setSelectedStudent(student);
    setActionType('approve');
    setShowModal(true);
  };

  const handleReject = (student) => {
    setSelectedStudent(student);
    setActionType('rejected');
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (!selectedStudent) return;
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (actionType === 'approve') {
        toast.success(`${selectedStudent.firstName} ${selectedStudent.lastName} was approved Successfully`);
        setPendingStudents(prev => prev.filter(s => s._id !== selectedStudent._id));
      } else if (actionType === 'rejected') {
        toast.info(`${selectedStudent.firstName} ${selectedStudent.lastName} has been rejected`);
        setPendingStudents(prev => prev.filter(s => s._id !== selectedStudent._id));
      }
    } catch (error) {
      console.error("Approval/Reject Error:", error);
      toast.error("Something went wrong while updating the status!");
    }
    
    setShowModal(false);
    setRejectReason('');
  };

  const getDocumentStatus = (documents) => {
    if (!documents || typeof documents !== 'object') {
      return { completed: 0, total: 0, percentage: 0 };
    }
    const total = Object.keys(documents).length;
    const completed = Object.values(documents).filter(Boolean).length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  const filteredStudents =
    filter === 'all'
      ? pendingStudents
      : pendingStudents.filter((s) =>
          s.enrollment?.department?.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div className="approvals-container">
      <div className="container-fluid">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              <i className="fas fa-clock me-3"></i>Pending Approvals
            </h1>
            <p className="page-subtitle">
              Review and approve student registration applications
            </p>
          </div>
          <div className="header-stats">
            <div className="stat-badge">
              <i className="fas fa-hourglass-half"></i>
              <span>{pendingStudents.length} Pending</span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-label">Search by Department:</div>
          <div className="filter-controls">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Departments
            </button>
            <input
              type="text"
              className="search-bar"
              placeholder="Type department name (e.g. Software Engineering)"
              value={filter === 'all' ? '' : filter}
              onChange={(e) => {
                const value = e.target.value;
                setFilter(value === '' ? 'all' : value);
              }}
            />
          </div>
        </div>

        {/* Approvals Grid */}
        <div className="approvals-grid">
          {filteredStudents.map(student => {
            const docStatus = getDocumentStatus(student.documents);
            return (
              <div key={student._id} className="approval-card">
                <div className="card-header">
                  <div className="student-basic-info">
                    <img src={
                      student.documents?.photo?.url ||
                      student.profileImage?.url ||
                      "/default-avatar.png"
                    } alt={`${student.firstName} ${student.lastName}`} className="student-photo" />
                    <div className="student-details">
                      <h3 className="student-name">{student.firstName} {student.lastName}</h3>
                      <p className="student-email">
                        <i className="fas fa-envelope me-2"></i>
                        {student.email}
                      </p>
                      <p className="student-phone">
                        <i className="fas fa-phone me-2"></i>
                        {student.phoneNo}
                      </p>
                    </div>
                  </div>
                  <div className="time-badge">
                    <i className="far fa-clock me-2"></i>
                    Applied: {new Date(student.appliedDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="card-body">
                  <div className="info-grid">
                    <div className="info-item">
                      <label>CNIC</label>
                      <span>{student.cnic}</span>
                    </div>
                    <div className="info-item">
                      <label>Father's Name</label>
                      <span>{student.family?.fatherName || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Department</label>
                      <span className="dept-badge">{student.enrollment?.department || 'N/A'}</span>
                    </div>
                    <div className="info-item">
                      <label>Program</label>
                      <span>{student.enrollment?.program || 'N/A'} - {student.enrollment?.semester}</span>
                    </div>
                  </div>

                  {/* Documents Status */}
                  <div className="documents-section">
                    <div className="documents-header">
                      <h4>Documents Verification</h4>
                      <span className="completion-badge">
                        {docStatus.completed}/{docStatus.total} Complete
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${docStatus.percentage}%` }}
                      ></div>
                    </div>
                    <div className="documents-list">
                      <div className={`doc-item ${student.documents.cnic ? 'verified' : 'missing'}`}>
                        <i className={`fas ${student.documents.cnic ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                        <span>CNIC Copy</span>
                      </div>
                      <div className={`doc-item ${student.documents.marksheet ? 'verified' : 'missing'}`}>
                        <i className={`fas ${student.documents.marksheet ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                        <span>Marksheet</span>
                      </div>
                      <div className={`doc-item ${student.documents.photo ? 'verified' : 'missing'}`}>
                        <i className={`fas ${student.documents.photo ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                        <span>Photograph</span>
                      </div>
                      <div className={`doc-item ${student.documents.domicile ? 'verified' : 'missing'}`}>
                        <i className={`fas ${student.documents.domicile ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                        <span>Domicile</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    className="btn-reject"
                    onClick={() => handleReject(student)}
                  >
                    <i className="fas fa-times me-2"></i>
                    Reject
                  </button>
                  <button
                    className="btn-approve"
                    onClick={() => handleApprove(student)}
                  >
                    <i className="fas fa-check me-2"></i>
                    Approve
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-check-circle"></i>
            <h3>All Caught Up!</h3>
            <p>There are no pending approvals at the moment.</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {actionType === 'approve' ? (
                  <>
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Approve Application
                  </>
                ) : (
                  <>
                    <i className="fas fa-times-circle text-danger me-2"></i>
                    Reject Application
                  </>
                )}
              </h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              {actionType === 'approve' ? (
                <div>
                  <p className="mb-3">
                    Are you sure you want to approve <strong>{selectedStudent?.firstName} {selectedStudent?.lastName}</strong>'s application?
                  </p>
                  <div className="approval-details">
                    <div className="detail-item">
                      <i className="fas fa-user-graduate"></i>
                      <span>{selectedStudent?.firstName} {selectedStudent?.lastName}</span>
                    </div>
                    <div className="detail-item">
                      <i className="fas fa-envelope"></i>
                      <span>{selectedStudent?.email}</span>
                    </div>
                  </div>
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    Student will receive confirmation email with login credentials.
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-3">
                    Please provide a reason for rejecting <strong>{selectedStudent?.firstName} {selectedStudent?.lastName}</strong>'s application:
                  </p>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter rejection reason..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  ></textarea>
                  <div className="alert alert-warning mt-3">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Student will be notified via email with the rejection reason.
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className={`btn ${actionType === 'approve' ? 'btn-success' : 'btn-danger'}`}
                onClick={confirmAction}
                disabled={actionType === 'rejected' && !rejectReason.trim()}
              >
                {actionType === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentApprovals;