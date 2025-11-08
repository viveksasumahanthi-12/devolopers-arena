// Simple helpers (no build step). Expose on window.App.

(function (w) {
  const App = {};

  // Mobile nav toggle
  App.initMenu = function initMenu() {
    const btn = document.querySelector('#menu-toggle');
    const panel = document.querySelector('#menu-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = panel.getAttribute('data-open') === 'true';
      panel.setAttribute('data-open', String(!open));
      btn.setAttribute('aria-expanded', String(!open));
    });
  };

  // Accessible tabs
  App.initTabs = function initTabs(root = document) {
    const sets = root.querySelectorAll('[data-tabs]');
    sets.forEach(set => {
      const tabs = set.querySelectorAll('[role="tab"]');
      function show(index) {
        tabs.forEach((t, i) => {
          const selected = i === index;
          t.setAttribute('aria-selected', selected);
          t.tabIndex = selected ? 0 : -1;
          const panelId = t.getAttribute('aria-controls');
          const panel = set.querySelector('#' + panelId);
          if (panel) selected ? panel.removeAttribute('hidden') : panel.setAttribute('hidden', '');
        });
      }
      tabs.forEach((t, i) => {
        t.addEventListener('click', () => show(i));
        t.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); show((i + 1) % tabs.length); }
          if (e.key === 'ArrowLeft')  { e.preventDefault(); show((i - 1 + tabs.length) % tabs.length); }
        });
      });
      show(0);
    });
  };

  // Progressive enhancement for demo forms
  App.initEnhancedForms = function initEnhancedForms(root = document) {
    root.querySelectorAll('form[data-enhance]').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const status = form.querySelector('[data-status]');
        if (status) status.textContent = 'Thanks! We will reply soon.';
        form.reset();
      });
    });
  };

  w.App = App;
})(window);
