import { useParams, useLocation } from "react-router";
import styled from "styled-components";
import {
  Link,
  Route,
  Routes,
  useMatch,
} from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 50px 0;
  position: relative;
`;

const BackBtn = styled.span`
  font-size: 30px;
  position: absolute;
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 20px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
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
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.textColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive
      ? props.theme.accentColor
      : props.theme.bgColor};
  a {
    display: block;
  }
`;

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
  // path val
  const { coinId } = useParams();

  // 비하인드더씬 params
  const location = useLocation();
  const state = location.state as RouteState;

  // url 매칭 여부
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  //   // loading
  //   const [loading, setLoading] = useState(true);
  //   // state
  //   const [info, setInfo] = useState<InfoData>();
  //   const [price, setPrice] = useState<PriceData>();
  //   useEffect(() => {
  //     (async () => {
  //       // 코인 정보
  //       const infoData = await (
  //         await fetch(
  //           `https://api.coinpaprika.com/v1/coins/${coinId}`
  //         )
  //       ).json(); // then 안쓰고 한줄로 쓰는법
  //       // 코인 가격 정보
  //       const priceData = await (
  //         await fetch(
  //           `https://api.coinpaprika.com/v1/tickers/${coinId}`
  //         )
  //       ).json();
  //       setInfo(infoData);
  //       setPrice(priceData);
  //       setLoading(false);
  //     })();
  //   }, [coinId]);

  const { isLoading: infoLoading, data: info } =
    useQuery<InfoData>(["info", coinId], () =>
      fetchCoinInfo(coinId!)
    );

  const { isLoading: priceLoading, data: price } =
    useQuery<PriceData>(
      ["price", coinId],
      () => fetchCoinPrice(coinId!), // coinId 값은 무조건있다!
      { refetchInterval: 5000 } // 5초 마다 재취득
    );

  const isLoading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name
            ? state.name
            : isLoading
            ? "Loading..."
            : info?.name}
        </title>
      </Helmet>
      <Header>
        <BackBtn>
          <Link to={`/`}>&larr;</Link>
        </BackBtn>
        <Title>
          {state?.name
            ? state.name
            : isLoading
            ? "Loading..."
            : info?.name}
        </Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>
                $ {price?.quotes.USD.price.toFixed(3)}
              </span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Routes>
            {/* ~/:coinId/price 와 같음*/}
            <Route
              path="price"
              element={<Price {...price?.quotes.USD!} />}
            />
            <Route
              path="chart"
              element={<Chart coinId={coinId!} />}
            />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
