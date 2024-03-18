const light = {
  name: "light",
  color: {
    background: "lightgrey",
    border: "grey",
    text: "black",
  },
  button: {
    large: {
      fontSize: "1.5rem",
      padding: "1rem 2rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    small: {
      fontSize: "0.5rem",
      padding: "0.25rem 0.5rem",
    },
  },
  buttonSchema: {
    background: "#1778f7",
    color: "white",
  },
  input: {
    background: "#f0efef",
  },
};

const dark = {
  name: "dark",
  color: {
    background: "#202b38",
    border: "white",
    text: "#fff",
  },
  button: {
    large: {
      fontSize: "1.5rem",
      padding: "1rem 2rem",
    },
    medium: {
      fontSize: "1rem",
      padding: "0.5rem 1rem",
    },
    small: {
      fontSize: "0.5rem",
      padding: "0.25rem 0.5rem",
    },
  },
  buttonSchema: {
    color: "#ffbe85",
    background: "#161f27",
  },
  input: {
    background: "#dbdbdb",
  },
};

export const getTheme = (mode) => {
  return mode === "light" ? light : dark;
};
