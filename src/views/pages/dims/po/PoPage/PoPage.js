import React, { useEffect, useState } from 'react'
import {
  CHeaderText,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CRow,
  CButton,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom';
import { selectUser } from '../../../../../store/reducers/users';
import { selectVendors } from '../../../../../store/reducers/vendorSlice';
import { selectPos, selectPoId, clearPo, getPo, createPo, updatePo } from '../../../../../store/reducers/poSlice';
import { selectPoDetail, getPoDetail, createPoDetail, updatePoDetail, deletePoDetail } from '../../../../../store/reducers/poDetailSlice';
import PoAdd1stRow from './components/PoAdd1stRow'
import PoAdd2ndRow from './components/PoAdd2ndRow'
import PoAdd3rdRow from './components/PoAdd3rdRow'
import PoDetailTable from './components/PoDetailTable'
import moment from 'moment';

function PoAdd(){
  const { id } = useParams();
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(selectUser);
  const { data:vendors } = useSelector(selectVendors);
  const { data:poDetail } = useSelector(selectPoDetail);
  const { status, error } = useSelector(selectPos);

  const poHeader = useSelector((state) => selectPoId(state, Number(id)));

   useEffect(() => {
      dispatch(clearPo())
      dispatch(getPoDetail({po_header_id:id}))
   },[id])



  const [po_number, setPONumber] = useState(poHeader?.po_number);
  const [po_date, setPODate] = useState(poHeader?.po_date);
  const [vendor_id, setVendorId] = useState(poHeader?.vendor_id);
  const [requested_date, setRequestDate] = useState(poHeader?.requested_date);

  const [po_approval, setPOApproval] = useState(null);
  const [approval_flag, setApprovalFlag] = useState(null);
  const [approved_date, setApprovedDate] = useState(poHeader?.approved_date);
  const [dr_status, setDRStatus] = useState(null);

  const [remark, setRemark] = useState(poHeader?.remark);
  const [warehouse_id, setWarehouseId] = useState(poHeader?.warehouse_id);
  const [fulfillment_expiry_date, setFulfillmentExpiryDate] = useState(null);

  const [isValid, setIsValid] = useState(false);
  const [validMes, setValidMes] = useState('');
 
  const handlePODetailAdd = (payload) => {
    dispatch(createPoDetail(payload)).then((res)=>{
      if(res.type === "podetail/createPoDetail/fulfilled"){
        dispatch(getPoDetail())
      }
    })
  }

  const handlePODetailUpdate = (payload) => {
    dispatch(updatePoDetail(payload))
  }

  const handleDeletePODetail = (id) => {
    dispatch(deletePoDetail({id})).then((res)=>{
      if(res.type === "podetail/deletePoDetail/fulfilled"){
        dispatch(getPoDetail())
      }
    })
  }
  

  const handleAddPOHeader = () => {
    if(po_number === ''){
      setIsValid(false)
      setValidMes(
        <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
          <b style={{color:'black'}}>PO Number is required</b>
        </CCol>
      )
    }else if(vendor_id === 0){
      setIsValid(false)
      setValidMes(
        <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
          <b style={{color:'black'}}>Vendor ID is required</b>
        </CCol>
      )
    }else{
      const payload = {
          po_number,
          po_date,
          vendor_id,
          requested_date,
          approval_flag:po_approval,
          approval_by:approval_flag,
          approved_date,
          dr_status,
          warehouse_id,
          remark,
          subtotal_amount:null,
          tax_amount:null,
          grand_total_amount:null,
          fulfillment_expiry_date,
          status:'active',
          created_by:user?.id,
          date_created:new Date().toISOString(),
          date_updated:null,
          updated_by:null,
      }

      setIsValid(true)
      setValidMes('')
  
      dispatch(createPo(payload)).then((res)=>{
        if(res.type === "po/createPo/fulfilled"){
        navigate(`/po`)
        }
      })
    }
  }

  const handleSavePOHeader = () => {
    if(po_number === ''){
      setIsValid(false)
      setValidMes(
        <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
          <b style={{color:'black'}}>PO Number is required</b>
        </CCol>
      )
    }else if(vendor_id === 'Select a Vendor'){
      setIsValid(false)
      setValidMes(
        <CCol md={12} style={{height:'50px',padding:'12px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#f9000059'}}>
          <b style={{color:'black'}}>Vendor ID is required</b>
        </CCol>
      )
    }else{
        const payload = {
            po_header_id:id,
            po_number,
            po_date,
            vendor_id,
            requested_date,
            approval_flag:po_approval,
            approval_by:approval_flag,
            approved_date,
            dr_status,
            warehouse_id,
            remark,
            subtotal_amount:null,
            tax_amount:null,
            grand_total_amount:null,
            fulfillment_expiry_date,
            status:'active',
            created_by:user?.id,
            date_created:new Date().toISOString(),
            date_updated:null,
            updated_by:null,
        }
        
        setIsValid(true)
        setValidMes('')

        dispatch(updatePo(payload)).then((res)=>{
            setTimeout(()=>{
              dispatch(clearPo())
              dispatch(getPo({po_header_id:id}))
              dispatch(getPoDetail({po_header_id:id}))
            },2000)
        })
    }
  }


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
          <CHeaderText className="header-brand mb-0 h1">
            {id ? 'EDIT PURCHASE ORDER' : 'ADD PURCHASE ORDER'}</CHeaderText>
          </CCardHeader>
          <CCardBody>
         
    
            <CForm className="row g-3 needs-validation"
              noValidate
            >
              <PoAdd1stRow 
                vendors={vendors}
                po_number={po_number} po_date={po_date} 
                vendor_id={vendor_id} requested_date={requested_date}
                onPONumber={setPONumber} onPODate={setPODate} 
                onVendorId={setVendorId}
                onRequestDate={setRequestDate}
              />

              <PoAdd2ndRow 
                po_approval={po_approval}
                approval_flag={approval_flag}
                approved_date={approved_date}
                dr_status={dr_status}

                onPOApproval={setPOApproval}
                onApprovalFlag={setApprovalFlag}
                onApprovedDate={setApprovedDate}
                onDRStatus={setDRStatus}
              />

              <PoAdd3rdRow 
                remark={remark}
                warehouse_id={warehouse_id}
                fulfillment_expiry_date={fulfillment_expiry_date}
           
                onRemark={setRemark}
                onWarehouseId={setWarehouseId}
                onFulfillmentExpiryDate={setFulfillmentExpiryDate}
              />
               <CRow xs={{ gutterY: 1 }}>{!isValid ? validMes : ''}</CRow> 
               <CRow xs={{ gutterY: 1 }}>
                {
                  status === "idle" ? '' :
                  status === "loading" ? (
                    <CCol md={12} style={{height:'50px',padding:'15px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#d3d3d3'}}>
                      <b style={{color:'black'}}>Saving...</b>
                    </CCol>) :
                  status === "success" ? (
                    <CCol md={12} style={{height:'50px',padding:'15px 0 0 10px',margin:'10px 0 10px 0', backgroundColor:'#00800012'}}>
                      <b style={{color:'green'}}>PO NUMBER # {po_number} has been updated</b>
                    </CCol>) : ''
                }
              </CRow> 
              <CRow xs={{ gutterY: 2 }}>
                <CCol md={12} className="p-1">
                    {id ? (
                      <CButton style={{marginRight:'5px',float:'right'}}
                      color="primary" onClick={() => handleSavePOHeader()}>Save PO Header</CButton>
                    ): (
                      <CButton style={{marginRight:'5px',float:'right'}}
                      color="primary" onClick={() => handleAddPOHeader()}>Add PO Header</CButton>
                    )}
                
                </CCol>
              </CRow> 
              {id && (
              <PoDetailTable 
                po_header_id_prop={id}
                po_number={po_number}
                user_id={user?.id}
                poDetail={poDetail}
                vendor_id={vendor_id}
                onPODetailAdd={handlePODetailAdd}
                onPODetailUpdate={handlePODetailUpdate}
                onDeletePODetail={handleDeletePODetail}
              />
              )}
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
  </CRow>
  )
}

export default PoAdd