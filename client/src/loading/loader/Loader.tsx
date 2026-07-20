import { Spin } from "antd";

export default function PageLoader() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Spin size='large' />
      <p style={{ color: "#6B7280", fontSize: 14 }}>Loading...</p>
    </div>
  );
}
