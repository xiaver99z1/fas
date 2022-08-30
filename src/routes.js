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
const AccountList = React.lazy(() => import('./views/pages/dims/account/accountTable'))
const AccountAddForm = React.lazy(() => import('./views/pages/dims/account/accountAdd'))
const AccountUpdateForm = React.lazy(() => import('./views/pages/dims/account/accountUpdate'))
const POList = React.lazy(() => import('./views/pages/dims/po/PoTable'))
const POAddForm = React.lazy(() => import('./views/pages/dims/po/PoAdd'))
const POUpdateForm = React.lazy(() => import('./views/pages/dims/po/PoUpdate'))

const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))



const routes = [
  { path: '/dashboard', exact: true, name: 'Dashboard', element: Dashboard },
  { path: '/customers', name: 'All Customers', element: CustomerList },
  { path: '/customer/add', name: 'Add New Customer', element: CustomerAddForm },
  { path: '/customer/:id', exact: true, name: 'Update Customer', element: CustomerUpdateForm },
  { path: '/vendors', name: 'All Vendors', element: VendorList },
  { path: '/vendor/add', name: 'Add New Vendor', element: VendorAddForm },
  { path: '/vendor/:id', name: 'Update Vendor', element: VendorUpdateForm },
  { path: '/products', name: 'All Products', element: ProductList },
  { path: '/product/add', name: 'Add New Product', element: ProductAddForm },
  { path: '/product/:id', exact: true, name: 'Update Product', element: ProductUpdateForm },
  { path: '/po', name: 'All Purchase Order', element: POList },
  { path: '/po/add', name: 'Add New PO', element: POAddForm },
  { path: '/  po/:id', exact: true, name: 'Update PO', element: POUpdateForm },
  { path: '/companies', name: 'All Companies', element: CompanyList },
  { path: '/company/add', name: 'Add New Company', element: CompanyAddForm },
  { path: '/company/:id', exact: true, name: 'Update Company', element: CompanyUpdateForm },
  { path: '/accounts', name: 'All Accounts', element: AccountList },
  { path: '/account/add', name: 'Add New Account', element: AccountAddForm },
  { path: '/account/:id', exact: true, name: 'Update Account', element: AccountUpdateForm },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
]

export default routes
