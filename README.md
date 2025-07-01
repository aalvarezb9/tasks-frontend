# tasks-frontend

Aplicación Angular 20 para consumir la API de tareas.

---

## Requisitos

- Node.js ≥ 18
- npm o yarn
- Angular CLI (`npm install -g @angular/cli`)


## `.env.example`

## Instalación

```bash
git clone https://github.com/aalvarezb9/tasks-frontend.git
cd tasks-frontend
npm ci
```

## Desarrollo local

```bash
npm run start
```

- La app arranca en `http://localhost:4200`

## Producción

```bash
npm run build -- --configuration production
```

Los artefactos se generan en `dist/tasks-frontend/`.

## Pruebas

```bash
npm test
```

## CI/CD con GitHub Actions

### Secrets necesarios

- FIREBASE_SERVICE_ACCOUNT: valor del sa.json generado en la consola de google
  

### Workflow: `.github/workflows/*.yml`


La app queda disponible en `https://tasks-fronted.web.app/login`.

## NOTAS

Iniciar sesión con el usuario de prueba:

Correo: test@example.com
Contraseña: secret123

