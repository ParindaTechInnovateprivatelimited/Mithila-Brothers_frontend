const ColorCircle = ({ color, selected, onSelect }) => {

    // const colorValue = getColorValue(color);

    return (
        <div
            className={`h-5 w-5 rounded-full cursor-pointer border-2 ${selected ? 'border-black' : ''}`}
            style={{ backgroundColor: color.colorCode }}
            onClick={() => onSelect(color._id)}
        />
    );
};

export default ColorCircle;



// const getColorValue = (colorName) => {
//     switch (colorName) {
//         case "Shiny Green":
//             return "#66FF66";
//         case "Royal Blue":
//             return "#4169E1";
//         case "Cobalt Blue":
//             return "#0047AB";
//         case "Deep Black":
//             return "#000000";
//         case "Platinum Grey":
//             return "#E5E4E2";
//         case "Snow White":
//             return "#FFFAFA";
//         case "Copper":
//             return "#B87333";
//         case "Midnight Blue":
//             return "#191970";
//         case "Emerald Green":
//             return "#50C878";
//         case "Wine Red":
//             return "#722F37";
//         case "Teal":
//             return "#008080";
//         case "Mint Green":
//             return "#98FF98";
//         case "Butterfly White":
//             return "#F8F8FF";
//         case "Pastel Pink":
//             return "#FFD1DC";
//         case "Cream":
//             return "#FFFDD0";
//         case "Sky Blue":
//             return "#87CEEB";
//         case "Lavender":
//             return "#E6E6FA";
//         case "Charcoal":
//             return "#36454F";
//         case "Steel Blue":
//             return "#4682B4";
//         case "Navy Blue":
//             return "#000080";
//         case "Turquoise":
//             return "#40E0D0";
//         case "Maroon":
//             return "#800000";
//         case "Blush Pink":
//             return "#FF6FFF";
//         case "Bronze":
//             return "#CD7F32";
//         case "White":
//             return "#FFFFFF";
//         case "Forest Green":
//             return "#228B22";
//         case "Ivory":
//             return "#FFFFF0";
//         case "Peach":
//             return "#FFDAB9";
//         default:
//             return "#FFFFFF";
//     }
// };
