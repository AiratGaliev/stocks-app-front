import React, { PureComponent } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import moment from "moment";

class StocksChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [], stocks: [] };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.stocks !== prevProps.stocks) {
      let temp = {};
      let newData = [];
      this.props.stocks.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      this.props.stocks.forEach((stock) => {
        temp = { date: Date.parse(stock.date) };
        newData.push(temp);
        temp[stock.companyName] = stock.price;
        newData.join(temp);
      });
      this.setState({ data: newData });
    }
  }

  formatXAxis = (tickItem) => {
    return moment(tickItem).format("DD.MM.YYYY");
  };

  payloadFormatter = (name) => {
    return moment(name).format("DD.MM.YYYY");
  };

  render() {
    const { data } = this.state;
    const { companies } = this.props;
    return (
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart
          data={data}
          margin={{
            top: 60,
            right: 60,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="date"
            tickFormatter={this.formatXAxis}
            domain={["dataMin", "dataMax"]}
          >
            <Label
              value={"Дата"}
              position="right"
              style={{ textAnchor: "middle" }}
            />
          </XAxis>
          <YAxis>
            <Label
              value={"Стоимость"}
              position="top"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip labelFormatter={this.payloadFormatter} />
          <Legend />
          {companies !== undefined && companies.length > 0
            ? companies.map((company) => (
                <Line connectNulls dataKey={company.name} key={company.id} />
              ))
            : null}
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default StocksChart;
