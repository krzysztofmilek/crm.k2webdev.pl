import { Funnel } from "@nivo/funnel";

const FunnelChart = (props) => {
console.log(props)

  const data = [
    {
      id: "Wszystkie kontakty",
      label: "Wszystkie kontakty",
      value: props.actionAll,
      legend: "Kontakty",
    },
    {
      id: "Oferty",
      label: "Oferty",
      value: props.offerAll,
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
}; export default FunnelChart