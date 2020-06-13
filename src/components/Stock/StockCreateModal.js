import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createCompany } from "../../actions/companyActions";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import styles from "../../styles";

class StockCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }

  handleChangeSubmit = (name) => (event) => {
    const data = event.target.value;
    this.setState({ ...this.state, [name]: data });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const company = {
      name: this.state.name,
    };
    this.props.createCompany(company);
    this.props.onClose();
  };

  render() {
    const { open, onClose, classes } = this.props;
    return (
      <Modal
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
          <div className={classes.paper} noValidate autoComplete="off">
            <form className={classes.container} noValidate>
              <TextField
                id="name"
                label="Name"
                type="string"
                margin="normal"
                onChange={this.handleChangeSubmit("name")}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button onClick={this.onSubmit}>Save</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    );
  }
}

StockCreateModal.propTypes = {
  company: PropTypes.object.isRequired,
  createCompany: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  company: state.company,
});

const mapDispatchToProps = (dispatch) => ({
  createCompany: (company) => dispatch(createCompany(company)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(styles(StockCreateModal));
