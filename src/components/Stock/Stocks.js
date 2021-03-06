import React, { Component } from "react";
import styles from "../../styles";
import PropTypes from "prop-types";
import {
  getStocks,
  createStock,
  editStock,
  deleteStock,
  modalStatus,
} from "../../actions/stockActions";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";
import StocksTable from "./StocksTable";
import StocksChart from "./StocksChart";
import StockCreateModal from "./StockCreateModal";
import { Button, Container } from "@material-ui/core";

class Stocks extends Component {
  componentDidMount() {
    this.props.getStocks();
    this.props.getCompanies();
  }

  handleOpen = () => {
    this.props.modalStatus(true);
  };

  handleClose = () => {
    this.props.modalStatus(false);
  };

  handleNewDataSubmit = (newData) => {
    const stock = {
      date: newData.date,
      companyId: newData.companyId,
      price: newData.price,
    };
    this.props.createStock(stock);
  };

  handleChangeSubmit = (newRowData) => {
    const stock = {
      price: newRowData.price,
      date: newRowData.date,
      companyId: newRowData.companyId,
    };
    this.props.editStock(stock);
  };

  onDelClick = (id) => {
    this.props.deleteStock(id);
  };

  render() {
    const { classes, open, stocks, companies, errors } = this.props;
    return (
      <Container className={classes.root} container maxWidth="md">
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          Create Stock
        </Button>
        <StockCreateModal
          classes={classes}
          open={open}
          onClose={this.handleClose}
        />
        <StocksTable
          classes={classes}
          stocks={stocks}
          errors={errors}
          companies={companies}
          onDelClick={this.onDelClick}
          handleNewDataSubmit={this.handleNewDataSubmit}
          handleChangeSubmit={this.handleChangeSubmit}
        />
        <StocksChart stocks={stocks} companies={companies} />
      </Container>
    );
  }
}

Stocks.protoTypes = {
  stock: PropTypes.object.isRequired,
  getStocks: PropTypes.func.isRequired,
  createStock: PropTypes.func.isRequired,
  editStock: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
  stocks: state.stock.stocks,
  companies: state.company.companies,
  open: state.stock.open,
  price: state.stock.price,
  id: state.stock.id,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  getStocks: () => dispatch(getStocks()),
  createStock: (stock) => dispatch(createStock(stock)),
  editStock: (stock) => dispatch(editStock(stock)),
  getCompanies: () => dispatch(getCompanies()),
  deleteStock: (id) => dispatch(deleteStock(id)),
  modalStatus: (status) => dispatch(modalStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(styles(Stocks));
