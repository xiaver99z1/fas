import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CHeader,
  CHeaderText,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyById, selectAllCompanies } from 'src/store/features/company/companySlice';
import { useParams, useNavigate } from 'react-router-dom'

const CompanyUpdate = () => {

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
  const { companyid } = useParams();

  //Dispatch Actions
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const data = useSelector((state) => state.company.data);
  const allCompanies = useSelector(selectAllCompanies)

  useEffect(() => {
      dispatch(getCompanyById({ id: companyid }));
  },[]);

  console.log( { companyid, allCompanies } )
  console.log(JSON.stringify(data))

   //Set Fields
   const [company_name, setCompanyName] = useState('');
   const [company_short_name, setCompanyShortName] = useState('');
   const [email, setEmail] = useState('');
   const [phone_number, setPhoneNumber] = useState('');
   const [mobile_number, setMobileNumber] = useState('');
   const [address1, setAddress1] = useState('');
   const [address2, setAddress2] = useState('');
   const [country_abbr, setCountry] = useState('');
   const [city, setCity] = useState('');
   const [province, setProvince] = useState('');
   const [post_code, setPostCode] = useState('');
   const [website, setWebsite] = useState('');
   const [tax_identification_number, setTin] = useState('');
   const [currency_code, setCurrencyCode] = useState('');
   const [business_posting_group, setBusinessPostingGroup] = useState('');
   const [vat_posting_group, setVatPostingGroup] = useState('');
   const [customer_posting_group, setCustomerPostingGroup] = useState('');
   const [contact_first_name, setContactFirstName] = useState('');
   const [contact_last_name, setContactLastName] = useState('');
   const [payment_terms, setPaymentTerms] = useState('');
   const [payment_mode, setPaymentMode] = useState('');

   const onCompanyNameChanged = (e) => setCompanyName(e.target.value)
   const onCompanyNameShortChanged = (e) => setCompanyShortName(e.target.value)


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
            <CCol md={2}>
               <CFormInput
                  label="Company ID"
                  type="text"
                  id="company_id"
                  value={data.company_id}
                  disabled
               />
            </CCol>
            <CCol md={6}>
               <CFormInput
                  label="Company Name"
                  type="text"
                  id="company_name"
                  value={data.company_name}
                  delay={true}
                  feedbackValid="Looks good!"
                  required
               />
            </CCol>
            <CCol md={4}>
               <CFormInput
                  label="Company Short Name"
                  type="text"
                  id="company_short_name"
                  value={data.company_short_name}
                  feedbackValid="Looks good!"
               />
            </CCol>
            <CCol md={4}>
               <CFormInput
                  label="Email"
                  type="text"
                  id="email"
                  value={data.email}
                  feedbackValid="Looks good!"
                  required
               />
               <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={4}>
               <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
               <CInputGroup className="has-validation">
                  <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                  <CFormInput
                  type="text"
                  id="phone_number"
                  value={data.phone_number}
                  aria-describedby="inputGroupPrepend"
                  required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
               </CInputGroup>
            </CCol>
            <CCol md={4}>
               <CFormLabel htmlFor="mobileNumber">Mobile Number</CFormLabel>
               <CInputGroup className="has-validation">
                  <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                  <CFormInput
                  type="text"
                  id="mobile_number"
                  value={data.mobile_number}
                  feedbackValid="Looks good!"
                  required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
               </CInputGroup>
            </CCol>
            <CCol md={6}>
               <CFormInput 
                  label="Address 1"
                  type="text" 
                  id="address1"
                  value={data.address1}
                  feedbackValid="Looks good!"
               />
            </CCol>
            <CCol md={6}>
               <CFormInput 
                  label="Address 2"
                  type="text" 
                  id="address2"
                  value={data.address2}
                  feedbackValid="Looks good!"
               />
            </CCol>
            <CCol md={3}>
               <CFormLabel htmlFor="country">Country</CFormLabel>
               <CFormSelect id="country_abbr">
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
               </CFormSelect>
            </CCol>
            <CCol md={3}>
               <CFormLabel htmlFor="city">City</CFormLabel>
               <CFormSelect id="city">
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
               </CFormSelect>
            </CCol>
            <CCol md={3}>
               <CFormLabel htmlFor="province">Province</CFormLabel>
               <CFormSelect id="province">
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
               </CFormSelect>
            </CCol>
            <CCol md={3}>
               <CFormInput 
                  label="Zip Code"
                  type="text" 
                  id="postalCode" 
                  value={data.post_code}
               />
               <CFormFeedback valid></CFormFeedback>
            </CCol>
            <CCol md={6}>
               <CFormInput 
                  label="Website"
                  type="text" 
                  id="website" 
                  value={data.website} 
                  placeholder="https://"
               />
               <CFormFeedback valid></CFormFeedback>
            </CCol>
            <CCol md={3}>
               <CFormLabel htmlFor="tin">TIN</CFormLabel>
               <CFormInput
                  type="text"
                  id="tax_identification_number"
                  value={data.tax_identification_number}
               />
            </CCol>
            <CCol md={3}>
               <CFormLabel htmlFor="currency_code">Default Currency</CFormLabel>
               <CFormSelect id="currency_code">
                  <option>USD</option>
                  <option>SGD</option>
                  <option>AUD</option>
               </CFormSelect>
            </CCol>
            <CCol md={4}>
               <CFormInput
                  label="Business Posting Group"
                  type="text"
                  id="business_posting_group"
                  value={data.business_posting_group}
               />
            </CCol>
            <CCol md={4}>
               <CFormInput
                  label="VAT Posting Group"
                  type="text"
                  id="vat_posting_group"
                  value={data.vat_posting_group}
               />
            </CCol>
            <CCol md={4}>
               <CFormInput
                  label="Customer Posting Group"
                  type="text"
                  id="customer_posting_group"
                  value={data.customer_posting_group}
               />
            </CCol>
            <CCol md={12}>
               <CHeader>
                  <CHeaderText>
                     <strong>TERMS</strong>
                  </CHeaderText>
               </CHeader>
            </CCol>
            <CCol md={6}>
               <CInputGroup>
                  <CInputGroupText>Contact Person</CInputGroupText>
                  <CFormInput 
                     id="contact_first_name"
                     aria-label="First name" 
                     type="text" 
                     value={data.contact_person_first_name}
                  />
                  <CFormInput 
                     id="contact_last_name"
                     aria-label="Last name" 
                     type="text" 
                     value={data.contact_person_last_name} 
                  />
               </CInputGroup>
               <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={12}></CCol>
            <CCol md={3}>
               <CFormLabel htmlFor="payment_terms">Payment Terms</CFormLabel>
               <CFormSelect id="payment_terms" value={data.payment_terms}>
                  <option>50 PCT DP Required</option>
                  <option>EOM</option>
                  <option>NET 10</option>
               </CFormSelect>
            </CCol>
            <CCol md={3}>
               <CFormLabel htmlFor="payment_mode">Payment Mode</CFormLabel>
               <CFormSelect id="payment_mode">
                  <option>{ data.payment_mode }</option>
                  <option>Bank Transfer</option>
                  <option>COD</option>
                  <option>Mobile Payment</option>
               </CFormSelect>
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

export default CompanyUpdate
