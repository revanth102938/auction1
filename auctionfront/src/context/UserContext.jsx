// // src/context/UserContext.jsx
// import { createContext, useEffect, useState } from "react";
// import AxiosInstance from "../utils/ApiConfig.js";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const fetchUser = async () => {
//     try {
//       const res = await AxiosInstance.get("/users/me");
//       setUser(res.data.data);
//       console.log("user details:",user)
//     } catch (err) {
//       setUser(null);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, setUser, fetchUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserContext;
import { createContext, useEffect, useState } from "react";
import AxiosInstance from "../utils/ApiConfig.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true); // Added loading flag

  const fetchUser = async () => {
    try {
      const res = await AxiosInstance.get("/users/me");
      setUser(res.data.data);
      console.log("user details:", res.data.data);
    } catch (err) {
      setUser(null);
    } finally {
      setUserLoading(false); // Done loading
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
