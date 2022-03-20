import styled from "styled-components";

const Container = styled.div`
  max-width: 330px;
  margin: 0 auto;
`;

const BoxList = styled.ul``;

const BoxContainer = styled.li`
  margin-bottom: 10px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #95afc0;
`;

const Box = styled.span`
  background-color: #c7ecee;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  padding: 10px;
  margin-top: 10px;
  font-weight: 600;
  color: #30336b;
  /* title */
  &:first-child {
    margin-bottom: 10px;
    margin-top: 0px;
  }
`;
interface IPrice {
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
}

function Price(priceInfo: IPrice) {
  console.log("price : ", priceInfo);
  return (
    <Container>
      <BoxList>
        <BoxContainer>
          <Box>price</Box>
          <Box>$ {priceInfo.price.toFixed(3)}</Box>
        </BoxContainer>
        <BoxContainer>
          <Box>market cap</Box>
          <Box>{priceInfo.market_cap.toFixed(3)}T</Box>
        </BoxContainer>
        <BoxContainer>
          <Box>volum</Box>
          <Box>{priceInfo.volume_24h.toFixed(3)}D</Box>
        </BoxContainer>
      </BoxList>
    </Container>
  );
}

export default Price;
