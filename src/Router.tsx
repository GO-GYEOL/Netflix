import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  // toggleDark: () => void;
  // 함수를 props로 받고싶으면 어떤 형태인지를 명시해줘야한다. App.tsx에서 toggleDark 위에 마우스 올려보면 나온다.
  // isDark: boolean;
}

function Router({}:IRouterProps ) {
  // 받은 props의 타입을 지정해줬다. 이 props는 App.tsx로부터 전달받았다. 
  return (
    // basename 지정해야된다. 안하면 homepage에 넣어준 주소 즉 CRYPTO-TRACKER 가 coinId로 받아져서 계속 json을 엉뚱한 곳에서 불러오게된다.
    <BrowserRouter basename={process.env.PUBLIC_URL}>  
      <Switch>
        <Route path="/:coinId">
          <Coin/>
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;

// Router에게 URL에서 / 이후 부분을 parameter
