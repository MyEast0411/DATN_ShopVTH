import { TailSpin } from "react-loader-spinner";

const TailSpinLoading = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(1px)",
        }}
      >
        <TailSpin
          height="80"
          width="80"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{}}
          wrapperClass=""
          color="#4fa94d"
          radius="1"
        />
      </div>
    </>
  );
};

export default TailSpinLoading;
