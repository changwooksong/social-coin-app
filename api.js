const BASE_URL = "https://api.coinpaprika.com/v1";
const COIN_URL = `${BASE_URL}/coins`;

export const coins = () => fetch(COIN_URL).then((response) => response.json());

export const info = ({ queryKey }) =>
    fetch(`${COIN_URL}/${queryKey[1]}`).then((response) => response.json());

export const history = ({ queryKey }) =>
    fetch(
        `${BASE_URL}/tickers/${queryKey[1]}/historical?start=${
            new Date().toISOString().split("T")[0]
        }&interval=1h`
    ).then((response) => response.json());
