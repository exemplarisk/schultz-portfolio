import React from "react";

type SignalBadgeProps = {
  className?: string;
};

const SignalBadge = ({ className }: SignalBadgeProps) => {
  return (
    <div className={`signalBadge ${className ?? ""}`.trim()} aria-hidden="true">
      <div className="signalBadge__grid" />
      <div className="signalBadge__core" />
      <div className="signalBadge__ring" />
    </div>
  );
};

export default SignalBadge;
