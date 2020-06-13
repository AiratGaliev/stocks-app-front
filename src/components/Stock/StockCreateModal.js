import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStock } from "../../actions/stockActions";
import { getCompanies, createCompany } from "../../actions/companyActions";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button } from "@material-ui/core";
import styles from "../../styles";
import moment from "moment";

class StockCreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(Date.now()).format("YYYY-MM-DD"),
      companyName: "",
      companyId: "",
      price: "",
    };
  }

  handleChange = (name) => (event, selectedItem) => {
    const data = event.target.value;
    this.setState({ ...this.state, [name]: data });
    if (selectedItem != null || typeof selectedItem !== "undefined")
      this.setState({ companyId: selectedItem.id });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const stock = {
      date: this.state.date,
      companyName: this.state.companyName,
      companyId: this.state.companyId,
      price: this.state.price,
    };
    this.props.createStock(stock);
    this.props.onClose();
  };

  render() {
    const { data } = this.props;
    const defaultProps = {
      options: data,
      getOptionLabel: (option) => option.name,
    };
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
                id="date"
                label="Date"
                type="date"
                margin="normal"
                defaultValue={this.state.date}
                onChange={this.handleChange("date")}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Autocomplete
                {...defaultProps}
                id="debug"
                freeSolo
                onChange={this.handleChange("companyId")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={this.handleChange("companyName")}
                    label="Stock"
                    margin="normal"
                  />
                )}
              />
              <TextField
                id="standard-number"
                label="Price"
                type="number"
                onChange={this.handleChange("price")}
                margin="normal"
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
  stock: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  createStock: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  createCompany: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
  company: state.company,
});

export default connect(mapStateToProps, {
  createStock,
  getCompanies,
  createCompany,
})(styles(StockCreateModal));
