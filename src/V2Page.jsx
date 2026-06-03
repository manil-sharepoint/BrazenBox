import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  organization: "",
  project: ""
};

export default function V2Page() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.add("v2-body");

    const nav = document.getElementById("v2Nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();

    const reveals = document.querySelectorAll(".v2 .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((element) => observer.observe(element));

    return () => {
      document.body.classList.remove("v2-body");
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitProject = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending project request...");

    try {
      const response = await fetch("/api/start-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not send request.");
      }

      setForm(initialForm);
      setStatus(
        data.email?.sent
          ? "Project request stored and emailed to roy.manil@gmail.com."
          : "Project request stored. Email delivery needs RESEND_API_KEY in Render."
      );
    } catch (error) {
      setStatus(error.message || "Could not send project request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="v2">
      <style>{v2Css}</style>
      <nav id="v2Nav">
        <a href="/V2" className="nav-logo">
          Brazen<span>Box</span>
        </a>
        <ul className="nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Start a project</a>
      </nav>

      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-eyebrow">AI Application & Automation Studio</div>
          <h1 className="hero-h1">
            Ship real AI.
            <span className="line-accent">Automate the work.</span>
            <span className="line-dim">Scale what matters.</span>
          </h1>
          <p className="hero-sub">
            BrazenBox builds AI-powered applications, Microsoft 365 automations, and agentic workflows
            for forward-thinking organizations, from strategy to production deployment.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary">Start a project</a>
            <a href="#work" className="btn-ghost">See our work <span>{"->"}</span></a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat"><div className="stat-num">40<span>+</span></div><div className="stat-label">Automations Shipped</div></div>
          <div className="stat"><div className="stat-num">12<span>x</span></div><div className="stat-label">Avg Productivity Lift</div></div>
          <div className="stat"><div className="stat-num">100<span>%</span></div><div className="stat-label">Client Retention</div></div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee-track">
          {["AI Application Development", "Power Platform Automation", "Copilot Studio", "Azure AI Foundry", "SharePoint Integration", "Process Automation", "M365 Ecosystem", "Agentic Workflows", "AI Application Development", "Power Platform Automation", "Copilot Studio", "Azure AI Foundry"].map((item, index) => (
            <div className="marquee-item" key={`${item}-${index}`}>{item}</div>
          ))}
        </div>
      </div>

      <section className="services" id="services">
        <div className="services-header">
          <div>
            <div className="section-label reveal">What We Build</div>
            <h2 className="section-title reveal">AI-powered capabilities<br />for modern organizations</h2>
          </div>
          <p className="section-sub reveal">We do not consult from a distance. We embed with your team and ship production systems.</p>
        </div>
        <div className="services-grid">
          {[
            ["01", "AI Application Development", "Custom AI-powered apps built on Azure OpenAI, Copilot Studio, and the M365 ecosystem.", ["Azure OpenAI", "Copilot Studio", "React"]],
            ["02", "Intelligent Automation", "End-to-end Power Automate flows and agentic workflows with human approval gates.", ["Power Automate", "Graph API", "Logic Apps"]],
            ["03", "SharePoint & M365 Solutions", "Modern SharePoint platforms, SPFx web parts, and deep M365 integrations.", ["SharePoint", "SPFx", "Azure AI"]],
            ["04", "AI Strategy & Roadmapping", "AI readiness assessments and prioritized implementation roadmaps tied to measurable outcomes.", ["AI Readiness", "ROI Modeling", "Governance"]],
            ["05", "Copilot Integration", "Microsoft 365 Copilot enablement, custom Copilot Studio agents, and plugins.", ["M365 Copilot", "Agents", "Plugins"]],
            ["06", "Power Platform Development", "Canvas apps, model-driven apps, custom connectors, Dataverse architecture, and Power BI.", ["Power Apps", "Dataverse", "Power BI"]]
          ].map(([num, title, description, tags]) => (
            <article className="service-card reveal" key={title}>
              <div className="service-num">{num}</div>
              <div className="service-icon" />
              <h3 className="service-name">{title}</h3>
              <p className="service-desc">{description}</p>
              <div className="service-tags">{tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="process" id="process">
        <div className="section-label reveal">How We Work</div>
        <h2 className="section-title reveal">From first call<br />to shipped product</h2>
        <div className="process-steps">
          {[
            ["01", "Discovery", "We map your processes, pain points, and stack to identify high-ROI automation opportunities."],
            ["02", "Architecture", "We design data flows, integrations, AI model selection, and security before writing code."],
            ["03", "Build & Iterate", "Agile delivery with frequent demos so your feedback shapes the final product."],
            ["04", "Deploy & Enable", "Production deployment with documentation, runbooks, and team enablement."]
          ].map(([num, title, description]) => (
            <article className="process-step reveal" key={title}>
              <div className="step-dot"><span>{num}</span></div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cases" id="work">
        <div className="section-label reveal">Case Studies</div>
        <h2 className="section-title reveal">Work that moves the needle</h2>
        <div className="cases-grid">
          <article className="case-card featured reveal">
            <div>
              <div className="case-tag">Intelligent Automation · Enterprise</div>
              <h3 className="case-title">Autonomous IT alert remediation with human approval gates</h3>
              <p className="case-desc">Designed a multi-layered workflow using Copilot Studio and Power Automate to triage alerts, execute remediation scripts, and escalate only when required.</p>
              <div className="case-metrics">
                <div><strong>70%</strong><span>MTTR reduction</span></div>
                <div><strong>3k+</strong><span>Auto-resolved/mo</span></div>
                <div><strong>2wk</strong><span>Time to value</span></div>
              </div>
            </div>
            <div className="case-visual" aria-hidden="true">{Array.from({ length: 24 }).map((_, index) => <span className={index % 5 === 0 ? "lit" : index % 7 === 0 ? "lit2" : ""} key={index} />)}</div>
          </article>
          <article className="case-card reveal">
            <div className="case-tag">SharePoint · Azure AI</div>
            <h3 className="case-title">SharePoint page translation engine</h3>
            <p className="case-desc">Enabled one-click multilingual publishing across a large intranet with Azure Translation integration.</p>
          </article>
          <article className="case-card reveal">
            <div className="case-tag">Power Platform · SMB</div>
            <h3 className="case-title">Automated client reporting</h3>
            <p className="case-desc">Productized report generation from Excel and SharePoint data with approvals and branded PDF output.</p>
          </article>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-inner">
          <div>
            <div className="about-badge"><span />Based in Whitby, Ontario · Remote-first</div>
            <div className="section-label reveal">About BrazenBox</div>
            <h2 className="section-title reveal">Built by practitioners,<br />not slide decks.</h2>
            <p className="about-text reveal">BrazenBox was founded on a simple conviction: most AI consulting delivers strategy documents that gather dust. We build the actual systems.</p>
            <p className="about-text reveal">We specialize in the Microsoft ecosystem because that is where many organizations already live. We meet you there.</p>
          </div>
          <div className="about-card reveal">
            <div className="about-card-label">// Tech Stack We Work With</div>
            <div className="tech-stack">
              {["Azure OpenAI", "Copilot Studio", "Power Automate", "Power Apps", "SharePoint Online", "Azure AI Foundry", "Graph API", "Dataverse", "SPFx", "Power BI"].map((tech) => (
                <span className="tech-pill" key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section" id="contact">
        <div className="cta-glow" />
        <div className="section-label">Let's Build</div>
        <h2 className="cta-title">Ready to ship<br /><span>real AI</span>?</h2>
        <p className="cta-sub">Tell us what you are working on. We will tell you if we are the right fit, and if not, point you in the right direction.</p>
        <form className="contact-form" onSubmit={submitProject}>
          <div className="form-row">
            <input className="form-input" required type="text" placeholder="Your name" value={form.name} onChange={(event) => updateField("name", event.target.value)} />
            <input className="form-input" required type="email" placeholder="Work email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
          </div>
          <input className="form-input" type="text" placeholder="Organization" value={form.organization} onChange={(event) => updateField("organization", event.target.value)} />
          <textarea className="form-input form-textarea" required placeholder="Tell us about your project or challenge..." value={form.project} onChange={(event) => updateField("project", event.target.value)} />
          <button className="form-submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Start a project ->"}</button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </section>

      <footer>
        <div className="footer-logo">Brazen<span>Box</span></div>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-copy">© 2026 BrazenBox. All rights reserved.</div>
      </footer>
    </div>
  );
}

const v2Css = `
@import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap");
.v2-body{background:#060810;color:#e8eaf0}
.v2{--bg:#060810;--bg2:#0b0f1a;--surface:#0f1420;--border:rgba(255,255,255,.08);--accent:#00e5ff;--accent2:#7b61ff;--accent3:#ff4d6d;--text:#e8eaf0;--muted:#8d95a3;font-family:Syne,Inter,system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow:hidden}
.v2 *{box-sizing:border-box}.v2 a{color:inherit;text-decoration:none}.v2 p{color:var(--muted)}
.v2 nav{position:fixed;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:24px 60px;transition:background .3s,padding .3s;border-bottom:1px solid transparent}.v2 nav.scrolled{background:rgba(6,8,16,.9);border-color:var(--border);padding:16px 60px;backdrop-filter:blur(18px)}
.v2 .nav-logo{font-size:1.3rem;font-weight:800;color:#fff}.v2 .nav-logo span,.v2 .line-accent,.v2 .cta-title span{color:var(--accent)}.v2 .nav-links{display:flex;gap:38px;list-style:none;margin:0;padding:0}.v2 .nav-links a,.v2 .nav-cta,.v2 .btn-primary,.v2 .btn-ghost,.v2 .section-label,.v2 .hero-sub,.v2 .tag,.v2 .service-desc,.v2 .form-input,.v2 .form-submit,.v2 .footer-links a,.v2 .footer-copy{font-family:"DM Mono",ui-monospace,monospace}.v2 .nav-links a{font-size:.78rem;color:var(--muted);letter-spacing:.05em}.v2 .nav-cta{font-size:.78rem;color:var(--accent);border:1px solid var(--accent);padding:9px 20px;letter-spacing:.06em;clip-path:polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)}
.v2 .hero{min-height:100vh;display:flex;align-items:center;padding:140px 60px 90px;position:relative}.v2 .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(0,229,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.045) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 60% at 50% 50%,#000,transparent)}.v2 .hero-glow,.v2 .cta-glow{position:absolute;pointer-events:none;background:radial-gradient(ellipse,rgba(123,97,255,.13),transparent 65%)}.v2 .hero-glow{top:-20%;left:50%;transform:translateX(-50%);width:900px;height:600px}.v2 .hero-content{position:relative;z-index:1;max-width:920px}.v2 .hero-eyebrow{font-family:"DM Mono",ui-monospace,monospace;color:var(--accent);font-size:.75rem;letter-spacing:.15em;margin-bottom:28px;display:flex;gap:12px;align-items:center}.v2 .hero-eyebrow:before,.v2 .section-label:before{content:"";display:block;width:30px;height:1px;background:var(--accent)}
.v2 .hero-h1{font-size:clamp(3.2rem,7vw,6.5rem);font-weight:800;line-height:.95;letter-spacing:-.03em;color:#fff;margin:0 0 32px}.v2 .hero-h1 span{display:block}.v2 .line-dim{color:rgba(255,255,255,.35)}.v2 .hero-sub{font-size:1rem;line-height:1.7;max-width:560px;margin:0 0 52px}.v2 .hero-actions,.v2 .cta-actions{display:flex;gap:20px;align-items:center}.v2 .btn-primary,.v2 .form-submit{background:var(--accent);color:var(--bg);border:0;letter-spacing:.08em;padding:16px 34px;clip-path:polygon(10px 0,100% 0,calc(100% - 10px) 100%,0 100%);cursor:pointer}.v2 .btn-ghost{color:var(--text);letter-spacing:.08em}
.v2 .hero-stats{position:absolute;right:60px;bottom:60px;display:flex;gap:46px}.v2 .stat{text-align:right}.v2 .stat-num{font-size:2.2rem;font-weight:800;color:#fff}.v2 .stat-num span{color:var(--accent)}.v2 .stat-label{font-family:"DM Mono",ui-monospace,monospace;font-size:.68rem;color:var(--muted);letter-spacing:.1em}
.v2 .marquee-wrap{border-block:1px solid var(--border);padding:16px 0;overflow:hidden;background:var(--bg2)}.v2 .marquee-track{display:flex;width:max-content;animation:v2Marquee 28s linear infinite}.v2 .marquee-item{font-family:"DM Mono",ui-monospace,monospace;font-size:.72rem;color:var(--muted);letter-spacing:.12em;padding:0 36px;white-space:nowrap}.v2 .marquee-item:after{content:" ◆";color:var(--accent)}@keyframes v2Marquee{to{transform:translateX(-50%)}}
.v2 section{padding:120px 60px;position:relative}.v2 .section-label{font-size:.7rem;color:var(--accent);letter-spacing:.2em;margin-bottom:20px;display:flex;align-items:center;gap:12px;text-transform:uppercase}.v2 .section-title,.v2 .cta-title{font-size:clamp(2.1rem,4vw,3.3rem);font-weight:800;line-height:1.05;letter-spacing:-.03em;color:#fff;margin:0 0 20px}.v2 .section-sub{font-family:"DM Mono",ui-monospace,monospace;font-size:.9rem;line-height:1.7;max-width:500px}
.v2 .services,.v2 .cases,.v2 .cta-section{background:var(--bg)}.v2 .process,.v2 .about, .v2 footer{background:var(--bg2)}.v2 .services-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:72px;gap:30px}.v2 .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px}.v2 .service-card,.v2 .case-card,.v2 .about-card{background:var(--surface);border:1px solid var(--border);padding:46px 40px;position:relative;overflow:hidden}.v2 .service-card:hover,.v2 .case-card:hover{border-color:rgba(0,229,255,.3)}.v2 .service-num{font-family:"DM Mono",ui-monospace,monospace;color:rgba(0,229,255,.4);letter-spacing:.15em;margin-bottom:28px}.v2 .service-icon{width:46px;height:46px;border:1px solid rgba(0,229,255,.3);margin-bottom:26px}.v2 .service-name{font-size:1.3rem;color:#fff;margin:0 0 16px}.v2 .service-desc{font-size:.82rem;line-height:1.7}.v2 .service-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:26px}.v2 .tag{font-size:.65rem;color:var(--accent);border:1px solid rgba(0,229,255,.22);padding:4px 10px}
.v2 .process-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:34px;margin-top:76px}.v2 .step-dot{width:64px;height:64px;border-radius:50%;border:1px solid var(--border);display:grid;place-items:center;color:var(--accent);font-family:"DM Mono",ui-monospace,monospace;margin-bottom:28px}.v2 .process-step h3{color:#fff}.v2 .process-step p{font-family:"DM Mono",ui-monospace,monospace;font-size:.8rem;line-height:1.65}
.v2 .cases-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:72px}.v2 .featured{grid-column:span 2;display:grid;grid-template-columns:1fr 320px;gap:70px;align-items:center}.v2 .case-tag{font-family:"DM Mono",ui-monospace,monospace;color:var(--accent2);font-size:.68rem;letter-spacing:.12em;margin-bottom:18px}.v2 .case-title{font-size:1.5rem;color:#fff;margin:0 0 16px}.v2 .case-desc{font-family:"DM Mono",ui-monospace,monospace;font-size:.82rem;line-height:1.7}.v2 .case-metrics{display:flex;gap:34px;margin-top:36px}.v2 .case-metrics strong{display:block;color:var(--accent);font-size:2rem}.v2 .case-metrics span{font-family:"DM Mono",ui-monospace,monospace;font-size:.68rem;color:var(--muted)}.v2 .case-visual{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;height:200px;border:1px solid var(--border);padding:16px;background:var(--bg)}.v2 .case-visual span{background:rgba(0,229,255,.08)}.v2 .case-visual .lit{background:rgba(0,229,255,.42)}.v2 .case-visual .lit2{background:rgba(123,97,255,.5)}
.v2 .about-inner{display:grid;grid-template-columns:1fr 1fr;gap:90px;align-items:center}.v2 .about-badge{display:inline-flex;gap:10px;align-items:center;font-family:"DM Mono",ui-monospace,monospace;font-size:.72rem;color:var(--accent3);border:1px solid rgba(255,77,109,.25);padding:8px 16px;margin-bottom:30px;letter-spacing:.1em}.v2 .about-badge span{width:6px;height:6px;border-radius:50%;background:var(--accent3)}.v2 .about-text{font-family:"DM Mono",ui-monospace,monospace;line-height:1.8}.v2 .about-card-label{font-family:"DM Mono",ui-monospace,monospace;color:var(--muted);font-size:.68rem;letter-spacing:.15em;margin-bottom:34px}.v2 .tech-stack{display:flex;flex-wrap:wrap;gap:10px}.v2 .tech-pill{font-family:"DM Mono",ui-monospace,monospace;font-size:.72rem;color:var(--text);background:var(--bg);border:1px solid var(--border);padding:8px 14px}
.v2 .cta-section{text-align:center;padding:150px 60px}.v2 .cta-glow{top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:400px}.v2 .cta-section .section-label{justify-content:center}.v2 .cta-sub{font-family:"DM Mono",ui-monospace,monospace;max-width:460px;margin:0 auto 50px;line-height:1.7}.v2 .contact-form{max-width:580px;margin:0 auto;position:relative;z-index:1}.v2 .form-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}.v2 .form-input{width:100%;background:var(--surface);border:1px solid var(--border);color:var(--text);padding:16px 20px;margin-bottom:12px;outline:none}.v2 .form-textarea{min-height:126px;resize:vertical}.v2 .form-input:focus{border-color:var(--accent)}.v2 .form-submit{width:100%;font-size:.82rem}.v2 .form-submit:disabled{opacity:.6}.v2 .form-status{font-family:"DM Mono",ui-monospace,monospace;font-size:.8rem;color:var(--accent);margin-top:14px}
.v2 footer{border-top:1px solid var(--border);padding:58px 60px;display:flex;align-items:center;justify-content:space-between;gap:24px}.v2 .footer-logo{font-size:1.2rem;font-weight:800;color:#fff}.v2 .footer-logo span{color:var(--accent)}.v2 .footer-links{display:flex;gap:30px}.v2 .footer-links a{font-size:.72rem;color:var(--muted);letter-spacing:.08em}.v2 .footer-copy{font-size:.68rem;color:rgba(141,149,163,.6)}
.v2 .reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s ease}.v2 .reveal.visible{opacity:1;transform:none}
@media(max-width:900px){.v2 nav{padding:18px 24px}.v2 nav.scrolled{padding:14px 24px}.v2 .nav-links{display:none}.v2 section,.v2 .hero,.v2 .cta-section{padding:86px 24px}.v2 .hero{display:block;min-height:auto}.v2 .hero-stats{position:relative;right:auto;bottom:auto;margin-top:56px;justify-content:flex-start;flex-wrap:wrap}.v2 .services-header{display:block}.v2 .services-grid,.v2 .process-steps,.v2 .cases-grid,.v2 .about-inner{grid-template-columns:1fr}.v2 .featured{grid-column:span 1;grid-template-columns:1fr}.v2 .form-row{grid-template-columns:1fr}.v2 footer{flex-direction:column;text-align:center}.v2 .footer-links{flex-wrap:wrap;justify-content:center}.v2 .hero-h1{font-size:clamp(2.7rem,12vw,4.2rem)}}
`;
