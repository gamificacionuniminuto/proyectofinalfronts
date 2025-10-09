import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./figuras.css";

/** ====== Datos de pares 2D ↔ 3D ====== */
const PARES = [
  {
    id: "sq-cube",
    nombre2D: "Cuadrado (2D)",
    nombre3D: "Cubo (3D)",
    clase2D: "cuadrado",
    tipo3D: "cubo",
    explicacion:
      "El cuadrado es una figura plana con 4 lados iguales. Su equivalente 3D es el cubo, que tiene 6 caras cuadradas."
  },
  {
    id: "circ-sphere",
    nombre2D: "Círculo (2D)",
    nombre3D: "Esfera (3D)",
    clase2D: "circulo",
    tipo3D: "esfera",
    explicacion:
      "El círculo es una figura plana. Su equivalente 3D es la esfera, un sólido redondo sin aristas ni caras planas."
  },
  {
    id: "tri-pyr",
    nombre2D: "Triángulo (2D)",
    nombre3D: "Pirámide (3D)",
    clase2D: "triangulo",
    tipo3D: "piramide",
    explicacion:
      "El triángulo es una figura plana de 3 lados. Su equivalente 3D es la pirámide, que tiene una base y caras triangulares que se unen en un vértice."
  },
  {
    id: "rect-prism",
    nombre2D: "Rectángulo (2D)",
    nombre3D: "Prisma rectangular (3D)",
    clase2D: "rectangulo",
    tipo3D: "prismaRectangular",
    explicacion:
      "El rectángulo tiene lados opuestos iguales. Su equivalente 3D es el prisma rectangular, con caras rectangulares."
  },
  {
    id: "pent-prism",
    nombre2D: "Pentágono (2D)",
    nombre3D: "Prisma pentagonal (3D)",
    clase2D: "pentagono",
    tipo3D: "prismaPentagonal",
    explicacion:
      "El pentágono tiene 5 lados. Su figura 3D asociada es el prisma pentagonal, con bases pentagonales y caras rectangulares."
  },
  {
    id: "oval-ellipsoid",
    nombre2D: "Óvalo (2D)",
    nombre3D: "Elipsoide (3D)",
    clase2D: "ovalo",
    tipo3D: "elipsoide",
    explicacion:
      "El óvalo es una figura curva plana. Su equivalente 3D es el elipsoide, una forma redondeada similar a una esfera aplastada."
  },
  {
    id: "hex-prism",
    nombre2D: "Hexágono (2D)",
    nombre3D: "Prisma hexagonal (3D)",
    clase2D: "hexagono",
    tipo3D: "prismaHexagonal",
    explicacion:
      "El hexágono tiene 6 lados. Su equivalente 3D es el prisma hexagonal, que tiene dos bases hexagonales y caras rectangulares."
  },
  {
    id: "trap-frustum",
    nombre2D: "Trapecio (2D)",
    nombre3D: "Tronco de pirámide (3D)",
    clase2D: "trapecio",
    tipo3D: "troncoPiramide",
    explicacion:
      "El trapecio es una figura con un par de lados paralelos. Su forma 3D equivalente es el tronco de pirámide, con dos bases de diferente tamaño."
  }
];


/** Utilidad para barajar */
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

/** ====== Voz ====== */
const hablar = (texto) => {
  const synth = window.speechSynthesis;
  if (!synth) return;
  if (synth.speaking) synth.cancel();
  const u = new SpeechSynthesisUtterance(texto);
  u.lang = "es-ES";
  synth.speak(u);
};

/** ====== Vista 3D por tarjeta ====== */
const ThreeShape = ({ type }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(120, 100);
    mount.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Geometría según tipo
    let geometry;
    switch (type) {
      case "cubo":
        geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
        break;
      case "esfera":
        geometry = new THREE.SphereGeometry(1.2, 32, 32);
        break;
      case "piramide":
        geometry = new THREE.ConeGeometry(1.2, 1.8, 4);
        break;
      case "prismaRectangular":
        geometry = new THREE.BoxGeometry(2, 1, 1);
        break;
      case "prismaPentagonal":
        geometry = new THREE.CylinderGeometry(1, 1, 2, 5);
        break;
      case "elipsoide":
        geometry = new THREE.SphereGeometry(1.2, 32, 32);
        geometry.scale(1.2, 0.8, 1);
        break;
      case "prismaHexagonal":
        geometry = new THREE.CylinderGeometry(1, 1, 2, 6);
        break;
      case "troncoPiramide":
        geometry = new THREE.CylinderGeometry(0.8, 1.6, 1.8, 4, 1);
        break;
      default:
        geometry = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    }

    const material = new THREE.MeshStandardMaterial({
      color: type === "cubo" ? "#7c4dff" : type === "esfera" ? "#03a9f4" : "#ff7043",
      roughness: 0.35,
      metalness: 0.1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    scene.add(mesh);

    // Piso
    const plane = new THREE.Mesh(
      new THREE.CircleGeometry(4, 48),
      new THREE.MeshPhongMaterial({ color: "#eaeef5", shininess: 10 })
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1.2;
    scene.add(plane);

    // Controles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 2;
    controls.maxDistance = 8;

    let frameId;
    const animate = () => {
      controls.update();
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      controls.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);

      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          obj.material?.dispose?.();
        }
      });
    };
  }, [type]);

  return <div className="three-card" ref={mountRef} />;
};



/* (Removed duplicate/stray ThreeShape code block that was outside any function) */

/** ====== Juego principal ====== */
const FigurasPareo2D3D = ({ onVolver }) => {
  // barajamos listas por separado
  const paresBarajados = useMemo(() => shuffle(PARES), []);
  const [lista2D, setLista2D] = useState(() => shuffle(paresBarajados));
  const [lista3D, setLista3D] = useState(() => shuffle(paresBarajados));
  const [seleccion2D, setSeleccion2D] = useState(null); // id seleccionado en 2D
  const [seleccion3D, setSeleccion3D] = useState(null); // id seleccionado en 3D
  const [aciertos, setAciertos] = useState(0);
  const [intentos, setIntentos] = useState(0);
  const [completado, setCompletado] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Para marcar completados
  const [hechos, setHechos] = useState(() => new Set());

  const resetear = () => {
    const nuevo = shuffle(PARES);
    setLista2D(shuffle(nuevo));
    setLista3D(shuffle(nuevo));
    setHechos(new Set());
    setSeleccion2D(null);
    setSeleccion3D(null);
    setAciertos(0);
    setIntentos(0);
    setCompletado(false);
    setMensaje("");
  };

  const expDeId = (id) => PARES.find((p) => p.id === id)?.explicacion || "";

  const click2D = (id) => {
    if (hechos.has(id)) return;
    setSeleccion2D(id);
    const par = PARES.find((p) => p.id === id);
    hablar(`${par?.nombre2D}. ${par?.explicacion}`);
    setMensaje(`Seleccionaste: ${par?.nombre2D}`);
  };

  const click3D = (id) => {
    if (hechos.has(id)) return;
    setSeleccion3D(id);
    const par = PARES.find((p) => p.id === id);
    hablar(`${par?.nombre3D}. ${par?.explicacion}`);
    setMensaje(`Seleccionaste: ${par?.nombre3D}`);
  };

  useEffect(() => {
    // cuando hay selección en ambos lados, evaluar
    if (!seleccion2D || !seleccion3D) return;

    const esMatch = seleccion2D === seleccion3D;
    setIntentos((n) => n + 1);

    if (esMatch) {
      // acierto
      setHechos((prev) => {
        const nuevo = new Set(prev);
        nuevo.add(seleccion2D);
        return nuevo;
      });
      setAciertos((n) => n + 1);
      hablar("¡Muy bien! Es un par correcto. 2D y 3D equivalentes.");
      setMensaje("✅ ¡Correcto! Hiciste un pareo correcto.");

      // limpiar selección
      setSeleccion2D(null);
      setSeleccion3D(null);
    } else {
      // error
      hablar("No coincide. Intenta de nuevo. Observa las características de cada figura.");
      setMensaje("❌ No coinciden. Intenta de nuevo.");
      // dejar visibles por un momento y luego limpiar
      const t = setTimeout(() => {
        setSeleccion2D(null);
        setSeleccion3D(null);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [seleccion2D, seleccion3D]);

  useEffect(() => {
    if (hechos.size === PARES.length) {
      setCompletado(true);
      hablar(`¡Excelente! Completaste todos los pareos con ${aciertos} aciertos en ${intentos} intentos.`);
      setMensaje("🎉 ¡Juego completado! ¡Gran trabajo!");
    }
  }, [hechos, aciertos, intentos]);

  return (
    <div className="pareo-wrap">
      <div className="pareo-header">
        <h2>Juego de Pareo: 2D ↔ 3D</h2>

        <div className="acciones">
          <button
            className="btn volver"
            onClick={() => (onVolver ? onVolver() : window.history.back())}
          >
            ⬅ Regresar a clases
          </button>

          <button className="btn secundario" onClick={resetear}>
            🔄 Reiniciar
          </button>
        </div>
      </div>

      <p className="stats">
        <b>Aciertos:</b> {aciertos} / {PARES.length} &nbsp; • &nbsp;
        <b>Intentos:</b> {intentos}
      </p>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="pareo-grid">
        {/* Columna 2D */}
        <div className="columna">
          <h3>Figuras 2D</h3>
          <div className="lista">
            {lista2D.map((p) => {
              const activo = seleccion2D === p.id;
              const done = hechos.has(p.id);
              return (
                <button
                  key={p.id}
                  className={`card2d ${p.clase2D} ${activo ? "activo" : ""} ${
                    done ? "hecho" : ""
                  }`}
                  onClick={() => click2D(p.id)}
                  disabled={done}
                  aria-label={p.nombre2D}
                  title={p.nombre2D}
                >
                  <span className="etiqueta">{p.nombre2D}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Columna 3D */}
        <div className="columna">
          <h3>Figuras 3D (rotar con el mouse)</h3>
          <div className="lista">
            {lista3D.map((p) => {
              const activo = seleccion3D === p.id;
              const done = hechos.has(p.id);
              return (
                <div
                  key={p.id}
                  className={`card3d ${activo ? "activo" : ""} ${
                    done ? "hecho" : ""
                  }`}
                  onClick={() => click3D(p.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && click3D(p.id)}
                  title={p.nombre3D}
                >
                  <ThreeShape type={p.tipo3D} />
                  <span className="etiqueta">{p.nombre3D}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {completado && (
        <div className="fin">
          <h3>¡Excelente! 🎉</h3>
          <p>
            Completaste todos los pareos con <b>{aciertos}</b> aciertos en{" "}
            <b>{intentos}</b> intentos.
          </p>
          <button className="btn primario" onClick={resetear}>
            Jugar otra vez
          </button>
        </div>
      )}

      <div className="ayuda">
        <h4>¿Cómo jugar?</h4>
        <ul>
          <li>Haz clic en una figura 2D y luego en su equivalente 3D.</li>
          <li>Escucha la explicación por voz para aprender sus características.</li>
          <li>¡Puedes rotar las figuras 3D con el mouse!</li>
        </ul>
      </div>
    </div>
  );
};

export default FigurasPareo2D3D;
