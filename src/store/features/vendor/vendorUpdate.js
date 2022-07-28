import React, { useEffect, useState } from 'react';
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
} from '@coreui/react-pro';
import { useDispatch, useSelector } from 'react-redux';
import { createVendor, updateVendor } from './vendorSlice';
import { useNavigate, useParams } from 'react-router-dom';


const VendorUpdate = () => {

    //Get initial data
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { isSuccess, vendorsByCompanyId, message } = useSelector((state) => ({...state.vendor,}));

    //Get All Data
    const initialState = { 
        company_id: "",
        vendor_name: "",
        vendor_type: "",
        email: "",
        customer_type: "",
        phone_number: "",
        mobile_number:  "",
        address1: "",
        address2: "",
        city: "",
        province: "",
        post_code: "",
        country_abbr: "",
        payment_terms: "",
        payment_mode: "",
        contact_person_first_name: "",
        contact_person_last_name: "",
        bank_name: "",
        bank_account_number: "",
        currency_code: "",
        business_posting_group: "",
        vat_posting_group: "",
        vendor_posting_group: "",
        website: "",
        status: "",
        created_by: "",
        updated_by: "",
        date_created: "",
        date_updated: "",
    };

    /* Only look for vendors of logged company (user) */
    useEffect(() => {
      if(id) {
         const singleRecord = find((s) => s.vendor_id === id);
         console.log({singleRecord});
         setRecord({ ...singleRecord });
      }
    }, [id]);
    
    //Form Validation 
    const [validated, setValidated] = useState(false);

    //Set Fields
    const [record, setRecord] = useState(initialState);
    const { company_id,
            vendor_name,
            vendor_type,
            email,
            customer_type,
            phone_number,
            mobile_number,
            address1,
            address2,
            city,
            province,
            post_code,
            country_abbr,
            payment_terms,
            payment_mode,
            contact_person_first_name,
            contact_person_last_name,
            bank_name,
            bank_account_number,
            currency_code,
            business_posting_group,
            vat_posting_group,
            vendor_posting_group,
            website,
            status,
            created_by,
            updated_by,
            date_created,
            date_updated
          } = record;



    console.log({ vendorsByCompanyId, record, id, isSuccess,  message });

    /* Submit Form
    const handleSubmit = (e) => {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);
      navigate(`/vendors`)
    } */

    const handleSubmit = (e) => {
      const form = e.currentTarget;

      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (vendor_name && email && vendor_type) {
        const updatedVendorData = { ...record, vendor_name: vendor_name?.result?.vendor_name };

        if (!id) {
          dispatch(createVendor({ updatedVendorData, navigate }));
          setValidated(true);
        } else {
          dispatch(updateVendor({ id, updatedVendorData, navigate }));
          setValidated(true);
        }
        handleClear();
      }
    };

    const onInputChange = (e) => {
      const { name, value } = e.target;
      setRecord({ ...record, [name]: value });
    };

    const handleClear = () => {
      setRecord({ company_id: "",
                  vendor_name: "",
                  vendor_type: "",
                  email: "",
                  customer_type: "",
                  phone_number: "",
                  mobile_number:  "",
                  address1: "",
                  address2: "",
                  city: "",
                  province: "",
                  post_code: "",
                  country_abbr: "",
                  payment_terms: "",
                  payment_mode: "",
                  contact_person_first_name: "",
                  contact_person_last_name: "",
                  bank_name: "",
                  bank_account_number: "",
                  currency_code: "",
                  business_posting_group: "",
                  vat_posting_group: "",
                  vendor_posting_group: "",
                  website: "",
                  status: 'active',
                  created_by: 'test',
                  updated_by: 'test',
                  date_created: new Date(),
                  date_updated: new Date(),
      });
    };

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
                    label="Company Id" 
                    type="text"
                    id="company_id"
                    name="company_id"
                    feedbackValid="Looks good!"
                    value={company_id || ""}
                    onChange={onInputChange}
                    disabled
                  />
                  </CCol>
                  <CCol md={6}>
                  <CFormInput
                    label="Vendor Name" 
                    type="text"
                    id="vendor_name"
                    name="vendor_name"
                    feedbackValid="Looks good!"
                    value={vendor_name || ""}
                    onChange={onInputChange}
                    readOnly={false}
                    required
                  />
                  </CCol>
                  <CCol md={3}>
                  <CFormSelect 
                    id="vendor_type" 
                    name="vendor_type" 
                    label="Vendor Type"
                  >
                    <option>AS</option>
                  </CFormSelect>
                  </CCol>
                  <CCol md={3}>
                  <CFormInput
                    label="Email" 
                    type="text"
                    id="email"
                    name="email"
                    feedbackValid="Looks good!"                 
                    value={email || ""}
                    onChange={onInputChange}
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
                        name="phone_number"
                        feedbackValid="Looks good!"
                        value={phone_number || null}
                        onChange={onInputChange}
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
                        name="mobile_number"
                        feedbackValid="Looks good!"
                        value={mobile_number || null}
                        onChange={onInputChange}
                    />
                  </CInputGroup>
                  </CCol>
                  <CCol md={6}>
                  <CFormInput 
                    label="Address 1" 
                    type="text"
                    id="address1"
                    name="address1"
                    feedbackValid="Looks good!"
                    value={address1 || null}
                    onChange={onInputChange}
                    required
                  />
                  </CCol>
                  <CCol md={6}>
                  <CFormInput 
                    label="Address 2" 
                    type="text"
                    id="address2"
                    name="address2"
                    feedbackValid="Looks good!"
                    value={address2 || null}
                    onChange={onInputChange}
                  />
                  </CCol>
                  <CCol md={3}>
                  <CFormSelect 
                    id="city" 
                    label="City"
                    name="city"
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                    required>
                    <option selected>PH</option>
                    <option>SG</option>
                    <option>AU</option>
                  </CFormSelect>
                  </CCol>
                  <CCol md={3}>
                  <CFormSelect 
                    id="province" 
                    label="Province" 
                    name="province"
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                    required
                  >
                    <option>PH</option>
                    <option>SG</option>
                    <option>AU</option>
                  </CFormSelect>
                  </CCol>
                  <CCol md={3}>
                  <CFormSelect 
                    id="country" 
                    label="Country" 
                    name="country"
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                    required
                  >
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
                    name="post_code"
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
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
                        value={contact_person_first_name}
                        name="contact_person_first_name"
                        feedbackValid="Looks good!"
                        onChange={onInputChange}
                        required
                    />
                    <CFormInput 
                        aria-label="Last name" 
                        type="text" 
                        placeholder="Last Name" 
                        value={contact_person_last_name}
                        name="contact_person_last_name"
                        feedbackValid="Looks good!"
                        onChange={onInputChange}
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
                    name="bank_name"
                    value={bank_name}
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                  />
                  </CCol>
                  <CCol md={4}>
                  <CFormInput
                    label="Bank Account Number" 
                    type="text"
                    id="bank_account_number"
                    name="bank_account_number"
                    value={bank_account_number}
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                  />
                  </CCol>
                  <CCol md={4}>
                  <CFormSelect 
                    id="currency_code" 
                    label="Currency Code" 
                    name="currency_code"
                    onChange={onInputChange}>
                    <option>USD</option>
                    <option>SGD</option>
                    <option>AUD</option>
                  </CFormSelect>
                  </CCol>
                  <CCol md={3}>
                  <CFormLabel htmlFor="payment_terms">Payment Terms</CFormLabel>
                  <CFormSelect 
                    id="payment_terms" 
                    name="payment_terms"
                    onChange={onInputChange}
                    >
                    <option>50 PCT DP Required</option>
                    <option>EOM</option>
                    <option>NET 10</option>
                  </CFormSelect>
                  </CCol>
                  <CCol md={3}>
                  <CFormSelect 
                    id="payment_mode" 
                    label="Payment Mode" 
                    name="payment_mode"
                    onChange={onInputChange}
                    >
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
                    name="business_posting_group"
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                    />
                  </CCol>
                  <CCol md={4}>
                  <CFormInput
                    label="VAT Posting Group" 
                    type="text"
                    id="vat_posting_group"
                    name="vat_posting_group"
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                  />
                  </CCol>
                  <CCol md={4}>
                  <CFormInput
                    label="Vendor Posting Group" 
                    type="text"
                    id="vendor_posting_group"
                    name="vendor_posting_group"
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                  />
                  </CCol>
                  <CCol md={4}>
                  <CFormInput
                    label="Website" 
                    type="text"
                    id="website"
                    name="website"
                    feedbackValid="Looks good!"
                    onChange={onInputChange}
                  />
                  </CCol>
                  <CCol xs={12}>
                    <CButton color="primary" type="submit">
                    Submit Form
                    </CButton>
                  </CCol>
              </CForm>
              
            </CCardBody>
            </CCard>
        </CCol>
      </CRow>
    )

};
  

export default VendorUpdate