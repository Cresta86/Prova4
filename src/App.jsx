import React, { useState, useRef, useEffect } from 'react';

// --- ICONE NATIVE SVG ---
const IconSettings = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const IconAlert = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
);
const IconCheck = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
);

// --- DATABASE PROFILI COSTANTI ---
const profiles = {
  'ang_60x60x4': { id: 'ang_60x60x4', name: 'Angolare 60x60x4', Wx: 3.65, Ix: 15.3, Area: 4.64 },
  'ang_60x60x5': { id: 'ang_60x60x5', name: 'Angolare 60x60x5', Wx: 4.50, Ix: 18.7, Area: 5.75 },
  'ang_60x60x6': { id: 'ang_60x60x6', name: 'Angolare 60x60x6', Wx: 5.30, Ix: 22.8, Area: 6.91 },
  'ang_80x80x4': { id: 'ang_80x80x4', name: 'Angolare 80x80x4', Wx: 7.04, Ix: 39.4, Area: 6.24 },
  'ang_80x80x5': { id: 'ang_80x80x5', name: 'Angolare 80x80x5', Wx: 8.75, Ix: 48.6, Area: 7.75 },
  'ang_80x80x6': { id: 'ang_80x80x6', name: 'Angolare 80x80x6', Wx: 10.40, Ix: 57.5, Area: 9.24 },
  'ang_100x100x10': { id: 'ang_100x100x10', name: 'Angolare 100x100x10', Wx: 24.60, Ix: 177.0, Area: 19.20 },
  'tub_60x40x3': { id: 'tub_60x40x3', name: 'Tubolare 60x40x3 (Vert)', Wx: 13.50, Ix: 40.5, Area: 5.50 },
  'tub_80x40x3': { id: 'tub_80x40x3', name: 'Tubolare 80x40x3 (Vert)', Wx: 22.00, Ix: 88.0, Area: 6.70 },
  'tub_100x50x3': { id: 'tub_100x50x3', name: 'Tubolare 100x50x3 (Vert)', Wx: 26.50, Ix: 132.0, Area: 8.50 }
};

// --- COMPONENTE MENU A TENDINA ---
const ProfileSelect = ({ label, parts, value, onChange, capacity, isBottleneck, totalArea }) => {
  const capVal = Number(capacity) || 0;
  const areaVal = Number(totalArea) || 0;
  const rawKg = capVal * 0.85 * areaVal;
  const pezzoMaxKg = isNaN(rawKg) ? 0 : Math.round(rawKg);
  
  const isUnloaded = capVal > 900000;
  const displayKg = isUnloaded ? "Nessun Carico" : `${pezzoMaxKg.toLocaleString('it-IT')} kg`;
  
  return (
    <div className={`p-4 rounded-2xl border transition-all duration-300 ${isBottleneck ? 'bg-rose-500/10 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]' : 'bg-zinc-900/50 border-white/5 hover:border-white/10'}`}>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-semibold text-zinc-200">{label}</label>
        <span className="text-[10px] text-zinc-500 font-mono font-bold tracking-wider uppercase">Rif: {parts}</span>
      </div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-2.5 border border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm bg-zinc-950 text-zinc-200 font-medium outline-none transition-all">
        {Object.keys(profiles).map(k => (<option key={k} value={k}>{profiles[k].name}</option>))}
      </select>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider">Portata Isolata:</div>
        <div className={`text-sm font-bold ${isBottleneck ? 'text-rose-400' : (isUnloaded ? 'text-zinc-600 italic' : 'text-indigo-300')}`}>
          {displayKg}
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE BOTTONE GAMBA ---
const LegToggle = ({ id, active, onToggle }) => (
  <button
    onClick={() => onToggle(id)}
    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 border ${
      active 
        ? 'bg-indigo-600 text-white border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)]' 
        : 'bg-zinc-900/50 text-zinc-500 border-white/5 hover:border-white/20 hover:text-zinc-300'
    }`}
    title={`Gamba ${id}`}
  >
    {id}
  </button>
);

// --- APP PRINCIPALE ---
const CalculatorApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('iso');
  const [rotZ, setRotZ] = useState(-45);
  const [rotX, setRotX] = useState(60);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const [dimX, setDimX] = useState("2000");
  const [dimY, setDimY] = useState("1000");
  const [height, setHeight] = useState("1000");
  const [gammaM, setGammaM] = useState("1.05");

  const [coveringType, setCoveringType] = useState('lamiera');
  const [covDim, setCovDim] = useState("5");
  const [deckDir, setDeckDir] = useState('min'); 
  
  const [prof1, setProf1] = useState('ang_60x60x4');
  const [prof2, setProf2] = useState('ang_60x60x4');
  const [prof3, setProf3] = useState('ang_60x60x4');
  const [prof4, setProf4] = useState('ang_60x60x4');
  const [prof5, setProf5] = useState('ang_60x60x4');
  const [prof6, setProf6] = useState('ang_60x60x4');
  const [prof7, setProf7] = useState('ang_60x60x4');
  const [prof8, setProf8] = useState('ang_60x60x4');
  const [profLegs, setProfLegs] = useState('ang_60x60x4');

  const [activeLegs, setActiveLegs] = useState(['A', 'C', 'D', 'E', 'F']);
  const [activeBeams, setActiveBeams] = useState([]);

  const toggleLeg = (legId) => setActiveLegs(prev => prev.includes(legId) ? prev.filter(l => l !== legId) : [...prev, legId]);
  const toggleBeam = (beamId) => setActiveBeams(prev => prev.includes(beamId) ? prev.filter(b => b !== beamId) : [...prev, beamId]);

  const has5 = activeBeams.includes('5');
  const has6 = activeBeams.includes('6');
  const has7 = activeBeams.includes('7');
  const has8 = activeBeams.includes('8');

  const handleCoveringChange = (e) => {
    const type = e.target.value;
    setCoveringType(type);
    if (type === 'lamiera') setCovDim("5");
  };

  const safeX = Math.max(parseFloat(dimX) || 10, 10);
  const safeY = Math.max(parseFloat(dimY) || 10, 10);
  const safeH = Math.max(parseFloat(height) || 10, 10);
  const safeCov = Math.max(parseFloat(covDim) || 1, 1);
  const safeGammaM = Math.max(parseFloat(gammaM) || 1.0, 1.0); 

  const fy = 235; 
  const E = 210000; 
  const sigmaAmm = fy / safeGammaM; 

  const totalAreaM2 = (safeX * safeY) / 1000000;

  const x_supports = [0, safeX];
  if (has7) x_supports.push(safeX * 0.25);
  if (has6) x_supports.push(safeX * 0.5);
  if (has8) x_supports.push(safeX * 0.75);
  x_supports.sort((a, b) => a - b);

  let spanX_plate = 0;
  for (let i = 1; i < x_supports.length; i++) {
    spanX_plate = Math.max(spanX_plate, x_supports[i] - x_supports[i - 1]);
  }

  const spanY_plate = has5 ? safeY / 2 : safeY;
  const luceMin = Math.min(spanX_plate, spanY_plate);

  let actualDir = 'min';
  let span1D = luceMin;
  
  if (deckDir === 'min') {
    actualDir = spanX_plate <= spanY_plate ? 'x' : 'y';
    span1D = Math.min(spanX_plate, spanY_plate);
  } else {
    actualDir = deckDir;
    span1D = deckDir === 'x' ? spanX_plate : spanY_plate;
  }

  let pesoCoperturaM2 = 0;
  if (coveringType === 'lamiera') {
    pesoCoperturaM2 = safeCov * 7.85; 
  } else if (coveringType === 'grigliato') {
    pesoCoperturaM2 = 24.5; 
  } else if (coveringType === 'doga_a') {
    pesoCoperturaM2 = 96.0; 
  } else if (coveringType === 'doga_b') {
    pesoCoperturaM2 = 100.0; 
  } else if (coveringType === 'doga_comm') {
    pesoCoperturaM2 = 38.5; 
  }
  const pesoTotaleCopertura = pesoCoperturaM2 * totalAreaM2;

  const getProfileWeight = (profKey, lengthMm) => {
    const areaCm2 = profiles[profKey]?.Area || 0;
    return areaCm2 * 0.785 * (lengthMm / 1000); 
  };

  const pesoTraversiX = getProfileWeight(prof1, safeX) + getProfileWeight(prof3, safeX) + (has5 ? getProfileWeight(prof5, safeX) : 0);
  const pesoTraversiY = getProfileWeight(prof2, safeY) + getProfileWeight(prof4, safeY) + 
                        (has6 ? getProfileWeight(prof6, safeY) : 0) +
                        (has7 ? getProfileWeight(prof7, safeY) : 0) +
                        (has8 ? getProfileWeight(prof8, safeY) : 0);
  const pesoGambe = getProfileWeight(profLegs, safeH) * activeLegs.length;
  
  const pesoTotaleStruttura = pesoTraversiX + pesoTraversiY + pesoGambe;
  const pesoTotaleComplessivo = pesoTotaleCopertura + pesoTotaleStruttura;

  let capPlateKgM2 = 0;
  let coveringName = "";

  if (coveringType === 'lamiera') {
    coveringName = `Lamiera Piastra (${safeCov}mm)`;
    const ratio = Math.max(spanX_plate, spanY_plate) / luceMin;
    let alpha = 0.01; let gamma = 0.10; 
    if (ratio > 2) { alpha = 0.013; gamma = 0.125; }
    else if (ratio < 1.2) { alpha = 0.005; gamma = 0.06; }
    
    const D = (E * Math.pow(safeCov, 3)) / (12 * (1 - Math.pow(0.3, 2)));
    const deflAmm = luceMin / 300;
    const qPlateFrecciaMpa = (deflAmm * D) / (alpha * Math.pow(luceMin, 4)); 
    const Wplate = Math.pow(safeCov, 2) / 6;
    const qPlateSnervMpa = (sigmaAmm * Wplate) / (gamma * Math.pow(luceMin, 2));
    capPlateKgM2 = Math.min(qPlateFrecciaMpa, qPlateSnervMpa) * (1000000 / 9.81);

  } else if (coveringType === 'grigliato') {
    const hGrigliato = 30; 
    const dirName = deckDir === 'min' ? 'Ottimale' : (deckDir === 'x' ? 'Parall. X' : 'Parall. Y');
    coveringName = `Grigliato 34x76 (${dirName})`;
    const tp = 3; 
    const passo_portante = 34; 
    
    const Imm = (tp * Math.pow(hGrigliato, 3) / 12) / passo_portante;
    const Wmm = (tp * Math.pow(hGrigliato, 2) / 6) / passo_portante;
    
    const deflAmm_g = span1D / 300;
    const qFrecciaMpa = (384 * E * Imm * deflAmm_g) / (5 * Math.pow(span1D, 4)); 
    const qSnervMpa = (8 * sigmaAmm * Wmm) / Math.pow(span1D, 2);
    capPlateKgM2 = Math.min(qFrecciaMpa, qSnervMpa) * (1000000 / 9.81);
    
    const maxCapGrigliato = 600;
    capPlateKgM2 = Math.min(capPlateKgM2, maxCapGrigliato);

  } else if (coveringType.startsWith('doga')) {
    let w = 250, h_doga = 55, th = 2, maxCap = null;
    const dirName = deckDir === 'min' ? 'Ottimale' : (deckDir === 'x' ? 'Parall. X' : 'Parall. Y');
    
    if (coveringType === 'doga_a') {
        w = 250; th = 5;
        coveringName = `Doga Tipo A 250x55x5 (${dirName})`;
    } else if (coveringType === 'doga_b') {
        w = 200; th = 5;
        coveringName = `Doga Tipo B 200x55x5 (${dirName})`;
    } else if (coveringType === 'doga_comm') {
        w = 250; th = 2; maxCap = 509.68; 
        coveringName = `Doga Comm. 250x55x2 (${dirName})`;
    }

    const h_int = Math.max(h_doga - 2 * th, 1);
    const w_int = Math.max(w - 2 * th, 1);
    
    const I_doga = (w * Math.pow(h_doga, 3) / 12) - (w_int * Math.pow(h_int, 3) / 12);
    const W_doga = I_doga / (h_doga / 2); 
    
    const deflAmm_d = span1D / 300;
    const qLinFreccia = (384 * E * I_doga * deflAmm_d) / (5 * Math.pow(span1D, 4));
    const qLinSnervamento = (8 * sigmaAmm * W_doga) / Math.pow(span1D, 2);
    const qLinAmm_doga = Math.min(qLinFreccia, qLinSnervamento); 
    
    const qAreaMpa = qLinAmm_doga / w;
    capPlateKgM2 = qAreaMpa * (1000000 / 9.81);
    
    if (maxCap !== null) {
        capPlateKgM2 = Math.min(capPlateKgM2, maxCap); 
    }
  }

  let trib1=0, trib2=0, trib3=0, trib4=0, trib5=0, trib6=0, trib7=0, trib8=0;

  if (coveringType === 'lamiera') {
    const L_long = Math.max(spanX_plate, spanY_plate);
    const L_short = Math.min(spanX_plate, spanY_plate);
    const trib_edge_long = (L_short / 2) * (1 - Math.pow(L_short / L_long, 2) / 3);
    const trib_edge_short = L_short / 3;

    let trib_X_dir_beam, trib_Y_dir_beam;
    if (spanX_plate >= spanY_plate) {
        trib_X_dir_beam = trib_edge_long;
        trib_Y_dir_beam = trib_edge_short;
    } else {
        trib_X_dir_beam = trib_edge_short;
        trib_Y_dir_beam = trib_edge_long;
    }

    trib1 = trib_X_dir_beam;
    trib3 = trib_X_dir_beam;
    trib5 = has5 ? trib_X_dir_beam * 2 : 0;

    trib4 = trib_Y_dir_beam;
    trib2 = trib_Y_dir_beam;
    trib6 = has6 ? trib_Y_dir_beam * 2 : 0;
    trib7 = has7 ? trib_Y_dir_beam * 2 : 0;
    trib8 = has8 ? trib_Y_dir_beam * 2 : 0;
  } else {
    const getTribX = (x) => {
        if (!x_supports.includes(x)) return 0;
        const idx = x_supports.indexOf(x);
        const left = idx > 0 ? x - x_supports[idx-1] : 0;
        const right = idx < x_supports.length - 1 ? x_supports[idx+1] - x : 0;
        return (left + right) / 2;
    };

    if (actualDir === 'x') {
        trib4 = getTribX(0);
        trib7 = has7 ? getTribX(safeX * 0.25) : 0;
        trib6 = has6 ? getTribX(safeX * 0.5) : 0;
        trib8 = has8 ? getTribX(safeX * 0.75) : 0;
        trib2 = getTribX(safeX);
    } else {
        const span_between_x = has5 ? safeY / 2 : safeY;
        trib1 = span_between_x / 2;
        trib3 = span_between_x / 2;
        trib5 = has5 ? span_between_x : 0;
    }
  }

  const span1 = activeLegs.includes('D') ? safeX / 2 : safeX;
  const span3 = activeLegs.includes('B') ? safeX / 2 : safeX;
  const span4 = activeLegs.includes('H') ? safeY / 2 : safeY;
  const span2 = activeLegs.includes('I') ? safeY / 2 : safeY;
  const span5 = activeLegs.includes('G') ? safeX / 2 : safeX;
  const span6 = activeLegs.includes('G') ? safeY / 2 : safeY;
  const span7 = safeY;
  const span8 = safeY;

  const calcBeamCapacity = (profileKey, span, tributaryWidth) => {
    if (tributaryWidth < 1) return 999999; 
    const prof = profiles[profileKey] || profiles['ang_60x60x4'];
    const Wx_mm3 = prof.Wx * 1000;
    const MomentoAmmissibile = Wx_mm3 * sigmaAmm; 
    const qLinAmm = (8 * MomentoAmmissibile) / Math.pow(span, 2); 
    const qAreaMpa = qLinAmm / tributaryWidth;
    return qAreaMpa * (1000000 / 9.81); 
  };

  const cap1KgM2 = calcBeamCapacity(prof1, span1, trib1);
  const cap3KgM2 = calcBeamCapacity(prof3, span3, trib3); 
  const cap2KgM2 = calcBeamCapacity(prof2, span2, trib2);
  const cap4KgM2 = calcBeamCapacity(prof4, span4, trib4); 
  const cap5KgM2 = has5 ? calcBeamCapacity(prof5, span5, trib5) : 0;
  const cap6KgM2 = has6 ? calcBeamCapacity(prof6, span6, trib6) : 0;
  const cap7KgM2 = has7 ? calcBeamCapacity(prof7, span7, trib7) : 0;
  const cap8KgM2 = has8 ? calcBeamCapacity(prof8, span8, trib8) : 0;

  let capLegsKgM2 = 0;
  if (activeLegs.length > 0) {
    const legProf = profiles[profLegs] || profiles['ang_60x60x4'];
    const I_mm4 = legProf.Ix * 10000;
    const k_eulero = 2.0; 
    const P_critico_N = (Math.pow(Math.PI, 2) * E * I_mm4) / Math.pow(k_eulero * safeH, 2);
    const P_amm_N = Math.min((legProf.Area * 100 * sigmaAmm), P_critico_N / 3); 
    const P_amm_Kg = P_amm_N / 9.81;
    
    const factorAreaMax = activeLegs.includes('G') ? 0.25 : (1 / activeLegs.length) * 1.5;
    const maxAreaGambaM2 = Math.max(totalAreaM2 * factorAreaMax, 0.01);
    capLegsKgM2 = P_amm_Kg / maxAreaGambaM2;
  }

  const limits = [
    { id: 'plate', name: coveringName, val: capPlateKgM2 },
    { id: '1', name: 'Lato Lungo Sup. (1)', val: cap1KgM2 },
    { id: '2', name: 'Lato Corto Dx (2)', val: cap2KgM2 },
    { id: '3', name: 'Lato Lungo Inf. (3)', val: cap3KgM2 },
    { id: '4', name: 'Lato Corto Sx (4)', val: cap4KgM2 }
  ];
  
  if (has5) limits.push({ id: '5', name: 'Longherone Asse X (5)', val: cap5KgM2 });
  if (has6) limits.push({ id: '6', name: 'Traverso Asse Y 1/2 (6)', val: cap6KgM2 });
  if (has7) limits.push({ id: '7', name: 'Traverso Asse Y L/4 (7)', val: cap7KgM2 });
  if (has8) limits.push({ id: '8', name: 'Traverso Asse Y 3L/4 (8)', val: cap8KgM2 });

  if (activeLegs.length > 0) {
    limits.push({ id: 'legs', name: 'Gambe (Piegamento)', val: capLegsKgM2 });
  } else {
    limits.push({ id: 'legs', name: 'NESSUNA GAMBA ATTIVA!', val: 0 });
  }

  limits.sort((a, b) => (a.val || 0) - (b.val || 0));
  const bottleneck = limits[0] || { id: 'error', name: 'Errore', val: 0 };
  
  const safeMaxKgM2 = (bottleneck.val || 0) * 0.85; 
  const displayTotalKgM2 = Math.round(safeMaxKgM2);
  const displayTotalKg = isNaN(safeMaxKgM2 * totalAreaM2) ? 0 : Math.round(safeMaxKgM2 * totalAreaM2);

  // --- 4. MOTORE DI RENDER 3D ---
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      setZoom(prev => {
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
        return Math.max(0.2, Math.min(5.0, prev * zoomFactor));
      });
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      
      setRotZ(prev => (prev + dx * 0.5) % 360);
      setRotX(prev => Math.max(0, Math.min(90, prev - dy * 0.5)));
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      setViewMode('custom');
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const setView = (mode) => {
    setViewMode(mode);
    if (mode === 'iso') { setRotX(60); setRotZ(-45); }
    if (mode === 'top') { setRotX(90); setRotZ(0); }
    if (mode === 'front') { setRotX(0); setRotZ(0); }
  };

  const render3DModel = () => {
    const maxExt = Math.max(safeX, safeY, safeH, 1);
    const scale = (160 / maxExt) * zoom; 

    const project = (pt) => {
      const [x, y, z] = pt;
      const cx = safeX / 2;
      const cy = safeY / 2;
      const cz = safeH / 2;

      const px = x - cx;
      const py = y - cy;
      const pz = z - cz;

      const rZ = rotZ * Math.PI / 180;
      const rX = rotX * Math.PI / 180;

      const x1 = px * Math.cos(rZ) - py * Math.sin(rZ);
      const y1 = px * Math.sin(rZ) + py * Math.cos(rZ);
      const z1 = pz;

      const x2 = x1;
      const y2 = y1 * Math.cos(rX) - z1 * Math.sin(rX);
      const z2 = y1 * Math.sin(rX) + z1 * Math.cos(rX);

      const screenX = 400 + x2 * scale;
      const screenY = 275 - z2 * scale;

      return { x: screenX, y: screenY, depth: -y2 }; 
    };

    const allFaces = [];
    const addBox = (id, p, vx, vy, vz, isBottleneck, isLeg) => {
      const vAdd = (a, b) => [a[0]+b[0], a[1]+b[1], a[2]+b[2]];
      const pts = [
        p, vAdd(p, vx), vAdd(p, vAdd(vx, vy)), vAdd(p, vy),
        vAdd(p, vz), vAdd(vAdd(p, vx), vz), vAdd(vAdd(p, vAdd(vx, vy)), vz), vAdd(vAdd(p, vy), vz)
      ];
      
      const baseColor = isBottleneck ? [244, 63, 94] : (isLeg ? [161, 161, 170] : [113, 113, 122]);
      const cTop = `rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`; 
      const cFront = `rgb(${Math.round(baseColor[0]*0.8)}, ${Math.round(baseColor[1]*0.8)}, ${Math.round(baseColor[2]*0.8)})`; 
      const cSide = `rgb(${Math.round(baseColor[0]*0.65)}, ${Math.round(baseColor[1]*0.65)}, ${Math.round(baseColor[2]*0.65)})`; 

      const makeFace = (color, ...indices) => {
        const poly = indices.map(i => pts[i]);
        const cx = poly.reduce((sum, p) => sum + p[0], 0) / poly.length;
        const cy = poly.reduce((sum, p) => sum + p[1], 0) / poly.length;
        const cz = poly.reduce((sum, p) => sum + p[2], 0) / poly.length;
        const depth = project([cx, cy, cz]).depth;
        allFaces.push({ type: 'poly', id, poly, color, depth, isBottleneck });
      };

      makeFace(cFront, 0, 1, 5, 4); 
      makeFace(cSide, 1, 2, 6, 5);  
      makeFace(cFront, 2, 3, 7, 6); 
      makeFace(cSide, 3, 0, 4, 7);  
      makeFace(cTop, 0, 1, 2, 3);   
      makeFace(cTop, 4, 5, 6, 7);   
    };

    const w = Math.max(60, maxExt * 0.035); 
    const t = w * 0.25; 
    const Z_top = safeH;
    const Z_bot = safeH - w; 

    addBox('1', [0,0,Z_top], [safeX,0,0], [0,w,0], [0,0,-t], bottleneck.id === '1', false);
    addBox('1', [0,0,Z_top-t], [safeX,0,0], [0,t,0], [0,0,-(w-t)], bottleneck.id === '1', false);
    addBox('3', [0,safeY,Z_top], [safeX,0,0], [0,-w,0], [0,0,-t], bottleneck.id === '3', false);
    addBox('3', [0,safeY,Z_top-t], [safeX,0,0], [0,-t,0], [0,0,-(w-t)], bottleneck.id === '3', false);
    addBox('4', [0,0,Z_top], [0,safeY,0], [w,0,0], [0,0,-t], bottleneck.id === '4', false);
    addBox('4', [0,0,Z_top-t], [0,safeY,0], [t,0,0], [0,0,-(w-t)], bottleneck.id === '4', false);
    addBox('2', [safeX,0,Z_top], [0,safeY,0], [-w,0,0], [0,0,-t], bottleneck.id === '2', false);
    addBox('2', [safeX,0,Z_top-t], [0,safeY,0], [-t,0,0], [0,0,-(w-t)], bottleneck.id === '2', false);
    
    if (has5) {
      addBox('5', [0,safeY/2,Z_top], [safeX,0,0], [0,w,0], [0,0,-t], bottleneck.id === '5', false);
      addBox('5', [0,safeY/2,Z_top-t], [safeX,0,0], [0,t,0], [0,0,-(w-t)], bottleneck.id === '5', false);
    }
    if (has6) {
      addBox('6', [safeX/2,0,Z_top], [w,0,0], [0,safeY,0], [0,0,-t], bottleneck.id === '6', false);
      addBox('6', [safeX/2,0,Z_top-t], [t,0,0], [0,safeY,0], [0,0,-(w-t)], bottleneck.id === '6', false);
    }
    if (has7) {
      addBox('7', [safeX*0.25,0,Z_top], [w,0,0], [0,safeY,0], [0,0,-t], bottleneck.id === '7', false);
      addBox('7', [safeX*0.25,0,Z_top-t], [t,0,0], [0,safeY,0], [0,0,-(w-t)], bottleneck.id === '7', false);
    }
    if (has8) {
      addBox('8', [safeX*0.75,0,Z_top], [w,0,0], [0,safeY,0], [0,0,-t], bottleneck.id === '8', false);
      addBox('8', [safeX*0.75,0,Z_top-t], [t,0,0], [0,safeY,0], [0,0,-(w-t)], bottleneck.id === '8', false);
    }

    const addLeg = (lbl, px, py, ux, uy) => {
      if (!activeLegs.includes(lbl)) return; 
      const isB = bottleneck.id === 'legs';
      addBox('legs', [px, py, 0], [ux*w, 0, 0], [0, uy*t, 0], [0, 0, Z_bot], isB, true);
      addBox('legs', [px, py+uy*t, 0], [ux*t, 0, 0], [0, uy*(w-t), 0], [0, 0, Z_bot], isB, true);
    };

    addLeg('A', 0, safeY, 1, -1);
    addLeg('B', safeX/2, safeY, 1, -1);
    addLeg('C', safeX, safeY, -1, -1);
    addLeg('H', 0, safeY/2, 1, 1);
    addLeg('G', safeX/2, safeY/2, 1, 1);
    addLeg('I', safeX, safeY/2, -1, 1);
    addLeg('F', 0, 0, 1, 1);
    addLeg('D', safeX/2, 0, 1, 1);
    addLeg('E', safeX, 0, -1, 1);

    if (rotX > 10) {
        const zCover = safeH + 1;
        const coverPoly = [
            [0,0,zCover], [safeX,0,zCover], [safeX,safeY,zCover], [0,safeY,zCover]
        ];

        if (coveringType === 'grigliato') {
            const isMainX = actualDir === 'x';
            const numMainBars = 35;
            const numCrossBars = 12;
            const cMain = '#a1a1aa'; 
            const cCross = '#52525b'; 

            if (isMainX) {
                const stepY = safeY / numMainBars;
                const stepX = safeX / numCrossBars;
                for (let y = 0; y <= safeY + 0.1; y += stepY) {
                    allFaces.push({ type: 'griglia_line', p1: project([0, y, zCover]), p2: project([safeX, y, zCover]), color: cMain, width: 2, depth: 999998 });
                }
                for (let x = 0; x <= safeX + 0.1; x += stepX) {
                    allFaces.push({ type: 'griglia_line', p1: project([x, 0, zCover]), p2: project([x, safeY, zCover]), color: cCross, width: 0.75, depth: 999998 });
                }
            } else {
                const stepX = safeX / numMainBars;
                const stepY = safeY / numCrossBars;
                for (let x = 0; x <= safeX + 0.1; x += stepX) {
                    allFaces.push({ type: 'griglia_line', p1: project([x, 0, zCover]), p2: project([x, safeY, zCover]), color: cMain, width: 2, depth: 999998 });
                }
                for (let y = 0; y <= safeY + 0.1; y += stepY) {
                    allFaces.push({ type: 'griglia_line', p1: project([0, y, zCover]), p2: project([safeX, y, zCover]), color: cCross, width: 0.75, depth: 999998 });
                }
            }
            allFaces.push({ type: 'plate_outline', poly: coverPoly, color: '#71717a', depth: 999999 });

        } else if (coveringType.startsWith('doga')) {
            const isMainX = actualDir === 'x';
            const plankW = coveringType === 'doga_b' ? 200 : 250;
            const gap = 3; 
            const slotSpacing = 50; 

            const cDoga = 'rgba(161, 161, 170, 0.9)'; 
            const cStroke = '#3f3f46'; 
            const cSlotDark = '#09090b'; 
            const cSlotLight = 'rgba(255, 255, 255, 0.4)'; 

            if (isMainX) {
                for (let y = 0; y < safeY; y += plankW) {
                    const yEnd = Math.min(y + plankW - gap, safeY);
                    if (yEnd <= y) continue;
                    
                    const poly = [[0, y, zCover], [safeX, y, zCover], [safeX, yEnd, zCover], [0, yEnd, zCover]];
                    allFaces.push({ type: 'plate', poly, color: cDoga, stroke: cStroke, depth: 999998 });
                    
                    const slotStartY = y + (yEnd - y) * 0.15;
                    const slotEndY = y + (yEnd - y) * 0.85;
                    
                    for (let x = slotSpacing / 2; x < safeX; x += slotSpacing) {
                        allFaces.push({ type: 'doga_slot', p1: project([x - 3, slotStartY, zCover]), p2: project([x - 3, slotEndY, zCover]), color: cSlotLight, width: 3.5, depth: 999999 });
                        allFaces.push({ type: 'doga_slot', p1: project([x, slotStartY, zCover]), p2: project([x, slotEndY, zCover]), color: cSlotDark, width: 2.5, depth: 999999 });
                    }
                }
            } else {
                for (let x = 0; x < safeX; x += plankW) {
                    const xEnd = Math.min(x + plankW - gap, safeX);
                    if (xEnd <= x) continue;
                    
                    const poly = [[x, 0, zCover], [xEnd, 0, zCover], [xEnd, safeY, zCover], [x, safeY, zCover]];
                    allFaces.push({ type: 'plate', poly, color: cDoga, stroke: cStroke, depth: 999998 });
                    
                    const slotStartX = x + (xEnd - x) * 0.15;
                    const slotEndX = x + (xEnd - x) * 0.85;
                    
                    for (let y = slotSpacing / 2; y < safeY; y += slotSpacing) {
                        allFaces.push({ type: 'doga_slot', p1: project([slotStartX, y - 3, zCover]), p2: project([slotEndX, y - 3, zCover]), color: cSlotLight, width: 3.5, depth: 999999 });
                        allFaces.push({ type: 'doga_slot', p1: project([slotStartX, y, zCover]), p2: project([slotEndX, y, zCover]), color: cSlotDark, width: 2.5, depth: 999999 });
                    }
                }
            }
        } else {
            const plateColor = 'rgba(161, 161, 170, 0.4)'; 
            const strokeColor = 'rgba(161, 161, 170, 0.6)';
            allFaces.push({ type: 'plate', poly: coverPoly, color: plateColor, stroke: strokeColor, depth: 999999 }); 
        }
    }

    if (rotX > 20) {
        allFaces.push({ type: 'line', p1: project([safeX/2, safeY/2, -safeH*0.5]), p2: project([safeX/2, safeY/2, safeH*1.5]), color: '#27272a', depth: -999999 });
        allFaces.push({ type: 'line', p1: project([-safeX*0.2, safeY/2, 0]), p2: project([safeX*1.2, safeY/2, 0]), color: '#27272a', depth: -999999 });
        allFaces.push({ type: 'line', p1: project([safeX/2, -safeY*0.2, 0]), p2: project([safeX/2, safeY*1.2, 0]), color: '#27272a', depth: -999999 });
        allFaces.push({ type: 'shadow', poly: [[0,0,0], [safeX,0,0], [safeX,safeY,0], [0,safeY,0]], color: 'rgba(0,0,0,0.6)', depth: -999999 });
    }

    allFaces.sort((a, b) => a.depth - b.depth);

    return (
      <div 
        ref={containerRef}
        className={`relative w-full h-[400px] lg:h-[600px] flex items-center justify-center bg-zinc-950 overflow-hidden touch-none rounded-3xl border border-white/5 shadow-inner ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full shadow-2xl p-1.5 z-10 pointer-events-auto">
            <button onMouseDown={(e)=>e.stopPropagation()} onClick={()=>setView('iso')} className={`px-5 py-1.5 rounded-full text-[11px] font-bold transition-all ${viewMode==='iso' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-white'}`}>ISO</button>
            <button onMouseDown={(e)=>e.stopPropagation()} onClick={()=>setView('top')} className={`px-5 py-1.5 rounded-full text-[11px] font-bold transition-all ${viewMode==='top' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-white'}`}>TOP</button>
            <button onMouseDown={(e)=>e.stopPropagation()} onClick={()=>setView('front')} className={`px-5 py-1.5 rounded-full text-[11px] font-bold transition-all ${viewMode==='front' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-400 hover:text-white'}`}>FRONT</button>
            <div className="w-px h-4 bg-white/10 mx-2"></div>
            <button onMouseDown={(e)=>e.stopPropagation()} onClick={() => setZoom(z => Math.min(5, z * 1.2))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-300 transition-colors" title="Zoom In">+</button>
            <button onMouseDown={(e)=>e.stopPropagation()} onClick={() => setZoom(z => Math.max(0.2, z / 1.2))} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-300 transition-colors" title="Zoom Out">-</button>
        </div>

        <svg viewBox="0 0 800 550" className="w-full h-full pointer-events-none">
            {allFaces.map((item, i) => {
                if (item.type === 'shadow') {
                    return <polygon key={i} points={item.poly.map(p => { const proj = project(p); return `${proj.x},${proj.y}`; }).join(' ')} fill={item.color} />;
                }
                if (item.type === 'line') {
                    return <line key={i} x1={item.p1.x} y1={item.p1.y} x2={item.p2.x} y2={item.p2.y} stroke={item.color} strokeWidth="1.5" strokeDasharray="4,4" />;
                }
                if (item.type === 'griglia_line' || item.type === 'doga_slot') {
                    return <line key={i} x1={item.p1.x} y1={item.p1.y} x2={item.p2.x} y2={item.p2.y} stroke={item.color} strokeWidth={item.width} strokeLinecap="round" />;
                }
                if (item.type === 'plate_outline') {
                    return <polygon key={i} points={item.poly.map(p => { const proj = project(p); return `${proj.x},${proj.y}`; }).join(' ')} fill="none" stroke={item.color} strokeWidth="2" strokeLinejoin="round" />;
                }
                if (item.type === 'plate') {
                    return <polygon key={i} points={item.poly.map(p => { const proj = project(p); return `${proj.x},${proj.y}`; }).join(' ')} fill={item.color} stroke={item.stroke || "rgba(244, 63, 94, 0.4)"} strokeWidth="1" strokeLinejoin="round" />;
                }
                return (
                    <polygon 
                        key={`poly-${i}`} 
                        points={item.poly.map(p => { const proj = project(p); return `${proj.x.toFixed(1)},${proj.y.toFixed(1)}`; }).join(' ')} 
                        fill={item.color} 
                        stroke="#09090b" 
                        strokeWidth="0.5" 
                        strokeLinejoin="round" 
                    />
                );
            })}
        </svg>
      </div>
    );
  };

  const renderReport = () => (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/5 p-10 max-w-4xl mx-auto text-zinc-300 leading-relaxed text-sm">
        <div className="border-b border-white/10 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Relazione di Calcolo Strutturale</h1>
            <p className="text-zinc-400 mt-2">Output generato da motore deterministico di predimensionamento</p>
        </div>

        <div className="space-y-10">
            <section>
                <h2 className="text-xl font-bold text-white mb-3">1. Panoramica</h2>
                <p>Calcolo strutturale è un motore deterministico sviluppato per il predimensionamento rapido di intelaiature metalliche semplici. Il software calcola a ritroso il massimo sovraccarico variabile uniformemente distribuito (Q<sub>k</sub> in kg/m²) che la struttura è in grado di sopportare prima di raggiungere il limite di collasso normativo o di deformabilità del suo elemento più critico (bottleneck).</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-white mb-3">2. Modelli Strutturali e Topologia</h2>
                <p className="mb-6">L'algoritmo si basa sul Metodo degli Stati Limite (SLU e SLE) in accordo con le NTC 2018 e l'Eurocodice 3. I coefficienti parziali di sicurezza impiegati sono γ<sub>M0</sub> = 1.05, γ<sub>M1</sub> = 1.05.</p>
                
                <div className="bg-zinc-950 p-6 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <ul className="space-y-3">
                            <li><span className="text-xs uppercase tracking-widest text-zinc-500 block mb-0.5">Dimensioni</span> <span className="font-semibold text-white">{safeX} x {safeY} x {safeH} mm</span></li>
                            <li><span className="text-xs uppercase tracking-widest text-zinc-500 block mb-0.5">Area in Pianta</span> <span className="font-semibold text-white">{totalAreaM2.toFixed(2)} m²</span></li>
                            <li><span className="text-xs uppercase tracking-widest text-zinc-500 block mb-0.5">Materiale</span> <span className="font-semibold text-white">S235 (f<sub>y</sub> = 235 MPa)</span></li>
                            <li><span className="text-xs uppercase tracking-widest text-zinc-500 block mb-0.5">Copertura</span> <span className="font-semibold text-white">{coveringName}</span></li>
                        </ul>
                    </div>
                    <div className="border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
                        <h3 className="font-bold text-zinc-500 mb-4 text-xs uppercase tracking-widest">Analisi Pesi (Vuoto)</h3>
                        <ul className="space-y-3 text-zinc-300">
                            <li className="flex justify-between items-center"><span>Peso Telaio:</span> <span className="font-mono bg-zinc-900 px-2 py-1 rounded text-white">{pesoTotaleStruttura.toFixed(1)} kg</span></li>
                            <li className="flex justify-between items-center"><span>Peso Copertura:</span> <span className="font-mono bg-zinc-900 px-2 py-1 rounded text-white">{pesoTotaleCopertura.toFixed(1)} kg</span></li>
                            <li className="flex justify-between items-center font-bold pt-3 mt-3 border-t border-white/10 text-white"><span>PESO TOTALE:</span> <span className="font-mono text-indigo-400 text-lg">{pesoTotaleComplessivo.toFixed(1)} kg</span></li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );

  const renderCalculations = () => (
    <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/5 p-10 max-w-4xl mx-auto text-zinc-300 leading-relaxed text-sm">
        <div className="border-b border-white/10 pb-6 mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">Appendice Tecnica & Formulario</h1>
            <p className="text-zinc-400 mt-2">Spiegazione analitica e trasparenza sul flusso logico-matematico del motore di calcolo.</p>
        </div>

        <div className="space-y-12">
            
            <section>
                <h2 className="text-lg font-bold text-indigo-400 mb-3">1. Parametri dei Materiali e Sicurezza</h2>
                <p className="text-zinc-400 mb-4">Definizione delle tensioni ammissibili secondo il metodo degli Stati Limite (SLU/SLE), applicando i coefficienti parziali di sicurezza del materiale (&#947;<sub>M</sub>).</p>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-white/5 font-mono text-sm shadow-inner space-y-3">
                    <div><span className="text-zinc-500">E</span> = 210.000 MPa <span className="text-zinc-600">// Modulo elastico di Young (Acciaio)</span></div>
                    <div><span className="text-zinc-500">f<sub>y</sub></span> = 235 MPa <span className="text-zinc-600">// Tensione di snervamento (Acciaio S235)</span></div>
                    <div><span className="text-zinc-500">&#947;<sub>M</sub></span> = {gammaM} <span className="text-zinc-600">// Coefficiente di sicurezza impostato</span></div>
                    <div className="pt-3 border-t border-white/10 mt-3 text-white font-bold flex items-center justify-between">
                        <span>&#963;<sub>amm</sub> = f<sub>y</sub> / &#947;<sub>M</sub></span>
                        <span className="text-indigo-400">[{Math.round(sigmaAmm)} MPa]</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold text-indigo-400 mb-3">2. Modello di Trasmissione dei Carichi (Aree Tributarie)</h2>
                <p className="text-zinc-400 mb-4">La trasformazione del carico areale della copertura (Q in kg/m²) in carico lineare (q in kg/m) sulle travi portanti avviene tramite il calcolo delle <strong>Aree di Influenza</strong>. Il modello cambia in base alla tipologia di impalcato.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-zinc-950 p-6 rounded-2xl border border-white/5 font-mono text-sm shadow-inner">
                        <div className="text-white font-bold mb-3 font-sans">Comportamento 1D <span className="text-zinc-500 font-normal text-xs">(Grigliati / Doghe)</span></div>
                        <div className="text-zinc-500 text-xs font-sans mb-4 leading-relaxed">Il carico si distribuisce in una sola direzione, unicamente sui due appoggi ortogonali all'orditura dei piatti portanti. Ogni trave assorbe metà della luce.</div>
                        <div className="text-zinc-300">L<sub>trib</sub> = L<sub>span</sub> / 2</div>
                        <div className="text-indigo-400 mt-2 font-bold">q<sub>lin</sub> = Q<sub>areale</sub> * L<sub>trib</sub></div>
                    </div>
                    <div className="bg-zinc-950 p-6 rounded-2xl border border-white/5 font-mono text-sm shadow-inner">
                        <div className="text-white font-bold mb-3 font-sans">Comportamento 2D <span className="text-zinc-500 font-normal text-xs">(Lamiere)</span></div>
                        <div className="text-zinc-500 text-xs font-sans mb-4 leading-relaxed">Il carico si ripartisce sui 4 lati formando linee di rottura a 45°. Le travi lunghe assorbono aree trapezoidali, le corte aree triangolari.</div>
                        <div className="text-zinc-300">L<sub>trib(lungo)</sub> = (L<sub>corto</sub>/2) * (1 - (L<sub>corto</sub>/L<sub>lungo</sub>)²/3)</div>
                        <div className="text-zinc-300 mt-1">L<sub>trib(corto)</sub> = L<sub>corto</sub> / 3</div>
                        <div className="text-indigo-400 mt-2 font-bold">q<sub>lin</sub> = Q<sub>areale</sub> * L<sub>trib(x/y)</sub></div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold text-indigo-400 mb-3">3. Verifica di Resistenza delle Travi (Flessione)</h2>
                <p className="text-zinc-400 mb-4">Per definire il carico sopportabile dal telaio, l'algoritmo inverte l'equazione canonica del momento flettente massimo di una trave in semplice appoggio.</p>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-white/5 font-mono text-sm shadow-inner space-y-3">
                    <div><span className="text-zinc-500">M<sub>max_resistente</sub></span> = W<sub>x</sub> * &#963;<sub>amm</sub> <span className="text-zinc-600 text-xs">// Noto il modulo di resistenza Wx del profilo</span></div>
                    <div className="text-zinc-600 italic text-xs my-2">// Equazione del momento max in mezzeria: M_max = (q_lin * L²) / 8</div>
                    <div className="text-zinc-600 italic text-xs">// Da cui si estrae il carico lineare ammissibile:</div>
                    <div className="text-zinc-300">q<sub>lin_max</sub> = (8 * M<sub>max_resistente</sub>) / L²</div>
                    <div className="pt-3 border-t border-white/10 mt-3 text-white font-bold flex items-center justify-between">
                        <span>Capacità Trave [kg/m²] = (q<sub>lin_max</sub> / L<sub>trib</sub>)</span>
                        <span className="text-zinc-500 text-xs font-normal">*(conversione in kg)</span>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold text-indigo-400 mb-3">4. Verifica a Compressione e Instabilità (Colonne)</h2>
                <p className="text-zinc-400 mb-4">Le gambe sono soggette a carico assiale. Vengono verificate sia per schiacciamento della sezione pura, sia per il fenomeno dell'instabilità euleriana (Buckling o Sbandamento laterale).</p>
                <div className="bg-zinc-950 p-6 rounded-2xl border border-white/5 font-mono text-sm shadow-inner space-y-3">
                    <div><span className="text-zinc-500">K</span> = 2.0 <span className="text-zinc-600 text-xs">// Fattore di vincolo (ipotesi cautelativa mensola libera)</span></div>
                    <div><span className="text-zinc-500">P<sub>critico_Eulero</sub></span> = (&#960;² * E * I<sub>min</sub>) / (K * H)² <span className="text-zinc-600 text-xs">// Newton</span></div>
                    <div><span className="text-zinc-500">P<sub>snervamento</sub></span> = Area * &#963;<sub>amm</sub></div>
                    <div className="pt-3 border-t border-white/10 mt-3 text-zinc-300">
                        P<sub>amm_gamba</sub> = min( P<sub>snervamento</sub> , P<sub>critico_Eulero</sub> / 3 ) <span className="text-zinc-600 text-xs">// Riduzione prudenziale Eulero</span>
                    </div>
                    <div className="text-indigo-400 font-bold mt-2">
                        Capacità Sistema Colonne [kg/m²] = P<sub>amm_gamba</sub> / Area_Influenza_Max
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-lg font-bold text-emerald-400 mb-3">5. Determinazione del Collo di Bottiglia (Bottleneck)</h2>
                <p className="text-zinc-400 mb-4">Il motore calcola la "Capacità Areale Equivalente" in modo indipendente per <strong>ogni singolo elemento</strong> della struttura. Il punto debole del sistema (Collo di Bottiglia) decreta inequivocabilmente il limite massimo di portata dell'intero impianto.</p>
                <div className="bg-emerald-900/10 p-6 rounded-2xl border border-emerald-500/20 font-mono text-sm shadow-inner space-y-3">
                    <div className="text-zinc-300 text-xs leading-relaxed">
                        Capacità_Sistema = min(<br/>
                        &nbsp;&nbsp;Capacità<sub>impalcato</sub>,<br/>
                        &nbsp;&nbsp;Capacità<sub>trave1</sub>, ..., Capacità<sub>trave8</sub>,<br/>
                        &nbsp;&nbsp;Capacità<sub>colonne</sub><br/>
                        )
                    </div>
                    <div className="pt-4 border-t border-emerald-500/20 mt-4 text-emerald-400 font-bold text-base md:text-lg flex flex-wrap gap-2 items-center">
                        <span>Portata Operativa Finale = </span>
                        <span className="bg-emerald-950/50 px-3 py-1 rounded text-emerald-300 border border-emerald-500/30">Capacità_Sistema * 0.85</span>
                    </div>
                    <div className="text-emerald-500/60 font-sans text-xs mt-2 font-medium">*Il moltiplicatore 0.85 funge da ulteriore fattore di sicurezza per assorbire approssimazioni del modello lineare.</div>
                </div>
            </section>

        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-200 flex flex-col selection:bg-indigo-500/30">
      
      {/* Header & Tabs */}
      <div className="bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20"><IconSettings className="w-5 h-5 text-white" /></div>
              <h1 className="text-xl font-bold text-white tracking-tight">Calcolo strutturale</h1>
          </div>
          <div className="flex bg-zinc-900/80 p-2 rounded-2xl border border-white/10 shadow-inner">
              <button onClick={() => setActiveTab('dashboard')} className={`px-5 sm:px-8 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-white text-zinc-900 shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>Dashboard</button>
              <button onClick={() => setActiveTab('report')} className={`px-5 sm:px-8 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'report' ? 'bg-white text-zinc-900 shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>Relazione</button>
              <button onClick={() => setActiveTab('calculations')} className={`px-5 sm:px-8 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${activeTab === 'calculations' ? 'bg-white text-zinc-900 shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>Formulario</button>
          </div>
      </div>

      <div className="flex-1 p-6 md:p-8 w-full max-w-[1800px] mx-auto">
        {activeTab === 'dashboard' && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            
            {/* 1. SIDEBAR SINISTRA: Controlli di Input & Bottleneck */}
            <div className="w-full lg:w-[280px] xl:w-[320px] 2xl:w-[350px] flex-shrink-0 space-y-6">
                
                {/* Geometria */}
                <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span> Geometria di Base
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <label className="text-sm font-semibold text-zinc-300">Lunghezza X [mm]</label>
                            <input type="number" value={dimX} onChange={(e) => setDimX(e.target.value)} className="w-20 xl:w-24 p-2 bg-zinc-950 border border-white/10 text-white rounded-xl text-right font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <label className="text-sm font-semibold text-zinc-300">Larghezza Y [mm]</label>
                            <input type="number" value={dimY} onChange={(e) => setDimY(e.target.value)} className="w-20 xl:w-24 p-2 bg-zinc-950 border border-white/10 text-white rounded-xl text-right font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-white/5">
                            <label className="text-sm font-semibold text-zinc-300">Altezza Z [mm]</label>
                            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-20 xl:w-24 p-2 bg-zinc-950 border border-white/10 text-white rounded-xl text-right font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>
                        <div className="flex justify-between items-center pt-1">
                            <label className="text-sm font-semibold text-zinc-300">Sicurezza (&#947;<sub>M</sub>)</label>
                            <input type="number" step="0.05" value={gammaM} onChange={(e) => setGammaM(e.target.value)} className="w-20 xl:w-24 p-2 bg-zinc-950 border border-white/10 text-white rounded-xl text-right font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                        </div>
                    </div>
                </div>

                {/* Topologia */}
                <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl flex flex-col">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span> Topologia Interna
                    </h2>
                    
                    <div className="space-y-3 mb-6">
                        <label className="flex items-center justify-between cursor-pointer group bg-zinc-950/50 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">Traverso Y Centrale</span>
                            <div className={`w-12 h-6 rounded-full transition-colors relative ${has6 ? 'bg-indigo-500' : 'bg-zinc-800'}`}>
                                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${has6 ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={has6} onChange={() => toggleBeam('6')} />
                        </label>
                        <label className="flex items-center justify-between cursor-pointer group bg-zinc-950/50 p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">Longherone X Centrale</span>
                            <div className={`w-12 h-6 rounded-full transition-colors relative ${has5 ? 'bg-indigo-500' : 'bg-zinc-800'}`}>
                                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${has5 ? 'transform translate-x-6' : ''}`}></div>
                            </div>
                            <input type="checkbox" className="hidden" checked={has5} onChange={() => toggleBeam('5')} />
                        </label>
                    </div>

                    <div className="mt-auto">
                        <span className="block text-[10px] font-bold uppercase text-zinc-500 mb-3 tracking-widest">Matrice Supporti Attivi</span>
                        <div className="flex flex-wrap gap-2">
                            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(id => (
                                <LegToggle key={id} id={id} active={activeLegs.includes(id)} onToggle={toggleLeg} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Materiali Copertura */}
                <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span> Materiali Copertura
                    </h2>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-zinc-300 mb-2">Impalcato / Pagliolato</label>
                            <select value={coveringType} onChange={handleCoveringChange} className="w-full p-3 bg-zinc-950 border border-white/10 text-white rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                                <option value="lamiera">Lamiera Liscia/Bugnata</option>
                                <option value="grigliato">Grigliato (Maglia 34x76, sp. 3mm)</option>
                                <option value="doga_a">Doga Tipo A (250x55, sp. 5mm)</option>
                                <option value="doga_b">Doga Tipo B (200x55, sp. 5mm)</option>
                                <option value="doga_comm">Doga Comm. (250x55, sp. 2mm)</option>
                            </select>
                        </div>
                        {coveringType === 'lamiera' ? (
                            <div>
                                <label className="block text-sm font-semibold text-zinc-300 mb-2">Spessore Lamiera [mm]</label>
                                <input type="number" value={covDim} onChange={(e) => setCovDim(e.target.value)} className="w-full p-3 bg-zinc-950 border border-white/10 text-white rounded-xl font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
                            </div>
                        ) : (
                            <div>
                                <label className="block text-sm font-semibold text-zinc-300 mb-2">Orditura Portante</label>
                                <select value={deckDir} onChange={(e) => setDeckDir(e.target.value)} className="w-full p-3 bg-zinc-950 border border-white/10 text-white rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all">
                                    <option value="min">Ottimizzazione (Luce Corta)</option>
                                    <option value="x">Paralleli Asse X (Lati 1-3)</option>
                                    <option value="y">Paralleli Asse Y (Lati 2-4)</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* 2. MAIN CONTENT CENTRALE: Risultati e Vista 3D */}
            <div className="flex-1 min-w-0 flex flex-col space-y-6 lg:space-y-8">
                
                {/* Top Row: KPI Portata & Pesi */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {/* KPI Card */}
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-700 rounded-3xl p-6 lg:p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden flex flex-col h-full">
                        <svg className="absolute top-0 right-0 w-48 h-48 text-white/5 transform translate-x-16 -translate-y-16" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="50"/></svg>
                        
                        <div className="relative z-10 mb-6 lg:mb-8">
                            <h2 className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-4">Portata Operativa</h2>
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-indigo-200 mb-1 font-bold">Capacità Totale Modello</div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl lg:text-6xl font-black tracking-tighter">{displayTotalKg.toLocaleString('it-IT')}</span>
                                    <span className="text-xl font-medium text-indigo-200">kg</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-5 border-t border-white/20 relative z-10 mt-auto">
                            <div className="text-[10px] uppercase tracking-widest text-indigo-200 mb-1 font-bold">Carico Distribuito Max (Qk)</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl lg:text-4xl font-black tracking-tighter">{displayTotalKgM2.toLocaleString('it-IT')}</span>
                                <span className="text-lg font-medium text-indigo-200">kg/m²</span>
                            </div>
                        </div>
                    </div>

                    {/* Pesi Card */}
                    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-700 rounded-3xl p-6 lg:p-8 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden flex flex-col h-full">
                        <svg className="absolute top-0 right-0 w-48 h-48 text-white/5 transform translate-x-16 -translate-y-16" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="50"/></svg>
                        
                        <div className="relative z-10 mb-6 lg:mb-8">
                            <h2 className="text-sm font-bold text-indigo-200 uppercase tracking-widest mb-4">Analisi Pesi</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-indigo-200 mb-1 font-bold">Copertura</div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl lg:text-5xl font-black tracking-tighter">{pesoTotaleCopertura.toFixed(1)}</span>
                                        <span className="text-sm font-medium text-indigo-200">kg</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest text-indigo-200 mb-1 font-bold">Telaio</div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl lg:text-5xl font-black tracking-tighter">{pesoTotaleStruttura.toFixed(1)}</span>
                                        <span className="text-sm font-medium text-indigo-200">kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="pt-5 border-t border-white/20 relative z-10 mt-auto">
                            <div className="text-[10px] uppercase tracking-widest text-indigo-200 mb-1 font-bold">Totale Sistema</div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl lg:text-4xl font-black tracking-tighter">{pesoTotaleComplessivo.toFixed(1)}</span>
                                <span className="text-lg font-medium text-indigo-200">kg</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3D Model View */}
                <div className="relative flex-1 min-h-[400px]">
                    {render3DModel()}
                </div>

                {/* Bottleneck Card Orizzontale */}
                <div className={`rounded-3xl p-5 border backdrop-blur-sm shadow-xl flex items-center transition-all duration-500 ${bottleneck.id !== 'error' ? 'bg-rose-500/10 border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.05)]' : 'bg-zinc-900/50 border-white/5'}`}>
                    <div className="flex items-center gap-4 w-full">
                        {bottleneck.id !== 'error' ? (
                            <IconAlert className="w-8 h-8 flex-shrink-0 text-rose-500" />
                        ) : (
                            <IconCheck className="w-8 h-8 flex-shrink-0 text-emerald-500" />
                        )}
                        <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 flex-1">
                            <h3 className="font-bold text-white tracking-tight text-lg">Collo di bottiglia:</h3>
                            <p className="text-base text-zinc-300">
                                Elemento limitante 
                                <strong className={`font-black text-xl ml-2 ${bottleneck.id !== 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>{bottleneck.name}</strong>
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. SIDEBAR DESTRA: Assegnazione Profili Strutturali */}
            <div className="w-full lg:w-[280px] xl:w-[320px] 2xl:w-[350px] flex-shrink-0">
                <div className="bg-zinc-900/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 shadow-xl h-full flex flex-col max-h-[85vh]">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Profili Strutturali
                    </h2>
                    <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
                        <ProfileSelect label="Lato Lungo Sup." parts="1" value={prof1} onChange={setProf1} capacity={cap1KgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === '1'} />
                        <ProfileSelect label="Lato Corto Dx" parts="2" value={prof2} onChange={setProf2} capacity={cap2KgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === '2'} />
                        <ProfileSelect label="Lato Lungo Inf." parts="3" value={prof3} onChange={setProf3} capacity={cap3KgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === '3'} />
                        <ProfileSelect label="Lato Corto Sx" parts="4" value={prof4} onChange={setProf4} capacity={cap4KgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === '4'} />
                        {has5 && <ProfileSelect label="Longherone X" parts="5" value={prof5} onChange={setProf5} capacity={cap5KgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === '5'} />}
                        {has6 && <ProfileSelect label="Traverso Y Centrale" parts="6" value={prof6} onChange={setProf6} capacity={cap6KgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === '6'} />}
                        {has7 && <ProfileSelect label="Traverso Y (L/4)" parts="7" value={prof7} onChange={setProf7} capacity={cap7KgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === '7'} />}
                        {has8 && <ProfileSelect label="Traverso Y (3L/4)" parts="8" value={prof8} onChange={setProf8} capacity={cap8KgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === '8'} />}
                        <ProfileSelect label="Sistema Colonne" parts="A...I" value={profLegs} onChange={setProfLegs} capacity={capLegsKgM2} totalArea={totalAreaM2} isBottleneck={bottleneck.id === 'legs'} />
                    </div>
                </div>
            </div>

          </div>
        )}
        {activeTab === 'report' && renderReport()}
        {activeTab === 'calculations' && renderCalculations()}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.02); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
      `}} />
    </div>
  );
};

export default function App() {
  return <CalculatorApp />;
}
