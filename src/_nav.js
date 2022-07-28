import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilCalendar,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilEnvelopeOpen,
  cilGrid,
  cilLayers,
  cilMap,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilPlus,
  cilPeople,
  cilTags
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react-pro'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info-gradient',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'Company',
    icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
    to: '/dashboard',
    items: [
      {
        component: CNavItem,
        name: 'All Companies',
        to: '/companies',
      },
      {
        component: CNavItem,
        name: 'Add New Company',
        to: '/company/add',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Customer',
    to: '/apps/invoicing',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Customers',
        to: '/customers',
      },
      {
        component: CNavItem,
        name: 'Add New Customer',
        to: '/customer/add',
      },
      {
        component: CNavItem,
        name: 'Purchase Order',
        to: '/dims/purchase-order',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Vendor',
    to: '/apps/invoicing',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Vendors',
        to: '/vendors',
      },
      {
        component: CNavItem,
        name: 'Add New Vendor',
        to: '/vendor/add',
      },
      {
        component: CNavItem,
        name: 'Invoice',
        to: '/apps/invoicing/invoice',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Products',
    to: '/apps/invoicing',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Products',
        to: '/products',
      },
      {
        component: CNavItem,
        name: 'Add New Product',
        to: '/product/add',
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Users',
    to: '/apps/invoicing',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Users',
        to: '/users',
      },
      {
        component: CNavItem,
        name: 'Add New User',
        to: '/user/add',
      },
    ]
  },
  {
    component: CNavTitle,
    name: 'Transactions',
  },
  {
    component: CNavItem,
    name: 'Purchase Order',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    to: '/dims/purchase-order',
  },
  {
    component: CNavItem,
    name: 'Invoice',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    to: '/forms/fas-dims/invoice',
  },
  {
    component: CNavGroup,
    name: 'Account',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
