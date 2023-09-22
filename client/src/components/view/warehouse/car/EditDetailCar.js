import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import ModalCloseWindowAction from "../../../modals/ModalCloseWindowAction";
const EditDetailCar = (props) => {
  const getData = () => {};

  const getDataCheckBox = () => {};

  return (
    <div className="conatinerDataCompany tw-text-left">
      <span className="tw-flex tw-justify-end">
        <ModalCloseWindowAction closeAction={props.closeAction} />
      </span>
      <p className="tittle">Szczegóły / Edycja Produktu</p>
      <hr />
      <Form className="tw-w-full tw-border-0 tw-text-secondary">
        <Row className="tw-m-5">
          <Col xs={12} md={12}>
            <Form.Floating className=" inputCar mb-1">
              <Form.Control
                id="title"
                name="title"
                value={props.car.title || ""}
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
                value={props.car.description || ""}
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
                value={props.car.new_used || ""}
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
                value={props.car.type || ""}
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
                value={props.car.registration || ""}
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
                value={props.car.noCrash || ""}
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
                value={props.car.body_type || ""}
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
                value={props.car.make || ""}
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
                value={props.car.model || ""}
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
                value={props.car.generation || ""}
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
                value={props.car.version || ""}
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
                value={props.car.nr_rejestracyjny || ""}
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
                value={props.car.vin || ""}
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
                value={props.car.date_registration || ""}
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
                value={props.car.door_count || ""}
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
                value={props.car.mileage || ""}
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
                value={props.car.year || ""}
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
                value={props.car.number_seats || ""}
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
                value={props.car.fuel_type || ""}
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
                value={props.car.drive || ""}
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
                value={props.car.colour || ""}
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
                value={props.car.lakier || ""}
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
                value={props.car.engine_power || ""}
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
                value={props.car.engine_capacity || ""}
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
                value={props.car.gearbox || ""}
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
                value={props.car.price || ""}
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
          {props.media.map((option, index) => (
            <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
              <Form.Check // prettier-ignore
                type="switch"
                value={props.car.carOptions || ""}
                onChange={getDataCheckBox}
                id={option._id}
                name={option._id}
                label={option.nameOption}
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
          {props.airCondition.map((option, index) =>
            // eslint-disable-next-line
            option._id == "64a1e5df51369458e9547b93" ? (
              <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                <Form.Check
                  type="switch"
                  checked
                  onChange={getDataCheckBox}
                  className="red"
                  id={option._id}
                  name={option._id}
                  label={option.nameOption}
                />
              </Col>
            ) : (
              <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
                <Form.Check
                  type="switch"
                  onChange={getDataCheckBox}
                  id={option._id}
                  name={option._id}
                  label={option.nameOption}
                />
              </Col>
            )
          )}
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
          {props.roof.map((option, index) => (
            <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
              <Form.Check
                type="switch"
                onChange={getDataCheckBox}
                id={option._id}
                name={option._id}
                label={option.nameOption}
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
          {props.upholstery.map((option, index) => (
            <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
              <Form.Check // prettier-ignore
                type="switch"
                onChange={getDataCheckBox}
                id={option._id}
                name={option._id}
                label={option.nameOption}
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
          {props.tempomat.map((option, index) => (
            <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
              <Form.Check
                type="switch"
                onChange={getDataCheckBox}
                id={option._id}
                name={option._id}
                label={option.nameOption}
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
          {props.light.map((option, index) => (
            <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
              <Form.Check
                type="switch"
                onChange={getDataCheckBox}
                id={option._id}
                name={option._id}
                label={option.nameOption}
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
          {props.safety.map((option, index) => (
            <Col xs={12} md={4} className="tw-m-0 tw-ps-4" key={index}>
              <Form.Check
                type="switch"
                onChange={getDataCheckBox}
                id={option._id}
                name={option._id}
                label={option.nameOption}
              />
            </Col>
          ))}
        </Row>
      </Form>

      {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
    </div>
  );
};

export default EditDetailCar;
