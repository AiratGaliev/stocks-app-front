import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStock } from "../../actions/stockActions";
import { getCompanies } from "../../actions/companyActions";
import styles from "../../styles";

class StockCreateModal extends Component {
  render() {
    const { open, onClose, classes } = this.props;
    return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
        </Fade>
      </Modal>
    );
  }
}

StockCreateModal.propTypes = {
  stock: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  createStock: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
  company: state.company,
});

export default connect(mapStateToProps, { createStock, getCompanies })(
  styles(StockCreateModal)
);
