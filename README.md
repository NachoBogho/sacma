# Cancún: Selva, Caribe y Aventura · SACMA

Presentación web del Parcial 2 (Gestión de servicios turísticos): SACMA, como operador mayorista, presenta el paquete a agencias minoristas.

## Cómo abrirla
- **Con doble clic en `index.html`** funciona todo, salvo que los videos se abren en una pestaña de YouTube.
- **Para ver los videos dentro de la página**, abrirla desde un servidor local:
  ```
  cd sacma
  python3 -m http.server 4174
  ```
  y entrar a http://localhost:4174
- Los videos y el mapa satelital necesitan internet. Sin conexión, el mapa muestra la imagen de excursiones del trabajo.

## Controles para presentar
- `→` `↓` `Espacio` `Av Pág`: sección siguiente · `←` `↑`: anterior · `Inicio` / `Fin`.
- Los puntos de la derecha saltan a cada sección.
- `P` muestra u oculta una nota con qué integrante expone y qué decir.
- `Esc` cierra las ventanas de detalle y las fotos ampliadas.

## Dónde cambiar datos
Precios, horarios, excursiones y fotos están en `js/datos.js`.
