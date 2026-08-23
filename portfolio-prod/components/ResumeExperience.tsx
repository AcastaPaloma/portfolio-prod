"use client";

import { Dithering, ImageDithering } from "@paper-design/shaders-react";
import { Edges, Html, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AnimatePresence, animate, motion, useMotionValue, useSpring, type MotionValue } from "motion/react";
import Image from "next/image";
import { Component, Suspense, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import rough from "roughjs";
import * as THREE from "three";

const PLATE_WIDTH = 3.18;
const PLATE_HEIGHT = 4.12;
const PLATE_DEPTH = 0.075;
const VECTOR_DOCUMENT_SCALE = 0.195;
const VECTOR_RENDER_SCALE = 4;
const CINEMATIC_BREAKPOINT = "(min-width: 48rem)";
const AUTHORED_EASE = [0.16, 1, 0.3, 1] as const;
const RETURN_EASE = [0.55, 0, 0.45, 1] as const;
const DETAIL_SPACE_FRACTION = 0.4;
const STAGE_ONE_YAW = -Math.PI / 6;
const STAGE_TWO_YAW = 0.58;
const STAGE_THREE_YAW = -0.42;
const STAGE_TWO_TARGET_X = 1.22;
const STAGE_THREE_TARGET_X = -0.72;
const STAGE_ONE_RIGHT_COMPENSATION = 0.34;
const FRAGMENT_LIFT = 0.52;

type Stage = 0 | 1 | 2 | 3;

type CinematicStageState = {
  enabled: boolean;
  stage: Stage;
  stageProgress: MotionValue<number>;
  reducedMotion: boolean;
};

type HighlightStroke = {
  id: string;
  path: string;
  washPath: string;
  color: string;
};

type ProjectMarkerTarget = {
  id: string;
  label: string;
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  color: string;
  delay: number;
  seed: number;
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
    color: "#f08ea8",
  },
  {
    id: "bash-shell",
    path: "M 275 170 C 287 168.6, 309 168.7, 323 170.1",
    washPath: "M 274.8 171.6 C 290 170.3, 309 170.2, 323.5 171.3",
    color: "#e6c72d",
  },
  {
    id: "pytorch",
    path: "M 210 182.2 C 221 180.7, 238.5 181.1, 248.6 182.3",
    washPath: "M 210 183.8 C 222.4 182.6, 238 182.5, 249.2 183.7",
    color: "#9b9892",
  },
  {
    id: "claude-code",
    path: "M 344.5 194.2 C 358 192.5, 388 192.7, 400.5 194.1",
    washPath: "M 344.8 195.8 C 360 194.5, 387.8 194.3, 401 195.4",
    color: "#aaa69f",
  },
];

const PROJECT_MARKER_TARGETS: ProjectMarkerTarget[] = [
  {
    id: "silver-award",
    label: "Silver Award",
    centerX: 99,
    centerY: 451,
    width: 68,
    height: 24,
    color: "#007c78",
    delay: 0,
    seed: 181,
  },
  {
    id: "grpo",
    label: "Group Relative Policy Optimization",
    centerX: 348,
    centerY: 545,
    width: 44,
    height: 21,
    color: "#c8241e",
    delay: 0.34,
    seed: 293,
  },
  {
    id: "v-jepa",
    label: "V-JEPA",
    centerX: 68,
    centerY: 581,
    width: 55,
    height: 21,
    color: "#218c16",
    delay: 0.68,
    seed: 419,
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
  { texture: "/resume/resume-tile-top-left.png", position: [-PLATE_WIDTH / 4, PLATE_HEIGHT / 4, PLATE_DEPTH / 2 + 0.014] as const },
  { texture: "/resume/resume-tile-top-right.png", position: [PLATE_WIDTH / 4, PLATE_HEIGHT / 4, PLATE_DEPTH / 2 + 0.014] as const },
  { texture: "/resume/resume-tile-bottom-left.png", position: [-PLATE_WIDTH / 4, -PLATE_HEIGHT / 4, PLATE_DEPTH / 2 + 0.014] as const },
  { texture: "/resume/resume-tile-bottom-right.png", position: [PLATE_WIDTH / 4, -PLATE_HEIGHT / 4, PLATE_DEPTH / 2 + 0.014] as const },
];

const RESUME_CUTOUT_FACE_TILES = RESUME_FACE_TILES.map((tile) => ({
  ...tile,
  texture: tile.texture.replace("resume-tile", "resume-cutout-tile"),
}));

const CinematicStageContext = createContext<React.MutableRefObject<CinematicStageState> | null>(null);

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
                stroke={stroke.color}
                strokeWidth="15.5"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.26 : 0 }}
                transition={transition}
              />
              <motion.path
                d={stroke.path}
                fill="none"
                stroke={stroke.color}
                strokeWidth="10.8"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.34 : 0 }}
                transition={{ ...transition, delay: delay + (reducedMotion ? 0 : 0.08) }}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function RoughMarkerCircle({
  target,
  index,
  active,
  reducedMotion,
}: {
  target: ProjectMarkerTarget;
  index: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  const strokes = useMemo(() => {
    const generator = rough.generator();
    const marker = generator.ellipse(target.centerX, target.centerY, target.width, target.height, {
      seed: target.seed,
      stroke: target.color,
      strokeWidth: 2.8,
      roughness: 1.48,
      bowing: 1.72,
      curveFitting: 0.82,
      disableMultiStroke: false,
    });

    return generator.toPaths(marker);
  }, [target]);
  const exitDelay = (PROJECT_MARKER_TARGETS.length - index - 1) * 0.1;
  const delay = reducedMotion ? 0 : active ? target.delay : exitDelay;

  return (
    <g aria-label={`${target.label} marker circle`}>
      {strokes.map((stroke, strokeIndex) => (
        <g key={`${target.id}-rough-stroke-${strokeIndex}`}>
          <motion.path
            d={stroke.d}
            fill="none"
            stroke={stroke.stroke}
            strokeWidth={stroke.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{
              pathLength: active ? 1 : 0,
              opacity: active ? 0.58 : 0,
            }}
            transition={{
              duration: reducedMotion ? 0 : active ? 0.72 : 0.42,
              delay,
              ease: active ? AUTHORED_EASE : RETURN_EASE,
            }}
          />
          {!reducedMotion && active ? (
            <motion.path
              d={stroke.d}
              fill="none"
              stroke={stroke.stroke}
              strokeWidth={stroke.strokeWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0.24, pathOffset: 0, opacity: 0 }}
              animate={{ pathLength: 0.24, pathOffset: [0, 1], opacity: 0.96 }}
              transition={{
                pathOffset: {
                  duration: 2.25,
                  delay: target.delay + strokeIndex * 0.08,
                  ease: "linear",
                  repeat: Infinity,
                },
                opacity: {
                  duration: 0.2,
                  delay: target.delay,
                  ease: AUTHORED_EASE,
                },
              }}
            />
          ) : null}
        </g>
      ))}
    </g>
  );
}

function ResumeProjectMarkers({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  return (
    <svg
      className="resume-project-markers"
      viewBox="0 0 612 792"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g style={{ mixBlendMode: "multiply" }}>
        {PROJECT_MARKER_TARGETS.map((target, index) => (
          <RoughMarkerCircle
            key={target.id}
            target={target}
            index={index}
            active={active}
            reducedMotion={reducedMotion}
          />
        ))}
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
  const textures = useTexture(RESUME_CUTOUT_FACE_TILES.map((tile) => tile.texture));
  const { gl } = useThree();

  useEffect(() => {
    const maxAnisotropy = gl.capabilities.getMaxAnisotropy();
    textures.forEach((texture) => prepareTexture(texture, maxAnisotropy));
  }, [gl, textures]);

  return RESUME_FACE_TILES.map((tile, index) => (
    <mesh key={tile.texture} position={tile.position} receiveShadow>
      <planeGeometry args={[PLATE_WIDTH / 2, PLATE_HEIGHT / 2]} />
      <meshBasicMaterial
        map={textures[index]}
        toneMapped={false}
        transparent
        alphaTest={0.45}
      />
    </mesh>
  ));
}

function createPerforatedSlabGeometry() {
  const outer = new THREE.Shape();
  outer.moveTo(-PLATE_WIDTH / 2, -PLATE_HEIGHT / 2);
  outer.lineTo(PLATE_WIDTH / 2, -PLATE_HEIGHT / 2);
  outer.lineTo(PLATE_WIDTH / 2, PLATE_HEIGHT / 2);
  outer.lineTo(-PLATE_WIDTH / 2, PLATE_HEIGHT / 2);
  outer.closePath();

  RESUME_EXCAVATIONS.forEach((excavation) => {
    const insetX = (1.2 / 612) * PLATE_WIDTH;
    const insetY = (1 / 792) * PLATE_HEIGHT;
    const left = pdfXToWorld(excavation.x) - insetX;
    const right = pdfXToWorld(excavation.x + excavation.width) + insetX;
    const top = pdfYToWorld(excavation.y) + insetY;
    const bottom = pdfYToWorld(excavation.y + excavation.height) - insetY;
    const hole = new THREE.Path();

    hole.moveTo(left, bottom);
    hole.lineTo(left, top);
    hole.lineTo(right, top);
    hole.lineTo(right, bottom);
    hole.closePath();
    outer.holes.push(hole);
  });

  const geometry = new THREE.ExtrudeGeometry(outer, {
    depth: PLATE_DEPTH,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.006,
    bevelThickness: 0.006,
    curveSegments: 2,
  });
  geometry.translate(0, 0, -PLATE_DEPTH / 2);
  geometry.computeVertexNormals();
  return geometry;
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
      duration: active ? 2.25 : 0.9,
      delay: active ? excavation.delay : (0.65 - excavation.delay) * 0.2,
      ease: active ? AUTHORED_EASE : RETURN_EASE,
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
          <meshBasicMaterial map={texture} toneMapped={false} />
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
  projectsActive,
  reducedMotion,
}: {
  skillsActive: boolean;
  experienceActive: boolean;
  projectsActive: boolean;
  reducedMotion: boolean;
}) {
  const sceneGroup = useRef<THREE.Group>(null);
  const orientationGroup = useRef<THREE.Group>(null);
  const rollGroup = useRef<THREE.Group>(null);
  const cinematicStageRef = useContext(CinematicStageContext);
  const shadowTexture = useMemo(() => createFloatingShadowTexture(), []);
  const perforatedGeometry = useMemo(() => createPerforatedSlabGeometry(), []);
  const viewportTarget = useMemo(() => new THREE.Vector3(), []);
  const { viewport } = useThree();
  const scale = Math.min(1, (viewport.width - 0.28) / PLATE_WIDTH);

  if (!cinematicStageRef) {
    throw new Error("ResumeSlab must be rendered within the cinematic stage provider.");
  }

  useEffect(() => () => {
    shadowTexture.dispose();
    perforatedGeometry.dispose();
  }, [perforatedGeometry, shadowTexture]);

  useFrame((state, delta) => {
    if (!sceneGroup.current || !orientationGroup.current || !rollGroup.current) return;

    const cinematic = cinematicStageRef.current;
    const authoredStage = cinematic.reducedMotion ? cinematic.stage : cinematic.stageProgress.get();
    const stageProgress = cinematic.enabled ? THREE.MathUtils.clamp(authoredStage, 0, 1) : 0;
    const experienceProgress = cinematic.enabled ? THREE.MathUtils.clamp(authoredStage - 1, 0, 1) : 0;
    const projectsProgress = cinematic.enabled ? THREE.MathUtils.clamp(authoredStage - 2, 0, 1) : 0;
    const easing = reducedMotion || cinematic.reducedMotion ? 50 : 18;
    const stageTwoCameraTargetX = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(0, 0.62, stageProgress),
      STAGE_TWO_TARGET_X,
      experienceProgress,
    );
    const stageTwoCameraTargetY = THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(1.62, 1.1, stageProgress),
      0.5,
      experienceProgress,
    );
    const cameraTargetX = THREE.MathUtils.lerp(stageTwoCameraTargetX, STAGE_THREE_TARGET_X, projectsProgress);
    const cameraTargetY = THREE.MathUtils.lerp(stageTwoCameraTargetY, -0.78, projectsProgress);
    viewportTarget.set(cameraTargetX, cameraTargetY, 0);
    const liveViewport = state.viewport.getCurrentViewport(state.camera, viewportTarget);
    const preExperienceScale = scale * THREE.MathUtils.lerp(1.1, 1.36, stageProgress);
    const experienceFitScale = THREE.MathUtils.clamp(
      (liveViewport.width * 0.7) / (PLATE_WIDTH * Math.cos(STAGE_TWO_YAW)),
      0.82,
      1.5,
    );
    const stageTwoScale = THREE.MathUtils.lerp(preExperienceScale, experienceFitScale, experienceProgress);
    const projectsFitScale = THREE.MathUtils.clamp(
      (liveViewport.width * 0.57) / (PLATE_WIDTH * Math.cos(STAGE_THREE_YAW)),
      0.78,
      1.42,
    );
    const sceneScale = THREE.MathUtils.lerp(stageTwoScale, projectsFitScale, projectsProgress);
    const stageTwoRotation = {
      x: THREE.MathUtils.lerp(THREE.MathUtils.lerp(-0.018, -0.09, stageProgress), -0.13, experienceProgress),
      y: THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.012, STAGE_ONE_YAW, stageProgress), STAGE_TWO_YAW, experienceProgress),
      z: THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, 0.038, stageProgress), -0.028, experienceProgress),
    };
    const baseRotation = cinematic.enabled
      ? {
          x: THREE.MathUtils.lerp(stageTwoRotation.x, -0.08, projectsProgress),
          y: THREE.MathUtils.lerp(stageTwoRotation.y, STAGE_THREE_YAW, projectsProgress),
          z: THREE.MathUtils.lerp(stageTwoRotation.z, 0.018, projectsProgress),
        }
      : { x: -0.12, y: -0.32, z: 0 };

    const plateHalfWidth = (PLATE_WIDTH * sceneScale) / 2;
    const skillsSceneX = cameraTargetX
      + plateHalfWidth
      - viewport.width * (0.5 - DETAIL_SPACE_FRACTION)
      + THREE.MathUtils.lerp(0, STAGE_ONE_RIGHT_COMPENSATION, stageProgress);
    const experienceProjectedWidth = PLATE_WIDTH * sceneScale * Math.cos(STAGE_TWO_YAW);
    const experienceSceneX = cameraTargetX - liveViewport.width * 0.41 + experienceProjectedWidth / 2;
    const stageTwoSceneX = THREE.MathUtils.lerp(skillsSceneX, experienceSceneX, experienceProgress);
    const projectsProjectedWidth = PLATE_WIDTH * sceneScale * Math.cos(STAGE_THREE_YAW);
    const projectsSceneX = cameraTargetX - liveViewport.width * 0.1 + projectsProjectedWidth / 2;
    const reservedSceneX = THREE.MathUtils.lerp(stageTwoSceneX, projectsSceneX, projectsProgress);

    sceneGroup.current.position.x = THREE.MathUtils.damp(
      sceneGroup.current.position.x,
      cinematic.enabled ? reservedSceneX : 0,
      easing,
      delta,
    );
    sceneGroup.current.position.y = THREE.MathUtils.damp(
      sceneGroup.current.position.y,
      THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, -0.08, stageProgress), 0.02, experienceProgress),
        0,
        projectsProgress,
      ),
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

          <mesh geometry={perforatedGeometry} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.31}
              metalness={0}
              clearcoat={0.18}
              clearcoatRoughness={0.62}
            />
            <Edges color="#8f8e89" threshold={18} scale={1.002} transparent opacity={0.24} />
          </mesh>
          <ResumeFace />
          <ExperienceFragments active={experienceActive} reducedMotion={reducedMotion} />

          <Html
            transform
            center
            distanceFactor={10}
            position={[0, 0, PLATE_DEPTH / 2 + 0.018]}
            scale={VECTOR_DOCUMENT_SCALE / VECTOR_RENDER_SCALE}
            className="resume-vector-face"
            pointerEvents="none"
          >
            <div className="resume-vector-frame">
              <ResumeHighlights active={skillsActive} reducedMotion={reducedMotion} />
              <ResumeProjectMarkers active={projectsActive} reducedMotion={reducedMotion} />
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

function CinematicCamera({ reducedMotion }: { reducedMotion: boolean }) {
  const cinematicStageRef = useContext(CinematicStageContext);
  const lookAt = useRef(new THREE.Vector3(0, 1.62, 0));

  if (!cinematicStageRef) {
    throw new Error("CinematicCamera must be rendered within the cinematic stage provider.");
  }

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const cinematic = cinematicStageRef.current;
    const authoredStage = cinematic.reducedMotion ? cinematic.stage : cinematic.stageProgress.get();
    const stageProgress = cinematic.enabled ? THREE.MathUtils.clamp(authoredStage, 0, 1) : 0;
    const experienceProgress = cinematic.enabled ? THREE.MathUtils.clamp(authoredStage - 1, 0, 1) : 0;
    const projectsProgress = cinematic.enabled ? THREE.MathUtils.clamp(authoredStage - 2, 0, 1) : 0;
    const easing = reducedMotion || cinematic.reducedMotion ? 50 : 18;
    const stageTwoCameraPosition = {
      x: THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, -0.9, stageProgress), 1.58, experienceProgress),
      y: THREE.MathUtils.lerp(THREE.MathUtils.lerp(1.62, 1.1, stageProgress), 0.5, experienceProgress),
      z: THREE.MathUtils.lerp(THREE.MathUtils.lerp(3.15, 3.85, stageProgress), 4.55, experienceProgress),
    };
    const stageTwoCameraTarget = {
      x: THREE.MathUtils.lerp(THREE.MathUtils.lerp(0, 0.62, stageProgress), STAGE_TWO_TARGET_X, experienceProgress),
      y: THREE.MathUtils.lerp(THREE.MathUtils.lerp(1.62, 1.1, stageProgress), 0.5, experienceProgress),
    };
    const cameraPosition = cinematic.enabled
      ? {
          x: THREE.MathUtils.lerp(stageTwoCameraPosition.x, -1.02, projectsProgress),
          y: THREE.MathUtils.lerp(stageTwoCameraPosition.y, -0.78, projectsProgress),
          z: THREE.MathUtils.lerp(stageTwoCameraPosition.z, 4.72, projectsProgress),
        }
      : { x: 0, y: 0.1, z: 8.25 };
    const cameraTarget = cinematic.enabled
      ? {
          x: THREE.MathUtils.lerp(stageTwoCameraTarget.x, STAGE_THREE_TARGET_X, projectsProgress),
          y: THREE.MathUtils.lerp(stageTwoCameraTarget.y, -0.78, projectsProgress),
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
  projectsActive,
  reducedMotion,
}: {
  skillsActive: boolean;
  experienceActive: boolean;
  projectsActive: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div
      className="scene-shell"
      role="img"
      aria-label="A white vector resume slab that moves through authored viewpoints."
    >
      <Canvas
        className="scene"
        dpr={[1, 2]}
        camera={{ fov: 35, position: [0, 1.62, 3.15] }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        fallback={<WebglFallback />}
      >
        <ambientLight intensity={0.72} color="#ffffff" />
        <directionalLight
          color="#ffffff"
          intensity={2.7}
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
          <ResumeSlab
            skillsActive={skillsActive}
            experienceActive={experienceActive}
            projectsActive={projectsActive}
            reducedMotion={reducedMotion}
          />
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
                  fit="contain"
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

const PROJECT_CARDS = [
  {
    id: "quantum",
    title: "GNN Quantum Error Decoder",
    detail: "Silver Award · ISEF",
    embed: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7465787183912669184?collapsed=1",
  },
  {
    id: "cortesol",
    title: "Cortesol",
    detail: "Group Relative Policy Optimization",
    image: "/resume/project-cortesol.png",
  },
  {
    id: "vjepa",
    title: "Multimodal Conversational Agent",
    detail: "V-JEPA world model",
    image: "/resume/project-vjepa.png",
  },
] as const;

function ProjectCardStack({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  return (
    <AnimatePresence initial={false}>
      {active ? (
        <motion.aside
          className="project-card-stack"
          aria-label="Project details"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.28, ease: AUTHORED_EASE }}
        >
          {PROJECT_CARDS.map((project, index) => (
            <motion.figure
              key={project.id}
              className="project-card"
              initial={reducedMotion ? false : { opacity: 0, x: -24, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
              exit={{ opacity: 0, x: -14, clipPath: "inset(0 100% 0 0)" }}
              transition={{
                duration: reducedMotion ? 0 : 0.82,
                delay: reducedMotion ? 0 : 0.18 + index * 0.2,
                ease: AUTHORED_EASE,
              }}
            >
              <div
                className={`project-card-image${project.id === "quantum" ? " project-card-image--embed" : ""}`}
                aria-hidden={project.id === "quantum" ? undefined : true}
              >
                {project.id === "quantum" ? (
                  <iframe
                    src={project.embed}
                    title="Kuan Yi Wang's GNN Quantum Error Decoder LinkedIn post"
                    loading="lazy"
                    allowFullScreen
                  />
                ) : (
                  <ImageDithering
                    className="project-card-shader"
                    image={project.image}
                    colorBack="#ebe5da"
                    colorFront="#282521"
                    colorHighlight="#797166"
                    originalColors={false}
                    type="8x8"
                    size={0.72}
                    colorSteps={3}
                    fit="cover"
                    speed={0}
                    minPixelRatio={1}
                    maxPixelCount={120000}
                  />
                )}
              </div>
              <figcaption>
                <strong>{project.title}</strong>
                <span>{project.detail}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function DitherBackdrop() {
  return (
    <div className="dither-backdrop" aria-hidden="true">
      <ImageDithering
        className="dither-backdrop-shader"
        image="/resume/spinal-mri-sagittal.jpg"
        colorBack="#d9d1c5"
        colorFront="#242321"
        colorHighlight="#756d61"
        originalColors={false}
        type="8x8"
        size={0.72}
        colorSteps={4}
        fit="cover"
        offsetX={0.04}
        offsetY={-0.03}
        speed={0}
        minPixelRatio={1}
        maxPixelCount={1100000}
      />
      <div className="dither-backdrop-veil" />
    </div>
  );
}

function ArrowIcon({ direction }: { direction: "up" | "down" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direction === "up" ? "M5 14.5 12 7.5l7 7" : "M5 9.5l7 7 7-7"} />
    </svg>
  );
}

function StageDock({
  stage,
  navigate,
  reducedMotion,
}: {
  stage: Stage;
  navigate: (direction: -1 | 1) => void;
  reducedMotion: boolean;
}) {
  return (
    <motion.footer
      className="stage-dock"
      aria-label="Resume navigation"
      initial={false}
      animate={{ height: stage === 0 ? "50dvh" : "5.75rem" }}
      transition={{ duration: reducedMotion ? 0 : 0.74, ease: AUTHORED_EASE }}
    >
      <div className="stage-dock-bar">
        <p>Use the up and down arrows to view.</p>
        <nav aria-label="Move between resume sections">
          <button type="button" onClick={() => navigate(-1)} disabled={stage === 0} aria-label="Previous resume section">
            <ArrowIcon direction="up" />
          </button>
          <span aria-live="polite">{String(stage + 1).padStart(2, "0")} / 04</span>
          <button type="button" onClick={() => navigate(1)} disabled={stage === 3} aria-label="Next resume section">
            <ArrowIcon direction="down" />
          </button>
        </nav>
      </div>
    </motion.footer>
  );
}

function MobileResume() {
  return (
    <main className="mobile-resume">
      <header>
        <p>Portfolio / résumé</p>
        <h1>Kuan Yi Wang</h1>
        <a href="/resume/kuan-yi-wang-resume.pdf" target="_blank" rel="noreferrer">Open PDF</a>
      </header>
      <section aria-label="Resume preview">
        <Image src="/resume/kuan-yi-wang-resume.svg" alt="Kuan Yi Wang résumé" width={612} height={792} unoptimized />
      </section>
    </main>
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
  const stageTarget = useMotionValue(0);
  const stageProgress = useSpring(stageTarget, {
    stiffness: 96,
    damping: 22,
    mass: 0.82,
    restDelta: 0.0005,
  });
  const [stage, setStage] = useState<Stage>(0);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const cinematicStageRef = useRef<CinematicStageState>({
    enabled: true,
    stage: 0,
    stageProgress,
    reducedMotion: false,
  });
  const navigate = useCallback((direction: -1 | 1) => {
    setStage((current) => THREE.MathUtils.clamp(current + direction, 0, 3) as Stage);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia(CINEMATIC_BREAKPOINT);
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMedia = () => {
      const desktopMatches = desktop.matches;
      const reducedMotionMatches = reducedMotionMedia.matches;

      setIsDesktop(desktopMatches);
      setReducedMotion(reducedMotionMatches);
      cinematicStageRef.current.enabled = desktopMatches;
      cinematicStageRef.current.reducedMotion = reducedMotionMatches;
    };

    updateMedia();
    desktop.addEventListener("change", updateMedia);
    reducedMotionMedia.addEventListener("change", updateMedia);

    return () => {
      desktop.removeEventListener("change", updateMedia);
      reducedMotionMedia.removeEventListener("change", updateMedia);
    };
  }, []);

  useEffect(() => {
    cinematicStageRef.current.stage = stage;
    stageTarget.set(stage);
  }, [stage, stageTarget]);

  useEffect(() => {
    if (!isDesktop) return;

    const preventScroll = (event: WheelEvent | TouchEvent) => event.preventDefault();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (event.repeat) return;
      event.preventDefault();
      navigate(event.key === "ArrowDown" ? 1 : -1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "instant" });
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDesktop, navigate]);

  if (isDesktop === null) {
    return <div className="resume-loading" aria-hidden="true" />;
  }

  if (!isDesktop) {
    return <MobileResume />;
  }

  const skillsActive = stage === 1;
  const experienceActive = stage === 2;
  const projectsActive = stage === 3;

  return (
    <main className="portfolio">
      <noscript>
        <p>
          Your browser needs JavaScript to display the three-dimensional resume. <a href="/resume/kuan-yi-wang-resume.pdf">Open the PDF.</a>
        </p>
      </noscript>
      <CinematicStageContext.Provider value={cinematicStageRef}>
        <div className="portfolio-stage">
          <DitherBackdrop />
          <a
            className="dither-credit"
            href="https://nccommons.org/wiki/File:Normal_cervical_spine_MRI_%28Radiopaedia_80146-93454_Sagittal_T2_8%29.jpg"
            target="_blank"
            rel="noreferrer"
          >
            MRI: Ian Bickle · CC BY-NC-SA 3.0
          </a>
          <SceneErrorBoundary>
            <Scene
              skillsActive={skillsActive}
              experienceActive={experienceActive}
              projectsActive={projectsActive}
              reducedMotion={reducedMotion}
            />
          </SceneErrorBoundary>
          <CoordinateGuide />
          <DitherDetailCard
            active={skillsActive}
            sequence={1}
            reducedMotion={reducedMotion}
            variant="skills"
          />
          <DitherDetailCard
            active={experienceActive}
            sequence={2}
            reducedMotion={reducedMotion}
            variant="experience"
          />
          <ProjectCardStack active={projectsActive} reducedMotion={reducedMotion} />
          <StageDock stage={stage} navigate={navigate} reducedMotion={reducedMotion} />
        </div>
      </CinematicStageContext.Provider>
    </main>
  );
}
