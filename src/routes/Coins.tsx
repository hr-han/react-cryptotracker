import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { ICoin } from "../interface";

const Container = styled.div`
  padding: 0 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  position: relative;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 20px;
`;

const Img = styled.img`
  width: 35px;
  height: 35x;
  margin-right: 10px;
`;

const Toggle = styled.div`
  width: 35px;
  height: 35px;
  margin: 10px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: ${(props) => props.theme.textColor};

  border: 2px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.accentColor};
  }
`;

function Coins() {
  // // loading
  // const [loading, setLoading] = useState(true);
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // useEffect(() => {
  //   // 즉시 실행
  //   // 이렇게 안써주면 함수만들어서 async await 해야함...
  //   (async () => {
  //     const response = await fetch(
  //       "https://api.coinpaprika.com/v1/coins"
  //     ).then((res) => res.json());
  //     setCoins(response.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  // 뷰모드 제어
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleDarkMode = () => setIsDark((prev) => !prev);

  const { isLoading, data } = useQuery<ICoin[]>(
    "allCoins",
    fetchCoins
  );

  return (
    <Container>
      {/* html head로 가는 다이렉트 링크다. 파비콘 등등 head에서 변경할수 있는걸 설정할수있다. */}
      <Helmet>
        <title>COINS</title>
      </Helmet>
      <Header>
        <Title>COINS</Title>
        <Toggle onClick={toggleDarkMode}>
          {isDark ? <FaMoon /> : <IoMdSunny />}
        </Toggle>
      </Header>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <CoinList>
          {data?.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={`/${coin.id}`}
                state={{ name: coin.name }}
              >
                <Img src={coin.img} alt={coin.symbol} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
