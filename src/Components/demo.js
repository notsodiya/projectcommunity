// import React, { useState, useEffect } from 'react';

// function Familymembers() {
//   const [members, setMembers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [popupVisibled, setPopupVisibled] = useState(false);
//   const [selectedEducation, setSelectedEducation] = useState(null);

//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await fetch('http://localhost:51294/api/GetByFamilyId', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ FamilyId: localStorage.getItem('FamilyId'), page: currentPage })
//         });

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setMembers(data.Data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchMembers();
//   }, [currentPage]);

//   const handleEditClickd = (member) => {
//     // Handle edit click action
//   };

//   const togglePopupfm = () => {
//     // Toggle popup visibility
//   };

//   return (
//     <div className='body'>
//       <div className="courses-container">
//         <button className="familymem" onClick={togglePopupfm}>Add Member</button>
//         {members.map((member) => (
//           <div className="course" key={member.Id}>
//             <div className="course-preview">
//               <h6>Member Details</h6>
//               <img className="adscard__thumb" src={member.Photo} alt="" />
//               <h2>{`${member.FirstName} ${member.MiddleName} ${member.LastName}`}</h2>
//               <button className="education-button" onClick={() => fetchEducationDetails(member.Id)}>Education</button>
//               <button className="education-button" onClick={() => fetchOccupationDetails(member.Id)}>Occupation</button>
//             </div>
//             <div className="course-info">
//               <table>
//                 <tbody>
//                   <tr>
//                     <td className='fontweight'> Name: </td>
//                     <td>{member.FirstName} {member.MiddleName} {member.LastName}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Date of Birth: </td>
//                     <td>{new Date(member.DateOfBirth).toLocaleDateString()}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Blood Group: </td>
//                     <td>{member.BloodGroup}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Marital Status: </td>
//                     <td>{member.MaritalStatus === 0 ? 'Single' : 'Married'}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Contact Number: </td>
//                     <td>{member.CountryCode} {member.MobileNo}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Email Id: </td>
//                     <td>{member.Email}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Gotra: </td>
//                     <td>{member.Gotra}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Native Place: </td>
//                     <td>{member.NativePlace}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Address 1: </td>
//                     <td>{member.Address1} {member.City} {member.State} {member.Country} {member.Pincode}</td>
//                   </tr>
//                   <tr>
//                     <td className='fontweight'> Address 2: </td>
//                     <td>{member.Address2}</td>
//                   </tr>
//                 </tbody>
//               </table>
//               <button onClick={() => handleEditClickd(member)}>Edit</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       {popupVisibled && selectedEducation && (
//         <Popupd
//           education={selectedEducation}
//           onClose={() => setPopupVisibled(false)}
//         />
//       )}
//       <div className="pagination">
//         <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//         <span>{currentPage}</span>
//         <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
//       </div>
//     </div>
//   );
// }

// export default Familymembers;
