"use client";

import { Dithering, ImageDithering } from "@paper-design/shaders-react";
import { Edges, Html, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AnimatePresence, animate, motion, useMotionValue, useSpring, type MotionValue } from "motion/react";
import { Component, Suspense, createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";

const PLATE_WIDTH = 3.18;
const PLATE_HEIGHT = 4.12;
const PLATE_DEPTH = 0.075;
const VECTOR_DOCUMENT_SCALE = 0.195;
const VECTOR_RENDER_SCALE = 4;
const CINEMATIC_BREAKPOINT = "(min-width: 48rem), (orientation: landscape) and (min-width: 40rem)";
const SKILLS_REVEAL_THRESHOLD = 0.2;
const EXPERIENCE_TRANSITION_START = 0.48;
const EXPERIENCE_TRANSITION_WINDOW = 0.16;
const EXPERIENCE_REVEAL_THRESHOLD = EXPERIENCE_TRANSITION_START + EXPERIENCE_TRANSITION_WINDOW + 0.04;
const AUTHORED_EASE = [0.16, 1, 0.3, 1] as const;
const DETAIL_SPACE_FRACTION = 0.4;
const STAGE_ONE_YAW = -Math.PI / 6;
const STAGE_TWO_YAW = 0.62;
const STAGE_ONE_RIGHT_COMPENSATION = 0.34;
const FRAGMENT_LIFT = 0.24;

type CinematicScrollState = {
  enabled: boolean;
  progress: number;
  smoothedProgress: MotionValue<number>;
  reducedMotion: boolean;
};

type HighlightStroke = {
  id: string;
  path: string;
  washPath: string;
};

type ResumeExcavation = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  texture: string;
  delay: number;
  tiltX: number;
  tiltY: number;
};

const HIGHLIGHT_STROKES: HighlightStroke[] = [
  {
    id: "python",
    path: "M 105 170 C 113 168.4, 128 168.9, 141 170.1",
    washPath: "M 105.5 171.5 C 116 170.2, 130 170.1, 141 171.1",
  },
  {
    id: "bash-shell",
    path: "M 275 170 C 287 168.6, 309 168.7, 323 170.1",
    washPath: "M 274.8 171.6 C 290 170.3, 309 170.2, 323.5 171.3",
  },
  {
    id: "pytorch",
    path: "M 210 182.2 C 221 180.7, 238.5 181.1, 248.6 182.3",
    washPath: "M 210 183.8 C 222.4 182.6, 238 182.5, 249.2 183.7",
  },
  {
    id: "claude-code",
    path: "M 344.5 194.2 C 358 192.5, 388 192.7, 400.5 194.1",
    washPath: "M 344.8 195.8 C 360 194.5, 387.8 194.3, 401 195.4",
  },
];

const RESUME_EXCAVATIONS: ResumeExcavation[] = [
  {
    id: "parallel-agent-execution",
    x: 261.3,
    y: 288.2,
    width: 106,
    height: 11.2,
    texture: "/resume/fragment-parallel-agent.png",
    delay: 0.1,
    tiltX: -0.035,
    tiltY: 0.028,
  },
  {
    id: "three-d-unets",
    x: 256.1,
    y: 360.6,
    width: 45.3,
    height: 11.1,
    texture: "/resume/fragment-three-d-unets.png",
    delay: 0.38,
    tiltX: -0.044,
    tiltY: -0.036,
  },
  {
    id: "mri-and-ct-images",
    x: 339.7,
    y: 371.2,
    width: 92.1,
    height: 11.1,
    texture: "/resume/fragment-mri-ct.png",
    delay: 0.65,
    tiltX: -0.026,
    tiltY: 0.042,
  },
];

const RESUME_FACE_TILES = [
  { texture: "/resume/resume-tile-top-left.png", position: [-PLATE_WIDTH / 4, PLATE_HEIGHT / 4, PLATE_DEPTH / 2 + 0.001] as const },
  { texture: "/resume/resume-tile-top-right.png", position: [PLATE_WIDTH / 4, PLATE_HEIGHT / 4, PLATE_DEPTH / 2 + 0.001] as const },
  { texture: "/resume/resume-tile-bottom-left.png", position: [-PLATE_WIDTH / 4, -PLATE_HEIGHT / 4, PLATE_DEPTH / 2 + 0.001] as const },
  { texture: "/resume/resume-tile-bottom-right.png", position: [PLATE_WIDTH / 4, -PLATE_HEIGHT / 4, PLATE_DEPTH / 2 + 0.001] as const },
];

const CinematicScrollContext = createContext<React.MutableRefObject<CinematicScrollState> | null>(null);

function getSnapProgress(progress: number, start: number, duration: number) {
  const transitionProgress = THREE.MathUtils.clamp((progress - start) / duration, 0, 1);

  return 1 - 2 ** (-10 * transitionProgress);
}

function getCinematicProgress(progress: number) {
  return getSnapProgress(progress, 0, 0.22);
}

function getExperienceProgress(progress: number) {
  return getSnapProgress(progress, EXPERIENCE_TRANSITION_START, EXPERIENCE_TRANSITION_WINDOW);
}

function createFloatingShadowTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  if (!context) {
    return new THREE.Texture();
  }

  context.filter = "blur(26px)";
  context.fillStyle = "rgb(55 45 35 / 24%)";
  context.fillRect(98, 56, 305, 402);
  context.filter = "none";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function ResumeHighlights({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const transitionDuration = reducedMotion ? 0 : 1.78;

  return (
    <svg
      className="resume-highlights"
      viewBox="0 0 612 792"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g style={{ mixBlendMode: "multiply" }}>
        {HIGHLIGHT_STROKES.map((stroke, index) => {
          const delay = reducedMotion ? 0 : index * 0.46;
          const transition = { duration: transitionDuration, delay, ease: AUTHORED_EASE };

          return (
            <g key={stroke.id}>
              <motion.path
                d={stroke.washPath}
                fill="none"
                stroke="#f0db47"
                strokeWidth="15.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.42 : 0 }}
                transition={transition}
              />
              <motion.path
                d={stroke.path}
                fill="none"
                stroke="#e6cc31"
                strokeWidth="10.8"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.5 : 0 }}
                transition={{ ...transition, delay: delay + (reducedMotion ? 0 : 0.08) }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function prepareTexture(texture: THREE.Texture, maxAnisotropy: number) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = Math.min(16, maxAnisotropy);
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
}

function ResumeFace() {
  const textures = useTexture(RESUME_FACE_TILES.map((tile) => tile.texture));
  const { gl } = useThree();

  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    textures.forEach((texture) => prepareTexture(texture, maxAnisotropy));
  }, [gl, textures]);

  return RESUME_FACE_TILES.map((tile, index) => (
    <mesh key={tile.texture} position={tile.position} receiveShadow>
      <planeGeometry args={[PLATE_WIDTH / 2, PLATE_HEIGHT / 2]} />
      <meshStandardMaterial map={textures[index]} roughness={0.68} metalness={0} />
    </mesh>
  ));
}

function pdfXToWorld(x: number) {
  return -PLATE_WIDTH / 2 + (x / 612) * PLATE_WIDTH;
}

function pdfYToWorld(y: number) {
  return PLATE_HEIGHT / 2 - (y / 792) * PLATE_HEIGHT;
}

function ExperienceFragment({
  excavation,
  active,
  reducedMotion,
}: {
  excavation: ResumeExcavation;
  active: boolean;
  reducedMotion: boolean;
}) {
  const fragmentGroup = useRef<THREE.Group>(null);
  const texture = useTexture(excavation.texture);
  const { gl } = useThree();
  const lift = useMotionValue(active ? 1 : 0);
  const width = (excavation.width / 612) * PLATE_WIDTH;
  const height = (excavation.height / 792) * PLATE_HEIGHT;
  const x = pdfXToWorld(excavation.x + excavation.width / 2);
  const y = pdfYToWorld(excavation.y + excavation.height / 2);

  useEffect(() => {
    prepareTexture(texture, gl.capabilities.getMaxAnisotropy());
  }, [gl, texture]);

  useEffect(() => {
    if (reducedMotion) {
      lift.set(active ? 1 : 0);
      return;
    }

    const controls = animate(lift, active ? 1 : 0, {
      duration: active ? 2.25 : 0.42,
      delay: active ? excavation.delay : 0,
      ease: AUTHORED_EASE,
    });

    return () => controls.stop();
  }, [active, excavation.delay, lift, reducedMotion]);

  useFrame((state) => {
    if (!fragmentGroup.current) return;

    const progress = lift.get();
    const tremorStrength = active && !reducedMotion
      ? THREE.MathUtils.smoothstep(progress, 0.72, 1) * 0.0015
      : 0;
    const time = state.clock.elapsedTime;

    fragmentGroup.current.position.x = Math.sin(time * 17.2 + excavation.x) * tremorStrength;
    fragmentGroup.current.position.y = Math.cos(time * 19.4 + excavation.y) * tremorStrength;
    fragmentGroup.current.position.z = progress * FRAGMENT_LIFT;
    fragmentGroup.current.rotation.x = excavation.tiltX * progress + Math.sin(time * 13.1) * tremorStrength * 0.8;
    fragmentGroup.current.rotation.y = excavation.tiltY * progress + Math.cos(time * 11.7) * tremorStrength * 0.8;
    fragmentGroup.current.rotation.z = Math.sin(time * 15.3 + excavation.width) * tremorStrength * 1.2;
  });

  return (
    <group position={[x, y, 0]}>
      <mesh position={[0, 0, PLATE_DEPTH / 2 + 0.002]} receiveShadow>
        <planeGeometry args={[width * 1.012, height * 1.05]} />
        <meshStandardMaterial color="#fbfbf9" roughness={0.76} metalness={0} />
      </mesh>
      <group ref={fragmentGroup}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[width, height, PLATE_DEPTH]} />
          <meshPhysicalMaterial
            color="#fbfbf9"
            roughness={0.38}
            metalness={0}
            clearcoat={0.12}
            clearcoatRoughness={0.68}
          />
          <Edges color="#85827c" threshold={14} transparent opacity={0.24} />
        </mesh>
        <mesh position={[0, 0, PLATE_DEPTH / 2 + 0.001]} receiveShadow>
          <planeGeometry args={[width, height]} />
          <meshStandardMaterial map={texture} roughness={0.68} metalness={0} />
        </mesh>
      </group>
    </group>
  );
}

function RockParticle({
  active,
  reducedMotion,
  origin,
  delay,
  duration,
  size,
  drift,
  seed,
}: {
  active: boolean;
  reducedMotion: boolean;
  origin: [number, number];
  delay: number;
  duration: number;
  size: number;
  drift: number;
  seed: number;
}) {
  const particle = useRef<THREE.Mesh>(null);
  const fall = useMotionValue(0);

  useEffect(() => {
    fall.set(0);

    if (!active || reducedMotion) return;

    const controls = animate(fall, 1, {
      duration,
      delay,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 0.55 + (seed % 3) * 0.22,
    });

    return () => controls.stop();
  }, [active, delay, duration, fall, reducedMotion, seed]);

  useFrame(() => {
    if (!particle.current) return;

    const progress = fall.get();
    const visible = active && !reducedMotion && progress > 0.001 && progress < 0.998;
    particle.current.visible = visible;

    if (!visible) return;

    const entrance = THREE.MathUtils.smoothstep(progress, 0, 0.08);
    const exit = 1 - THREE.MathUtils.smoothstep(progress, 0.88, 1);
    const particleScale = size * entrance * exit;

    particle.current.position.x = origin[0] + drift * progress + Math.sin(progress * 9 + seed) * 0.015;
    particle.current.position.y = origin[1] - 0.025 - progress * 4.8;
    particle.current.position.z = 0.08 + Math.sin(progress * Math.PI) * 0.09;
    particle.current.rotation.x = progress * (8 + seed * 0.4);
    particle.current.rotation.y = progress * (11 + seed * 0.3);
    particle.current.rotation.z = progress * (6 + seed * 0.2);
    particle.current.scale.setScalar(particleScale);
  });

  return (
    <mesh ref={particle} visible={false} castShadow>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={seed % 2 === 0 ? "#8d877d" : "#665f56"} roughness={0.92} metalness={0} />
    </mesh>
  );
}

function ExperienceFragments({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  const particles = RESUME_EXCAVATIONS.flatMap((excavation, excavationIndex) => {
    const width = (excavation.width / 612) * PLATE_WIDTH;
    const x = pdfXToWorld(excavation.x + excavation.width / 2);
    const y = pdfYToWorld(excavation.y + excavation.height);

    return Array.from({ length: 6 }, (_, particleIndex) => {
      const seed = excavationIndex * 6 + particleIndex + 1;

      return {
        key: `${excavation.id}-${particleIndex}`,
        origin: [x + ((particleIndex % 3) - 1) * width * 0.28, y] as [number, number],
        delay: excavation.delay + 0.72 + particleIndex * 0.24,
        duration: 3.2 + (seed % 4) * 0.34,
        size: 0.009 + (seed % 5) * 0.0028,
        drift: ((seed % 3) - 1) * 0.16,
        seed,
      };
    });
  });

  return (
    <group>
      {RESUME_EXCAVATIONS.map((excavation) => (
        <ExperienceFragment
          key={excavation.id}
          excavation={excavation}
          active={active}
          reducedMotion={reducedMotion}
        />
      ))}
      {particles.map((particle) => (
        <RockParticle
          key={particle.key}
          active={active}
          reducedMotion={reducedMotion}
          origin={particle.origin}
          delay={particle.delay}
          duration={particle.duration}
          size={particle.size}
          drift={particle.drift}
          seed={particle.seed}
        />
      ))}
    </group>
  );
}

function ResumeSlab({
  skillsActive,
  experienceActive,
  reducedMotion,
}: {
  skillsActive: boolean;
  experienceActive: boolean;
  reducedMotion: boolean;
}) {
  const sceneGroup = useRef<THREE.Group>(null);
  const orientationGroup = useRef<THREE.Group>(null);
  const rollGroup = useRef<THREE.Group>(null);
  const cinematicScrollRef = useContext(CinematicScrollContext);
  const shadowTexture = useMemo(() => createFloatingShadowTexture(), []);
  const { viewport } = useThree();
  const scale = Math.min(1, (viewport.width - 0.28) / PLATE_WIDTH);

  if (!cinematicScrollRef) {
    throw new Error("ResumeSlab must be rendered within the cinematic scroll provider.");
  }

  useEffect(() => () => shadowTexture.dispose(), [shadowTexture]);

  useFrame((_, delta) => {
    if (!sceneGroup.current || !orientationGroup.current || !rollGroup.current) return;

    const cinematic = cinematicScrollRef.current;
    const scrollProgress = cinematic.reducedMotion ? cinematic.progress : cinematic.smoothedProgress.get();
    const stageProgress = cinematic.enabled ? getCinematicProgress(scrollProgress) : 0;
    const experienceProgress = cinematic.enabled ? getExperienceProgress(scrollProgress) : 0;
    const easing = reducedMotion || cinematic.reducedMotion ? 50 : 22;
    const sceneScale = scale * THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(1.1, 1.36, stageProgress),
      1.29,
      experienceProgress,
    );
    const baseRotation = cinematic.enabled
      ? {
          x: THREE.MathUtils.lerp(THREE.MathUtils.lerp(-0.018, -0.09, stageProgress), -0.13, experienceProgress),
          // At the industry-experience view the right edge recedes into the scene.
          y: THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.012, STAGE_ONE_YAW, stageProgress), STAGE_TWO_YAW, experienceProgress),
          z: THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, 0.038, stageProgress), -0.028, experienceProgress),
        }
      : { x: -0.12, y: -0.32, z: 0 };

    const cameraTargetX = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, 0.62, stageProgress), 1.34, experienceProgress);
    const plateHalfWidth = (PLATE_WIDTH * sceneScale) / 2;
    const skillsSceneX = cameraTargetX
      + plateHalfWidth
      - viewport.width * (0.5 - DETAIL_SPACE_FRACTION)
      + THREE.MathUtils.lerp(0, STAGE_ONE_RIGHT_COMPENSATION, stageProgress);
    const experienceProjectedWidth = PLATE_WIDTH * sceneScale * Math.cos(STAGE_TWO_YAW);
    const experienceSceneX = cameraTargetX - viewport.width * 0.47 + experienceProjectedWidth / 2;
    const reservedSceneX = THREE.MathUtils.lerp(skillsSceneX, experienceSceneX, experienceProgress);

    sceneGroup.current.position.x = THREE.MathUtils.damp(
      sceneGroup.current.position.x,
      cinematic.enabled ? reservedSceneX : 0,
      easing,
      delta,
    );
    sceneGroup.current.position.y = THREE.MathUtils.damp(
      sceneGroup.current.position.y,
      THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, -0.08, stageProgress), 0.02, experienceProgress),
      easing,
      delta,
    );
    sceneGroup.current.scale.x = THREE.MathUtils.damp(sceneGroup.current.scale.x, sceneScale, easing, delta);
    sceneGroup.current.scale.y = THREE.MathUtils.damp(sceneGroup.current.scale.y, sceneScale, easing, delta);
    sceneGroup.current.scale.z = THREE.MathUtils.damp(sceneGroup.current.scale.z, sceneScale, easing, delta);
    orientationGroup.current.rotation.x = THREE.MathUtils.damp(
      orientationGroup.current.rotation.x,
      baseRotation.x,
      easing,
      delta,
    );
    orientationGroup.current.rotation.y = THREE.MathUtils.damp(
      orientationGroup.current.rotation.y,
      baseRotation.y,
      easing,
      delta,
    );
    rollGroup.current.rotation.z = THREE.MathUtils.damp(
      rollGroup.current.rotation.z,
      baseRotation.z,
      easing,
      delta,
    );
  });

  return (
    <group ref={sceneGroup} scale={scale}>
      <group ref={orientationGroup}>
        <group ref={rollGroup}>
          <mesh position={[0.14, -0.17, -PLATE_DEPTH / 2 - 0.045]} renderOrder={-1}>
            <planeGeometry args={[PLATE_WIDTH * 1.12, PLATE_HEIGHT * 1.1]} />
            <meshBasicMaterial map={shadowTexture} transparent opacity={0.46} depthWrite={false} />
          </mesh>

          <RoundedBox
            args={[PLATE_WIDTH, PLATE_HEIGHT, PLATE_DEPTH]}
            radius={0.025}
            smoothness={5}
            castShadow
            receiveShadow
          >
            <meshPhysicalMaterial
              color="#fbfbf9"
              roughness={0.31}
              metalness={0}
              clearcoat={0.18}
              clearcoatRoughness={0.62}
            />
            <Edges color="#8f8e89" threshold={18} scale={1.002} transparent opacity={0.24} />
          </RoundedBox>
          <ResumeFace />
          <ExperienceFragments active={experienceActive} reducedMotion={reducedMotion} />

          {!experienceActive ? (
            <Html
              transform
              center
              distanceFactor={10}
              position={[0, 0, PLATE_DEPTH / 2 + 0.003]}
              scale={VECTOR_DOCUMENT_SCALE / VECTOR_RENDER_SCALE}
              className="resume-vector-face"
              pointerEvents="none"
            >
              <div className="resume-vector-frame">
                <object
                  className="resume-vector-document"
                  data="/resume/kuan-yi-wang-resume.svg"
                  type="image/svg+xml"
                  aria-label="Kuan Yi Wang resume"
                />
                <ResumeHighlights active={skillsActive} reducedMotion={reducedMotion} />
              </div>
            </Html>
          ) : null}
        </group>
      </group>
    </group>
  );
}

function CinematicCamera({ reducedMotion }: { reducedMotion: boolean }) {
  const cinematicScrollRef = useContext(CinematicScrollContext);
  const lookAt = useRef(new THREE.Vector3(0, 1.62, 0));

  if (!cinematicScrollRef) {
    throw new Error("CinematicCamera must be rendered within the cinematic scroll provider.");
  }

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const cinematic = cinematicScrollRef.current;
    const scrollProgress = cinematic.reducedMotion ? cinematic.progress : cinematic.smoothedProgress.get();
    const stageProgress = cinematic.enabled ? getCinematicProgress(scrollProgress) : 0;
    const experienceProgress = cinematic.enabled ? getExperienceProgress(scrollProgress) : 0;
    const easing = reducedMotion || cinematic.reducedMotion ? 50 : 22;
    const cameraPosition = cinematic.enabled
      ? {
          x: THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, -0.9, stageProgress), 1.7, experienceProgress),
          y: THREE.MathUtils.lerp(THREE.MathUtils.lerp(1.62, 1.1, stageProgress), 0.5, experienceProgress),
          z: THREE.MathUtils.lerp(THREE.MathUtils.lerp(3.15, 3.85, stageProgress), 4.28, experienceProgress),
        }
      : { x: 0, y: 0.1, z: 8.25 };
    const cameraTarget = cinematic.enabled
      ? {
          x: THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, 0.62, stageProgress), 1.34, experienceProgress),
          y: THREE.MathUtils.lerp(THREE.MathUtils.lerp(1.62, 1.1, stageProgress), 0.5, experienceProgress),
          z: 0,
        }
      : { x: 0, y: 0, z: 0 };

    camera.position.x = THREE.MathUtils.damp(camera.position.x, cameraPosition.x, easing, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, cameraPosition.y, easing, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, cameraPosition.z, easing, delta);
    camera.fov = THREE.MathUtils.damp(camera.fov, 35, easing, delta);
    camera.updateProjectionMatrix();
    lookAt.current.x = THREE.MathUtils.damp(lookAt.current.x, cameraTarget.x, easing, delta);
    lookAt.current.y = THREE.MathUtils.damp(lookAt.current.y, cameraTarget.y, easing, delta);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function WebglFallback() {
  return (
    <div className="webgl-fallback" role="status">
      <p>
        The 3D resume cannot load here. <a href="/resume/kuan-yi-wang-resume.pdf">Open the original PDF.</a>
      </p>
    </div>
  );
}

class SceneErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? <WebglFallback /> : this.props.children;
  }
}

function Scene({
  skillsActive,
  experienceActive,
  reducedMotion,
}: {
  skillsActive: boolean;
  experienceActive: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div
      className="scene-shell"
      role="img"
      aria-label="A white vector resume slab that moves through authored viewpoints as you scroll."
    >
      <Canvas
        className="scene"
        dpr={[1, 2]}
        camera={{ fov: 35, position: [0, 1.62, 3.15] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        fallback={<WebglFallback />}
      >
        <ambientLight intensity={0.52} color="#f3ebdf" />
        <directionalLight
          color="#fff9ed"
          intensity={2.9}
          position={[1.2, 7, 3.8]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00035}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <Suspense fallback={null}>
          <CinematicCamera reducedMotion={reducedMotion} />
          <ResumeSlab skillsActive={skillsActive} experienceActive={experienceActive} reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function DitherDetailCard({
  active,
  sequence,
  reducedMotion,
  variant,
}: {
  active: boolean;
  sequence: number;
  reducedMotion: boolean;
  variant: "skills" | "experience";
}) {
  const [noiseComplete, setNoiseComplete] = useState(false);
  const isExperience = variant === "experience";
  const horizontalOffset = isExperience ? 26 : -26;
  const image = isExperience ? "/resume/experience-detail.png" : "/resume/skills-detail.png";
  const caption = isExperience
    ? "Industry experience, read as material rather than interface."
    : "The technical vocabulary arrives as an annotated document, not a separate interface.";

  return (
    <AnimatePresence initial={false}>
      {active ? (
        <motion.aside
          key={sequence}
          className={`document-detail document-detail--${variant}`}
          aria-label={`${isExperience ? "Industry experience" : "Skills"} section detail`}
          initial={reducedMotion ? false : { opacity: 0, x: horizontalOffset }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: horizontalOffset * 0.7 }}
          transition={{ duration: reducedMotion ? 0 : 0.48, ease: AUTHORED_EASE }}
        >
          <figure className="detail-card">
            <div className="detail-card-image" aria-hidden="true">
              <AnimatePresence>
                {!noiseComplete && !reducedMotion ? (
                  <motion.div
                    className="detail-card-noise"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: [0, 0.78, 0.78, 0], scale: [0.92, 1, 1.02, 1.04] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3.25, times: [0, 0.18, 0.57, 1], ease: AUTHORED_EASE }}
                    onAnimationComplete={() => setNoiseComplete(true)}
                  >
                    <Dithering
                      className="detail-card-shader"
                      colorBack="#f7f4ed"
                      colorFront="#4d463d"
                      shape="simplex"
                      type="random"
                      size={2.2}
                      speed={0.16}
                      minPixelRatio={1}
                      maxPixelCount={220000}
                    />
                  </motion.div>
                ) : null}
              </AnimatePresence>
              <motion.div
                className="detail-card-dither"
                initial={reducedMotion ? false : { opacity: 0, filter: "blur(10px) contrast(0.42)", scale: 0.97 }}
                animate={{ opacity: 1, filter: "blur(0px) contrast(1)", scale: 1 }}
                transition={{ duration: reducedMotion ? 0 : 3.25, delay: reducedMotion ? 0 : 0.48, ease: AUTHORED_EASE }}
              >
                <ImageDithering
                  className="detail-card-shader"
                  image={image}
                  colorBack="#eee9df"
                  colorFront="#2f2a24"
                  colorHighlight="#857967"
                  originalColors={false}
                  type="8x8"
                  size={1.1}
                  colorSteps={3}
                  fit="cover"
                  offsetX={isExperience ? -0.02 : 0.03}
                  offsetY={isExperience ? 0.08 : -0.18}
                  speed={0}
                  minPixelRatio={1}
                  maxPixelCount={260000}
                />
              </motion.div>
            </div>
            <figcaption>
              <p>{caption}</p>
            </figcaption>
          </figure>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function CoordinateGuide() {
  return (
    <aside className="coordinate-guide" aria-label="Temporary orientation guide: positive X points right, positive Y points up, and positive Z points toward the viewer.">
      <svg viewBox="0 0 116 116" aria-hidden="true">
        <line className="axis axis-x" x1="28" y1="75" x2="99" y2="75" />
        <path className="axis-head axis-x" d="M 99 75 L 91 70 M 99 75 L 91 80" />
        <text className="axis-label axis-x" x="103" y="79">X</text>

        <line className="axis axis-y" x1="28" y1="75" x2="28" y2="15" />
        <path className="axis-head axis-y" d="M 28 15 L 23 23 M 28 15 L 33 23" />
        <text className="axis-label axis-y" x="23" y="11">Y</text>

        <line className="axis axis-z" x1="28" y1="75" x2="75" y2="105" />
        <path className="axis-head axis-z" d="M 75 105 L 66 104 M 75 105 L 70 97" />
        <text className="axis-label axis-z" x="79" y="110">Z</text>

        <circle className="axis-origin" cx="28" cy="75" r="2.6" />
      </svg>
    </aside>
  );
}

export function ResumeExperience() {
  const portfolioRef = useRef<HTMLElement>(null);
  const scrollProgress = useMotionValue(0);
  const smoothedScrollProgress = useSpring(scrollProgress, {
    stiffness: 135,
    damping: 27,
    mass: 0.68,
    restDelta: 0.0001,
  });
  const skillsStageRef = useRef(false);
  const experienceStageRef = useRef(false);
  const cinematicScrollRef = useRef<CinematicScrollState>({
    enabled: false,
    progress: 0,
    smoothedProgress: smoothedScrollProgress,
    reducedMotion: false,
  });
  const [skillsActive, setSkillsActive] = useState(false);
  const [skillsSequence, setSkillsSequence] = useState(0);
  const [experienceActive, setExperienceActive] = useState(false);
  const [experienceSequence, setExperienceSequence] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const portfolio = portfolioRef.current;

    if (!portfolio) return;

    const desktop = window.matchMedia(CINEMATIC_BREAKPOINT);
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;

    const updateScrollState = () => {
      const enabled = desktop.matches;
      const scrollRange = Math.max(1, portfolio.offsetHeight - window.innerHeight);
      const rawProgress = enabled
        ? THREE.MathUtils.clamp((window.scrollY - portfolio.offsetTop) / scrollRange, 0, 1)
        : 0;
      const nextSkillsActive = enabled
        && rawProgress >= SKILLS_REVEAL_THRESHOLD
        && rawProgress < EXPERIENCE_TRANSITION_START;
      const nextExperienceActive = enabled && rawProgress >= EXPERIENCE_REVEAL_THRESHOLD;
      const nextReducedMotion = reducedMotionMedia.matches;

      cinematicScrollRef.current.enabled = enabled;
      cinematicScrollRef.current.progress = rawProgress;
      cinematicScrollRef.current.reducedMotion = nextReducedMotion;
      scrollProgress.set(rawProgress);

      if (nextSkillsActive !== skillsStageRef.current) {
        skillsStageRef.current = nextSkillsActive;
        setSkillsActive(nextSkillsActive);

        if (nextSkillsActive) {
          setSkillsSequence((current) => current + 1);
        }
      }

      if (nextExperienceActive !== experienceStageRef.current) {
        experienceStageRef.current = nextExperienceActive;
        setExperienceActive(nextExperienceActive);

        if (nextExperienceActive) {
          setExperienceSequence((current) => current + 1);
        }
      }

      setReducedMotion((current) => (current === nextReducedMotion ? current : nextReducedMotion));
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    desktop.addEventListener("change", requestUpdate);
    reducedMotionMedia.addEventListener("change", requestUpdate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      desktop.removeEventListener("change", requestUpdate);
      reducedMotionMedia.removeEventListener("change", requestUpdate);
    };
  }, [scrollProgress]);

  return (
    <main ref={portfolioRef} className="portfolio">
      <noscript>
        <p>
          Your browser needs JavaScript to display the three-dimensional resume. <a href="/resume/kuan-yi-wang-resume.pdf">Open the PDF.</a>
        </p>
      </noscript>
      <CinematicScrollContext.Provider value={cinematicScrollRef}>
        <div className="portfolio-stage">
          <SceneErrorBoundary>
            <Scene skillsActive={skillsActive} experienceActive={experienceActive} reducedMotion={reducedMotion} />
          </SceneErrorBoundary>
          <CoordinateGuide />
          <DitherDetailCard
            key={`skills-${skillsSequence}`}
            active={skillsActive}
            sequence={skillsSequence}
            reducedMotion={reducedMotion}
            variant="skills"
          />
          <DitherDetailCard
            key={`experience-${experienceSequence}`}
            active={experienceActive}
            sequence={experienceSequence}
            reducedMotion={reducedMotion}
            variant="experience"
          />
          <footer className="control-rail" aria-label="Resume navigation">
            <p>Scroll to move through the document.</p>
            <a href="/resume/kuan-yi-wang-resume.pdf" target="_blank" rel="noreferrer">
              Open PDF
            </a>
          </footer>
        </div>
      </CinematicScrollContext.Provider>
    </main>
  );
}
