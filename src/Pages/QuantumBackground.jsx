export default function QuantumBackground() {
  return (
    <div className="absolute inset-0 z-0 quantum-wave">

      {/* SVG FILTER (must stay in DOM) */}
      <svg className="hidden">
        <filter id="quantum-texture">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.07"
            numOctaves="2"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0.6
                    0 0 0 1 0"
            result="colored"
          />
          <feSpecularLighting
            in="colored"
            surfaceScale="4"
            specularConstant="0.75"
            specularExponent="12"
            result="specular"
          >
            <feDistantLight azimuth="120" elevation="55" />
          </feSpecularLighting>
          <feComposite
            in="specular"
            in2="SourceGraphic"
            operator="over"
            result="lit"
          />
          <feBlend in="SourceGraphic" in2="lit" mode="screen" />
        </filter>
      </svg>

      {/* overlay */}
      <span className="overlay" />
    </div>
  );
}