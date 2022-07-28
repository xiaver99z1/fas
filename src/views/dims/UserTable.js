import React, { useEffect, useState } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CBadge, CButton, CCollapse } from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from './../../store/features/user/userSlice';


const UserTable = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.data)
  useEffect(() => {
    dispatch(getUsers())
  }, [])

  console.log(data);

  const [details, setDetails] = useState([])
  const columns = [
    { key: 'first_name', _style: { width: '20%' }},
    { key: 'last_name', sorter: false },
    { key: 'email', sorter: false },
    { key: 'status', _style: { width: '20%' }, sorter: true, filter: true },
    { key: 'show_details', label: 'Action', _style: { width: '1%' }, sorter: false, filter: false }
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
            <strong>Users</strong> <small>All Records</small>
            
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
                        toggleDetails(item.id)
                      }}
                    >
                      {details.includes(item.id) ? 'Hide' : 'Show'}
                    </CButton>
                  </td>
                )
              },
              details: (item) => {
                return (
                  <CCollapse visible={details.includes(item.id)}>
                    <CCardBody>
                      <h5>ID: {item.id} </h5>
                      <p className="text-muted">Last Access: {item.last_access}</p>
                      <CButton size="sm" color="info" href={`/user/${item.id}`}>
                        View / Update
                      </CButton>
                      <CButton size="sm" color="danger" className="ml-1" href={`/user/delete/${item.id}`}>
                        Delete
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'first_name', state: 'asc' }}
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

export default UserTable