import React, {memo} from 'react';
import {
    CCol,
    CFormSelect,
    CFormTextarea,
    CRow
} from '@coreui/react-pro'

function PoAdd3rdRow(props){
    const {
        remark,
        warehouse_id,
        fulfillment_expiry_date,

        onRemark,
        onWarehouseId,
        onFulfillmentExpiryDate,
    } = props;

    return (
        <CRow xs={{ gutterY: 2 }}>
            <CCol md={3}>
            <CFormTextarea 
                label="Remark"
                id="remark"
                rows="2"
                text="Remark description"
                defaultValue={remark}
                onBlur={(e) => onRemark(e.target.value)}
            />
            </CCol>
            <CCol md={3}>
            <CFormSelect 
                label="Warehouse Name"
                id="warehouse_id" 
                defaultValue={warehouse_id}
                onChange={(e) => onWarehouseId(e.target.value)}
            >
                <option value="1">Receiving Warehouse[1]</option>
                <option value="2">Warehouse#2[2]</option>
            </CFormSelect>
            </CCol>
            <CCol md={3}>
            <CFormSelect 
                disabled
                label="PO expiry in days"
                id="fulfillment_expiry_date" 
                defaultValue={fulfillment_expiry_date}
                onChange={(e) => onFulfillmentExpiryDate(e.target.value)}
            >
                <option value="1">30[1]</option>
            </CFormSelect>
            </CCol>
        </CRow>
    )
}

export default memo(PoAdd3rdRow);