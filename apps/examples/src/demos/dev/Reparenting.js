import React, { useState, useEffect, useCallback } from 'react'
import { Canvas, useResource, createPortal } from '@react-three/core'

function Icosahedron() {
  const [active, set] = useState(false)
  const handleClick = useCallback((e) => set((state) => !state), [])
  return (
    <mesh scale={active ? [2, 2, 2] : [1, 1, 1]} onClick={handleClick}>
      <icosahedronBufferGeometry attach="geometry" args={[1, 0]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

function RenderToPortal({ targets }) {
  const [target, set] = useState(targets[0])
  useEffect(() => void setTimeout(() => set(targets[1]), 1000), [targets])
  return (
    <>
      <mesh position={[-2, 0, 0]}>
        <sphereBufferGeometry attach="geometry" args={[0.5, 16, 16]} />
        <meshNormalMaterial attach="material" />
      </mesh>
      {createPortal(<Icosahedron />, target)}
    </>
  )
}

function Group() {
  const ref1 = useResource()
  const ref2 = useResource()
  return (
    <group>
      <group ref={ref1} position={[0, 0, 0]} />
      <group ref={ref2} position={[2, 0, 0]} />
      {ref1.current && ref2.current && <RenderToPortal targets={[ref1.current, ref2.current]} />}
    </group>
  )
}

export default function App() {
  return (
    <Canvas>
      <Group />
    </Canvas>
  )
}
