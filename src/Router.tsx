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
    <BrowserRouter>
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
