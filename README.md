# Aplicación de Editor de Fotos

Aplicación web para edición de imágenes con filtros en tiempo real, desarrollada con React y TypeScript.

## Versiones Utilizadas

- **React**: 19.0.0
- **TypeScript**: 5.7.2
- **Vite**: 6.2.0
- **ESLint**: 9.21.0

Estas versiones son importantes para asegurar la compatibilidad y el correcto funcionamiento de la aplicación. Se recomienda utilizar estas versiones específicas para evitar problemas de integración y errores inesperados.

## Características

- **Carga de imágenes**: Desde URL o archivo local (JPEG/PNG)
- **7 Filtros ajustables**: Brillo, Contraste, Saturación, Escala de grises, Sepia, Rotación de tono y Desenfoque
- **Descarga de resultados**: Exporta imágenes editadas en formato PNG
- **Reset completo**: Restablece filtros o imagen actual
- **Interfaz responsive**: Adaptable a diferentes tamaños de pantalla

## Tecnologías Utilizadas

- **React**: Biblioteca para construcción de interfaces
- **TypeScript**: Tipado estático para mayor seguridad
- **HTML5 Canvas**: Procesamiento de imágenes para exportación
- **CSS Moderno**: Flexbox y Grid para diseño responsivo
- **React Hooks**: useReducer y useState para gestión de estado

## Cómo Ejecutar la Aplicación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/isGregoDev/app-editor-de-fotos.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación.

## Descripción del Código

- **src/App.tsx**: Componente principal que gestiona el estado global de la imagen y las operaciones de reset
- **src/components/Editor.tsx**: Contiene la lógica de aplicación de filtros, controles interactivos y funcionalidad de descarga
- **src/components/Navbar.tsx**: Maneja la carga de imágenes (URL y archivos locales) y los controles de reset
- **src/types/editor.d.ts**: Define interfaces TypeScript para los filtros y propiedades del componente
