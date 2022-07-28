import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))



const Invoice = React.lazy(() => import('./views/apps/invoicing/Invoice'))

//Forms - FAS
const CustomerList = React.lazy(() => import('./views/dims/CustomerTable'))
const CustomerAddForm = React.lazy(() => import('./store/features/customer/customerAdd'))
const CustomerUpdateForm = React.lazy(() => import('./store/features/customer/customerUpdate'))
const VendorList = React.lazy(() => import('./views/dims/VendorTable'))
const VendorAddForm = React.lazy(() => import('./store/features/vendor/vendorAdd'))
const VendorUpdateForm = React.lazy(() => import('./store/features/vendor/vendorUpdate'))
const ProductList = React.lazy(() => import('./views/dims/ProductTable'))
const ProductAddForm = React.lazy(() => import('./store/features/product/productAdd'))
const ProductUpdateForm = React.lazy(() => import('./store/features/product/productUpdate'))
const CompanyList = React.lazy(() => import('./views/dims/CompanyTable'))
const CompanyListTest = React.lazy(() => import('./store/features/company/companyList'))
const CompanyAddForm = React.lazy(() => import('./store/features/company/companyAdd'))
const CompanyUpdateForm = React.lazy(() => import('./store/features/company/companyUpdate'))
const UserList = React.lazy(() => import('./views/dims/UserTable'))
const UserAddForm = React.lazy(() => import('./store/features/user/userAdd'))
const UserUpdateForm = React.lazy(() => import('./store/features/user/userUpdate'))


//Tables - FAS
const PurchaseOrderList = React.lazy(() => import('./views/dims/PurchaseOrderTable'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/customers', name: 'All Customers', element: CustomerList },
  { path: '/customer/add', name: 'Add New Customer', element: CustomerAddForm },
  { path: '/customer/:customerid', exact: true, name: 'Update Customer', element: CustomerUpdateForm },
  { path: '/vendors', name: 'All Vendors', element: VendorList },
  { path: '/vendor/add', name: 'Add New Vendor', element: VendorAddForm },
  { path: '/vendor/:id', name: 'Update Vendor', element: VendorUpdateForm },
  { path: '/products', name: 'All Products', element: ProductList },
  { path: '/product/add', name: 'Add New Product', element: ProductAddForm },
  { path: '/product/:productid', exact: true, name: 'Update Product', element: ProductUpdateForm },
  { path: '/companies', name: 'All Companies', element: CompanyList },
  { path: '/companies-test', name: 'Company List test', element: CompanyListTest },
  { path: '/company/add', name: 'Add New Company', element: CompanyAddForm },
  { path: '/company/:companyid', exact: true, name: 'Update Company', element: CompanyUpdateForm },
  { path: '/users', name: 'All Users', element: UserList },
  { path: '/user/add', name: 'Add New User', element: UserAddForm },
  { path: '/user/:userid', exact: true, name: 'Update User', element: UserUpdateForm },
  { path: '/dims/purchase-order', name: 'Purchase Order List', element: PurchaseOrderList},
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
]

export default routes
