import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';

import './Communitymembers.css'; // Import the CSS file for styling

const CommunityMembers = () => {
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [educationDetails, setEducationDetails] = useState(null);
  const [showPopupo, setShowPopupo] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [educationDetailso, setEducationDetailso] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(2);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch family data from the API
        const response = await fetch('http://localhost:51294/api/GetAllValues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          // Add body data if necessary (e.g., FamilyId)
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

    fetchData();
  }, []);

// Logic for displaying current members
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = familyData.slice(indexOfFirstMember, indexOfLastMember);

// Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = async (member) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedMember(member);
      const response = await fetch('http://localhost:51294/api/GetByFamilyId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ FamilyId: member.FamilyId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFamilyMembers(data.Data);
    } catch (error) {
      setError('Error fetching family members. Please try again.');
      console.error('Error fetching family members:', error);
    } finally {
      setLoading(false);
    }
  };
 
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
      setShowPopupo(true);
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
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching education details:', error);
    }
  };


  return (
    <>
      <div><Navbar /></div>
      <div className='communitybody'>

          {/* <h2>Community Members</h2> */}
          <div className="row" >
              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              {currentMembers.map((member) => (
                <div key={member.FamilyMemberId} >                  
                  <div className="card" key={member.Id}>
                  <div class="profile-header-img">
                            <img src={member.Photo}/>
                          </div>
                          <div>
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
                                          <td className='fontweight'> Native Place:: </td>
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
                                      </div>
                                      
                                      <button  className="showmembers" key={member.FamilyMemberId} onClick={() => handleClick(member)}>Show FamilyMembers</button>
                                      {/* <img className="imgcard"  src={member.Photo} alt="" /> */}
                  </div></div>
              ))}
          </div>
     

      
      
    </div>

      
      {selectedMember && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Family Members of {`${selectedMember.FirstName} ${selectedMember.MiddleName} ${selectedMember.LastName}`}</h2>
            <ul>
              {familyMembers.map((familyMember) => (
                <li key={familyMember.Id}>
                  <h1 style={{ color: 'blue', fontSize: '24px', borderBottom: '2px solid blue', paddingBottom: '10px' }}></h1>
                  <button className="popupbtnedu"  onClick={() => fetchEducationDetails(familyMember.Id)}>Education</button>
                  <button  className="popupbtnocc" onClick={() => fetchOccupationDetails(familyMember.Id)}>Occupation</button>   
                  <table className='Memberstable'> 
                    <tr>
                      <td className='fontweight'> Name: </td>
                      <td>{familyMember.FirstName} {familyMember.MiddleName} {familyMember.LastName}</td>
                    </tr>
                    <tr>
                           <td className='fontweight'> Date of Birth: </td>
                           <td>{new Date(familyMember.DateOfBirth).toLocaleDateString()}</td>
                      </tr>
                    <tr>
                      <td className='fontweight'> Blood Group: </td>
                      <td>{familyMember.BloodGroup}</td>
                    </tr>
                    <tr>
                      <td className='fontweight'> Marital Status: </td>
                      <td>{familyMember.MaritalStatus === 0 ? 'Single' : 'Married'}</td>
                    </tr>
                    <tr>
                      <td className='fontweight'> Contact Number: </td>
                      <td>{familyMember.CountryCode} {familyMember.MobileNo} </td>
                    </tr>
                    <tr>
                      <td className='fontweight'> Email Id: </td>
                      <td>{familyMember.Email}</td>
                    </tr>
                    <tr>
                      <td className='fontweight'> Gotra: </td>
                      <td>{familyMember.Gotra}</td>
                    </tr>
                    <tr>
                      <td className='fontweight'> Native Place:: </td>
                      <td>{familyMember.NativePlace}</td>
                    </tr>
                    <tr>
                      <td className='fontweight'> Address 1: </td>
                      <td>{familyMember.Address1} {familyMember.City} {familyMember.State} {familyMember.Country} {familyMember.Pincode}</td>
                    </tr>
                    <tr>
                      <td className='fontweight'> Address 2: </td>
                      <td>{familyMember.Address2}</td>
                    </tr>
                  </table>
                  {showPopupo && (
  <div className="popup">
    <div className="popup-inner">
      <button className="close-btn" onClick={() => setShowPopupo(false)}>Close</button>
      <h2>Education</h2>
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
                                      </table>
         
        </div>
      ))}
    </div>
  </div>
)}
{showPopup && (
  <div className="popup">
    <div className="popup-inner">
      <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
      <h2>Occupation</h2>
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
                                      </table>
        </div>
      ))}
    </div>
  </div>
)}
                </li>
              ))}
            </ul>
            <button onClick={() => setSelectedMember(null)}>Close</button>
          </div>
        </div>
      )}
           
           <div className='page'>
            <div className="pagination">
        {familyData.length > membersPerPage && (
          <div className="pagination">
            {Array(Math.ceil(familyData.length / membersPerPage))
              .fill()
              .map((_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                  <a onClick={() => paginate(i + 1)} href="#!" className="page-link">
                    {i + 1}
                  </a>
                </li>
              ))}
          </div>
        )}
      </div>
      </div>
    </>
  



);
};

export default CommunityMembers;
