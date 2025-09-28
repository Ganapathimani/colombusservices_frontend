import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from '#components/ErrorBoundary/ErrorBoundary';
import LogisticsRegistrationForm from '#domain/ColombusLogistics/RegistrationForm/LogisticsRegistrationForm';
import DashboardLayout from '#domain/ColombusLogistics/DashboardLayout/DashboardLayout';
import Support from '#domain/ColombusLogistics/DashboardLayout/Support';
import Profile from '#domain/ColombusLogistics/DashboardLayout/Profile';
import RateRequest from '#domain/ColombusLogistics/DashboardLayout/RateRequest';
import PickupConfirmation from '#domain/ColombusLogistics/DashboardLayout/PickupConfirmation';
import Tracking from '#domain/ColombusLogistics/DashboardLayout/Tracking';
import AdminCreateUserForm from '#domain/ColombusLogistics/Admin/admin/CreateUserForm';
import OrdersTableGrid from '#domain/ColombusLogistics/Admin/admin/OrdersTable';
import LROrdersTable from '#domain/ColombusLogistics/Admin/LorryReceipt/LROrdersTable';
import UpdateRateToOrder from '#domain/ColombusLogistics/Admin/admin/UpdateRateToOrder';
import UpdateVehicleDetails from '#domain/ColombusLogistics/Admin/admin/UpdateVehicleDetails';
import ProtectedRoute from '#components/ProtectedRoute/ProtectedRoute';
import CreateAdminForm from '#domain/ColombusLogistics/Admin/SuperAdmin/CreateAdminForm';
import CreateAssistantForm from '#domain/ColombusLogistics/Admin/SuperAdmin/CreateAssistantForm';
import BranchesTableGrid from '#domain/ColombusLogistics/Admin/SuperAdmin/BranchesTableGrid';
import MarketVehicleTableGrid from '#domain/ColombusLogistics/Admin/admin/Marketvehicle';
import Gallery from '#domain/ColombusLogistics/Gallery/Gallery';
import Layout from './Layout/Layout';
import HomePage from './Layout/HomePage/HomePage';
import AboutPage from './Layout/HomePage/AboutPage';
import TrackingPage from './Layout/HomePage/TrackingPage';
import ContactPage from './Layout/Contact/ContactPage';
import ServicesPage from './Layout/Services/Services';
import Admin from './Layout/Admin/Admin';

const builderRouter = (userRole: string) => createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'tracking', element: <TrackingPage /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'registration', element: <LogisticsRegistrationForm /> },
      { path: 'contact', element: <ContactPage /> },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { path: 'rate-requests', element: <RateRequest /> },
          { path: 'pickup-confirmations', element: <PickupConfirmation /> },
          { path: 'cargo-tracking', element: <Tracking /> },
          { path: 'profile', element: <Profile /> },
          { path: 'support', element: <Support /> },
        ],
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute
            element={<Admin />}
            allowedRoles={['ADMIN', 'ASSISTANT', 'PICKUP', 'LR', 'DELIVERY', 'SUPER_ADMIN']}
            userRole={userRole?.toUpperCase().trim() ?? ''}
          />
        ),
        children: [
          { path: 'create-user', element: <AdminCreateUserForm /> },
          { path: 'create-admin', element: <CreateAdminForm /> },
          { path: 'create-assistant', element: <CreateAssistantForm /> },
          { path: 'branches', element: <BranchesTableGrid /> },
          { path: 'confirmOrder', element: <UpdateRateToOrder /> },
          { path: 'orderPickup', element: <UpdateVehicleDetails /> },
          { path: 'order-entries', element: <OrdersTableGrid /> },
          { path: 'market-vehicles', element: <MarketVehicleTableGrid /> },
          { path: 'lorry-receipts', element: <LROrdersTable /> },
        ],
      },
    ],
  },
]);

export default builderRouter;
