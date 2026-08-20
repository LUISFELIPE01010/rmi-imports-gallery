import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

/**
 * Seta flutuante que aparece ao rolar a página para baixo e leva ao rodapé.
 * Some quando o rodapé já está visível ou quando o usuário sobe a página.
 */
export function ScrollCue() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const evaluate = () => {
      frame = 0;
      const y = window.scrollY;
      const goingDown = y > last + 4;
      const goingUp = y < last - 4;
      last = y;

      const nearBottom = y + window.innerHeight >= document.body.scrollHeight - 260;
      if (nearBottom || goingUp) setVisible(false);
      else if (goingDown && y > 320) setVisible(true);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(evaluate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Ir para o rodapé"
      onClick={() =>
        document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })
      }
      className={`fixed bottom-5 right-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-background shadow-lift transition-all duration-300 hover:bg-ink-soft ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowDown className="h-[18px] w-[18px]" strokeWidth={1.8} />
    </button>
  );
}
