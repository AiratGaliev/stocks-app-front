import React, { Component } from "react";
import styles from "../../styles";
import PropTypes from "prop-types";
import { getStocks, editStock, deleteStock } from "../../actions/stockActions";
import { getCompanies } from "../../actions/companyActions";
import { connect } from "react-redux";
import StocksTable from "./StocksTable";
import StocksChart from "./StocksChart";

class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
      companies: [],
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
    const { stocks, companies } = this.state;
    return (
      <div>
        <StocksTable
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
