# Cambios en el correo de confirmación de recepción (backend)

Estos cambios son del **backend / plantilla de email**, no del landing. El correo
automático que se envía cuando alguien escribe desde el formulario web hoy llega
con la marca antigua y un error en el nombre del destinatario. Hay que corregirlo.

## 1. Reemplazar la marca por **RY Legal** (4 menciones)

La plantilla todavía dice "RIVAS LEGAL" / "RYY Abogados". Cambiar **todas** las
apariciones a **RY Legal**:

| # | Dónde aparece hoy | Texto actual | Debe decir |
|---|---|---|---|
| 1 | Logo / header del correo | `RIVAS LEGAL` + `RYY ABOGADOS` | Logo y nombre **RY Legal** |
| 2 | Cuerpo, primera línea | `Gracias por contactar a RYY Abogados` | `Gracias por contactar a RY Legal` |
| 3 | Firma | `Con gusto,` / `El equipo de RYY Abogados` | `El equipo de RY Legal` |
| 4 | Cualquier otra referencia en asunto, footer o `from`/remitente | `RYY Abogados` / `Rivas Legal` | `RY Legal` |

> Logo correcto a usar (mismo que el sitio):
> `https://res.cloudinary.com/dg1x0cwdc/image/upload/v1780607887/icoLig_kmkt7v.png`

## 2. Corregir el nombre del destinatario

Hoy el saludo llega así:

```
Estimado/a Josefa MARCELA YURASZECK Yuraszeck,
```

Se está concatenando mal el nombre (se ve el nombre y apellido repetidos y en
mayúsculas). Debe quedar simple y bien formateado:

```
Estimada Josefa Yuraszeck,
```

Recomendaciones para el dev:
- Usar **solo un campo de nombre** (el `nombre` que envía el formulario), no
  concatenar campos separados de nombre/apellido que vienen duplicados.
- No forzar mayúsculas: respetar el capitalización original (o aplicar
  *title case*), nunca `MARCELA YURASZECK` en bloque.
- Si no se puede distinguir el género, dejar `Estimado/a {Nombre},` o un saludo
  neutro como `Hola {Nombre},`.

## 3. (Verificar) Datos de contacto en el correo

Que el pie del correo use los datos actuales, consistentes con el sitio:

- Email: **info@rylegal.cl**
- Teléfono / WhatsApp: **+56 9 6684 4283**
- Ubicación: **Santiago de Chile**

---

**Resumen:** 4 reemplazos de marca → `RY Legal`, corregir el saludo del nombre,
y verificar los datos de contacto del pie.
