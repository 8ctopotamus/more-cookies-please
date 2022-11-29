import dynamic from "next/dynamic";
import { useCountMutation, useScoreQuery } from '../hooks'

const CookieClicker = dynamic(() => import("react-cookie-clicker"), {
  ssr: false
});

const MoreCookies = () => {
  
  // const { data } = useCountMutation(10)
  const { data } = useScoreQuery()
  console.log(data)

  return (
    <div style={{ marginTop: 150 }}>
      <CookieClicker />
      <h2>Click the cookie</h2>
    </div>
  );
};

export default MoreCookies;