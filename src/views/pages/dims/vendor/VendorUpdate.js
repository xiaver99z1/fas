import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { getVendors, selectAllVendors, selectVendorById, updateVendor, updatePost } from '../../../../store/features/vendorSlice';
import { selectAllFasRef, selectAllCountries, selectAllCurrency, selectAllPaymentMode } from './../../../../store/features/fasrefereceSlice';
import { useNavigate, useParams } from 'react-router-dom';


const VendorUpdate = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formatYmd = date => date.toISOString().slice(0, 10);

  const { id } = useParams();
  const data = useSelector((state) => selectVendorById(state, Number(id)));
  

  //Set Fields
  const [vendorId, setVendorId] = useState(id);
  const [vendorName, setVendorName] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [vendorStatus, setVendorStatus] = useState('');
  const [record, setRecord] = useState({});
  const [requestStatus, setRequestStatus] = useState('idle');

  /*  
  if (Array.isArray(data)) {
    const r3 = data.find(element => element.vendor_id === id);
    console.log(r3);
  } else {
    console.log('arr is not an array', data);
  }
  */

  console.log({record});


  //Form Validation 
  const [validated, setValidated] = useState(false)
  
  const canSave = [vendorName, emailAddress].every(Boolean) && requestStatus === 'idle';
  
  const onSavePostClicked = () => {  
    if (canSave) {
      try {
        setRequestStatus('pending');
        
        dispatch(updateVendor({vendor_id: data.vendor_id, 
          vendor_name: vendorName, 
          vendor_type: vendorType, 
          email: emailAddress, 
          status: vendorStatus})).unwrap()
              
        setVendorName('')
        setVendorType('')
        setEmail('')
        setVendorStatus('')

        navigate(`/vendor/${id}?updated`);
        
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  //Submit Form
  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  }

  return (

   <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
           <strong>Update Vendor</strong> <small></small>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3 needs-validation"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}
           >
             <CCol md={2}>
             <CFormInput
                 label="Vendor ID" 
                 type="text"
                 id="vendor_id"
                 defaultValue={id}
                 readOnly={true}
               />
             </CCol>
             <CCol md={6}>
              <CFormInput
                 label="Vendor Name" 
                 type="text"
                 id="vendor_name"
                 feedbackValid="Looks good!"
                 defaultValue={data.vendor_name}
                 onChange={(e) => setVendorName(e.target.value)}
                 readOnly={false}
                 required
               />
             </CCol>
             <CCol md={3}>
               <CFormSelect 
                id="vendor_type" 
                label="Vendor Type" 
                onChange={(e) => setVendorType(e.target.value)}
                defaultValue={data.vendor_type}>
                 <option>AS</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Email" 
                 type="text"
                 id="email"
                 defaultValue={data.email}
                 feedbackValid="Looks good!"
                 onChange={(e) => setEmail(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
               <CFormSelect 
                id="vendorStatus"
                label="Status" 
                defaultValue={data.status} 
                onChange={(e) => setVendorStatus(e.target.value)} 
                required>
                  <option>active</option>
                  <option>deleted</option>
                  <option>pending</option>
               </CFormSelect>
             </CCol>
             <CCol xs={12}>
                <CButton 
                  color="primary" 
                  type="button"
                  onClick={onSavePostClicked}
                >
                  Submit Form
                </CButton>
              </CCol>
           </CForm>
         </CCardBody>
       </CCard>
     </CCol>
   </CRow>
  

 )
}

export default VendorUpdate
