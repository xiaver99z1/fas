import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { 
  SignUp, 
  ClearSignUp 
} from '../../../store/reducers/users';
import { Link } from "react-router-dom";

import {
  CButton,
  CCard,
  CCardBody,
  CCardText,
  CCardTitle,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import { COMPANY_ROLE } from '../../../config'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'


const Register = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ClearSignUp())
  }, [dispatch])

  const { 
    signing_up, 
    errors_sign_up, 
    success_sign_up 
  } = useSelector((state) => state.user);

  const [validated, setValidated] = useState(false)

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const payload = {
      first_name,
      last_name,
      email,
      password,
      role: COMPANY_ROLE,
      status: 'active',
      provider: 'default'
    }

    dispatch(SignUp(payload))
  }

  const renderRegisterPage = () => {
    return (
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CForm    
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="form-horizontal"
              disabled={signing_up}
          >
            <h1>Register</h1>
            <div style={{margin:'10px 0 10px 0'}}>Create your account</div>
            <p>{errors_sign_up}</p>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput 
                type="text"
                placeholder="First Name"
                value={first_name}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                feedbackValid=""
                feedbackInvalid="Please enter your first name."
                autoComplete="first_name" 
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilUser} />
              </CInputGroupText>
              <CFormInput 
                type="text"
                placeholder="Last Name"
                value={last_name}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                feedbackValid=""
                feedbackInvalid="Please enter your last name."
                autoComplete="last_name" 
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3 has-validation">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                feedbackValid=""
                feedbackInvalid="Please enter your email."
                autoComplete="email" 
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                feedbackValid=""
                feedbackInvalid="Please enter your password."
                autoComplete="password" 
                required
              />
            </CInputGroup>
            <CInputGroup className="mb-4">
              <CInputGroupText>
                <CIcon icon={cilLockLocked} />
              </CInputGroupText>
              <CFormInput
                type="password"
                placeholder="Confirm Password"
                value={confirm_password}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                feedbackValid=""
                feedbackInvalid="Please enter confirm password."
                autoComplete="confirm_password" 
                required
              />
            </CInputGroup>
            <div className="d-grid">
              <CButton type="submit" disabled={signing_up} color="success">Create Account</CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    )
  }

  const renderSuccessPage = () => {
    return (
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <CCardTitle class="text-success">Register Sucess</CCardTitle>
          <CCardText>Thanks for signing up. Welcome to Mo and Bear. We are happy to have you on board.</CCardText>
          <Link to="/login">
            <CButton className="alignVertical" href="#" color="success" variant="outline" size="xs">
              Login
              </CButton>
          </Link>
        </CCardBody>
      </CCard>
    )
  }

  const renderLoadingPage = () => {
    return (
      <CCard className="mx-4">
        <CCardBody className="p-4">
          <center><CCardText>Signing Up...</CCardText></center>
        </CCardBody>
      </CCard>
    )
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            {signing_up ? renderLoadingPage() : !success_sign_up ?  renderRegisterPage() : renderSuccessPage()}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
