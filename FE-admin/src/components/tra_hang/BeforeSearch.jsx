import { Result } from "antd";

function BeforeSearch() {
  return (
    <div
      className="filter-scan flex justify-center mt-5
        space-x-8
      "
    >
      <Result
        status="404"
        title="Trả Hàng"
        subTitle="Có điều gì đã xảy ra với sản phẩm"
        // extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
}

export default BeforeSearch;
