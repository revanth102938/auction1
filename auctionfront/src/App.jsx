import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import AuctionPage from "./pages/AuctionPage.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import Landing from "./pages/Landing.jsx";
import SubmitAuctionRequest from "./pages/SubmitAuctionRequest.jsx";
import AdminManageAuctions from "./pages/AdminManageRequests.jsx";
import AllAuctions from "./pages/AllAuctions.jsx";
import Layout from "./pages/Layout.jsx"; 

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route element={<Layout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/active-auctions" element={<AllAuctions />} />
            <Route path="/auctions/:auctionId" element={<AuctionPage />} />
            <Route path="/submit-request" element={<SubmitAuctionRequest />} />
            <Route path="/admin/auctions" element={<AdminManageAuctions />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
