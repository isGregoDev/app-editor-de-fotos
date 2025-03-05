import React, { useReducer, useRef } from "react";

interface FiltersState {
  brightness: number;
  contrast: number;
  saturate: number;
  grayscale: number;
  sepia: number;
  hueRotate: number;
  blur: number;
}

interface EditorProps {
  background: string;
}

type FilterKeys = keyof FiltersState;

type Actions =
  | { type: "SET_FILTER"; filter: FilterKeys; value: number }
  | { type: "RESET" };

const InitialState: FiltersState = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  blur: 0,
};

function filtersReducer(state: FiltersState, action: Actions): FiltersState {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, [action.filter]: action.value };
    case "RESET":
      return InitialState;
    default:
      return state;
  }
}

const Editor: React.FC<EditorProps> = ({ background }) => {
  const [filters, dispatch] = useReducer(filtersReducer, InitialState);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    const img = new Image(); // Crear nueva instancia de Image
    img.crossOrigin = "anonymous"; // 🔑 Solución clave para CORS

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Aplicar filtros
      ctx.filter = `
            brightness(${filters.brightness}%)
            contrast(${filters.contrast}%)
            saturate(${filters.saturate}%)
            grayscale(${filters.grayscale}%)
            sepia(${filters.sepia}%)
            hue-rotate(${filters.hueRotate}deg)
            blur(${filters.blur}px)
        `;

      ctx.drawImage(img, 0, 0);

      // Crear enlace de descarga
      const link = document.createElement("a");
      link.download = "edited-image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.onerror = () => {
      console.error("Error loading image");
      alert("No se puede descargar imágenes de este dominio");
    };

    img.src = background; // Asignar src después de configurar eventos
  };
  return (
    <div className="editor">
      <div className="image-wrapper">
        <img
          ref={imageRef}
          src={background}
          alt="Editable"
          style={{
            filter: `
              brightness(${filters.brightness}%) 
              contrast(${filters.contrast}%) 
              saturate(${filters.saturate}%) 
              grayscale(${filters.grayscale}%) 
              sepia(${filters.sepia}%) 
              hue-rotate(${filters.hueRotate}deg) 
              blur(${filters.blur}px)
            `,
          }}
        />
      </div>
      <div className="controls">
        {(Object.keys(InitialState) as FilterKeys[]).map((key) => (
          <div key={key} className="control">
            <label>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {filters[key]}
            </label>
            <input
              type="range"
              min={key === "hueRotate" ? 0 : key === "blur" ? 0 : 0}
              max={
                key === "brightness" || key === "contrast" || key === "saturate"
                  ? 200
                  : key === "hueRotate"
                  ? 360
                  : 100
              }
              value={filters[key]}
              onChange={(e) =>
                dispatch({
                  type: "SET_FILTER",
                  filter: key,
                  value: Number(e.target.value),
                })
              }
            />
          </div>
        ))}
        <button onClick={() => dispatch({ type: "RESET" })}>
          Reiniciar Filtros
        </button>
        <button onClick={handleDownload}>Descargar Imagen</button>
      </div>
    </div>
  );
};

export default Editor;
