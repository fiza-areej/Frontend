import React from 'react';

import { Row, Col } from "reactstrap";

import Widget from "../../../components/Widget";
import ApexChart from "react-apexcharts";

import s from "./Charts.module.scss";
import { chartData, liveChart, liveChartInterval } from "./mock";
import Sparklines from "../../../components/Sparklines";
// import ApexChart from "react-apexcharts";

import ReactEchartsCore from "echarts-for-react/lib/core";

import echarts from "echarts/lib/echarts";

import config from "./config";

import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

exporting(Highcharts);
exportData(Highcharts);

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

class Charts extends React.Component {

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
    fetch('http://127.0.0.1:8000/years/')
      .then(response => response.json())
      .then(data => {
        console.log(Array.from({length: Object.keys(data).length}, (x, i) => i));
        const series = {
          data: Object.keys(data).map(value => parseInt(parseFloat(value)))
        };

        console.log(series)
          if (this._isMounted) {
            //console.log({ sparklineData: { ...this.state.sparklineData, series } })
            this.setState({sparklineData: {
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
            }});



            this.setState({options: {
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
                categories: Array.from({length: Object.keys(data).length}, (x, i) => i),
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
                  text: "Dates",
                  offsetY: 80,
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
                  text: "NO2",
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
            }})
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
    clearInterval(liveChartInterval);
  }

  render() {
    const { cd, ld, initEchartsOptions, sparklineData } = this.state;
    return (
      <div className={s.root}>
        <h1 style={{color:"rgb(18, 20, 43)"}} data-aos="fade-up"
     data-aos-duration="3000" className="page-title">
          Visual - <span className="fw-semi-bold">Charts</span>
        </h1>
        <div>
          <Row>
            <Col lg={7} xs={12}>
              <Widget data-aos="fade-down"
     data-aos-duration="2000"
                title={
                  <h5  style={{color:"#12142B"}}>
                    Estimate Value of <span className="fw-semi-bold">NO2</span>
                  </h5>
                }
                close
                collapse
              >
                <ApexChart
                  className="sparkline-chart"
                  height={350}
                  series={this.state.sparklineData.series}
                  options={this.state.options}
                  type={"line"}
                />
              </Widget>
            </Col>
            <Col lg={5} xs={12} data-aos="fade-up"
     data-aos-duration="2000">
              <Widget
                title={
                  <h5 style={{color:"#12142B"}}>
                    Estimate Value of <span className="fw-semi-bold">NO2</span>
                  </h5>
                }
                close
                collapse
              >
                <ReactEchartsCore
                style={{color:"#12142B"}}
                foreColor= "red"

                  echarts={echarts}
                  option={cd.echarts.line}
                  opts={initEchartsOptions}
                  style={{ height: "365px" }}
                />
              </Widget>
            </Col>
            <Col lg={5} xs={12}>
              <Widget
                title={
                  <h5 style={{color:"#12142B"}}>
                    Highcharts <span className="fw-semi-bold">Line Chart</span>
                  </h5>
                }
                close
                collapse
              >
                <HighchartsReact options={cd.highcharts.mixed} />
                <h5 className="mt" style={{color:"#12142B"}}>
                  Interactive <span className="fw-semi-bold">Sparklines</span>
                </h5>
                <Row className="mt">
                  <Col md={6} xs={12}>
                    <div className="stats-row">
                      <div className="stat-item">
                        <p className="value5 fw-thin">34 567</p>
                        <h6 className="name text-muted m0 fs-mini" style={{color:"#12142B"}}>
                          Overall Values
                        </h6>
                      </div>
                      <div className="stat-item stat-item-mini-chart">
                        <Sparklines
                          options={sparklineData.options2}
                          width={80}
                          height={25}
                          data={sparklineData.series}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6} xs={12}>
                    <div className="stats-row">
                      <div className="stat-item">
                        <p className="value5 fw-thin">34 567</p>
                        <h6 className="name text-muted m0 fs-mini">
                          Overall Values
                        </h6>
                      </div>
                      <div className="stat-item stat-item-mini-chart">
                        <Sparklines
                          options={sparklineData.options1}
                          width={80}
                          height={25}
                          data={sparklineData.series}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Widget>
            </Col>
            <Col lg={7} xs={12}>
              <Row>
                <Col lg={6} xs={12}>
                  <Widget
                    title={
                      <h5 style={{color:"#12142B"}}>
                        Apex{" "}
                        <span className="fw-semi-bold">Monochrome Pie</span>
                      </h5>
                    }
                    close
                    collapse
                  >
                    <ApexChart
                      className="sparkline-chart"
                      type={"pie"}
                      height={200}
                      series={cd.apex.pie.series}
                      options={cd.apex.pie.options}
                    />
                  </Widget>
                </Col>

                {/* <Col lg={6} xs={12}>
                  <Widget
                    title={
                      <h5>
                        Chart <span className="fw-semi-bold">Donut Chart</span>
                      </h5>
                    }
                    close
                    collapse
                  >
                    <ReactEchartsCore
                      echarts={echarts}
                      option={cd.echarts.donut}
                      opts={initEchartsOptions}
                      style={{ height: "170px" }}
                    />
                  </Widget>
                </Col> */}
                {/* <Col lg={12} xs={12}>
                  <Widget
                    title={
                      <h5>
                        Highcharts{" "}
                        <span className="fw-semi-bold">Live Chart</span>
                      </h5>
                    }
                    close
                    collapse
                  >
                    <HighchartsReact options={ld} />
                  </Widget>
                </Col> */}
              </Row>
              
            </Col>
            <Row>
<Col lg={12} >
            <Widget
              title={
                <h5 data-aos="flip-left" style={{color:"#12142B"}}>
                  Estimate Value of <span className="fw-semi-bold">NO2</span>
         ;       </h5>
              }
              close
              collapse
            >
              <ApexChart
              style={{color:"#12142B"}}
                className="sparkline-chart"
                height={350}
                series={this.state.sparklineData.series}
                options={this.state.options}
                type={"bar"}
              />
            </Widget>
          </Col>
</Row>
            {/* <Col lg={12} xs={12}>
              <Widget
                title={
                  <h5>
                    Echarts <span className="fw-semi-bold">River Chart</span>
                  </h5>
                }
                close
                collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.river}
                  opts={initEchartsOptions}
                  style={{ height: "350px" }}
                />
              </Widget>
            </Col> */}
          </Row>
        </div>
      </div>
    );
  }
}





export const data1 = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)"
    }
  ]
};


export default Charts;
