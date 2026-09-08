(function() {
    'use strict';

    // ============================================================
    // THEME TOGGLE
    // ============================================================
    const htmlEl = document.documentElement;

    const getCurrentTheme = function() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const updateThemeIcons = function(theme) {
        const iconClass = theme === 'dark' ? 'bi-unlock-fill' : 'bi-lock-fill';
        document.querySelectorAll('.sidebar-theme-toggle i, #mobileThemeToggle i, .mobile-theme-toggle i').forEach(function(el) {
            el.className = 'bi ' + iconClass;
        });
    };

    const setTheme = function(theme) {
        if (theme === 'dark') {
            htmlEl.setAttribute('data-bs-theme', 'dark');
            htmlEl.classList.add('dark');
        } else {
            htmlEl.setAttribute('data-bs-theme', 'light');
            htmlEl.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
        updateThemeIcons(theme);
    };

    // Initialize
    setTheme(getCurrentTheme());

    const toggleTheme = function() {
        const next = htmlEl.classList.contains('dark') ? 'light' : 'dark';
        setTheme(next);
    };

    // ---- Event delegation for theme toggles (works for dynamically loaded buttons) ----
    document.addEventListener('click', function(e) {
        var target = e.target.closest('.sidebar-theme-toggle, #mobileThemeToggle, .mobile-theme-toggle');
        if (target) {
            e.preventDefault();
            toggleTheme();
        }
    });

    // ============================================================
    // MOBILE HAMBURGER MENU
    // ============================================================
    const hamburger = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });

        // Close menu when clicking a link
        var mobileLinks = mobileMenu.querySelectorAll('.nav-link');
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('open');
            });
        });
    }

    // ============================================================
    // NAVIGATION HIGHLIGHTING (scroll spy)
    // ============================================================
    var sections = document.querySelectorAll('section');

    var updateActiveNav = function() {
        var current = '';
        var scrollY = window.pageYOffset || window.scrollY || 0;
        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.clientHeight;
            if (scrollY >= top - 100) {
                current = section.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);

    // ============================================================
    // CERTIFICATION MODAL – Populate data + image
    // ============================================================
    var certModal = document.getElementById('certModal');
    if (certModal) {
        certModal.addEventListener('show.bs.modal', function(event) {
            var trigger = event.relatedTarget;
            if (trigger) {
                var name = trigger.getAttribute('data-cert-name') || 'Certification Name';
                var issuer = trigger.getAttribute('data-cert-issuer') || 'Issuer Name';
                var imgSrc = trigger.getAttribute('data-cert-img') || '';

                var titleEl = document.getElementById('certModalTitle');
                var issuerEl = document.getElementById('certModalIssuer');
                var holderEl = document.getElementById('certModalHolder');
                var dateEl = document.getElementById('certModalDate');
                var imgEl = document.getElementById('certModalImage');
                var verifyLink = document.getElementById('certModalVerifyLink');

                if (titleEl) titleEl.textContent = name;
                if (issuerEl) issuerEl.textContent = issuer;
                if (holderEl) holderEl.textContent = 'Joshua Mateo';
                if (dateEl) dateEl.textContent = 'August 2026';

                if (imgEl) {
                    if (imgSrc) {
                        imgEl.src = imgSrc;
                        imgEl.style.display = 'inline';
                        imgEl.onerror = function() {
                            this.style.display = 'none';
                        };
                    } else {
                        imgEl.style.display = 'none';
                    }
                }

                if (verifyLink) {
                    verifyLink.href = '#';
                    verifyLink.textContent = 'Verify on ' + issuer + ' →';
                }
            }
        });
    }

    // ============================================================
    // SIDEBAR LOADER – with reinit function
    // ============================================================
    window.reinitTheme = function() {
        updateThemeIcons(getCurrentTheme());
        updateActiveNav();
        // Re-attach hamburger if needed (but it's already attached via the main listener)
    };

    // Handle navbar loading after fetch
    // The navbar container ID should be 'navbar-container'
    // The actual loading is handled in the HTML script block

    console.log('✅ script.js loaded successfully');

})();