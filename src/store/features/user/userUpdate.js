import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
  CHeader,
  CHeaderText,
} from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from 'src/store/features/user/userSlice';
import { useParams } from 'react-router-dom';


const UserUpdate = () => {
  
  //Form Validation 
  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  //Get router params
  const { userid } = useParams();

  //Dispatch Actions
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.data);

  useEffect(() => {
      dispatch(getUserById({ id: userid }));
  },[]);

  console.log(data)
  console.log(JSON.stringify(userid))


  return (
      <CRow>
      <CCol xs={12}>
      <CCard className="mb-4">
         <CCardHeader>
            <strong>COMPANY DETAILS </strong> <small> { data.company_name } </small>
         </CCardHeader>
         <CCardBody>
            <CForm className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            >
            <CCol md={6}>
               <CFormLabel htmlFor="companyName">User ID</CFormLabel>
               <CFormInput
                  type="text"
                  id="companyId"
                  value={userid}
                  disabled
               />
               <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={6}>
               <CFormLabel htmlFor="companyName">Username</CFormLabel>
               <CFormInput
                  label="Company Name"
                  type="text"
                  id="companyName"
                  value={data.username}
                  required
               />
               <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={12}></CCol>
            <CCol xs={12}>
               <CButton color="primary" type="submit">
                  Update
               </CButton>
            </CCol>
            </CForm>
         </CCardBody>
      </CCard>
      </CCol>
   </CRow>
  )
}

export default UserUpdate