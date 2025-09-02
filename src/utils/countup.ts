export type CountUpOptions = {
  selector?: string;          // CSS selector to find counters
  root?: Document | HTMLElement;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function initCountUp(opts: CountUpOptions = {}) {
  const root = (opts.root || document) as Document | HTMLElement;
  const selector = opts.selector || '[data-countup]';
  const nodes = Array.from(root.querySelectorAll<HTMLElement>(selector));
  if (!nodes.length) return;

  const reduce = typeof window !== 'undefined' &&
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const run = (el: HTMLElement) => {
    const once = (el.dataset.once ?? 'true') !== 'false';
    if (once && el.dataset.countupDone === '1') return;

    const locale = el.dataset.locale || 'he-IL';
    const end = Number(el.dataset.end ?? '0');
    const start = Number(el.dataset.start ?? '0');
    const duration = Number(el.dataset.duration ?? '1500');
    const decimals = Number(el.dataset.decimals ?? '0');
    const prefix = el.dataset.prefix ?? '';
    const suffix = el.dataset.suffix ?? '';

    const format = (v: number) =>
      v.toLocaleString(locale, { maximumFractionDigits: decimals, minimumFractionDigits: decimals });

    const setText = (v: number) => { el.textContent = `${prefix}${format(v)}${suffix}`; };

    if (Number.isNaN(end)) return; // guard
    if (reduce) { setText(end); el.dataset.countupDone = '1'; return; }

    let startTs: number | undefined;
    const step = (ts: number) => {
      if (startTs === undefined) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const eased = easeOutCubic(p);
      setText(start + (end - start) * eased);
      if (p < 1) requestAnimationFrame(step);
      else el.dataset.countupDone = '1';
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const el = e.target as HTMLElement;
      const once = (el.dataset.once ?? 'true') !== 'false';
      if (e.isIntersecting) run(el);
      else if (!once) el.dataset.countupDone = '0';
    });
  }, { threshold: 0.3 });
  nodes.forEach(n => io.observe(n));
}

// Auto-init if loaded directly via <script type="module">.
if (typeof window !== 'undefined') {
  // @ts-expect-error - Adding custom property to window
  if (!window.__COUNTUP_AUTO__) {
    // @ts-expect-error - Adding custom property to window
    window.__COUNTUP_AUTO__ = true;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => initCountUp());
    } else {
      initCountUp();
    }
  }
}
