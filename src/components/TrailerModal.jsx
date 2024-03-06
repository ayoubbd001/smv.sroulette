import React from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

export default function TrailerModal({
  trailers,
  handleShow,
  isShow,
  mv_title,
}) {
  return (
    <>
      <Modal show={isShow} fullscreen={true} onHide={() => handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{mv_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {trailers[0] && (
            <div className="iframe_trl_box  my-3">
              <iframe
                src={`https://www.youtube.com/embed/${trailers[0].key}`}
                width={"100%"}
                height={"500px"}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

TrailerModal.proptypes = {
  trailers: PropTypes.array,
  handleShow: PropTypes.func,
  isShow: PropTypes.bool,
};
