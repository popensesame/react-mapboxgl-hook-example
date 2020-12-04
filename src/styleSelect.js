import React from 'react';

function StyleSelect (props) {

	const renderOneSelector = (style, i) => {
		return (
			<div key={style.id}>
				<input
					id={style.id}
					type="radio"
					name="rtoggle"
					value={style.name}
					checked={props.activeStyle === style ? "checked" : ""}
					onChange={ () => props.onSelect(style) }
				/>
				<label htmlFor={style.id}>{style.name}</label>
			</div>
		)
	}

	return (
		<div className="styleMenu">
			{props.styles.map(renderOneSelector)}
		</div>
	)
}

export default StyleSelect;
