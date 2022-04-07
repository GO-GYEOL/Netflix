import { useQuery } from "react-query";
import { isMetaProperty } from "typescript";
import { fetchCoinPrice } from "../api";
import styled from "styled-components";

const ItemBox = styled.div`
    display:flex;
    flex-direction: column;
    font-size:11px;
    font-weight: 300;
    color:${props => props.theme.textColor};
`
const Item = styled.div`
    display:flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    margin-bottom:15px;
    border-radius:12px;
    padding:10px 20px;
`

interface coinId {
  coinId: string;
}

interface IPrice {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

// function Price(coinId: string) { 이렇게 바로 받으면 왜 안되지?
function Price({ coinId }: coinId) {
  const { isLoading, data } = useQuery<IPrice[]>(["price", coinId], () =>
    fetchCoinPrice(coinId)
  );
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <ItemBox>
          <Item>
                      {/* <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `${item.time_close.slice(5,10)}`)}</span> */}
                      <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `${item.time_close.slice(0,10)}`)}</span>
                      <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `${new Date(1538778600000)}`)}</span>
                  </Item>
                  <Item>
                      <span style={{color:"#c23616"}}>OPEN</span>
                      <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `$ ${item.open.toFixed(3)}`)}</span>
                  </Item>
                  <Item>
                      <span style={{color:"#c23616"}}>HIGH</span>
                      <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `$ ${item.high.toFixed(3)}`)}</span>
                  </Item>
                  <Item>
                      <span style={{color:"#0097e6"}}>LOW</span>
                      <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `$ ${item.low.toFixed(3)}`)}</span>
                  </Item>
                  <Item>
                      <span style={{color:"#0097e6"}}>CLOSE</span>
                      <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `$ ${item.close.toFixed(3)}`)}</span>
                  </Item>
                  <Item>
                      <span style={{color:"#dcdde1"}}>VOLUME</span>
                      <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `${item.volume}`)}</span>
                  </Item>
                  <Item>
                      <span style={{color:"#dcdde1"}}>market_cap</span>
                      <span style={{fontSize:15, fontWeight:400}}>{data?.map((item) => `${item.market_cap}`)}</span>
                  </Item>
          </ItemBox>
        </>
      )}
    </>
  );
}

export default Price;
