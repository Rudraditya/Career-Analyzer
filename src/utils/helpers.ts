export function getScoreColor(score: number): {
  text: string;
  bg: string;
  border: string;
  gradient: string;
  ring: string;
} {
  if (score >= 85) {
    return {
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      gradient: 'from-emerald-500 to-teal-400',
      ring: 'ring-emerald-500/30',
    };
  }
  if (score >= 70) {
    return {
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      gradient: 'from-blue-500 to-cyan-400',
      ring: 'ring-blue-500/30',
    };
  }
  if (score >= 55) {
    return {
      text: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      gradient: 'from-amber-500 to-yellow-400',
      ring: 'ring-amber-500/30',
    };
  }
  return {
    text: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/30',
    gradient: 'from-rose-500 to-red-400',
    ring: 'ring-rose-500/30',
  };
}

export function copyToClipboard(text: string): Promise<boolean> {
  return navigator.clipboard
    .writeText(text)
    .then(() => true)
    .catch(() => false);
}

export function downloadFile(filename: string, content: string, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
