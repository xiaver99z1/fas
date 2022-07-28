import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from './userSlice';
import { useNavigate } from 'react-router-dom'

const UserAdd = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.user.isSuccess)
  const userData = useSelector((state) => state.user.data)
  const [addRequestStatus, setAddRequestStatus] = useState(isSuccess)

  console.log({ addRequestStatus, userData })

  //console.log({ isSuccess, customerData })

  //Set Fields
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState(''); //options on company dim
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [avatar, setAvatar] = useState('');
  const [role, setRole] = useState('');

  //Form Validation 
  const [validated, setValidated] = useState(false)
  
  const canSave = [first_name, last_name, email].every(Boolean) && addRequestStatus === true;
  
  const onSavePostClicked = () => {  
    if (canSave) {
      try {
        setAddRequestStatus(true)
        dispatch(createUser(
          { 
              first_name: first_name,
              last_name: last_name,
              email: email,
              password: password,
              location: location,
              title: title,
              avatar: avatar,
              role: role
          })).unwrap()

          setFirstName('')
          setLastName('')
          setEmail('')
          setPassword('')
          setLocation('')
          setTitle('')
          setAvatar('')
          setRole('')
      
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
    navigate(`/users`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add New User</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={2}>
                <CFormInput
                  label="Title"
                  type="text"
                  id="title"
                  feedbackValid="Looks good!"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </CCol>
              <CCol md={5}>
                <CFormInput
                  label="First Name"
                  type="text"
                  id="first_name"
                  feedbackValid="Looks good!"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </CCol>
              <CCol md={5}>
                <CFormInput
                  label="Last Name"
                  type="text"
                  id="last_name"
                  feedbackValid="Looks good!"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Email"
                  type="text"
                  id="email"
                  feedbackValid="Looks good!"
                  placeholder="Enter a valid email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Password"
                  type="password"
                  id="password"
                  feedbackValid="Looks good!"
                  placeholder="Login password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Location"
                  type="text"
                  id="location"
                  feedbackValid="Looks good!"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </CCol>
              
              <CCol md={6}>
                <CFormInput
                  label="Avatar"
                  type="text"
                  id="avatar"
                  feedbackValid="Looks good!"
                  onChange={(e) => setAvatar(e.target.value)}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Role"
                  type="text"
                  id="role"
                  feedbackValid="Looks good!"
                  onChange={(e) => setRole(e.target.value)}
                />
              </CCol>
              <CCol xs={12}></CCol>
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

export default UserAdd
