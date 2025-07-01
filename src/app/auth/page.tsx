"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MailIcon, LockIcon, UserIcon } from "lucide-react"
import { FlickeringGrid } from "@/components/ui/flickering-grid"

// Schemas
const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

export default function AuthPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [signupError, setSignupError] = useState<string | null>(null);

  // Login form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // Signup form
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  async function onLogin(data: LoginForm) {
    setError(null);
    const { email, password } = data;
    try {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: "/",
        },
        {
          onRequest: () => {},
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx) => {
            setError(ctx.error.message || "Falha ao autenticar");
          },
        }
      );
    } catch {
      setError("Erro inesperado. Tente novamente.");
    }
  }

  async function onSignup(data: SignupForm) {
    setSignupError(null);
    const { name, email, password } = data;
    try {
      await authClient.signUp.email(
        {
          email,
          password,
          name,
          image:
            "https://avatar.iran.liara.run/username?username=" +
            name.replace(/\s+/g, "+"),
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {},
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: (ctx: { error: { message?: string } }) => {
            setSignupError(ctx.error.message || "Falha ao cadastrar");
          },
        }
      );
    } catch {
      setSignupError("Erro inesperado. Tente novamente.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <FlickeringGrid
        className="absolute inset-0 z-0 size-full"
        color="#2b7fff"
        gridGap={6}
        flickerChance={0.1}
        maxOpacity={0.1}
      />
      <section
        className="z-50 flex w-full max-w-4xl min-h-[600px] rounded-3xl shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 8px 32px 0 rgba(0,0,0,0.20)" }}
      >
        {/* LADO ESQUERDO */}
        <div
          className="hidden md:flex flex-col justify-center items-center flex-1 px-10 py-12"
          style={{
            background:
              "linear-gradient(45deg, #0b545b, #0d6570, #0f7785, #13899c, #0092b5, #0090d2, #008aec, #2b7fff)",
          }}
        >
          <Image
            src="/corp-desk-logo.svg"
            alt="Corp Desk Logo"
            width={120}
            height={120}
            className="mb-8 bg-black rounded-full p-2 px-3 shadow-lg"
            priority
          />
          <h2 className="text-white text-3xl font-bold mb-2 text-center drop-shadow">
            Bem-vindo ao Corp Desk
          </h2>
          <p className="text-white/90 text-lg mb-8 text-center max-w-xs">
            Gerencie sua empresa com agilidade, segurança e tecnologia.
          </p>
          <Button
            type="button"
            className="text-primary bg-white font-semibold px-6 py-2 rounded-full shadow hover:bg-[#fff3e6] transition"
            onClick={() => router.push("/")}
            variant="ghost"
          >
            Saiba mais
          </Button>
        </div>

        {/* LADO DIREITO */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 bg-[#232326]">
          {/* Bloco de confiança acima das abas */}
          <div className="flex flex-col items-center text-center mb-8">
            <Image
              src="/corp-desk-logo.svg"
              alt="Logo Corp Desk"
              width={64}
              height={64}
              className="mb-2"
              priority
            />
            <span className="text-primary font-semibold text-regular">
              Plataforma segura e confiável para sua empresa
            </span>
            <span className="text-[#bdbdbd] text-xs mt-1 text-center">
              Seus dados protegidos com tecnologia de ponta.
            </span>
          </div>
          <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
            <TabsList className="flex w-full mb-6 bg-[#18181b] rounded-sm h-10">
              <TabsTrigger
                value="login"
                className="flex-1 rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white text-primary font-semibold transition"
              >
                Entrar
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="flex-1 rounded-sm data-[state=active]:bg-primary data-[state=active]:text-white text-primary font-semibold transition"
              >
                Cadastrar
              </TabsTrigger>
            </TabsList>
            {/* LOGIN */}
            <TabsContent value="login">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <LockIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                Olá novamente!
              </h3>
              <p className="text-[#bdbdbd] mb-6">
                Bem-vindo de volta ao Corp Desk
              </p>
              <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
                <div>
                  <Label
                    htmlFor="email"
                    className="text-[#bdbdbd] mb-1 flex items-center gap-2"
                  >
                    <MailIcon className="w-4 h-4" aria-hidden="true" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="E-mail"
                    className={cn(
                      "h-10 pl-10",
                      errors.email && "border-destructive"
                    )}
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "login-email-error" : undefined
                    }
                  />
                  {errors.email && (
                    <span
                      id="login-email-error"
                      className="text-destructive text-xs"
                    >
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="password"
                    className="text-[#bdbdbd] mb-1 flex items-center gap-2"
                  >
                    <LockIcon className="w-4 h-4" aria-hidden="true" />
                    Senha
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Senha"
                    className={cn(
                      "h-10 pl-10",
                      errors.password && "border-destructive"
                    )}
                    {...register("password")}
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "login-password-error" : undefined
                    }
                  />
                  {errors.password && (
                    <span
                      id="login-password-error"
                      className="text-destructive text-xs"
                    >
                      {errors.password.message}
                    </span>
                  )}
                </div>
                {error && (
                  <div className="text-destructive text-xs">{error}</div>
                )}
                <Button
                  type="submit"
                  className="w-full rounded-full text-white font-bold py-3 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>
            {/* SIGNUP */}
            <TabsContent value="signup">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                Criar conta
              </h3>
              <p className="text-[#bdbdbd] mb-6">
                Preencha os campos para se cadastrar
              </p>
              <form
                onSubmit={handleSubmitSignup(onSignup)}
                className="space-y-5"
              >
                <div>
                  <Label
                    htmlFor="name"
                    className="text-[#bdbdbd] mb-1 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4" aria-hidden="true" />
                    Nome
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nome completo"
                    className={cn(
                      "h-10 pl-10",
                      signupErrors.name && "border-destructive"
                    )}
                    {...registerSignup("name")}
                    aria-invalid={!!signupErrors.name}
                    aria-describedby={
                      signupErrors.name ? "signup-name-error" : undefined
                    }
                  />
                  {signupErrors.name && (
                    <span
                      id="signup-name-error"
                      className="text-destructive text-xs"
                    >
                      {signupErrors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="signup-email"
                    className="text-[#bdbdbd] mb-1 flex items-center gap-2"
                  >
                    <MailIcon className="w-4 h-4" aria-hidden="true" />
                    E-mail
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="E-mail"
                    className={cn(
                      "h-10 pl-10",
                      signupErrors.email && "border-destructive"
                    )}
                    {...registerSignup("email")}
                    aria-invalid={!!signupErrors.email}
                    aria-describedby={
                      signupErrors.email ? "signup-email-error" : undefined
                    }
                  />
                  {signupErrors.email && (
                    <span
                      id="signup-email-error"
                      className="text-destructive text-xs"
                    >
                      {signupErrors.email.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="signup-password"
                    className="text-[#bdbdbd] mb-1 flex items-center gap-2"
                  >
                    <LockIcon className="w-4 h-4" aria-hidden="true" />
                    Senha
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Senha"
                    className={cn(
                      "h-10 pl-10",
                      signupErrors.password && "border-destructive"
                    )}
                    {...registerSignup("password")}
                    aria-invalid={!!signupErrors.password}
                    aria-describedby={
                      signupErrors.password
                        ? "signup-password-error"
                        : undefined
                    }
                  />
                  {signupErrors.password && (
                    <span
                      id="signup-password-error"
                      className="text-destructive text-xs"
                    >
                      {signupErrors.password.message}
                    </span>
                  )}
                </div>
                {signupError && (
                  <div className="text-destructive text-xs">{signupError}</div>
                )}
                <Button
                  type="submit"
                  className="w-full rounded-sm text-white font-bold py-3 transition"
                  disabled={isSignupSubmitting}
                >
                  {isSignupSubmitting ? "Cadastrando..." : "Cadastrar"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}