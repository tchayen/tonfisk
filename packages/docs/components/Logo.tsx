export function Logo({ size }: { size?: number }): JSX.Element {
  return (
    <h1
      style={{
        fontSize: size || 64,
        backgroundColor: "#f3ec78",
        backgroundImage: "linear-gradient(90deg,#12c2e9,#c471ed,#f64f59)",
        backgroundSize: "100%",
        WebkitBackgroundClip: "text",
        MozBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      tonfisk 🐟
    </h1>
  );
}
