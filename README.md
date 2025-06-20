# 📊 Budget Table - Sistema de Gestión de Presupuesto

## 🚀 Instalación y Configuración

Para instalar y ejecutar el proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd budget-table
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno** (si aplica):
   ```bash
   cp .env.example .env
   ```

4. **Iniciar la aplicación**:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **Abrir en el navegador**:
   ```
   http://localhost:5173
   ```

## 🛠 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18+ | Biblioteca principal para la interfaz de usuario |
| TypeScript | 4.9+ | Tipado estático para mayor seguridad en el código |
| Tailwind CSS | 3.3+ | Framework CSS para estilizado rápido y responsive |
| ExcelJS | 4.3+ | Generación de archivos Excel desde los datos |
| Vite | 4.0+ | Bundler y entorno de desarrollo rápido |
| React Icons | 4.7+ | Biblioteca de iconos para la interfaz |

## 💡 Funcionalidades Principales

### 📋 Gestión de Partidas Presupuestarias
- **Agregar/Editar filas** para diferentes conceptos de gasto
- **Selección de categorías COG** desde un listado predefinido
- **Distribución mensual** del presupuesto

### 🔢 Cálculos Automáticos
- **Total por fila**: Suma automática del presupuesto por concepto
- **Total por mes**: Consolidado de todos los conceptos por mes
- **Total general**: Suma total del presupuesto asignado

### 📊 Exportación de Datos
- **Generación de reportes en Excel** con un solo click
- **Formato predefinido** listo para presentación
- **Incluye totales** y formato condicional básico

### 🎛️ Características Avanzadas
- **Persistencia local**: Los datos se guardan automáticamente en el navegador
- **Tooltips descriptivos**: Información adicional al pasar el mouse

## 🏗️ Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   └── BudgetTable/  # Componente principal
│       ├── hooks/    # Custom hooks
│       ├── reducers/ # Lógica de estado
│       ├── types/    # Definiciones TypeScript
│       └── utils/    # Funciones utilitarias
├── pages/            # Vistas/páginas
├── styles/           # Estilos globales
└── types/            # Tipos globales
```