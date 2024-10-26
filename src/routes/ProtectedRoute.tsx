import Cookies from "js-cookie";
import { useUserStore } from "../stores/user";
import { getUserApi } from "../services/auth-api";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type TProps = {
  allowedRoles: string[]; // Updated to accept an array of roles
};

const ProtectedRoute = ({ allowedRoles }: TProps) => {
  const navigate = useNavigate(); // Hook for navigation
  const accessToken = Cookies.get("accessToken");
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) {
        navigate("/login");
        return; // Exit early if no access token
      }

      try {
        const response = await getUserApi();
        if (response) {
          const userData = response;
          setUser(userData);

          // Check if the user's role is allowed
          if (!allowedRoles.includes(userData.role)) {
            navigate("/access-denied");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        navigate("/login");
      } finally {
        setIsLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchUser();
  }, [accessToken, allowedRoles, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching user data
  }

  return <Outlet />; // Render the nested routes if user is allowed
};

export default ProtectedRoute;
