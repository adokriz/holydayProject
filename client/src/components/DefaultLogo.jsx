import {getRandomColor, isLightColor} from "../utils.js"

function DefaultLogo({username, onMouseOver, onMouseOut}) {
    const profileLogo = username.charAt(0).toUpperCase()
    const bgColor = getRandomColor()
    const backGroundColor = {
        backgroundColor: bgColor,
        color: isLightColor(bgColor) ? 'white' : 'black',}

    return (<button className="profilPhoto" style={backGroundColor} onMouseOver={onMouseOver} onMouseOut={onMouseOut}> {profileLogo}</button> )
}

export default DefaultLogo