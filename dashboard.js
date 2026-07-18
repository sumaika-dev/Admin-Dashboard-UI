(function () {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  // Toggle sidebar and update aria attributes
  function toggleSidebar(open) {
    const isOpen = typeof open === 'boolean' ? open : !sidebar.classList.contains('active');
    sidebar.classList.toggle('active', isOpen);
    sidebar.setAttribute('aria-hidden', String(!isOpen));
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    // Update button label for screen readers
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  }

  menuToggle.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleSidebar();
  });

  // keyboard accessibility for toggle (Enter/Space)
  menuToggle.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSidebar();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('active') && window.innerWidth <= 968) {
      toggleSidebar(false);
      menuToggle.focus();
    }
  });

  // Close when clicking outside on narrow viewports
  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 968 && sidebar.classList.contains('active')) {
      if (!sidebar.contains(e.target) && e.target !== menuToggle) toggleSidebar(false);
    }
  });

  // Keep behavior responsive on viewport changes (debounced)
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 968) {
        // Ensure sidebar is visible and aria states reflect desktop layout
        sidebar.classList.remove('active');
        sidebar.setAttribute('aria-hidden', 'false');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    }, 150);
  });
})();
