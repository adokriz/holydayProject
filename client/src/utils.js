export function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

export const isLightColor = (color) => {
    let r, g, b

    if (color.startsWith('#')) {
        // Handle hex colors
        const hex = color.replace('#', '')
        r = parseInt(hex.substr(0, 2), 16)
        g = parseInt(hex.substr(2, 2), 16)
        b = parseInt(hex.substr(4, 2), 16)
    } else {
        // Default fallback
        return false
    }

    // Calculate luminance using the relative luminance formula
    // This is the standard way to determine if a color is light or dark
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    // Return true if light (luminance > 0.5), false if dark
    return luminance > 0.5
}
