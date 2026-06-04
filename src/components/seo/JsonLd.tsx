import { site } from "@/lib/site";

const services = [
  {
    name: "Asesoría Laboral",
    description:
      "Asesoría integral en relaciones laborales, seguridad social, despidos complejos, investigaciones internas, salud ocupacional y asuntos migratorios para empresas.",
  },
  {
    name: "Litigios Laborales",
    description:
      "Representación de empresas y ejecutivos en tribunales del trabajo a lo largo de Chile. Estrategia clara, comunicación constante y honorarios pactados desde el inicio.",
  },
  {
    name: "Compliance Laboral",
    description:
      "Diseño e implementación de políticas, protocolos y prácticas de compliance laboral. Reglamento Interno (RIOHS), Protocolo Ley Karin, Modelo de Prevención de Delitos y Protección de Datos Personales.",
  },
  {
    name: "Migraciones",
    description:
      "Tramitación de visas, residencias y permisos de trabajo para empresas y colaboradores. Asesoría en régimen previsional y desplazamientos temporales en Chile.",
  },
  {
    name: "Negociación Colectiva",
    description:
      "Acompañamiento integral en negociación colectiva reglada y no reglada, mediaciones, calificación de servicios mínimos y relación con organizaciones sindicales.",
  },
  {
    name: "Capacitaciones Legales",
    description:
      "Programas de capacitación corporativa en Responsabilidad Legal, Compliance, Derechos Fundamentales y Ley Karin.",
  },
];

const team = [
  {
    name: "César Rivas Calderón",
    role: "Socio Fundador",
    description:
      "Abogado de la Universidad de Chile titulado con distinción máxima, Máster en Derecho de los Negocios (UAB, España) y Diplomado en Compliance y Gobiernos Corporativos (UDD). Especialista en litigación de alta complejidad, salud ocupacional y asesoría 360°.",
    alma: ["Universidad de Chile", "Universitat Autònoma de Barcelona", "Universidad del Desarrollo"],
    image:
      "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1780606912/CesarCorpo-5_upgu1c.jpg",
    linkedin: "https://www.linkedin.com/in/carivasca/",
  },
  {
    name: "Josefa Yuraszeck Bravo",
    role: "Socia Fundadora",
    description:
      "Abogada de la Universidad de los Andes y Magíster en Derecho Laboral y Seguridad Social (UAI). Especialista en consultoría corporativa, investigaciones críticas y relaciones sindicales.",
    alma: ["Universidad de los Andes", "Universidad Adolfo Ibáñez"],
    image:
      "https://res.cloudinary.com/dg1x0cwdc/image/upload/v1780606911/CesarCorpo-6_qrjpbb.jpg",
    linkedin: "https://www.linkedin.com/in/josefa-yuraszeck-758900127/",
  },
];

const faqs = [
  {
    q: "¿En qué se especializa RYY Abogados?",
    a: "RYY Abogados (Rivas & Yuraszeck Abogados) es un estudio jurídico chileno con más de 10 años de experiencia, especializado en derecho laboral para empresas: litigios, Ley Karin, compliance laboral, negociación colectiva, migraciones y protección de datos personales.",
  },
  {
    q: "¿Dónde están ubicados?",
    a: "Nuestras oficinas están en Santiago de Chile y representamos empresas ante tribunales del trabajo en todo el país.",
  },
  {
    q: "¿Atienden a empresas de cualquier tamaño?",
    a: "Sí. Asesoramos desde pymes hasta grandes empresas con planes de asesoría mensual continua a tarifa fija, además de servicios puntuales por proyecto.",
  },
  {
    q: "¿Cuánto demoran en responder una consulta?",
    a: "Respondemos consultas comerciales en menos de 24 horas hábiles y ofrecemos una reunión de diagnóstico inicial de 30 minutos sin costo.",
  },
  {
    q: "¿Qué incluye el plan de asesoría empresarial mensual?",
    a: "El plan de asesoría mensual incluye soporte permanente en derecho laboral, equipo asignado, canal directo, reportes y, sin costo adicional, la elaboración o actualización del Reglamento Interno de Orden, Higiene y Seguridad (RIOHS).",
  },
  {
    q: "¿Cómo cobran sus honorarios?",
    a: "Trabajamos con honorarios pactados y transparentes desde el inicio: tarifa fija para asesoría mensual continua y planes claros para casos puntuales. Sin sorpresas ni letras chicas.",
  },
];

export function JsonLd() {
  const organizationId = `${site.url}#organization`;
  const websiteId = `${site.url}#website`;

  const graph = [
    {
      "@type": "LegalService",
      "@id": organizationId,
      name: site.legalName,
      alternateName: [site.name, ...site.alternateNames],
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: site.icon,
        width: 1200,
        height: 1200,
      },
      image: site.ogImage,
      description: site.description,
      slogan: site.tagline,
      founder: team.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: m.role,
      })),
      foundingDate: site.founded,
      priceRange: site.priceRange,
      telephone: site.contact.phoneIntl,
      email: site.contact.email,
      areaServed: site.areaServed.map((a) => ({
        "@type": "AdministrativeArea",
        name: a,
      })),
      address: {
        "@type": "PostalAddress",
        addressLocality: site.contact.addressLocality,
        addressRegion: site.contact.addressRegion,
        addressCountry: site.contact.addressCountry,
      },
      sameAs: [site.contact.linkedin, site.contact.whatsapp],
      knowsAbout: [
        "Derecho laboral",
        "Ley Karin",
        "Compliance laboral",
        "Negociación colectiva",
        "Litigios laborales",
        "Migraciones laborales",
        "Protección de datos personales",
        "Salud ocupacional",
        "Reglamento Interno de Orden, Higiene y Seguridad",
        "Modelo de Prevención de Delitos",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios legales",
        itemListElement: services.map((s, i) => ({
          "@type": "Offer",
          position: i + 1,
          itemOffered: {
            "@type": "Service",
            name: s.name,
            description: s.description,
            provider: { "@id": organizationId },
            areaServed: { "@type": "Country", name: "Chile" },
          },
        })),
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: site.contact.phoneIntl,
          email: site.contact.email,
          availableLanguage: ["Spanish", "es-CL"],
          areaServed: "CL",
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          url: site.contact.whatsapp,
          availableLanguage: ["Spanish", "es-CL"],
          areaServed: "CL",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: site.url,
      name: site.name,
      description: site.shortDescription,
      inLanguage: site.locale,
      publisher: { "@id": organizationId },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}#webpage`,
      url: site.url,
      name: `${site.name} — Asesoría laboral y empresarial en Chile`,
      description: site.description,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      inLanguage: site.locale,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: site.ogImage,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Servicios",
          item: `${site.url}#servicios`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Equipo",
          item: `${site.url}#equipo`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Contacto",
          item: `${site.url}#contacto`,
        },
      ],
    },
    ...team.map((m) => ({
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      description: m.description,
      image: m.image,
      url: m.linkedin,
      sameAs: [m.linkedin],
      worksFor: { "@id": organizationId },
      alumniOf: m.alma.map((a) => ({
        "@type": "EducationalOrganization",
        name: a,
      })),
      nationality: { "@type": "Country", name: "Chile" },
    })),
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
