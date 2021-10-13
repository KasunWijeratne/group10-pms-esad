export const authRoles = {
    sa: ['SA'], // Only Super Admin has access
    admin: ['SA', 'ADMIN'], // Only SA & Admin has access
    staff: ['SA', 'ADMIN', 'STAFF'], // Only SA & Admin & Editor has access
}

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <===============
//   }
// ];

// Check navigaitons.js

// {
//   name: "Dashboard",
//   path: "/dashboard/analytics",
//   icon: "dashboard",
//   auth: authRoles.admin <=================
// }
