import React from "react";
import { Col, Row } from "react-bootstrap";
import { Funnel } from "@nivo/funnel";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut, Bar } from "react-chartjs-2";
import MyDonut from "./MyDonut";
import FunnelChart from "./FunnelChart";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AnaliticUserTop = (props) => {
  const [data, setData] = useState([]);
  const [action, setAction] = useState([]);
  const [offer, setOffer] = useState([]);
  //eslint-disable-next-line
  const [soldData, setSoldData] = useState([]);
  const getUSerLogIn = JSON.parse(localStorage.getItem("user"));
  const user_id = getUSerLogIn._id;

  const getData = async () => {

console.log(props)
    const viewOffer = await axios.get(
      process.env.REACT_APP_LOCALHOST + "offer/"
    );
    setOffer(viewOffer.data);

    const viewPlain = await axios.get(
      process.env.REACT_APP_LOCALHOST + "plain/"
    );
    setData(viewPlain?.data);

    const getAction = await axios.get(
      process.env.REACT_APP_LOCALHOST + "action/"
    );
    setAction(getAction.data);
  };

  const actionAll = action.filter((act) =>
    props.userSelect === undefined
      ? props.getIdUser._id === act.user?._id
      : props.userSelect === act.user?._id &&
        act.nextContactData.slice(5, 7) === props.dataSelect?.monthSelect
  ).length;

  const offerAll = offer.filter((act) =>
    props.userSelect === undefined
      ? props.getIdUser._id === act.user?._id
      : props.userSelect === act.user?._id &&
        act.data.slice(5, 7) === props.dataSelect?.monthSelect
  ).length;

  const effectiveness = ((props.sold / actionAll) * 100).toFixed(0);
  /*   const kpiContactOffer = ((offerAll / actionAll) * 100).toFixed(0);
  const kpiOfferSold = ((props.sold / offerAll) * 100).toFixed(0);
  const kpiRecomdationData = ((props.recomendations / actionAll) * 100).toFixed(
    0
  );
  const kpiInitiativeData = ((props.initiative / actionAll) * 100).toFixed(0);
  const kpiStockMarketData = ((props.stockMarket / actionAll) * 100).toFixed(0);
  const kpiLostChanceData = ((props.lostChance / actionAll) * 100).toFixed(0); */
  const effectivenessToInt = parseInt(effectiveness) || 0;

  const salespersonInitiative =
    props.recomendations + props.initiative + props.stockMarket + props.routeIn;
  const companyInitiative = props.routeOut;

  const dataSourceLead = {
    labels: [
      "Inicjatywa własna",
      "Rekomendacje",
      "Giełda",
      "Inicjatywa Klienta",
      "Firma",
    ],
    datasets: [
      {
        label: "",
        data: [
          props.initiative,
          props.recomendations,
          props.stockMarket,
          props.routeIn,
          props.routeOut,
        ],
        backgroundColor: ["yellow", "green", "blue", "red", "orange"],
        borderColor: ["white"],
        borderWidth: 4,
      },
    ],
  };

  const dataInitiative = {
    labels: ["Klient", "Handlowiec"],
    datasets: [
      {
        label: "",
        data: [companyInitiative, salespersonInitiative],
        backgroundColor: ["red", "green"],
        borderColor: ["white", "white"],
        borderWidth: 4,
      },
    ],
  };
  const dataEffectiveness = {
    labels: ["Skuteczność"],
    datasets: [
      {
        label: "",
        data: [effectivenessToInt, 100 - effectivenessToInt],
        backgroundColor: ["green", "orange"],
        borderColor: ["white"],
        borderWidth: 4,
      },
    ],
  };

  const optionsInitiative = {
    layout: {
      padding: 0,
    },

    responsive: true,
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: "80%",
            font: { size: "40" },
            color: "black",
          },
        ],
      },
      legend: {
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Inicjatywa",
        },
      },
    },
  };

  const optionsSourceLead = {
    layout: {
      padding: 0,
    },

    responsive: true,

    plugins: {
      legend: {
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Struktura Leadów",
        },
      },
    },
  };

  const MyFunnel = () => {
    const data = [
      {
        id: "Wszystkie kontakty",
        label: "Wszystkie kontakty",
        value: actionAll,
        legend: "Kontakty",
      },
      {
        id: "Oferty",
        label: "Oferty",
        value: offerAll,
        legend: "Kontakty",
      },
      {
        id: "Sprzedaż",
        label: "Sprzedaż",
        value: props.sold,
        legend: "Kontakty",
      },
    ];

    return (
      <Funnel
        data={data}
        padding={{ top: 0, right: 20, bottom: 0, left: 20 }}
        margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
        width={150}
        height={150}
        // valueFormat=">-.4s"
        colors={{ scheme: "spectral" }}
        borderColor={"yellow"}
        labelColor={"white"}
        beforeSeparatorLength={100}
        beforeSeparatorOffset={20}
        afterSeparatorLength={100}
        afterSeparatorOffset={20}
        currentBorderWidth={40}
      />
    );
  };
  const sales = data
    .filter((act) => {
      return props.userSelect === undefined
        ? act.id_user === user_id
        : act.id_user === props.userSelect;
    })
    .map((act) =>
      props.dataSelect?.monthSelect === props.now
        ? act[props.month]
        : act[props.monthPrev]
    );
  const totalSales = sales.reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: ["Twój cel", "Twój wynik"],

    datasets: [
      {
        label: "",
        data: [totalSales, props.sold],
        backgroundColor: ["orange", sales <= props.sold ? "green" : "red"],
        borderWidth: 0,
        borderRadius: {
          topLeft: 0,
          topRight: 50,
          bottomLeft: 0,
          bottomRight: 50,
        },
        borderSkipped: false,
        barPercentage: 0.4,
        categoryPercentage: 0.9,
      },
    ],
  };
  const optionsSolds = {
    layout: {
      padding: 0,
    },
    indexAxis: "y",
    scales: {
      x: {
        ticks: {
          display: false, // ukrywa opisy ticków na osi X
        },
        grid: {
          display: false, // ukrywa linie siatki dla osi X
          drawBorder: false, // ukrywa linię osi
          drawOnChartArea: false,
        },
      },
      y: {
        ticks: {
          /*      display: false, // ukrywa opisy ticków na osi X */
        },
        grid: {
          display: false, // ukrywa linie siatki dla osi Y
          drawBorder: false, // ukrywa linię osi
          drawOnChartArea: false,
        },
      },
    },

    responsive: true,
    plugins: {
      legend: {
        display: false,
      },

      /*  tooltip: {
        enabled: false,
      }, */
    },
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <span className="analiticUserBox fullSize">
      <Row className="tw-w-full ">
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <div className="analiticUserContainer">
            <h4>PLan miesięczny</h4>
            <hr />

            <ul>
              <li className="marginLeft">
                Sprzedaż :
                {data
                  .filter((act) => {
                    return props.userSelect === undefined
                      ? act.id_user === user_id
                      : act.id_user === props.userSelect;
                  })
                  .map((act, index) => (
                    <span key={index} className="tw-p-2">
                      {props.dataSelect?.monthSelect === props.now ? (
                        act[props.month] <= props.sold ? (
                          <span className="green bold">{act[props.month]}</span>
                        ) : (
                          <span className="red bold">{act[props.month]}</span>
                        )
                      ) : act[props.monthPrev] <= props.sold ? (
                        <span className="green bold">
                          {act[props.monthPrev]}
                        </span>
                      ) : (
                        <span className="red bold">{act[props.monthPrev]}</span>
                      )}
                    </span>
                  ))}
              </li>
              <li className="marginLeft">
                Skuteczność:{" "}
                {effectivenessToInt < 25 ? (
                  <span className="red bold"> 25%</span>
                ) : (
                  <span className="green bold"> 25%</span>
                )}
              </li>
            </ul>
            <span style={{ height: "100px", width: "150px" }}>
              <Bar data={chartData} options={optionsSolds} />
            </span>
          </div>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <div className="analiticUserContainer">
            <h4>Lejek sprzedaży</h4>
            <hr />
            <br />
            <br />
            <div className="tw-flex">
              <div>
                <ul>
                  <li className="marginLeft tw-me-5"> Kontakty: {actionAll}</li>
                  <li className="marginLeft">Oferty: {offerAll}</li>

                  <li className="marginLeft">Sprzedaż: {props.sold}</li>
                </ul>
              </div>
              <div>
                {/*   < FunnelChart  offer={ offerAll} action={actionAll} /> */}
                <MyFunnel />
              </div>
            </div>
            {/*   <Bar data={dataBar}  options={optionsBar} ></Bar> */}
          </div>
        </Col>
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <div className="analiticUserContainer">
            <h4>
              {" "}
              {companyInitiative === 0 && salespersonInitiative === 0 ? (
                "Skuteczność"
              ) : effectivenessToInt >= 25 ? (
                <span className="green">Skuteczność</span>
              ) : (
                <span className="orange bold"> Skuteczność </span>
              )}
            </h4>

            <MyDonut data={dataEffectiveness} value={effectivenessToInt} />
          </div>
        </Col>
        {/*        <Col xxl={2} xl={6} lg={6} md={6} sm={12} className="tw-w-[300px]">
          <div className="analiticUserContainer">
            <h4>
              {" "}
              {companyInitiative === 0 && salespersonInitiative === 0 ? (
                "Inicjatywa "
              ) : salespersonInitiative > companyInitiative ? (
                <span className="green">Inicjatywa </span>
              ) : (
                <span className="red bold">Inicjatywa </span>
              )}
            </h4>

            <Doughnut
              data={dataInitiative}
              options={optionsInitiative}
            ></Doughnut>
          </div>
        </Col> */}
        <Col xxl={3} xl={6} lg={6} md={6} sm={12}>
          <div id="chart"></div>
          <div className="analiticUserContainer">
            <h4>Struktura leadów</h4>
            <Doughnut
              data={dataSourceLead}
              options={optionsSourceLead}
              width={150}
              height={150}
            ></Doughnut>
          </div>
        </Col>

        {/*    <Col xxl={2} xl={6} lg={6} md={6} sm={12} className="tw-w-[300px]">
            <div className="analiticUserContainer">
              <h4>Wskaźniki KPI</h4>
              <hr />
              <ul>
                  <li className="marginLeft">Kontakty/Oferty: {actionAll ? kpiContactOffer : 0} %</li>
                  <li className="marginLeft">Kontakty/Sprzedaż: {actionAll ? effectiveness : 0} %</li>
                  <li className="marginLeft">Oferty/Sprzedaż: {props.sold ? kpiOfferSold : 0} %</li>
                  <li className="marginLeft">Utracone szanse: {actionAll ? kpiLostChanceData : 0} %</li>
              </ul>
            </div>
          </Col> */}
      </Row>
    </span>
  );
};

export default AnaliticUserTop;
