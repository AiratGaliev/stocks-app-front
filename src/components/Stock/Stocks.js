import React, { Component } from "react";
import styles from "../../styles";
import PropTypes from "prop-types";
import { getStocks, editStock, deleteStock } from "../../actions/stockActions";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";
import StocksTable from "./StocksTable";
import StocksChart from "./StocksChart";
import StockCreateModal from "./StockCreateModal";
import { Button } from "@material-ui/core";

class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      companies: [],
      open: false,
    };
  }

  componentDidMount() {
    this.props.getStocks();
    this.props.getCompanies();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      this.props.stock !== prevProps.stock ||
      this.props.company !== prevProps.company
    ) {
      this.setState({
        stocks: this.props.stock.stocks,
        companies: this.props.company.companies,
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  rowsChange = (newData) => {
    this.setState({ stocks: newData });
    this.props.getStocks();
  };

  onSubmit = (newData) => {
    const stock = {
      price: newData.price,
      id: newData.id,
    };
    this.props.editStock(stock);
  };

  onDelClick = (id) => {
    this.props.deleteStock(id);
  };

  render() {
    const { classes } = this.props;
    const { open, stocks, companies } = this.state;
    return (
      <div>
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
          data={stocks}
          onSubmit={this.onSubmit}
          onDelClick={this.onDelClick}
          rowsChange={this.rowsChange}
        />
        <StocksChart stocks={stocks} companies={companies} />
      </div>
    );
  }
}

Stocks.protoTypes = {
  stock: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  getStocks: PropTypes.func.isRequired,
  editStock: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
  company: state.company,
});

export default connect(mapStateToProps, {
  getStocks,
  editStock,
  getCompanies,
  deleteStock,
})(styles(Stocks));
