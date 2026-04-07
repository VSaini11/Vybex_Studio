'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface VybexGameProps {
  onGameOver: (score: number) => void;
  status: 'IDLE' | 'PLAYING' | 'GAME_OVER';
}

export function VybexGame({ onGameOver, status }: VybexGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  
  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 400;
  const PLAYER_X = 100;
  const PLAYER_RADIUS = 15;
  const GRAVITY = 0.6;
  const JUMP_FORCE = -12;
  const INITIAL_SPEED = 5;
  const SPEED_INCREMENT = 0.002; // Doubled from 0.001
  const OBSTACLE_SPAWN_CHANCE = 0.02;

  // Game state (refs for the game loop to avoid React overhead)
  const gameState = useRef({
    playerY: CANVAS_HEIGHT - 50,
    playerVelocityY: 0,
    obstacles: [] as { x: number; width: number; height: number }[],
    speed: INITIAL_SPEED,
    score: 0,
    lastSpawnTime: 0,
    trail: [] as { x: number; y: number; opacity: number }[],
  });

  const jump = useCallback(() => {
    if (status !== 'PLAYING') return;
    
    // Only jump if we're on the ground or close to it
    if (gameState.current.playerY >= CANVAS_HEIGHT - 50 - 5) {
      gameState.current.playerVelocityY = JUMP_FORCE;
    }
  }, [status]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  const update = useCallback(() => {
    if (status !== 'PLAYING') return;

    const state = gameState.current;
    
    // Update player physics
    state.playerVelocityY += GRAVITY;
    state.playerY += state.playerVelocityY;
    
    // Ground collision
    if (state.playerY > CANVAS_HEIGHT - 50) {
      state.playerY = CANVAS_HEIGHT - 50;
      state.playerVelocityY = 0;
    }

    // Update speed
    state.speed += SPEED_INCREMENT;
    state.score += 0.1;

    // Spawn obstacles
    const now = Date.now();
    const spawnDelay = Math.max(800, 1500 - (state.speed - INITIAL_SPEED) * 100);
    if (now - state.lastSpawnTime > spawnDelay && Math.random() < OBSTACLE_SPAWN_CHANCE) {
      state.obstacles.push({
        x: CANVAS_WIDTH,
        width: 30 + Math.random() * 20,
        height: 40 + Math.random() * 60,
      });
      state.lastSpawnTime = now;
    }

    // Update trail
    if (!state.trail) state.trail = [];
    state.trail.push({ x: PLAYER_X, y: state.playerY - 15, opacity: 0.6 });
    if (state.trail.length > 15) state.trail.shift();
    state.trail.forEach(t => t.opacity -= 0.04);

    // Update obstacles
    for (let i = state.obstacles.length - 1; i >= 0; i--) {
      const obstacle = state.obstacles[i];
      obstacle.x -= state.speed;

      // Collision detection
      const playerLeft = PLAYER_X - PLAYER_RADIUS + 5;
      const playerRight = PLAYER_X + PLAYER_RADIUS - 5;
      const playerTop = state.playerY - PLAYER_RADIUS + 5;
      const playerBottom = state.playerY + PLAYER_RADIUS - 5;

      const obstacleLeft = obstacle.x + 5;
      const obstacleRight = obstacle.x + obstacle.width - 5;
      const obstacleTop = CANVAS_HEIGHT - 50 - obstacle.height + 5;

      if (
        playerRight > obstacleLeft &&
        playerLeft < obstacleRight &&
        playerBottom > obstacleTop
      ) {
        onGameOver(Math.floor(state.score));
        return;
      }

      // Remove off-screen obstacles
      if (obstacle.x + obstacle.width < 0) {
        state.obstacles.splice(i, 1);
      }
    }
  }, [status, onGameOver]);

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const state = gameState.current;

    // Dynamic grid color based on speed
    const speedFactor = Math.min(1, (state.speed - INITIAL_SPEED) / 10);
    const gridColor = `rgba(${34 + speedFactor * 100}, ${197 - speedFactor * 50}, ${94 - speedFactor * 50}, 0.07)`;
    
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_HEIGHT; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }
    for (let i = 0; i < CANVAS_WIDTH; i += 20) {
      ctx.beginPath();
      const xOffset = (i - (state.score * state.speed) % 20);
      ctx.moveTo(xOffset, 0);
      ctx.lineTo(xOffset, CANVAS_HEIGHT);
      ctx.stroke();
    }

    // Draw Ground line
    ctx.strokeStyle = 'rgba(34, 197, 94, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT - 35);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 35);
    ctx.stroke();

    // Draw obstacles (pulsing red geometric spikes)
    state.obstacles.forEach((obstacle) => {
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
      ctx.fillStyle = status === 'PLAYING' ? '#ef4444' : '#7f1d1d';
      
      ctx.beginPath();
      ctx.moveTo(obstacle.x, CANVAS_HEIGHT - 35);
      ctx.lineTo(obstacle.x + obstacle.width / 2, CANVAS_HEIGHT - 35 - obstacle.height);
      ctx.lineTo(obstacle.x + obstacle.width, CANVAS_HEIGHT - 35);
      ctx.closePath();
      ctx.fill();
    });

    // Draw player trail
    if (state.trail && state.trail.length > 0) {
      state.trail.forEach((t, i) => {
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(34, 197, 94, ${t.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(t.x - (state.trail.length - i) * 2, t.y, PLAYER_RADIUS * (i / state.trail.length), 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Draw player orb (neon green pulse)
    const orbColor = speedFactor > 0.6 ? '#fcd34d' : speedFactor > 0.3 ? '#86efac' : '#22c55e';
    ctx.shadowBlur = status === 'PLAYING' ? 20 + Math.sin(state.score * 0.1) * 10 : 0;
    ctx.shadowColor = orbColor;
    ctx.fillStyle = orbColor;
    ctx.beginPath();
    ctx.arc(PLAYER_X, state.playerY - 15, PLAYER_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner hub reflection
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.arc(PLAYER_X - 5, state.playerY - 20, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw Score
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`TRANSYSTEMS: ${String(Math.floor(state.score)).padStart(6, '0')}`, CANVAS_WIDTH - 20, 40);

  }, [status]);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      update();
      draw(ctx);
    }
    requestRef.current = requestAnimationFrame(loop);
  }, [update, draw]);

  useEffect(() => {
    if (status === 'PLAYING') {
      gameState.current = {
        playerY: CANVAS_HEIGHT - 50,
        playerVelocityY: 0,
        obstacles: [],
        speed: INITIAL_SPEED,
        score: 0,
        lastSpawnTime: Date.now(),
        trail: [],
      };
    }
  }, [status]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [loop]);

  return (
    <div className="relative w-full max-w-[800px] aspect-[2/1] bg-[#050805] rounded-3xl overflow-hidden border border-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.1)] group">
        {/* CRT Overlay Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        
        <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            onClick={jump}
            className="w-full h-full cursor-pointer"
        />
        
        {/* Input instructions */}
        {status === 'PLAYING' && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.3em] text-green-500/40 pointer-events-none">
                [ Space / Click ] to Boost
            </div>
        )}
    </div>
  );
}
