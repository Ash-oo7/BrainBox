import { useContext, useState, useEffect, createContext } from "react";
import { account } from "../appwrite/appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import Spinner from "../icons/Spinner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    checkUserStatus();
  }, []);

  const loginUser = async (userInfo) => {
    setLoading(true);
    try {
      let response = await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
      setUserId(accountDetails.$id);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    account.deleteSessions();
    setUser(null);
  };

  const registerUser = async (userInfo) => {
    setLoading(true);

    try {
      let response = await account.create(
        ID.unique(),
        userInfo.email,
        userInfo.password,
        userInfo.name
      );

      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      let accountDetails = await account.get();
      setUser(accountDetails);
      setUserId(accountDetails.$id);

      navigate("/");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const checkUserStatus = async () => {
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
      setUserId(accountDetails.$id);
    } catch (error) {}
    setLoading(false);
  };

  const contextData = {
    user,
    userId,
    loginUser,
    logoutUser,
    registerUser,
    setLoading,
    loading,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Spinner size="100" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
