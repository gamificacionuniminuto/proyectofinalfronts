const ClasesData = [
  {
    id: 1,
    nombre: "Contar números",
    descripcion: "Aprende a contar del 1 al 20. ",
    nivel: "Nivel 1",
    completado: false,
    icono: "🔢",
    forma: "circulo",
    color: "#264653", // azul oscuro
  },
  {
    id: 2,
    nombre: "Reconocimiento de numeros y lectura",
    descripcion: "Identificar los numeros del 1 al 20.",
    nivel: "Nivel 1",
    completado: false,
    icono: "🔤",
    forma: "nube",
    color: "#2a9d8f", // azul claro
  },
  {
    id: 3,
    nombre: "Relaciona números y objetos",
    descripcion: "Asocia números con objetos cotidianos.",
    nivel: "Nivel 1",
    completado: false,
    icono: "🔗",
    forma: "estrella",
    color: "#fcbf49", // amarillo
  },
  {
    id: 4,
    nombre: "Contar hasta 50",
    descripcion: "Contar hasta 50 con canciones y juegos.",
    nivel: "Nivel 1",
    completado: false,
    icono: "🔢",
    forma: "triangulo",
    color: "#d62828", // rojo
    link: "/contar50",
  },
  {
    id: 5,
    nombre: "Formas Geometricas",
    descripcion: "Identifica las figuras geometricas.",
    nivel: "Nivel 1",
    completado: true,
    icono: "🎨",
    forma: "estrella",
    color: "#fcbf49", // amarillo
  },
  {
  id: 6,
  nombre:"Relacion espacial (arriba, abajo, delante, detrás)",
  descripcion: "Entiende la relación espacial de objetos.",
  nivel: "Nivel 1",
  completado: false,
  icono: "📍",
  forma: "cuadrado",
  color: "#e76f51", // naranja
  },
  {
  id: 7,
  nombre:"Conteo ascendente y descendente",
  descripcion: "Practica el conteo ascendente y descendente.",
  nivel: "Nivel 1",
  completado: false,
  icono: "🔼🔽",
  forma: "nube",
  color: "#2a9d8f", // azul claro
  },
  {
    id: 8,
    nombre: "Números pares ",
    descripcion: "Diviértete identificando números pares e impares.",
    nivel: "Nivel 1",
    completado: false,
    icono: "➗",
    forma: "circulo",
    color: "#264653", // azul oscuro
  },
    {
    id: 9,
    nombre: "Contar hasta 100",
    descripcion: "Contar hasta 100 con juegos interactivos.",
    nivel: "Nivel 2",
    completado: false,
    icono: "🔢",
    forma: "circulo",
    color: "#264653", // azul oscuro
  },
    {
    id: 10,
    nombre: "Medidas simples",
    descripcion: "Explora conceptos de largo, peso y volumen.",
    nivel: "Nivel 2",
    completado: false,
    icono: "📏",
    forma: "circulo",
    color: "#264653",
  },  
{
  id:11,
  nombre: "Numeros impares",
  descripcion: "Identifica números impares con juegos.",
  nivel: "Nivel 2",
  completado: false,
  icono: "➗",
  forma: "cuadrado",
  color: "#e76f51", // naranja

},
{
 id: 12,
 nombre:"Comparación de números",
 descripcion: "Compara números usando objetos visuales.",
 nivel: "Nivel 2",
 completado: false,
 icono: "🔍",
 forma: "estrella",
 color: "#fcbf49", // amarillo
 },
  {
   id: 13,
    nombre: "Sumas básicas",
    descripcion: "Aprende a sumar con objetos visuales.",
    nivel: "Nivel 2",
    completado: false,
    icono: "➕",
    forma: "cuadrado",
    color: "#e76f51", // naranja
  },
  {
    id: 14,
    nombre: "Restas básicas",
    descripcion: "Aprende a restar con ejemplos visuales.",
    nivel: "Nivel 2",
    completado: false,
    icono: "➖",
    forma: "nube",
    color: "#2a9d8f", // azul claro
  },
  {
    id: 15,
    nombre: "Comparación (Mas que, menos que, igual a)",
    descripcion: "Compara números usando objetos visuales.",
    nivel: "Nivel 2",
    completado: false,
    icono: "🔍",
    forma: "triangulo",
    color: "#d62828", // rojo

  },
  
  {
    id: 16,
    nombre:"Series numéricas",
    descripcion:"Identifica patrones en series numéricas.",
    nivel:"Nivel 2",
    completado:false,
    icono:"🔁",
    forma:"estrella",
    color:"#fcbf49", 
    
  },
{
  id:17,
  nombre: "Dias de la semana",
  descripcion: "Aprende los días y secuencias Temporales.",
  nivel: "Nivel 2",
  completado: false,
  icono: "🗓️",
  forma: "circulo",
  color: "#264653",
},
{
id: 18,
nombre: "Los numeros grandes y su descomposición",
descripcion: "Comprende los números grandes y su descomposición.",
nivel: "Nivel 3",
completado: false,
icono: "🔢",
forma: "cuadrado",
color: "#e76f51", // naranja
},
{
  id: 19,
  nombre:"Sumas llevando",
  descripcion: "Aprende a sumar con llevadas.",
  nivel: "Nivel 3",
  completado: false,
  icono: "➕",
  forma: "nube",
  color: "#2a9d8f", // azul claro
},
{
  id: 20,
  nombre: "Restas con llevadas",
  descripcion: "Aprende a restar con llevadas.",
  nivel: "Nivel 3",
  completado: false,
  icono: "➖",
  forma: "triangulo",
  color: "#d62828", // rojo
},
{
  id:21,
  nombre: "Conoce las tablas de multiplicar",
  descripcion: "Aprende las tablas de multiplicar del 1 al 10.",
  nivel: "Nivel 3",
  completado: false,
  icono: "✖️",
  forma: "estrella",
  color: "#fcbf49", // amarillo
},
{
  id: 22,
  nombre:"Practica la multiplicación",
  descripcion: "Practica la multiplicación con ejercicios.",
  nivel: "Nivel 3",
  completado: false,
  icono: "✖️",
  forma: "cuadrado",
  color: "#e76f51", // naranja
  },
{   
  id: 23,
  nombre: "División básica",
  descripcion: "Aprende la división básica con ejemplos.",
  nivel: "Nivel 3",
  completado: false,
  icono: "➗",
  forma: "nube",
  color: "#2a9d8f", // azul claro
},
{
  id: 24,
  nombre: "Figuras geométricas avanzadas",
  descripcion: "Identifica figuras geométricas planas y en 3D.",
  nivel: "Nivel 3",
  completado: false,
  icono: "📐",
  forma: "triangulo",
  color: "#d62828", // rojo
  },
{
id:25,
nombre:"Fraciones basicas(mitades, tercios, cuartos)",
descripcion: "Comprende las fracciones básicas.",
nivel: "Nivel 3",
completado: false,
icono: "🥧",
forma: "estrella",
color: "#fcbf49", // amarillo
},
{
  id: 26,
  nombre: "Medicion de tiempo",
  descripcion: "Aprende a medir el tiempo con relojes y calendarios.",
  nivel: "Nivel 3",
  completado: false,
  icono: "⏰",
  forma: "circulo",
  color: "#264653", // azul oscuro
},
{
  id: 27,
  nombre: "Uso de unidad de medida",
  descripcion: "Comprende el uso de unidades de medida.",
  nivel: "Nivel 4",
  completado: false,
  icono: "📏",
  forma: "cuadrado",
  color: "#e76f51", // naranja

},
{
  id: 28,
  nombre: "Problemas matemáticos simples",
  descripcion: "Resuelve problemas matemáticos básicos.",
  nivel: "Nivel 4",
  completado: false,
  icono: "📘",
  forma: "nube",
  color: "#2a9d8f", // azul claro
},
{
id: 29,
nombre: "Graficas y pictogrmas",
descripcion: "Aprende a interpretar gráficos y pictogramas.",
nivel: "Nivel 4",
completado: false,
icono: "📈",
forma: "triangulo",
color: "#d62828", // rojo
},
 
{
  id:30,
  nombre:"Patrones y secuencias",
  descripcion: "Identifica patrones y secuencias numéricas.",
  nivel: "Nivel 4",
  completado: false,
  icono: "🔄",
  forma: "nube",
  color: "#2a9d8f", // azul claro
},
{
  id: 31,
  nombre: "Problemas de suma y resta",
  descripcion: "Resuelve problemas de suma y resta.",
  nivel: "Nivel 4",
  completado: false,
  icono: "➕➖",
  forma: "estrella",
  color: "#fcbf49", // amarillo
},
{
  id:32,
  nombre:"Problemas de multiplicación y división",
  descripcion: "Resuelve problemas de multiplicación y división.",
  nivel: "Nivel 4",
  completado: false,
  icono: "✖️➗",
  forma: "cuadrado",
  color: "#e76f51", // naranja

},
{
  id:33,
  nombre: "Operaciones combinadas",
  descripcion: "Realiza operaciones combinadas con  suma, resta, multiplicacion y division.",
  nivel: "Nivel 4",
  completado: false,
  icono: "🧮",
  forma: "triangulo",
  color: "#d62828", // rojo
  
},
/*{
  id: 34,
  nombre:"MULtiplicaion y division con varias cifras",
  descripcion: "Aprende a multiplicar y dividir con números de varias cifras.",
  nivel: "Nivel 5",
  completado: false,
  icono: "✖️➗",
  forma: "estrella",
  color: "#fcbf49", // amarillo

},
{
  id: 35,
  nombre: "Multiplos y divisores",
  descripcion: "Comprende los múltiplos y divisores de un número.",
  nivel: "Nivel 5",
  completado: false,
  icono: "🔢",
  forma: "cuadrado",
  color: "#e76f51", // naranja

},
{
  id: 36,
  nombre: "Numeros Primos y compuetos",
  descripcion: "Identifica números primos y compuestos.",
  nivel: "Nivel 5",
  completado: false,
  icono: "🔢",
  forma: "nube",
  color: "#2a9d8f", // azul claro

},
{
  id:37,
  nombre:"Fracciones equivalentes y operaciones con fracciones",
  descripcion: "Comprende fracciones equivalentes y realiza operaciones con ellas.",
  nivel: "Nivel 5",
  completado: false,
  icono: "🥧",
  forma: "triangulo",
  color: "#d62828", // rojo
},
{
  id:38,
  nombre: "Decimales  suma y resta",
  descripcion: "Aprende a sumar y restar números decimales.",
  nivel: "Nivel 5",
  completado: false,
  icono: "➕➖",
  forma: "estrella",
  color: "#fcbf49", // amarillo

},
{
  id:39,
  nombre: "Geometria perimetro y area",
  descripcion: "Calcula el perímetro y área de figuras geométricas.",
  nivel: "Nivel 6",
  completado: false,
  icono: "📐",
  forma: "cuadrado",
  color: "#e76f51", // naranja

},
{
  Angulos: 40,
  nombre: "Geometria Angulos",
  descripcion: "Identifica y mide ángulos en figuras geométricas.",
  nivel: "Nivel 6",
  completado: false,
  icono: "🔺",
  forma: "nube",
  color: "#2a9d8f", // azul claro
},
{
  id:41,
  nombre: "Sistema de medidas y Conversiones",
  descripcion: "Comprende el sistema de medidas y realiza conversiones.",
  nivel: "Nivel 6",
  completado: false,
  icono: "📏",
  forma: "triangulo",
  color: "#d62828", // rojo
},
{
  id:42,
  nombre: "Interpretacion de datos y estadística",
  descripcion: "Aprende a interpretar datos y conceptos básicos de estadística.",
  nivel: "Nivel 6",
  completado: false,
  icono: "📉",
  forma: "estrella",
  color: "#fcbf49", // amarillo

},
{
  id:43,
  nombre: "Resolcion de problemas matemáticos complejos",
  descripcion: "Resuelve problemas matemáticos complejos utilizando diferentes operaciones.",
  nivel: "Nivel 6",
  completado: false,
  icono: "📘",
  forma: "cuadrado",
  color: "#e76f51", // naranja

},
{
    id: 44,
    nombre: 'Ordenar números',
    descripcion: 'Ordena números del menor al mayor y viceversa.',
    nivel: 'Nivel 1',
    completado: false,
    icono: '🔢',
    forma: 'cuadrado',
    color: '#e76f51'
  },
  {
    id: 45,
    nombre: 'Conteo de objetos',
    descripcion: 'Cuenta objetos como frutas, lápices y juguetes.',
    nivel: 'Nivel 1',
    completado: false,
    icono: '🍎',
    forma: 'estrella',
    color: '#fcbf49'
  },
  {
    id: 46,
    nombre: 'Sumas y restas con dibujos',
    descripcion: 'Aprende sumas y restas con imágenes y dibujos.',
    nivel: 'Nivel 2',
    completado: false,
    icono: '🖼️',
    forma: 'nube',
    color: '#2a9d8f'
  },
  {
    id: 47,
    nombre: 'Número que falta',
    descripcion: 'Encuentra el número faltante en una secuencia.',
    nivel: 'Nivel 2',
    completado: false,
    icono: '❓',
    forma: 'triangulo',
    color: '#d62828'
  },
  {
    id: 48,
    nombre: 'Dobles y mitades',
    descripcion: 'Explora los dobles y mitades de números.',
    nivel: 'Nivel 2',
    completado: false,
    icono: '🧊',
    forma: 'cuadrado',
    color: '#e76f51'
  },
  {
    id: 49,
    nombre: 'Descomposición aditiva',
    descripcion: 'Descompón números como suma de otros.',
    nivel: 'Nivel 3',
    completado: false,
    icono: '🧩',
    forma: 'estrella',
    color: '#fcbf49'
  },
  {
    id: 50,
    nombre: 'Problemas con dinero',
    descripcion: 'Resuelve ejercicios con monedas y billetes.',
    nivel: 'Nivel 3',
    completado: false,
    icono: '💰',
    forma: 'circulo',
    color: '#264653'
  },
  {
    id: 51,
    nombre: 'Líneas y simetría',
    descripcion: 'Explora figuras con ejes de simetría.',
    nivel: 'Nivel 4',
    completado: false,
    icono: '📏',
    forma: 'triangulo',
    color: '#d62828'
  },
  {
    id: 52,
    nombre: 'Multiplicación como suma repetida',
    descripcion: 'Entiende la multiplicación como suma repetida.',
    nivel: 'Nivel 4',
    completado: false,
    icono: '➕',
    forma: 'cuadrado',
    color: '#e76f51'
  },
  {
    id: 53,
    nombre: 'División como reparto',
    descripcion: 'Aprende división repartiendo objetos.',
    nivel: 'Nivel 5',
    completado: false,
    icono: '🍬',
    forma: 'nube',
    color: '#2a9d8f'
  },
  {
    id: 54,
    nombre: 'Sistema decimal',
    descripcion: 'Comprende unidades, decenas y centenas.',
    nivel: 'Nivel 5',
    completado: false,
    icono: '🔟',
    forma: 'estrella',
    color: '#fcbf49'
  },
  {
    id: 55,
    nombre: 'Coordenadas cartesianas',
    descripcion: 'Ubica puntos en el plano cartesiano.',
    nivel: 'Nivel 6',
    completado: false,
    icono: '📍',
    forma: 'cuadrado',
    color: '#e76f51'
  },
  {
    id: 56,
    nombre: 'Probabilidad básica',
    descripcion: 'Explora eventos posibles e imposibles.',
    nivel: 'Nivel 6',
    completado: false,
    icono: '🎲',
    forma: 'triangulo',
    color: '#d62828'
  },*/


  ]


export default ClasesData;











