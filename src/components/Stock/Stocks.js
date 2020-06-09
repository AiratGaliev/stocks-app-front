import React, { Component } from "react";
import styles from "../../styles";
import PropTypes from "prop-types";
import { getStocks, deleteStock } from "../../actions/stockActions";
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

  onDelClick = (id) => {
    this.props.deleteStock(id);
  };

  render() {
    const { stocks, companies } = this.state;
    return (
      <div>
        <StocksTable data={stocks} onDelClick={this.onDelClick} />
        <StocksChart stocks={stocks} companies={companies} />
      </div>
    );
  }
}

Stocks.protoTypes = {
  stock: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  getStocks: PropTypes.func.isRequired,
  deleteStock: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
  company: state.company,
});

export default connect(mapStateToProps, {
  getStocks,
  getCompanies,
  deleteStock,
})(styles(Stocks));
