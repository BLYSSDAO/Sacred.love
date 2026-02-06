import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  time: number;
}

export default function CursorTrail() {
  const isEligible = typeof window !== 'undefined' && 
    window.matchMedia('(pointer: fine)').matches && 
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!isEligible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 1,
        time: now
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const maxTrailLength = 50;
    const trailDuration = 400;
    
    const colors = [
      { r: 212, g: 175, b: 55 },  // BLYSS Gold
      { r: 168, g: 85, b: 247 },  // Vibrant purple
      { r: 59, g: 130, b: 246 },  // Electric blue
      { r: 139, g: 92, b: 246 },  // Deep violet
      { r: 96, g: 165, b: 250 },  // Sky blue
      { r: 192, g: 132, b: 252 }, // Lavender
      { r: 236, g: 72, b: 153 },  // Pink
      { r: 212, g: 175, b: 55 },  // Back to gold
    ];

    const animate = (currentTime: number) => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trailRef.current = trailRef.current.filter(point => {
        const age = currentTime - point.time;
        return age < trailDuration;
      });

      if (trailRef.current.length > maxTrailLength) {
        trailRef.current = trailRef.current.slice(-maxTrailLength);
      }

      if (trailRef.current.length > 1) {
        for (let i = 0; i < trailRef.current.length - 1; i++) {
          const current = trailRef.current[i];
          const next = trailRef.current[i + 1];
          const age = currentTime - current.time;
          const fadeProgress = age / trailDuration;
          const progress = i / (trailRef.current.length - 1);
          
          const lineWidth = 14 * (1 - fadeProgress * 0.7) * (1 - progress * 0.4);
          const alpha = (1 - fadeProgress) * (1 - progress * 0.3) * 0.8;
          
          if (alpha <= 0.01 || lineWidth <= 0.5) continue;
          
          const colorIndex = Math.floor(progress * (colors.length - 1));
          const nextColorIndex = Math.min(colorIndex + 1, colors.length - 1);
          const colorProgress = (progress * (colors.length - 1)) - colorIndex;
          
          const color1 = colors[colorIndex];
          const color2 = colors[nextColorIndex];
          
          const r = Math.round(color1.r + (color2.r - color1.r) * colorProgress);
          const g = Math.round(color1.g + (color2.g - color1.g) * colorProgress);
          const b = Math.round(color1.b + (color2.b - color1.b) * colorProgress);
          
          ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.shadowBlur = 30;
          
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          ctx.beginPath();
          ctx.moveTo(current.x, current.y);
          
          if (i < trailRef.current.length - 2) {
            const nextNext = trailRef.current[i + 2];
            const midX = (next.x + nextNext.x) / 2;
            const midY = (next.y + nextNext.y) / 2;
            ctx.quadraticCurveTo(next.x, next.y, midX, midY);
          } else {
            ctx.lineTo(next.x, next.y);
          }
          
          ctx.stroke();
          
          if (i % 3 === 0) {
            const glowSize = 25 * (1 - fadeProgress) * (1 - progress * 0.5);
            const glowGradient = ctx.createRadialGradient(
              next.x, next.y, 0,
              next.x, next.y, glowSize
            );
            glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`);
            glowGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`);
            glowGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
            
            ctx.shadowBlur = 0;
            ctx.fillStyle = glowGradient;
            ctx.beginPath();
            ctx.arc(next.x, next.y, glowSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isEligible]);

  if (!isEligible) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
