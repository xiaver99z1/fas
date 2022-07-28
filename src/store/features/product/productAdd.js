import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CRow,
  CDatePicker,
  CFormLabel,
} from '@coreui/react-pro'
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from './productSlice';
import { useNavigate } from 'react-router-dom'


const ProductAdd = () => {
  
  //Get initial data
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector((state) => state.product.isSuccess)
  ///const productData = useSelector((state) => state.product.data)
  const [addRequestStatus, setAddRequestStatus] = useState(isSuccess)

  console.log({ addRequestStatus })

  //console.log({ isSuccess, customerData })

  //Set Fields
  const [product_name, setProductName] = useState('');
  const [company_id, setCompanyId] = useState(''); //options on company dim
  const [upc, setUpc] = useState('');
  const [upc_barcode, setUpcBarcode] = useState(''); //connect this to FAS Reference Dim
  const [sku, setSku] = useState('');
  const [sku_barcode, setSkuBarcode] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [uom, setUom] = useState('');
  const [size, setSize] = useState('');
  const [packaging_length, setPackagingLength] = useState('');
  const [packaging_width, setPackagingWidth] = useState('');
  const [packaging_height, setPackagingHeight] = useState('');
  const [net_weight, setNetWeight] = useState('');
  const [gross_weight, setGrossWeight] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [nutrition_facts, setNutritionFacts] = useState('');
  const [unit_type, setUnitType] = useState('');
  const [qty_per_unit, setQtyPerUnit] = useState('');
  const [eff_start_date, setEffStartDate] = useState('');
  const [eff_end_date, setEffEndDate] = useState('');
  const [cs_product_id, setCsProductId] = useState('');
  const [inventory_posting_group, setInventoryPostingGroup] = useState('');
  const [gen_posting_group, setGenPostingGroup] = useState('');
  const [input_vat_posting_group, setInputVatPostingGroup] = useState('');
  const [output_vat_posting_group, setOutputVatPostingGroup] = useState('');

  //Form Validation 
  const [validated, setValidated] = useState(false)
  
  const canSave = [product_name, category, sku].every(Boolean) && addRequestStatus === true;
  
  const onSavePostClicked = () => {  
    if (canSave) {
      try {
        setAddRequestStatus(true)
        dispatch(createProduct(
          { 
              product_name: product_name,
              company_id: company_id,
              upc: upc,
              upc_barcode: upc_barcode,
              sku: sku,
              sku_barcode: sku_barcode,
              category: category,
              sub_category: sub_category,
              uom: uom,
              size: size,
              packaging_length: packaging_length,
              packaging_width: packaging_width,
              packaging_height: packaging_height,
              net_weight: net_weight,
              gross_weight: gross_weight,
              ingredients: ingredients,
              nutrition_facts: nutrition_facts,
              unit_type: unit_type,
              qty_per_unit: qty_per_unit,
              eff_start_date: new Date(),
              eff_end_date: new Date(),
              cs_product_id: cs_product_id,
              inventory_posting_group: inventory_posting_group,
              gen_posting_group: gen_posting_group,
              input_vat_posting_group: input_vat_posting_group,
              output_vat_posting_group: output_vat_posting_group,
              status: 'active',
              created_by: 'test',
              updated_by: 'test',
              date_created: new Date(),
              date_updated: new Date(),
            
          })).unwrap()
            setProductName('')
            setCompanyId('')
            setUpc('')
            setUpcBarcode('')
            setSku('')
            setSkuBarcode('')
            setCategory('')
            setSubCategory('')
            setUom('')
            setSize('')
            setPackagingLength('')
            setPackagingWidth('')
            setPackagingHeight('')
            setNetWeight('')
            setGrossWeight('')
            setIngredients('')
            setNutritionFacts('')
            setUnitType('')
            setQtyPerUnit('')
            setEffStartDate('')
            setEffEndDate('')
            setCsProductId('')
            setInventoryPostingGroup('')
            setGenPostingGroup('')
            setInputVatPostingGroup('')
            setOutputVatPostingGroup('')
      
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
    navigate(`/products`)
  }

  return (
   <CRow>
     <CCol xs={12}>
       <CCard className="mb-4">
         <CCardHeader>
           <strong>Add New Product</strong> <small></small>
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
                 feedbackValid="Looks good!"
                 value={1}
                 onChange={(e) => setCompanyId(e.target.value)}
                 disabled
               />
             </CCol>
             <CCol md={6}>
              <CFormInput
                 label="Product Name" 
                 type="text"
                 id="product_name"
                 feedbackValid="Looks good!"
                 onChange={(e) => setProductName(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={2}>
              <CFormInput
                 label="UOM" 
                 type="text"
                 id="uom"
                 feedbackValid="Looks good!"
                 onChange={(e) => setUom(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={2}>
              <CFormInput
                 label="CS Product Id" 
                 type="text"
                 id="cs_Product_id"
                 feedbackValid="Looks good!"
                 onChange={(e) => setCsProductId(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={3}>
              <CFormInput
                 label="Category" 
                 type="text"
                 id="category"
                 feedbackValid="Looks good!"
                 onChange={(e) => setCategory(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Sub Category" 
                 type="text"
                 id="sub_category"
                 feedbackValid="Looks good!"
                 onChange={(e) => setSubCategory(e.target.value)}
               />
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={3}>
              <CFormInput
                 label="UPC" 
                 type="text"
                 id="upc"
                 feedbackValid="Looks good!"
                 onChange={(e) => setUpc(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="UPC Barcode" 
                 type="text"
                 id="upc_barcode"
                 feedbackValid="Looks good!"
                 onChange={(e) => setUpcBarcode(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="SKU" 
                 type="text"
                 id="sku"
                 feedbackValid="Looks good!"
                 onChange={(e) => setSku(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="SKU Barcode" 
                 type="text"
                 id="sku_barcode"
                 feedbackValid="Looks good!"
                 onChange={(e) => setSkuBarcode(e.target.value)}
                 required
               />
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={3}>
              <CFormInput
                 label="Size" 
                 type="text"
                 id="size"
                 feedbackValid="Looks good!"
                 onChange={(e) => setSize(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Packaging Length" 
                 type="text"
                 id="packaging_length"
                 feedbackValid="Looks good!"
                 onChange={(e) => setPackagingLength(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Packaging Width" 
                 type="text"
                 id="packaging_width"
                 feedbackValid="Looks good!"
                 onChange={(e) => setPackagingWidth(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Packaging Height" 
                 type="text"
                 id="packaging_height"
                 feedbackValid="Looks good!"
                 onChange={(e) => setPackagingHeight(e.target.value)}
               />
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={3}>
              <CFormInput
                 label="Net Weight" 
                 type="text"
                 id="net_weight"
                 feedbackValid="Looks good!"
                 onChange={(e) => setNetWeight(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Gross Weight" 
                 type="text"
                 id="gross_weight"
                 feedbackValid="Looks good!"
                 onChange={(e) => setGrossWeight(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Unit Type" 
                 type="text"
                 id="unit_type"
                 feedbackValid="Looks good!"
                 onChange={(e) => setUnitType(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
              <CFormInput
                 label="Qty Per Unit" 
                 type="text"
                 id="qty_per_unit"
                 feedbackValid="Looks good!"
                 onChange={(e) => setQtyPerUnit(e.target.value)}
               />
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={6}>
              <CFormTextarea
                  id="ingredients"
                  label="Ingredients"
                  rows="3"
                  text="One ingredient per line"
                  onChange={(e) => setIngredients(e.target.value)}
                ></CFormTextarea>
             </CCol>
             <CCol md={6}>
              <CFormTextarea
                  id="nutrition_facts"
                  label="Nutrition Facts"
                  rows="3"
                  text="One nutrition fact per line"
                  onChange={(e) => setNutritionFacts(e.target.value)}
                ></CFormTextarea>
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={3}>
               <CFormInput
                 label="Inventory Posting Group" 
                 type="text"
                 id="inventory_posting_group"
                 feedbackValid="Looks good!"
                 onChange={(e) => setInventoryPostingGroup(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Gen Posting Group" 
                 type="text"
                 id="gen_posting_group"
                 feedbackValid="Looks good!"
                 onChange={(e) => setGenPostingGroup(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Input VAT Posting Group" 
                 type="text"
                 id="input_vat_posting_group"
                 feedbackValid="Looks good!"
                 onChange={(e) => setInputVatPostingGroup(e.target.value)}
               />
             </CCol>
             <CCol md={3}>
               <CFormInput
                 label="Output VAT Posting Group" 
                 type="text"
                 id="outputt_vat_posting_group"
                 feedbackValid="Looks good!"
                 onChange={(e) => setOutputVatPostingGroup(e.target.value)}
               />
             </CCol>
             <CCol md={12}></CCol>
             <CCol md={4}>
              <CFormLabel htmlFor="eff_start_date">Eff Start Date</CFormLabel>
              <CDatePicker 
                id="eff_start_date"
                locale="en-US" 
                footer
              />
             </CCol>
             <CCol md={4}>
              <CFormLabel htmlFor="eff_end_date">Eff End Date</CFormLabel>
              <CDatePicker 
                id="eff_end_date"
                locale="en-US" 
                footer
              />
             </CCol>
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

export default ProductAdd