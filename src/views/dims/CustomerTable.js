import React, { useEffect, useState } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CBadge, CButton, CCollapse } from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux'
import { getCustomers } from 'src/store/features/customer/customerSlice';


const CustomerTable = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer.data)
  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  console.log(data);

  const [details, setDetails] = useState([])
  const columns = [
    { key: 'customer_name', _style: { width: '20%' }},
    { key: 'email', sorter: false },
    { key: 'phone_number', sorter: false },
    { key: 'status', _style: { width: '20%' }},
    {
      key: 'show_details',
      label: 'Action',
      _style: { width: '1%' }
    },
  ]

  const getBadge = (status) => {
    switch (status) {
      case 'active':
        return 'success'
      case 'archived':
        return 'secondary'
      case 'pending':
        return 'warning'
      case 'deleted':
        return 'danger'
      default:
        return 'active'
    }
  }

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
 
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Customer</strong> <small>All Records</small>
            
          </CCardHeader>
          <CCardBody>
            <CSmartTable
            activePage={3}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            footer
            items={data}
            itemsPerPageSelect
            itemsPerPage={10}
            pagination
            scopedColumns={{
              status: (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                </td>
              ),
              show_details: (item) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      shape="square"
                      size="sm"
                      onClick={() => {
                        toggleDetails(item.customer_id)
                      }}
                    >
                      {details.includes(item.customer_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.customer_id)}>
                    <CCardBody>
                      <h6>Contact Person: {item.contact_person_first_name} {item.contact_person_last_name}</h6>
                      <p className="text-muted">Last Updated: {item.date_updated}</p>
                      <CButton size="sm" color="info" href={`/customer/${item.customer_id}`}>
                        View / Update
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1" href={`/customer/delete/${item.customer_id}`}>
                        Delete
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'customer_name', state: 'asc' }}
            tableFilter
            tableHeadProps={{
              color: 'danger',
            }}
            tableProps={{
              striped: true,
              hover: true,
            }}
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default CustomerTable