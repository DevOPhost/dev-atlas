"use client";

import Link from "next/link";
import { useState } from "react";
import type { Area } from "@/lib/content-types";
import { t, type Locale } from "@/lib/i18n";
import { AreaIcon } from "./icons";

export function OrbitScene({ areas, locale }: { areas: Area[]; locale: Locale }) {
  const [tilt, setTilt] = useState({ x: -7, y: 4 });
  const outer = areas.slice(0, 3);
  const inner = areas.slice(3, 5);

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -7 - y * 9, y: 4 + x * 11 });
  };

  return (
    <div
      className="orbit-stage"
      onPointerMove={move}
      onPointerLeave={() => setTilt({ x: -7, y: 4 })}
      style={{ "--scene-rx": `${tilt.x}deg`, "--scene-ry": `${tilt.y}deg` } as React.CSSProperties}
      aria-label={locale === "pt" ? "Mapa 3D interativo das áreas de tecnologia" : locale === "en" ? "Interactive 3D map of technology fields" : "Mapa 3D interactivo de áreas tecnológicas"}
    >
      <div className="orbit-ambient" />
      <div className="orbit-scene">
        <div className="orbit-plane orbit-plane-outer">
          <div className="orbit-line" />
          {outer.map((area, index) => {
            const angle = index * 120 - 90;
            return (
              <div className="orbit-anchor" key={area.id} style={{ "--angle": `${angle}deg`, "--counter-angle": `${-angle}deg` } as React.CSSProperties}>
                <div className="orbit-node-keeper">
                  <Link className="orbit-node" href={`/${locale}/areas/${area.id}`} style={{ "--node-accent": area.accent } as React.CSSProperties}>
                    <AreaIcon name={area.icon} size={24} /><span>{t(area.name, locale)}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="orbit-plane orbit-plane-inner">
          <div className="orbit-line" />
          {inner.map((area, index) => {
            const angle = index * 180 + 25;
            return (
              <div className="orbit-anchor" key={area.id} style={{ "--angle": `${angle}deg`, "--counter-angle": `${-angle}deg` } as React.CSSProperties}>
                <div className="orbit-node-keeper">
                  <Link className="orbit-node compact" href={`/${locale}/areas/${area.id}`} style={{ "--node-accent": area.accent } as React.CSSProperties}>
                    <AreaIcon name={area.icon} size={21} /><span>{t(area.name, locale)}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <Link className="atlas-core" href={`/${locale}/explorar`}>
          <span className="atlas-globe" aria-hidden="true"><i /><i /><i /></span>
          <strong>DevAtlas</strong>
          <small>{locale === "pt" ? "explorar" : locale === "en" ? "explore" : "explorar"}</small>
        </Link>
      </div>
      <span className="orbit-hint">{locale === "pt" ? "mova o cursor" : locale === "en" ? "move your cursor" : "mueve el cursor"}</span>
    </div>
  );
}
