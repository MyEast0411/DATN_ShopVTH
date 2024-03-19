import { ThreeDots } from "react-loader-spinner";

const ThreeDotsLoading = () => {
  return (
    <>
      <div
        // style={{
        //   position: "fixed",
        //   top: "-100",
        //   left: "0",
        //   width: "100%",
        //   height: "100%",
        //   backgroundColor: "rgba(0, 0, 0, 0.1)",
        //   zIndex: 9999,
        //   display: "flex",
        //   justifyContent: "center",
        //   alignItems: "center",
        //   backdropFilter: "blur(1px)",
        // }}
        style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
      >
        <ThreeDots
          height="80"
          width="80"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          color="#4fa94d"
          radius="1"
        />
      </div>
    </>
  );
};

export default ThreeDotsLoading;
