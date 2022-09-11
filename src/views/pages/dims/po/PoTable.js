import React, { useState, useEffect } from 'react'
import { CSmartTable, CCard, CCardBody, CCardHeader, CCol, CRow, CBadge, CButton, CCollapse, CPopover } from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectPos, getPo, updatePo, deletePo } from './../../../../store/reducers/poSlice';
import { selectPoDetail, deletePoDetail, getPoDetail } from './../../../../store/reducers/poDetailSlice';
import { selectVendors } from './../../../../store/reducers/vendorSlice';

const PoTable = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data:vendors } = useSelector(selectVendors);
  const { data:poHeader, status } = useSelector(selectPos);
  const { data:poDetail } = useSelector(selectPoDetail);
  

  const data = poHeader.map(resMap=> {
    const { vendor_id:v_id_map, ...rest } = resMap;
    const data = vendors ? vendors.find(res=>res.vendor_id === v_id_map) : [].find(res=>res.vendor_id === v_id_map)
   
    const cus = {
      vendor_id:data?.vendor_id || '',
      vendor_name:data?.vendor_name || '',
      ...rest 
    }
    return cus
  })

  const [details, setDetails] = useState([])
  const [deletingPO, setDeletingPO] = useState(false)
  const [popper, setPopper] = useState(false)

  useEffect(()=>{
    dispatch(getPo({}))
  },[dispatch, poDetail])

  const columns = [
    { label: 'Header ID', key: 'po_header_id', _style: { width: '12%' }},
    { key: 'po_number', sorter: false },
    { key: 'vendor_name', sorter: false },
    { key: 'po_date', _style: { width: '20%' }},
    { key: 'show_details', label: 'Action', sorter: false, _style: { width: '15%' }},
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      //Just change status to deleted
      dispatch((updatePo({ po_header_id: id, status: 'deleted'})));
      window.location.reload(true);
    }
  };

  const renderDeletePopperOver = (id) => {
    return (
      <CRow>
        <CCol style={{width:'300px'}}>
            <CRow xs={{ gutterY: 2 }}>
              <CCol md={12}  style={{marginBottom:'10px'}}>
                {deletingPO ? 'Deleting PO...' : 
                  poDetail.length === 0 ? (
                    <>
                    <CRow >
                      <CCol md={24} style={{padding:'0 10px 0 10px'}}>Are you sure you do you want to delete this PO Header record?</CCol>
                    </CRow>
                    </>
                  )
                  : (
                  <>
                  <CRow >
                    <CCol md={24} style={{padding:'0 10px 0 10px'}}>Deleting <b style={{color:'red'}}>PO number {id},</b> will also delete the PO Details assigned, are</CCol>
               
                    <CCol md={24} style={{padding:'0 10px 0 10px'}}>you sure do you want to proceed this operation?</CCol>
                  </CRow>
                  </>
                )}
              </CCol>
            </CRow>
            <CRow xs={{ gutterY: 2 }}>
              <CCol md={12}>
                {!deletingPO && (
                <div style={{float:'right'}}>
                  <CButton  onClick={() => handleSubmitPopper(id)}  size="sm" color="danger" style={{marginLeft:'5px'}} >
                    Yes
                  </CButton>
                  <CButton onClick={() => handleClosePopper()}  size="sm" color="info" style={{marginLeft:'5px'}}>
                      No
                  </CButton>
                </div>
                )}
              </CCol>
            </CRow>
        </CCol>
      </CRow>
    )
  }

  const handleSubmitPopper = (id) => {
    const payload = {
      id,
    }
    dispatch(deletePo(payload)).then(()=>{
        if(poDetail.length > 0){
          poDetail.map(({ po_detail_id })=>{
              const params = {
                id:po_detail_id,
              }
              dispatch(deletePoDetail(params))
          })
        }
        dispatch(getPo({}))
        setPopper(0)
    })

  }

  const handleClosePopper = () => {
    setPopper(0)
  }

  const handleOpenTriggerPopper = (id) => {
    handleClickDeletePOHeader(id)
    setPopper(id)
  }
  
  const handleClickDeletePOHeader = (id) => {
    const params = {
      po_header_id: id
    }
    dispatch(getPoDetail(params))
    console.log('test');
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Products</strong> <small>All Records</small>
          </CCardHeader>
          <CCol md={12} className="p-1">
              <CButton size="sm" style={{marginRight:'5px',float:'right',marginTop:'-40px'}} 
               color="success" onClick={() => navigate(`/po/add`)}>
                Add PO
              </CButton>
          </CCol>
          <CCardBody>
            <CSmartTable
            activePage={1}
            cleaner
            clickableRows
            columns={columns}
            columnFilter
            columnSorter
            footer
            items={data}
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
                    <div style={{marginTop:'5px'}}>
                        <CButton size="sm" color="primary" style={{marginLeft:'5px'}} onClick={() => navigate(`/po/${item.po_header_id}`)}>
                          Update
                        </CButton>
                        <CPopover
                          visible={item.po_header_id === popper}
                          content={renderDeletePopperOver(item.po_header_id)}
                          onShow={() => handleOpenTriggerPopper(item.po_header_id)}
                          placement="top"
                          offset={[-70,8]}
                        >
                          <CButton size="sm" color="danger" style={{marginLeft:'5px'}}>
                              Delete
                          </CButton>
                        </CPopover>
                    </div>
                  </td>
                )
              },
            }}
            selectable
            sorterValue={{ column: 'po_header_id', state: 'desc' }}
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

export default PoTable