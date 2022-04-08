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
  console.log(data);

  const mappedOhlcvData = data?.map((data: IHistorical) => ({
    x: data.time_open,
    y: [data.open.toFixed(2), data.high.toFixed(2), data.low.toFixed(2), data.close.toFixed(2)],
    }));

    // const mappedOhlcvData = data?.map((data: IHistorical) => {
    //   return {
    //     x: data.time_open,
    //     y: [
    //       data.open.toFixed(2),
    //       data.high.toFixed(2),
    //       data.low.toFixed(2),
    //       data.close.toFixed(2),
    //     ],
    //   };
    // });

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart 
        type="candlestick"
        series={[{ data: mappedOhlcvData }] as unknown as number[]}
        options={{
          theme: {
            mode: isDark ? "dark" : "light",
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