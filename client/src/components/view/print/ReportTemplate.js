
const ReportTemplate = (props) => {
console.log(props.props.state.customer.name)
	const styles = {
		page: {
			marginLeft: '15px',
			marginRight: '15px',
		},

		columnLayout: {
			display: 'flex',
			justifyContent: 'space-between',
			margin: '15px 0 15px 0',
			gap: '2rem',
		},

		column: {
			display: 'flex',
			flexDirection: 'column',
		},

		spacer2: {
			height: '2rem',
		},

		fullWidth: {
			width: '10%',
		},

		marginb0: {
			marginBottom: 0,
		},
		intoText:{
			setFontSize:'25px',
		},
		
	};
	return (
		<>
			<div style={styles.page}>
				<div>
					<h1 style={styles.intoText}>
						Oferta handlowak dla {props.props.state.customer?.name} {props.props.state.customer?.nameCompany}
          
					</h1>
				</div>

				<div style={styles.spacer2}></div>

				 <img style={styles.fullWidth} src="bg.png" alt="test" /> 
			</div>

			<div style={styles.page}>
				<div>
					<h2 style={styles.introText}>
						{props.props.state.customer.name}
					</h2>
				</div>

				<div style={styles.columnLayout}>
					<div style={styles.column}>
					<img style={styles.fullWidth} src="bg.png" alt="test" /> 
						<h4 style={styles.marginb0}>Subtitle One</h4>
						<p >
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>

					<div style={styles.column}>
					<img style={styles.fullWidth} src="bg.png" alt="test" /> 
						<h4 style={styles.marginb0}>Subtitle Two</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>
				</div>

				<div style={styles.columnLayout}>
					<div style={styles.column}>
					<img style={styles.fullWidth} src="bg.png" alt="test" /> 
						<h4 style={styles.marginb0}>Subtitle One</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>

					<div style={styles.column}>
					<img style={styles.fullWidth} src="bg.png" alt="test" /> 
						<h4 style={styles.marginb0}>Subtitle Two</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReportTemplate;