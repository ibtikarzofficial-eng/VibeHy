import React, { useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stage, ContactShadows } from '@react-three/drei'
import { Keyboard } from './keyboard'
import gsap from 'gsap'
import * as THREE from 'three'
import './index.css'

// Fixes the camera animation
function CameraDirector({ targetPosition }) {
  useFrame((state) => {
    state.camera.position.lerp(targetPosition, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [isVibing, setIsVibing] = useState(false);
  const [activeTab, setActiveTab] = useState("ai");

  // Camera State
  const [camView, setCamView] = useState("isometric");
  const camPositions = {
    isometric: new THREE.Vector3(0, 1.2, 3.5),
    top: new THREE.Vector3(0, 3.5, 0.01),
    front: new THREE.Vector3(0, 0.2, 3.5)
  };

  // State
  const [vibeState, setVibeState] = useState({
    caseColor: '#3a3a3c',
    primaryKeycapColor: '#1c1c1e',
    accentKeycapColor: '#0071e3',
    knobColor: '#d1d1d6',
    roughness: 0.5,
    metalness: 0.1
  });

  useEffect(() => {
    gsap.from(".sidebar", { x: -50, opacity: 0, duration: 1, ease: "power3.out" });
  }, [])

  const handleVibeChange = async () => {
    if (!prompt) return;
    setIsVibing(true);
    setCamView("isometric");

    try {
      const response = await fetch('http://localhost:8080/api/vibe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      setVibeState(prev => ({ ...prev, ...data }));
    } catch (e) {
      console.error(e);
      alert("Backend not connected! Run npm start in backend.");
    } finally {
      setIsVibing(false);
    }
  }

  const updateVibe = (key, value) => {
    setVibeState(prev => ({ ...prev, [key]: value }));
  }

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#fbfbfd' }}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1>IbtikarZ</h1>
          <div className="subtitle">Pro Configurator v2</div>
        </div>

        <div className="tab-container">
          <div className={`tab ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => setActiveTab('ai')}>AI Architect</div>
          <div className={`tab ${activeTab === 'manual' ? 'active' : ''}`} onClick={() => setActiveTab('manual')}>Manual Override</div>
        </div>

        <div className="sidebar-content">
          {activeTab === 'ai' ? (
            <div>
              <label className="input-label">Describe the Vision</label>
              <textarea
                className="prompt-box"
                placeholder="e.g., 'Cyberpunk neon lights' or 'Minimalist clay finish'..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
              />
              <button className="generate-btn" onClick={handleVibeChange} disabled={isVibing}>
                {isVibing ? "Designing..." : "Generate Concept"}
              </button>
            </div>
          ) : (
            <div>
              <div className="control-group">
                <label className="input-label">Colors</label>
                <div className="color-picker-row">
                  <span className="color-label">Chassis</span>
                  <input type="color" value={vibeState.caseColor} onChange={(e) => updateVibe('caseColor', e.target.value)} />
                </div>
                <div className="color-picker-row">
                  <span className="color-label">Primary Keys</span>
                  <input type="color" value={vibeState.primaryKeycapColor} onChange={(e) => updateVibe('primaryKeycapColor', e.target.value)} />
                </div>
                <div className="color-picker-row">
                  <span className="color-label">Accent Keys</span>
                  <input type="color" value={vibeState.accentKeycapColor} onChange={(e) => updateVibe('accentKeycapColor', e.target.value)} />
                </div>
                <div className="color-picker-row">
                  <span className="color-label">Knob Finish</span>
                  <input type="color" value={vibeState.knobColor} onChange={(e) => updateVibe('knobColor', e.target.value)} />
                </div>
              </div>

              <div className="control-group">
                <label className="input-label">Custom Image Skin (Chassis)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      updateVibe('textureUrl', URL.createObjectURL(file));
                    }
                  }} 
                  style={{marginBottom: '10px'}}
                />
                {vibeState.textureUrl && (
                  <button className="cam-btn" onClick={() => updateVibe('textureUrl', null)}>
                    Remove Image
                  </button>
                )}
              </div>

              <div className="control-group">
                <label className="input-label">Material Physics (Case)</label>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span className="color-label" style={{ fontSize: '12px' }}>Glossy</span>
                    <span className="color-label" style={{ fontSize: '12px' }}>Matte</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.05" value={vibeState.roughness} onChange={(e) => updateVibe('roughness', parseFloat(e.target.value))} />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span className="color-label" style={{ fontSize: '12px' }}>Plastic</span>
                    <span className="color-label" style={{ fontSize: '12px' }}>Metallic</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.05" value={vibeState.metalness} onChange={(e) => updateVibe('metalness', parseFloat(e.target.value))} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* VIEWPORT */}
      <div className="viewport">
        {/* THIS WAS THE FIX: Re-adding the camera props here. FOV halved for 2x Zoom */}
        <Canvas shadows camera={{ position: [0, 0, 0], fov: 17.5 }}>
          <CameraDirector targetPosition={camPositions[camView]} />

          <Suspense fallback={null}>
            <Stage intensity={0.6} environment="city" adjustCamera={false} shadows={false}>
              <Keyboard config={vibeState} />
            </Stage>
            <ContactShadows position={[0, -0.6, 0]} opacity={0.5} scale={15} blur={2.5} far={4} />
          </Suspense>

          <OrbitControls makeDefault enableDamping dampingFactor={0.05} maxPolarAngle={Math.PI / 2} />
        </Canvas>

        {/* Camera Controls */}
        <div className="camera-controls">
          <button className={`cam-btn ${camView === 'isometric' ? 'active' : ''}`} onClick={() => setCamView('isometric')}>Isometric</button>
          <button className={`cam-btn ${camView === 'top' ? 'active' : ''}`} onClick={() => setCamView('top')}>Top Down</button>
          <button className={`cam-btn ${camView === 'front' ? 'active' : ''}`} onClick={() => setCamView('front')}>Front</button>
        </div>
      </div>
    </div>
  )
}