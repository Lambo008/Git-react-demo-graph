import React from "react";
import Papa from "papaparse";
import { Navbar } from "react-bootstrap";

import CanvasJSReact from "./assets/canvas-chart-js/canvasjs.react";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      dataArray: [],
      loading:true
    };

    this.getData = this.getData.bind(this);
    this.show_data = this.show_data.bind(this);
  }

  componentWillMount() {
    this.getCsvData();
  }

  getData(result) {
    // setting data to state.
    this.setState({ data: result.data });
    this.show_data();
  }

  async getCsvData() {
    //data loading from csv file
    var csvFilePath = require("./assets/data/data.csv"); 
    Papa.parse(csvFilePath, {
      header: false,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.getData,
    });
  }
  show_data() {
    this.inserting_data();
  }

  inserting_data() {
    var dataSeries = { type: "line" };
    const data = [];
    // eslint-disable-next-line array-callback-return
    this.state.data.map((e) => {
      var element = { x: parseFloat(e[0]), y: parseFloat(e[1]) };
      data.push(element);
    });
    dataSeries.dataPoints = data;

    //set graph data array and render graph
    this.setState({
      dataArray: dataSeries,
      loading:false
    });
  }
  render() {
    // Your render function

    var data = [];
    data.push(this.state.dataArray); // graph data with x axis and y axis value
    const { loading } = this.state;
    // graph option
    const options = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: "Try Zooming - Panning",
      },
      axisY: {
        includeZero: true,
      },
      data: data, // inserting data 
    };
    
    return (
      <div className="col-md-12">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand className="ml-4">
            {"     "}
            React Demo Graph with .csv file
          </Navbar.Brand>
        </Navbar>
        <br />
        
        {loading ? <Loader
         className="spinner"
         type="ThreeDots"
         color="#00BFFF"
         height={200}
         width={200}
 
      /> : <CanvasJSChart options={options} onRef={(ref) => (this.chart = ref)} />}
        
      </div>
    );
  }
}
export default Graph;
