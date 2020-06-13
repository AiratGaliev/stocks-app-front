import React, { Component, forwardRef } from "react";
import MaterialTable from "material-table";
import styles from "../../styles";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

class StocksTable extends Component {
  convertDataForTable = (data) => {
    let newData = {};
    let oldData = Array.from(data);
    if (Object.keys(oldData.length !== 0)) {
      oldData.forEach((company) => {
        newData[company.id] = company.name;
      });
      return newData;
    }
  };

  render() {
    const {
      stocks,
      companies,
      onDelClick,
      handleChangeSubmit,
      handleNewDataSubmit,
    } = this.props;
    return (
      <MaterialTable
        icons={tableIcons}
        title="List of all Stocks"
        columns={[
          {
            title: "Date",
            field: "date",
            type: "date",
            editable: "always",
          },
          {
            title: "Stock",
            field: "companyId",
            lookup: this.convertDataForTable(companies),
            editable: "onAdd",
          },
          { title: "Price", field: "price", type: "numeric" },
        ]}
        data={stocks}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleNewDataSubmit(newData);
                resolve();
              }, 600);
            }),
          onRowUpdate: (newRowData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleChangeSubmit(newRowData);
                resolve();
              }, 600);
            }),
          onRowDelete: (rowData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                onDelClick(rowData.id);
                resolve();
              }, 600);
            }),
        }}
      />
    );
  }
}

export default styles(StocksTable);
