"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, FileText } from "lucide-react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef   = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hint   = hintRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const LAYERS    = [3, 5, 8, 5, 3];
    const LC        = LAYERS.length;
    const SPREAD_X  = 2.6;
    const SPREAD_Y  = 1.1;
    const SPREAD_Z  = 1.2;
    const FOV       = 5.5;

    interface Node3D  { x:number; y:number; z:number; pulse:number; active:number; }
    interface Edge     { a:number; b:number; }
    interface Particle { ai:number; bi:number; t:number; speed:number; }

    const nodes: Node3D[] = [];
    const edges: Edge[]   = [];
    const layerStart: number[] = [];

    LAYERS.forEach((count, li) => {
      layerStart.push(nodes.length);
      const cx = (li - (LC - 1) / 2) * SPREAD_X;
      for (let ni = 0; ni < count; ni++) {
        nodes.push({
          x: cx,
          y: (ni - (count - 1) / 2) * SPREAD_Y,
          z: (Math.random() - 0.5) * SPREAD_Z,
          pulse:  Math.random() * Math.PI * 2,
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

    let W = 0, H = 0;
    let rotX = 0.22,  rotY = -0.35;
    let autoRotY = -0.35;
    let targetRotX = rotX, targetRotY = rotY;
    let hovering = false;
    let mouseX = 0, mouseY = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let rafId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const project = (px: number, py: number, pz: number, rx: number, ry: number) => {
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x1 =  px * cosY + pz * sinY;
      const z1 = -px * sinY + pz * cosY;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y2 =  py * cosX - z1 * sinX;
      const z2 =  py * sinX + z1 * cosX;
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
        t:  0,
        speed: 0.0032 + Math.random() * 0.003,
      });
    };

    const onEnter = () => { hovering = true;  if (hint) hint.style.opacity = "0"; };
    const onLeave = () => { hovering = false; if (hint) hint.style.opacity = "1"; };
    const onMove  = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = (e.clientX - r.left) / r.width  - 0.5;
      mouseY = (e.clientY - r.top)  / r.height - 0.5;
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseX = (t.clientX - r.left) / r.width  - 0.5;
      mouseY = (t.clientY - r.top)  / r.height - 0.5;
      hovering = true;
    };
    const onTouchEnd = () => { hovering = false; };

    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("touchmove",  onTouch,    { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd);

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

      const proj = nodes.map(n => project(n.x, n.y, n.z, rotX, rotY));

      edges
        .slice()
        .sort((ea, eb) => (proj[ea.a].z + proj[ea.b].z) - (proj[eb.a].z + proj[eb.b].z))
        .forEach(e => {
          const pa = proj[e.a], pb = proj[e.b];
          const avgZ = (pa.z + pb.z) / 2;
          const alpha = Math.max(0.018, 0.028 - avgZ * 0.012);
          ctx.beginPath();
          ctx.moveTo(pa.sx, pa.sy);
          ctx.lineTo(pb.sx, pb.sy);
          ctx.strokeStyle = `rgba(140,180,255,${alpha})`;
          ctx.lineWidth   = 0.55;
          ctx.stroke();
        });

      particles = particles.filter(p => p.t <= 1);
      particles.forEach(p => {
        p.t += p.speed;
        const fade = p.t < 0.15 ? p.t / 0.15 : p.t > 0.82 ? (1 - p.t) / 0.18 : 1;
        const pa = proj[p.ai], pb = proj[p.bi];
        const x  = pa.sx + (pb.sx - pa.sx) * p.t;
        const y  = pa.sy + (pb.sy - pa.sy) * p.t;
        const sc = pa.scale + (pb.scale - pa.scale) * p.t;

        if (p.t > 0.88) {
          nodes[p.bi].active = 1;
          setTimeout(() => { if (nodes[p.bi]) nodes[p.bi].active = 0; }, 280);
        }

        const gl = ctx.createLinearGradient(pa.sx, pa.sy, x, y);
        gl.addColorStop(0, "rgba(60,120,255,0)");
        gl.addColorStop(1, `rgba(100,170,255,${fade * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gl;
        ctx.lineWidth   = 1.4 * sc;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 2.2 * sc, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,210,255,${fade})`;
        ctx.fill();
      });

      nodes
        .map((n, i) => ({ n, i, z: proj[i].z }))
        .sort((a, b) => a.z - b.z)
        .forEach(({ n, i }) => {
          const p = proj[i];
          n.pulse += 0.016;
          const glow = Math.min(1, 0.28 + Math.sin(n.pulse) * 0.14 + (n.active ? 0.7 : 0));
          const r    = (3.8 + p.scale * 2) * p.scale;

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(80,140,255,${glow * 0.22})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(80,150,255,${glow})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r * 0.42, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,230,255,${glow * 0.95})`;
          ctx.fill();
        });
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("touchmove",  onTouch);
      canvas.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <section className="relative min-h-[100dvh] bg-[#030508] overflow-hidden flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap');
        .avail-dot {
          width:6px; height:6px; border-radius:50%;
          background:#4ade80; flex-shrink:0;
          animation: ping-green 2.4s ease-in-out infinite;
        }
        @keyframes ping-green {
          0%,100% { box-shadow:0 0 0 0 rgba(74,222,128,.55); }
          50%      { box-shadow:0 0 0 5px rgba(74,222,128,0); }
        }
        .scroll-line {
          width:1px; height:34px;
          background:linear-gradient(to bottom,rgba(255,255,255,.25),transparent);
          animation:sp 2s ease-in-out infinite;
        }
        @keyframes sp {
          0%,100% { opacity:.35; transform:scaleY(1); }
          50%      { opacity:.9;  transform:scaleY(1.1); }
        }
        .btn-p {
          display:inline-flex; align-items:center; gap:8px;
          background:#fff; color:#030508;
          border-radius:9999px; padding:11px 22px;
          font-family:'Geist',sans-serif; font-size:.85rem; font-weight:500;
          text-decoration:none; letter-spacing:.01em;
          transition:background 180ms, transform 100ms;
        }
        .btn-p:hover  { background:rgba(255,255,255,.88); }
        .btn-p:active { transform:scale(.98); }
        .btn-s {
          display:inline-flex; align-items:center; gap:8px;
          border:1px solid rgba(255,255,255,.12);
          border-radius:9999px; padding:11px 22px;
          color:rgba(255,255,255,.6);
          font-family:'Geist',sans-serif; font-size:.85rem; font-weight:400;
          text-decoration:none;
          transition:border-color 180ms, color 180ms, transform 100ms;
        }
        .btn-s:hover  { border-color:rgba(255,255,255,.32); color:#fff; }
        .btn-s:active { transform:scale(.98); }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 40% 50% at 75% 45%, rgba(30,80,180,0.09) 0%, transparent 60%)",
            "radial-gradient(ellipse 25% 30% at 20% 80%, rgba(10,40,100,0.06) 0%, transparent 55%)",
          ].join(","),
        }}
      />

      <nav className="relative z-20 flex items-center justify-between px-12 pt-7">
        <span style={{ fontFamily:"'Geist',sans-serif", fontWeight:500, fontSize:".875rem", color:"rgba(255,255,255,.92)", letterSpacing:".04em" }}>
          SHP
        </span>
        <div className="flex items-center gap-8">
          {["Work","About","Contact"].map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ fontFamily:"'Geist',sans-serif", fontSize:".75rem", fontWeight:400, color:"rgba(255,255,255,.38)", letterSpacing:".05em", textDecoration:"none", transition:"color 180ms" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,.85)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.38)")}
            >
              {l}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 items-center px-12 pb-10 pt-6 gap-4">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-7">
            <span className="avail-dot" />
            <span style={{ fontFamily:"'Geist',sans-serif", fontSize:".67rem", fontWeight:400, color:"rgba(255,255,255,.35)", letterSpacing:".14em", textTransform:"uppercase" }}>
              Available for collaboration
            </span>
          </div>

          <h1
            style={{
              fontFamily:"'Geist',sans-serif",
              fontSize:"clamp(2.8rem,4.8vw,4.8rem)",
              fontWeight:600, color:"#fff",
              lineHeight:.98, letterSpacing:"-.035em",
              marginBottom:"14px",
            }}
          >
            Syed<br />Hasnain<br />Peeran
          </h1>

          <p style={{
            fontFamily:"'Geist',sans-serif",
            fontSize:"clamp(.64rem,.9vw,.74rem)",
            fontWeight:300,
            color:"rgba(100,170,255,.65)",
            letterSpacing:".22em", textTransform:"uppercase",
            marginBottom:"24px",
          }}>
            ML Engineer · Backend Developer
          </p>

          <p style={{
            fontFamily:"'Geist',sans-serif",
            fontSize:".97rem", fontWeight:300,
            lineHeight:1.78, color:"rgba(255,255,255,.35)",
            maxWidth:"320px", marginBottom:"36px",
          }}>
            Building systems at the intersection of language models and real-world APIs.
          </p>

          <div className="flex items-center gap-3 flex-wrap">
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

        <div className="relative hidden lg:flex items-center justify-center" style={{ height:"500px" }}>
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ cursor:"crosshair" }}
          />
          <span
            ref={hintRef}
            style={{
              position:"absolute", bottom:"12px", left:"50%", transform:"translateX(-50%)",
              fontFamily:"'Geist',sans-serif",
              fontSize:".6rem", fontWeight:400,
              color:"rgba(255,255,255,.18)", letterSpacing:".1em", textTransform:"uppercase",
              pointerEvents:"none", transition:"opacity 400ms",
            }}
          >
            hover to control
          </span>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-6">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
