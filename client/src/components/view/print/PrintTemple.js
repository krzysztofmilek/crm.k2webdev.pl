import { useRef } from 'react';
import jsPDF from 'jspdf';
import ReportTemplate from './ReportTemplate';


function PrintTemple(props) {
	const reportTemplateRef = useRef(null);

	const handleGeneratePdf = () => {
		const doc = new jsPDF({
			format: 'a4',
			unit: 'px',
		});

		// Adding the fonts.
		doc.setFont('Tahoma', 'normal');
	

		doc.html(reportTemplateRef.current, {
			async callback(doc) {
				await doc.save('document');
			},
		});
	};

	return (
		<div>
			<button className="button" onClick={handleGeneratePdf}>
				Generate PDF
			</button>
			<div ref={reportTemplateRef}>
				<ReportTemplate props={props} />
			</div>
		</div>
	);
}

export default PrintTemple;