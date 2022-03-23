import { ICoin } from "./interface";

const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`)
    .then((res) => res.json())
    .then((list) =>
      list
        .filter((coin: ICoin) => "coin" === coin.type)
        .slice(0, 100)
        .map((coin: ICoin) => {
          return {
            ...coin,
            //img: `https://api.coinicons.net/icon/${coin.symbol.toLowerCase()}/32x32`,
            //img: `https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`
            // 간단하게 이미지 끌어다 쓸곳이 없네...
            img: `https://static.upbit.com/logos/${coin.symbol.toUpperCase()}.png`,
          };
        })
    );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) =>
    res.json()
  );
}

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(
    (res) => res.json()
  );
}

export function fetchCoinHistory(coinId: string) {
  // 오늘부터
  // floor는 내림, ceil은 올림
  const endDate = Math.ceil(Date.now() / 1000);
  // 2주전
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((res) => res.json());
}
