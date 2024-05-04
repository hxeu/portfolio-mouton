import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import particlesOptions from './particlesConfig.js';

const ParticlesComponent = (props) => {
  const [init, setInit] = useState(false);
  
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  const particlesLoaded = (container) => {
    console.log(container);
  };

  return <Particles id={props.id} init={particlesLoaded} options={particlesOptions} />;
};

export default ParticlesComponent;
