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
import { useParams, useNavigate } from 'react-router-dom';
import { selectUser } from './../../../../store/reducers/users';
import { selectCompanies, selectCompanyId, updateCompany } from './../../../../store/reducers/companySlice';
import { getCurrencies } from '../../../../store/reducers/references/currencySlice';
import { getCountries } from '../../../../store/reducers/references/countrySlice';
import { getPaymentTerms } from '../../../../store/reducers/references/paymenttermSlice';
import { getPostingGroups, selectPostingGroups, selectPostingGroupType } from '../../../../store/reducers/references/postinggroupSlice';
import { getPaymentModes } from '../../../../store/reducers/references/paymentmodeSlice';


const CompanyUpdate = () => {

   //Get initial data
   const dispatch = useDispatch();
   const navigate = useNavigate();

   //Get router params
   const {id} = useParams();
   const { user } = useSelector(selectUser);
   const { status, error } = useSelector(selectCompanies);
   const data = useSelector((state) => selectCompanyId(state, Number(id)));

   /* Load Selection Options */
   const showPostingGroups = useSelector((state) => state.postinggroup.postinggroups);
   const showPGCustomerVat = useSelector((state) => selectPostingGroupType(state, 'Customer VAT Bus'));
   const showPGGenBus = useSelector((state) => selectPostingGroupType(state, 'Gen Bus'));
   const showCurrencies = useSelector(state => state.currency.currencies);
   const showCountries = useSelector(state => state.country.countries);
   const showPaymentTerms = useSelector(state => state.paymentterm.paymentterms);
   const showPaymentModes = useSelector(state => state.paymentmode.paymentmodes);

   console.log({showPGCustomerVat,showPGGenBus});

   //Set Fields
   const [company_name, setCompanyName] = useState(data?.company_name);
   const [company_short_name, setCompanyShortName] = useState(data?.company_short_name);
   const [email, setEmail] = useState(data?.email);
   const [phone_number, setPhoneNumber] = useState(data?.phone_number);
   const [mobile_number, setMobileNumber] = useState(data?.mobile_number);
   const [address1, setAddress1] = useState(data?.address1);
   const [address2, setAddress2] = useState(data?.address2);
   const [country_abbr, setCountry] = useState(data?.country_abbr);
   const [city, setCity] = useState(data?.city);
   const [province, setProvince] = useState(data?.province);
   const [post_code, setPostCode] = useState(data?.post_code);
   const [website, setWebsite] = useState(data?.website);
   const [tax_identification_number, setTin] = useState(data?.tax_identification_number);
   const [currency_code, setCurrencyCode] = useState(data?.currency_code);
   const [business_posting_group, setBusinessPostingGroup] = useState(data?.business_posting_group);
   const [vat_posting_group, setVatPostingGroup] = useState(data?.vat_posting_group);
   const [customer_posting_group, setCustomerPostingGroup] = useState(data?.customer_posting_group);
   const [contact_person_first_name, setContactFirstName] = useState(data?.contact_person_first_name);
   const [contact_person_last_name, setContactLastName] = useState(data?.contact_person_last_name);
   const [payment_terms, setPaymentTerms] = useState(data?.payment_terms);
   const [payment_mode, setPaymentMode] = useState(data?.payment_mode);
   const [companyStatus, setCompanyStatus] = useState(data?.companyStatus);
   const [created_by, setCreatedBy] = useState(data?.created_by);
   const [updated_by, setUpdatedBy] = useState(user.first_name);
   const [date_created, setDateCreated] = useState(data?.date_created);

   //Form validation 
   const [validated, setValidated] = useState(false);
   const [updated, setUpdated] = useState(false);
   const [requestStatus, setRequestStatus] = useState('idle');

   const canSave = [company_name, contact_person_first_name, contact_person_last_name].every(Boolean) && requestStatus === 'idle';

   console.log({data, canSave, company_name, contact_person_first_name, contact_person_last_name});
   
   //Submit Form
   const handleSubmit = (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
         event.preventDefault();
         event.stopPropagation();
      }
      const onSavePostClicked = () => {  
         if (canSave) {
         try {
            setRequestStatus('pending');
            dispatch(updateCompany({
               company_id: id, 
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
               currency_code,
               business_posting_group,
               vat_posting_group,
               customer_posting_group,
               contact_person_first_name,
               contact_person_last_name,
               payment_terms,
               payment_mode,
               companyStatus,
               status: companyStatus,
               created_by,
               updated_by,
               date_created,
               date_updated: new Date().toISOString(),
               })).unwrap()
      
               setCompanyName('');
               setCompanyShortName('');
               setEmail('');
               setPhoneNumber('');
               setMobileNumber('');
               setAddress1('');
               setAddress2('');
               setCountry('');
               setCity('');
               setProvince('');
               setPostCode('');
               setWebsite('');
               setTin('');
               setCurrencyCode('');
               setBusinessPostingGroup('');
               setVatPostingGroup('');
               setCustomerPostingGroup('');
               setContactFirstName('');
               setContactLastName('');
               setPaymentTerms('');
               setPaymentMode('');
               setCompanyStatus('');
               
               setUpdated(true);
               navigate(`/company/${id}`);
            
         } catch (err) {
               console.error('Failed to save the post', err);
         } finally {
            setRequestStatus('idle');
            setUpdated(true);
         }
         }
      }
      setValidated(true);
      onSavePostClicked();
   }

   const handleDelete = (id) => {
      if(data.status !== 'deleted') {
         //Just change status to deleted
         
         if (window.confirm("Are you sure you want to delete this company "+ id + "?")) {
         dispatch(updateCompany({company_id: id, status: 'deleted'}));
         //window.location.reload(true);
         }
      }
   };

   const handleBack = () => {
      navigate('/companies');
   }

   return (
      <CRow>
      <CCol xs={12}>
      <CCard className="mb-4">
         <CCardHeader>
            <strong>COMPANY DETAILS </strong> <small></small>
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
                        label="Company Name"
                        type="text"
                        id="company_name"
                        defaultValue={company_name}
                        onChange={(e) => setCompanyName(e.target.value)} 
                        feedbackValid="Looks good!"
                        required
                     />
                  </CCol>
                  <CCol md={3}>
                     <CFormInput
                        label="Company Short Name"
                        type="text"
                        id="company_short_name"
                        defaultValue={company_short_name}
                        feedbackValid="Looks good!"
                     />
                  </CCol>
                  <CCol md={3}>
                     <CFormSelect 
                     id="companyStatus"
                     label="Status" 
                     defaultValue={companyStatus} 
                     onChange={(e) => setCompanyStatus(e.target.value)} 
                     required>
                        <option>active</option>
                        <option>deleted</option>
                        <option>pending</option>
                     </CFormSelect>
                  </CCol>
               </CRow>
               <CRow xs={{ gutterY: 2 }}>    
                  <CCol md={4}>
                     <CFormInput
                        label="Email"
                        type="text"
                        id="email"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)} 
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
                        defaultValue={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)} 
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
                        defaultValue={mobile_number}
                        onChange={(e) => setMobileNumber(e.target.value)} 
                        feedbackValid="Looks good!"
                        required
                        />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                     </CInputGroup>
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
                     <CFormInput 
                        label="City" 
                        type="text"
                        id="city"
                        feedbackValid="Looks good!"
                        onChange={(e) => setCity(e.target.value)}
                        required
                  />
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
            
               <CRow xs={{ gutterY: 2 }}>
                  <CCol md={6}>
                     <CFormInput 
                        label="Website"
                        type="text" 
                        id="website" 
                        defaultValue={website} 
                        placeholder="https://"
                     />
                     <CFormFeedback valid></CFormFeedback>
                  </CCol>
                  <CCol md={3}>
                     <CFormLabel htmlFor="tin">TIN</CFormLabel>
                     <CFormInput
                        type="text"
                        id="tax_identification_number"
                        defaultValue={tax_identification_number}
                     />
                  </CCol>
                  <CCol md={3}>
                     <CFormSelect 
                        id="currency_code"
                        name="currency_code"
                        onChange={(e) => setCurrencyCode(e.target.value)}
                        label="Currency Code"
                        defaultValue={currency_code}
                        options={showCurrencies && showCurrencies.map((post) => post.currency_code)}
                     />
                  </CCol>
               </CRow>

               <CRow xs={{ gutterY: 4 }}> 
                  <CCol md={8}>
                     <CInputGroup>
                        <CInputGroupText>Contact Person</CInputGroupText>
                        <CFormInput 
                           id="contact_first_name"
                           aria-label="First name" 
                           placeholder="First Name"
                           type="text" 
                           defaultValue={contact_person_first_name}
                           onChange={(e) => setContactFirstName(e.target.value)}
                           required
                        />
                        <CFormInput 
                           id="contact_last_name"
                           aria-label="Last name" 
                           placeholder="Last Name"
                           type="text" 
                           defaultValue={contact_person_last_name} 
                           onChange={(e) => setContactLastName(e.target.value)}
                           required
                        />
                     </CInputGroup>
                     <CFormFeedback valid>Looks good!</CFormFeedback>
                  </CCol>
               </CRow>
               <CRow xs={{ gutterY: 2 }}> 
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
               <CRow xs={{ gutterY: 2 }}>
                  <CCol md={4}>
                     <CFormSelect
                        label="Business Posting Group" 
                        id="business_posting_group"
                        name="business_posting_group"
                        defaultValue={business_posting_group}
                        feedbackValid="Looks good!"
                        onChange={(e) => setBusinessPostingGroup(e.target.value)}
                        options={showPGGenBus}
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
                        options={showPostingGroups && showPostingGroups.map((post) => post.posting_group_type)}
                     />
                  </CCol>
                  <CCol md={4}>
                     <CFormSelect
                        label="Customer Posting Group" 
                        type="text"
                        id="customer_posting_group"
                        name="customer_posting_group"
                        defaultValue={customer_posting_group}
                        feedbackValid="Looks good!"
                        onChange={(e) => setCustomerPostingGroup(e.target.value)}
                        options={showPostingGroups && showPostingGroups.filter((post) => post.posting_group_type)}
                     />
                  </CCol>
                  </CRow>
                  <CRow xs={{ gutterY: 5 }}>
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
                  <CCol xs={12}>
                     <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton 
                        color="secondary" 
                        type="button"
                        onClick={handleBack}
                        >
                        Back
                        </CButton>
                        <CButton 
                        color="info" 
                        type="submit"
                        disabled={!canSave}
                        >
                        Update Record
                        </CButton>
                     </div>
                  </CCol>
               </CRow>
            </CForm>
         </CCardBody>
      </CCard>
      </CCol>
   </CRow>
  )
}

export default CompanyUpdate;