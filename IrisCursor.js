(function () {
    let cursorDot = null;
    let cursorOutline = null;

    function ensureElements() {
        // If IrisCursorComponent doesn't exist in DOM, create it and append to body
        let container = document.querySelector('.IrisCursorComponent');
        if (!container) {
            container = document.createElement('div');
            container.className = 'IrisCursorComponent';
            const outline = document.createElement('div');
            outline.className = 'IrisCursorOutline';
            const dot = document.createElement('div');
            dot.className = 'IrisCursorDot';
            container.appendChild(outline);
            container.appendChild(dot);
            document.body.appendChild(container);
        }

        if (!cursorDot) cursorDot = container.querySelector('.IrisCursorDot') || document.querySelector('[class*="IrisCursorDot"]');
        if (!cursorOutline) cursorOutline = container.querySelector('.IrisCursorOutline') || document.querySelector('[class*="IrisCursorOutline"]');
        return !!(cursorDot && cursorOutline);
    }

    let outlineScale = 1;
    let dotScale = 1;

    function translateCursorDot(e) {
        if (!cursorDot) return;
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        cursorDot.style.transform = `translate(-50%, -50%) scale(${dotScale})`;
    }

    function translateCursorOutline(e) {
        if (!cursorOutline) return;
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
        cursorOutline.style.transform = `translate(-50%, -50%) scale(${outlineScale})`;
    }

    document.addEventListener('mousemove', function (e) {
        if (!ensureElements()) return;
        translateCursorDot(e);
        translateCursorOutline(e);
    }, { passive: true });

    document.addEventListener('click', function (e) {
        if (!ensureElements()) return;
        outlineScale = 1;
        dotScale = 1;
        cursorOutline.style.transform = `translate(-50%, -50%) scale(${outlineScale})`;
        setTimeout(() => {
            outlineScale = 0.2;
            dotScale = 1.5;
            cursorOutline.style.transform = `translate(-50%, -50%) scale(${outlineScale})`;
            cursorDot.style.transform = `translate(-50%, -50%) scale(${dotScale})`;
            setTimeout(() => {
                outlineScale = 1;
                dotScale = 1;
                cursorOutline.style.transform = `translate(-50%, -50%) scale(${outlineScale})`;
                cursorDot.style.transform = `translate(-50%, -50%) scale(${dotScale})`;
            }, 50);
        }, 50);
    });

    document.addEventListener('pointerover', function (e) {
        if (!ensureElements()) return;
        if (e.target.closest('.IrisCursorComponent')) return;

        const interactive = e.target.closest('a, button, [role="button"], [role="link"], [onclick], [tabindex], .nav-link, .btn');
        if (interactive) {
            outlineScale = 1.6;
            cursorOutline.style.transform = `translate(-50%, -50%) scale(${outlineScale})`;
        }
    });

    document.addEventListener('pointerout', function (e) {
        if (!ensureElements()) return;
        if (e.target.closest('.IrisCursorComponent')) return;
        outlineScale = 1;
        cursorOutline.style.transform = `translate(-50%, -50%) scale(${outlineScale})`;
    });

})();
