import React from "react";
import { Document, Page, Text, Image, StyleSheet } from "@react-pdf/renderer";
import Bg from "../../img/bg2.jpg";
import axios from "axios";

// Create Document Component
const JsPdf = (props) => {
  console.log(props);
  const getFullDate = new Date();

  const getDay =
    getFullDate.getDate() < 10
      ? "0" + getFullDate.getDate()
      : getFullDate.getDate();

  const preGetMonth = getFullDate.getMonth();
  const preGetMonthAddOne = preGetMonth + 1;
  const getMonth =
    preGetMonthAddOne < 10 ? "0" + preGetMonthAddOne : preGetMonthAddOne;
  const getYear = getFullDate.getFullYear();
  const dateSubString = getYear + "-" + getMonth + "-" + getDay;
  const getDate = dateSubString.toString();
  const getHours = getFullDate.getHours();
  const getMinutes = getFullDate.getMinutes();
  const documentName = `Oferta_${
    props.state.customer?.name || props.state.newCustomer?.name
  }_${getDate}_${getHours}.${getMinutes}.pdf`;

/*   const uploadPDF = async (pdf) => {
    try {
      const response = await axios.post(process.env.REACT_APP_LOCALHOST + 'upload/generatePDF', pdf, {
        headers: {
          'Content-Type': 'application/pdf',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }; */

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    text: {
      color: "red",
    },
  });

  return (
    <Document id="getElementToPdf">
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ Created with react-pdf ~{}
        </Text>
        <Text style={styles.title}>Don Quijote de la Mancha</Text>
        <Text style={styles.author}>
          {props.state?.customer?.name} {props.state.car.model}
        </Text>
        <Image
          src={
            process.env.REACT_APP_LOCALHOST +
            "import/importImages/" +
            props.state.car._id +
            "/" +
            props.state.car.imagesFilesName[0]
          }
          alt=""
        />
        <Image style={styles.image} src="http://localhost:3000/bg2.jpg" />
        <Image style={styles.image} src="bg.jpeg" />
        <Image style={styles.image} src={Bg} />
        <Text style={styles.subtitle}>
          Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo
          D. Quijote de la Mancha
        </Text>
        <Text style={styles.text}>
          En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
          mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
          antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
          carnero, salpicón las más noches, duelos y quebrantos los sábados,
          lentejas los viernes, algún palomino de añadidura los domingos,
          consumían las tres partes de su hacienda. El resto della concluían
          sayo de velarte, calzas de velludo para las fiestas con sus pantuflos
          de lo mismo, los días de entre semana se honraba con su vellori de lo
          más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una
          sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que
          así ensillaba el rocín como tomaba la podadera. Frisaba la edad de
          nuestro hidalgo con los cincuenta años, era de complexión recia, seco
          de carnes, enjuto de rostro; gran madrugador y amigo de la caza.
          Quieren decir que tenía el sobrenombre de Quijada o Quesada (que en
          esto hay alguna diferencia en los autores que deste caso escriben),
          aunque por conjeturas verosímiles se deja entender que se llama
          Quijana; pero esto importa poco a nuestro cuento; basta que en la
          narración dél no se salga un punto de la verdad
        </Text>
        <Image
          src={
            process.env.REACT_APP_LOCALHOST +
            "import/importImages/" +
            props.state.car._id +
            "/" +
            props.state.car.imagesFilesName[2]
          }
          alt=""
        />

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};
export default JsPdf;
