# 🖧 IT Asset Inventory API
## Data Center Asset Management

> RESTful API sederhana untuk mengelola data aset fisik di Data Center.
> Dibangun dengan Node.js + Express, terintegrasi penuh dengan Docker dan GitHub Actions CI/CS.

[![CI/CS Pipeline](https://github.com/nazwaanasha/tugas-1-prak-ppl1/actions/workflows/ci.yml/badge.svg)](https://github.com/nazwaanasha/tugas-1-prak-ppl1/actions/workflows/ci.yml)

---

## 📌 Deskripsi Project

Project ini adalah implementasi RESTful API untuk tugas Praktikum Perangkat Lunak I.
API ini mengelola data aset perangkat keras di Data Center (Server, Switch, Router, dll.).

**Fitur Utama:**
- ✅ CRUD lengkap untuk data aset (GET, POST, PUT, DELETE)
- ✅ Filter aset berdasarkan status (active/maintenance/down)
- ✅ Format response JSON standar
- ✅ Health check endpoint (`/health`)
- ✅ UUID sebagai ID unik non-sequential
- ✅ Data disimpan sementara (in-memory, tanpa database eksternal)

---

## 🛠️ Teknologi yang Digunakan

| Teknologi      | Versi     | Fungsi                             |
|----------------|-----------|------------------------------------|
| Node.js        | >= 18.x   | Runtime JavaScript                 |
| Express.js     | ^5.x      | Web framework untuk API            |
| UUID           | ^13.x     | Generate ID unik untuk setiap aset |
| Jest           | ^30.x     | Framework unit testing             |
| Supertest      | ^7.x      | HTTP testing untuk endpoint API    |
| Docker         | >= 20.x   | Containerization aplikasi          |
| Docker Compose | >= 2.x    | Orkestrasi multi-container         |
| GitHub Actions | -         | Otomatisasi CI/CS pipeline         |

---

## 📁 Struktur Project

```
tugas-1-prak-ppl1/
│
├── src/                          # Source code utama
│   ├── data.js                   # In-memory database (array aset)
│   ├── app.js                    # Konfigurasi Express & middleware
│   ├── server.js                 # Entry point — menjalankan server
│   ├── controllers/
│   │   └── assetController.js    # Logika bisnis CRUD
│   └── routes/
│       └── assetRoutes.js        # Definisi endpoint/router
│
├── tests/
│   └── asset.test.js             # Unit Testing (Jest + Supertest)
│
├── .github/
│   └── workflows/
│       └── ci.yml                # GitHub Actions CI/CS pipeline
│
├── Dockerfile                    # Konfigurasi Docker image
├── docker-compose.yml            # Konfigurasi container
├── package.json                  # Metadata & dependensi project
├── .gitignore                    # File yang dikecualikan dari Git
└── README.md                     # Dokumentasi project
```

---

## 🚀 Panduan Instalasi

### Prasyarat

| Software       | Versi Minimal | Link Download                       |
|----------------|---------------|-------------------------------------|
| Node.js        | >= 18.x       | nodejs.org                          |
| Docker Desktop | >= 20.x       | docker.com/products/docker-desktop  |
| Docker Compose | >= 2.x        | Sudah termasuk dalam Docker Desktop |
| Git            | >= 2.x        | git-scm.com                         |

### Menjalankan dengan Docker (Recommended)

```bash
# Clone repository
git clone https://github.com/USERNAME/tugas-1-prak-ppl1.git
cd tugas-1-prak-ppl1

# Build image dan jalankan container
docker-compose up --build

# Atau jalankan di background (detached mode)
docker-compose up --build -d

# Cek status container
docker ps

# Lihat logs
docker-compose logs -f

# Matikan container
docker-compose down
```

### Menjalankan Tanpa Docker (Lokal)

```bash
npm install
npm run dev   # development dengan hot-reload
# atau
npm start     # production mode
```

### Informasi Port

| Keterangan                  | Port | Cara Akses                          |
|-----------------------------|------|-------------------------------------|
| Host (komputer Anda)        | 8080 | http://localhost:8080               |
| Container (di dalam Docker) | 3000 | Port internal container             |
| Health Check                | 8080 | http://localhost:8080/health        |
| API Endpoint                | 8080 | http://localhost:8080/api/assets    |

---

## 📡 Dokumentasi API

**Base URL:** `http://localhost:8080/api`

| Method | Endpoint         | Deskripsi                 | Status Code       |
|--------|------------------|---------------------------|-------------------|
| GET    | /health          | Health check server       | 200 OK            |
| GET    | /api/assets      | Ambil semua data aset     | 200 OK            |
| GET    | /api/assets/:id  | Ambil aset berdasarkan ID | 200 / 404         |
| POST   | /api/assets      | Tambah aset baru          | 201 Created / 400 |
| PUT    | /api/assets/:id  | Update data aset          | 200 / 404         |
| DELETE | /api/assets/:id  | Hapus aset                | 200 / 404         |

### Data Model — Asset

| Field         | Tipe          | Keterangan                    | Validasi |
|---------------|---------------|-------------------------------|----------|
| id            | String (UUID) | ID unik aset (auto-generated) | Auto     |
| name          | String        | Nama perangkat                | Wajib    |
| type          | String        | Server/Switch/Router/FW/UPS   | Wajib    |
| rack_position | String        | Posisi rak (contoh: R-01-U10) | Opsional |
| status        | String        | active/maintenance/down       | Wajib    |
| ip_address    | String        | Alamat IP perangkat           | Opsional |
| created_at    | DateTime      | Waktu dibuat (auto-generated) | Auto     |
| updated_at    | DateTime      | Waktu diupdate (auto-gen)     | Auto     |

### Query Parameter

| Parameter | Tipe   | Deskripsi                    | Contoh               |
|-----------|--------|------------------------------|----------------------|
| status    | String | Filter berdasarkan status    | ?status=active       |

---

## 🧪 Contoh Request & Response Lengkap

### 1. GET /health — Health Check

```bash
curl http://localhost:8080/health
```

```json
{
  "success":true,
  "status":"UP",
  "message":"IT Asset Inventory API is running",
  "timestamp":"2026-03-20T13:40:54.323Z"
}
```

### 2. GET /api/assets — Ambil Semua Aset

```bash
curl http://localhost:8080/api/assets
```

```json
{
  "success": true,
  "message": "Berhasil mengambil data aset",
  "data": {
    "total": 2,
    "assets": [
      {
        "id": "d4b6c5f9-feb6-4cc2-93ba-59392d82315a",
        "name": "Cisco Nexus 9000",
        "type": "Switch",
        "rack_position": "R-01-U10",
        "status": "active",
        "ip_address": "192.168.1.10",
        "created_at": "2026-03-20T13:40:30.440Z"
      },
      {
        "id": "e926ad36-6daf-4ad9-8ed0-320ed8dba069",
        "name": "Dell PowerEdge R750",
        "type": "Server",
        "rack_position": "R-02-U04",
        "status": "maintenance",
        "ip_address": "192.168.1.20",
        "created_at": "2026-03-20T13:40:30.440Z"
      }
    ]
  }
}
```

### 3. GET /api/assets?status=active — Filter by Status

```bash
curl http://localhost:8080/api/assets?status=active
```

```json
{
  "success": true,
  "message": "Berhasil mengambil data aset",
  "data": {
    "total": 1,
    "assets": [
      {
        "id": "d4b6c5f9-feb6-4cc2-93ba-59392d82315a",
        "name": "Cisco Nexus 9000",
        "type": "Switch",
        "rack_position": "R-01-U10",
        "status": "active",
        "ip_address": "192.168.1.10",
        "created_at": "2026-03-20T13:40:30.440Z"
      }
    ]
  }
}
```

### 4. GET /api/assets/:id — Ambil Aset by ID

```bash
curl http://localhost:8080/api/assets/d4b6c5f9-feb6-4cc2-93ba-59392d82315a
```

```json
{
  "success": true,
  "data": {
    "id": "d4b6c5f9-feb6-4cc2-93ba-59392d82315a",
    "name": "Cisco Nexus 9000",
    "type": "Switch",
    "rack_position": "R-01-U10",
    "status": "active",
    "ip_address": "192.168.1.10",
    "created_at": "2026-03-20T13:40:30.440Z"
  }
}
```

### 5. GET /api/assets/:id — ID Tidak Ditemukan (404)

```bash
curl http://localhost:8080/api/assets/abcdefg9-feb6-4cc2-93ba-59392d82315a
```

```json
{
  "success": false,
  "message": "Aset dengan id 'abcdefg9-feb6-4cc2-93ba-59392d82315a' tidak ditemukan"
}
```

### 6. POST /api/assets — Tambah Aset Baru

```bash
curl -X POST http://localhost:8080/api/assets ^ -H "Content-Type: application/json" ^ -d "{\"name\":\"MikroTik Router\",\"type\":\"Router\",\"status\":\"active\",\"rack_position\":\"R-03-U12\",\"ip_address\":\"192.168.1.30\"}"
```

```json
{
  "success": true,
  "message": "Aset berhasil ditambahkan",
  "data": {
    "id": "3c4b0fc6-4717-4d91-a1cd-c0c9d102a7e5",
    "name": "MikroTik Router",
    "type": "Router",
    "rack_position": "R-03-U12",
    "status": "active",
    "ip_address": "192.168.1.30",
    "created_at": "2026-03-20T13:58:30.314Z"
  }
}
```

### 7. POST /api/assets — Validasi Gagal (400)

```bash
curl -X POST http://localhost:8080/api/assets -H "Content-Type: application/json" -d "{\"type\":\"Router\"}"
```

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": [
    "name wajib diisi",
    "status wajib diisi (active/maintenance/down)"
  ]
}
```

### 8. PUT /api/assets/:id — Update Aset

```bash
curl -X PUT http://localhost:8080/api/assets/3c4b0fc6-4717-4d91-a1cd-c0c9d102a7e5 -H "Content-Type: application/json" -d "{\"status\":\"maintenance\"}"

```

```json
{
  "success": true,
  "message": "Aset berhasil diupdate",
  "data": {
    "id": "3c4b0fc6-4717-4d91-a1cd-c0c9d102a7e5",
    "name": "MikroTik Router",
    "type": "Router",
    "rack_position": "R-03-U12",
    "status": "maintenance",
    "ip_address": "192.168.1.30",
    "created_at": "2026-03-20T13:58:30.314Z",
    "updated_at": "2026-03-20T14:01:35.760Z"
  }
}
```

### 9. DELETE /api/assets/:id — Hapus Aset

```bash
curl -X DELETE http://localhost:8080/api/assets/3c4b0fc6-4717-4d91-a1cd-c0c9d102a7e5
```

```json
{
  "success": true,
  "message": "Aset berhasil dihapus",
  "data": {
    "id": "3c4b0fc6-4717-4d91-a1cd-c0c9d102a7e5",
    "name": "MikroTik Router",
    "type": "Router",
    "rack_position": "R-03-U12",
    "status": "maintenance",
    "ip_address": "192.168.1.30",
    "created_at": "2026-03-20T13:58:30.314Z",
    "updated_at": "2026-03-20T14:01:35.760Z"
  }
}
```

---

## 🔀 Alur Kerja Git

| Branch       | Fungsi                              | Merge Ke         |
|--------------|-------------------------------------|------------------|
| `main`       | Kode stabil siap production         | -                |
| `develop`    | Branch integrasi utama              | main             |
| `feature/*`  | Pengerjaan fitur baru               | develop          |
| `fix/*`      | Perbaikan bug non-kritis            | develop          |
| `hotfix/*`   | Perbaikan darurat dari main         | main & develop   |

### Conventional Commits

| Type         | Kapan Digunakan                     | Contoh                                      |
|--------------|-------------------------------------|---------------------------------------------|
| `feat`       | Menambahkan fitur baru              | `feat: implement CRUD asset endpoint`       |
| `fix`        | Memperbaiki bug                     | `fix: resolve 404 on delete asset`          |
| `test`       | Menambah atau memperbaiki test      | `test: add unit test for get all assets`    |
| `docs`       | Perubahan dokumentasi saja          | `docs: update README with API endpoints`    |
| `build`      | Konfigurasi build/Docker            | `build: add dockerfile and compose config`  |
| `ci`         | Perubahan file CI/CD                | `ci: add github actions workflow`           |
| `chore`      | Setup awal, dependency update       | `chore: initial project setup`              |
| `refactor`   | Refactoring tanpa fix/feat          | `refactor: extract controller logic`        |

---

## 🤖 Status Automasi (GitHub Actions)

Workflow berjalan otomatis setiap Push/Pull Request ke `main` dan `develop`.

| Job           | Jenis | Tool      | Deskripsi                            |
|---------------|-------|-----------|--------------------------------------|
| Unit Test     | CI    | Jest      | Menguji semua endpoint API           |
| Security Scan | CS    | npm audit | Memindai kerentanan dependency       |
| Docker Build  | CI    | Docker    | Memverifikasi Dockerfile valid       |

---

## 📋 Checklist Pemenuhan Tugas

| No. | Kriteria                  | Status   |
|-----|---------------------------|----------|
| 1   | CRUD API                  | ✅      |
| 2   | Format JSON Standar       | ✅      |
| 3   | Feature Branch Flow       | ✅      |
| 4   | Conventional Commits      | ✅      |
| 5   | Dockerfile                | ✅      |
| 6   | docker-compose up --build | ✅      |
| 7   | Port Mapping 8080→3000    | ✅      |
| 8   | Unit Testing (CI)         | ✅      |
| 9   | Security Scan (CS)        | ✅      |
| 10  | GitHub Actions            | ✅      |
| 11  | Struktur Modular          | ✅      |
| 12  | Dokumentasi README        | ✅      |
| 13  | In-Memory Storage         | ✅      |
| 14  | UUID (ID unik)            | ✅ BONUS|
| 15  | Health Check Endpoint     | ✅ BONUS|
| 16  | Filter Query Parameter    | ✅ BONUS|
| 17  | Docker Build Check (CI)   | ✅ BONUS|