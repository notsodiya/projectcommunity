import React, { useState, useEffect } from 'react';
import './Familymembers.css';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
const Familymembers = () => {
  //
  const [selectedOc, setSelectedOc] = useState([]);
  const [popupVisibleOc, setPopupVisibleOc] = useState(false);
  const [popupVisibleocc, setPopupVisibleocc] = useState(false);
  const handleEditClickOc = async (education) => {
    try {
      const response = await fetch(`http://localhost:51294/api/GetOquId?Id=${education.Id}`, {
        method: 'POST', // Set the method to GET explicitly
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setSelectedOc(data);
      setPopupVisibleOc(true);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };
  
  const handleSubmitedocc = async () => {
    try {
        await axios.post('http://localhost:51294/api/InsOccupation', formDataocc);
        alert('Education data added successfully!');
        setPopupVisibleocc(false); // Close the popup after submitting the data
        window.location.href = "/profile";
    } catch (err) {
        alert('Error occurred while adding education data');
        console.error(err);
    }
  };
  const [formDataocc, setFormDataedocc] = useState({
  FamilyMemberId: localStorage.getItem('FamilyMemberId'),
  Designation: '',
          NameOfCompany: '',
          Industry: '',
          Category: '',
          StartDate: '',
          EndDate: '',
          Address1: '',
          Address2: '',
          City: '',
          State: '',
          Country: '',
          PinCode: ''
  });

  const handleChangeocc= (e) => {
    setFormDataedocc({ ...formDataocc, [e.target.name]: e.target.value });
  };
  //
  const [advertisementFamily, setAdvertisementFamily] = useState({
    FamilyId: localStorage.getItem('FamilyId'),
    
    FirstName: '',
    MiddleName: '',
    LastName: '', 
    Relationship: '',
    DateOfBirth: '',
    BloodGroup: '',
    MaritalStatus: '',
    CountryCode: '',
    MobileNo: '',
    Gotra: '',
    NativePlace: '',
    Email: '',
    Photo: '',
    Address1: '',
    Address2: '',
    City: '',
    State: '',
    Country: '',
    Pincode: '',
    IsActive: ''
  });

   // State to manage the visibility of the popup
   const [isPopupOpenfm, setPopupOpenfm] = useState(false);

   const handleChangefm = (e) => {
     const { name, value } = e.target;
     setAdvertisementFamily({ ...advertisementFamily, [name]: value });
   };
 
   // Handle file input change
   const handleImageChangefm = (e) => {
     const file = e.target.files[0];
     readImageAsBase64(file);
   };
 
   // Convert image to Base64 string
   const readImageAsBase64 = (file) => {
     const reader = new FileReader();
     reader.onload = () => {
       setAdvertisementFamily({ ...advertisementFamily, Photo: reader.result });
     };
     reader.readAsDataURL(file);
   };
 
   const handleSubmitfm = async (e) => {
     e.preventDefault();
     try {
       await axios.post('http://localhost:51294/api/InsFamilyMember', advertisementFamily);
       alert('Advertisement added successfully');
       setPopupOpenfm(false); // Close the popup after submitting
       window.location.href ="/showads"
     } catch (error) {
       alert('Error adding advertisement:', error);
     }
   };
 
   // Function to toggle the visibility of the popup
   const togglePopupfm = () => {
     setPopupOpenfm(!isPopupOpenfm);
   };
 

//
//
// const [familyData, setFamilyData] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState([]);
  const [popupVisibled, setPopupVisibled] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

//
  const [members, setMembers] = useState([]);
  //const [showEducationCard, setShowEducationCard] = useState(false);
  const [educationDetails, setEducationDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [educationDetailso, setEducationDetailso] = useState(null);
  const [showPopupo, setShowPopupo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(3);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('http://localhost:51294/api/GetByFamilyId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ FamilyId: localStorage.getItem('FamilyId')})
           
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMembers(data.Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMembers();
  }, []);

//   const toggleEducationCard = () => {
//     setShowEducationCard(!showEducationCard);
//   };

const fetchEducationDetails = async (familyMemberId) => {
    try {
      const response = await fetch('http://localhost:51294/api/GetEducationById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FamilyMemberId: familyMemberId })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch education details');
      }
  
      const data = await response.json();
      setEducationDetails(data.Data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching education details:', error);
    }
  };

  const fetchOccupationDetails = async (familyMemberId) => {
    try {
      const response = await fetch('http://localhost:51294/api/GetOccupationById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FamilyMemberId: familyMemberId })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch education details');
      }
  
      const data = await response.json();
      setEducationDetailso(data.Data);
      setShowPopupo(true);
    } catch (error) {
      console.error('Error fetching education details:', error);
    }
  };
  const handleEditClickd = async (education) => {
    try {
      const response = await fetch(`http://localhost:51294/api/FamilyMemberById?Id=${education.Id}`, {
        method: 'POST', // Set the method to GET explicitly
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setSelectedEducation(data);
      setPopupVisibled(true);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };
  const [formDataed, setFormDataed] = useState({
    FamilyMemberId: localStorage.getItem('FamilyMemberId'),
    Qualification: '',
    PassingYear: '',
    Schooling: '',
    Organisation: '',
    GPA: ''
});
const [popupVisibleedi, setPopupVisibleedi] = useState(false); // State variable for popup visibility
const [educationDataed, setEducationDataedi] = useState([]);
const [qualificationOptionsed, setQualificationOptionsed] = useState([]);

const handleChangeed = (e) => {
    setFormDataed({ ...formDataed, [e.target.name]: e.target.value });
};

const handleSubmitededi = async () => {
    try {
        await axios.post('http://localhost:51294/api/Education/InsEducation', formDataed);
        alert('Education data added successfully!');
        setPopupVisibleedi(false); // Close the popup after submitting the data
        window.location.href = "/education";
    } catch (err) {
        alert('Error occurred while adding education data');
        console.error(err);
    }
};

useEffect(() => {
    const fetchDataedi = async () => {
        try {
            const response = await axios.get(`http://localhost:51294/api/Education/GetEducationById`);
            setEducationDataedi(response.data);
        } catch (error) {
            console.error('Error fetching education data:', error);
        }
    };

    fetchDataedi();
}, [formDataed.FamilyMemberId]);

useEffect(() => {
    // Fetch qualification options from an API or define them locally
    const qualifications = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'Doctorate'];
    setQualificationOptionsed(qualifications);
}, []);
const [familyData, setFamilyData] = useState([]);
const [selectedEducationed, setSelectedEducationed] = useState([]);
  const [popupVisibleded, setPopupVisibleded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem('FamilyMemberId'); // Retrieve the Id from localStorage
      const response = await fetch('http://localhost:51294/api/GetEducationById', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FamilyMemberId: userId }) 
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFamilyData(data.Data);
    } catch (error) {
      setError('Error fetching data. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClickedu = async (education) => {
    try {
      const response = await fetch(`http://localhost:51294/api/GetEducationId?Id=${education.Id}`, {
        method: 'POST', // Set the method to GET explicitly
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setSelectedEducationed(data);
      setPopupVisibleded(true);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };
  return (
	<><div><Navbar /></div>
  
  <div className='body'>
		  <div className="courses-container">
      <button className="familymem" onClick={togglePopupfm}>Add Member</button>
			  {currentMembers.map((member) => (
				  <div className="course" key={member.Id}>
					  <div className="course-preview">
						  <h6>Member Details</h6>
              <img className="adscard__thumb"  src={member.Photo} alt="" />
						  <h2>{`${member.FirstName} ${member.MiddleName} ${member.LastName}`}</h2>
						  {/* Add more details here if needed */}
						  <button className="education-button" onClick={() => fetchEducationDetails(member.Id)}>
							  Education
						  </button>
						  <button className="education-button" onClick={() => fetchOccupationDetails(member.Id)}>Occupation</button>
					  </div>
					  <div className="course-info">
            <table>
                                        <tr>
                                          <td className='fontweight'> Name: </td>
                                          <td>{member.FirstName} {member.MiddleName} {member.LastName}</td>
                                        </tr>
                                        <tr>
                                       <td className='fontweight'> Date of Birth: </td>
                                        <td>{new Date(member.DateOfBirth).toLocaleDateString()}</td>
                                              </tr>
                                        <tr>
                                          <td className='fontweight'> Blood Group: </td>
                                          <td>{member.BloodGroup}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Marital Status: </td>
                                          <td>{member.MaritalStatus === 0 ? 'Single' : 'Married'}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Contact Number: </td>
                                          <td>{member.CountryCode} {member.MobileNo} </td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Email Id: </td>
                                          <td>{member.Email}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Gotra: </td>
                                          <td>{member.Gotra}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Native Place: </td>
                                          <td>{member.NativePlace}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Address 1: </td>
                                          <td>{member.Address1} {member.City} {member.State} {member.Country} {member.Pincode}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Address 2: </td>
                                          <td>{member.Address2}</td>
                                        </tr>
                                      

                                       
                                        
                                        
                                      </table>
                                      <button onClick={() => handleEditClickd(member)}>Edit</button>
						  {/* Additional fields can be added here */}
					  </div>
				  </div>
			  ))}
		  </div>
      {popupVisibled && selectedEducation && (
        <Popupd
          education={selectedEducation}
          onClose={() => setPopupVisibled(false)} />
      )}
	  <div className="pagination">
        {members.length > membersPerPage && (
          <ul className="pagination">
            {Array(Math.ceil(members.length / membersPerPage))
              .fill()
              .map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <a onClick={() => paginate(i + 1)} href="#!" className="page-link">
                    {i + 1}
                  </a>
                </li>
              ))}
          </ul>
        )}
      </div> </div>
	  {showPopup && (
  <div className="popup">
    <div className="popup-inner">
      <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
      <h2>Education</h2>
      <button onClick={() => setPopupVisibleedi(true)}>Add Education</button>
      {popupVisibleedi && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Add Education</h2>
                        <select name="Qualification" onChange={handleChangeed}>
                            <option value="">Select Qualification</option>
                            {qualificationOptionsed.map((qualification, index) => (
                                <option key={index} value={qualification}>{qualification}</option>
                            ))}
                        </select>
                        <input type="number" name="PassingYear" placeholder="Passing Year" onChange={handleChangeed} />
                        <input type="text" name="Schooling" placeholder="Schooling" onChange={handleChangeed} />
                        <input type="text" name="Organisation" placeholder="Organisation" onChange={handleChangeed} />
                        <input type="number" name="GPA" placeholder="GPA" onChange={handleChangeed} />
                        <button onClick={handleSubmitededi}>Add</button>
                        <button onClick={() => setPopupVisibleedi(false)}>Cancel</button>
                    </div>
                </div>
            )}
      {educationDetails && educationDetails.map((education, index) => (
      
        <div key={index}>
          <h1 style={{ color: 'blue', fontSize: '24px', borderBottom: '2px solid blue', paddingBottom: '10px' }}></h1>
          <table>
                                        <tr>
                                          <td className='fontweight'> Qualification: </td>
                                          <td>{education.Qualification}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> PassingYear: </td>
                                          <td>{education.PassingYear}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Schooling: </td>
                                          <td>{education.Schooling}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Organisation: </td>
                                          <td> {education.Organisation}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> GPA: </td>
                                          <td>{education.GPA} </td>
                                        </tr>
                                        <button onClick={() => handleEditClickedu(education)}>Edit</button>
                                      </table>
                                      {popupVisibleded && selectedEducationed && (
        <Popupedu
          education={selectedEducationed}
          onClose={() => setPopupVisibleded(false)} />
      )}
      
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  </div>
  
  
)}

{/* Popup component */}
{isPopupOpenfm && (
            <div className="popup">
              <div className="popup-content">
                <h2>Add Member</h2>
                <form onSubmit={handleSubmitfm}>
                  <div className="form-group">
                    <label>FirstName:</label>
                    <input type="text" name="FirstName" value={advertisementFamily.FirstName} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>MiddleName:</label>
                    <input type="text" name="MiddleName" value={advertisementFamily.MiddleName} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>LastName:</label>
                    <input type="text" name="LastName" value={advertisementFamily.LastName} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>Relationship:</label>
                    <input type="text" name="Relationship" value={advertisementFamily.Relationship} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>DateOfBirth:</label>
                    <input type="date" name="DateOfBirth" value={advertisementFamily.DateOfBirth} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>MaritalStatus:</label>
                    <input type="text" name="MaritalStatus" value={advertisementFamily.MaritalStatus} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>CountryCode:</label>
                    <input type="number" name="CountryCode" value={advertisementFamily.CountryCode} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>MobileNo:</label>
                    <input type="number" name="MobileNo" value={advertisementFamily.MobileNo} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>Gotra:</label>
                    <input type="text" name="Gotra" value={advertisementFamily.Gotra} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>NativePlace:</label>
                    <input type="text" name="NativePlace" value={advertisementFamily.NativePlace} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="Email" value={advertisementFamily.Email} onChange={handleChangefm} />
                  </div>
                  {/*<div className="form-group">
                    <label>Address1:</label>
                    <input type="text" name="Address1" value={advertisementFamily.Address1} onChange={handleChangefm} />
                  </div>
                   <div className="form-group">
                    <label>Address2:</label>
                    <input type="text" name="Address2" value={advertisementFamily.Address2} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>City:</label>
                    <input type="text" name="City" value={advertisementFamily.City} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>State:</label>
                    <input type="text" name="State" value={advertisementFamily.State} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>Country:</label>
                    <input type="text" name="Country" value={advertisementFamily.Country} onChange={handleChangefm} />
                  </div>
                  <div className="form-group">
                    <label>Pincode:</label>
                    <input type="number" name="Pincode" value={advertisementFamily.Pincode} onChange={handleChangefm} />
                  </div> */}
                  <div className="form-group">
                    <label>Photo:</label>
                    <input type="file" name="Photo" onChange={handleImageChangefm} />
                  </div>
                 
                  <button type="submit" className="btnsm">Submit</button>
                </form>
                <button onClick={togglePopupfm}>Close</button>
              </div>
            </div>
          )}

{showPopupo && (
  <div className="popup">
    <div className="popup-inner">
      <button className="close-btn" onClick={() => setShowPopupo(false)}>Close</button>
      <h2>Occupation</h2>
      {popupVisibleocc && (
                <div className="popup">
                    <div className="popup-inner">
                        <h2>Add Occupation</h2>
                        {/* <select name="Qualification" onChange={handleChangeed}>
                            <option value="">Select Qualification</option>
                            {qualificationOptionsed.map((qualification, index) => (
                                <option key={index} value={qualification}>{qualification}</option>
                            ))}
                        </select> */}
                        <input type="text" name="Designation" placeholder="Designation" onChange={handleChangeocc} />
                        <input type="text" name="NameOfCompany" placeholder="NameOfCompany" onChange={handleChangeocc} />
                        <input type="text" name="Industry" placeholder="Industry" onChange={handleChangeocc} />
                        <input type="text" name="Category" placeholder="Category" onChange={handleChangeocc} />
                        <input type="date" name="StartDate" placeholder="StartDate" onChange={handleChangeocc} />
                        <input type="date" name="EndDate" placeholder="EndDate" onChange={handleChangeocc} />
                        <input type="text" name="Address1" placeholder="Address1" onChange={handleChangeocc} />
                        <input type="text" name="Address2" placeholder="Address2" onChange={handleChangeocc} />
                        <input type="text" name="City" placeholder="City" onChange={handleChangeocc} />
                        <input type="text" name="State" placeholder="State" onChange={handleChangeocc} />
                        <input type="text" name="Country" placeholder="Country" onChange={handleChangeocc} />
                        <input type="number" name="PinCode" placeholder="PinCode" onChange={handleChangeocc} />
                        <button onClick={handleSubmitedocc}>Add</button>
                        <button onClick={() => setPopupVisibleocc(false)}>Cancel</button>
                    </div>
                </div>
            )}   
                    <button className="btnaddedu" onClick={() => setPopupVisibleocc(true)}>Add Occupation</button>
      {educationDetailso && educationDetailso.map((education, index) => (
        <div key={index}>
          <h1 style={{ color: 'blue', fontSize: '24px', borderBottom: '2px solid blue', paddingBottom: '10px' }}></h1>
       <table>
        
                                        <tr>
                                          <td className='fontweight'> Designation: </td>
                                          <td>{education.Designation}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> NameOfCompany: </td>
                                          <td>{education.NameOfCompany}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Industry: </td>
                                          <td>{education.Industry}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Category: </td>
                                          <td> {education.Category}</td>
                                        </tr>
                                        <tr>
                                        <td className='fontweight'> StartDate: </td>
                                       <td>{new Date(education.StartDate).toLocaleDateString()}</td>
                                                    </tr>
                                        <tr>
                                        <td className='fontweight'> EndDate: </td>
                                       <td>{new Date(education.EndDate).toLocaleDateString()}</td>
                                                    </tr>
                                        <tr>
                                          <td className='fontweight'> Address1: </td>
                                          <td>{education.Address1} {education.City} {education.State} {education.Country} {education.Pincode}</td>
                                        </tr>
                                        <tr>
                                          <td className='fontweight'> Address2: </td>
                                          <td>{education.Address2}</td>
                                        </tr>
                                        <button type="submit" onClick={() => handleEditClickOc(education)} >Edit</button>
                                      </table>
                                      {popupVisibleOc && selectedOc && (
                                    <PopupOc
                                      education={selectedOc}
                                      onClose={() => setPopupVisibleOc(false)} />
                                  )}
        </div>
      ))}
    </div>
  </div>
)}

</>

  );
};
function Popupd({ education, onClose }) {
  // State to hold the edited education data
  const [editedEducation, setEditedEducation] = useState({
    // Qualification: education.Data[0].Qualification,
    // PassingYear: education.Data[0].PassingYear,
    // Schooling: education.Data[0].Schooling,
    // Organisation: education.Data[0].Organisation,
    // GPA: education.Data[0].GPA
    FirstName: education.Data[0].FirstName,
    MiddleName: education.Data[0].MiddleName,
    LastName:  education.Data[0].LastName, 
    Relationship:  education.Data[0].Relationship,
    DateOfBirth:  education.Data[0].DateOfBirth,
    BloodGroup:  education.Data[0].BloodGroup,
    MaritalStatus:  education.Data[0].MaritalStatus,
    CountryCode:  education.Data[0].CountryCode,
    MobileNo:  education.Data[0].MobileNo,
    Gotra:  education.Data[0].Gotra,
    NativePlace:  education.Data[0].NativePlace,
    Email:  education.Data[0].Email,
    Photo:  education.Data[0].Photo,
    Address1:  education.Data[0].Address1,
    Address2:  education.Data[0].Address2,
    City:  education.Data[0].City,
    State:  education.Data[0].State,
    Country:  education.Data[0].Country,
    Pincode:  education.Data[0].Pincode,
    IsActive: education.Data[0].IsActive
  });

  // Function to handle changes in input fields
  const handleInputChanged = (e) => {
    const { name, value } = e.target;
    setEditedEducation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleIsActiveChanged = (e) => {
    const { value } = e.target;
    setEditedEducation(prevState => ({
      ...prevState,
      IsActive: value
    }));
  };
 // Handle file input change
 const handleImageChangefm = (e) => {
  const file = e.target.files[0];
  readImageAsBase64(file);
};

// Convert image to Base64 string
const readImageAsBase64 = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    setEditedEducation({ ...editedEducation, Photo: reader.result });
  };
  reader.readAsDataURL(file);
};
  // Function to handle update button click
  const handleUpdated = async () => {
    try {
      const response = await fetch(`http://localhost:51294/api/UpdateFamilyMember`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: education.Data[0].Id, ...editedEducation,  IsActive: parseInt(editedEducation.IsActive) }) // Assuming education.id exists
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onClose(); // Close the popup after successful update
    } catch (error) {
      console.error('Error updating education data:', error);
    }
  };

  return (
    <div className="popup">
      <div>
  <label htmlFor="isActive">IsActive:</label>
  <select 
    id="isActive" 
    name="IsActive" 
    value={editedEducation.IsActive} 
    onChange={handleIsActiveChanged} 
  >
    <option value="1">Yes</option>
    <option value="0">No</option>
  </select>
</div>
      <div className="popup-inner">
        <h2>Edit Member</h2>
        <div>
          <label htmlFor="FirstName">FirstName:</label>
          <input 
            type="text" 
            id="FirstName" 
            name="FirstName" 
            value={editedEducation.FirstName} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="MiddleName">MiddleName:</label>
          <input 
            type="text" 
            id="MiddleName" 
            name="MiddleName" 
            value={editedEducation.MiddleName} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="LastName">LastName:</label>
          <input 
            type="text" 
            id="LastName" 
            name="LastName" 
            value={editedEducation.LastName} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="Relationship">Relationship:</label>
          <input 
            type="text" 
            id="Relationship" 
            name="Relationship" 
            value={editedEducation.Relationship} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="DateOfBirth">DateOfBirth:</label>
          <input 
            type="date" 
            id="DateOfBirth" 
            name="DateOfBirth" 
            value={editedEducation.DateOfBirth} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="BloodGroup">BloodGroup:</label>
          <input 
            type="text" 
            id="BloodGroup" 
            name="BloodGroup" 
            value={editedEducation.BloodGroup} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="MaritalStatus">MaritalStatus:</label>
          <input 
            type="text" 
            id="MaritalStatus" 
            name="MaritalStatus" 
            value={editedEducation.MaritalStatus} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="CountryCode">CountryCode:</label>
          <input 
            type="number" 
            id="CountryCode" 
            name="CountryCode" 
            value={editedEducation.CountryCode} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="MobileNo">MobileNo:</label>
          <input 
            type="number" 
            id="MobileNo" 
            name="MobileNo" 
            value={editedEducation.MobileNo} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="Gotra">Gotra:</label>
          <input 
            type="text" 
            id="Gotra" 
            name="Gotra" 
            value={editedEducation.Gotra} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="NativePlace">NativePlace:</label>
          <input 
            type="text" 
            id="NativePlace" 
            name="NativePlace" 
            value={editedEducation.NativePlace} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="Email">Email:</label>
          <input 
            type="email" 
            id="Email" 
            name="Email" 
            value={editedEducation.Email} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="Photo">Photo:</label>
          <input 
            type="file" 
            
            name="Photo" 
            
            onChange={handleImageChangefm} 
          />
        </div>
        <div>
          <label htmlFor="Address1">Address1:</label>
          <input 
            type="text" 
            id="Address1" 
            name="Address1" 
            value={editedEducation.Address1} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="Address2">Address2:</label>
          <input 
            type="text" 
            id="Address2" 
            name="Address2" 
            value={editedEducation.Address2} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="City">City:</label>
          <input 
            type="text" 
            id="City" 
            name="City" 
            value={editedEducation.City} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="State">State:</label>
          <input 
            type="text" 
            id="State" 
            name="State" 
            value={editedEducation.State} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="Country">Country:</label>
          <input 
            type="text" 
            id="Country" 
            name="Country" 
            value={editedEducation.Country} 
            onChange={handleInputChanged} 
          />
        </div>
        <div>
          <label htmlFor="Country">Pincode:</label>
          <input 
            type="number" 
            id="Pincode" 
            name="Pincode" 
            value={editedEducation.Pincode} 
            onChange={handleInputChanged} 
          />
        </div>
        <button onClick={handleUpdated}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

function Popupedu({ education, onClose }) {
  // State to hold the edited education data
  const [editedEducation, setEditedEducation] = useState({
    Qualification: education.Data[0].Qualification,
    PassingYear: education.Data[0].PassingYear,
    Schooling: education.Data[0].Schooling,
    Organisation: education.Data[0].Organisation,
    GPA: education.Data[0].GPA
  });

  // Function to handle changes in input fields
  const handleInputChangeducation = (e) => {
    const { name, value } = e.target;
    setEditedEducation(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle update button click
  const handleUpdateducation = async () => {
    try {
      const response = await fetch(`http://localhost:51294/api/UpdateEducation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: education.Data[0].Id, ...editedEducation }) // Assuming education.id exists
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      onClose(); // Close the popup after successful update
    } catch (error) {
      console.error('Error updating education data:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Education</h2>
        <div>
          <label htmlFor="qualification">Qualification:</label>
          <input 
            type="text" 
            id="qualification" 
            name="Qualification" 
            value={editedEducation.Qualification} 
            onChange={handleInputChangeducation} 
          />
        </div>
        <div>
          <label htmlFor="passingYear">Passing Year:</label>
          <input 
            type="text" 
            id="passingYear" 
            name="PassingYear" 
            value={editedEducation.PassingYear} 
            onChange={handleInputChangeducation} 
          />
        </div>
        <div>
          <label htmlFor="schooling">Schooling:</label>
          <input 
            type="text" 
            id="schooling" 
            name="Schooling" 
            value={editedEducation.Schooling} 
            onChange={handleInputChangeducation} 
          />
        </div>
        <div>
          <label htmlFor="organisation">Organisation:</label>
          <input 
            type="text" 
            id="organisation" 
            name="Organisation" 
            value={editedEducation.Organisation} 
            onChange={handleInputChangeducation} 
          />
        </div>
        <div>
          <label htmlFor="gpa">GPA:</label>
          <input 
            type="text" 
            id="gpa" 
            name="GPA" 
            value={editedEducation.GPA} 
            onChange={handleInputChangeducation} 
          />
        </div>
        <button onClick={handleUpdateducation}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
function PopupOc({ education, onClose }) {
  // State to hold the edited education data
  const [editedOc, setEditedOc] = useState({
    Designation: education.Data[0].Designation,
    NameOfCompany: education.Data[0].NameOfCompany,
    Industry: education.Data[0].Industry,
    Category: education.Data[0].Category,
    StartDate: education.Data[0].StartDate,
    EndDate: education.Data[0].EndDate,
    Address1: education.Data[0].Address1,
    Address2: education.Data[0].Address2,
    City: education.Data[0].City,
    State: education.Data[0].State,
    Country: education.Data[0].Country,
    Pincode: education.Data[0].Pincode
  });

  // Function to handle changes in input fields
  const handleInputChangeOc = (e) => {
    const { name, value } = e.target;
    setEditedOc(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to handle update button click
  const handleUpdateOc = async () => {
    try {
      const response = await fetch('http://localhost:51294/api/UpdateOccupation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Id: education.Data[0].Id, ...editedOc }) // Assuming education.id exists
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else {
        onClose();
        window.location.reload();
      }

    } catch (error) {
      console.error('Error updating education data:', error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Education</h2>
        <div>
          <label htmlFor="qualification">Designation:</label>
          <input
            type="text"
            id="qualification"
            name="Designation"
            value={editedOc.Designation}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="passingYear">NameOfCompany:</label>
          <input
            type="text"
            id="passingYear"
            name="NameOfCompany"
            value={editedOc.NameOfCompany}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="schooling">Industry:</label>
          <input
            type="text"
            id="schooling"
            name="Industry"
            value={editedOc.Industry}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="organisation">Category:</label>
          <input
            type="text"
            id="organisation"
            name="Category"
            value={editedOc.Category}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">StartDate:</label>
          <input
            type="date"
            id="gpa"
            name="StartDate"
            value={editedOc.StartDate}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">EndDate:</label>
          <input
            type="date"
            id="gpa"
            name="EndDate"
            value={editedOc.EndDate}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">Address1:</label>
          <input
            type="text"
            id="gpa"
            name="Address1"
            value={editedOc.Address1}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">Address2:</label>
          <input
            type="text"
            id="gpa"
            name="Address2"
            value={editedOc.Address2}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">City:</label>
          <input
            type="text"
            id="gpa"
            name="City"
            value={editedOc.City}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">State:</label>
          <input
            type="text"
            id="gpa"
            name="State"
            value={editedOc.State}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">Country:</label>
          <input
            type="text"
            id="gpa"
            name="Country"
            value={editedOc.Country}
            onChange={handleInputChangeOc}
          />
        </div>
        <div>
          <label htmlFor="gpa">Pincode:</label>
          <input
            type="number"
            id="gpa"
            name="Pincode"
            value={editedOc.Pincode}
            onChange={handleInputChangeOc}
          />
        </div>
        <button onClick={handleUpdateOc}>Update</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
export default Familymembers;
