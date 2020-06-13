import React, { Component } from "react";
import styles from "../../styles";
import PropTypes from "prop-types";
import {
  getStocks,
  editStock,
  deleteStock,
  modalStatus,
} from "../../actions/stockActions";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";
import StocksTable from "./StocksTable";
import StocksChart from "./StocksChart";
import StockCreateModal from "./StockCreateModal";
import { Button } from "@material-ui/core";

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

  handleChangeSubmit = (newRowData) => {
    const stock = {
      price: newRowData.price,
      id: newRowData.id,
    };
    this.props.editStock(stock);
  };

  onDelClick = (id) => {
    this.props.deleteStock(id);
  };

  render() {
    const { classes } = this.props;
    const { open, stocks, companies } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleOpen}>
          Create Stock
        </Button>
        <StockCreateModal
          data={companies}
          classes={classes}
          open={open}
          onClose={this.handleClose}
        />
        <StocksTable
          classes={classes}
          data={stocks}
          onDelClick={this.onDelClick}
          handleChangeSubmit={this.handleChangeSubmit}
        />
        <StocksChart stocks={stocks} companies={companies} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stocks: state.stock.stocks,
  companies: state.company.companies,
  open: state.stock.open,
  price: state.stock.price,
  id: state.stock.id,
});

const mapDispatchToProps = (dispatch) => ({
  getStocks: () => dispatch(getStocks()),
  editStock: (stock) => dispatch(editStock(stock)),
  getCompanies: () => dispatch(getCompanies()),
  deleteStock: (id) => dispatch(deleteStock(id)),
  modalStatus: (status) => dispatch(modalStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(styles(Stocks));
