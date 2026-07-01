"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  "main > section",
  ".page-hero",
  ".area-card",
  ".content-card",
  ".technology-card",
  ".roadmap-card",
  ".home-panel",
  ".career-section",
  ".glossary-entry",
  ".result-area"
].join(",");

const depthSelector = [
  ".area-card",
  ".technology-card",
  ".roadmap-card",
  ".home-panel",
  ".content-card",
  ".reference-link"
].join(",");

export function MotionSystem() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("page-leaving");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = [...document.querySelectorAll<HTMLElement>(revealSelector)];
    const depthItems = [...document.querySelectorAll<HTMLElement>(depthSelector)];

    revealItems.forEach((item, index) => {
      item.classList.add("reveal-item");
      item.style.setProperty("--reveal-delay", `${(index % 5) * 45}ms`);
    });
    depthItems.forEach((item) => item.classList.add("has-depth"));

    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: "20px 0px -7% 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));

    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const card = (event.target as Element).closest<HTMLElement>(".has-depth");
      const magnetic = (event.target as Element).closest<HTMLElement>(".button, .search-trigger");
      if (card) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;
          card.style.setProperty("--card-rx", `${(0.5 - py) * 5}deg`);
          card.style.setProperty("--card-ry", `${(px - 0.5) * 6}deg`);
          card.style.setProperty("--shine-x", `${px * 100}%`);
          card.style.setProperty("--shine-y", `${py * 100}%`);
        });
      }
      if (magnetic) {
        const rect = magnetic.getBoundingClientRect();
        magnetic.style.translate = `${(event.clientX - rect.left - rect.width / 2) * 0.09}px ${(event.clientY - rect.top - rect.height / 2) * 0.12}px`;
      }
    };
    const leave = (event: PointerEvent) => {
      const card = (event.target as Element).closest<HTMLElement>(".has-depth");
      if (card && !card.contains(event.relatedTarget as Node)) {
        card.style.setProperty("--card-rx", "0deg");
        card.style.setProperty("--card-ry", "0deg");
        card.style.setProperty("--shine-x", "50%");
        card.style.setProperty("--shine-y", "50%");
      }
      const magnetic = (event.target as Element).closest<HTMLElement>(".button, .search-trigger");
      if (magnetic && !magnetic.contains(event.relatedTarget as Node)) magnetic.style.translate = "0 0";
    };
    const routeExit = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.origin !== location.origin || link.hash) return;
      if (link.pathname !== location.pathname) document.documentElement.classList.add("page-leaving");
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    document.addEventListener("click", routeExit);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("click", routeExit);
      document.documentElement.classList.remove("motion-ready");
      document.documentElement.classList.remove("page-leaving");
    };
  }, [pathname]);

  return null;
}
