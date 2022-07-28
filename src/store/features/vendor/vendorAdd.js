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
import { createVendor } from './vendorSlice';
import { useNavigate } from 'react-router-dom'


const VendorAdd = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.vendor.isSuccess)
  const vendorData = useSelector((state) => state.vendor.data)
  const [addRequestStatus, setAddRequestStatus] = useState(isSuccess)

  console.log({ addRequestStatus, vendorData })

  //console.log({ isSuccess, customerData })

  //Set Fields
  const [vendor_name, setVendorName] = useState('');
  const [vendor_type, setVendorType] = useState('');
  const [company_id, setCompanyId] = useState(''); //options on company dim
  const [email, setEmail] = useState('');
  const [customer_type, setCustomerType] = useState(''); //connect this to FAS Reference Dim
  const [phone_number, setPhoneNumber] = useState('');
  const [mobile_number, setMobileNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [post_code, setPostCode] = useState('');
  const [country_abbr, setCountry] = useState('');
  const [payment_terms, setPaymentTerms] = useState('');
  const [payment_mode, setPaymentMode] = useState('');
  const [contact_person_first_name, setContactFirstName] = useState('');
  const [contact_person_last_name, setContactLastName] = useState('');
  const [bank_name, setBankName] = useState('');
  const [bank_account_number, setBankAccountNumber] = useState('');
  const [currency_code, setCurrencyCode] = useState('');
  const [business_posting_group, setBusinessPostingGroup] = useState('');
  const [vat_posting_group, setVatPostingGroup] = useState('');
  const [vendor_posting_group, setVendorPostingGroup] = useState('');
  const [website, setWebsite] = useState('');

  //Form Validation 
  const [validated, setValidated] = useState(false)
  
  const canSave = [vendor_name, email].every(Boolean) && addRequestStatus === true;
  
  const onSavePostClicked = () => {  
    if (canSave) {
      try {
        setAddRequestStatus(true)
        dispatch(createVendor(
          { 
              company_id: company_id,
              vendor_name: vendor_name,
              vendor_type: vendor_type,
              email: email,
              customer_type: customer_type,
              phone_number: phone_number,
              mobile_number: mobile_number,
              address1: address1,
              address2: address2,
              city: city,
              province: province,
              post_code: post_code,
              country_abbr: country_abbr,
              payment_terms: payment_terms,
              payment_mode: payment_mode,
              contact_person_first_name: contact_person_first_name,
              contact_person_last_name: contact_person_last_name,
              bank_name: bank_name,
              bank_account_number: bank_account_number,
              currency_code: currency_code,
              business_posting_group: business_posting_group,
              vat_posting_group: vat_posting_group,
              vendor_posting_group: vendor_posting_group,
              website: website,
              status: 'active',
              created_by: 'test',
              updated_by: 'test',
              date_created: new Date(),
              date_updated: new Date(),
            
          })).unwrap()
              setCompanyId('')
              setVendorName('')
              setVendorType('')
              setEmail('')
              setCustomerType('')
              setPhoneNumber('')
              setMobileNumber('')
              setAddress1('')
              setAddress2('')
              setCity('')
              setProvince('')
              setPostCode('')
              setCountry('')
              setPaymentTerms('')
              setPaymentMode('')
              setBankName('')
              setBankAccountNumber('')
              setCurrencyCode('')
              setBusinessPostingGroup('')
              setVatPostingGroup('')
              setVendorPostingGroup('')
              setWebsite('')
      
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus(false)
        
      }
    }
  }

  //Submit Form
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    navigate(`/vendors`)
  }

  return (
   <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
           <strong>Add New Vendor</strong> <small></small>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3 needs-validation"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}
           >
             <CCol md={2}>
              <CFormInput
                 label="Company Id" 
                 type="text"
                 id="company_id"
                 feedbackValid="Looks good!"
                 value={1}
                 onChange={(e) => setCompanyId(e.target.value)}
                 disabled
               />
             </CCol>
             <CCol md={6}>
              <CFormInput
                 label="Vendor Name" 
                 type="text"
                 id="vendor_name"
                 feedbackValid="Looks good!"
                 onChange={(e) => setVendorName(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
               <CFormSelect id="vendor_type" label="Vendor Type" onChange={(e) => setVendorType(e.target.value)}>
                 <option>AS</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Email" 
                 type="text"
                 id="email"
                 feedbackValid="Looks good!"
                 onChange={(e) => setEmail(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
               <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
               <CInputGroup className="has-validation">
                 <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                 <CFormInput
                   type="text"
                   id="phone_number"
                   feedbackValid="Looks good!"
                   onChange={(e) => setPhoneNumber(e.target.value)}
                 />
               </CInputGroup>
             </CCol>
             <CCol md={3}>
               <CFormLabel htmlFor="mobileNumber">Mobile Number</CFormLabel>
               <CInputGroup className="has-validation">
                 <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                 <CFormInput
                   type="text"
                   id="mobile_number"
                   feedbackValid="Looks good!"
                   onChange={(e) => setMobileNumber(e.target.value)}
                 />
               </CInputGroup>
             </CCol>
             <CCol md={6}>
               <CFormInput 
                 label="Address 1" 
                 type="text"
                 id="address1"
                 feedbackValid="Looks good!"
                 onChange={(e) => setAddress1(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={6}>
               <CFormInput 
                label="Address 2" 
                type="text"
                id="address2"
                feedbackValid="Looks good!"
                onChange={(e) => setAddress2(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
               <CFormSelect id="city" label="City" onChange={(e) => setCity(e.target.value)} required>
                 <option>PH</option>
                 <option>SG</option>
                 <option>AU</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
               <CFormSelect id="province" label="Province" onChange={(e) => setProvince(e.target.value)} required>
                 <option>PH</option>
                 <option>SG</option>
                 <option>AU</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
               <CFormSelect id="country" label="Country" onChange={(e) => setCountry(e.target.value)} required>
                 <option>PH</option>
                 <option>SG</option>
                 <option>AU</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
               <CFormInput 
                label="Post Code" 
                type="text"
                id="post_code"
                feedbackValid="Looks good!"
                onChange={(e) => setPostCode(e.target.value)}
                required
               />
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>Contact Person</CInputGroupText>
                  <CFormInput 
                    aria-label="First name" 
                    type="text" 
                    placeholder="First Name" 
                    onClick={(e)=>setContactFirstName(e.target.value)} 
                    required
                  />
                  <CFormInput 
                    aria-label="Last name" 
                    type="text" 
                    placeholder="Last Name" 
                    onClick={(e)=>setContactLastName(e.target.value)} 
                    required
                  />
                </CInputGroup>
                <CFormFeedback valid>Looks good!</CFormFeedback>
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={4}>
               <CFormInput
                 label="Bank Name" 
                 type="text"
                 id="bank_name"
                 feedbackValid="Looks good!"
                 onChange={(e) => setBankName(e.target.value)}
               />
             </CCol>
             <CCol md={4}>
               <CFormInput
                 label="Bank Account Number" 
                 type="text"
                 id="bank_account_number"
                 feedbackValid="Looks good!"
                 onChange={(e) => setBankAccountNumber(e.target.value)}
               />
             </CCol>
             <CCol md={4}>
               <CFormSelect id="currency_code" label="Currency Code" onChange={(e) => setCurrencyCode(e.target.value)}>
                 <option>USD</option>
                 <option>SGD</option>
                 <option>AUD</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
               <CFormLabel htmlFor="payment_terms">Payment Terms</CFormLabel>
               <CFormSelect id="payment_terms" onChange={(e) => setPaymentTerms(e.target.value)}>
                 <option>50 PCT DP Required</option>
                 <option>EOM</option>
                 <option>NET 10</option>
               </CFormSelect>
             </CCol>
             <CCol md={3}>
               <CFormSelect id="payment_mode" label="Payment Mode" onChange={(e) => setPaymentMode(e.target.value)}>
                 <option>Bank Transfer</option>
                 <option>COD</option>
                 <option>Mobile Payment</option>
               </CFormSelect>
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={4}>
               <CFormInput
                 label="Business Posting Group" 
                 type="text"
                 id="business_posting_group"
                 feedbackValid="Looks good!"
                 onChange={(e) => setBusinessPostingGroup(e.target.value)}
               />
             </CCol>
             <CCol md={4}>
               <CFormInput
                 label="VAT Posting Group" 
                 type="text"
                 id="vat_posting_group"
                 feedbackValid="Looks good!"
                 onChange={(e) => setVatPostingGroup(e.target.value)}
               />
             </CCol>
             <CCol md={4}>
               <CFormInput
                 label="Vendor Posting Group" 
                 type="text"
                 id="vendor_posting_group"
                 feedbackValid="Looks good!"
                 onChange={(e) => setVendorPostingGroup(e.target.value)}
               />
             </CCol>
             <CCol md={4}>
               <CFormInput
                 label="Website" 
                 type="text"
                 id="website"
                 feedbackValid="Looks good!"
                 onChange={(e) => setWebsite(e.target.value)}
               />
             </CCol>
             <CCol xs={12}>
                <CButton 
                  color="primary" 
                  type="submit"
                  onClick={onSavePostClicked}>
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

export default VendorAdd