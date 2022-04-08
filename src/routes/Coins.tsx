import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
// props 로 theme 받아올 수 있는 이유는 index.tsx 보면 App.tsx가 ThemeProvider 내부에 있고 ThemeProvier가 theme을 props로 전달받았기 때문에 App.tsx도 theme을 사용할 수 있고, 그 하위 컴포넌트들도 theme을 사용할 수 있다.
import { Helmet } from "react-helmet";
import { useSetRecoilState, useRecoilState } from "recoil";
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
  
  button {
    width: 50px;
    height: 50px;
    color:${props => props.theme.textColor};
    font-size:24px;
    background-color: inherit;
    border:none;
  }
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  /* transition:color 0.2s ease-in; */
  a {
    transition: color 0.2s ease-in;
    padding: 20px;
    // padding 준 이유는 a태그의 너비 넓히기 위해서. Coin의 padding은 지워줬음.
    display: flex;
    align-items: center;
    /* flex해서 align-itmes 써서 코인 이미지 위치 수정하려고 */
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
    // 아래에서는 Link컴포넌트 썼는데 여기에선 hover를 a태그에 준 이유는, 결국 Link컴포넌트는 브라우저에서 a태그로 바뀌기 때문임.  그래도 a태그와 같지는 않다. 특별한 몇몇 이벤트를 가지고 있기 때문
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
// display:block 주기 싫으면 그냥 div로 만들던가.

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

interface ICoinsProps {
  // toggleDark : ()=>void;
}

function Coins({}: ICoinsProps) {
  // toggleDark 함수를 Router.tsx에서 파라미터로 전달받았다.
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  // useQuery 두개의 arguments 갖는다. 고유한 key와 fetcher함수.
  // isLoading에서 fetcher함수가 끝났는지 안끝났는지 알려주고, 끝났으면 그 데이터를 data에 넣어준다. ㄷㄷ 그러니까 fetch,async,response,json,setCoins,setLoading을 생략한거다.

  /*   const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // fetch("https://api.coinpaprika.com/v1/coins")
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
    // (()=>console.log(1))(); 이렇게 쓰면 함수가 바로 실행된다고 한다. 작은 꿀팁? 이전엔 async function hello() {} 했었다.
  }, []); */
  // const setDarkAtom = useSetRecoilState(isDarkAtom);
  // 여기선 useRecoilValue 가 아니라 useSetRecoilState써서 isDarkAtom의 값을 바꿔줄거다. setDarkAtom이 isDarkAtom의 useState이다. 라고 이해함.
  // const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkAtom  = () => {setIsDark(curr => !curr)}

  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <button>🔚</button>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>{isDark ? "🌞" : "🌚"}</button>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                {/* 여태 Link에서 pathname만을 다뤘지만, state를 통하면 데이터를 전달할 수도 있다. state를 전달할 수 있다.*/}
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                ></Img>
                {coin.name} &rarr;
              </Link>
              {/* 이 링크로 들어가고, 링크의 / 이후가 useParams에 의해 변수 coinId의 값으로 저장된다는거 알고있지? */}
              {/* 데이터 없어도 Coin에 대한 interface 설정해주니 오류 안뜬다. */}
              {/* 이게 프로토타입 설정인가? */}
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
