export const site = {
  name: "RYY Abogados",
  legalName: "Rivas & Yuraszeck Abogados",
  url: "https://ryyabogados.cl",
  locale: "es-CL",
  description:
    "Estudio jurídico chileno con +10 años de experiencia. Especialistas en derecho laboral, juicios, Ley Karin, compliance y protección de datos. Asesoría permanente para empresas.",
  logos: {
    light:
      "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777776229/icoW1_dat3ng.png",
    dark: "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1777776230/icoB1_roek5w.png",
  },
  hero: {
    bg: "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1778593188/ChatGPT_Image_12_may_2026_09_38_07_jl6kwf.png",
  },
  contact: {
    phone: "+56 9 7766 0481",
    phoneIntl: "+56977660481",
    whatsapp: "https://wa.me/56977660481",
    email: "contacto@ryyabogados.cl",
    address: "Santiago de Chile",
    linkedin: "https://www.linkedin.com/company/ryy-abogados",
  },
  nav: [
    { label: "Equipo", href: "#equipo" },
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Insights", href: "#insights" },
    { label: "Contacto", href: "#contacto" },
  ],
  consultTypes: [
    "Asesoría Laboral",
    "Litigios",
    "Compliance Laboral",
    "Migraciones",
    "Negociación Colectiva",
    "Capacitaciones",
    "Otro",
  ],
  companySizes: ["1-10", "11-50", "51-200", "200+"] as const,
} as const;
