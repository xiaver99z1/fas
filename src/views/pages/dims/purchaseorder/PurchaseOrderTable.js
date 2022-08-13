import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-pro'
import { DatabaseAPI } from 'src/components'

const PurchaseOrderTable = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Purchase Order</strong> <small>All Records</small>
          </CCardHeader>
          <CCardBody>
            <DatabaseAPI tablename='/items/po_header' querytype='fields=' query='po_number,po_date,dr_status,status' uid='po_header_id'/>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default PurchaseOrderTable