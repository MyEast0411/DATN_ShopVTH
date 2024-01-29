import { useEffect } from "react";
import { getProvinces } from "../apis/Location_2";

export default function Test() {
  useEffect(() => {
    console.log(getProvinces);
  }, []);

  return <div>Test</div>;
}
