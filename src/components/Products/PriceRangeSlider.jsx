import React, { useEffect, useRef } from "react";

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
  const MIN_GAP = 100; 
  const rangeSpan = max - min || 1;
  const minPercent = ((curMinVal - min) / rangeSpan) * 100;
  const maxPercent = ((curMaxVal - min) / rangeSpan) * 100;

  const lastActiveSlider = useRef('max'); // 'min' or 'max'

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("prs-styles")) return;

    const style = document.createElement("style");
    style.id = "prs-styles";
    style.textContent = `
      .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: #62748E;
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: all 0.15s ease;
        position: relative;
        z-index: 30;
      }
      .range-slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        background: #4B5D78;
      }
      .range-slider::-webkit-slider-thumb:active {
        transform: scale(1.2);
        background: #3A4A61;
        box-shadow: 0 4px 8px rgba(0,0,0,0.4);
      }
      .range-slider::-moz-range-thumb {
        height: 18px;
        width: 18px;
        border-radius: 50%;
        background: #62748E;
        cursor: pointer;
        border: 2px solid #fff;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: all 0.15s ease;
      }
      .range-slider::-moz-range-thumb:hover {
        transform: scale(1.1);
        background: #4B5D78;
      }
      .range-slider::-moz-range-thumb:active {
        transform: scale(1.2);
        background: #3A4A61;
      }
      .range-slider::-webkit-slider-runnable-track {
        background: transparent;
        height: 4px;
      }
      .range-slider::-moz-range-track {
        background: transparent;
        height: 4px;
      }
      .range-slider:focus {
        outline: none;
      }
      .range-slider:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px rgba(98, 116, 142, 0.3);
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleMinChange = (e) => {
    lastActiveSlider.current = 'min';
    const raw = Number(e.target.value);
    const nextMin = clamp(raw, min, curMaxVal - MIN_GAP);
    
    if (nextMin !== curMinVal && typeof onChange === "function") {
      onChange([nextMin, curMaxVal]);
    }
  };

  const handleMaxChange = (e) => {
    lastActiveSlider.current = 'max';
    const raw = Number(e.target.value);
    const nextMax = clamp(raw, curMinVal + MIN_GAP, max);
    
    if (nextMax !== curMaxVal && typeof onChange === "function") {
      onChange([curMinVal, nextMax]);
    }
  };

  const isClose = Math.abs(curMaxVal - curMinVal) <= MIN_GAP;
  
  const minZIndex = lastActiveSlider.current === 'min' || (isClose && curMinVal > min) ? 40 : 30;
  const maxZIndex = lastActiveSlider.current === 'max' || (isClose && curMaxVal < max) ? 40 : 30;

  const left = `${minPercent}%`;
  const width = `${Math.max(0, maxPercent - minPercent)}%`;

  return (
    <div className="relative w-full py-2">
      <div className="relative h-8">
        <div className="absolute w-full h-1 bg-gray-300 rounded top-3.5"></div>

        <div
          className="absolute h-1 bg-slate-600 rounded top-3.5"
          style={{ left, width }}
        />

        <input
          aria-label="Minimum price"
          type="range"
          min={min}
          max={max}
          value={curMinVal}
          onChange={handleMinChange}
          className="absolute w-full h-4 bg-transparent appearance-none cursor-pointer range-slider"
          disabled={disabled}
          style={{ zIndex: minZIndex }}
          onMouseDown={() => lastActiveSlider.current = 'min'}
          onTouchStart={() => lastActiveSlider.current = 'min'}
        />

        <input
          aria-label="Maximum price"
          type="range"
          min={min}
          max={max}
          value={curMaxVal}
          onChange={handleMaxChange}
          className="absolute w-full h-4 bg-transparent appearance-none cursor-pointer range-slider"
          disabled={disabled}
          style={{ zIndex: maxZIndex }}
          onMouseDown={() => lastActiveSlider.current = 'max'}
          onTouchStart={() => lastActiveSlider.current = 'max'}
        />

        <div className="absolute flex justify-between w-full text-xs text-gray-500 mt-6">
          <span>₹{min}</span>
          <span>₹{max}</span>
        </div>
      </div>

    </div>
  );
};

export default React.memo(PriceRangeSlider);
