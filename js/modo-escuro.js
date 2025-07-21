document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        const btnToggle = document.getElementById("btn_dark_mode");
        const iconTema = document.getElementById("icon_tema");
        const body = document.body;

        if (btnToggle && iconTema) {
            // Evita adicionar múltiplos eventListeners
            if (!btnToggle.dataset.listener) {
                const temaSalvo = localStorage.getItem("modo-escuro") === "true";
                if (temaSalvo) {
                    body.classList.add("dark-mode");
                }

                atualizarIconeTema(temaSalvo);

                btnToggle.addEventListener("click", () => {
                    body.classList.toggle("dark-mode");
                    const isDark = body.classList.contains("dark-mode");
                    localStorage.setItem("modo-escuro", isDark);
                    atualizarIconeTema(isDark);
                });

                btnToggle.dataset.listener = true;
            }

            function atualizarIconeTema(isDark) {
                iconTema.src = isDark
                    ? "./assets/imagens/sun.svg"
                    : "./assets/imagens/moon.svg";
                iconTema.alt = isDark ? "Modo Claro" : "Modo Escuro";
            }

            observer.disconnect(); // Para de observar após aplicar
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
