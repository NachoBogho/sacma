/* Datos del producto, tomados del Parcial 2 y de la presentación comercial de SACMA.
   Si cambia un precio o un horario, se cambia acá y la página se actualiza sola. */
window.SACMA = {
  grupo: { pax: 26, minimo: 20 },

  /* Liquidación por pasajero (USD), por base de habitación */
  bases: {
    dbl: {
      nombre: 'Base doble', corto: 'DBL', habitaciones: '13 habitaciones dobles',
      costos: { aereo: 2073, traslados: 22, hotel: 1140, asistencia: 64, safari: 100, isla: 100, musa: 129 },
      costoTotal: 3628, conGanancia: 4535, impuestos: 643.07, precio: 5178.07, neto: 4674.18, comision: 503.89,
      imp: { transporte: 217.67, otrosAereos: 186, hotel: 239.40 },
      pe: 15,
    },
    sgl: {
      nombre: 'Base individual', corto: 'SGL', habitaciones: '26 habitaciones individuales',
      costos: { aereo: 2073, traslados: 22, hotel: 1469.32, asistencia: 64, safari: 100, isla: 100, musa: 129 },
      costoTotal: 3957.32, conGanancia: 4946.65, impuestos: 712.22, precio: 5658.87, neto: 5109.24, comision: 549.63,
      imp: { transporte: 217.67, otrosAereos: 186, hotel: 308.56 },
      pe: 15,
    },
    tpl: {
      nombre: 'Base triple', corto: 'TPL', habitaciones: '9 habitaciones triples',
      costos: { aereo: 2073, traslados: 22, hotel: 2888, asistencia: 64, safari: 100, isla: 100, musa: 129 },
      costoTotal: 5376, conGanancia: 6720, impuestos: 1010.15, precio: 7730.15, neto: 6983.48, comision: 746.67,
      imp: { transporte: 217.67, otrosAereos: 186, hotel: 606.48 },
      pe: 13,
    },
  },

  conceptos: {
    aereo: { n: 'Aéreo EZE–CUN–EZE', tipo: 'fijo', c: '#0d2233' },
    traslados: { n: 'Traslados IN/OUT', tipo: 'fijo', c: '#43586b' },
    hotel: { n: 'Hotel Riu Ventura · All Inclusive (6 noches)', tipo: 'variable', c: '#0a6e78' },
    asistencia: { n: 'Asistencia al viajero (7 días)', tipo: 'variable', c: '#5aa7ad' },
    safari: { n: 'Safari Selva Maya', tipo: 'variable', c: '#2f6b3f' },
    isla: { n: 'Isla Mujeres', tipo: 'variable', c: '#6f9b5a' },
    musa: { n: 'MUSA', tipo: 'variable', c: '#a9c48f' },
  },

  hotel: {
    'El hotel': [
      ['hotel/hero-hotel-riu-ventura.jpg', 'Hotel Riu Ventura, frente al mar Caribe'],
      ['hotel/aerea-hotel-riu-ventura.jpg', 'Vista aérea del complejo'],
      ['hotel/aerea-hotel-riu-ventura-2.jpg', 'Piscinas y acceso directo a la playa'],
      ['hotel/aerea-hotel-riu-ventura-3.jpg', 'El hotel sobre la zona hotelera de Cancún'],
      ['hotel/lobby-riu-ventura.jpg', 'Lobby'],
    ],
    'Habitaciones': [
      ['hotel/room-hotel-riu-ventura-DBLB.jpg', 'Habitación doble'],
      ['hotel/room-hotel-riu-ventura-DBLB-2.jpg', 'Habitación doble · baño y vestidor'],
      ['hotel/room-hotel-riu-ventura-DBFB.jpg', 'Habitación con vista al mar'],
      ['hotel/swim-up-room-riu-ventura.jpg', 'Habitación swim-up (categoría superior, con suplemento)'],
    ],
    'Gastronomía': [
      ['hotel/main-restaurant-riu-ventura.jpg', 'Restaurante principal buffet'],
      ['hotel/mexican-restaurant-riu-ventura-4.jpg', 'Restaurante mexicano'],
      ['hotel/japanese-restaurant-riu-ventura-3.jpg', 'Restaurante japonés'],
      ['hotel/italian-restaurant-riu-ventura.jpg', 'Restaurante italiano'],
      ['hotel/grill-restaurant-riu-ventura-2.jpg', 'Grill'],
      ['hotel/kulinarium-restaurant-riu-ventura.jpg', 'Restaurante Kulinarium'],
      ['hotel/lobby-bar-riu-ventura.jpg', 'Lobby bar'],
    ],
    'Piscinas y playa': [
      ['hotel/pool-riu-ventura.jpg', 'Piscina principal'],
      ['hotel/pool-riu-ventura-2.jpg', 'Piscinas frente al mar'],
      ['hotel/pool-riu-ventura-5.jpg', 'Zona de reposeras'],
      ['hotel/swim-up-bar-riu-ventura.jpg', 'Bar dentro de la piscina'],
      ['hotel/pool-bar-6-floor-riu-ventura.jpg', 'Bar de la piscina del piso 6'],
    ],
    'Entretenimiento': [
      ['hotel/show-riu-ventura.jpg', 'Shows nocturnos'],
      ['hotel/riuland-riu-ventura.jpg', 'RiuLand, área infantil'],
      ['hotel/spa-riu-ventura.jpg', 'Spa (servicios con cargo)'],
      ['hotel/gym-riu-ventura.jpg', 'Gimnasio'],
    ],
  },

  incluidas: [
    {
      id: 'safari', estrella: true, dia: 'Día 3 · miércoles 13 de enero', horario: '08:00 a 13:00 hs',
      titulo: 'Safari de Biodiversidad en la Selva Maya', lugar: 'Puerto Morelos · 35 km al sur de Cancún',
      img: 'excursiones/selva-welcome.jpg',
      fotos: [
        ['excursiones/selva-welcome.jpg', 'Senderos de selva en Puerto Morelos'],
        ['excursiones/selva-aktun.jpg', 'Caverna con cenote en la selva de Quintana Roo'],
        ['excursiones/selva-motmot.jpg', 'Momoto cejiturquesa, ave típica de Yucatán'],
        ['excursiones/selva-mono.jpg', 'Mono araña en Quintana Roo'],
        ['excursiones/selva-coati.jpg', 'Coatí, habitual en la península'],
        ['excursiones/selva-cenote-rm.jpg', 'Cenotes entre la selva'],
      ],
      video: { id: 'OVLk_5t4Srw', t: 'El Jardín Botánico de Puerto Morelos', canal: 'TuristikTV' },
      resumen: 'Nuestro diferencial. Caminata interpretativa con guías especializados por senderos de selva: flora autóctona, observación de aves y fauna silvestre, y la explicación de los cenotes y del agua subterránea de la península.',
      incluye: ['Transporte ida y vuelta desde el hotel', 'Guías especializados', 'Caminata interpretativa', 'Observación de aves y fauna', 'Charla sobre cenotes y conservación'],
      timeline: [
        ['08:00', 'Salida desde el lobby del hotel'],
        ['09:00', 'Llegada al área natural y recepción de los guías'],
        ['09:15', 'Caminata interpretativa: flora de la selva'],
        ['10:00', 'Observación de aves y fauna silvestre'],
        ['11:00', 'Los cenotes: origen e importancia'],
        ['12:00', 'Fin de la experiencia y regreso'],
        ['13:00', 'Llegada al hotel y almuerzo All Inclusive'],
      ],
      nota: 'Se contrata con un operador local habilitado que garantiza el recorrido guiado y las condiciones de seguridad.',
    },
    {
      id: 'isla', dia: 'Día 4 · jueves 14 de enero', horario: '07:30 a 17:00 hs',
      titulo: 'Isla Mujeres', lugar: 'Navegación por el Caribe · Playa Norte',
      img: 'excursiones/isla-playa-norte.jpg',
      fotos: [
        ['excursiones/isla-playa-norte.jpg', 'Playa Norte, Isla Mujeres'],
        ['excursiones/isla-playa-norte-2.jpg', 'Aguas turquesas de Playa Norte'],
        ['excursiones/isla-ferry.jpg', 'Ferry entre Cancún e Isla Mujeres'],
      ],
      video: { id: 'MFnz3gCUnfE', t: 'Isla Mujeres, Playa Norte desde un dron', canal: 'Kevin Gee' },
      resumen: 'La postal clásica del Caribe mexicano. Cruce en ferry o catamarán, tiempo libre en Playa Norte y recorrido por el centro de la isla, sus comercios y su gastronomía.',
      incluye: ['Traslado hotel – puerto – hotel', 'Ferry o catamarán ida y vuelta', 'Tiempo libre en Playa Norte', 'Recorrido por el centro de la isla'],
      noIncluye: ['Almuerzo en la isla (por cuenta del pasajero)'],
      timeline: [
        ['07:30', 'Encuentro en el lobby y traslado al puerto'],
        ['08:30', 'Salida en ferry o catamarán'],
        ['09:15', 'Llegada a Isla Mujeres'],
        ['10:00', 'Playa Norte: tiempo libre'],
        ['11:30', 'Centro de la isla y almuerzo libre'],
        ['15:30', 'Regreso en ferry a Cancún'],
        ['17:00', 'Llegada al hotel'],
      ],
    },
    {
      id: 'musa', dia: 'Día 6 · sábado 16 de enero', horario: '07:30 a 12:30 hs',
      titulo: 'Museo Subacuático de Arte (MUSA)', lugar: 'Snorkel entre esculturas sumergidas',
      img: 'excursiones/musa-urban-reef.jpg',
      fotos: [
        ['excursiones/musa-urban-reef.jpg', 'Esculturas del MUSA convertidas en arrecife'],
        ['excursiones/musa-vw.jpg', 'Escultura sumergida cubierta de vida marina'],
        ['excursiones/musa-dream.jpg', '«The Dream Collector», MUSA'],
        ['excursiones/musa-4.jpg', 'Snorkel sobre las obras'],
      ],
      video: { id: 'tNSZ452aj0A', t: 'Museo Subacuático de Arte, MUSA', canal: 'Karla Munguía Colmenero' },
      resumen: 'Arte y conservación bajo el agua. Más de 400 esculturas sumergidas que funcionan como arrecifes artificiales, recorridas haciendo snorkel con personal especializado.',
      incluye: ['Traslado hotel – puerto – hotel', 'Navegación hasta el museo', 'Equipo de snorkel', 'Charla de seguridad e instrucciones', 'Acompañamiento de personal especializado'],
      timeline: [
        ['07:30', 'Encuentro en el lobby y traslado al puerto'],
        ['08:30', 'Embarque y navegación'],
        ['09:00', 'Charla de seguridad y uso del equipo'],
        ['09:30', 'Snorkel entre las esculturas'],
        ['11:00', 'Regreso al puerto'],
        ['12:30', 'Llegada al hotel'],
      ],
      nota: 'Sujeta a las condiciones del mar y a las medidas de seguridad del operador.',
    },
  ],

  opcionales: [
    { id: 'cenotes', titulo: 'Ruta de los Cenotes', img: 'excursiones/casa-cenote.jpg', dato: 'Puerto Morelos · ~40 min', txt: 'Corredor de cenotes y cavernas en plena selva para nadar y hacer snorkel en agua dulce.' },
    { id: 'chichen', titulo: 'Chichén Itzá', img: 'excursiones/op-chichen.jpg', dato: 'Yucatán · ~2 h 45 min', txt: 'Una de las 7 Maravillas del Mundo Moderno. Excursión de día completo a la gran ciudad maya.' },
    { id: 'quinta', titulo: 'Quinta Avenida de Playa del Carmen', img: 'excursiones/op-quinta.jpg', dato: 'Playa del Carmen · ~1 h', txt: 'Paseo peatonal con comercios, restaurantes y bares a pasos del mar.' },
    { id: 'elrey', titulo: 'Zona Arqueológica El Rey', img: 'excursiones/op-el-rey.jpg', dato: 'Zona Hotelera · a minutos del hotel', txt: 'Vestigios de un asentamiento maya dentro de la propia zona hotelera de Cancún.' },
    { id: 'nichupte', titulo: 'Laguna Nichupté', img: 'excursiones/op-nichupte.jpg', dato: 'Cancún · paseos y kayak', txt: 'Sistema lagunar rodeado de manglares para paseos en lancha, kayak y atardeceres.' },
  ],

  /* Coordenadas para el mapa */
  puntos: [
    { k: 'base', n: 'Hotel Riu Ventura', d: 'Alojamiento · All Inclusive', ll: [21.0626, -86.7790] },
    { k: 'base', n: 'Aeropuerto Internacional de Cancún', d: 'Llegada y salida · traslados IN/OUT', ll: [21.0365, -86.8771] },
    { k: 'inc', n: 'Safari de Biodiversidad · Selva Maya', d: 'Incluida · Día 3', ll: [20.8283, -86.8995], ref: 'safari' },
    { k: 'inc', n: 'Isla Mujeres · Playa Norte', d: 'Incluida · Día 4', ll: [21.2601, -86.7522], ref: 'isla' },
    { k: 'inc', n: 'MUSA · Museo Subacuático de Arte', d: 'Incluida · Día 6', ll: [21.1890, -86.7380], ref: 'musa' },
    { k: 'opc', n: 'Ruta de los Cenotes', d: 'Opcional', ll: [20.8550, -87.0450] },
    { k: 'opc', n: 'Chichén Itzá', d: 'Opcional', ll: [20.6843, -88.5678] },
    { k: 'opc', n: 'Quinta Avenida · Playa del Carmen', d: 'Opcional', ll: [20.6296, -87.0739] },
    { k: 'opc', n: 'Zona Arqueológica El Rey', d: 'Opcional', ll: [21.0597, -86.7826] },
    { k: 'opc', n: 'Laguna Nichupté', d: 'Opcional', ll: [21.1010, -86.7905] },
  ],

  itinerario: [
    {
      d: 'Día 1', f: 'Lun 11 ene', t: 'Buenos Aires – Cancún', tipo: 'vuelo',
      items: [['05:30', 'Presentación en Ezeiza para el check-in'], ['08:25', 'Vuelo directo de Aerolíneas Argentinas'], ['15:30', 'Llegada a Cancún (hora local)'], ['16:30', 'Recepción del personal de asistencia · traslado IN'], ['17:30', 'Check-in en el Riu Ventura'], ['19:00', 'Cena All Inclusive']],
    },
    {
      d: 'Día 2', f: 'Mar 12 ene', t: 'Día libre en el hotel', tipo: 'libre',
      items: [['07:00', 'Desayuno buffet'], ['10:30', 'Playa, piscinas e instalaciones'], ['13:00', 'Almuerzo All Inclusive'], ['15:00', 'Tarde libre'], ['19:00', 'Cena en los restaurantes del hotel'], ['21:30', 'Shows y entretenimiento']],
    },
    {
      d: 'Día 3', f: 'Mié 13 ene', t: 'Safari de Biodiversidad · Selva Maya', tipo: 'inc', ref: 'safari',
      items: [['08:00', 'Salida hacia Puerto Morelos'], ['09:15', 'Caminata interpretativa'], ['10:00', 'Aves y fauna silvestre'], ['11:00', 'Los cenotes'], ['13:00', 'Regreso y almuerzo en el hotel'], ['15:00', 'Tarde libre']],
    },
    {
      d: 'Día 4', f: 'Jue 14 ene', t: 'Isla Mujeres', tipo: 'inc', ref: 'isla',
      items: [['07:30', 'Traslado al puerto'], ['08:30', 'Navegación en ferry o catamarán'], ['10:00', 'Playa Norte'], ['11:30', 'Centro de la isla y almuerzo libre'], ['15:30', 'Regreso a Cancún'], ['19:00', 'Cena en el hotel']],
    },
    {
      d: 'Día 5', f: 'Vie 15 ene', t: 'Día libre · opcionales', tipo: 'libre',
      items: [['07:00', 'Desayuno buffet'], ['10:30', 'Playa y piscinas'], ['15:00', 'Opcionales: El Rey, Laguna Nichupté, paseos'], ['19:00', 'Cena en el hotel']],
    },
    {
      d: 'Día 6', f: 'Sáb 16 ene', t: 'Museo Subacuático de Arte (MUSA)', tipo: 'inc', ref: 'musa',
      items: [['07:30', 'Traslado al puerto'], ['09:00', 'Charla de seguridad'], ['09:30', 'Snorkel en el MUSA'], ['12:30', 'Regreso al hotel'], ['13:00', 'Almuerzo y últimas horas de playa'], ['19:00', 'Cena de despedida']],
    },
    {
      d: 'Día 7', f: 'Dom 17 ene', t: 'Cancún – Buenos Aires', tipo: 'vuelo',
      items: [['04:45', 'Check-out y encuentro en el lobby'], ['05:00', 'Traslado OUT al aeropuerto'], ['05:30', 'Check-in en Aerolíneas Argentinas'], ['08:50', 'Vuelo directo a Buenos Aires'], ['19:30', 'Llegada a Ezeiza · fin de los servicios']],
    },
  ],
};
