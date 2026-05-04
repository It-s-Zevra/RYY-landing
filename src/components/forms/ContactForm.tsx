"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Loader2,
  Send,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Clock,
  X,
} from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const MAILER_ENDPOINT =
  "https://mailer-backend-production-5f37.up.railway.app/api/v1/contact/ryy";

const EASE = [0.19, 1, 0.22, 1] as const;

type SubmitState =
  | { kind: "idle" }
  | { kind: "error"; message: string }
  | { kind: "success"; email: string; firstName: string };

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  async function onSubmit(data: ContactInput) {
    setState({ kind: "idle" });

    const { acceptsPrivacy: _omit, ...payload } = data;

    try {
      const res = await fetch(MAILER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const firstName = data.fullName.trim().split(/\s+/)[0] ?? "";
        setState({ kind: "success", email: data.email, firstName });
        reset();
        return;
      }

      let message = "No pudimos enviar tu mensaje. Intenta nuevamente.";
      if (res.status === 429) {
        message =
          "Demasiados intentos en poco tiempo. Espera un minuto y reintenta.";
      } else if (res.status >= 500) {
        message =
          "Servicio temporalmente no disponible. Por favor escríbenos por WhatsApp.";
      } else if (res.status === 400) {
        try {
          const body = (await res.json()) as {
            errors?: { field: string; message: string }[];
          };
          if (body.errors?.[0]) {
            message = `${body.errors[0].field}: ${body.errors[0].message}`;
          }
        } catch {}
      }
      setState({ kind: "error", message });
    } catch {
      setState({
        kind: "error",
        message:
          "Error de red. Verifica tu conexión o escríbenos por WhatsApp.",
      });
    }
  }

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid gap-4 md:grid-cols-2"
      >
        <Field
          label="Nombre completo"
          id="fullName"
          error={errors.fullName?.message}
        >
          <input
            id="fullName"
            autoComplete="name"
            {...register("fullName")}
            className={inputClass(!!errors.fullName)}
          />
        </Field>

        <Field
          label="Empresa"
          id="company"
          error={errors.company?.message}
        >
          <input
            id="company"
            autoComplete="organization"
            {...register("company")}
            className={inputClass(!!errors.company)}
          />
        </Field>

        <Field label="RUT empresa" id="rut" error={errors.rut?.message}>
          <input
            id="rut"
            placeholder="76.123.456-7"
            {...register("rut")}
            className={inputClass(!!errors.rut)}
          />
        </Field>

        <Field label="Cargo" id="role" error={errors.role?.message}>
          <input
            id="role"
            autoComplete="organization-title"
            {...register("role")}
            className={inputClass(!!errors.role)}
          />
        </Field>

        <Field
          label="Email corporativo"
          id="email"
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field
          label="Teléfono · WhatsApp"
          id="phone"
          error={errors.phone?.message}
        >
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
        </Field>

        <Field
          label="Tipo de consulta"
          id="consultType"
          error={errors.consultType?.message}
        >
          <select
            id="consultType"
            defaultValue=""
            {...register("consultType")}
            className={inputClass(!!errors.consultType)}
          >
            <option value="" disabled>
              Selecciona…
            </option>
            {site.consultTypes.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Tamaño de empresa"
          id="companySize"
          error={errors.companySize?.message}
        >
          <select
            id="companySize"
            defaultValue=""
            {...register("companySize")}
            className={inputClass(!!errors.companySize)}
          >
            <option value="" disabled>
              Selecciona…
            </option>
            {site.companySizes.map((c) => (
              <option key={c} value={c}>
                {c} trabajadores
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Cuéntanos brevemente del caso"
          id="message"
          error={errors.message?.message}
          className="md:col-span-2"
        >
          <textarea
            id="message"
            rows={4}
            {...register("message")}
            className={cn(inputClass(!!errors.message), "resize-none")}
          />
        </Field>

        <div className="md:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-porcelain/70">
            <input
              type="checkbox"
              {...register("acceptsPrivacy")}
              className="mt-1 h-4 w-4 cursor-pointer accent-mint"
            />
            <span>
              Acepto la política de privacidad y el tratamiento de mis datos
              bajo la Ley 19.628.
            </span>
          </label>
          {errors.acceptsPrivacy && (
            <p className="mt-2 text-xs text-rose-300">
              {errors.acceptsPrivacy.message}
            </p>
          )}
        </div>

        {state.kind === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
            className="md:col-span-2 flex items-start gap-3 rounded-md border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-rose-300" />
            <span>{state.message}</span>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative mt-2 inline-flex items-center justify-center gap-3 rounded-pill bg-mint px-7 py-4 font-mono text-eyebrow uppercase tracking-widest text-cape transition-colors hover:bg-mint-dark disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2 md:w-fit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Enviar consulta
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <AnimatePresence>
        {state.kind === "success" && (
          <SuccessPopup
            email={state.email}
            firstName={state.firstName}
            onClose={() => setState({ kind: "idle" })}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessPopup({
  email,
  firstName,
  onClose,
}: {
  email: string;
  firstName: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      key="success-popup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-cape/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.97 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="relative w-full max-w-lg overflow-hidden rounded-lg border border-mint/20 bg-cape-700 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_60%_at_50%_0%,rgba(218,246,239,0.12),transparent_70%)]"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-pill border border-mint/20 text-mint/70 transition-colors hover:border-mint hover:text-mint"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-10 px-6 pb-8 pt-10 md:px-9 md:pb-9 md:pt-12">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="flex h-14 w-14 items-center justify-center rounded-pill border border-mint/30 bg-mint/10 text-mint"
          >
            <CheckCircle2 className="h-7 w-7" />
          </motion.div>

          <p className="eyebrow mt-6 text-mint">Consulta recibida</p>
          <h3
            id="success-title"
            className="mt-3 font-serif text-2xl font-medium leading-tight text-porcelain md:text-3xl"
          >
            {firstName ? `Gracias, ${firstName}.` : "Gracias por escribirnos."}{" "}
            <span className="italic text-mint">
              Te respondemos pronto.
            </span>
          </h3>

          <ul className="mt-7 space-y-4 border-t border-mint/10 pt-6">
            <Bullet
              icon={<Clock className="h-4 w-4" />}
              title="Respuesta en menos de 24 horas hábiles"
              detail="Lunes a viernes, de 09:00 a 19:00 CLT."
            />
            <Bullet
              icon={<Mail className="h-4 w-4" />}
              title="Te llegará una confirmación a tu correo"
              detail={email}
            />
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-mint px-6 py-3.5 font-mono text-eyebrow uppercase tracking-widest text-cape transition-colors hover:bg-mint-dark"
            >
              ¿Es urgente? WhatsApp
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-mint/30 px-6 py-3.5 font-mono text-eyebrow uppercase tracking-widest text-mint transition-colors hover:bg-mint hover:text-cape"
            >
              Cerrar
            </button>
          </div>

          <p className="mt-6 text-xs text-porcelain/40">
            Si no ves nuestro correo en bandeja de entrada, revisa tu carpeta de
            spam o promociones.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Bullet({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <li className="flex items-start gap-3.5">
      <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-pill border border-mint/25 text-mint">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-sm text-porcelain">{title}</p>
        <p className="mt-0.5 truncate text-xs text-porcelain/55">{detail}</p>
      </div>
    </li>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-md border bg-cape-700/40 px-4 py-3.5 font-sans text-sm text-porcelain placeholder:text-porcelain/30 transition-colors",
    "border-obsidian/40 hover:border-obsidian focus:border-mint focus:outline-none focus:ring-0",
    hasError && "border-rose-400/70 focus:border-rose-300",
  );
}

function Field({
  label,
  id,
  error,
  children,
  className,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className="font-mono text-eyebrow uppercase tracking-widest text-mint/70"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-rose-300/90" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
