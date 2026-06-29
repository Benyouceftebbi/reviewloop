"use client";

/*
  /landing4 — "Aurora Agent"

  Visual sibling of /landing3 (Aurora Spotlight): same electric-blue aurora
  identity, scale+blur reveals, and centered spotlight composition. The
  PURPOSE is completely different, though.

  Where landing1–3 sell "collect reviews + turn them into video", landing4
  sells an AUTONOMOUS AI AGENT that runs reputation management for an
  agency's roster of local-business clients:

    - Reaches out to customers by SMS, email, and outbound call.
    - Books and joins meetings to ask about the experience.
    - Captures answers as text, audio, and video.
    - Generates posts + video and asks customers to publish to Google Maps.
    - Ranks incoming reviews and surfaces what's going well / what's not.

  Target: social-media agencies & freelance managers handling spas, salons,
  clinics, restaurants and other local businesses that live on Google Maps.

  Centerpiece: a LIVE, interactive agent demo. The visitor supplies real
  variables — business type, client name, when the experience happened, and
  what they got — then watches the agent run a (simulated) multi-channel
  conversation and render an accurate Google Maps review from that data.

  Notes carried over from the brief:
    - Google Maps templates stay front and center (now with an extra example).
    - Pricing stays number-free: per-client + founder pricing only.
    - No fabricated testimonials anywhere; social-proof slots stay empty.
*/

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { useReveal } from "../landing1/useReveal";
import {
  TemplatePicker,
  TemplatePreview,
  SAMPLE_REVIEW,
  type ReviewData,
} from "../landing-templates/templates";

/* Accent + surface tokens local to this page. */
const ACCENT = "#4D9FFF";
const ACCENT_SOFT = "#A9CEFF";
const CANVAS = "#070A12";

export default function Landing4() {
  return (
    <main
      className="relative min-h-screen overflow-x-hidden font-sans antialiased"
      style={{ backgroundColor: CANVAS, color: "#EAF1FF" }}
    >
      <AuroraBackground />
      <Nav />
      <Hero />
      <TrustBar />
      <Channels />
      <LiveAgentDemo />
      <Capture />
      <ContentEngine />
      <GooglePush />
      <Insights />
      <HowItWorks />
      <Proof />
      <WhoFor />
      <Pricing />
      <Waitlist />
      <Footer />
      <LocalStyles />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Background — drifting aurora orbs                                   */
/* ------------------------------------------------------------------ */

function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, rgba(77,159,255,0.12), transparent 60%)",
        }}
      />
      <div
        className="l3-orb absolute left-1/2 top-[-10%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(77,159,255,0.22), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="l3-orb-slow absolute left-[8%] top-[42%] h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,92,255,0.16), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="l3-orb absolute right-[6%] top-[64%] h-[30rem] w-[30rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.12), transparent 70%)",
          filter: "blur(55px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(100% 60% at 50% 30%, black, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                 */
/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="relative z-20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#top" className="flex items-center gap-2">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">
            reviewloop
          </span>
          <span
            className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ backgroundColor: "rgba(77,159,255,0.14)", color: ACCENT }}
          >
            Agent
          </span>
        </a>
        <div className="hidden items-center gap-8 text-[14px] text-white/60 md:flex">
          <a href="#channels" className="transition-colors hover:text-white">
            Channels
          </a>
          <a href="#demo" className="transition-colors hover:text-white">
            Live demo
          </a>
          <a href="#insights" className="transition-colors hover:text-white">
            Insights
          </a>
          <a href="#pricing" className="transition-colors hover:text-white">
            Pricing
          </a>
        </div>
        <a
          href="#waitlist"
          className="rounded-full px-5 py-2 text-[14px] font-semibold transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: ACCENT, color: CANVAS }}
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <span
      className="flex h-7 w-7 items-center justify-center rounded-lg"
      style={{ backgroundColor: ACCENT, color: CANVAS }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative z-10 px-6 pb-20 pt-16 text-center sm:pt-24">
      <div className="mx-auto max-w-3xl">
        <span
          className="l3-pop inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-medium"
          style={{ borderColor: "rgba(77,159,255,0.35)", color: ACCENT_SOFT }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          An AI agent for reputation management
        </span>

        <h1
          className="l3-pop mt-7 text-balance text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.05] tracking-tight"
          style={{ animationDelay: "0.06s" }}
        >
          An AI agent that collects{" "}
          <span style={{ color: ACCENT }}>reviews</span> for every client —{" "}
          <span className="font-serif italic" style={{ color: ACCENT_SOFT }}>
            on autopilot.
          </span>
        </h1>

        <p
          className="l3-pop mx-auto mt-6 max-w-xl text-pretty text-[1.075rem] leading-relaxed text-white/65"
          style={{ animationDelay: "0.12s" }}
        >
          It texts, emails, and calls your clients&apos; customers, asks about
          their experience, captures the answer, and turns it into a post — then
          asks them to publish it to Google Maps. Reputation management, run by
          an agent.
        </p>

        <div
          className="l3-pop mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "0.18s" }}
        >
          <a
            href="#waitlist"
            className="w-full rounded-full px-7 py-3.5 text-center text-[15px] font-semibold transition-transform hover:scale-[1.02] sm:w-auto"
            style={{ backgroundColor: ACCENT, color: CANVAS }}
          >
            Join the waitlist — start with a free trial
          </a>
          <a
            href="#demo"
            className="w-full rounded-full border px-7 py-3.5 text-center text-[15px] font-semibold text-white/80 transition-colors hover:text-white sm:w-auto"
            style={{ borderColor: "rgba(255,255,255,0.16)" }}
          >
            Talk to the agent — live demo
          </a>
        </div>

        <p
          className="l3-pop mt-4 text-[13px] text-white/40"
          style={{ animationDelay: "0.24s" }}
        >
          Free trial · No card required · Founder pricing for early members
        </p>
      </div>

      <HeroPreview />
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="l3-pop mx-auto mt-16 max-w-4xl" style={{ animationDelay: "0.3s" }}>
      <div
        className="grid gap-4 rounded-3xl border p-4 sm:grid-cols-2 sm:p-6"
        style={{
          borderColor: "rgba(255,255,255,0.1)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          boxShadow: "0 40px 120px -40px rgba(77,159,255,0.35)",
        }}
      >
        {/* Agent conversation glance */}
        <div
          className="rounded-2xl border p-5 text-left"
          style={{
            borderColor: "rgba(77,159,255,0.25)",
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        >
          <div className="flex items-center gap-2">
            <AgentDot />
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Agent · SMS
            </p>
          </div>
          <div className="mt-4 space-y-2.5">
            <Bubble side="agent">
              Hi Maya! How was your facial at Glow Skin Spa yesterday?
            </Bubble>
            <Bubble side="client">
              Honestly amazing — best I&apos;ve had in the city.
            </Bubble>
            <Bubble side="agent">
              Love that. Mind if I post it to Google for you?
            </Bubble>
            <Bubble side="client">Go for it!</Bubble>
          </div>
        </div>

        {/* Generated Maps review */}
        <div
          className="rounded-2xl border p-5 text-left"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Published to Google Maps
          </p>
          <div className="mt-4">
            <TemplatePreview accent={ACCENT} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trust bar                                                           */
/* ------------------------------------------------------------------ */

function TrustBar() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative z-10 px-6 py-10">
      <div
        ref={ref}
        data-revealed="false"
        className="l3-reveal mx-auto max-w-4xl text-center"
      >
        <p className="text-[12px] uppercase tracking-[0.25em] text-white/35">
          Built for agencies running local businesses on Google Maps
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[15px] font-medium text-white/45">
          {["Spas & salons", "Clinics & dental", "Restaurants & cafés", "Gyms & studios"].map(
            (t) => (
              <span key={t}>{t}</span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Channels — multi-channel outreach                                   */
/* ------------------------------------------------------------------ */

function Channels() {
  const ref = useReveal<HTMLDivElement>();
  const channels = [
    {
      tag: "SMS",
      title: "Texts that get replies",
      body: "The agent opens with a friendly, on-brand text moments after a visit — when the experience is still fresh.",
      icon: <IconSms />,
    },
    {
      tag: "Email",
      title: "Personalized follow-ups",
      body: "Branded email sequences that nudge without nagging, tuned to each client's voice and cadence.",
      icon: <IconMail />,
    },
    {
      tag: "Outbound call",
      title: "Real voice conversations",
      body: "For higher-value customers, the agent places a natural outbound call and captures the answer as audio.",
      icon: <IconPhone />,
    },
    {
      tag: "Meetings",
      title: "Books & joins meetings",
      body: "Schedules a quick video chat, joins alongside your client, and asks the right questions on camera.",
      icon: <IconCalendar />,
    },
  ];
  return (
    <section id="channels" className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="Multi-channel outreach"
          title="It reaches customers wherever they are"
          sub="One agent, every channel. It picks the right way to reach each customer and follows up until it gets an answer."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c) => (
            <div
              key={c.tag}
              className="l3-lift rounded-3xl border p-6"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(77,159,255,0.14)", color: ACCENT }}
              >
                {c.icon}
              </span>
              <p
                className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                {c.tag}
              </p>
              <h3 className="mt-1.5 text-[1.05rem] font-semibold">{c.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Live agent demo — the interactive centerpiece                       */
/* ------------------------------------------------------------------ */

type Msg = { side: "agent" | "client" | "system"; channel?: string; text: string };

const BUSINESS_TYPES = [
  "Day spa",
  "Hair salon",
  "Dental clinic",
  "Restaurant",
  "Barbershop",
  "Med spa",
  "Fitness studio",
  "Café",
];

const WHEN_OPTIONS = ["earlier today", "yesterday", "2 days ago", "last week"];

/* Builds a deterministic conversation + review from the visitor's inputs.
   No live model call — this is an accurate, data-driven simulation so an
   agency can see exactly what the agent would produce for a given client. */
function buildScript(input: {
  business: string;
  clientName: string;
  when: string;
  service: string;
}) {
  const { business, clientName, when, service } = input;
  const first = (clientName || "there").trim().split(" ")[0] || "there";
  const svc = (service || "visit").trim().toLowerCase();
  const biz = business.toLowerCase();

  const messages: Msg[] = [
    {
      side: "agent",
      channel: "SMS",
      text: `Hi ${first}! This is Ava from your ${biz}. How was your ${svc} ${when}?`,
    },
    {
      side: "client",
      text: `Honestly? Really happy. The ${svc} was exactly what I needed and the team was lovely.`,
    },
    {
      side: "agent",
      channel: "Call",
      text: `That's wonderful to hear. Would you come back and recommend us to a friend?`,
    },
    {
      side: "client",
      text: `Definitely — already telling everyone about it.`,
    },
    {
      side: "agent",
      channel: "SMS",
      text: `Amazing. I've written this up as a review — want me to publish it to your Google profile?`,
    },
    {
      side: "system",
      text: `Captured answer · drafted post · sent Google Maps publish link to ${first}.`,
    },
  ];

  const review: ReviewData = {
    stars: 5,
    review: `Came in for a ${svc} ${when} and it was a fantastic experience. The team was warm and professional from start to finish — exactly what you want from a great ${biz}. Already booked my next visit and recommending it to everyone I know!`,
    name: clientName || "Maya Roberts",
    date: when === "earlier today" ? "today" : when,
    logo: SAMPLE_REVIEW.logo,
  };

  return { messages, review };
}

function LiveAgentDemo() {
  const ref = useReveal<HTMLDivElement>();

  const [business, setBusiness] = useState(BUSINESS_TYPES[0]);
  const [clientName, setClientName] = useState("Maya Roberts");
  const [when, setWhen] = useState(WHEN_OPTIONS[1]);
  const [service, setService] = useState("deep-tissue massage");

  const [running, setRunning] = useState(false);
  const [revealed, setRevealed] = useState(0);

  const { messages, review } = useMemo(
    () => buildScript({ business, clientName, when, service }),
    [business, clientName, when, service],
  );

  const finished = running && revealed >= messages.length;

  // Reveal messages one at a time while running.
  useEffect(() => {
    if (!running) return;
    if (revealed >= messages.length) return;
    const delay = revealed === 0 ? 250 : 900;
    const t = setTimeout(() => setRevealed((n) => n + 1), delay);
    return () => clearTimeout(t);
  }, [running, revealed, messages.length]);

  function runAgent() {
    setRevealed(0);
    setRunning(true);
  }

  function reset() {
    setRunning(false);
    setRevealed(0);
  }

  return (
    <section id="demo" className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="Live demo"
          title="Talk to the agent with your own data"
          sub="Fill in a real client scenario, then watch the agent run the conversation and produce an accurate Google Maps review from it."
        />

        <div
          className="mt-12 grid gap-5 rounded-3xl border p-5 lg:grid-cols-[360px_1fr] sm:p-7"
          style={{
            borderColor: "rgba(77,159,255,0.3)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
            boxShadow: "0 40px 140px -50px rgba(77,159,255,0.45)",
          }}
        >
          {/* Controls */}
          <div
            className="rounded-2xl border p-5"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/40">
              Scenario
            </p>

            <div className="mt-5 space-y-4">
              <Field label="Type of business">
                <select
                  value={business}
                  onChange={(e) => {
                    setBusiness(e.target.value);
                    reset();
                  }}
                  className="w-full appearance-none rounded-xl border bg-transparent px-4 py-3 text-[14.5px] text-white outline-none focus:border-[rgba(77,159,255,0.6)]"
                  style={{ borderColor: "rgba(255,255,255,0.16)" }}
                >
                  {BUSINESS_TYPES.map((b) => (
                    <option key={b} value={b} style={{ color: CANVAS }}>
                      {b}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Client name">
                <input
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    reset();
                  }}
                  placeholder="e.g. Maya Roberts"
                  className="w-full rounded-xl border bg-transparent px-4 py-3 text-[14.5px] text-white outline-none placeholder:text-white/30 focus:border-[rgba(77,159,255,0.6)]"
                  style={{ borderColor: "rgba(255,255,255,0.16)" }}
                />
              </Field>

              <Field label="When was their experience?">
                <select
                  value={when}
                  onChange={(e) => {
                    setWhen(e.target.value);
                    reset();
                  }}
                  className="w-full appearance-none rounded-xl border bg-transparent px-4 py-3 text-[14.5px] text-white outline-none focus:border-[rgba(77,159,255,0.6)]"
                  style={{ borderColor: "rgba(255,255,255,0.16)" }}
                >
                  {WHEN_OPTIONS.map((w) => (
                    <option key={w} value={w} style={{ color: CANVAS }}>
                      {w}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="What did they get?">
                <input
                  value={service}
                  onChange={(e) => {
                    setService(e.target.value);
                    reset();
                  }}
                  placeholder="e.g. deep-tissue massage"
                  className="w-full rounded-xl border bg-transparent px-4 py-3 text-[14.5px] text-white outline-none placeholder:text-white/30 focus:border-[rgba(77,159,255,0.6)]"
                  style={{ borderColor: "rgba(255,255,255,0.16)" }}
                />
              </Field>
            </div>

            <button
              type="button"
              onClick={runAgent}
              className="mt-6 w-full rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: ACCENT, color: CANVAS }}
            >
              {running ? "Run the agent again" : "Run the agent"}
            </button>
            <p className="mt-3 text-center text-[12px] text-white/40">
              Accurate, data-driven simulation — no setup required.
            </p>
          </div>

          {/* Output: conversation + generated review */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {/* Conversation */}
            <div
              className="flex min-h-[340px] flex-col rounded-2xl border p-5"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                backgroundColor: "rgba(0,0,0,0.28)",
              }}
            >
              <div className="flex items-center gap-2">
                <AgentDot />
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Agent conversation
                </p>
              </div>

              {!running ? (
                <div className="flex flex-1 flex-col items-center justify-center text-center">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: "rgba(77,159,255,0.14)", color: ACCENT }}
                  >
                    <IconSpark />
                  </span>
                  <p className="mt-4 max-w-[15rem] text-[13.5px] text-white/45">
                    Press{" "}
                    <span className="font-semibold text-white/70">
                      Run the agent
                    </span>{" "}
                    to watch it reach out and capture a review.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-2.5">
                  {messages.slice(0, revealed).map((m, i) =>
                    m.side === "system" ? (
                      <div
                        key={i}
                        className="l3-msg flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[12.5px]"
                        style={{
                          borderColor: "rgba(77,159,255,0.3)",
                          backgroundColor: "rgba(77,159,255,0.08)",
                          color: ACCENT_SOFT,
                        }}
                      >
                        <IconCheck />
                        <span>{m.text}</span>
                      </div>
                    ) : (
                      <Bubble key={i} side={m.side} channel={m.channel} animate>
                        {m.text}
                      </Bubble>
                    ),
                  )}
                  {!finished && (
                    <div className="flex items-center gap-1.5 px-1 pt-1">
                      <Typing />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Generated review */}
            <div
              className="flex flex-col rounded-2xl border p-5"
              style={{
                borderColor: finished
                  ? "rgba(77,159,255,0.4)"
                  : "rgba(255,255,255,0.1)",
                backgroundColor: "rgba(0,0,0,0.28)",
                transition: "border-color 0.4s ease",
              }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {finished ? "Ready to publish" : "Generated review"}
              </p>
              <div className="mt-4 flex flex-1 items-center">
                <div
                  className="w-full transition-opacity duration-500"
                  style={{ opacity: finished ? 1 : 0.25 }}
                >
                  <TemplatePreview accent={ACCENT} data={review} brandName={business} />
                </div>
              </div>
              {finished && (
                <div className="l3-msg mt-4 flex items-center gap-2 text-[12.5px] text-white/55">
                  <IconCheck />
                  Publish link sent to {clientName || "the customer"} for Google
                  Maps.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-white/55">
        {label}
      </span>
      {children}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Capture — text / audio / video                                      */
/* ------------------------------------------------------------------ */

function Capture() {
  const ref = useReveal<HTMLDivElement>();
  const modes = [
    {
      tag: "Text",
      title: "Typed replies",
      body: "SMS and email answers are captured, cleaned up, and structured into a publish-ready review.",
      icon: <IconText />,
    },
    {
      tag: "Audio",
      title: "Voice on calls",
      body: "Outbound calls are transcribed automatically — the customer's exact words, ready to quote.",
      icon: <IconMic />,
    },
    {
      tag: "Video",
      title: "On-camera moments",
      body: "When customers join a meeting, the agent captures short video testimonials you can repurpose.",
      icon: <IconVideo />,
    },
  ];
  return (
    <section className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="Capture"
          title="Text, audio, and video — all collected for you"
          sub="However the customer answers, the agent captures it and turns it into something you can publish."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {modes.map((m) => (
            <div
              key={m.tag}
              className="l3-lift rounded-3xl border p-7"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(77,159,255,0.14)", color: ACCENT }}
              >
                {m.icon}
              </span>
              <p
                className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                {m.tag}
              </p>
              <h3 className="mt-1.5 text-[1.15rem] font-semibold">{m.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/55">
                {m.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Content engine — posts + video, with Google Maps templates          */
/* ------------------------------------------------------------------ */

function ContentEngine() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="Content engine"
          title="Every answer becomes a post"
          sub="The agent renders each captured review into on-brand Google Maps posts and short-form video — pick a layout and it's done for every client. Here are six to start."
        />
        <div className="mt-12">
          <TemplatePicker accent={ACCENT} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Google Maps push                                                    */
/* ------------------------------------------------------------------ */

function GooglePush() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative z-10 px-6 py-16">
      <div
        ref={ref}
        data-revealed="false"
        className="l3-reveal mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2"
      >
        <div>
          <SectionKicker>Where it counts</SectionKicker>
          <h2 className="mt-4 text-balance text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-tight">
            It asks customers to publish{" "}
            <span className="font-serif italic" style={{ color: ACCENT_SOFT }}>
              on Google Maps.
            </span>
          </h2>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-white/60">
            Reviews on a website are nice. Reviews on Google Maps win the local
            search. The agent sends every happy customer a one-tap publish link
            so your clients&apos; star ratings and ranking actually climb.
          </p>
          <ul className="mt-7 space-y-4">
            {[
              ["One-tap publishing", "Pre-filled links so customers post in seconds, not minutes."],
              ["Right place, right time", "Sent the moment a customer says they're happy."],
              ["Owner responses drafted", "The agent writes a warm reply for your client to approve."],
            ].map(([h, b]) => (
              <li key={h} className="flex gap-4">
                <CheckDot />
                <div>
                  <p className="text-[15px] font-semibold">{h}</p>
                  <p className="text-[14px] leading-relaxed text-white/55">{b}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-3xl border p-6"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            With owner response
          </p>
          <div className="mt-4">
            <TemplatePreview accent={ACCENT} templateId="response" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Insights — reputation ranking                                       */
/* ------------------------------------------------------------------ */

function Insights() {
  const ref = useReveal<HTMLDivElement>();
  const good = [
    ["Staff friendliness", "Mentioned in 84% of reviews"],
    ["Cleanliness", "Up 12% this month"],
    ["Booking experience", "Consistently praised"],
  ];
  const watch = [
    ["Wait times", "Flagged in 9% of reviews"],
    ["Parking", "Recurring minor complaint"],
    ["Pricing clarity", "A few confused mentions"],
  ];
  return (
    <section id="insights" className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="Reputation insights"
          title="It ranks reviews and tells you what's really going on"
          sub="The agent reads every review, scores it, and turns the pile into a clear picture of what's working and what needs attention — insight you can hand straight to your client."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {/* Score + ranking */}
          <div
            className="rounded-3xl border p-7"
            style={{
              borderColor: "rgba(77,159,255,0.25)",
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[12px] uppercase tracking-[0.2em] text-white/40">
                Reputation score
              </p>
              <span
                className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                style={{ backgroundColor: "rgba(77,159,255,0.14)", color: ACCENT }}
              >
                Glow Skin Spa
              </span>
            </div>
            <div className="mt-5 flex items-end gap-3">
              <span className="text-[3rem] font-bold leading-none" style={{ color: ACCENT }}>
                92
              </span>
              <span className="pb-1 text-[14px] text-white/45">/ 100 · trending up</span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ["Volume", 0.82],
                ["Sentiment", 0.91],
                ["Recency", 0.76],
                ["Response rate", 0.68],
              ].map(([label, v]) => (
                <div key={label as string}>
                  <div className="flex items-center justify-between text-[12.5px] text-white/55">
                    <span>{label}</span>
                    <span>{Math.round((v as number) * 100)}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(v as number) * 100}%`, backgroundColor: ACCENT }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Good vs watch */}
          <div className="grid gap-5">
            <InsightList
              title="What's going well"
              tone="good"
              items={good}
            />
            <InsightList
              title="What to watch"
              tone="watch"
              items={watch}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "good" | "watch";
  items: string[][];
}) {
  const color = tone === "good" ? "#34d399" : "#fbbf24";
  return (
    <div
      className="rounded-3xl border p-6"
      style={{
        borderColor: "rgba(255,255,255,0.1)",
        backgroundColor: "rgba(0,0,0,0.25)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {tone === "good" ? <IconArrowUp /> : <IconAlert />}
        </span>
        <h3 className="text-[15px] font-semibold">{title}</h3>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map(([h, b]) => (
          <li key={h} className="flex items-start justify-between gap-3">
            <span className="text-[14px] font-medium text-white/80">{h}</span>
            <span className="shrink-0 text-right text-[12.5px] text-white/45">
              {b}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* How it works                                                        */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  const ref = useReveal<HTMLDivElement>();
  const steps = [
    ["01", "Add your clients", "Spin up a workspace per client and connect their Google profile."],
    ["02", "Agent reaches out", "It texts, emails, and calls customers right after each visit."],
    ["03", "Captures & publishes", "Collects the answer, makes the post, and gets it onto Google Maps."],
    ["04", "Delivers insight", "Ranks reviews and hands you a clear report for every client."],
  ];
  return (
    <section className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="How it works"
          title="Set it up once, it runs for every client"
          sub="A single autonomous loop your whole team can run across the roster."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([num, title, body], i) => (
            <div
              key={num}
              className="l3-lift relative rounded-2xl border p-6"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              }}
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl text-[15px] font-bold"
                style={{ backgroundColor: "rgba(77,159,255,0.14)", color: ACCENT }}
              >
                {num}
              </span>
              <h3 className="mt-5 text-[1.05rem] font-semibold">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{body}</p>
              {i < steps.length - 1 && (
                <span className="absolute right-5 top-7 hidden text-white/15 lg:block">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Proof — intentionally empty placeholders                            */
/* ------------------------------------------------------------------ */

function Proof() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="See it in motion"
          title="Real agency results, coming soon"
          sub="We're onboarding our first agencies now. Genuine case studies and clips will live here — no stock actors, no scripted quotes."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="relative flex flex-col items-center justify-center rounded-2xl border p-6 text-center"
              style={{
                aspectRatio: "9 / 14",
                borderColor: "rgba(255,255,255,0.1)",
                borderStyle: "dashed",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border"
                style={{ borderColor: "rgba(77,159,255,0.3)", color: ACCENT }}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <p className="mt-4 text-[14px] font-medium text-white/60">
                Case study coming soon
              </p>
              <p className="mt-1 text-[12px] text-white/35">Slot {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Who it's for                                                        */
/* ------------------------------------------------------------------ */

function WhoFor() {
  const ref = useReveal<HTMLDivElement>();
  const items = [
    ["Social media agencies", "Run reputation management for a full roster of local clients from one place."],
    ["Freelance managers", "Deliver agency-grade review collection and reporting solo."],
    ["Local business specialists", "Spas, salons, clinics, and restaurants that win on Google Maps."],
  ];
  return (
    <section className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-5xl">
        <SectionHeading
          kicker="Who it's for"
          title="Made for the people managing many local clients"
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map(([t, b]) => (
            <div
              key={t}
              className="l3-lift rounded-2xl border p-7"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              }}
            >
              <h3 className="text-[1.1rem] font-semibold">{t}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing — number-free                                               */
/* ------------------------------------------------------------------ */

function Pricing() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="pricing" className="relative z-10 px-6 py-16">
      <div ref={ref} data-revealed="false" className="l3-reveal mx-auto max-w-3xl text-center">
        <SectionHeading
          kicker="Pricing"
          title="Simple per-client pricing"
          sub="Pay for the clients the agent manages — scale up or down anytime. Early members get founder pricing locked in for life."
        />
        <div
          className="mt-12 rounded-3xl border p-8 text-left"
          style={{
            borderColor: "rgba(77,159,255,0.3)",
            background:
              "linear-gradient(180deg, rgba(77,159,255,0.08), rgba(255,255,255,0.01))",
            boxShadow: "0 40px 120px -50px rgba(77,159,255,0.5)",
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.15em]"
              style={{ backgroundColor: ACCENT, color: CANVAS }}
            >
              Founder pricing
            </span>
            <span className="text-[13px] text-white/45">Limited early spots</span>
          </div>
          <h3 className="mt-6 text-[1.5rem] font-bold tracking-tight">
            The whole agent, per client
          </h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Multi-channel outreach (SMS, email, call)",
              "Meeting booking & capture",
              "Text, audio & video collection",
              "Posts + video generation",
              "Google Maps publishing",
              "Reputation ranking & insights",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-[14.5px] text-white/75">
                <CheckDot />
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#waitlist"
            className="mt-8 block w-full rounded-full px-6 py-3.5 text-center text-[15px] font-semibold transition-transform hover:scale-[1.01]"
            style={{ backgroundColor: ACCENT, color: CANVAS }}
          >
            Join the waitlist — start with a free trial
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Waitlist                                                            */
/* ------------------------------------------------------------------ */

function Waitlist() {
  const ref = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!emailRef.current?.value) return;
    // Stub: wire to your waitlist endpoint / CRM later.
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="relative z-10 px-6 py-20">
      <div
        ref={ref}
        data-revealed="false"
        className="l3-reveal mx-auto max-w-2xl rounded-3xl border p-8 text-center sm:p-12"
        style={{
          borderColor: "rgba(77,159,255,0.3)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
          boxShadow: "0 40px 140px -50px rgba(77,159,255,0.45)",
        }}
      >
        {submitted ? (
          <div className="py-6">
            <span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{ backgroundColor: ACCENT, color: CANVAS }}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <h2 className="mt-6 text-[1.6rem] font-bold">You&apos;re on the list</h2>
            <p className="mt-3 text-[15px] text-white/60">
              Thanks for joining. We&apos;ll reach out with early access and your
              founder pricing soon.
            </p>
          </div>
        ) : (
          <>
            <SectionKicker center>Join the waitlist</SectionKicker>
            <h2 className="mt-4 text-balance text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-tight">
              Put an agent on{" "}
              <span className="font-serif italic" style={{ color: ACCENT_SOFT }}>
                every client&apos;s
              </span>{" "}
              reputation.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
              Get early access plus founder pricing locked in for life.
            </p>
            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3">
              <input
                ref={emailRef}
                type="email"
                required
                placeholder="Your work email"
                className="w-full rounded-full border bg-transparent px-5 py-3.5 text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-[rgba(77,159,255,0.6)]"
                style={{ borderColor: "rgba(255,255,255,0.16)" }}
              />
              <select
                defaultValue=""
                required
                className="w-full appearance-none rounded-full border bg-transparent px-5 py-3.5 text-[15px] text-white/80 outline-none focus:border-[rgba(77,159,255,0.6)]"
                style={{ borderColor: "rgba(255,255,255,0.16)" }}
              >
                <option value="" disabled style={{ color: CANVAS }}>
                  How many clients do you manage?
                </option>
                <option value="1-5" style={{ color: CANVAS }}>
                  1–5 clients
                </option>
                <option value="6-15" style={{ color: CANVAS }}>
                  6–15 clients
                </option>
                <option value="16-40" style={{ color: CANVAS }}>
                  16–40 clients
                </option>
                <option value="40+" style={{ color: CANVAS }}>
                  40+ clients
                </option>
              </select>
              <button
                type="submit"
                className="w-full rounded-full px-6 py-3.5 text-[15px] font-semibold transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: ACCENT, color: CANVAS }}
              >
                Join the waitlist — start with a free trial
              </button>
            </form>
            <p className="mt-4 text-[13px] text-white/40">
              No card required · Founder pricing for early members
            </p>
          </>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer
      className="relative z-10 border-t px-6 py-10"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Logo />
          <span className="text-[14px] font-semibold">reviewloop</span>
        </div>
        <p className="text-[13px] text-white/40">
          © {new Date().getFullYear()} reviewloop. An AI agent for reputation
          management.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

function SectionHeading({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <SectionKicker center>{kicker}</SectionKicker>
      <h2 className="mt-4 text-balance text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.1] tracking-tight">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-pretty text-[1.05rem] leading-relaxed text-white/60">
          {sub}
        </p>
      )}
    </div>
  );
}

function SectionKicker({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] ${center ? "" : ""}`}
      style={{ color: ACCENT }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
      {children}
    </span>
  );
}

function CheckDot() {
  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
      style={{ backgroundColor: "rgba(77,159,255,0.15)", color: ACCENT }}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function AgentDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
        style={{ backgroundColor: ACCENT }}
      />
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: ACCENT }}
      />
    </span>
  );
}

function Bubble({
  side,
  channel,
  animate,
  children,
}: {
  side: "agent" | "client" | "system";
  channel?: string;
  animate?: boolean;
  children: ReactNode;
}) {
  const isAgent = side === "agent";
  return (
    <div className={`flex ${isAgent ? "justify-start" : "justify-end"} ${animate ? "l3-msg" : ""}`}>
      <div
        className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug"
        style={
          isAgent
            ? {
                backgroundColor: "rgba(77,159,255,0.14)",
                color: "#EAF1FF",
                borderTopLeftRadius: 6,
              }
            : {
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.85)",
                borderTopRightRadius: 6,
              }
        }
      >
        {channel && (
          <span
            className="mb-1 block text-[9.5px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: ACCENT_SOFT }}
          >
            {channel}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-3 py-2"
      style={{ backgroundColor: "rgba(77,159,255,0.12)" }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="l3-typing h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: ACCENT_SOFT, animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </span>
  );
}

/* ---------- Icons ---------- */

function IconSms() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconText() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V5h16v2M9 19h6M12 5v14" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0M12 17v4" />
    </svg>
  );
}

function IconVideo() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="14" height="12" rx="2" />
      <path d="M22 8l-6 4 6 4z" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconArrowUp() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Local styles — aurora drift + reveal/lift + chat motion             */
/* ------------------------------------------------------------------ */

function LocalStyles() {
  return (
    <style>{`
      @keyframes l3Pop {
        from { opacity: 0; transform: translateY(16px) scale(0.98); filter: blur(8px); }
        to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      .l3-pop {
        opacity: 0;
        animation: l3Pop 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      .l3-reveal {
        opacity: 0;
        transform: translateY(24px) scale(0.985);
        filter: blur(6px);
        transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1), filter 0.7s ease;
      }
      .l3-reveal[data-revealed="true"] {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }

      .l3-lift {
        transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .l3-lift:hover {
        transform: translateY(-4px);
        border-color: rgba(77,159,255,0.35) !important;
        box-shadow: 0 30px 70px -40px rgba(77,159,255,0.5);
      }

      @keyframes l3Drift {
        0%, 100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(0,30px) scale(1.06); }
      }
      @keyframes l3DriftSlow {
        0%, 100% { transform: translate(0,0) scale(1); }
        50%      { transform: translate(20px,-24px) scale(1.04); }
      }
      .l3-orb { animation: l3Drift 14s ease-in-out infinite; }
      .l3-orb-slow { animation: l3DriftSlow 20s ease-in-out infinite; }

      /* Chat message entrance */
      @keyframes l3Msg {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .l3-msg { animation: l3Msg 0.35s ease-out forwards; }

      /* Typing dots */
      @keyframes l3Typing {
        0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
        30% { opacity: 1; transform: translateY(-3px); }
      }
      .l3-typing { animation: l3Typing 1s ease-in-out infinite; }

      @media (prefers-reduced-motion: reduce) {
        .l3-pop, .l3-orb, .l3-orb-slow, .l3-msg, .l3-typing { animation: none; }
        .l3-pop, .l3-msg { opacity: 1; }
        .l3-reveal { transition: none; }
      }
    `}</style>
  );
}
