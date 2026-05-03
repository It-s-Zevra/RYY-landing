"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
    // Mock submit — wire to /api/contact or Resend later.
    await new Promise((r) => setTimeout(r, 900));
    console.info("contact submission", data);
    setSubmitted(true);
    reset();
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-start gap-5 rounded-lg border border-mint/30 bg-cape-700 p-8"
          >
            <CheckCircle2 className="h-8 w-8 text-mint" />
            <div>
              <p className="eyebrow text-mint">Recibido</p>
              <h3 className="mt-3 font-serif text-2xl font-medium text-porcelain">
                Te llamaremos en menos de 24 horas hábiles.
              </h3>
              <p className="mt-3 text-sm text-porcelain/70">
                Si tu caso es urgente, escríbenos directo al WhatsApp{" "}
                <a
                  href={site.contact.whatsapp}
                  className="font-medium text-mint underline-offset-4 hover:underline"
                >
                  {site.contact.phone}
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 font-mono text-eyebrow uppercase tracking-widest text-mint underline-offset-4 hover:underline"
              >
                Enviar otra consulta →
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                  Acepto la política de privacidad y el tratamiento de mis
                  datos bajo la Ley 19.628.
                </span>
              </label>
              {errors.acceptsPrivacy && (
                <p className="mt-2 text-xs text-rose-300">
                  {errors.acceptsPrivacy.message}
                </p>
              )}
            </div>

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
          </motion.form>
        )}
      </AnimatePresence>
    </div>
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
