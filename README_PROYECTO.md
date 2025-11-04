# 🏥 Dashboard de Monitor de Postura

Sistema completo de tracking de postura con ESP32 y visualización web en tiempo real.

## 🚀 Características

- ✅ **Dashboard en tiempo real** con actualización automática cada 5 segundos
- ✅ **API REST** para recibir eventos del ESP32
- ✅ **Base de datos** para almacenar todos los eventos
- ✅ **Gráficos interactivos** (semanal y mensual)
- ✅ **Sistema de colores** según severidad (verde/amarillo/rojo)
- ✅ **Botón de simulación** para testing sin hardware

## 📊 Visualizaciones

1. **Métrica del día**: Contador grande con código de colores
   - 🟢 Verde (0-5 eventos): Excelente postura
   - 🟡 Amarillo (6-15 eventos): Mejorable
   - 🔴 Rojo (16+ eventos): Crítico

2. **Reporte Semanal**: Gráfico de barras de los últimos 7 días

3. **Reporte Mensual**: Gráfico de líneas con tendencia del mes

## 🔧 Configuración

### Frontend (React + TypeScript)
El dashboard ya está completamente configurado y funcionando. Solo necesitas:

```bash
# Instalar dependencias (ya incluidas)
npm install

# Ejecutar en desarrollo
npm run dev
```

### Backend API
La API está desplegada automáticamente con Lovable Cloud en:
```
POST https://ykxvfonbsajvaaqngrmn.supabase.co/functions/v1/posture-increment
```

**Headers requeridos:**
```
Content-Type: application/json
apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreHZmb25ic2FqdmFhcW5ncm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzE4ODMsImV4cCI6MjA3Nzg0Nzg4M30.lOGIOLtdYt2e5JNqHnFGlEYU1E8tmmZzzc5KhYtz4B8
```

**Body:** (opcional, puede estar vacío)
```json
{}
```

## 📱 Configuración del ESP32

### Requisitos Hardware
- ESP32 DevKit
- Sensor de postura (MPU6050, acelerómetro, o cualquier sensor digital)
- Cable USB para programación

### Librerías Arduino Necesarias
```
WiFi (incluida con ESP32)
HTTPClient (incluida con ESP32)
ArduinoJson (instalar desde Library Manager)
```

### Instrucciones de Instalación

1. **Abre Arduino IDE** y carga el archivo `ESP32_Example.ino`

2. **Configura tu WiFi** en el código:
```cpp
const char* ssid = "TU_WIFI_SSID";        // Tu red WiFi
const char* password = "TU_WIFI_PASSWORD"; // Tu contraseña WiFi
```

3. **La URL de la API ya está configurada** correctamente en el código

4. **Conecta tu sensor** al pin GPIO 2 (o modifica `SENSOR_PIN` según tu configuración)

5. **Selecciona tu placa** en Arduino IDE:
   - Tools → Board → ESP32 Arduino → ESP32 Dev Module
   - Tools → Port → (Selecciona tu puerto COM)

6. **Sube el código** al ESP32

7. **Abre el Serial Monitor** (115200 baud) para ver los logs

### Funcionamiento del ESP32

El código incluye:
- ✅ Conexión automática a WiFi
- ✅ Detección de eventos en el pin sensor
- ✅ Debounce de 2 segundos para evitar spam
- ✅ LED integrado que parpadea al enviar datos
- ✅ Logs detallados en Serial Monitor
- ✅ Manejo de errores y reconexión

## 🧪 Testing sin Hardware

Usa el botón **"Simular Evento ESP32"** en el dashboard para:
- Probar el sistema sin tener el ESP32 conectado
- Ver los gráficos actualizándose en tiempo real
- Verificar que todo funciona correctamente

## 📈 Estructura de Datos

**Tabla: posture_events**
```sql
id          UUID PRIMARY KEY
timestamp   TIMESTAMP WITH TIME ZONE
created_at  TIMESTAMP WITH TIME ZONE
```

Cada evento de mala postura se registra con timestamp automático.

## 🎨 Sistema de Diseño

- **Colores principales**: Cyan (#00BFFF) para tecnología/salud
- **Estados**:
  - Verde (#3BB273): Buena postura
  - Amarillo (#F59E0B): Advertencia
  - Rojo (#EF4444): Crítico
- **Efectos**: Glassmorphism, sombras con glow, animaciones suaves

## 🔒 Seguridad

- RLS (Row Level Security) habilitado
- Políticas públicas de lectura/escritura (apropiado para este caso de uso)
- API key pública incluida (anon key de Supabase)

## 📱 Responsive Design

El dashboard es completamente responsive y funciona en:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile

## 🐛 Debugging

### Dashboard
- Revisa la consola del navegador (F12)
- Los datos se actualizan cada 5 segundos automáticamente

### ESP32
- Abre Serial Monitor a 115200 baud
- Verifica que WiFi se conecte correctamente
- Observa los logs cuando envíe eventos
- El LED integrado parpadeará al enviar datos

### API
- Prueba manualmente con curl:
```bash
curl -X POST https://ykxvfonbsajvaaqngrmn.supabase.co/functions/v1/posture-increment \
  -H "Content-Type: application/json" \
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreHZmb25ic2FqdmFhcW5ncm1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzE4ODMsImV4cCI6MjA3Nzg0Nzg4M30.lOGIOLtdYt2e5JNqHnFGlEYU1E8tmmZzzc5KhYtz4B8" \
  -d '{}'
```

## 🚀 Despliegue

El proyecto ya está desplegado con Lovable:
- Frontend: Automáticamente en Lovable
- Backend: API en Lovable Cloud (Supabase)
- Database: PostgreSQL gestionado automáticamente

## 📚 Tecnologías Utilizadas

**Frontend:**
- React 18
- TypeScript
- TailwindCSS
- Recharts (gráficos)
- Tanstack Query (state management)
- date-fns (manejo de fechas)

**Backend:**
- Lovable Cloud (Supabase)
- PostgreSQL
- Edge Functions (Deno)

**Hardware:**
- ESP32
- Arduino Framework
- WiFi + HTTPClient

## 💡 Próximas Mejoras Sugeridas

- [ ] Autenticación de usuarios
- [ ] Múltiples dispositivos ESP32
- [ ] Notificaciones push
- [ ] Exportar reportes PDF
- [ ] Configuración de umbrales personalizados
- [ ] Integración con Google Calendar
- [ ] App móvil nativa

## 📄 Licencia

Este proyecto es de código abierto y puede ser utilizado libremente.

## 🤝 Soporte

Si tienes problemas:
1. Revisa los logs del Serial Monitor (ESP32)
2. Revisa la consola del navegador (Dashboard)
3. Verifica que el WiFi del ESP32 esté conectado
4. Prueba el botón "Simular Evento" en el dashboard

---

Hecho con ❤️ usando Lovable
