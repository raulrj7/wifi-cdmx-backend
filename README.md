# Proyecto Wifi CDMX Backend

## Descripción

Este proyecto es un backend para la gestión de puntos WiFi en la Ciudad de México. Está diseñado para ser escalable, mantenible y eficiente, asegurando un procesamiento óptimo de grandes volúmenes de datos y una experiencia segura para los usuarios.

El backend utiliza **Node.js 22**, **Fastify** como framework, **GraphQL** para login y consultas de puntos WiFi, y **REST** para la carga de archivos CSV o XLSX. Las cargas masivas se procesan de manera asíncrona utilizando **Bull** y **Redis**. La base de datos es **PostgreSQL** y Prisma se encarga de la interacción con la base de datos.

---

## Requisitos

* Node.js v22
* Docker y Docker Compose
* PostgreSQL 16 (contenedor incluido en Docker Compose)
* Redis 7 (contenedor incluido en Docker Compose)
* npm

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/wifi_cdmx?schema=public"
JWT_SECRET="supersecretCdmx"
```

---

## Docker Compose

El proyecto incluye un archivo `docker-compose.yml` que levanta PostgreSQL y Redis:

```bash
docker-compose up -d
```

Esto levantará:

* PostgreSQL: puerto `5432`, base de datos `wifi_cdmx`, usuario `postgres`, contraseña `postgres`.
* Redis: puerto `6379` para el manejo de colas asíncronas con Bull.

---

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar migraciones y crear tablas desde cero:

```bash
cd prisma
npx prisma migrate dev --name init
```

3. Crear usuario administrador por defecto:

```bash
npm run seed
```

> Usuario generado: `admin@cdmx.com`
> Contraseña: `admin123`

4. Levantar la API en modo desarrollo:

```bash
npm run dev
```

5. Ejecutar worker para procesamiento de archivos en background:

```bash
npm run worker
```

---

## Diseño de la Solución

El proyecto está diseñado para ser escalable, mantenible y eficiente, asegurando un procesamiento óptimo de grandes volúmenes de datos.

### Arquitectura General

* **Resolvers (GraphQL):** Exponen endpoints públicos de la API y reciben solicitudes de los clientes.
* **Servicios:** Contienen la lógica de negocio, incluyendo validaciones, cálculos y operaciones sobre la base de datos.
* **Prisma ORM:** Gestiona la interacción con PostgreSQL, asegurando integridad de datos y operaciones optimizadas.
* **Workers (Bull + Redis):** Procesan cargas de archivos de manera asíncrona en lotes, evitando bloquear la API y permitiendo reintentos automáticos en caso de errores.
* **Fastify:** Framework backend para manejo de rutas REST y GraphQL de manera eficiente.

### Justificación de Tecnologías

* **GraphQL:** Permite consultas flexibles sobre los puntos WiFi, incluyendo filtros por distrito, proximidad o wifi_id.
* **REST para carga de archivos:** La carga de CSV/XLSX grandes se maneja mediante un endpoint REST por limitaciones de GraphQL con streams grandes.
* **Redis + Bull:** Permite procesamiento asíncrono, escalable y confiable de archivos.
* **PostgreSQL:** Inserción por bulk para optimizar carga masiva de registros.
* **Fastify:** Rápido y ligero para manejar endpoints REST y GraphQL.

### Funcionalidades Clave

* **Búsqueda por proximidad:**
  Calcula distancia entre coordenadas usando la fórmula de Haversine, permitiendo ordenar los puntos WiFi más cercanos:

```ts
export function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
```

* **Paginación y filtros:** Todos los endpoints GraphQL permiten `limit` y `skip` y filtros por distrito o wifi_id.
* **Seguridad:** JWT protege todos los endpoints, garantizando que solo usuarios autenticados puedan acceder.
* **Procesamiento asíncrono de archivos:**

  * Se valida la extensión del archivo (CSV o XLSX).
  * Se validan registros individualmente.
  * Se procesan en lotes mediante workers y se registran resultados en la base de datos.

### Escalabilidad y Mantenibilidad

* La arquitectura modular permite agregar nuevos endpoints o servicios sin impactar la funcionalidad existente.
* Los workers son reutilizables para otros procesos asíncronos futuros.
* Redis permite monitorear y controlar la cola de trabajos.

---

## Endpoints

* **GraphQL:** Login, consultas de puntos WiFi por filtros, paginación y proximidad.
* **REST:** Endpoint para carga de archivos CSV/XLSX grandes en batches.

> Se añadirá una colección de Postman para revisar los endpoints. La colección incluirá ejemplos de login, consultas GraphQL y carga de archivos REST.

---

## Scripts principales

| Script               | Descripción                                                     |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Levanta la API en modo desarrollo con recarga automática.       |
| `npm run build`      | Compila TypeScript a JavaScript en `dist`.                      |
| `npm run start`      | Ejecuta la API compilada desde `dist`.                          |
| `npm run worker`     | Ejecuta el worker para procesamiento de archivos en background. |
| `npm run seed`       | Crea el usuario admin por defecto.                              |
| `npm run test`       | Ejecuta pruebas unitarias con Jest.                             |
| `npm run test:watch` | Ejecuta pruebas unitarias en modo watch.                        |

---

## Observaciones

* Antes de ejecutar migraciones o seed, asegúrate de que los contenedores de PostgreSQL y Redis estén levantados.
* Para probar la carga de archivos, utiliza `npm run dev` y envía archivos CSV/XLSX al endpoint REST correspondiente.
