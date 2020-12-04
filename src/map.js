import React, { useLayoutEffect } from 'react';

const Map = ({...props}) => {
	const mapContainer = React.createRef();
	const { mapbox, style } = props;
	
	useLayoutEffect(() => {
		const map = new mapbox.Map({
			style,
			container: mapContainer.current
		});
	}, []);
	
	return (
		<div
			style={{ width: "100vw", height: "100vh" }}
			className="map-container"
			ref={mapContainer}
		/>
	);
}

export default Map;
