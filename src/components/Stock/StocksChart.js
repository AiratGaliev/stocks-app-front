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
  convertDataForChart = (data) => {
    let temp = {};
    let newData = [];
    let oldData = Array.from(data);
    oldData.forEach((stock) => {
      temp = { date: this.parseDate(stock.date) };
      newData.push(temp);
      temp[stock.companyName] = stock.price;
      newData.join(temp);
    });
    return newData;
  };

  parseDate = (date) => {
    return Date.parse(date);
  };

  dateFormatter = (item) => {
    return moment(item).format("DD.MM.YYYY");
  };

  render() {
    const { stocks, companies } = this.props;
    return (
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart
          data={this.convertDataForChart(stocks)}
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
            tickFormatter={this.dateFormatter}
            domain={["dataMin", "dataMax"]}
          >
            <Label
              value={"Date"}
              position="right"
              style={{ textAnchor: "middle" }}
            />
          </XAxis>
          <YAxis>
            <Label
              value={"Price"}
              position="top"
              style={{ textAnchor: "middle" }}
            />
          </YAxis>
          <Tooltip labelFormatter={this.dateFormatter} />
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
