import {
  useParams,
  useLocation,
  useRouteMatch,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { useRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 20px;

  button {
    width:50px;
    height:50px;
    font-size:24px;
    border:none;
    background-color:transparent;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  // isActive부분 잘 모르겠다. 왜 이렇게 한거지? isActive를 props로 받아온다고 설정한거같은데..
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}
// interface ITag {
//   coin_counter: number;
//   ico_counter: number;
//   id: string;
//   name: string;
// }
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  //   tags: ITag[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
  // console.log(infoData) 해서 나온 Object를 오른쪽 마우스 클릭하여 글로벌변수로 지정한다. 그러면 temp1이 되는데, Object.keys(temp1).join()을 하면 string으로 나온다. 마찬가지로 Object.values(temp1).map(v=>typeof v).join() 해서 데이터타입 복사해서 위처럼 데이터타입 지정해줌. *join 안하면 그대로 array형태이다.
  // 단축키는 cntl + d, shift + alt + i
  // JS에서 array도 object로 나오므로, tags 는 object가 아닌 array이므로, 하나의 새로운 interface 만들어서 데이터값 할당해줘야한다. 근데 여기선 필요없으므로 지워줄 것.
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {
  // isDark:boolean
}

function Coin({}: ICoinProps) {
  // const {coinId} = useParams<{coinId:string}>();
  const { coinId } = useParams<RouteParams>();
  //   const location = useLocation();
  const { state } = useLocation<RouteState>();
  // useLocation을 이용하면 전달받은 state가 있다. 이 페이지가 가지고 있는 정보를 주는 것 같은데?
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");
  // useRouteMatch는 현재 특정한 URL에 있는지 여부를 알려주는 react hook이다.

  // React Query 쓰면 여기 아래부분 다 지워도된다.
  /* const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      // 한 줄로 바꿀 수 있다. await (response).json()과 같은거임
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); */
  // []를 dependency라고 한다. []안의 변수가 바뀔 때 마다 useEffect를 수행하는데, []에 아무것도 넣지 않으면 처음 한번만 하고 끝난다. 내가 원하는 기능은 한번만 하면 되는데, 아무것도 넣지않으면 경고를 주기도 한다고한다. 안에 dependency 넣어주는게 성능에 더 좋다고 하여 coinId를 넣어준 것. 어차피 coinId는 바뀔 일이 없기 때문.

  // react query 써서 아래처럼 바꿔줬다.
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  // coins.tsx에서는 파라미터 필요 없었으므로 fetcher함수 그냥 불러오면 됐지만 여긴 필요하므로 콜백함수로 불러왔다. 그냥 fetchCoinInfo(coinId)하면 바로 실행되기 때문에 콜백으로 하는거 기억하고있다.
  // 그리고 그냥 coinId로 해도 되지만, 아래에 tickers에서도 coinId가 필요하므로, 독립적인 key로 만들어주기 위해서 info와 tickers를 추가했다. query는 list 형태로 가지기 때문에 이같은게 가능하다고 한다. 알고만 있자.
  // isLoading도 마찬가지다. 이름이 겹치므로 바꿔줬다.
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  // 여기서 useQuery에서 3개의 arg를 받는 방법도 알 수 있다. 5000ms마다 refetch(새로받아오기) 한다. 첫번째는 unique한 key, 두번째는 fetcher함수, 세번째는 refetchInterval

  const [isDark, setIsDark] = useRecoilState(isDarkAtom)
  const onClick = () => {setIsDark(curr => !curr)}

  const loading = infoLoading || tickersLoading;
  // && 여야하는거 아닌가?
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        {/* <Title>코인 {coinId}</Title> */}
        {/* coinId를 써도 되지만, 지정된 이름이 좀 못생겼다. 그래서 Coins.tsx에서 state: { name: coin.name } 를 Coin.tsx로 보내서 사용하기로 했다. */}
        <button><Link to="/">🔚</Link></button>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          {/* 근데 이렇게하면 Home 페이지를 거치지 않고 바로 링크를 타고 들어올 경우 state.name 데이터가 존재하지 않게되어 오류가 난다. 그래서 ?찍어줌. 삼항연산자. */}
          {/* 방법 약간 바뀜. 홈페이지를 통해 와서 state가 있으면 state.name 찍어주고, state가 없다면, 그리고 loading이 true면 loading, false면 info.name을 찍어준다.  */}
        </Title>
        <button onClick={onClick}> {isDark ? "🌞" : "🌚"} </button>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
              {/* priceInfo? 에서 ? 가 아주 좋다. 일종의 보험이다. 만약 priceInfo에 데이터가 없어서 undefined이 나온다면 데이터를 요구하지 않는다. 만약 ?가 없으면 데이터 없을 경우 오류난다. */}
              {/* priceInfo -> tickersData로 바꿨다. react query 쓰면서 바꿈. 마찬가지로 info -> infoData로 바꿨다. */}
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          {/* 아래부터 nested Route라고 한다. route 내부에 또 다른 route가 있는 것 */}
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              {/* useRouteMatch 사용함. console.log(chartMatch)해보면, /chart에 있을 때 페이지 정보를 찍어줌. 그 페이지 아니면 null임 */}
              <Link to={`/${coinId}/chart`}>CHART</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>PRICE</Link>
            </Tab>
          </Tabs>
          {/* Link에선 /:coinId 못쓰나보다.  */}

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
              {/* 당연히 Chart는 coinId props를 가지고 있지 않으니, Chart에 가서 interface 설정해준다. */}
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}
export default Coin;
