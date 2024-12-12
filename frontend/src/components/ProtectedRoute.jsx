import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  return children;
};
export default ProtectedRoute