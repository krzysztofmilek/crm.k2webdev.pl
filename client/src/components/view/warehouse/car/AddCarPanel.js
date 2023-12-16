import React from "react";
import { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const AddCarPanel = (props) => {
  const [media, setMedia] = useState([]);
  const [airCondition, setAirCondition] = useState([]);
  const [roof, setRoof] = useState([]);
  const [upholstery, setUpholstery] = useState([]);
  const [tempomat, setTempomat] = useState([]);
  const [light, setLight] = useState([]);
  const [safety, setSafety] = useState([]);
  const [data, setData] = useState([]);
  const [dataChecked, setDataChecked] = useState([]);
  const [image, setImage] = useState([]);
  //eslint-disable-next-line
  const [car, setCar] = useState([]);

  const getCategorys = async () => {
    const getMedia = await axios.get(
      process.env.REACT_APP_LOCALHOST+"category/?category=media"
    );
    setMedia(getMedia.data);

    const getAirConditions = await axios.get(
      process.env.REACT_APP_LOCALHOST+"category/?category=airConditions"
    );
    setAirCondition(getAirConditions.data);

    const getRoof = await axios.get(
      process.env.REACT_APP_LOCALHOST+"category/?category=roof"
    );
    setRoof(getRoof.data);

    const getUpholstery = await axios.get(
      process.env.REACT_APP_LOCALHOST+"category/?category=upholstery"
    );
    setUpholstery(getUpholstery.data);

    const getTempomat = await axios.get(
      process.env.REACT_APP_LOCALHOST+"category/?category=tempomat"
    );
    setTempomat(getTempomat.data);

    const getLight = await axios.get(
      process.env.REACT_APP_LOCALHOST+"category/?category=light"
    );
    setLight(getLight.data);

    const getSafety = await axios.get(
      process.env.REACT_APP_LOCALHOST+"category/?category=safety"
    );
    setSafety(getSafety.data);
  };

  const getData = (e) =>
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const getDataCheckBox = (e) =>
    setDataChecked((prevState) => {
      if (e.target.checked) {
        setDataChecked(prevState.concat(e.target.name));
      } else {
        setDataChecked(prevState.filter((item) => item !== e.target.name));
      }
    });

  const add = async () => {
    let fileInput = document.getElementById("file-field");
    let imgCollectionName = [];
    for (let i = 0; i < fileInput.files.length; i++) {
      let fileName = fileInput.files[i].name;
      imgCollectionName.push(fileName);
    }
    const pos = {
      title: data.title,
      type: data.type,
      new_used: data.new_used,
      description: data.description,
      body_type: data.body_type,
      make: data.make,
      model: data.model,
      generation: data.generation,
      version: data.version,
      nr_rejestracyjny: data.nr_rejestracyjny,
      registration: data.registration,
      noCrash: data.noCrash,
      date_registration: data.date_registration,
      vin: data.vin,
      door_count: data.door_count,
      mileage: data.mileage,
      year: data.year,
      number_seats: data.number_seats,
      fuel_type: data.fuel_type,
      colour: data.colour,
      lakier: data.lakier,
      engine_power: data.engine_power,
      engine_capacity: data.engine_capacity,
      gearbox: data.gearbox,
      drive: data.drive,
      price: data.price,
      status:"magazyn",
      carOptions: dataChecked,
      imagesFilesName: imgCollectionName,
    };
    const getDane = await axios.post(process.env.REACT_APP_LOCALHOST+"car/add", pos);
    console.log(getDane.data._id);
    setCar(getDane.data);

    let formData = new FormData();
    formData.append("imagesFiles", image);
    formData.append("carId", getDane.data._id);
    Array.from(image).forEach((item) => {
      formData.append("imagesFiles", item);
    });

    const url = process.env.REACT_APP_LOCALHOST+"upload/image";
    axios
      .post(url, formData)
      .then((result) => {
        console.log("Pliki Dodano");
      })
      .catch((err) => {
        console.log("Brak plików,");
        return;
      });
  };

  useEffect(() => {
    getCategorys();
  }, []);

  return (
    <span className="tw-flex tw-flex-col tw-justify-center tw-items-center">
      <span className="tw-flex tw-flex-col  ">
        <div className="conatinerDataCompany">
          <p className="tittle">DODAJ Samochód</p>

          <hr />
          <Form className="tw-w-full tw-border-0 tw-text-secondary">
            <Row className="tw-m-5">
              <Col xs={12} md={12}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="title"
                    name="title"
                    onChange={getData}
                    placeholder="Tytuł"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="title">Tytuł</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="tw-m-5">
              <Col xs={12} md={12}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="description"
                    onChange={getData}
                    name="description"
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                      height: "400px",
                    }}
                  />
                  <label htmlFor="description">Opis przedmiotu</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="tw-m-5">
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="new_used"
                    name="new_used"
                    onChange={getData}
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="new">Nowy</option>
                    <option value="used">Używany</option>
                  </Form.Select>
                  <label htmlFor="new_used">Nowy / Używany?</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="type"
                    name="type"
                    onChange={getData}
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="Osobowy">Osobowy</option>
                    <option value="Dostawczy">Dostawczy</option>
                  </Form.Select>
                  <label htmlFor="type">Osobowy/Dostawczy</label>
                </Form.Floating>
              </Col>

              <Col xs={12} md={3}>
                <Form.Floating className="tw-ps-0 tw-justify-start tw-items-start ">
                  <Form.Select
                    id="registration"
                    onChange={getData}
                    name="registration"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="TAK">TAK</option>
                    <option value="NIE">NIE</option>
                  </Form.Select>
                  <label htmlFor="registration">Zarejestrowany</label>
                </Form.Floating>
              </Col>

              <Col xs={12} md={3}>
                <Form.Floating className="tw-ps-0 tw-justify-start tw-items-start ">
                  <Form.Select
                    id="noCrash"
                    onChange={getData}
                    name="noCrash"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="TAK">TAK</option>
                    <option value="NIE">NIE</option>
                  </Form.Select>
                  <label htmlFor="noCrash">Bezwypadkowy</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="tw-m-5">
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="body_type"
                    onChange={getData}
                    name="body_type"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="cityCar">Auta miejskie</option>
                    <option value="coupe">Coupe</option>
                    <option value="cabrio">Kabriolet</option>
                    <option value="combi">Kombi</option>
                    <option value="compact">Kompakt</option>
                    <option value="minivan">Minivan</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">Suv</option>
                  </Form.Select>
                  <label htmlFor="body_type">Typ Nadwozia</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="make"
                    name="make"
                    onChange={getData}
                    placeholder="Marka"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="make">Marka</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="model"
                    onChange={getData}
                    name="model"
                    placeholder="Model"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="model">Model</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="generation"
                    placeholder="Generacja"
                    onChange={getData}
                    name="generation"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="generation">Generacja</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="tw-m-5">
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="version"
                    onChange={getData}
                    name="version"
                    placeholder="name@example.com"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="version">Wersja</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="nr_rejestracyjny"
                    onChange={getData}
                    placeholder="Nr rejestracyjny"
                    name="nr_rejestracyjny"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="nr_rejestracyjny">Nr rejestracyjny</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="vin"
                    name="vin"
                    onChange={getData}
                    placeholder="vin"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="vin">VIN</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="date_registration"
                    name="date_registration"
                    onChange={getData}
                    placeholder="Data rejestracji"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="date_registration">Data rejestracji</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="tw-m-5">
              <Col xs={12} md={2}>
                <Form.Floating className="tw-ps-0 tw-justify-start tw-items-start ">
                  <Form.Select
                    id="door_count"
                    onChange={getData}
                    name="door_count"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                  </Form.Select>
                  <label htmlFor="door_count">Ilość drzwi</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="mileage"
                    onChange={getData}
                    name="mileage"
                    placeholder="name@example.com"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="mileage">Przebieg</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="year"
                    onChange={getData}
                    name="year"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                  </Form.Select>
                  <label htmlFor="year">Rocznik</label>
                </Form.Floating>
              </Col>

              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="number_seats"
                    onChange={getData}
                    name="number_seats"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </Form.Select>
                  <label htmlFor="number_seats">Liczba miejsc</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="fuel_type"
                    onChange={getData}
                    name="fuel_type"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="Benzyna">Benzyna</option>
                    <option value="Benzyna+CNG">Benzyna+CNG</option>
                    <option value="Benzyna+LPG">Benzyna+LPG</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Elektyczny">Elektryczny</option>
                    <option value="Etanol">Etanol</option>
                    <option value="Hybryda">Hybryda</option>
                    <option value="Hydrogen">Wodór</option>
                  </Form.Select>
                  <label htmlFor="fuel_type">Paliwo</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="drive"
                    onChange={getData}
                    name="drive"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="FWD">Na przednie koła</option>
                    <option value="RWD">Na tylne koła</option>
                    <option value="4x4Automatic">
                      4x4 (dołączany automatycznie)
                    </option>
                    <option value="4x4 Manual">4x4 (dołączany ręcznie)</option>
                    <option value="Manual">4x4 (stały)</option>
                  </Form.Select>
                  <label htmlFor="drive">Napęd</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="tw-m-5">
              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    name="colour"
                    id="colour"
                    onChange={getData}
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="Beżowy">Beżowy</option>
                    <option value="Biały">Biały</option>
                    <option value="Błękitnye">Błękitny</option>
                    <option value="Bordowy">Bordowy</option>
                    <option value="Czerwony">Czerwony</option>
                    <option value="Fioletowy">Fioletowy</option>
                    <option value="Granatowy">Granatowy</option>
                    <option value="Niebieski">Niebieski</option>
                    <option value="Orange"> Pomarańczowy</option>
                    <option value="Srebrny">Srebrny</option>
                    <option value="Szary">Szary</option>
                    <option value="Zielony">Zielony</option>
                    <option value="Złoty">Złoty</option>
                    <option value="Żółty">Żółty</option>
                  </Form.Select>

                  <label htmlFor="colour">Kolor</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="lakier"
                    name="lakier"
                    onChange={getData}
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="Matowy">Matowy</option>
                    <option value="Metalik">Metalik</option>
                    <option value="Perłowy">Perłowy</option>
                  </Form.Select>
                  <label htmlFor="lakier">Rodzaj lakieru</label>
                </Form.Floating>
              </Col>

              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="engine_power"
                    onChange={getData}
                    name="engine_power"
                    placeholder="Moc silnika"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="engine_power">Moc silnika(KM)</label>
                </Form.Floating>
              </Col>
              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="engine_capacity"
                    onChange={getData}
                    name="engine_capacity"
                    placeholder="Pojemność"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  />
                  <label htmlFor="engine_capacity">Pojemność</label>
                </Form.Floating>
              </Col>

              <Col xs={12} md={2}>
                <Form.Floating className="mb-1">
                  <Form.Select
                    id="gearbox"
                    onChange={getData}
                    name="gearbox"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  >
                    <option>Wybierz</option>
                    <option value="Manualna">Manulana</option>
                    <option value="Automatyczna">Automatyczna</option>
                  </Form.Select>
                  <label htmlFor="gearbox">Skrzynia biegów</label>
                </Form.Floating>
              </Col>
            </Row>
            <Row className="tw-w-[90%]  tw-font-bold tw-uppercase">
              <Col xs={12}>
                <br /> Cena
                <br />
                <hr />
              </Col>
            </Row>

            <Row className="tw-m-5">
              <Col xs={12} md={3}>
                <Form.Floating className="mb-1">
                  <Form.Control
                    id="price"
                    name="price"
                    onChange={getData}
                    placeholder="Cena Brutto"
                    style={{
                      borderRadius: "5px",
                      border: "1px solid #ccc ",
                    }}
                  ></Form.Control>
                  <label htmlFor="price">Cena Brutto</label>
                </Form.Floating>
              </Col>
            </Row>

            <Row className="tw-w-[90%]  tw-font-bold tw-uppercase">
              <Col xs={12}>
                <br /> Dodatkowe wyposażenie
                <br />
                <hr />
              </Col>
            </Row>

            <Row className="padding40">
              {media.map((cust, index) => (
                <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    onChange={getDataCheckBox}
                    id={cust._id}
                    name={cust._id}
                    label={cust.nameOption}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                xs={12}
                className="tw-w-full tw-border-0 tw-font-bold tw-uppercase"
              >
                <br />
                Klimatyzacja
                <br />
                <hr />
              </Col>
            </Row>

            <Row className="padding40">
              {airCondition.map((cust, index) => (
                <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                  <Form.Check
                    type="switch"
                    onChange={getDataCheckBox}
                    id={cust._id}
                    name={cust._id}
                    label={cust.nameOption}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                xs={12}
                className="tw-w-full tw-border-0 tw-font-bold tw-uppercase"
              >
                <br />
                Otwierany dach
                <br />
                <hr />
              </Col>
            </Row>
            <Row className="padding40">
              {roof.map((cust, index) => (
                <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                  <Form.Check
                    type="switch"
                    onChange={getDataCheckBox}
                    id={cust._id}
                    name={cust._id}
                    label={cust.nameOption}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                xs={12}
                className="tw-w-full tw-border-0 tw-font-bold tw-uppercase"
              >
                <br />
                Tapicerka
                <br />
                <hr />
              </Col>
            </Row>
            <Row className="padding40">
              {upholstery.map((cust, index) => (
                <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    onChange={getDataCheckBox}
                    id={cust._id}
                    name={cust._id}
                    label={cust.nameOption}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                xs={12}
                className="tw-w-full tw-border-0 tw-font-bold tw-uppercase"
              >
                <br /> Rodzaj tempomatu
                <br />
                <hr />
              </Col>
            </Row>
            <Row className="padding40">
              {tempomat.map((cust, index) => (
                <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                  <Form.Check
                    type="switch"
                    onChange={getDataCheckBox}
                    id={cust._id}
                    name={cust._id}
                    label={cust.nameOption}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                xs={12}
                className="tw-w-full tw-border-0 tw-font-bold tw-uppercase"
              >
                <br /> Rodzaj reflektorów{" "}
              </Col>
            </Row>
            <Row className="padding40">
              {light.map((cust, index) => (
                <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                  <Form.Check
                    type="switch"
                    onChange={getDataCheckBox}
                    id={cust._id}
                    name={cust._id}
                    label={cust.nameOption}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                xs={12}
                className="tw-w-full tw-border-0 tw-font-bold tw-uppercase"
              >
                <br /> Komfort i bezpieczeństwo
                <br />
                <hr />
              </Col>
            </Row>
            <Row className="padding40">
              {safety.map((cust, index) => (
                <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                  <Form.Check
                    type="switch"
                    onChange={getDataCheckBox}
                    id={cust._id}
                    name={cust._id}
                    label={cust.nameOption}
                  />
                </Col>
              ))}
            </Row>
            <Row>
              <Col
                xs={12}
                className="tw-w-full tw-border-0 tw-font-bold tw-uppercase"
              >
                <br /> Dodaj zdjęcia
                <br />
                <hr />
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                md={6}
                className="tw-w-full tw-border-0 tw-font-bold tw-uppercase tw-m-3 tw-ps-10"
              >
                <div>
                  <div>
                    {Array.from(image).map((item, index) => {
                      return (
                        <Row key={index}>
                          <Col xs={12} md={4}>
                            <img
                              style={{ padding: "10px" }}
                              height={350}
                              width={250}
                              src={item ? URL.createObjectURL(item) : null}
                              alt=""
                             
                            />

                            <Button variant="outline-danger"
                            onClick={URL.revokeObjectURL(index)
                          }
                            
                            >Usuń</Button>
                          </Col>
                        </Row>
                      );
                    })}
                  </div>
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Control
                        onChange={(e) => {
                          setImage(e.target.files);
                        }}
                        multiple
                        type="file"
                        id="file-field"
                        name="imagesFiles"
                        accept="image/*"
                        style={{ padding: "50px", border: "1px solid" }}
                      
                      />
                    </Form.Group>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <p className="getRight">
          <Button variant="outline-success" onClick={add}>
            Zapisz
          </Button>
        </p>
      </span>
    </span>
  );
};

export default AddCarPanel;
