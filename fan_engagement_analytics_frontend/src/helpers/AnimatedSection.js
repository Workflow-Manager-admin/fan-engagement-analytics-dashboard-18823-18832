import React from "react";

// PUBLIC_INTERFACE
function AnimatedSection({ children, className = "", open = true, ...props }) {
  return (
    <section
      className={`animated-section${open ? " open" : " closed"} ${className}`}
      tabIndex={0}
      {...props}
      aria-hidden={!open}
      aria-expanded={open}
    >
      {children}
    </section>
  );
}

export default AnimatedSection;
