import React, { Component } from "react";
import styles from "../../styles";
import PropTypes from "prop-types";
import { getStocks } from "../../actions/stockActions";
import { connect } from "react-redux";
import StocksTable from "./StocksTable";
import StocksChart from "./StocksChart";

class Stocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [],
    };
  }

  componentDidMount() {
    this.props.getStocks();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.stock !== prevProps.stock) {
      this.setState({ stocks: this.props.stock.stocks });
    }
  }

  render() {
    const { stocks } = this.state;
    return (
      <div>
        <StocksTable data={stocks} />
        <StocksChart />
      </div>
    );
  }
}

Stocks.protoTypes = {
  stock: PropTypes.object.isRequired,
  getStocks: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  stock: state.stock,
});

export default connect(mapStateToProps, { getStocks })(styles(Stocks));
