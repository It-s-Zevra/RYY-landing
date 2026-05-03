import { z } from "zod";
import { site } from "./site";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Ingresa tu nombre completo"),
  company: z.string().min(2, "Ingresa el nombre de tu empresa"),
  rut: z
    .string()
    .min(8, "RUT inválido")
    .regex(/^[0-9kK.\-]+$/, "Formato de RUT inválido"),
  role: z.string().min(2, "Ingresa tu cargo"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .min(8, "Teléfono inválido")
    .regex(/^[0-9+\s()\-]+$/, "Formato inválido"),
  consultType: z.enum(site.consultTypes, {
    errorMap: () => ({ message: "Selecciona un tipo de consulta" }),
  }),
  companySize: z.enum(site.companySizes, {
    errorMap: () => ({ message: "Selecciona un tamaño" }),
  }),
  message: z
    .string()
    .min(20, "Cuéntanos al menos un poco más sobre el caso (20 caracteres)")
    .max(2000, "Máximo 2000 caracteres"),
  acceptsPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad" }),
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
