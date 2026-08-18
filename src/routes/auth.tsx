import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso administrativo · RMI Imports" },
      { name: "description", content: "Área restrita para gestão do catálogo da RMI Imports." },
      { property: "og:title", content: "Acesso administrativo · RMI Imports" },
      { property: "og:description", content: "Área restrita para gestão do catálogo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const EMAIL_DOMAIN = "rmiimports.app";

function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const user = username.trim().toLowerCase();
      const email = user.includes("@") ? user : `${user}@${EMAIL_DOMAIN}`;
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate({ to: "/admin" });
    } catch {
      setMsg("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-8 shadow-soft">
        <p className="eyebrow text-gold">RMI Imports</p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Entrar no painel</h1>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
          />
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-gold"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-background transition-colors hover:bg-gold disabled:opacity-60"
          >
            {loading ? "Aguarde..." : "Entrar"}
          </button>
        </form>

        {msg && <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">{msg}</p>}
      </div>
    </div>
  );
}

