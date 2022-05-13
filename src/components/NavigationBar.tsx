import React from "react";
import SimpletLink from "./SimpletLink";

function NavigationBar() {
  return (
    <div className="bg-blue-400  h-20 flex justify-around py-5">
      <SimpletLink path="/paintings" text="Pinturas" />
      <SimpletLink path="/" text="Colecciones de arte" />
    </div>
  );
}

export default NavigationBar;
