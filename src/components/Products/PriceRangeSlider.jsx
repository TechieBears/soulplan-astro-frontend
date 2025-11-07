// PriceRangeSlider.jsx
import React, { useEffect } from "react";

const clamp = (v, a, b) => Math.min(Math.max(Number(v), a), b);

const PriceRangeSlider = ({
  min,
  max,
  value = [min, max],
  onChange,
  disabled = false,
}) => {
  const curMinVal = Number(value?.[0] ?? min);
  const curMaxVal = Number(value?.[1] ?? max);
  const MIN_GAP = 100; // Minimum distance between sliders

  const rangeSpan = max - min || 1;
  const minPercent = ((curMinVal - min) / rangeSpan) * 100;
  const maxPercent = ((curMaxVal - min) / rangeSpan) * 100;

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
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        transition: transform 0.15s ease, background 0.2s;
        position: relative;
      }
      .range-slider::-webkit-slider-thumb:active {
        transform: scale(1.25);
        background: #4B5D78;
      }
      .range-slider::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #62748E;
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 0 4px rgba(0,0,0,0.3);
        transition: transform 0.15s ease, background 0.2s;
      }
      .range-slider::-moz-range-thumb:active {
        transform: scale(1.25);
        background: #4B5D78;
      }
      .range-slider::-webkit-slider-runnable-track {
        background: transparent;
        height: 2px;
      }
      .range-slider::-moz-range-track {
        background: transparent;
        height: 2px;
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    if (typeof onChange !== "function") return;
    const new0 = clamp(curMinVal, min, max);
    const new1 = clamp(curMaxVal, min, max);
    const n0 = Math.min(new0, new1 - MIN_GAP);
    const n1 = Math.max(new0 + MIN_GAP, new1);

    if (n0 !== curMinVal || n1 !== curMaxVal) {
      onChange([n0, n1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, curMinVal, curMaxVal, onChange]);

  const handleMinChange = (e) => {
    const raw = Number(e.target.value);
    const nextMin = Math.min(clamp(raw, min, max - MIN_GAP), curMaxVal - MIN_GAP);
    if (nextMin !== curMinVal && typeof onChange === "function") {
      onChange([nextMin, curMaxVal]);
    }
  };

  const handleMaxChange = (e) => {
    const raw = Number(e.target.value);
    const nextMax = Math.max(clamp(raw, min + MIN_GAP, max), curMinVal + MIN_GAP);
    if (nextMax !== curMaxVal && typeof onChange === "function") {
      onChange([curMinVal, nextMax]);
    }
  };

  // When overlapping, bring the right (max) thumb above
  const isOverlapping = maxPercent - minPercent < 3;
  const minThumbZ = isOverlapping ? 20 : 30;
  const maxThumbZ = isOverlapping ? 40 : 20;

  const left = `${minPercent}%`;
  const width = `${Math.max(0, maxPercent - minPercent)}%`;

  return (
    <div className="relative w-full">
      <div className="relative h-6">
        {/* Track base */}
        <div className="absolute w-full h-2 bg-gray-200 rounded top-2"></div>

        {/* Selected range */}
        <div
          className="absolute h-2 bg-slate-600 rounded top-2"
          style={{ left, width }}
        />

        {/* Left (min) input */}
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

        {/* Right (max) input */}
        <input
          aria-label="Maximum price"
          type="range"
          min={min}
          max={max}
          value={curMaxVal}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer range-slider"
          disabled={disabled}
          style={{ zIndex: maxThumbZ }}
        />
      </div>
    </div>
  );
};

export default React.memo(PriceRangeSlider);
