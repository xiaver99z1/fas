import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

import {
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
} from '@coreui/react-pro';

import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

// import { login, register } from '../../../store/features/authSlice';
import { SignIn, ClearSignIn } from '../../../store/reducers/users';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // SALT should be created ONE TIME upon sign up
  const salt = bcrypt.genSaltSync(10)

  useEffect(() => {
    dispatch(ClearSignIn())
  }, [dispatch])

  const { signing_in, errors_sign_in, success_sign_in } = useSelector((state) => state.user);

  const [validated, setValidated] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const hashedPassword = bcrypt.hashSync(password, salt)

    const payload = {
      email,
      password:hashedPassword,
    }

    dispatch(SignIn(payload)).then(()=>{
      setValidated(true)
    })
  }
  

  const renderLoginForm = () => {
      return (
        <CForm    
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className="form-horizontal"
          disabled={signing_in}
        >
          <h1>Login</h1>
          <p className="text-medium-emphasis">Sign In to your account</p>
          <CInputGroup className="mb-3">
            <CInputGroupText>
              <CIcon icon={cilUser} />
            </CInputGroupText>
            <CFormInput 
              id="email"
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
          <CInputGroup className="mb-4">
            <CInputGroupText>
              <CIcon icon={cilLockLocked} />
            </CInputGroupText>
            <CFormInput
              id="password"
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
          <CRow>
            <CCol xs={6}>
              <CButton color="primary" className="px-4" type="submit">
                Login
              </CButton>
            </CCol>
            <CCol xs={6} className="text-right">
              <CButton color="link" className="px-0">
                Forgot password?
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      )
  }

  const renderSuccessPage = () => {
    return (
      <CCard className="mx-4" style={{marginTop:-120}}>
        <CCardBody className="p-4">
          <CCardTitle class="text-success">Authenticated!</CCardTitle>
          <CCardText>You will redirecting to the dashboard page.</CCardText>
        </CCardBody>
      </CCard>
    )
  }

  const renderLoadingPage = () =>  <div><center>Signing In...</center></div>

  const renderLoginPage = () => {
    return (
      <>
      <CCard className="p-4">
        <CCardBody>
        {signing_in ? renderLoadingPage() : renderLoginForm()}
        </CCardBody>
      </CCard>
      <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
        <CCardBody className="text-center">
          <div>
            <h2>Sign up</h2>
            <Link to="/register">
              <CButton color="primary" className="mt-3" active tabIndex={-1} onClick={() => navigate('/register')}>
                Register Now!
              </CButton>
            </Link>
          </div>
        </CCardBody>
      </CCard>
      </>
    )
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
            {success_sign_in ? renderSuccessPage() : renderLoginPage()}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
