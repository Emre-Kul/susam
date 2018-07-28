const Math = {
    randomInt : (low = 0, high) => {
        return Math.floor(Math.random()*(high-low)+low);
    },
    randomFloat : (low = 0, high) => {
        return Math.random()*(high-low)+low;
    }
}