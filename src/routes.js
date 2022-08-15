import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))



const Invoice = React.lazy(() => import('./views/apps/invoicing/Invoice'))

//Forms - FAS
const CustomerList = React.lazy(() => import('./views/pages/dims/customer/CustomerTable'))
const CustomerAddForm = React.lazy(() => import('./views/pages/dims/customer/CustomerAdd'))
const CustomerUpdateForm = React.lazy(() => import('./views/pages/dims/customer/CustomerUpdate'))
const VendorList = React.lazy(() => import('./views/pages/dims/vendor/VendorTable'))
const VendorAddForm = React.lazy(() => import('./views/pages/dims/vendor/VendorAdd'))
const VendorUpdateForm = React.lazy(() => import('./views/pages/dims/vendor/VendorUpdate'))
const ProductList = React.lazy(() => import('./views/pages/dims/product/ProductTable'))
const ProductAddForm = React.lazy(() => import('./views/pages/dims/product/ProductAdd'))
const ProductUpdateForm = React.lazy(() => import('./views/pages/dims/product/ProductUpdate'))
const CompanyList = React.lazy(() => import('./views/pages/dims/company/CompanyTable'))
const CompanyAddForm = React.lazy(() => import('./views/pages/dims/company/CompanyAdd'))
const CompanyUpdateForm = React.lazy(() => import('./views/pages/dims/company/CompanyUpdate'))
const UserList = React.lazy(() => import('./views/pages/dims/user/UserTable'))
const UserAddForm = React.lazy(() => import('./views/pages/dims/user/UserAdd'))
const UserUpdateForm = React.lazy(() => import('./views/pages/dims/user/UserUpdate'))


//Tables - FAS
const PurchaseOrderList = React.lazy(() => import('./views/pages/dims/purchaseorder/PurchaseOrderTable'))

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
  { path: '/company/add', name: 'Add New Company', element: CompanyAddForm },
  { path: '/company/:companyid', exact: true, name: 'Update Company', element: CompanyUpdateForm },
  { path: '/users', name: 'All Users', element: UserList },
  { path: '/user/add', name: 'Add New User', element: UserAddForm },
  { path: '/user/:userid', exact: true, name: 'Update User', element: UserUpdateForm },
  { path: '/dims/purchase-order', name: 'Purchase Order List', element: PurchaseOrderList},
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
]

export default routes
