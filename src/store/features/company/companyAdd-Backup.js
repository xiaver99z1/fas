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
import { nanoid } from '@reduxjs/toolkit';
import { createCompany } from './../company/companySlice'
import { useNavigate } from 'react-router-dom'

const CompanyAdd2 = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.company.isSuccess)
  const companyData = useSelector((state) => state.company.data)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  //console.log({ isSuccess, companyData })

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


  //Form Validation 
  const [validated, setValidated] = useState(false)

  //Submit Form
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    alert('new '+ company_name +' added!')
    navigate('/companies')
  }

  const onCompanyNameChanged = (e) => setCompanyName(e.target.value)
  const onCompanyShortNameChanged = (e) => setCompanyShortName(e.target.value)
  
  const canSave = [company_name, email].every(Boolean) && addRequestStatus === 'idle';
  
  const onSavePostClicked = () => {  
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(createCompany({
          company_id: nanoid(),
          company_name,
          company_short_name,
          email,
          phone_number,
          mobile_number,
          address1,
          address2,
          country_abbr,
          city,
          province,
          post_code,
          website,
          tax_identification_number,
          business_posting_group,
          vat_posting_group,
          customer_posting_group,
          contact_first_name,
          contact_last_name,
          payment_terms,
          payment_mode,
          created_by: 'test',
          updated_by: 'test',
          date_created: new Date(),
          date_updated: new Date()})).unwrap()

          setCompanyName('')
          setCompanyShortName('')
          setEmail('')
          setPhoneNumber('')
          setMobileNumber('')
          setAddress1('')
          setAddress2('')
          setCountry('')
          setCity('')
          setProvince('')
          setPostCode('')
          setWebsite('')
          setTin('')
          setBusinessPostingGroup('')
          setVatPostingGroup('')
          setCustomerPostingGroup('')
          setContactFirstName('')
          setContactLastName('')
          setPaymentTerms('')
          setPaymentMode('')
      
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
        navigate('/companies')
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Company</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" onSubmit={onSavePostClicked}>
              <CCol md={8}>
                <CFormInput
                  label="Company Name"
                  type="text"
                  id="company_name"
                  feedbackValid="Looks good!"
                  onChange={onCompanyNameChanged}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Company Short Name"
                  type="text"
                  id="company_short_name"
                  onChange={onCompanyShortNameChanged}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Email"
                  type="text"
                  id="email"
                  placeholder="Input a valid email"
                  onChange={(e) => setEmail(e.target.value)}
                  feedbackValid="Looks good!"
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                  <CFormInput
                    type="text"
                    id="phoneNumber"
                    defaultValue=""
                    aria-describedby="inputGroupPrepend"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="mobileNumber">Mobile Number</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                  <CFormInput
                    type="text"
                    id="mobileNumber"
                    aria-describedby="inputGroupPrepend"
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CFormInput 
                  label="Address 1"
                  type="text" 
                  id="address1" 
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput 
                  label="Address 2"
                  type="text" 
                  id="address1" 
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="country">Country</CFormLabel>
                <CFormSelect id="country" onChange={(e) => setCountry(e.target.value)}>
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="city">City</CFormLabel>
                <CFormSelect id="city" onChange={(e) => setCity(e.target.value)}>
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="province">Province</CFormLabel>
                <CFormSelect id="province" onChange={(e) => setProvince(e.target.value)}>
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
                  onChange={(e) => setPostCode(e.target.value)}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput 
                  label="Website"
                  feedbackValid="Looks good!"
                  type="text" 
                  id="website"
                  placeholder="https://"
                  onChange={(e) => setWebsite(e.target.value)}
                  />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="TIN"
                  type="text"
                  id="tax_identification_code"
                  placeholder="000-000-000"
                  onChange={(e) => setTin(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="currency_code">Default Currency</CFormLabel>
                <CFormSelect id="currency_code" onChange={(e) => setCurrencyCode(e.target.value)}>
                  <option>USD</option>
                  <option>SGD</option>
                  <option>AUD</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="business_posting_group">Business Posting Group</CFormLabel>
                <CFormInput
                  label="Business Posting Group"
                  type="text"
                  id="business_posting_group"
                  onChange={(e) => setBusinessPostingGroup(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="VAT Posting Group"
                  type="text"
                  id="vat_posting_group"
                  onChange={(e) => setVatPostingGroup(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Customer Posting Group"
                  type="text"
                  id="customer_postingg_group"
                  onChange={(e) => setCustomerPostingGroup(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={12}>
                <CHeader>
                  <CHeaderText>
                    <strong>TERMS</strong>
                  </CHeaderText>
                </CHeader>
              </CCol>
              <CCol md={12}>
                <CInputGroup>
                  <CInputGroupText>Contact Person</CInputGroupText>
                  <CFormInput aria-label="First name" type="text" placeholder="First Name" onChange={(e) => setContactFirstName(e.target.value)} required/>
                  <CFormInput aria-label="Last name" type="text" placeholder="Last Name" onChange={(e) => setContactLastName(e.target.value)} required/>
                </CInputGroup>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="payment_terms">Payment Terms</CFormLabel>
                <CFormSelect id="payment_terms" onChange={(e) => setPaymentTerms(e.target.value)} required>
                  <option>50 PCT DP Required</option>
                  <option>EOM</option>
                  <option>NET 10</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="payment_mode">Payment Mode</CFormLabel>
                <CFormSelect id="payment_mode" onChange={(e) => setPaymentMode(e.target.value)} required>
                  <option>Bank Transfer</option>
                  <option>COD</option>
                  <option>Mobile Payment</option>
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CButton 
                  color="primary" 
                  type="submit"
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

export default CompanyAdd2
