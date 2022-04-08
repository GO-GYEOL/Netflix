import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  // isDark:boolean;
}

function Chart({ coinId }: ChartProps) {
  // props를 이렇게 받을 수 있다. 뒤에는 interface
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  // 참고로 실행할때 (arg)는 주는거고, 함수 정의할 때 (arg)는 받는거다.@

//   const xyarr = () => {
//     data?.map((item) => {
//       let x = item.time_close.slice(0, 10);
//       let y = [item.open, item.high, item.low, item.close];
//       return { x: x, y: y };
//     });
//   };
const isDark = useRecoilValue(isDarkAtom);


  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: data?.map((price) => price.close) as number[],
            /* data: data?.map(price => ({
                x:price.time_close,
                y:[price.open, price.high, price.low, price.close]
            })) */
          },
        ]}
          //   data: data?.map((price) => price.close) as number[],
          // data: data?.map((price => price.close)) ?? [],
          // 로 해도된다. data는 숫자를 받아야되는데 읽어오면 number이지만 못읽어오면 undefined이기 때문에 as number[]을 붙여준 것이다.
          
          
          // 여기 결국 candlestick로 못바꿨다. @@ 일단 5강 끝내고 candlestick하자.
          
          options={{
            theme: {
              mode:  isDark ?  "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#4cd137"], stops: [0, 60] },
            },
            colors: ["#00a8ff"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
