import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChart {
  coinId: string;
}

interface IHistoryData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: IChart) {
  const { isLoading, data } = useQuery<IHistoryData[]>(
    ["history", coinId],
    () => fetchCoinHistory(coinId)
  );

  const isDark = useRecoilValue(isDarkAtom);
  return (
    <div>
      {isLoading ? (
        "Loading Charts ...."
      ) : (
        <ApexCharts
          type="candlestick"
          // series={[ // type:"line"
          //   {
          //     name: "Price",
          //     data: data?.map((price) => price.close) ?? [], // null 병합 연산자
          //     // data: data?.map((price) => price.close) as number[], // number[]로 강제
          //   },
          // ]}
          series={[
            {
              data:
                data?.map((price) => {
                  return {
                    x: price.time_open,
                    y: [
                      price.open.toFixed(3),
                      price.high.toFixed(3),
                      price.low.toFixed(3),
                      price.close.toFixed(3),
                    ],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 200,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            //stroke: { curve: "smooth" },
            grid: { show: false },
            yaxis: { labels: { show: false } },
            xaxis: {
              type: "datetime", // Oct 12 처럼 날짜형식으로 보여짐
              // categories:
              //   data?.map(
              //     (price) => price.time_close.split("T")[0] // time 부분은 버림
              //   ) ?? [],
              axisTicks: { show: false },
              axisBorder: { show: false },
              labels: { show: false },
            },
            // fill: {
            //   type: "gradient", // 선색 그라데이션
            //   gradient: {
            //     gradientToColors: ["blue"],
            //     stops: [0, 100],
            //   },
            // },
            //colors: ["red"], // 선색
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#3C90EB",
                  downward: "#DF7D46",
                },
              },
            },
            tooltip: {
              enabled: true,
              // y: {
              //   formatter: (value) => {
              //     console.log(`$ ${value.toFixed(3)}`);
              //     return `$ ${value.toFixed(3)}`; // 소수점 3째자리까지
              //   },
              // },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
