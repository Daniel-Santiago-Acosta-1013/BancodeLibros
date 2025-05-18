# Banco de Libros - React Version

Este proyecto es una migración de la aplicación "Banco de Libros" a React, utilizando Vite, TypeScript y Tailwind CSS.

## Características

- **Interfaz moderna y responsiva** construida con React y Tailwind CSS
- **Sistema de enrutamiento** con React Router
- **Gestión de estado** usando Context API
- **Componentes reutilizables** para mantener un código limpio y eficiente
- **TypeScript** para un desarrollo más robusto y con tipos
- **Vite** como herramienta de desarrollo rápida

## Funcionalidades Principales

- Autenticación de usuarios
- Catálogo de libros físicos
- Biblioteca digital de e-books
- Gestión de préstamos y reservas
- Perfil de usuario personalizado
- Notificaciones de actividad

## Instalación

1. Clona este repositorio:
```bash
git clone <url-del-repositorio>
cd BancodeLibros-React
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
BancodeLibros-React/
├── public/                # Archivos estáticos
├── src/                   # Código fuente
│   ├── assets/            # Imágenes, fuentes, etc.
│   ├── components/        # Componentes reutilizables
│   ├── context/           # Contextos para gestión de estado
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Componentes de página
│   ├── types/             # Definiciones de tipos TypeScript
│   ├── App.tsx            # Componente principal
│   ├── index.css          # Estilos globales
│   └── main.tsx           # Punto de entrada
├── index.html             # Archivo HTML base
├── package.json           # Dependencias y scripts
├── postcss.config.js      # Configuración de PostCSS
├── tailwind.config.js     # Configuración de Tailwind CSS
├── tsconfig.json          # Configuración de TypeScript
└── vite.config.ts         # Configuración de Vite
```

## Uso

Para iniciar sesión en la aplicación demo, utiliza estas credenciales:
- Usuario: `testuser`
- Contraseña: `password123`

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run preview`: Previsualiza la aplicación construida localmente.

## Tecnologías Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **TypeScript**: Superset de JavaScript con tipos estáticos.
- **React Router**: Para la navegación entre páginas.
- **Tailwind CSS**: Framework de utilidades CSS para el diseño.
- **Vite**: Herramienta de construcción moderna y rápida.
- **Font Awesome**: Para iconos.

## Contribución

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las mejores prácticas de código y mantener la estructura del proyecto.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
