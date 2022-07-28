import React, { useEffect, useState } from 'react';
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CBadge, CButton, CCollapse } from '@coreui/react-pro';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanies, selectAllCompanies } from 'src/store/features/company/companySlice';


const CompanyTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.company.data)
  
  const listComp = useSelector(selectAllCompanies)

  console.log({listComp})

  useEffect(() => {
    dispatch(getCompanies())
  },[])

  const [details, setDetails] = useState([])
  const columns = [
    { key: 'company_name', _style: { width: '20%' }},
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
                        toggleDetails(item.company_id)
                      }}
                    >
                      {details.includes(item.company_id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.company_id)}>
                    <CCardBody>
                      <h6>Contact Person: {item.contact_person_first_name} {item.contact_person_last_name}</h6>
                      <p className="text-muted">Last Updated: {item.date_updated}</p>
                      <CButton size="sm" color="info" key={item.company_id} href={`/company/${item.company_id}`}>
                        View / Update
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1" href={`/company/delete/${item.company_id}`}>
                        Delete
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'company_name', state: 'asc' }}
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

export default CompanyTable