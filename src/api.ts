//fetcher함수
const BASE_URL =` https://api.coinpaprika.com/v1`
export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then(response => response.json());
}
// react query 좋은 이유! 세부 페이지 들어갔다가 뒤로가기 눌러도 페이지 새로고침 되지 않고 react-query가 캐시에 데이터를 저장해두기 때문에 바로 보여준다.

// 위처럼 하고 Coins.tsx에서 data?.slice(0,100) 해주던가 아니면 그냥 아래처럼 해도될듯?
/* export async function fetchCoins() {
    const response = await fetch("https://api.coinpaprika.com/v1/coins").then(response => response.json());
    const json = await response.slice(0,100);
    return json;
} */



export function fetchCoinInfo(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
}

export function fetchCoinTickers(coinId:string){
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
}

export function fetchCoinHistory(coinId:string){
    const endDate =  Math.floor(Date.now() /1000) // ms를 s 단위로 바꿈 
    const startDate = endDate - 60*60*24*7 * 2; // 2주일 전
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response => response.json());
}

export function fetchCoinPrice(coinId:string){
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`).then(response=>response.json());
}
// 1. 뒤로가기 버튼 만들기, 2. priceinfo 추가하기, 3. 차트 모양 변경하기