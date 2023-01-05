import ReactSlider from "react-slider";
import "./Thermometer.css";
import { useClimate } from "../../context/ClimateContext";
import { useEffect, useState } from "react";

function Thermometer() {
	const { temperature, setTemperature } = useClimate();
	const [tempTrack, setTempTrack] = useState(temperature);
	console.log(tempTrack - temperature);

	useEffect(() => {
		console.log(tempTrack);
		const timer = setTimeout(() => {
			if (tempTrack > temperature) {
				setTemperature(temperature + 1);
			} else if (tempTrack < temperature) {
				setTemperature(temperature - 1);
			}
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [temperature, tempTrack]);

	return (
		<section>
			<h2>Thermometer</h2>
			<div className="actual-temp">Actual Temperature: {temperature}°F</div>
			<ReactSlider
				value={tempTrack}
				onAfterChange={val => {
					setTempTrack(val);
				}}
				className="thermometer-slider"
				thumbClassName="thermometer-thumb"
				trackClassName="thermometer-track"
				ariaLabel={"Thermometer"}
				orientation="vertical"
				min={0}
				max={120}
				renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
				renderTrack={(props, state) => (
					<div {...props} index={state.index}></div>
				)}
				invert
				pearling
				minDistance={1}
			/>
		</section>
	);
}

export default Thermometer;
