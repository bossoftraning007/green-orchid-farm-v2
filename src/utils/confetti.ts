export function fireConfetti() {
  if (typeof window !== 'undefined' && (window as any).confetti) {
    (window as any).confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
}
