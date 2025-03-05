// src/App.tsx
import React, { useState, ChangeEvent } from "react";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";

const App: React.FC = () => {
  const [background, setBackground] = useState<string | null>("");

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];

    if (background && background.startsWith("blob:")) {
      URL.revokeObjectURL(background);
    }

    setBackground(file ? URL.createObjectURL(file) : null);
  };

  const handleResetBackground = () => {
    if (background && background.startsWith("blob:")) {
      URL.revokeObjectURL(background);
    }
    setBackground(null);
  };
  return (
    <div className="app">
      <Announcement />
      <Navbar
        background={background}
        setBackground={setBackground}
        handleFileUpload={handleFileUpload}
        onReset={handleResetBackground}
      />
      {background ? (
        <Editor background={background} />
      ) : (
        <div className="placeholder">
          <p>Selecciona una imagen para comenzar a editar</p>
        </div>
      )}
    </div>
  );
};

export default App;
