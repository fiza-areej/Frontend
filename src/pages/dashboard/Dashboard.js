import React from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";
import ApexChart from "react-apexcharts"; 
import Widget from "../../components/Widget";

import Calendar from "./components/calendar/Calendar";
import Map from "./components/am4chartMap/am4chartMap";
import Rickshaw from "./components/rickshaw/Rickshaw";

import AnimateNumber from "react-animated-number";

import s from "./Dashboard.module.scss";
import { chartData, liveChart, liveChartInterval } from "./mock1";
import echarts from "echarts/lib/echarts";
import config from "./config";

// aos
import AOS from "aos";
import "aos/dist/aos.css";
import DashboardFooter from "./DashboardFooter";

const colors = config.chartColors;

let columnColors = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.red,
  colors.default,
  colors.gray,
  colors.teal,
  colors.pink,
];
let lineColors = [colors.blue, colors.green, colors.orange];

AOS.init();

class Dashboard extends React.Component {

  _isMounted = false;

  state = {
    cd: chartData,
    ld: liveChart,
    initEchartsOptions: {
      renderer: "canvas",
    },
    sparklineData: {
      series: [{ data: [1, 7, 3, 5, 7, 8] }],
      options1: {
        colors: ["#db2a34"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
      options2: {
        colors: ["#2477ff"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
    },

    options: {
      chart: {
        height: 350,
        type: "bar",
      },
      legend: {
        show: true,
        labels: {
          colors: colors.textColor,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5
        },
      },
      colors: columnColors,
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "John",
          "Joe",
          "Jake",
          "Amber",
          "Peter",
          "Mary",
          "David",
          "Lily",
        ],
        labels: {
          style: {
            colors: columnColors,
            fontSize: "14px",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            color: colors.textColor,
          },
        },
      },
      tooltip: {
        theme: "dark",
      },
      grid: {
        borderColor: colors.gridLineColor,
      },
    }
  };

  fetchData() {
    fetch('http://127.0.0.1:8000/years1/')
      .then(response => response.json())
      .then(data => {
        console.log(Array.from({ length: Object.keys(data).length }, (x, i) => i));
        const series = {
          data: Object.keys(data).map(value => parseInt(parseFloat(value)))
        };

        console.log(series)
        if (this._isMounted) {
          //console.log({ sparklineData: { ...this.state.sparklineData, series } })
          this.setState({
            sparklineData: {
              series: [{ data: Object.keys(data).map(value => parseInt(parseFloat(value))) }],
              options1: {
                colors: ["#db2a34"],
                plotOptions: {
                  bar: {
                    columnWidth: "50%",
                  },
                },
              },
              options2: {
                colors: ["#2477ff"],
                plotOptions: {
                  bar: {
                    columnWidth: "50%",
                  },
                },
              },
            }
          });



          this.setState({
            options: {
              chart: {
                height: 350,
                type: "bar",
              },
              legend: {
                show: true,
                labels: {
                  colors: colors.textColor,
                },
                itemMargin: {
                  horizontal: 10,
                  vertical: 5
                },
              },
              colors: columnColors,
              plotOptions: {
                bar: {
                  columnWidth: "45%",
                  distributed: true,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: Array.from({ length: Object.keys(data).length }, (x, i) => ('D ' + i)),
                labels: {
                  style: {
                    colors: columnColors,
                    fontSize: "14px",
                  },
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                title: {
                  text: "NO2",
                  offsetY: 115,
                  style: {
                    fontSize: "16px",
                    fontWeight: "bold"
                  }
                }
              },
              yaxis: {
                labels: {
                  style: {
                    color: colors.textColor,
                  },
                },
                title: {
                  text: "Dates",
                  style: {
                    fontSize: "16px",
                    fontWeight: "bold"
                  }
                }
              },
              tooltip: {
                theme: "dark",
              },
              grid: {
                borderColor: colors.gridLineColor,
              },
            }
          })
        }
      });
  }

  componentDidMount() {
    this._isMounted = true;
    this.fetchData();
    setInterval(() => this.fetchData(), 10000);
  }

  componentWillUnmount() {
    this._isMounted = false;
    //clearInterval(liveChartInterval);
  }



  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title" style={{color:"#12142B"}}>
          Dashboard &nbsp; <br />
          <small><br />
            <h3><strong style={{color:"#12142B"}} data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="2000" className="airquality">Air Quality Monitoring Using Remote sensing and spatial data</strong></h3>
          </small>
        </h1>
        <h5 data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-duration="2000" style={{color:"#12142B"}}>One of the major factors that influence the representativeness of data collected is the location of
          monitoring stations the
          planning and setting up of monitoring stations are complete<br /><br /></h5>
        <Row>
          <Col lg={7}>
            <Widget className="bg-transparent">
              <Map />
            </Widget>
          </Col>
          <Col lg={1} />

          {/* <Col lg={4}>
            <Widget
              title={
                <h5 data-aos="flip-left">
                  Estimate Value of <span className="fw-semi-bold">NO2</span>
         ;       </h5>
              }
              close
              collapse
            >
              <ApexChart
                className="sparkline-chart"
                height={350}
                series={this.state.sparklineData.series}
                options={this.state.options}
                type={"bar"}
              />
            </Widget>
          </Col> */}
        </Row>
        {/* footer */}
        <Row className="mt-3">
            <Col lg={12}>
              <DashboardFooter />
            </Col>
          </Row>
      </div>
    );
  }
}

export default Dashboard;
