export const MenuContent = (type) => {
  const css = {
    default: {
      borderRadius: "6px",
      cursor: "pointer",
      backgroundColor: "#fff",
      color: "#000",
      transition: "all 0.4s ease 0s",
      transform: "scale(0.9)",
    },
    all: {
      borderRadius: "6px",
      cursor: "pointer",
      backgroundColor: "rgb(23, 152, 251)",
      color: "#fff",
      transition: "all 0.4s ease 0s",
      transform: "scale(1.02)",
    },
    pending: {
      borderRadius: "6px",
      cursor: "pointer",
      backgroundColor: "rgb(23, 152, 251)",
      color: "#fff",
      transition: "all 0.4s ease 0s",
      transform: "scale(1.02)",
    },
    completed: {
      borderRadius: "6px",
      cursor: "pointer",
      backgroundColor: "rgb(23, 152, 251)",
      color: "#fff",
      transition: "all 0.4s ease 0s",
      transform: "scale(1.02)",
    },
  };

  const result = css[type] ?? {};
  return result;
};
