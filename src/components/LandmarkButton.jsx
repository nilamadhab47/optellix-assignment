

export const LandmarkButton = ({ active, onClick, name }) => (
    <button
      style={{ backgroundColor: active ? "black" : "lightgray" }}
      onClick={onClick}
    >
      {name}
    </button>
  );
  