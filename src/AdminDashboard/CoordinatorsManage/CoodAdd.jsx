import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CoodAdd = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    coordId: '',
    name: '',
    email: '',
    phone: '',
    cnic: '',
    address: '',
    profileImage: '',
    department: '',
    role: '',
    roleTitle: '',
    
    // TYPE-SPECIFIC FIELDS
    departmentSpecific: {
      departmentBudget: '',
      facultyCount: '',
      strategicGoals: [],
      programsUnderManagement: []
    },
    semesterSpecific: {
      semester: '',
      startDate: '',
      endDate: '',
      coursesScheduled: '',
      totalStudents: ''
    },
    programSpecific: {
      programName: '',
      programDuration: '',
      studentCapacity: '',
      accreditationStatus: '',
      currentEnrollment: ''
    },
    examinationSpecific: {
      examTypes: [],
      examCenters: [],
      invigilatorsCount: '',
      resultProcessingType: ''
    },
    feeSpecific: {
      feeStructures: [{ program: '', semesterFee: '', otherCharges: '' }],
      paymentMethods: [],
      scholarshipPrograms: []
    },

    // STEP 5: Permissions Section
    permissions: {
      students: [],
      faculty: [],
      courses: [],
      examinations: [],
      fees: [],
      reports: []
    },

    // STEP 6: Status & Admin
    status: 'active',
    joiningDate: new Date().toISOString().split('T')[0], // Today's date

    // STEP 7: Login Credentials
    loginCredentials: {
      username: '',
      password: '',
      lastLogin: ''
    }
  });

  // Auto-fill role title when role or department changes
  useEffect(() => {
    if (formData.role && formData.department) {
      const roleTitle = generateRoleTitle(formData.role, formData.department);
      setFormData(prev => ({
        ...prev,
        roleTitle: roleTitle
      }));
    }
  }, [formData.role, formData.department]);

  // Auto-generate username when name changes
  useEffect(() => {
    if (formData.name && !formData.loginCredentials.username) {
      const username = formData.name.toLowerCase().replace(/\s+/g, '.') + '.coord';
      setFormData(prev => ({
        ...prev,
        loginCredentials: {
          ...prev.loginCredentials,
          username: username
        }
      }));
    }
  }, [formData.name]);

  const generateRoleTitle = (role, department) => {
    const roleMap = {
      'Department Coordinator': `${department} Department Coordinator`,
      'Semester Coordinator': `${department} Semester Coordinator`,
      'Examination Coordinator': `${department} Examination Coordinator`,
      'Admissions Coordinator': `${department} Admissions Coordinator`,
      'Program Coordinator': `${department} Program Coordinator`,
      'Fee Coordinator': `${department} Fee Coordinator`
    };
    
    return roleMap[role] || `${department} Coordinator`;
  };

  // Enhanced handleChange for nested objects
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if it's a nested field (contains dot notation)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle permissions multi-select
  const handlePermissionChange = (e, permissionType) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permissionType]: options
      }
    }));
  };

  // Handle array fields (multiple select)
  const handleArrayChange = (e, fieldName, parentField = null) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    
    if (parentField) {
      setFormData(prev => ({
        ...prev,
        [parentField]: {
          ...prev[parentField],
          [fieldName]: options
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [fieldName]: options
      }));
    }
  };

  // Handle strategic goals input
  const handleStrategicGoal = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault();
      const newGoal = e.target.value.trim();
      setFormData(prev => ({
        ...prev,
        departmentSpecific: {
          ...prev.departmentSpecific,
          strategicGoals: [...prev.departmentSpecific.strategicGoals, newGoal]
        }
      }));
      e.target.value = '';
    }
  };

  // Remove strategic goal
  const removeStrategicGoal = (index) => {
    setFormData(prev => ({
      ...prev,
      departmentSpecific: {
        ...prev.departmentSpecific,
        strategicGoals: prev.departmentSpecific.strategicGoals.filter((_, i) => i !== index)
      }
    }));
  };

  // Handle fee structure changes
  const handleFeeStructureChange = (index, field, value) => {
    const updatedFeeStructures = [...formData.feeSpecific.feeStructures];
    updatedFeeStructures[index] = {
      ...updatedFeeStructures[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      feeSpecific: {
        ...prev.feeSpecific,
        feeStructures: updatedFeeStructures
      }
    }));
  };

  // Add new fee structure row
  const addFeeStructure = () => {
    setFormData(prev => ({
      ...prev,
      feeSpecific: {
        ...prev.feeSpecific,
        feeStructures: [...prev.feeSpecific.feeStructures, { program: '', semesterFee: '', otherCharges: '' }]
      }
    }));
  };

  // Remove fee structure row
  const removeFeeStructure = (index) => {
    if (formData.feeSpecific.feeStructures.length > 1) {
      setFormData(prev => ({
        ...prev,
        feeSpecific: {
          ...prev.feeSpecific,
          feeStructures: prev.feeSpecific.feeStructures.filter((_, i) => i !== index)
        }
      }));
    }
  };

  // Generate strong password
  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    setFormData(prev => ({
      ...prev,
      loginCredentials: {
        ...prev.loginCredentials,
        password: password
      }
    }));
  };

  // Dynamic Type-Specific Components (keep all your existing components here)
  const DepartmentSpecificFields = () => (
    <div className="type-specific-section">
      <h4 className="section-subtitle">Department Management Details</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Department Budget (PKR)</label>
          <input
            type="number"
            name="departmentSpecific.departmentBudget"
            className="form-control"
            placeholder="5000000"
            value={formData.departmentSpecific.departmentBudget}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Faculty Count</label>
          <input
            type="number"
            name="departmentSpecific.facultyCount"
            className="form-control"
            placeholder="25"
            value={formData.departmentSpecific.facultyCount}
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Programs Under Management</label>
          <select
            multiple
            className="form-control"
            value={formData.departmentSpecific.programsUnderManagement}
            onChange={(e) => handleArrayChange(e, 'programsUnderManagement', 'departmentSpecific')}
          >
            {programs.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
          <small className="text-muted">Hold Ctrl to select multiple programs</small>
        </div>
        <div className="col-12">
          <label className="form-label">Strategic Goals</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type a goal and press Enter"
            onKeyDown={handleStrategicGoal}
          />
          <div className="goals-container mt-2">
            {formData.departmentSpecific.strategicGoals.map((goal, index) => (
              <span key={index} className="goal-tag">
                {goal}
                <button type="button" onClick={() => removeStrategicGoal(index)}>×</button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
    const SemesterSpecificFields = () => (
    <div className="type-specific-section">
      <h4 className="section-subtitle">Semester Management Details</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Semester</label>
          <select
            name="semesterSpecific.semester"
            className="form-control"
            value={formData.semesterSpecific.semester}
            onChange={handleChange}
          >
            <option value="">Select Semester</option>
            <option value="Fall 2024">Fall 2024</option>
            <option value="Spring 2025">Spring 2025</option>
            <option value="Summer 2025">Summer 2025</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Courses Scheduled</label>
          <input
            type="number"
            name="semesterSpecific.coursesScheduled"
            className="form-control"
            placeholder="15"
            value={formData.semesterSpecific.coursesScheduled}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            name="semesterSpecific.startDate"
            className="form-control"
            value={formData.semesterSpecific.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">End Date</label>
          <input
            type="date"
            name="semesterSpecific.endDate"
            className="form-control"
            value={formData.semesterSpecific.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Total Students</label>
          <input
            type="number"
            name="semesterSpecific.totalStudents"
            className="form-control"
            placeholder="300"
            value={formData.semesterSpecific.totalStudents}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
  
  const ProgramSpecificFields = () => (
    <div className="type-specific-section">
      <h4 className="section-subtitle">Program Management Details</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Program Name</label>
          <select
            name="programSpecific.programName"
            className="form-control"
            value={formData.programSpecific.programName}
            onChange={handleChange}
          >
            <option value="">Select Program</option>
            {programs.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Program Duration</label>
          <select
            name="programSpecific.programDuration"
            className="form-control"
            value={formData.programSpecific.programDuration}
            onChange={handleChange}
          >
            <option value="">Select Duration</option>
            <option value="2 Years">2 Years</option>
            <option value="4 Years">4 Years</option>
            <option value="5 Years">5 Years</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Student Capacity</label>
          <input
            type="number"
            name="programSpecific.studentCapacity"
            className="form-control"
            placeholder="200"
            value={formData.programSpecific.studentCapacity}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Current Enrollment</label>
          <input
            type="number"
            name="programSpecific.currentEnrollment"
            className="form-control"
            placeholder="150"
            value={formData.programSpecific.currentEnrollment}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Accreditation Status</label>
          <select
            name="programSpecific.accreditationStatus"
            className="form-control"
            value={formData.programSpecific.accreditationStatus}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Accredited">Accredited</option>
            <option value="Pending">Pending</option>
            <option value="Not Accredited">Not Accredited</option>
          </select>
        </div>
      </div>
    </div>
  );

  const ExaminationSpecificFields = () => (
    <div className="type-specific-section">
      <h4 className="section-subtitle">Examination Management Details</h4>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Invigilators Count</label>
          <input
            type="number"
            name="examinationSpecific.invigilatorsCount"
            className="form-control"
            placeholder="50"
            value={formData.examinationSpecific.invigilatorsCount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Result Processing Type</label>
          <select
            name="examinationSpecific.resultProcessingType"
            className="form-control"
            value={formData.examinationSpecific.resultProcessingType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Automated">Automated</option>
            <option value="Manual">Manual</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Exam Types</label>
          <select
            multiple
            className="form-control"
            value={formData.examinationSpecific.examTypes}
            onChange={(e) => handleArrayChange(e, 'examTypes', 'examinationSpecific')}
          >
            <option value="Mid-term">Mid-term</option>
            <option value="Final">Final</option>
            <option value="Quiz">Quiz</option>
            <option value="Practical">Practical</option>
            <option value="Assignment">Assignment</option>
          </select>
          <small className="text-muted">Hold Ctrl to select multiple exam types</small>
        </div>
        <div className="col-12">
          <label className="form-label">Exam Centers</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type center name and press Enter"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                e.preventDefault();
                const newCenter = e.target.value.trim();
                setFormData(prev => ({
                  ...prev,
                  examinationSpecific: {
                    ...prev.examinationSpecific,
                    examCenters: [...prev.examinationSpecific.examCenters, newCenter]
                  }
                }));
                e.target.value = '';
              }
            }}
          />
          <div className="centers-container mt-2">
            {formData.examinationSpecific.examCenters.map((center, index) => (
              <span key={index} className="center-tag">
                {center}
                <button type="button" onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    examinationSpecific: {
                      ...prev.examinationSpecific,
                      examCenters: prev.examinationSpecific.examCenters.filter((_, i) => i !== index)
                    }
                  }));
                }}>×</button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
const FeeSpecificFields = () => (
    <div className="type-specific-section">
      <h4 className="section-subtitle">Fee Management Details</h4>
      <div className="row g-3">
        <div className="col-12">
          <label className="form-label">Fee Structures</label>
          <div className="fee-structures-table">
            {formData.feeSpecific.feeStructures.map((fee, index) => (
              <div key={index} className="fee-structure-row row g-2 mb-2">
                <div className="col-md-4">
                  <select
                    className="form-control"
                    value={fee.program}
                    onChange={(e) => handleFeeStructureChange(index, 'program', e.target.value)}
                  >
                    <option value="">Select Program</option>
                    {programs.map(program => (
                      <option key={program} value={program}>{program}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Semester Fee"
                    value={fee.semesterFee}
                    onChange={(e) => handleFeeStructureChange(index, 'semesterFee', e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Other Charges"
                    value={fee.otherCharges}
                    onChange={(e) => handleFeeStructureChange(index, 'otherCharges', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    type="button"
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => removeFeeStructure(index)}
                    disabled={formData.feeSpecific.feeStructures.length === 1}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" className="btn btn-secondary btn-sm" onClick={addFeeStructure}>
              + Add Fee Structure
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <label className="form-label">Payment Methods</label>
          <select
            multiple
            className="form-control"
            value={formData.feeSpecific.paymentMethods}
            onChange={(e) => handleArrayChange(e, 'paymentMethods', 'feeSpecific')}
          >
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Online Payment">Online Payment</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </select>
          <small className="text-muted">Hold Ctrl to select multiple methods</small>
        </div>
        <div className="col-md-6">
          <label className="form-label">Scholarship Programs</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type program and press Enter"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                e.preventDefault();
                const newProgram = e.target.value.trim();
                setFormData(prev => ({
                  ...prev,
                  feeSpecific: {
                    ...prev.feeSpecific,
                    scholarshipPrograms: [...prev.feeSpecific.scholarshipPrograms, newProgram]
                  }
                }));
                e.target.value = '';
              }
            }}
          />
          <div className="scholarships-container mt-2">
            {formData.feeSpecific.scholarshipPrograms.map((program, index) => (
              <span key={index} className="scholarship-tag">
                {program}
                <button type="button" onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    feeSpecific: {
                      ...prev.feeSpecific,
                      scholarshipPrograms: prev.feeSpecific.scholarshipPrograms.filter((_, i) => i !== index)
                    }
                  }));
                }}>×</button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  // ... (Keep all your other TypeSpecific components exactly as they were)

  const TypeSpecificSection = () => {
    switch(formData.role) {
      case 'Department Coordinator':
        return <DepartmentSpecificFields />;
      case 'Semester Coordinator':
        return <SemesterSpecificFields />;
      case 'Program Coordinator':
        return <ProgramSpecificFields />;
      case 'Examination Coordinator':
        return <ExaminationSpecificFields />;
      case 'Fee Coordinator':
        return <FeeSpecificFields />;
      default:
        return (
          <div className="type-specific-section">
            <p className="text-muted">Select a coordinator type to see specific fields</p>
          </div>
        );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Coordinator Data:', formData);
    alert('Coordinator added successfully!');
    navigate('/admin/dashboard/coordinators/list');
  };

  const departments = [
    'Computer Science',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Software Engineering',
    'Business Administration'
  ];

  const roles = [
    'Department Coordinator',
    'Semester Coordinator',
    'Examination Coordinator',
    'Admissions Coordinator',
    'Program Coordinator',
    'Fee Coordinator'
  ];

  const programs = [
    'BS Computer Science',
    'MS Computer Science',
    'BS Electrical Engineering',
    'MS Electrical Engineering',
    'BS Mechanical Engineering',
    'BS Software Engineering',
    'BS Civil Engineering',
    'Business Administration'
  ];

  // Permission options for each category
  const permissionOptions = {
    students: ['view', 'create', 'edit', 'delete', 'export'],
    faculty: ['view', 'create', 'edit', 'assign_courses', 'evaluate'],
    courses: ['view', 'create', 'edit', 'schedule', 'assign_faculty'],
    examinations: ['view', 'create', 'edit', 'schedule', 'publish_results'],
    fees: ['view', 'collect', 'waiver', 'generate_receipts', 'reports'],
    reports: ['academic', 'financial', 'attendance', 'performance', 'custom']
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'on_leave', label: 'On Leave' },
    { value: 'inactive', label: 'Inactive' }
  ];

  return (
    <div className="cood-add-container">
      <div className="container-fluid">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              <i className="fas fa-user-plus me-3"></i>Add New Coordinator
            </h1>
            <p className="page-subtitle">
              Assign a coordinator to manage programs and students
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-12">
              {/* Personal Information */}
              <div className="form-section-card">
                <h3 className="section-title">
                  <i className="fas fa-user me-2"></i>Personal Information
                </h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Coordinator ID *</label>
                    <input
                      type="text"
                      name="coordId"
                      className="form-control"
                      placeholder="COORD-001"
                      value={formData.coordId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="email@university.edu.pk"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control"
                      placeholder="+92 300 1234567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">CNIC *</label>
                    <input
                      type="number"
                      name="cnic"
                      className="form-control"
                      placeholder="00000-0000000-0"
                      value={formData.cnic}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-8">
                    <label className="form-label">Profile Image</label>
                    <input
                      type="file"
                      name="profileImage"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Assignment Details */}
              <div className="form-section-card">
                <h3 className="section-title">
                  <i className="fas fa-tasks me-2"></i>Coordinator Role 
                </h3>
                <div className="row g-3"> 
                  <div className="col-md-6">
                    <label className="form-label">Coordinator Type *</label>
                    <select
                      name="role"
                      className="form-control"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      {roles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Department *</label>
                    <select
                      name="department"
                      className="form-control"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="form-section-card">
                <h3 className='section-title'>
                  <i className="fas fa-tasks me-2"></i>Role Title of Coordinator
                </h3>
                <div className="row g-3">
                  <div className='col-md-6'>
                    <label className='form-label'>Role Title</label>
                      <input 
                        type="text"
                        className='form-control'
                        name='roleTitle'
                        placeholder='Role title will auto-fill'
                        value={formData.roleTitle}
                        onChange={handleChange} 
                      />
                      <small className="text-muted">
                        Auto-filled based on role and department
                      </small>
                  </div>
                </div>
              </div>

              {/* DYNAMIC TYPE-SPECIFIC SECTION */}
              <div className="form-section-card">
                <h3 className="section-title">
                  <i className="fas fa-cogs me-2"></i>Specific Details
                </h3>
                <TypeSpecificSection />
              </div>

              {/* STEP 5: Permissions Section */}
              <div className="form-section-card">
                <h3 className="section-title">
                  <i className="fas fa-shield-alt me-2"></i>Permissions & Access
                </h3>
                <div className="row g-3">
                  {Object.entries(permissionOptions).map(([category, options]) => (
                    <div key={category} className="col-md-6">
                      <label className="form-label text-capitalize">
                        {category} Permissions
                      </label>
                      <select
                        multiple
                        className="form-control"
                        value={formData.permissions[category]}
                        onChange={(e) => handlePermissionChange(e, category)}
                      >
                        {options.map(option => (
                          <option key={option} value={option}>
                            {option.replace('_', ' ').toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <small className="text-muted">
                        Hold Ctrl to select multiple permissions
                      </small>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 6: Status & Admin */}
              <div className="form-section-card">
                <h3 className="section-title">
                  <i className="fas fa-info-circle me-2"></i>Status & Administration
                </h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-control"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      {statusOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Joining Date</label>
                    <input
                      type="date"
                      name="joiningDate"
                      className="form-control"
                      value={formData.joiningDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* STEP 7: Login Credentials */}
              <div className="form-section-card">
                <h3 className="section-title">
                  <i className="fas fa-key me-2"></i>Login Credentials
                </h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Username *</label>
                    <input
                      type="text"
                      name="loginCredentials.username"
                      className="form-control"
                      placeholder="username.coord"
                      value={formData.loginCredentials.username}
                      onChange={handleChange}
                      required
                    />
                    <small className="text-muted">
                      Auto-generated from name, can be modified
                    </small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Password *</label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="loginCredentials.password"
                        className="form-control"
                        placeholder="Generate strong password"
                        value={formData.loginCredentials.password}
                        onChange={handleChange}
                        required
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={generatePassword}
                      >
                        <i className="fas fa-sync-alt"></i> Generate
                      </button>
                    </div>
                    <small className="text-muted">
                      Use generate button for strong password
                    </small>
                  </div>
                </div>
              </div>

              {/* Responsibilities Info */}
              <div className="info-card">
                <div className="info-header">
                  <i className="fas fa-info-circle"></i>
                  <h4>Coordinator Responsibilities</h4>
                </div>
                <div className="responsibilities-grid">
                  <div className="responsibility-item">
                    <i className="fas fa-check-circle"></i>
                    <span>Student Enrollment Management</span>
                  </div>
                  <div className="responsibility-item">
                    <i className="fas fa-check-circle"></i>
                    <span>Course Registration Oversight</span>
                  </div>
                  <div className="responsibility-item">
                    <i className="fas fa-check-circle"></i>
                    <span>Academic Progress Monitoring</span>
                  </div>
                  <div className="responsibility-item">
                    <i className="fas fa-check-circle"></i>
                    <span>Faculty Coordination</span>
                  </div>
                  <div className="responsibility-item">
                    <i className="fas fa-check-circle"></i>
                    <span>Examination Management</span>
                  </div>
                  <div className="responsibility-item">
                    <i className="fas fa-check-circle"></i>
                    <span>Student Query Resolution</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={() => navigate('/admin/dashboard/coordinators/list')}
                >
                  <i className="fas fa-times me-2"></i>Cancel
                </button>
                <button type="submit" className="btn-submit">
                  <i className="fas fa-check me-2"></i>Add Coordinator
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoodAdd;