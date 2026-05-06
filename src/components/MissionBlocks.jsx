import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text, ContactShadows } from '@react-three/drei'
import { MathUtils } from 'three'

const BLOCKS = [
  {
    color: '#F7941D',
    letter: 'E',
    title: 'Education & Health',
    body: 'Champion access to quality learning, tutoring, and programs — raising funds for mental wellness so every child grows safe, supported, and ready to learn.',
  },
  {
    color: '#0099D6',
    letter: 'C',
    title: 'Community Impact',
    body: 'Working alongside GTA organizations, families, and volunteers to create lasting, meaningful change in the neighbourhoods where children live and grow.',
  },
  {
    color: '#39B54A',
    letter: 'R',
    title: 'Raising Awareness',
    body: "Organizing events that advocate for children's rights, bringing communities together — giving every child a fair and equal chance.",
  },
]

function Block({ card, xPos, dropDelay }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const activeRef = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => { activeRef.current = true }, dropDelay)
    return () => clearTimeout(t)
  }, [dropDelay])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const target = activeRef.current ? (hovered ? 0.55 : 0) : 9
    groupRef.current.position.y = MathUtils.damp(
      groupRef.current.position.y,
      target,
      14,
      delta
    )
  })

  return (
    <group
      ref={groupRef}
      position={[xPos, 9, 0]}
      rotation={[0.10, -0.22, 0]}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Square block body */}
      <RoundedBox args={[2.6, 2.6, 2.2]} radius={0.13} smoothness={5}>
        <meshStandardMaterial color={card.color} roughness={0.34} metalness={0.07} />
      </RoundedBox>

      {/* Front face inset */}
      <mesh position={[0, 0, 1.12]}>
        <planeGeometry args={[2.18, 2.18]} />
        <meshStandardMaterial color="#FFF9F2" roughness={0.72} />
      </mesh>

      {/* Letter */}
      <Text
        position={[0, 0.68, 1.20]}
        fontSize={0.62}
        color={card.color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        fontWeight={700}
      >
        {card.letter}
      </Text>

      {/* Divider */}
      <mesh position={[0, 0.26, 1.15]}>
        <planeGeometry args={[1.7, 0.025]} />
        <meshBasicMaterial color={card.color} opacity={0.35} transparent />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 0.10, 1.20]}
        fontSize={0.210}
        color="#1A3A6B"
        anchorX="center"
        anchorY="top"
        maxWidth={1.95}
        textAlign="center"
        lineHeight={1.25}
        fontWeight={700}
      >
        {card.title}
      </Text>

      {/* Body */}
      <Text
        position={[0, -0.38, 1.20]}
        fontSize={0.138}
        color="#444"
        anchorX="center"
        anchorY="top"
        maxWidth={1.95}
        textAlign="center"
        lineHeight={1.6}
      >
        {card.body}
      </Text>
    </group>
  )
}

export default function MissionBlocks() {
  return (
    <Canvas camera={{ position: [0, 0.25, 3.8], fov: 66 }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 12, 7]} intensity={1.5} castShadow />
      <directionalLight position={[-4, 6, 5]} intensity={0.4} color="#ffe8cc" />

      <Block card={BLOCKS[0]} xPos={-2.85} dropDelay={0} />
      <Block card={BLOCKS[1]} xPos={0} dropDelay={210} />
      <Block card={BLOCKS[2]} xPos={2.85} dropDelay={420} />

      <ContactShadows position={[0, -1.42, 0]} opacity={0.3} scale={16} blur={2.5} far={4} />
    </Canvas>
  )
}
