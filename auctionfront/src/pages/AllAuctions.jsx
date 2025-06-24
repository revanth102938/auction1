// import React, { useEffect, useState } from 'react';
// import AxiosInstance from '../utils/ApiConfig.js'; // update path as needed
// import AuctionCard from '../components/Auctioncard.jsx';

// const ActiveAuctions = () => {
//   const [auctions, setAuctions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchActiveAuctions = async () => {
//     try {
//       const res = await AxiosInstance.get('/auctions/active');
//       console.log("res:",res);
//       console.log("res.d.d",res.data.data);
//       setAuctions(res.data.data || []);
//       console.log("auctions:",auctions)
//     } catch (err) {
//       console.error('Failed to fetch active auctions:', err.response?.data || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchActiveAuctions();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Active Auctions</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : auctions.length === 0 ? (
//         <p>No active auctions found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {auctions.map((auction) => (
//             <AuctionCard key={auction._id} auction={auction} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ActiveAuctions;

import React, { useEffect, useState } from 'react';
import AxiosInstance from '../utils/ApiConfig.js';
import AuctionCard from '../components/AuctionCard.jsx';

const AllAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await AxiosInstance.get('/auctions');
        setAuctions(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch auctions:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Auctions</h1>
      {loading ? (
        <p>Loading...</p>
      ) : auctions.length === 0 ? (
        <p>No auctions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <AuctionCard key={auction._id} auction={auction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAuctions;