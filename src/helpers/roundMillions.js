function getRoundMillions(currentNumber){
    const numberMillion = Math.round(currentNumber / 1000000);
    return `${numberMillion}`
}

export default getRoundMillions;