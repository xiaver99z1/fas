import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { CCardBody, CSmartTable } from '@coreui/react-pro'

const DatabaseAPI = (props) => {
  const { tablename, querytype, query, link, uid } = props

  const _href = `${process.env.REACT_APP_DIRECTUS_URL}${tablename}?access_token=${process.env.REACT_APP_DIRECTUS_TOKEN}&${querytype}${query}`

  const [tableItems, setCurrentData] = useState([])
  const [loading, setLoading] = useState(false)

  const directusItems = async () => {
    try {
      const res = await axios.get(`${_href}`)
        setCurrentData(res.data.data)
        setLoading(true)
        
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    directusItems()
  }, [directusItems])

  return (
    <CCardBody>
      <CSmartTable
        columnFilter
        columnSorter
        items={tableItems}
        itemsPerPage={8}
        pagination
        tableProps={{
          hover: true,
          responsive: true,
        }}
      />
    </CCardBody>
  )
}

DatabaseAPI.propTypes = {
  tablename: PropTypes.string,
  querytype: PropTypes.string,
  query: PropTypes.string,
  link: PropTypes.string,
}

export default React.memo(DatabaseAPI)