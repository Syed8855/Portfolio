"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, FileText } from "lucide-react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hint = hintRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const LAYERS = [3, 5, 8, 5, 3];
    const LC = LAYERS.length;
    const SPREAD_X = 2.6;
    const SPREAD_Y = 1.1;
    const SPREAD_Z = 1.2;
    const FOV = 5.5;

    interface Node3D {
      x: number;
      y: number;
      z: number;
      pulse: number;
      active: number;
    }
    interface Edge {
      a: number;
      b: number;
    }
    interface Particle {
      ai: number;
      bi: number;
      t: number;
      speed: number;
    }

    const nodes: Node3D[] = [];
    const edges: Edge[] = [];
    const layerStart: number[] = [];

    LAYERS.forEach((count, li) => {
      layerStart.push(nodes.length);
      const cx = (li - (LC - 1) / 2) * SPREAD_X;
      for (let ni = 0; ni < count; ni++) {
        nodes.push({
          x: cx,
          y: (ni - (count - 1) / 2) * SPREAD_Y,
          z: (Math.random() - 0.5) * SPREAD_Z,
          pulse: Math.random() * Math.PI * 2,
          active: 0,
        });
      }
    });

    LAYERS.forEach((count, li) => {
      if (li === LC - 1) return;
      const nextCount = LAYERS[li + 1];
      for (let ni = 0; ni < count; ni++)
        for (let nj = 0; nj < nextCount; nj++)
          edges.push({ a: layerStart[li] + ni, b: layerStart[li + 1] + nj });
    });

    let W = 0,
      H = 0;
    let rotX = 0.22,
      rotY = -0.35;
    let autoRotY = -0.35;
    let targetRotX = rotX,
      targetRotY = rotY;
    let hovering = false;
    let mouseX = 0,
      mouseY = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let rafId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (px: number, py: number, pz: number, rx: number, ry: number) => {
      const cosY = Math.cos(ry),
        sinY = Math.sin(ry);
      const x1 = px * cosY + pz * sinY;
      const z1 = -px * sinY + pz * cosY;
      const cosX = Math.cos(rx),
        sinX = Math.sin(rx);
      const y2 = py * cosX - z1 * sinX;
      const z2 = py * sinX + z1 * cosX;
      const scale = FOV / (FOV + z2 + 2);
      return {
        sx: W / 2 + x1 * scale * (W * 0.13),
        sy: H / 2 + y2 * scale * (H * 0.13),
        scale,
        z: z2,
      };
    };

    const spawn = () => {
      const li = Math.floor(Math.random() * (LC - 1));
      const ni = Math.floor(Math.random() * LAYERS[li]);
      const nj = Math.floor(Math.random() * LAYERS[li + 1]);
      particles.push({
        ai: layerStart[li] + ni,
        bi: layerStart[li + 1] + nj,
        t: 0,
        speed: 0.0032 + Math.random() * 0.003,
      });
    };

    const onEnter = () => {
      hovering = true;
      if (hint) hint.style.opacity = "0";
    };
    const onLeave = () => {
      hovering = false;
      if (hint) hint.style.opacity = "1";
    };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width - 0.5;
      mouseY = (e.clientY - r.top) / r.height - 0.5;
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseX = (t.clientX - r.left) / r.width - 0.5;
      mouseY = (t.clientY - r.top) / r.height - 0.5;
      hovering = true;
    };
    const onTouchEnd = () => {
      hovering = false;
    };

    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("touchmove", onTouch, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      frame++;
      ctx.clearRect(0, 0, W, H);

      if (hovering) {
        targetRotY = mouseX * 1.4;
        targetRotX = mouseY * 0.9;
      } else {
        autoRotY += 0.0025;
        targetRotY = autoRotY;
        targetRotX = 0.18 + Math.sin(frame * 0.003) * 0.06;
      }
      rotY += (targetRotY - rotY) * 0.06;
      rotX += (targetRotX - rotX) * 0.06;

      if (frame % 22 === 0 && particles.length < 16) spawn();

      const proj = nodes.map((n) => project(n.x, n.y, n.z, rotX, rotY));

      edges
        .slice()
        .sort((ea, eb) => proj[ea.a].z + proj[ea.b].z - (proj[eb.a].z + proj[eb.b].z))
        .forEach((e) => {
          const pa = proj[e.a],
            pb = proj[e.b];
          const avgZ = (pa.z + pb.z) / 2;
          const alpha = Math.max(0.018, 0.032 - avgZ * 0.014);
          ctx.beginPath();
          ctx.moveTo(pa.sx, pa.sy);
          ctx.lineTo(pb.sx, pb.sy);
          ctx.strokeStyle = `rgba(122,162,214,${alpha})`;
          ctx.lineWidth = 0.55;
          ctx.stroke();
        });

      particles = particles.filter((p) => p.t <= 1);
      particles.forEach((p) => {
        p.t += p.speed;
        const fade = p.t < 0.15 ? p.t / 0.15 : p.t > 0.82 ? (1 - p.t) / 0.18 : 1;
        const pa = proj[p.ai],
          pb = proj[p.bi];
        const x = pa.sx + (pb.sx - pa.sx) * p.t;
        const y = pa.sy + (pb.sy - pa.sy) * p.t;
        const sc = pa.scale + (pb.scale - pa.scale) * p.t;

        if (p.t > 0.88) {
          nodes[p.bi].active = 1;
          setTimeout(() => {
            if (nodes[p.bi]) nodes[p.bi].active = 0;
          }, 280);
        }

        const gl = ctx.createLinearGradient(pa.sx, pa.sy, x, y);
        gl.addColorStop(0, "rgba(122,162,214,0)");
        gl.addColorStop(1, `rgba(122,162,214,${fade * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gl;
        ctx.lineWidth = 1.4 * sc;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 2.2 * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,205,235,${fade})`;
        ctx.fill();
      });

      nodes
        .map((n, i) => ({ n, i, z: proj[i].z }))
        .sort((a, b) => a.z - b.z)
        .forEach(({ n, i }) => {
          const p = proj[i];
          n.pulse += 0.016;
          const glow = Math.min(1, 0.28 + Math.sin(n.pulse) * 0.14 + (n.active ? 0.7 : 0));
          const r = (3.8 + p.scale * 2) * p.scale;

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(122,162,214,${glow * 0.22})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(122,162,214,${glow})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 0.42, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(215,230,248,${glow * 0.95})`;
          ctx.fill();
        });
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <section className="hero-section" id="top">
      <div className="hero-glow" />

      <div className="hero-body">
        <div className="hero-copy">
          <div className="hero-status">
            <span className="avail-dot" />
            <span className="avail-text">
              Available for collaboration
            </span>
          </div>

          <h1 className="hero-title">
            Syed<br />Hasnain<br />Peeran
          </h1>

          <p className="hero-role">
            ML Engineer · Backend Developer
          </p>

          <p className="hero-desc">
            Building systems at the intersection of language models and real-world APIs.
          </p>

          <div className="hero-actions">
            <a href="#work" className="btn-p">
              View projects
              <ArrowRight size={14} />
            </a>
            <a
              href="/documents/syed-hasnain-peeran-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-s"
            >
              <FileText size={14} />
              Résumé
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <canvas ref={canvasRef} className="hero-canvas" style={{ cursor: "crosshair" }} />
          <span ref={hintRef} className="hero-hint">
            hover to control
          </span>
        </div>
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
