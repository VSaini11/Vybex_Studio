'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface VybexGameProps {
  onGameOver: (score: number) => void;
  status: 'IDLE' | 'PLAYING' | 'GAME_OVER';
}

export function VybexGame({ onGameOver, status }: VybexGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  
  // Game constants (Internal logical units)
  const BASE_WIDTH = 800;
  const BASE_HEIGHT = 400;
  const PLAYER_X = 100;
  const PLAYER_RADIUS = 15;
  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const INITIAL_SPEED = 6;
  const SPEED_INCREMENT = 0.0025;
  const MIN_SPAWN_INTERVAL = 800; // ms
  const MAX_SPAWN_INTERVAL = 2000; // ms

  // Track if we are on a mobile/low-perf device
  const [isLowPerf, setIsLowPerf] = useState(false);

  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsLowPerf(isMobile || window.innerWidth < 768);
  }, []);

  // Game state
  const gameState = useRef({
    playerY: BASE_HEIGHT - 50,
    playerVelocityY: 0,
    obstacles: [] as { x: number; width: number; height: number }[],
    speed: INITIAL_SPEED,
    score: 0,
    lastSpawnTime: 0,
    trail: [] as { x: number; y: number; opacity: number }[],
  });

  const jump = useCallback(() => {
    if (status !== 'PLAYING') return;
    if (gameState.current.playerY >= BASE_HEIGHT - 50 - 5) {
      gameState.current.playerVelocityY = JUMP_FORCE;
    }
  }, [status]);

  // Touch/Key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    
    // Keydown for desktop
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [jump]);

  const update = useCallback((dt: number) => {
    if (status !== 'PLAYING') return;

    // dt is time since last frame in ms. Normalize to ~60fps (16.67ms)
    const factor = dt / 16.67;
    const state = gameState.current;
    
    // Update player physics
    state.playerVelocityY += GRAVITY * factor;
    state.playerY += state.playerVelocityY * factor;
    
    // Ground collision
    if (state.playerY > BASE_HEIGHT - 50) {
      state.playerY = BASE_HEIGHT - 50;
      state.playerVelocityY = 0;
    }

    // Update speed and score
    state.speed += SPEED_INCREMENT * factor;
    state.score += 0.1 * factor;

    // Spawn obstacles (Time-based for consistency across frame rates)
    const now = Date.now();
    const currentDifficultyFactor = (state.speed - INITIAL_SPEED) / 5;
    const dynamicSpawnInterval = Math.max(
        MIN_SPAWN_INTERVAL, 
        MAX_SPAWN_INTERVAL - currentDifficultyFactor * 500
    );
    
    if (now - state.lastSpawnTime > dynamicSpawnInterval) {
      // Once interval passes, we spawn. No random frame check.
      state.obstacles.push({
        x: BASE_WIDTH + 50,
        width: 35 + Math.random() * 25,
        height: 45 + Math.random() * 65,
      });
      state.lastSpawnTime = now;
    }

    // Update trail (limit update frequency for performance)
    if (!state.trail) state.trail = [];
    state.trail.push({ x: PLAYER_X, y: state.playerY - 15, opacity: 0.6 });
    if (state.trail.length > (isLowPerf ? 8 : 15)) state.trail.shift();
    state.trail.forEach(t => t.opacity -= (isLowPerf ? 0.08 : 0.04) * factor);

    // Update obstacles
    for (let i = state.obstacles.length - 1; i >= 0; i--) {
      const obstacle = state.obstacles[i];
      obstacle.x -= state.speed * factor;

      // Collision detection (with padding)
      const playerLeft = PLAYER_X - PLAYER_RADIUS + 5;
      const playerRight = PLAYER_X + PLAYER_RADIUS - 5;
      const playerTop = state.playerY - PLAYER_RADIUS + 5;
      const playerBottom = state.playerY + PLAYER_RADIUS - 5;

      const obstacleLeft = obstacle.x + 5;
      const obstacleRight = obstacle.x + obstacle.width - 5;
      const obstacleTop = BASE_HEIGHT - 50 - obstacle.height + 5;

      if (
        playerRight > obstacleLeft &&
        playerLeft < obstacleRight &&
        playerBottom > obstacleTop
      ) {
        onGameOver(Math.floor(state.score));
        return;
      }

      if (obstacle.x + obstacle.width < 0) {
        state.obstacles.splice(i, 1);
      }
    }
  }, [status, onGameOver, isLowPerf]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.fillStyle = '#050805';
    ctx.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);
    
    const state = gameState.current;

    // Dynamic grid
    const speedFactor = Math.min(1, (state.speed - INITIAL_SPEED) / 10);
    const gridColor = `rgba(${34 + speedFactor * 100}, ${197 - speedFactor * 50}, ${94 - speedFactor * 50}, 0.07)`;
    
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // Draw horizontal grid lines (Reduced for mobile)
    const gridStep = isLowPerf ? 40 : 20;
    for (let i = 0; i < BASE_HEIGHT; i += gridStep) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(BASE_WIDTH, i);
      ctx.stroke();
    }
    
    // Draw vertical grid lines (moving, reduced for mobile)
    for (let i = 0; i < BASE_WIDTH + gridStep * 2; i += gridStep) {
      ctx.beginPath();
      const xOffset = (i - (state.score * state.speed) % gridStep);
      ctx.moveTo(xOffset, 0);
      ctx.lineTo(xOffset, BASE_HEIGHT);
      ctx.stroke();
    }

    // Draw Ground line
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, BASE_HEIGHT - 35);
    ctx.lineTo(BASE_WIDTH, BASE_HEIGHT - 35);
    ctx.stroke();

    // Draw obstacles
    state.obstacles.forEach((obstacle) => {
      if (!isLowPerf) {
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
      }
      ctx.fillStyle = status === 'PLAYING' ? '#ef4444' : '#7f1d1d';
      
      ctx.beginPath();
      ctx.moveTo(obstacle.x, BASE_HEIGHT - 35);
      ctx.lineTo(obstacle.x + obstacle.width / 2, BASE_HEIGHT - 35 - obstacle.height);
      ctx.lineTo(obstacle.x + obstacle.width, BASE_HEIGHT - 35);
      ctx.closePath();
      ctx.fill();
    });

    if (!isLowPerf) ctx.shadowBlur = 0;

    // Draw player trail
    if (state.trail && state.trail.length > 0) {
      state.trail.forEach((t, i) => {
        ctx.fillStyle = `rgba(34, 197, 94, ${t.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(t.x - (state.trail.length - i) * 2, t.y, PLAYER_RADIUS * (i / state.trail.length), 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw player orb
    const orbColor = speedFactor > 0.6 ? '#fcd34d' : speedFactor > 0.3 ? '#86efac' : '#22c55e';
    if (!isLowPerf) {
        ctx.shadowBlur = status === 'PLAYING' ? 20 + Math.sin(state.score * 0.1) * 10 : 0;
        ctx.shadowColor = orbColor;
    }
    ctx.fillStyle = orbColor;
    ctx.beginPath();
    ctx.arc(PLAYER_X, state.playerY - 15, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    
    if (!isLowPerf) ctx.shadowBlur = 0;

    // Inner reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(PLAYER_X - 5, state.playerY - 20, 5, 0, Math.PI * 2);
    ctx.fill();

    // Score
    ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`TRANSYSTEMS: ${String(Math.floor(state.score)).padStart(6, '0')}`, BASE_WIDTH - 20, 40);

  }, [status, isLowPerf]);

  const loop = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      const deltaTime = time - lastTimeRef.current;
      const dt = Math.min(deltaTime, 100); 
      
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d', { alpha: false });
      if (ctx) {
        update(dt);
        draw(ctx);
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(loop);
  }, [update, draw]);

  useEffect(() => {
    if (status === 'PLAYING') {
      gameState.current = {
        playerY: BASE_HEIGHT - 50,
        playerVelocityY: 0,
        obstacles: [],
        speed: INITIAL_SPEED,
        score: 0,
        lastSpawnTime: Date.now(),
        trail: [],
      };
      lastTimeRef.current = performance.now();
    }
  }, [status]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [loop]);

  return (
    <div className="relative w-full max-w-[800px] aspect-[2/1] bg-[#050805] rounded-xl sm:rounded-3xl overflow-hidden border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.1)] transition-all">
        <div className="absolute inset-0 pointer-events-none z-10 opacity-5 sm:opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        
        <canvas
            ref={canvasRef}
            width={BASE_WIDTH}
            height={BASE_HEIGHT}
            onClick={jump}
            onTouchStart={(e) => {
              if (status === 'PLAYING') {
                e.preventDefault();
                jump();
              }
            }}
            className="w-full h-full cursor-pointer touch-none"
        />
        
        {status === 'PLAYING' && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-green-500/40 pointer-events-none whitespace-nowrap">
                {isLowPerf ? '[ Tap ] to Boost' : '[ Space / Click ] to Boost'}
            </div>
        )}
    </div>
  );
}
