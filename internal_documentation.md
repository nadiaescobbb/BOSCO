# Documentación Técnica Interna — Trama Studio
**Proyecto:** BOSCO Edición 01

Este documento está diseñado para el equipo técnico de **Trama Studio**. Describe los estándares aplicados en BOSCO y cómo mantener el sitio.

## 1. Arquitectura de Estilos (Design System)
El archivo `style.css` utiliza una arquitectura basada en variables (tokens) para facilitar cambios globales.

### Tokens Principales:
- `--cream`: `#FAF7F2` (Color de base para texto y luz).
- `--ink`: `#1A1A1A` (Texto oscuro sobre fondo claro).
- `--dark`: `#1C1410` (Color de fondo principal - modo oscuro).
- `--gold`: `#C9973A` (Color de acento/branding).

### Tipografía:
- Sans: `DM Sans` (Variables weights).
- Serif: `Playfair Display` (Black 900 para títulos impactantes).

## 2. Sistema de Animación (Kowalski Pattern)
Utilizamos un sistema de "Reveal on Scroll" optimizado.

- **Trigger:** Atributo `data-enter`.
- **Lógica JS:** Un solo `IntersectionObserver` en `main.js` que se desconecta (`unobserve`) inmediatamente después de activar la animación para ahorrar memoria.
- **Clases de Delay:** Para crear el efecto de "cascada" (staggering), añadir clases `.stagger-1`, `.stagger-2`, etc., a los elementos que tienen `data-enter`.

## 3. Estabilidad y Performance (Mantenimiento)
Para mantener el estándar de calidad de Trama Studio, seguir estas pautas:

- **Imágenes:** Siempre utilizar `width` y `height` en el tag `<img>` para evitar Layout Shift (CLS).
- **Contención:** Si se añade una nueva sección con animaciones pesadas, aplicar `contain: paint;` al contenedor padre.
- **Viewports:** Evitar el uso de `100vh` en elementos críticos; preferir `100dvh` para evitar "saltos" en móviles por la barra de navegación del navegador.

## 4. Gestión de E-commerce (WhatsApp)
El flujo de compra es directo a WhatsApp. Los links de los botones deben seguir este formato de URL encoding:
`https://wa.me/[numero]?text=[mensaje_codificado]`

---

# 🎓 Guía para el Portfolio Personal
*Cómo vender este proyecto en una entrevista técnica:*

### ¿Por qué lo hiciste en Vanilla (sin frameworks)?
> "Dominar los fundamentos (HTML/CSS/JS) permite optimizar el Core Web Vitals sin el overhead de un framework. En este proyecto logré animaciones de 60fps y una estabilidad visual absoluta con 0 dependencias externas, lo que demuestra un control total sobre el renderizado del navegador."

### ¿Qué fue lo más difícil técnicamente?
> "Gestionar la estabilidad del layout (CLS). Al tener tipografías muy pesadas y animaciones de traducción (translate), corríamos el riesgo de que la página 'rebotara' al cargar. Lo solucioné usando 'contain: paint', aceleración por hardware y reservas dinámicas de espacio con min-height equilibrados."

### ¿Cuál es tu enfoque en diseño UI/UX?
> "Mi enfoque es 'Brutalismo Editorial'. Busco que el código no solo funcione, sino que transmita la autoridad de la marca. Aquí apliqué un sistema rítmico de animaciones inspirado en los patrones de motion de Emil Kowalski, donde cada movimiento tiene un propósito narrativo y no es solo decorativo."

---

## 🛠️ Procedimiento de Actualización de Precios
Para cambiar precios post-preventa:
1. Ir a `index.html`.
2. Buscar la clase `.np-price-old` y el precio actual.
3. Actualizar los valores y el tag `(Preventa)` a `(Final)`.
4. Pushear a Git: Trama Studio prefiere commits descriptivos como: `content: actualización de precios post-preventa`.
