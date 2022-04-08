import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
// react query는 api.ts에 적어놨듯, 캐시에 데이터를 저장하는데 이것을 시각적으로 보기 위해 devtools을 제공하는데, 이걸 이용하면 캐시에 있는 query를 볼 수 있다.
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import {useState} from "react"
import { isDarkAtom } from "./atoms";
import { useRecoilValue } from "recoil";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
*{
    box-sizing:border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor}
}
a {
    text-decoration:none;
    color:inherit;
}

`;

function App() {
  // const [isDark, setIsDark] = useState(true);
  // const toggleDark = () => setIsDark(current => !current)
  // 만약 리코일 없다면 이렇게 해서 원하는 컴포넌트까지 props 계속 전달해줘야한다. 이 부분  5.1~5.2
  const isDark = useRecoilValue(isDarkAtom)
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {/* ThemProvider를 index.ts에서 App.tsx로 옮겼다. state를 사용하기 위해서 */}
        <GlobalStyle />
        <Router/>
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;


// global state란 이런 것이다.
// App(isDark, modifierFn)
//   -> Router -> Coins (modifier)
//   -> Router -> Coin -> Chart (isDark)
// 즉,
// isDark : App -> Router -> Coin -> Chart
// toggleDark : App -> Router -> Coins


// 만약 state management를 사용한다면?
// 위처럼 부모가 자식에게 prop을 내려주는 계층 구조 대신에

// Header -> (isDark) <- Chart
// state를 어떤 비눗방울 안에 넣고, chart가 접근할 수 있도록 한다. Header도 접근할 수 있다. App.js에서도 마찬가지로 접근할 수 있다. 

// 근데 themeProvider에서는 맨 위 컴포넌트에 주니 다른 컴포넌트들 다 props로 받을 수 있었는데?

