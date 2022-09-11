import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CToast, CToastHeader, CToastBody } from '@coreui/react-pro';


const AppToast = (props) => {

const { time, titulo, mensahe } = props

return (
   <CToast autohide={false} visible={true}>
      <CToastHeader closeButton>
         <svg
            className="rounded me-2"
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
         >
            <rect width="100%" height="100%" fill="#007aff"></rect>
         </svg>
         <strong className="me-auto">{titulo}</strong>
         <small>{time}</small>
      </CToastHeader>
      <CToastBody>{mensahe}</CToastBody>
   </CToast>
   )
}

AppToast.propTypes = {
   titulo: PropTypes.string,
   time: PropTypes.string,
   mensahe: PropTypes.string,
 }
 
export default React.memo(AppToast)