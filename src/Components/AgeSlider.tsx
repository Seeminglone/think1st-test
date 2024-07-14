import React, { useState, useEffect } from "react";
import config from "../config";

interface CustomRangeSliderProps {
  value: number;
  onValueChange: (value: number) => void;
}

const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({
  value,
  onValueChange,
}) => {
  const { constants } = config;
  const { MAX, MIN, STEP, INITIAL_MARGIN_LEFT } = constants;

  const [marginLeft, setMarginLeft] = useState<number>(INITIAL_MARGIN_LEFT);

  useEffect(() => {
    const steps = Math.floor((value - MIN) / STEP);
    const newMarginLeft = INITIAL_MARGIN_LEFT - steps * 0.15;
    setMarginLeft(newMarginLeft);
  }, [value]); // eslint-disable-line

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onValueChange(newValue);
  };

  const leftPosition = `${((value - MIN) / (MAX - MIN)) * 100}%`;

  return (
    <div className="flex w-full m-auto items-center justify-center">
      <div className="py-1 relative min-w-full">
        <div className="flex justify-between mb-0">
          <div className="text-gray-800">
            <span style={{ fontWeight: 400, fontSize: "12px", marginLeft: "5px" }}>{MIN}</span>
          </div>
          <div className="text-gray-800">
            <span style={{ fontWeight: 400, fontSize: "12px" }}>{MAX}</span>
          </div>
        </div>
        <div className="relative">
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={value}
            onChange={handleChange}
            className="bg-gray-200 w-full cursor-pointer crange"
            style={{
              accentColor: "#761BE4",
              background: "#CBB6E5",
              border: "none",
              outline: "none",
              height: "10px",
            }}
          />
          <div
            className="absolute h-4 flex items-center justify-center w-4 border-gray-300 -ml-2 bottom-0 cursor-pointer"
            style={{ left: leftPosition }}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative mt-0 w-1">
              <div
                className="absolute z-40 opacity-100 top-100 mt-2 left-0 min-w-full"
                style={{ marginLeft: `${marginLeft}px` }}
              >
                <div className="relative shadow-md">
                  <svg
                    width="37"
                    height="31"
                    viewBox="0 0 37 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask id="path-1-inside-1_19_96" fill="white">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M22.3971 6L18.5 0L14.6029 6H4C1.79086 6 0 7.79086 0 10V27C0 29.2091 1.79086 31 4 31H33C35.2091 31 37 29.2091 37 27V10C37 7.79086 35.2091 6 33 6H22.3971Z"
                      />
                    </mask>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.3971 6L18.5 0L14.6029 6H4C1.79086 6 0 7.79086 0 10V27C0 29.2091 1.79086 31 4 31H33C35.2091 31 37 29.2091 37 27V10C37 7.79086 35.2091 6 33 6H22.3971Z"
                      fill="#FAF9FA"
                    />
                    <path
                      d="M18.5 0L19.3386 -0.544705L18.5 -1.83586L17.6614 -0.544705L18.5 0ZM22.3971 6L21.5585 6.5447L21.8542 7H22.3971V6ZM14.6029 6V7H15.1458L15.4415 6.5447L14.6029 6ZM17.6614 0.544705L21.5585 6.5447L23.2357 5.4553L19.3386 -0.544705L17.6614 0.544705ZM15.4415 6.5447L19.3386 0.544705L17.6614 -0.544705L13.7643 5.4553L15.4415 6.5447ZM4 7H14.6029V5H4V7ZM1 10C1 8.34315 2.34315 7 4 7V5C1.23858 5 -1 7.23858 -1 10H1ZM1 27V10H-1V27H1ZM4 30C2.34315 30 1 28.6569 1 27H-1C-1 29.7614 1.23858 32 4 32V30ZM33 30H4V32H33V30ZM36 27C36 28.6569 34.6569 30 33 30V32C35.7614 32 38 29.7614 38 27H36ZM36 10V27H38V10H36ZM33 7C34.6569 7 36 8.34315 36 10H38C38 7.23858 35.7614 5 33 5V7ZM22.3971 7H33V5H22.3971V7Z"
                      fill="#CBB6E5"
                      mask="url(#path-1-inside-1_19_96)"
                    />
                    <text
                      x="50%"
                      y="60%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fill="#761BE4"
                      fontSize="12px"
                      fontWeight="500"
                    >
                      {value}
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomRangeSlider;
