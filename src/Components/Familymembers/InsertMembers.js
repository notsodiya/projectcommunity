import './Insertmembers.css';
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const InsEducation = ({ onClose }) => {
    const [formData, setFormData] = useState({
      FamilyId: localStorage.getItem('FamilyId'),
      firstName: '',
      middleName: '',
      lastName: '',
      relationship: '',
      dateOfBirth: '',
      bloodGroup: '',
      maritalStatus: '',
      countryCode: '',
      mobileNo: '',
      gotra: '',
      nativePlace: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state:'',
      country: '',
      pincode: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost:51294/api/InsFamilyMember', formData);
            alert('Family member added successfully!');
            onClose(); // Close the popup
        } catch (error) {
            alert('Error occurred while adding family member');
            console.error(error);
        }
    };

    return (
        <div>
             <Navbar/>
<div  className='insertmembers'>
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="200px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold"></span><span class="text-black-50"></span><span> </span></div>
        </div>
        <div class="col-md-8 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Add Member</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-4"><label class="labels">First Name</label><input type="text" class="form-control" placeholder="first name" name="firstName" value={formData.firstName} onChange={handleChange}/></div>
                    <div class="col-md-4"><label class="labels"> Middle Name</label><input type="text" class="form-control" placeholder="first name" name="middleName" value={formData.middleName} onChange={handleChange}/></div>
                    <div class="col-md-4"><label class="labels">Last Name</label><input type="text" class="form-control" placeholder="surname"  name="lastName" value={formData.lastName} onChange={handleChange}/></div>
                </div>

               
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Phone Number</label><input type="Number" class="form-control" placeholder="Phone Number" name="mobileNo" value={formData.mobileNo} onChange={handleChange}/></div>
                    <div class="col-md-6"><label class="labels">Email Id</label><input type="email" class="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange}/></div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Date Of Birth</label><input type="Date" class="form-control" placeholder="date of birth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}/></div>
                    <div class="col-md-6"><label class="labels">Relationship</label><input type="text" class="form-control" placeholder="relationship" name="relationship" value={formData.relationship} onChange={handleChange}/></div>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Blood Group</label><input type="text" class="form-control" placeholder="bloodgroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}/></div>
                    <div class="col-md-6"><label class="labels">Maritial Status</label><input type="text" class="form-control" placeholder="Email" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}/></div>
                </div>


                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Gotra</label><input type="text" class="form-control" placeholder="Phone Number" name="gotra" value={formData.gotra} onChange={handleChange}/></div>
                    <div class="col-md-6"><label class="labels">Native Place</label><input type="text" class="form-control" placeholder="Email" name="nativePlace" value={formData.nativePlace} onChange={handleChange}/></div>
                </div>
                
          
                {/* <div class="row mt-3">
                 
                    <div class="col-md-12"><label class="labels">Address  1</label><input type="text" class="form-control" placeholder="enter address  1" name="address1" value={formData.address1} onChange={handleChange}/></div>
                    <div class="col-md-12"><label class="labels">Address Line 2</label><input type="text" class="form-control" placeholder="enter address  2" name="address2" value={formData.address2} onChange={handleChange}/></div>
                    <div class="col-md-6"><label class="labels">PinCode</label><input type="number" class="form-control" placeholder="pincode" name="pincode" value={formData.pincode} onChange={handleChange}/></div>
                    <div class="col-md-6"><label class="labels">City</label><input type="text" class="form-control" placeholder="city"  name="city" value={formData.city} onChange={handleChange}/></div>           
                </div>
                <div class="row mt-3">
                <div class="col-md-6"><label class="labels">State</label><input type="text" class="form-control" placeholder="state"  name="state" value={formData.state} onChange={handleChange}/></div>
                    <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" name="country" value={formData.country} onChange={handleChange}/></div>
                </div> */}
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="submit" onClick={handleSubmit}>Add Member</button></div>
            </div>
        </div>
    </div>
</div>
</div>


    );
};

export default InsEducation ;





