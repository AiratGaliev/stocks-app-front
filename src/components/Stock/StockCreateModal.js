import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createCompany } from "../../actions/companyActions";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
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
      <Dialog
        className={classes.modal}
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create new stock company, please enter new name.
          </DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Name"
            type="string"
            margin="dense"
            fullWidth
            onChange={this.handleChangeSubmit("name")}
            className={classes.textField}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
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
