import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  variant?: 'matrix' | 'hexgrid' | 'scanlines' | 'particles';
  opacity?: number;
}

export default function AnimatedBackground({ 
  variant = 'hexgrid', 
  opacity = 0.2 
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Advanced VFX: Hexagonal Grid with Depth
    const drawHexGrid = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      const hexSize = 30;
      const cols = Math.ceil(width / (hexSize * 1.5)) + 2;
      const rows = Math.ceil(height / (hexSize * Math.sqrt(3))) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hexSize * 1.5 + (row % 2) * hexSize * 0.75;
          const y = row * hexSize * Math.sqrt(3);

          // Create depth effect with time
          const distance = Math.sqrt((x - width/2) ** 2 + (y - height/2) ** 2);
          const wave = Math.sin(distance * 0.01 - time * 0.001) * 0.5 + 0.5;
          const pulse = Math.sin(time * 0.002 + col * 0.1 + row * 0.1) * 0.3 + 0.7;
          
          const alpha = opacity * wave * pulse * 0.4;

          // Draw hexagon
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + hexSize * Math.cos(angle);
            const hy = y + hexSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();

          // Add glow to some hexagons
          if (wave > 0.8 && pulse > 0.9) {
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, hexSize);
            gradient.addColorStop(0, `rgba(212, 175, 55, ${opacity * 0.3})`);
            gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        }
      }

      // Add scan lines
      const scanY = (time * 0.1) % height;
      const scanGradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
      scanGradient.addColorStop(0, 'rgba(212, 175, 55, 0)');
      scanGradient.addColorStop(0.5, `rgba(212, 175, 55, ${opacity * 0.3})`);
      scanGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = scanGradient;
      ctx.fillRect(0, scanY - 50, width, 100);

      time += 16;
      animationFrameId = requestAnimationFrame(drawHexGrid);
    };

    // Matrix-style falling code
    const drawMatrix = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      const fontSize = 14;
      const columns = Math.floor(width / fontSize);
      const drops: number[] = Array.from({ length: columns }, () => Math.random() * height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;

      for (let i = 0; i < drops.length; i++) {
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.3;
      }

      time += 16;
      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    // Advanced particle system with trails
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      trail: Array<{ x: number; y: number }>;
    }> = [];

    const drawParticles = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, width, height);

      // Spawn new particles
      if (particles.length < 100 && Math.random() > 0.9) {
        const edge = Math.floor(Math.random() * 4);
        let x, y, vx, vy;
        
        switch(edge) {
          case 0: x = Math.random() * width; y = 0; vx = (Math.random() - 0.5) * 2; vy = Math.random() * 2 + 1; break;
          case 1: x = width; y = Math.random() * height; vx = -(Math.random() * 2 + 1); vy = (Math.random() - 0.5) * 2; break;
          case 2: x = Math.random() * width; y = height; vx = (Math.random() - 0.5) * 2; vy = -(Math.random() * 2 + 1); break;
          default: x = 0; y = Math.random() * height; vx = Math.random() * 2 + 1; vy = (Math.random() - 0.5) * 2;
        }

        particles.push({
          x, y, vx, vy,
          life: 0,
          maxLife: 100 + Math.random() * 100,
          trail: []
        });
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > 15) p.trail.pop();

        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Draw trail
        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let j = 0; j < p.trail.length; j++) {
          const alpha = (1 - j / p.trail.length) * opacity * 0.6;
          ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
          if (j === 0) ctx.moveTo(p.trail[j].x, p.trail[j].y);
          else ctx.lineTo(p.trail[j].x, p.trail[j].y);
        }
        ctx.stroke();

        // Draw particle
        const alpha = (1 - p.life / p.maxLife) * opacity;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 4);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${alpha})`);
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.x < -50 || p.x > width + 50 || p.y < -50 || p.y > height + 50) {
          particles.splice(i, 1);
        }
      }

      time += 16;
      animationFrameId = requestAnimationFrame(drawParticles);
    };

    // Cinematic scan lines
    const drawScanlines = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      // Horizontal scan lines
      for (let y = 0; y < height; y += 4) {
        const alpha = Math.sin(y * 0.1 + time * 0.01) * 0.02 + 0.03;
        ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Traveling vertical bars
      const barCount = 5;
      for (let i = 0; i < barCount; i++) {
        const x = ((time * 0.05 + i * width / barCount) % width);
        const barGradient = ctx.createLinearGradient(x - 50, 0, x + 50, 0);
        barGradient.addColorStop(0, 'rgba(212, 175, 55, 0)');
        barGradient.addColorStop(0.5, `rgba(212, 175, 55, ${opacity * 0.4})`);
        barGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = barGradient;
        ctx.fillRect(x - 50, 0, 100, height);
      }

      // Grid overlay
      const gridSize = 60;
      ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.15})`;
      ctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      time += 16;
      animationFrameId = requestAnimationFrame(drawScanlines);
    };

    // Start animation based on variant
    if (variant === 'matrix') {
      drawMatrix();
    } else if (variant === 'scanlines') {
      drawScanlines();
    } else if (variant === 'particles') {
      drawParticles();
    } else {
      drawHexGrid();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [variant, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
}
