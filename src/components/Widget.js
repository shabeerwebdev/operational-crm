import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

import React from "react";

function Widget({ title, ticketCount, pathColor, icon }) {
  console.log(ticketCount);

  return (
    <div
      className="d-flex flex-column gap-3 text-center"
      style={{ width: 130 }}
    >
      <CircularProgressbarWithChildren
        value={ticketCount}
        // text={`${ticketCount}%`}
        styles={buildStyles({
          textSize: "14px",
          pathTransitionDuration: 0.5,
          textColor: `black`,
          backgroundColor: "red",
          trail: {
            stroke: "#00ff00",
            strokeLinecap: "butt",
            transform: "rotate(0.25turn)",
            transformOrigin: "center center",
          },
        })}
      >
        <i className={`bi bi-${icon} fs-2 text-${pathColor} `}></i>
        <div className="mt-1" style={{ fontSize: 13, marginTop: -5 }}>
          <strong>{ticketCount}%</strong> mate
        </div>
      </CircularProgressbarWithChildren>
      <strong className="text-muted">{title}</strong>
    </div>
  );
}

export default Widget;
