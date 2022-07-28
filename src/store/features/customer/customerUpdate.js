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
import { getCustomerById } from 'src/store/features/customer/customerSlice';
import { useParams } from 'react-router-dom';


const CustomerUpdate = () => {
  
  
  //Form Validation 
  const [customerName, setCustomerName] = useState();
  const [country, setCountry] = useState();

  const [validated, setValidated] = useState(false)

  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    event.setSelectedValue({ value: event.target.value })
  }

  //Get router params
  const { customerid } = useParams();

  //Dispatch Actions
  const dispatch = useDispatch();
  const data = useSelector((state) => state.customer.data);

  useEffect(() => {
      dispatch(getCustomerById({ id: customerid }));
  },[]);

  console.log(data)
  console.log(JSON.stringify(customerid))


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
              <CCol md={2}>
                <CFormInput
                  label="Customer ID"
                  type="text"
                  id="customerId"
                  value={customerid}
                  disabled
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Customer Name"
                  type="text"
                  id="customerName"
                  value={data.customer_name}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormSelect id="customerType" label="Customer Type">
                  <option>D2C</option>
                  <option>DST</option>
                  <option>WHS</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="companyName">Company Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="companyName"
                  value={data.company_name}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="customerEmail">Email</CFormLabel>
                <CFormInput
                  type="text"
                  id="customerEmail"
                  value={data.email}
                  placeholder="Input a valid email"
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                  <CFormInput
                    type="text"
                    id="phoneNumber"
                    value={data.phone_number}
                    aria-describedby="inputGroupPrepend"
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="mobileNumber">Mobile Number</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText id="inputGroupPrepend">+63</CInputGroupText>
                  <CFormInput
                    type="text"
                    id="mobileNumber"
                    value={data.mobile_number}
                    aria-describedby="inputGroupPrepend"
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="address1">Address 1</CFormLabel>
                <CFormInput 
                type="text" 
                id="address1" 
                value={data.address1}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="address2">Address 2</CFormLabel>
                <CFormInput 
                type="text" 
                id="address2" 
                value={data.address2}
                />
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="country">Country</CFormLabel>
                <CFormSelect id="country">
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
                <CFormLabel htmlFor="postalCode">Zip Code</CFormLabel>
                <CFormInput type="text" id="postalCode" />
                <CFormFeedback valid></CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="tin">TIN</CFormLabel>
                <CFormInput
                  type="text"
                  id="tin"
                  value={data.tin}
                  placeholder=""
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="defaultCurrency">Default Currency</CFormLabel>
                <CFormSelect id="defaultCurrency">
                  <option>USD</option>
                  <option>SGD</option>
                  <option>AUD</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="paymentTerms">Payment Terms</CFormLabel>
                <CFormSelect id="paymentTerms">
                  <option>50 PCT DP Required</option>
                  <option>EOM</option>
                  <option>NET 10</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="paymentMode">Payment Mode</CFormLabel>
                <CFormSelect id="paymentMode">
                  <option>Bank Transfer</option>
                  <option>COD</option>
                  <option>Mobile Payment</option>
                </CFormSelect>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="businessPostingGroup">Business Posting Group</CFormLabel>
                <CFormInput
                  type="text"
                  id="businessPostingGroup"
                  value={data.business_posting_group}
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="VATPostingGroup">VAT Posting Group</CFormLabel>
                <CFormInput
                  type="text"
                  id="VATPostingGroup"
                  value={data.vat_posting_group}
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="customerPostingGroup">Customer Posting Group</CFormLabel>
                <CFormInput
                  type="text"
                  id="customerPostingGroup"
                  value={data.ccustomer_posting_group}
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
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
                  <CFormInput aria-label="First name" type="text" placeholder="First Name" value={data.contact_person_first_name}/>
                  <CFormInput aria-label="Last name" type="text" placeholder="Last Name" value={data.contact_person_last_name}/>
                </CInputGroup>
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="billToAddress1">Bill To Address 1</CFormLabel>
                <CFormInput type="text" id="billToAddress1" value={data.bill_to_address1}/>
                <CFormFeedback valid></CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="billToAddress2">Bill To Address 2</CFormLabel>
                <CFormInput type="text" id="billToAddress2" value={data.bill_to_address2}/>
                <CFormFeedback valid></CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="billToCountry">Bill to Country</CFormLabel>
                <CFormSelect id="billToCountry">
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="billToCity">Bill To City</CFormLabel>
                <CFormSelect id="billToCity">
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="biillToProvince">Bill To Province</CFormLabel>
                <CFormSelect id="biillToProvince">
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="billToPostalCode">Bill To Zip Code</CFormLabel>
                <CFormInput type="text" id="billToPostalCode" value={data.bill_to_post_code}/>
                <CFormFeedback valid></CFormFeedback>
              </CCol>
              <CCol md={12}>
                <CFormLabel htmlFor="shippingAddress">Shipping Address</CFormLabel>
                <CFormInput type="text" id="shippingAddress" value={data.shipping_address}/>
                <CFormFeedback valid></CFormFeedback>
              </CCol>
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

export default CustomerUpdate
