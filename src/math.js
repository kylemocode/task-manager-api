const calculateTip = (total,tipPercent=0.2) => total + (total * tipPercent)

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

module.exports = {
    calculateTip,
    fahrenheitToCelsius
}