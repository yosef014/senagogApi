const parseAmount = (number: number) => {
    return number && round(number * 100)
}

const prettyAmount = (number: number) => {
    return number && (number / 100)
}

const parseSmsFeeAmount = (number: number) => {
    return number && round(number * 1000000)
}

const prettySmsFeeAmount = (number: number) => {
    return number && (number / 1000000)
}

const round = (number: number) => {
    return Number(Math.round(Number(number + 'e' + 2)) + 'e-' + 2)
}

export default {
    prettyAmount, parseAmount, round, parseSmsFeeAmount,
    prettySmsFeeAmount
}
