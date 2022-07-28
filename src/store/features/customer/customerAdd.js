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
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer } from './customerSlice';
import { useNavigate } from 'react-router-dom'


const CustomerAdd = () => {

  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.customer.isSuccess)
  const customerData = useSelector((state) => state.customer.data)
  const [addRequestStatus, setAddRequestStatus] = useState(isSuccess)

  console.log({ addRequestStatus, customerData })

  //console.log({ isSuccess, customerData })

  //Set Fields
  const [customer_name, setCustomerName] = useState('');
  const [company_name, setCompanyName] = useState(''); //options on company dim
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
  const [currency_code, setCurrencyCode] = useState('');
  const [contact_person_first_name, setContactFirstName] = useState('');
  const [contact_person_last_name, setContactLastName] = useState('');
  const [bill_to_customer_name, setBillCustomerName] = useState('');
  const [bill_to_address1, setBillAddress1] = useState('');
  const [bill_to_address2, setBillAddress2] = useState('');
  const [bill_to_city, setBillCity] = useState('');
  const [bill_to_province, setBillProvince] = useState('');
  const [bill_to_post_code, setBillPostCode] = useState('');
  const [bill_to_country_abbr, setBillCountry] = useState('');
  const [tax_identification_number, setTin] = useState('');
  const [payment_terms, setPaymentTerms] = useState('');
  const [payment_mode, setPaymentMode] = useState('');
  const [shipping_address, setShippingAddress] = useState('');
  const [default_currency, setDefaultCurrency] = useState('');
  const [business_posting_group, setBusinessPostingGroup] = useState('');
  const [vat_posting_group, setVatPostingGroup] = useState('');
  const [customer_posting_group, setCustomerPostingGroup] = useState('');
  const [website, setWebsite] = useState('');

  //Form Validation 
  const [validated, setValidated] = useState(false)
  
  const canSave = [customer_name, email].every(Boolean) && addRequestStatus === true;
  
  const onSavePostClicked = () => {  
    if (canSave) {
      try {
        setAddRequestStatus(true)
        dispatch(createCustomer(
          { 
              company_name: company_name,
              customer_name: customer_name,
              customer_type: customer_type,
              email: email,
              phone_number: phone_number,
              mobile_number: mobile_number,
              address1: address1,
              address2: address2,
              country_abbr: country_abbr,
              city: city,
              province: province,
              post_code: post_code,
              website: website,
              bill_to_customer_name: bill_to_customer_name,
              bill_to_address1: bill_to_address1,
              bill_to_address2: bill_to_address2,
              bill_to_city: bill_to_city,
              bill_to_province: bill_to_province,
              bill_to_post_code: bill_to_post_code,
              bill_to_country_abbr: bill_to_country_abbr,
              tax_identification_number: tax_identification_number,
              shipping_address: shipping_address,
              currency_code: currency_code,
              business_posting_group: business_posting_group,
              vat_posting_group: vat_posting_group,
              customer_posting_group: customer_posting_group,
              contact_person_first_name: contact_person_first_name,
              contact_person_last_name: contact_person_last_name,
              payment_terms: payment_terms,
              payment_mode: payment_mode,
              cs_user_id: '1',
              cs_company_id: '2',
              status: 'active',
              created_by: 'test',
              updated_by: 'test',
              date_created: new Date(),
              date_updated: new Date(),
            
          })).unwrap()

          setCustomerName('')
          setCompanyName('')
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
          setCurrencyCode('')
          setContactFirstName('')
          setContactLastName('')
          setBillCustomerName('')
          setBillAddress1('')
          setBillAddress2('')
          setBillCity('')
          setBillProvince('')
          setBillPostCode('')
          setBillCountry('')
          setTin('')
          setPaymentTerms('')
          setPaymentMode('')
          setShippingAddress('')
          setDefaultCurrency('')
          setBusinessPostingGroup('')
          setVatPostingGroup('')
          setCustomerPostingGroup('')
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
    navigate(`/customers`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New Customer</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormInput
                  label="Customer Name"
                  type="text"
                  id="customer_name"
                  feedbackValid="Looks good!"
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="customerType">Customer Type</CFormLabel>
                <CFormSelect id="customerType" onChange={(e) => setCustomerType(e.target.value)} required>
                  <option>D2C</option>
                  <option>DST</option>
                  <option>WHS</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Company Name"
                  type="text"
                  id="company_name"
                  feedbackValid="Looks good!"
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
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
                <CFormLabel htmlFor="address1">Address 1</CFormLabel>
                <CFormInput 
                  type="text"
                  id="address1"
                  feedbackValid="Looks good!"
                  onChange={(e) => setAddress1(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="address2">Address 2</CFormLabel>
                <CFormInput 
                  type="text"
                  id="address2"
                  feedbackValid="Looks good!"
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="country_abbr">Country</CFormLabel>
                <CFormSelect 
                  id="country_abbr" 
                  onChange={(e) => setCountry(e.target.value)}
                  required>
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="city">City</CFormLabel>
                <CFormSelect 
                  id="city" 
                  onChange={(e) => setCity(e.target.value)}
                  required>
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="province">Province</CFormLabel>
                <CFormSelect 
                  id="province" 
                  onChange={(e) => setProvince(e.target.value)}
                  required>
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
              <CCol md={3}>
              <CFormInput
                  label="TIN"
                  type="text"
                  id="tax_identification_number"
                  feedbackValid="Looks good!"
                  onChange={(e) => setTin(e.target.value)}
                  required
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
              <CCol md={3}>
                <CFormLabel htmlFor="payment_terms">Payment Terms</CFormLabel>
                <CFormSelect id="payment_terms" onChange={(e) => setPaymentTerms(e.target.value)}>
                  <option>50 PCT DP Required</option>
                  <option>EOM</option>
                  <option>NET 10</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="payment_mode">Payment Mode</CFormLabel>
                <CFormSelect id="payment_mode" onChange={(e) => setPaymentMode(e.target.value)}>
                  <option>Bank Transfer</option>
                  <option>COD</option>
                  <option>Mobile Payment</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Business Posting Group"
                  type="text"
                  feedbackValid="Looks good!"
                  id="business_posting_group"
                  onChange={(e) => setBusinessPostingGroup(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="VAT Posting Group"
                  type="text"
                  feedbackValid="Looks good!"
                  id="vat_posting_group"
                  onChange={(e) => setVatPostingGroup(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Customer Posting Group"
                  type="text"
                  feedbackValid="Looks good!"
                  id="customer_posting_group"
                  onChange={(e) => setCustomerPostingGroup(e.target.value)}
                />
              </CCol>
              <CCol md={12}></CCol>
              <CCol md={6}>
                <CFormInput
                  label="Bill To Customer Name"
                  type="text" 
                  id="bill_to_customer_name" 
                  feedbackValid="Looks good!"
                  onChange={(e) => setBillCustomerName(e.target.value)}
                />
              </CCol>
              <CCol md={12}></CCol>
              <CCol md={6}>
                <CFormInput
                  label="Bill To Address 1"
                  type="text" 
                  id="bill_to_address1" 
                  feedbackValid="Looks good!"
                  onChange={(e) => setBillAddress1(e.target.value)}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Bill To Address 2"
                  type="text" 
                  id="bill_to_address2" 
                  feedbackValid="Looks good!"
                  onChange={(e) => setBillAddress2(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="bill_to_country">Bill to Country</CFormLabel>
                <CFormSelect id="bill_to_country" onChange={(e) => setBillCountry(e.target.value)}>
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="bill_to_city">Bill To City</CFormLabel>
                <CFormSelect id="bill_to_city" onChange={(e) => setBillCity(e.target.value)}>
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="biillToProvince">Bill To Province</CFormLabel>
                <CFormSelect id="biillToProvince" onChange={(e) => setBillProvince(e.target.value)}>
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormInput 
                  label="Bill to Post Code"
                  type="text" 
                  id="billToPostalCode" 
                  onChange={(e) => setBillPostCode(e.target.value)}/>
              </CCol>
              <CCol md={12}>
                <CFormInput 
                  label="Shipping Address"
                  type="text" 
                  id="shipping_address" 
                  onChange={(e) => setShippingAddress(e.target.value)}/>
              </CCol>
              <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>Contact Person</CInputGroupText>
                  <CFormInput aria-label="First name" type="text" placeholder="First Name" onClick={(e)=>setContactFirstName(e.target.value)}/>
                  <CFormInput aria-label="Last name" type="text" placeholder="Last Name" onClick={(e)=>setContactLastName(e.target.value)}/>
                </CInputGroup>
                <CFormFeedback valid>Looks good!</CFormFeedback>
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

export default CustomerAdd