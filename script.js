(function () {
    'use strict';

    // ===== Language toggle =====
    const STORAGE_KEY = 'bewerberprofil-lang';
    const root = document.documentElement;
    const toggle = document.getElementById('langToggle');

    function applyLang(lang) {
        root.setAttribute('lang', lang);
        root.setAttribute('data-lang', lang);
        document.querySelectorAll('[data-de][data-en]').forEach((el) => {
            const value = el.getAttribute('data-' + lang);
            if (value !== null) el.innerHTML = value;
        });
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    }

    function initLang() {
        let lang = 'de';
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'de' || stored === 'en') lang = stored;
            else if (navigator.language && navigator.language.toLowerCase().startsWith('en')) lang = 'en';
        } catch (e) { /* ignore */ }
        applyLang(lang);
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-lang') || 'de';
            applyLang(current === 'de' ? 'en' : 'de');
        });
    }

    initLang();

    // ===== Theme toggle =====
    // The initial theme is already applied by the inline script in <head>
    // to avoid a flash. Here we only wire up the toggle button.
    const THEME_KEY = 'bewerberprofil-theme';
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
        });
    }

    // ===== Year =====
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ===== Mobile navigation =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function closeNav() {
        if (!navLinks || !navToggle) return;
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
        navLinks.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', closeNav);
        });
    }

    // ===== Smooth scroll offset for sticky nav =====
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();
