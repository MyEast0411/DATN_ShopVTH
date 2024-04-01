import { useParams } from "react-router-dom";
import AfterSearch from "./AfterSearch";
import BeforeSearch from "./BeforeSearch";

function InforBill() {
  const { id } = useParams();
  return (
    <>
      {/* {id == 1 ?  */}
      {/* <BeforeSearch /> */}
      {/* :
   
  }
   </>; */}
      <AfterSearch />
    </>
  );
}

export default InforBill;
