import { Spin } from "antd";

function Loader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size='large' />
    </div>
  );
}

export default Loader;
