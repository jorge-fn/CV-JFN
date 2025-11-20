/*!
 * Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
 */
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // --- Simple client-side translator (Spanish -> English) ---
    const translations_es_en = {
        "Sobre mí": "About",
        "Experiencia Laboral": "Experience",
        "Formación Académica": "Education",
        "Habilidades": "Skills",
        "Intereses": "Interests",
        "Soy un Administrador de Sistemas operativos en red, con interés en el aprendizaje continuo y el desarrollo profesional. Estoy en busca de oportunidades que me posibiliten poner en práctica mis conocimientos técnicos, perfeccionar mis habilidades y contribuir al éxito de la empresa.":
            "I am a Network Systems Administrator, interested in continuous learning and professional development. I am looking for opportunities that allow me to apply my technical knowledge, refine my skills, and contribute to the company's success.",
        "Asistente de ventas": "Sales Assistant",
        "Trabajé durante 3 meses como asesor de ventas en Guess, donde atendía a clientes, gestionaba la reposición de stock y apoyaba en caja para garantizar una buena experiencia de compra.":
            "I worked for 3 months as a sales advisor at Guess, where I assisted customers, managed stock replenishment, and supported the cashier to ensure a good shopping experience.",
        "Asistente Informático": "IT Assistant",
        "Trabajé como asistente informático en una empresa de entretenimiento, donde gestiono y configuro el equipo necesario para sesiones de realidad virtual.":
            "I worked as an IT assistant at an entertainment company, where I managed and configured the equipment necessary for virtual reality sessions.",
        "Instalación, configuración y mantenimiento de Windows Server y Linux - Uso de protocolos: TCP/IP, DHCP, DNS - Gestión de usuarios, grupos y permisos - Automatización de tareas con scripts":
            "Installation, configuration, and maintenance of Windows Server and Linux - Use of protocols: TCP/IP, DHCP, DNS - Management of users, groups, and permissions - Task automation with scripts",
        "Administración de Windows Server (Active Directory, Group Policy, DHCP, DNS)": "Windows Server administration (Active Directory, Group Policy, DHCP, DNS)",
        "Administración de Linux/GNU (usuario root, permisos, servicios, firewall)": "Linux/GNU administration (root user, permissions, services, firewall)",
        "Virtualización (VMware, Hyper-V, VirtualBox)": "Virtualization (VMware, Hyper-V, VirtualBox)",
        "Gestión de máquinas virtuales y contenedores Docker": "Management of virtual machines and Docker containers",
        "Protocolos de red: TCP/IP, DHCP, DNS, SMTP, FTP, HTTP/HTTPS": "Network protocols: TCP/IP, DHCP, DNS, SMTP, FTP, HTTP/HTTPS",
        "Configuración de switches, routers y cortafuegos": "Configuration of switches, routers, and firewalls",
        "Implementación de VPN y acceso remoto seguro": "Implementation of VPN and secure remote access",
        "Monitoreo y resolución de problemas de red": "Network monitoring and troubleshooting",
        "Gestión de usuarios, grupos y permisos en red": "Management of users, groups, and permissions in networks",
        "Implementación de políticas de seguridad y firewalls": "Implementation of security policies and firewalls",
        "Copias de seguridad (backups) y planes de recuperación de desastres": "Backups and disaster recovery plans",
        "Auditoría de sistemas y logs de seguridad": "System auditing and security logs",
        "Automatización con PowerShell y Bash": "Automation with PowerShell and Bash",
        "Automatización de tareas administrativas mediante scripts": "Automation of administrative tasks using scripts",
        "Lenguajes de programación: Python, Java": "Programming languages: Python, Java",
        "Servicios de directorio (Active Directory)": "Directory services (Active Directory)",
        "Servidores de aplicaciones y bases de datos": "Application servers and databases",
        "Herramientas de monitoreo y administración (Nagios, Zabbix)": "Monitoring and administration tools (Nagios, Zabbix)",
        "Git y control de versiones": "Git and version control",
        "Practicante de taekwondo con logros a nivel nacional; esta práctica me ha proporcionado disciplina, resistencia, liderazgo y capacidad para trabajar en equipo bajo presión. Comprometido con la mejora continua y la superación personal.":
            "Taekwondo practitioner with national-level achievements; this practice has given me discipline, resilience, leadership, and the ability to work in a team under pressure. Committed to continuous improvement and personal growth.",
        "Aficionado al deporte y a la actividad física por sus beneficios en rendimiento y bienestar. Disfruto de actividades sociales como salir con amigos y pasar tiempo con mi familia, factores que potencian mi equilibrio personal y mi capacidad para colaborar en entornos laborales.":
            "Sports and physical activity enthusiast for their benefits to performance and well-being. I enjoy social activities like going out with friends and spending time with my family, which enhance my personal balance and ability to collaborate in work environments."
    };

    // We'll keep a full snapshot of the body before the first translation to ensure a reliable revert.
    let originalBodyHTML = null;

    function translateToEnglish() {
        if (originalBodyHTML === null) {
            originalBodyHTML = document.body.innerHTML;
        }
        const root = document.body;
        if (!root) return;
        const elements = root.querySelectorAll('*');
        elements.forEach(el => {
            if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
            if (el.id === 'toggle-translate' || el.id === 'btn-revert') return;
            if (el.dataset.original === undefined) {
                el.dataset.original = el.innerHTML;
            }
            let html = el.innerHTML;
            for (const [es, en] of Object.entries(translations_es_en)) {
                if (html.indexOf(es) !== -1) {
                    html = html.split(es).join(en);
                }
            }
            el.innerHTML = html;
        });
    }

    function revertToOriginal() {
        if (originalBodyHTML !== null) {
            document.body.innerHTML = originalBodyHTML;
            originalBodyHTML = null;
            bindTranslationControls();
            // restart particles since the DOM was replaced
            try { if (typeof particleStopFn === 'function') particleStopFn(); } catch (e) {}
            particleStopFn = initParticles();
            return;
        }
        const root = document.body;
        if (!root) return;
        const elements = root.querySelectorAll('*');
        elements.forEach(el => {
            if (el.id === 'toggle-translate' || el.id === 'btn-revert') return;
            if (el.dataset.original !== undefined) {
                el.innerHTML = el.dataset.original;
                delete el.dataset.original;
            }
        });
    }

    // Translate page from English back to Spanish using reverse mapping
    function translateToSpanish() {
        // If we have a full snapshot (original Spanish), prefer restoring it for fidelity
        if (originalBodyHTML !== null) {
            document.body.innerHTML = originalBodyHTML;
            originalBodyHTML = null;
            bindTranslationControls();
            try { if (typeof particleStopFn === 'function') particleStopFn(); } catch (e) {}
            particleStopFn = initParticles();
            return;
        }

        // Otherwise build reverse mapping and perform in-place replacements
        const translations_en_es = Object.fromEntries(
            Object.entries(translations_es_en).map(([es, en]) => [en, es])
        );
        const root = document.body;
        if (!root) return;
        const elements = root.querySelectorAll('*');
        elements.forEach(el => {
            if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
            if (el.id === 'toggle-translate' || el.id === 'btn-revert') return;
            if (el.dataset.original === undefined) {
                el.dataset.original = el.innerHTML;
            }
            let html = el.innerHTML;
            for (const [en, es] of Object.entries(translations_en_es)) {
                if (html.indexOf(en) !== -1) {
                    html = html.split(en).join(es);
                }
            }
            el.innerHTML = html;
        });
    }

    function bindTranslationControls() {
        const toggleBtn = document.getElementById('toggle-translate');
        if (toggleBtn) {
            const newToggle = toggleBtn.cloneNode(true);
            toggleBtn.parentNode.replaceChild(newToggle, toggleBtn);
            newToggle.dataset.translated = 'false';
            newToggle.setAttribute('aria-pressed', 'false');
            newToggle.addEventListener('click', () => {
                const isTranslated = newToggle.dataset.translated === 'true';
                if (isTranslated) {
                    revertToOriginal();
                    newToggle.dataset.translated = 'false';
                    newToggle.setAttribute('aria-pressed', 'false');
                } else {
                    translateToEnglish();
                    newToggle.dataset.translated = 'true';
                    newToggle.setAttribute('aria-pressed', 'true');
                }
            });
        }

        const revertBtn = document.getElementById('btn-revert');
        if (revertBtn) {
            const newRevert = revertBtn.cloneNode(true);
            revertBtn.parentNode.replaceChild(newRevert, revertBtn);
            newRevert.addEventListener('click', () => {
                revertToOriginal();
                const tb = document.getElementById('toggle-translate');
                if (tb) {
                    tb.dataset.translated = 'false';
                    tb.setAttribute('aria-pressed', 'false');
                }
            });
        }

        // EN / ES explicit buttons
        const btnEn = document.getElementById('btn-en');
        if (btnEn) {
            const newEn = btnEn.cloneNode(true);
            btnEn.parentNode.replaceChild(newEn, btnEn);
            newEn.addEventListener('click', () => {
                translateToEnglish();
                // update pressed states
                try { document.getElementById('btn-en').setAttribute('aria-pressed', 'true'); } catch(e){}
                try { document.getElementById('btn-es').setAttribute('aria-pressed', 'false'); } catch(e){}
                // also update toggle button state if present
                const tb = document.getElementById('toggle-translate'); if (tb) { tb.dataset.translated = 'true'; tb.setAttribute('aria-pressed', 'true'); }
            });
        }

        const btnEs = document.getElementById('btn-es');
        if (btnEs) {
            const newEs = btnEs.cloneNode(true);
            btnEs.parentNode.replaceChild(newEs, btnEs);
            newEs.addEventListener('click', () => {
                translateToSpanish();
                try { document.getElementById('btn-en').setAttribute('aria-pressed', 'false'); } catch(e){}
                try { document.getElementById('btn-es').setAttribute('aria-pressed', 'true'); } catch(e){}
                const tb = document.getElementById('toggle-translate'); if (tb) { tb.dataset.translated = 'false'; tb.setAttribute('aria-pressed', 'false'); }
            });
        }
    }

    bindTranslationControls();

    // --- Render email into a canvas so the address does not appear as text in the DOM ---
    (function renderEmailCanvas(){
        const span = document.getElementById('contact-email-canvas');
        if (!span) return;

        // Email stored as char codes to avoid literal appearance
        const userCodes = [106,102,114,97,110,99,111,115,103,50,48,48,54]; // jfrancosg2006
        const domainCodes = [103,109,97,105,108,46,99,111,109]; // gmail.com
        const user = String.fromCharCode(...userCodes);
        const domain = String.fromCharCode(...domainCodes);
        const email = user + '@' + domain;

        // Create canvas and match font from computed style if possible
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const style = window.getComputedStyle(span);
        // derive font-size and family
        const fontSize = style.fontSize || '16px';
        const fontFamily = style.fontFamily || 'Arial, sans-serif';
        ctx.font = `${fontSize} ${fontFamily}`;

        // measure text and size canvas
        const metrics = ctx.measureText(email);
        const paddingX = 6;
        const paddingY = Math.ceil(parseFloat(fontSize) * 0.6);
        canvas.width = Math.ceil(metrics.width) + paddingX * 2;
        canvas.height = Math.ceil(parseFloat(fontSize)) + paddingY * 2;

        // redraw with proper font after sizing
        ctx.font = `${fontSize} ${fontFamily}`;
        // draw text (use link color)
        ctx.fillStyle = style.color || '#0d6efd';
        ctx.textBaseline = 'top';
        ctx.fillText(email, paddingX, paddingY / 2);

        // replace span content with canvas
        span.textContent = '';
        canvas.style.display = 'inline-block';
        canvas.style.verticalAlign = 'middle';
        canvas.style.cursor = 'pointer';
        span.appendChild(canvas);

        // click/keyboard interaction: open mailto and copy to clipboard
        function triggerMail() {
            // open mail client
            window.location.href = 'mailto:' + email;
            // try to copy to clipboard silently
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(email).catch(() => {});
            }
        }

        span.addEventListener('click', (e) => { e.preventDefault(); triggerMail(); });
        span.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); triggerMail(); } });
    })();

    // --- Blue tech particles background ---
    let particleStopFn = null;
    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
        console.log('initParticles: canvas element ->', canvas);
        if (!canvas) return () => { console.warn('Particle canvas not found'); };
        const ctx = canvas.getContext('2d');
        let w = 0, h = 0;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        console.log('initParticles: prefersReducedMotion =', prefersReducedMotion);

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        // draw an initial frame so user can see immediately (helps debugging)
        // We'll call draw() once after particles are created below.

        // Particle settings (medium density, slightly subtle tech look)
        // Density scaled by viewport area; clamp between 35 and 65 for 'medium-slight'
        const density = Math.max(35, Math.min(65, Math.floor((w * h) / 20000)));
        const particles = [];

        function rand(min, max) { return Math.random() * (max - min) + min; }

        for (let i = 0; i < density; i++) {
            particles.push({
                x: rand(0, w),
                y: rand(0, h),
                // moderate drift for a refined tech feel
                vx: rand(-0.45, 0.45),
                vy: rand(-0.45, 0.45),
                // moderate particle size
                r: rand(1.0, 2.6),
                // hue kept for potential future variations
                hue: rand(190, 210),
            });
        }

        let animationId = null;

        function draw() {
            if (prefersReducedMotion) {
                ctx.clearRect(0, 0, w, h);
                for (const p of particles) {
                    ctx.beginPath();
                    ctx.fillStyle = `rgba(20,100,200,0.12)`;
                    ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                return;
            }

            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < particles.length; i++) {
                const a = particles[i];
                for (let j = i + 1; j < particles.length; j++) {
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 130) {
                        const alpha = 0.10 * (1 - dist / 130);
                        // electric blue line
                        ctx.strokeStyle = `rgba(0,170,255,${alpha})`;
                        ctx.lineWidth = 1.0;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }

            for (const p of particles) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
                // electric blue / cyan core -> softer outer (slightly subtler)
                grd.addColorStop(0, `rgba(0,200,255,0.86)`);
                grd.addColorStop(0.5, `rgba(0,150,255,0.5)`);
                grd.addColorStop(1, `rgba(10,30,60,0)`);
                ctx.fillStyle = grd;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function loop() {
            draw();
            animationId = requestAnimationFrame(loop);
        }

        // draw a first frame regardless
        try { draw(); } catch (e) { console.error('particles draw error', e); }
        if (!prefersReducedMotion) loop();

        function stop() {
            if (animationId) cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        }

        // stop animation when page not visible to save CPU
        const visibilityHandler = () => {
            if (document.hidden) {
                if (animationId) cancelAnimationFrame(animationId);
            } else {
                if (!prefersReducedMotion) loop();
            }
        };
        document.addEventListener('visibilitychange', visibilityHandler);

        // return a cleanup function to stop animation and remove listeners
        return function cleanup() {
            stop();
            document.removeEventListener('visibilitychange', visibilityHandler);
        };
    }

    // start particles on load
    particleStopFn = initParticles();

});
