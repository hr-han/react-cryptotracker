import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 중첩라우터 사용할 경우 * 추가 해야함 */}
        <Route path="/:coinId/*" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;