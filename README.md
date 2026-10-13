# CaminoConPerro

Proyecto intermodular de DAM para ayudar a preparar el Camino de Santiago con
perro. Esta versión incluye una página React, un endpoint de prueba en FastAPI
y endpoints de lectura de caminos y etapas que requieren una base MySQL
configurada.

## Estructura

```text
CaminoConPerro/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── database.py
│   │   ├── init_db.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── route_schemas.py
│   │   ├── routes.py
│   │   └── schemas.py
│   ├── .env.example
│   └── requirements.txt
├── frontend/
│   ├── public/
│   │   └── Logo.png
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── package-lock.json
└── Logo.png
```

## Arquitectura inicial

- **Frontend:** React y Vite muestran la página de inicio y consultan
  `GET /api/health` y `GET /api/routes`.
- **Backend:** FastAPI expone los endpoints y permite las peticiones desde el
  frontend mediante CORS.
- **Configuración:** las direcciones se pueden ajustar con variables de entorno
  en archivos `.env` locales, que no se deben subir al control de versiones.
- **Validación:** Pydantic comprueba el formato de las respuestas de la API.
- **Base de datos:** SQLAlchemy está preparado para crear conexiones a MySQL
  usando variables locales. Los caminos y las etapas se leen de la base de
  datos; el proyecto no incluye datos inventados.

## Requisitos

- Windows 11.
- Node.js y npm.
- Python 3.10 o posterior, con `py` disponible en PowerShell.

## Preparación

Abre PowerShell en la carpeta del proyecto.

### Backend

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r requirements.txt
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Para usar la base de datos más adelante, configura en `backend/.env` las
variables `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER` y
`DATABASE_PASSWORD` con los datos de tu propia instalación local de MySQL. No
hay credenciales predeterminadas ni es necesario conectar MySQL para probar el
endpoint de salud.

En MySQL Workbench o en tu cliente local, puedes crear una base vacía para el
proyecto con:

```sql
CREATE DATABASE caminoconperro
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Después, configura `DATABASE_NAME=caminoconperro` y las demás variables con los
valores de tu instalación. Inicializa las tablas desde `backend` con el entorno
virtual activado:

```powershell
py -m app.init_db
```

Este comando crea las tablas `caminos` y `etapas` si todavía no existen. No
inserta filas. La API dispone de `GET /api/routes` para consultar los caminos y
sus etapas, y `GET /api/routes/{route_id}/stages` para consultar las etapas de
un camino concreto. La página de inicio muestra el catálogo y permite desplegar
las etapas registradas, con sus distancias, duración, dificultad y
recomendaciones para perros. Estos endpoints requieren que MySQL esté
configurado y en ejecución; si falta la configuración, la API devuelve un error
claro y el frontend lo muestra. En esta fase el catálogo es de solo lectura:
todavía no hay una pantalla para introducir o administrar caminos y etapas.

Si PowerShell impide activar el entorno virtual, ejecuta esta instrucción en
esa ventana y vuelve a activar el entorno:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
.\.venv\Scripts\Activate.ps1
```

### Frontend

Abre una segunda ventana de PowerShell, vuelve a la carpeta del proyecto y
prepara el frontend:

```powershell
cd frontend
npm install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

## Arranque

Con el entorno virtual activado, en la primera ventana de PowerShell:

```powershell
py -m uvicorn app.main:app --reload
```

En la segunda ventana de PowerShell:

```powershell
npm run dev
```

## Comprobación

1. Abre <http://127.0.0.1:8000/api/health>. Debe aparecer una respuesta JSON
   con `"status": "ok"`.
2. Abre <http://127.0.0.1:8000/docs> para ver la documentación automática de
   FastAPI.
3. Abre <http://localhost:5173>. La página debe mostrar el logo y el estado
   **Backend conectado**.

Si el frontend indica que el backend no está disponible, comprueba que las dos
ventanas siguen ejecutando sus servidores y que las direcciones del archivo
`frontend/.env` coinciden con el backend.
