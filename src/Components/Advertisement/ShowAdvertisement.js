import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Showadvertisement.css'

function FamilyDataFetcher() {
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const userId = localStorage.getItem('FamilyMemberId');
        const response = await fetch('http://localhost:51294/api/GetAdvertisementById', {
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

    fetchData();
  }, []);

  return (



     // <>
    //   <div><Navbar /></div>
    //   <div>
    //     <h2>Family Data Fetcher</h2>
    //     {loading && <p>Loading...</p>}
    //     {error && <p>{error}</p>}
    //     {familyData && familyData.length > 0 && (
    //       <div>
    //         {familyData.map((member) => (
    //           <div key={member.Id}>
    //             <p>AdvHeader: {member.AdvHeader}</p>
    //             <p>AdvBody: {member.AdvBody}</p>
    //              <img src={member.AdvImage} />

    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </>
    // <><div className="amk">
    //   {loading && <p>Loading...</p>}
    //   {error && <p>{error}</p>}
    //   {familyData && familyData.length > 0 && (
    //     <section class="articles">
    //        {familyData.map((member) => (
    //         <div key={member.Id}>
    //           <article>

    //             <div class="article-wrapper">
    //               <figure className=''>
    //               <img src={member.AdvImage} />
    //               </figure>

    //               <div class="article-body">

    //               <h2>AdvHeader: {member.AdvHeader}</h2>
                  
    //                 <a href="#" class="read-more">
    //                 AdvBody: {member.AdvBody}
    //                 </a>
    //               </div>
    //             </div>
    //           </article> </div>))}

    //     </section>
    //   )}
    // </div></>

   <><div><Navbar /></div > {loading && <p>Loading...</p>}
   {error && <p>{error}</p>}
   {familyData && familyData.length > 0 && (<ul  class="adscards">
   {familyData.map((member) => (
            <div key={member.Id}>
      <li>
      
        <a href="" class="adscard">
         
          <img src={member.AdvImage} class="adscard__image" alt="" />
          <div class="adscard__overlay">
            <div class="adscard__header">
              <svg class="adscard__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
              <img class="adscard__thumb" src={member.AdvImage} alt="" />
              <div class="adscard__header-text">
                <h3 class="adscard__title">AdvHeader: {member.AdvHeader}</h3>
                <h3 class="adscard__title"> AdvBody: {member.AdvBody}</h3>
                <span class="adscard__status">1 hour ago</span>
              </div>
            </div>
           
       
          </div>
        </a>
        
      </li>
      
      </div>))}
      
    </ul>)}</>
    
  );
}

export default FamilyDataFetcher;
