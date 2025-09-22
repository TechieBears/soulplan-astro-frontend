// PriceRangeSlider.jsx
import React, { useEffect } from "react";

const clamp = (v, a, b) => Math.min(Math.max(Number(v), a), b);

const PriceRangeSlider = ({ min, max, value = [min, max], onChange, disabled = false }) => {
  // normalize values to numbers
  const curMinVal = Number(value?.[0] ?? min);
  const curMaxVal = Number(value?.[1] ?? max);

  // prevent division by zero
  const rangeSpan = max - min || 1;
  const minPercent = ((curMinVal - min) / rangeSpan) * 100;
  const maxPercent = ((curMaxVal - min) / rangeSpan) * 100;

  // ensure there is a single style block for thumbs (runs once on client)
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("prs-styles")) return;

    const style = document.createElement("style");
    style.id = "prs-styles";
    style.textContent = `
      .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #62748E;
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      .range-slider::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #62748E;
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      /* Make the track itself invisible so our custom track is visible */
      .range-slider::-webkit-slider-runnable-track { background: transparent; height: 2px; }
      .range-slider::-moz-range-track { background: transparent; height: 2px; }
    `;
    document.head.appendChild(style);
  }, []);

  // When min or max (or current values) change, clamp the values and tell parent if changed.
  useEffect(() => {
    if (typeof onChange !== "function") return;

    const new0 = clamp(curMinVal, min, max);
    const new1 = clamp(curMaxVal, min, max);
    // ensure ordering
    const n0 = Math.min(new0, new1);
    const n1 = Math.max(new0, new1);

    if (n0 !== curMinVal || n1 !== curMaxVal) {
      onChange([n0, n1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, curMinVal, curMaxVal, onChange]);

  const handleMinChange = (e) => {
    const raw = Number(e.target.value);
    const nextMin = clamp(raw, min, curMaxVal); // not exceed current max
    if (nextMin !== curMinVal && typeof onChange === "function") {
      onChange([nextMin, curMaxVal]);
    }
  };

  const handleMaxChange = (e) => {
    const raw = Number(e.target.value);
    const nextMax = clamp(raw, curMinVal, max); // not go below current min
    if (nextMax !== curMaxVal && typeof onChange === "function") {
      onChange([curMinVal, nextMax]);
    }
  };

  // keep the filled bar width and left offset
  const left = `${minPercent}%`;
  const width = `${Math.max(0, maxPercent - minPercent)}%`;

  // when thumbs overlap, make min thumb above so user can grab it
  const minThumbZ = minPercent > maxPercent - 5 ? 30 : 20; // 5% threshold

  return (
    <div className="relative w-full">
      <div className="relative h-6">
        {/* full track */}
        <div className="absolute w-full h-2 bg-gray-200 rounded top-2"></div>

        {/* selected range */}
        <div
          className="absolute h-2 bg-slate-600 rounded top-2"
          style={{ left, width }}
        />

        {/* left (min) input */}
        <input
          aria-label="Minimum price"
          type="range"
          min={min}
          max={max}
          value={curMinVal}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
          disabled={disabled}
          style={{ zIndex: minThumbZ }}
        />

        {/* right (max) input */}
        <input
          aria-label="Maximum price"
          type="range"
          min={min}
          max={max}
          value={curMaxVal}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
          disabled={disabled}
          style={{ zIndex: 20 }}
        />
      </div>
    </div>
  );
};

export default React.memo(PriceRangeSlider);
