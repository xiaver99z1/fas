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
import { useNavigate, useParams } from 'react-router-dom';
import { getVendors, selectVendorById, updateVendor } from './../../../../store/reducers/vendorSlice';
import { getCurrencies } from '../../../../store/reducers/references/currencySlice';
import { getCountries } from '../../../../store/reducers/references/countrySlice';
import { getPaymentTerms } from '../../../../store/reducers/references/paymenttermSlice';
import { getPostingGroups } from '../../../../store/reducers/references/postinggroupSlice';
import { getPaymentModes } from '../../../../store/reducers/references/paymentmodeSlice';


const VendorUpdate = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const formatYmd = date => date.toISOString().slice(0, 10);

  const { id } = useParams();
  
  //Load data
  useEffect(() => {
    dispatch(getVendors());
  },[dispatch]);
  

  //Get references - initial data
  const { apistatus } = useSelector((state) => state.vendor);
  const vendors = useSelector((state) => selectVendorById(state, Number(id)));

  useEffect(() => {
    if(apistatus === 'success') {
      dispatch(getCurrencies());
      dispatch(getCountries());
      dispatch(getPaymentTerms());
      dispatch(getPostingGroups());
      dispatch(getPaymentModes());
    }
  },[dispatch])

  const showCurrencies = useSelector(state => state.currency.currencies);
  const showCountries = useSelector(state => state.country.countries);
  const showPaymentTerms = useSelector(state => state.paymentterm.paymentterms);
  const showPaymentModes = useSelector(state => state.paymentmode.paymentmodes);
  const showPostingGroups = useSelector(state => state.postinggroup.postinggroups);


  /*Form data
  const [vendorId, setVendorId] = useState(id);
  const [vendorName, setVendorName] = useState(data?.vendor_name);
  const [vendorType, setVendorType] = useState(data?.vendor_type);
  const [emailAddress, setEmail] = useState(data?.email);
  const [vendorStatus, setVendorStatus] = useState(data?.status);
  const [phoneNumber, setPhoneNumber] = useState(data?.phone_number);
  const [mobileNumber, setMobileNumber] = useState(data?.mobile_number);
  const [address1, setAddress1] = useState(data?.address1);
  const [address2, setAddress2] = useState(data?.address2);
  const [city, setCity] = useState(data?.city);
  const [province, setProvince] = useState(data?.province);
  const [post_code, setPostCode] = useState(data?.post_code);
  const [country_abbr, setCountry] = useState(data?.country_abbr);
  const [payment_terms, setPaymentTerms] = useState(data?.payment_terms);
  const [payment_mode, setPaymentMode] = useState(data?.payment_mode);
  const [contact_person_first_name, setContactFirstName] = useState(data?.contact_person_first_name);
  const [contact_person_last_name, setContactLastName] = useState(data?.contact_person_last_name);
  const [bank_name, setBankName] = useState(data?.bank_name);
  const [bank_account_number, setBankAccountNumber] = useState(data?.bank_account_number);
  const [currency_code, setCurrencyCode] = useState(data?.currency_code);
  const [business_posting_group, setBusinessPostingGroup] = useState(data?.business_posting_group);
  const [vat_posting_group, setVatPostingGroup] = useState(data?.vat_posting_group);
  const [vendor_posting_group, setVendorPostingGroup] = useState(data?.vendor_posting_group);
  const [website, setWebsite] = useState(data?.website);
  const [created_by, setCreatedBy] = useState(data?.created_by);
  const [updated_by, setUpdatedBy] = useState(data?.updated_by);
  const [date_created, setDateCreated] = useState(data?.date_created);
  */

  const [vendorId, setVendorId] = useState(id);
  const [vendorName, setVendorName] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [vendorStatus, setVendorStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
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
  const [created_by, setCreatedBy] = useState('');
  const [updated_by, setUpdatedBy] = useState('');
  const [date_created, setDateCreated] = useState('');


  //Form validation 
  const [validated, setValidated] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [requestStatus, setRequestStatus] = useState('idle');

  const canSave = [vendorName, vendorStatus].every(Boolean) && requestStatus === 'idle' && updated === false;

  console.log(id, vendors);
  /*
  vendors.filter((post) => {
    if(post.vendor_id === id) {
      console.log(post.vendor_name);
    }
  })*/
    

  const onSavePostClicked = () => {  
    if (canSave) {
      try {
        setRequestStatus('pending');
        dispatch(updateVendor({
          vendor_id: vendorId, 
          vendor_name: vendorName, 
          vendor_type: vendorType, 
          email: emailAddress, 
          phone_number: phoneNumber,
          mobile_number: mobileNumber,
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
          status: vendorStatus,
          created_by,
          updated_by,
          date_created,
          date_updated: new Date().toISOString(),
        })).unwrap()

        setVendorId('')
        setVendorName('')
        setVendorType('')
        setEmail('')
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
        setContactFirstName('')
        setContactLastName('')
        setBankName('')
        setBankAccountNumber('')
        setCurrencyCode('')
        setBusinessPostingGroup('')
        setVatPostingGroup('')
        setVendorPostingGroup('')
        setWebsite('')
        setVendorStatus('')
        
        navigate(`/vendor/${id}`);
        
      } catch (err) {
        console.error('Failed to save the post', err);
      } finally {
        setRequestStatus('idle');
        setUpdated(true);
      }
    }
  }

  //Submit Form
  const handleSubmit = (e) => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      onSavePostClicked();
    }
    setValidated(true);
  }

  const handleBack = () => {
    return navigate('/vendors');
  }

  return (

   <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
           <strong>Update Vendor ID: {id}</strong> <small></small>
         </CCardHeader>
         <CCardBody>
           <CForm className="row g-3 needs-validation"
             noValidate
             validated={validated}
             onSubmit={handleSubmit}
           >
            <CRow xs={{ gutterY: 1 }}>
              <CCol md={6}>
                <CFormInput
                  label="Vendor Name" 
                  type="text"
                  id="vendor_name"
                  feedbackValid="Looks good!"
                  defaultValue={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormSelect 
                  id="vendor_type" 
                  label="Vendor Type" 
                  onChange={(e) => setVendorType(e.target.value)}
                  defaultValue={vendorType}>
                  <option>AS</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
               <CFormSelect 
                id="vendorStatus"
                label="Status" 
                defaultValue={vendorStatus} 
                onChange={(e) => setVendorStatus(e.target.value)} 
                required>
                  <option>active</option>
                  <option>deleted</option>
                  <option>pending</option>
               </CFormSelect>
             </CCol>
            </CRow>
            <CRow xs={{ gutterY: 1 }}>
              <CCol md={3}>
               <CFormInput
                 label="Email" 
                 type="text"
                 id="email"
                 defaultValue={emailAddress}
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
                   defaultValue={phoneNumber}
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
                   defaultValue={mobileNumber}
                   feedbackValid="Looks good!"
                   onChange={(e) => setMobileNumber(e.target.value)}
                 />
               </CInputGroup>
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Website" 
                  type="text"
                  id="website"
                  name="website"
                  placeholder="https://"
                  defaultValue={website}
                  feedbackValid="Looks good!"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow xs={{ gutterY: 3 }}>
              <CCol md={6}>
                <CFormInput 
                  label="Address 1" 
                  type="text"
                  id="address1"
                  defaultValue={address1}
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
                  defaultValue={address2}
                  feedbackValid="Looks good!"
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </CCol>
              <CCol md={3}>
                <CFormSelect id="city" name="city" label="City" onChange={(e) => setCity(e.target.value)} required>
                  <option>PH</option>
                  <option>SG</option>
                  <option>AU</option>
                </CFormSelect>
              </CCol>
              <CCol md={3}>
              <CFormInput 
                  label="Province" 
                  type="text"
                  id="province"
                  defaultValue={province}
                  feedbackValid="Looks good!"
                  onChange={(e) => setProvince(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormSelect 
                  id="country" 
                  name="country" 
                  label="Country" 
                  onChange={(e) => setCountry(e.target.value)} 
                  defaultValue={country_abbr}
                  options={showCountries && showCountries.map((post) => post.country_abbr)}
                  required
                />
              </CCol>
              <CCol md={3}>
                <CFormInput 
                  label="Post Code" 
                  type="text"
                  id={post_code}
                  defaultValue={post_code}
                  feedbackInvalid="Please provide a valid post code."
                  feedbackValid="Looks good!"
                  onChange={(e) => setPostCode(e.target.value)}
                  required
                />
              </CCol>
            </CRow>
            <CRow xs={{ gutterY: 5 }}>
             <CCol md={6}>
                <CInputGroup>
                  <CInputGroupText>Contact Person</CInputGroupText>
                  <CFormInput 
                    aria-label="First name" 
                    type="text" 
                    placeholder="First Name" 
                    defaultValue={contact_person_first_name}
                    onClick={(e)=>setContactFirstName(e.target.value)} 
                    required
                  />
                  <CFormInput 
                    aria-label="Last name" 
                    type="text" 
                    placeholder="Last Name" 
                    defaultValue={contact_person_last_name}
                    onClick={(e)=>setContactLastName(e.target.value)} 
                    required
                  />
                </CInputGroup>
                <CFormFeedback valid>Looks good!</CFormFeedback>
             </CCol>
            </CRow>
            <CRow xs={{ gutterY: 2 }}>
              <CCol md={4}>
                <CFormInput
                  label="Bank Name" 
                  type="text"
                  id="bank_name"
                  feedbackValid="Looks good!"
                  defaultValue={bank_name}
                  onChange={(e) => setBankName(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Bank Account Number" 
                  type="text"
                  id="bank_account_number"
                  defaultValue={bank_account_number}
                  feedbackValid="Looks good!"
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect 
                  id="currency_code"
                  name="currency_code"
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  label="Currency Code"
                  defaultValue={currency_code}
                  options={showCurrencies && showCurrencies.map((post) => post.currency_code)}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect 
                  id="payment_terms" 
                  name="Payment Terms" 
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  label="Payment Terms"
                  defaultValue={payment_terms}
                  options={showPaymentTerms && showPaymentTerms.map((post) => post.payment_terms)}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect 
                  id="payment_mode" 
                  name="payment_mode"
                  onChange={(e) => setPaymentMode(e.target.value)}
                  label="Payment Mode"
                  defaultValue={payment_mode}
                  options={showPaymentModes && showPaymentModes.map((post) => post.payment_mode)}
                />
              </CCol>
            </CRow>
            <CRow xs={{ gutterY: 5 }}>
              <CCol md={4}>
                <CFormSelect
                  label="Business Posting Group" 
                  id="business_posting_group"
                  name="business_posting_group"
                  defaultValue={business_posting_group}
                  feedbackValid="Looks good!"
                  onChange={(e) => setBusinessPostingGroup(e.target.value)}
                  options={showPostingGroups && showPostingGroups.map((post) => post.posting_group_type)}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="VAT Posting Group" 
                  id="vat_posting_group"
                  name="vat_posting_group"
                  defaultValue={vat_posting_group}
                  feedbackValid="Looks good!"
                  onChange={(e) => setVatPostingGroup(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Vendor Posting Group" 
                  type="text"
                  id="vendor_posting_group"
                  name="vendor_posting_group"
                  defaultValue={vendor_posting_group}
                  feedbackValid="Looks good!"
                  onChange={(e) => setVendorPostingGroup(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow xs={{ gutterY: 2 }}>
              <CCol md={3}>
                <CFormInput
                  label="Created By" 
                  type="text"
                  id="created_by"
                  defaultValue={created_by}
                  disabled
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Date Created" 
                  type="text"
                  id="date_created"
                  defaultValue={date_created}
                  disabled
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Updated By" 
                  type="text"
                  id="updated_by"
                  defaultValue={updated_by}
                  disabled
                />
              </CCol>
              <CCol md={3}>
                <CFormInput
                  label="Date Updated" 
                  type="text"
                  id="date_updated"
                  defaultValue={new Date().toISOString()}
                  disabled
                />
              </CCol>
            </CRow> 
            <CRow xs={{ gutterY: 4 }}>
              <CCol xs={2}>
                <CButton 
                  color="primary" 
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </CButton>
              </CCol>
              <CCol xs={2}>
                <CButton 
                  color="primary" 
                  type="button"
                  onClick={onSavePostClicked}
                  disabled={!canSave}
                >
                  Update Record
                </CButton>
              </CCol>
            </CRow>
           </CForm>
         </CCardBody>
       </CCard>
     </CCol>
   </CRow>

 )
}

export default VendorUpdate