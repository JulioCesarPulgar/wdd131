document.addEventListener("DOMContentLoaded", () => {
    const updateDateInfo = (yearElementId, modifiedElementId) => {
        const yearSpan = document.getElementById(yearElementId);
        const lastModified = document.getElementById(modifiedElementId);

        const currentYear = new Date().getFullYear();
        if (yearSpan) yearSpan.textContent = currentYear;

        if (lastModified) {
            const lang = document.documentElement.lang || 'en-US';
            const formattedDate = new Intl.DateTimeFormat(lang, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(new Date(document.lastModified));
            lastModified.textContent = `Last Modified: ${formattedDate}`;
        }
    };

    updateDateInfo('currentyear', 'lastModified');
});
