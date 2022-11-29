import dynamic from "next/dynamic";
import { useQuery } from '../hooks'

const CookieClicker = dynamic(() => import("react-cookie-clicker"), {
  ssr: false
});

const MoreCookies = () => {
  
  const { data } = useQuery(`query {
    scoreboard {
      count
    }
  }`)

  return (
    <div style={{ marginTop: 150 }}>
      <CookieClicker />
      <h2>Click the cookie</h2>
    </div>
  );
};

export default MoreCookies;