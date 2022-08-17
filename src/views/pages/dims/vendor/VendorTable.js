import React, { useEffect, useState } from 'react';
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CBadge, CButton, CCollapse } from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllVendors } from 'src/store/features/vendorSlice';


const VendorTable = () => {

  const dispatch = useDispatch();
  
  const vendors = useSelector(selectAllVendors);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vendor?")) {
      dispatch(deleteVendor(id));
    }
  };

  const [details, setDetails] = useState([])
  const columns = [
    { key: 'vendor_id', _style: { width: '15%' }},
    { key: 'vendor_name', _style: { width: '35%' }},
    { key: 'date_updated', sorter: false, _style: { width: '25%' }},
    { key: 'status', _style: { width: '20%' }},
    { key: 'show_details', label: 'Action',  _style: { width: '1%' } },
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
            <strong>Vendor</strong> <small>All Records</small>
          </CCardHeader>
          <CCardBody>
            <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            footer
            items={vendors}
            itemsPerPageSelect
            itemsPerPage={20}
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
                        toggleDetails(item.vendor_id)
                      }}
                    >
                      {details.includes(item.vendor_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.vendor_id)}>
                    <CCardBody>
                      <h5>Contact Person: {item.contact_person_first_name} {item.contact_person_last_name}</h5>
                      <p className="text-muted">Date Updated: {item.date_updated}</p>
                      <CButton size="sm" color="info" href={`/vendor/${item.vendor_id}`}>
                        View / Update
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1" href={`/vendor/delete/${item.vendor_id}`} onClick={() => handleDelete(item.vendor_id)}>
                        Delete
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'vendor_name', state: 'asc' }}
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

export default VendorTable