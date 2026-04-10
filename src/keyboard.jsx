import React, { useRef } from 'react' // Add useRef
import { useGLTF, Center } from '@react-three/drei'
import { useFrame } from '@react-three/fiber' // Add useFrame

export function Keyboard({ config, isSpinning, ...props }) { // Add isSpinning to props
  const { nodes } = useGLTF('/vortexkeyboard.glb')
  const groupRef = useRef()

  // This runs 60 times per second
  useFrame((state, delta) => {
    if (isSpinning && groupRef.current) {
      groupRef.current.rotation.y += delta * 1.5; // Rotate at a nice speed
    }
  })

  return (
    < group ref={groupRef} {...props} dispose={null} >

      < Center >

        < group position={[-0.018, 0.074, 0.11]} rotation={[0.024, 0, 0]} scale={[0.318, 0.075, 0.137]} >

          {/* Accent Keys */}
          < group position={[-0.143, -0.567, 0.718]} scale={[0.104, 0.439, 0.241]} >
            <mesh geometry={nodes.Object_5.geometry}><meshStandardMaterial color={config.accentKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_8.geometry}><meshStandardMaterial color={config.accentKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_11.geometry}><meshStandardMaterial color={config.accentKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_12.geometry}><meshStandardMaterial color={config.accentKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_14.geometry}><meshStandardMaterial color={config.accentKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_15.geometry}><meshStandardMaterial color={config.accentKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_16.geometry}><meshStandardMaterial color={config.accentKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_19.geometry}><meshStandardMaterial color={config.accentKeycapColor} /></mesh>

            {/* Primary Keys */}
            <mesh geometry={nodes.Object_6.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_7.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_9.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_10.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_13.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_17.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_18.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_20.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_21.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
            <mesh geometry={nodes.Object_22.geometry}><meshStandardMaterial color={config.primaryKeycapColor} /></mesh>
          </group >

          {/* The Case & Plate */}
          < mesh geometry={nodes.Object_24.geometry} position={[0.778, -1.016, -0.785]} rotation={[-0.028, 0, 0]} scale={[3.149, 13.351, 7.317]} >
            <meshStandardMaterial
              color={config.caseColor}
              roughness={config.roughness !== undefined ? config.roughness : 0.5}
              metalness={config.metalness !== undefined ? config.metalness : 0.1}
            />
          </mesh >
          <mesh geometry={nodes.Object_28.geometry} position={[-0.571, -0.58, 0.014]} rotation={[0.039, 0, 0]} scale={[3.149, 13.349, 7.322]}>
            <meshStandardMaterial
              color={config.caseColor}
              roughness={config.roughness !== undefined ? config.roughness : 0.5}
              metalness={config.metalness !== undefined ? config.metalness : 0.1}
            />
          </mesh>
          <mesh geometry={nodes.Object_30.geometry} position={[0.008, -0.95, -0.01]} rotation={[-0.005, 0, 0]} scale={[3.149, 13.354, 7.312]}>
            <meshStandardMaterial
              color={config.caseColor}
              roughness={config.roughness !== undefined ? config.roughness : 0.5}
              metalness={config.metalness !== undefined ? config.metalness : 0.1}
            />
          </mesh>
          <mesh geometry={nodes.Object_32.geometry} position={[-0.724, -1.008, 0.795]} rotation={[-0.005, 0, 0]} scale={[3.149, 13.354, 7.312]}>
            <meshStandardMaterial
              color={config.caseColor}
              roughness={config.roughness !== undefined ? config.roughness : 0.5}
              metalness={config.metalness !== undefined ? config.metalness : 0.1}
            />
          </mesh>
          <mesh geometry={nodes.Object_34.geometry} position={[-0.881, -1.05, -0.624]} rotation={[0.015, 0, 0]} scale={[3.149, 13.353, 7.314]}>
            <meshStandardMaterial
              color={config.caseColor}
              roughness={config.roughness !== undefined ? config.roughness : 0.5}
              metalness={config.metalness !== undefined ? config.metalness : 0.1}
            />
          </mesh>
          <mesh geometry={nodes.Object_36.geometry} position={[0.01, -0.595, 0.039]} rotation={[-0.021, 0, 0]} scale={[3.149, 13.352, 7.315]}>
            <meshStandardMaterial color="#111111" roughness={0.6} metalness={0.5} />
          </mesh>

          {/* The Knob */}
          <mesh geometry={nodes.Object_26.geometry} position={[0.854, -0.383, -0.669]} rotation={[0.059, 0, 0]} scale={[3.116, 13.472, 7.256]}>
            <meshStandardMaterial color={config.knobColor} roughness={0.2} metalness={0.8} />
          </mesh>

        </group >
      </Center >
    </group >
  )
}

useGLTF.preload('/vortexkeyboard.glb')