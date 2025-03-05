// components/Navbar.tsx
import React, { ChangeEvent, useRef } from "react";

interface NavbarProps {
  background: string | null;
  setBackground: React.Dispatch<React.SetStateAction<string | null>>;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  background,
  setBackground,
  handleFileUpload,
  onReset,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    // Limpiar inputs
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (urlInputRef.current) urlInputRef.current.value = "";
    // Ejecutar reset original
    onReset();
  };

  return (
    <nav>
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter image URL"
          value={background || ""}
          onChange={(e) => setBackground(e.target.value)}
          ref={urlInputRef}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="file-input"
        />
        <button onClick={handleReset}>Resetear imagen</button>
      </div>
    </nav>
  );
};

export default Navbar;
