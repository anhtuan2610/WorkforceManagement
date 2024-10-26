import { Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import VerifyEmail from "./pages/Authentication/VerifyEmail";
import AdminLayout from "./layouts/Admin/AdminLayout";
import CustomerLayout from "./layouts/Customer/CustomerLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccessDenied from "./pages/Authentication/AccessDenied";
import UserManagement from "./pages/Admin/UserManagement";
import CustomerTicket from "./pages/Customer/CustomerTicket";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RequestStatus from "./pages/Customer/RequestStatus";
import SOCManagerLayout from "./layouts/SOCManager/SOCManagerLayout";
import TicketManagement from "./pages/SOCManager/TicketManagement";
import PendingTicket from "./pages/SOCManager/PendingTicket";
import ApproveTicket from "./pages/SOCManager/ApproveTicket";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<VerifyEmail />} />
      <Route path="/access-denied" element={<AccessDenied />} />

      <Route element={<ProtectedRoute allowedRoles={["ADMIN", "CUSTOMER", "SOCMANAGER"]} />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="user-management" element={<UserManagement />} />
        </Route>
      </Route>

      
      <Route element={<ProtectedRoute allowedRoles={["SOCMANAGER"]} />}>
        <Route path="/socmanager" element={<SOCManagerLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="ticket-management" element={<TicketManagement />} />
          <Route path="pending-ticket" element={<PendingTicket />} />
          <Route path="approve-ticket" element={<ApproveTicket />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["CUSTOMER"]} />}>
        <Route path="/customer" element={<CustomerLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="ticket" element={<CustomerTicket />} />
          <Route path="request-status" element={<RequestStatus />} />
        </Route>
      </Route>
    </Routes>
  );
}
