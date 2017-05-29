/**
 * Created by cdimonaco on 29/05/2017.
 */
import React from "react"

const ConfirmationModal = (props) => {

  const handleConfirm = (e) => {
      e.preventDefault();
      $('#' + props.id).modal('hide');
      props.confirm();
  };

  const closeModal = (e) =>{
      $('#' + props.id).modal('hide');
  };

  return(
      <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-hidden="true" style={{display: 'none'}}>
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h4 className="modal-title">{props.title}</h4>
                  </div>
                  <div className="modal-body">
                      {props.description}
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-danger" onClick={handleConfirm}>Conferma</button>
                      <input type="button" className="btn btn-default" onClick={closeModal} value="Close" />
                  </div>
              </div>
          </div>
      </div>
  )
};
export default ConfirmationModal;