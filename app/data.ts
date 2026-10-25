export type Lang = "es" | "en";

export const EMAIL = "jhalddryg@gmail.com";
export const LINKEDIN = "https://linkedin.com/in/jhalddry";
export const GITHUB = "https://github.com/Jhalddry";
export const CV_ES = "/Jhalddry_Gonzalez_CV_ES.pdf";
export const CV_EN = "/Jhalddry_Gonzalez_CV_EN.pdf";
export const CERTS = [
  { name: "JavaScript", href: "https://www.udemy.com/certificate/UC-9c697e26-9557-4551-a386-ad2a0f4fcf65/" },
  { name: "React", href: "https://www.udemy.com/certificate/UC-a9ac093f-cd79-4eb4-a233-eb07449cb75e/" },
  { name: "Next.js", href: "https://www.udemy.com/certificate/UC-dc6638ac-4c3d-4797-9c5c-a3153e1e078e/" },
];

export const STACK_A = ["TypeScript", "Next.js", "React", "React Native", "Expo", "Node.js", "PostgreSQL", "MongoDB", "Supabase", "Drizzle", "Tailwind", "MUI"];
export const STACK_B = ["WebRTC", "MCP", "OAuth 2.1", "Vercel AI SDK", "Zod", "AWS S3", "Vercel", "GitHub Actions", "Vitest", ".NET", "C#", "WhatsApp API"];

type Step = { t: string; d: string };
type Scheme = { tab: string; title: string; steps: Step[]; note: string };
type Product = {
  id: string;
  name: string;
  tag: string;
  role: string;
  desc: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

export type Copy = {
  nav: { work: string; plans: string; contact: string };
  hero: { hi: string; pre: string; phrases: string[]; intro: string; cta: string; cv: string; scroll: string };
  work: { label: string; title: string; more: string; moreItems: { name: string; text: string }[]; private: string };
  products: Product[];
  plans: { label: string; title: string; intro: string; play: string; pause: string; step: string; schemes: Scheme[] };
  method: { label: string; items: { t: string; d: string }[] };
  contact: {
    label: string;
    title: string;
    name: string;
    email: string;
    who: string;
    whoItems: string[];
    msg: string;
    ph: string;
    send: string;
    sending: string;
    errName: string;
    errEmail: string;
    errMsg: string;
    openMail: string;
    fail: string;
    okTitle: string;
    okText: (n: string, e: string) => string;
    langs: string;
    certs: string;
  };
  footer: string;
};

export const COPY: Record<Lang, Copy> = {
  es: {
    nav: { work: "Trabajo", plans: "Planos", contact: "Contacto" },
    hero: {
      hi: "hola, soy",
      pre: "Hago que las apps",
      phrases: ["hablen entre sí", "chateen en vivo", "usen inteligencia artificial", "funcionen en tu celular", "sean seguras"],
      intro: "Desarrollador full stack en Maturín, Venezuela. Construyo productos web y móviles que se conectan con los sistemas que las empresas ya usan.",
      cta: "Hablemos",
      cv: "Descargar CV",
      scroll: "desliza",
    },
    work: {
      label: "Trabajo",
      title: "Productos en los que he trabajado",
      more: "También",
      moreItems: [
        { name: "Labor Lens", text: "Dos integraciones de nómina y el motor de periodos de pago que alimenta los reportes de ingresos y costo laboral. Desarrollador principal." },
        { name: "DNK · vía Nerdery", text: "Páginas y funciones de una aplicación empresarial para un cliente de Estados Unidos, junto a su equipo de ingeniería." },
      ],
      private: "Zero CRM y Zero son productos de empresa: el código es privado y por eso no hay repositorio. Puedes ver ambos en producción.",
    },
    products: [
      {
        id: "crm",
        name: "Zero CRM",
        tag: "CRM con IA para colegios y organizaciones",
        role: "Desarrollador full stack · jul – oct 2026 · en equipo",
        desc: "Un solo lugar para atender por WhatsApp, Instagram, Messenger, correo y chat web, con tableros, flujos conversacionales visuales y agentes de IA.",
        points: [
          "Conecté el CRM con asistentes de IA (Claude, ChatGPT, Cursor) con un servidor MCP y una autenticación OAuth 2.1 hecha desde cero. Cada herramienta depende del rol de la persona.",
          "Agentes de IA que responden desde los documentos de la institución, verifican la identidad con un código y no inventan datos.",
          "Los leads de Facebook e Instagram Ads entran solos al CRM, y se puede cobrar con un enlace de pago dentro de la conversación.",
          "Ronda de seguridad multi-negocio: ningún negocio puede ver datos de otro.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "MongoDB", "MUI", "Vercel AI SDK", "Zod", "MCP", "Meta API", "Vitest"],
        links: [{ label: "Ver en producción", href: "https://crm.zero.com.do/" }],
      },
      {
        id: "zero",
        name: "Zero",
        tag: "Facturación electrónica, contabilidad, nómina y POS",
        role: "Desarrollador full stack · ago – oct 2026 · equipo de 3 o más",
        desc: "Plataforma SaaS en producción para República Dominicana: facturación electrónica (e-CF / DGII), contabilidad, nómina, punto de venta y administración escolar.",
        points: [
          "Zero Tickets: un sistema de soporte con cola, presencia y cierre automático, construido de esquema a interfaz.",
          "Videollamada punto a punto con pantalla compartida y grabación en la nube, hecha con WebRTC y sin servicios de video de terceros.",
          "Servidor MCP de solo lectura para consultar la facturación desde IA, y cinco hallazgos de seguridad que encontré en mi propia auditoría y cerré.",
          "CI/CD con aprobación manual antes de tocar la base de datos de producción, y un motor de permisos por rol.",
          "Habilitación de e-CF ante la DGII en 15 pasos, con alertas por Slack y correo.",
        ],
        stack: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Drizzle", "WebRTC", "AWS S3", "GitHub Actions", "Vercel"],
        links: [{ label: "Ver en producción", href: "https://app.zero.com.do/" }],
      },
      {
        id: "cancha",
        name: "La Cancha",
        tag: "Proyecto propio · app móvil",
        role: "Desarrollador único · may – jun 2026",
        desc: "App para organizar partidos deportivos en Venezuela: buscas un partido cerca, te unes, chateas con el grupo y calificas a los jugadores. La diseñé, construí y publiqué sola en cinco semanas.",
        points: [
          "Chat en tiempo real con confirmación de lectura, indicador de escritura y mensajes no leídos.",
          "Seguridad por fila en cada tabla de la base de datos, y reputación e insignias que se calculan solas.",
          "Pensada para Venezuela: precios en dólares y bolívares, con Pago Móvil, Zelle y USDT.",
          "Sistema de diseño propio con modo claro y oscuro.",
        ],
        stack: ["React Native", "Expo SDK 54", "TypeScript", "Supabase", "Zustand"],
        links: [
          { label: "Probar la app", href: "https://appetize.io/app/b_7pp754x34hy5gigrs7j36bs57m" },
          { label: "Código", href: "https://github.com/Jhalddry/la-cancha" },
          { label: "Expo", href: "https://expo.dev/accounts/jhalddry/projects/la-cancha" },
        ],
      },
    ],
    plans: {
      label: "Planos",
      title: "Cómo funcionan por dentro",
      intro: "Cuatro esquemas de cosas que construí. Toca un paso o deja que corra solo.",
      play: "Reproducir",
      pause: "Pausar",
      step: "Paso",
      schemes: [
        {
          tab: "IA + CRM",
          title: "IA conectada al CRM",
          note: "Zero CRM. Todo el proceso de autorización está hecho desde cero, siguiendo los estándares.",
          steps: [
            { t: "Asistente de IA", d: "Claude, ChatGPT o Cursor piden conectarse al CRM." },
            { t: "Autorización", d: "La persona ve a qué app le da acceso y aprueba. OAuth 2.1 con PKCE, tokens que rotan y se pueden revocar." },
            { t: "Servidor MCP", d: "Un único punto de entrada que habla el protocolo que entienden los asistentes." },
            { t: "Permisos por rol", d: "Cada persona recibe solo las herramientas que su rol permite. Las rutas sensibles quedan bloqueadas." },
            { t: "El CRM", d: "Prospectos, tickets, citas y recordatorios, al alcance de una conversación." },
          ],
        },
        {
          tab: "Videollamada",
          title: "Videollamada de soporte",
          note: "Zero. La conexión vive en un único proveedor global: navegar por la app ya no corta la llamada.",
          steps: [
            { t: "Invitar", d: "Soporte abre la llamada desde el ticket." },
            { t: "Aceptar", d: "El cliente acepta o rechaza. Si nadie responde, la invitación expira." },
            { t: "Conexión directa", d: "WebRTC une ambos navegadores entre sí. Un relay TURN ayuda cuando la red lo bloquea." },
            { t: "Grabación", d: "Se graba por segmentos, con aviso visible, y se guarda en la nube." },
            { t: "Colgar", d: "Se cierra todo en ambos lados, sin dejar la pantalla compartida abierta." },
          ],
        },
        {
          tab: "Agente de IA",
          title: "Agente de IA con guardrails",
          note: "Zero CRM. El modelo no puede cambiar a quién consulta: la identidad la fija el flujo.",
          steps: [
            { t: "Mensaje", d: "Una persona escribe por WhatsApp, chat web o correo." },
            { t: "Identidad", d: "Un código de un solo uso verifica quién es antes de mostrar datos." },
            { t: "IA con herramientas", d: "Solo puede consultar, y siempre sobre la identidad ya verificada." },
            { t: "Base de conocimiento", d: "Busca en los documentos de la institución y cita la fuente." },
            { t: "Respuesta", d: "Si no está en los documentos, lo dice. No inventa." },
          ],
        },
        {
          tab: "La Cancha",
          title: "La Cancha por dentro",
          note: "Proyecto propio, de la app al dato calculado.",
          steps: [
            { t: "App móvil", d: "Expo y React Native: buscar, crear, unirse, chatear y calificar." },
            { t: "Tiempo real", d: "Chat con lectura, escritura y presencia sobre Supabase Realtime." },
            { t: "Datos con reglas", d: "PostgreSQL con seguridad por fila en cada tabla." },
            { t: "Funciones controladas", d: "Permisos elevados solo en las funciones donde hace falta." },
            { t: "Reputación", d: "Triggers calculan reputación e insignias sin código de la app." },
          ],
        },
      ],
    },
    method: {
      label: "Método",
      items: [
        { t: "Primero el plan", d: "Casi cada función grande empieza con un documento de diseño y un plan." },
        { t: "Medir, no suponer", d: "Verifico antes y después de cada corrección, sobre todo en seguridad." },
        { t: "La IA como herramienta", d: "Uso Claude Code para acelerar. Yo defino los requisitos, reviso y verifico." },
      ],
    },
    contact: {
      label: "Contacto",
      title: "¿Tienes una vacante o un proyecto en mente?",
      name: "Nombre",
      email: "Email",
      who: "Vienes como",
      whoItems: ["Reclutador/a", "Cliente", "Equipo tech", "Solo saludar"],
      msg: "Mensaje",
      ph: "Cuéntame qué necesitas o pega el enlace de la oferta.",
      send: "Enviar mensaje",
      sending: "Enviando…",
      errName: "Dime tu nombre.",
      errEmail: "Revisa el email.",
      errMsg: "Cuéntame un poco más.",
      openMail: "Abriendo tu correo…",
      fail: "No se pudo enviar. Escríbeme a",
      okTitle: "Mensaje enviado.",
      okText: (n, e) => `Gracias, ${n}. Te respondo a ${e} lo antes posible.`,
      langs: "Español nativo · Inglés profesional",
      certs: "Certificados de Udemy",
    },
    footer: "Maturín, Venezuela",
  },
  en: {
    nav: { work: "Work", plans: "Blueprints", contact: "Contact" },
    hero: {
      hi: "hi, I'm",
      pre: "I make apps",
      phrases: ["talk to each other", "chat in real time", "use artificial intelligence", "work on your phone", "stay secure"],
      intro: "Full stack developer in Maturín, Venezuela. I build web and mobile products that connect to the systems companies already use.",
      cta: "Let's talk",
      cv: "Download CV",
      scroll: "scroll",
    },
    work: {
      label: "Work",
      title: "Products I have worked on",
      more: "Also",
      moreItems: [
        { name: "Labor Lens", text: "Two payroll integrations and the pay-period engine behind the revenue and labor-cost reports. Lead developer." },
        { name: "DNK · via Nerdery", text: "Pages and features of an enterprise application for a US client, working alongside their engineering team." },
      ],
      private: "Zero CRM and Zero are company products: the code is private, so there is no repository. You can see both live.",
    },
    products: [
      {
        id: "crm",
        name: "Zero CRM",
        tag: "AI-powered CRM for schools and organizations",
        role: "Full stack developer · Jul – Oct 2026 · team project",
        desc: "One place to handle WhatsApp, Instagram, Messenger, email and web chat, with boards, visual conversation flows and AI agents.",
        points: [
          "Connected the CRM to AI assistants (Claude, ChatGPT, Cursor) with an MCP server and OAuth 2.1 authentication built from scratch. Every tool depends on the person's role.",
          "AI agents that answer from the institution's own documents, verify identity with a code and never make up data.",
          "Facebook and Instagram Ads leads land in the CRM on their own, and you can charge through a payment link inside the conversation.",
          "A multi-business security pass: no business can see another one's data.",
        ],
        stack: ["Next.js 16", "React 19", "TypeScript", "MongoDB", "MUI", "Vercel AI SDK", "Zod", "MCP", "Meta API", "Vitest"],
        links: [{ label: "See it live", href: "https://crm.zero.com.do/" }],
      },
      {
        id: "zero",
        name: "Zero",
        tag: "E-invoicing, accounting, payroll and POS",
        role: "Full stack developer · Aug – Oct 2026 · team of 3 or more",
        desc: "A SaaS platform in production for the Dominican Republic: electronic invoicing (e-CF / DGII), accounting, payroll, point of sale and school administration.",
        points: [
          "Zero Tickets: a support system with queue, presence and auto-close, built from schema to interface.",
          "Peer-to-peer video calls with screen sharing and cloud recording, built on WebRTC with no third-party video service.",
          "A read-only MCP server to query invoicing from AI, plus five security findings I found in my own audit and closed.",
          "CI/CD with manual approval before touching the production database, and a role-based permissions engine.",
          "e-CF onboarding with the DGII in 15 steps, with Slack and email alerts.",
        ],
        stack: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Drizzle", "WebRTC", "AWS S3", "GitHub Actions", "Vercel"],
        links: [{ label: "See it live", href: "https://app.zero.com.do/" }],
      },
      {
        id: "cancha",
        name: "La Cancha",
        tag: "Own project · mobile app",
        role: "Solo developer · May – Jun 2026",
        desc: "An app to organize pickup sports games in Venezuela: find a game nearby, join, chat with the group and rate the players. I designed, built and shipped it alone in five weeks.",
        points: [
          "Real-time chat with read receipts, typing indicator and unread counts.",
          "Row-level security on every database table, and reputation and badges that compute themselves.",
          "Built for Venezuela: prices in dollars and bolívares, with Pago Móvil, Zelle and USDT.",
          "A custom design system with light and dark modes.",
        ],
        stack: ["React Native", "Expo SDK 54", "TypeScript", "Supabase", "Zustand"],
        links: [
          { label: "Try the app", href: "https://appetize.io/app/b_7pp754x34hy5gigrs7j36bs57m" },
          { label: "Code", href: "https://github.com/Jhalddry/la-cancha" },
          { label: "Expo", href: "https://expo.dev/accounts/jhalddry/projects/la-cancha" },
        ],
      },
    ],
    plans: {
      label: "Blueprints",
      title: "How they work inside",
      intro: "Four diagrams of things I built. Tap a step or let it run on its own.",
      play: "Play",
      pause: "Pause",
      step: "Step",
      schemes: [
        {
          tab: "AI + CRM",
          title: "AI connected to the CRM",
          note: "Zero CRM. The whole authorization flow is built from scratch, following the standards.",
          steps: [
            { t: "AI assistant", d: "Claude, ChatGPT or Cursor ask to connect to the CRM." },
            { t: "Authorization", d: "The person sees which app gets access and approves. OAuth 2.1 with PKCE, tokens that rotate and can be revoked." },
            { t: "MCP server", d: "A single entry point that speaks the protocol assistants understand." },
            { t: "Role permissions", d: "Each person only gets the tools their role allows. Sensitive routes stay blocked." },
            { t: "The CRM", d: "Leads, tickets, appointments and reminders, within reach of a conversation." },
          ],
        },
        {
          tab: "Video call",
          title: "Support video call",
          note: "Zero. The connection lives in one global provider: navigating around the app no longer drops the call.",
          steps: [
            { t: "Invite", d: "Support opens the call from the ticket." },
            { t: "Accept", d: "The customer accepts or declines. If nobody answers, the invite expires." },
            { t: "Direct connection", d: "WebRTC links both browsers to each other. A TURN relay helps when the network blocks it." },
            { t: "Recording", d: "Recorded in segments, with a visible notice, and stored in the cloud." },
            { t: "Hang up", d: "Everything closes on both sides, without leaving screen sharing open." },
          ],
        },
        {
          tab: "AI agent",
          title: "AI agent with guardrails",
          note: "Zero CRM. The model cannot change whom it queries: the flow fixes the identity.",
          steps: [
            { t: "Message", d: "Someone writes through WhatsApp, web chat or email." },
            { t: "Identity", d: "A one-time code verifies who they are before any data is shown." },
            { t: "AI with tools", d: "It can only read, and always about the already verified identity." },
            { t: "Knowledge base", d: "Searches the institution's documents and cites the source." },
            { t: "Answer", d: "If it is not in the documents, it says so. It does not make things up." },
          ],
        },
        {
          tab: "La Cancha",
          title: "La Cancha inside",
          note: "Own project, from the app to the computed data.",
          steps: [
            { t: "Mobile app", d: "Expo and React Native: search, create, join, chat and rate." },
            { t: "Real time", d: "Chat with read, typing and presence on Supabase Realtime." },
            { t: "Data with rules", d: "PostgreSQL with row-level security on every table." },
            { t: "Controlled functions", d: "Elevated permissions only in the functions that need them." },
            { t: "Reputation", d: "Triggers compute reputation and badges with no app code." },
          ],
        },
      ],
    },
    method: {
      label: "Method",
      items: [
        { t: "Plan first", d: "Almost every big feature starts with a design document and a plan." },
        { t: "Measure, don't assume", d: "I verify before and after every fix, especially for security." },
        { t: "AI as a tool", d: "I use Claude Code to move faster. I define the requirements, review and verify." },
      ],
    },
    contact: {
      label: "Contact",
      title: "Have an opening or a project in mind?",
      name: "Name",
      email: "Email",
      who: "You are a",
      whoItems: ["Recruiter", "Client", "Tech team", "Just saying hi"],
      msg: "Message",
      ph: "Tell me what you need or paste the job posting link.",
      send: "Send message",
      sending: "Sending…",
      errName: "Tell me your name.",
      errEmail: "Check the email.",
      errMsg: "Tell me a bit more.",
      openMail: "Opening your mail app…",
      fail: "Could not send. Write to me at",
      okTitle: "Message sent.",
      okText: (n, e) => `Thanks, ${n}. I'll reply to ${e} as soon as I can.`,
      langs: "Native Spanish · Professional English",
      certs: "Udemy certificates",
    },
    footer: "Maturín, Venezuela",
  },
};

export const LANGS: Lang[] = ["es", "en"];
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jhalddry-gonzalez.vercel.app";

export const SEO: Record<Lang, { title: string; description: string; role: string; locale: string; skip: string }> = {
  es: {
    title: "Jhalddry González · Desarrollador Full Stack",
    description:
      "Desarrollador full stack en Maturín, Venezuela. Integraciones con terceros, tiempo real, IA en producción y apps móviles. Zero CRM, Zero y La Cancha.",
    role: "Desarrollador Full Stack",
    locale: "es_VE",
    skip: "Saltar al contenido",
  },
  en: {
    title: "Jhalddry González · Full Stack Developer",
    description:
      "Full stack developer in Maturín, Venezuela. Third-party integrations, real time, AI in production and mobile apps. Zero CRM, Zero and La Cancha.",
    role: "Full Stack Developer",
    locale: "en_US",
    skip: "Skip to content",
  },
};
