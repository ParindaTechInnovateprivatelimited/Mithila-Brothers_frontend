import React from 'react';
import colorName from 'color-name';

const getColorHexCode = (colorNameInput) => {
    const rgb = colorName[colorNameInput.toLowerCase()];

    if (!rgb) {
        return "#000000"; // Return black if the color name is not found
    }

    // Convert RGB array to a hex code
    const hexCode = `#${rgb.map(value => value.toString(16).padStart(2, '0')).join('')}`;
    return hexCode;
};

const ColorDisplay = ({ colorNameInput }) => {
    const hexColor = getColorHexCode(colorNameInput);

    return (
        <div style={{ backgroundColor: hexColor, padding: '20px', color: '#fff' }}>
            <p>{colorNameInput}</p>
            <p>Hex Code: {hexColor}</p>
        </div>
    );
};

// Usage example
const Apps = () => (
    <div>
        <ColorDisplay colorNameInput="MidnightBlue" />
        <ColorDisplay colorNameInput="PastelPink" />
        <ColorDisplay colorNameInput="Lavender" />
    </div>
);

export default Apps;
