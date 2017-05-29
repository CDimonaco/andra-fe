/**
 * Created by cdimonaco on 28/05/2017.
 */
import React from "react"
import PropTypes from "prop-types"


const ValuesRow = (props) => {
  if(!props.value){
      return <tr></tr>
  }
  return(
      <tr>
          <td>{props.listindex}</td>
          <td>{props.value.id}</td>
          <td>{props.value.value}</td>
          <td>{props.value.additional}</td>
          <td>{props.value.timestamp}</td>
      </tr>
  )
};

ValuesRow.propTypes = {
  value:PropTypes.object.isRequired
};

export default ValuesRow;
