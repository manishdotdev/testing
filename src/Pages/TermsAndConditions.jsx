const SECTIONS = [
  { num: "01", title: "Acceptance of Terms", content: "By accessing or using NavRasa IT Solutions' website and services, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services. Continued use of the platform constitutes acceptance of any updates to these terms." },
  { num: "02", title: "Services", content: "NavRasa specializes in helping startups transform ideas into market-ready solutions. Our services include MVP development, product scaling, AI integration, and end-to-end technical solutions tailored for startups and growing businesses. Service scope is defined per engagement and subject to separate agreements." },
  { num: "03", title: "User Responsibilities", content: "Users must provide accurate and complete information when engaging with our services. You agree to respect all intellectual property rights, refrain from misuse of our website, systems, or services, and not attempt unauthorized access to any part of our infrastructure. Violations may result in termination of access and legal action." },
  { num: "04", title: "Intellectual Property", content: "All content on this website — including text, graphics, logos, UI designs, and source code — is the exclusive property of NavRasa IT Solutions and is protected under applicable copyright and intellectual property laws. Unauthorized reproduction, distribution, or modification is strictly prohibited without prior written consent." },
  { num: "05", title: "Limitation of Liability", content: "NavRasa IT Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services. All services are provided on an 'as is' basis without warranties of any kind, either express or implied, including but not limited to merchantability or fitness for a particular purpose." },
  { num: "06", title: "Governing Law", content: "These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts located at our registered office in Jaipur, Rajasthan." },
  { num: "07", title: "Modifications to Terms", content: "NavRasa IT Solutions reserves the right to update or modify these Terms & Conditions at any time without prior notice. Changes become effective immediately upon posting to the website. We encourage users to review this page periodically to stay informed of any updates." },
  { num: "08", title: "Contact Us", content: "If you have any questions or concerns regarding these Terms & Conditions, please contact us at legal@navrasa.in or write to us at NavRasa IT Solutions, Jaipur, Rajasthan, India. We aim to respond within 2 business days." },
];

export default function TermsAndConditions() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400&display=swap');`}</style>
      <div className="min-h-screen bg-[#f9f9f8]" style={{ fontFamily: "sans-serif" }}>
        <div className="max-w-4xl mx-auto px-6  py-30">

          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              NavRasa IT Solutions · Legal
            </p>
            <h1 className="text-5xl font-extrabold leading-none tracking-[-0.04em] mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Terms &amp; <span className="text-gray-300">Conditions</span>
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Please read these terms carefully before using our website and services.
            </p>
          </div>

          <hr className="border-gray-100" />

          {SECTIONS.map((s) => (
            <div key={s.num} className="py-1 border-b border-gray-100">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-[11px] text-gray-400 flex-shrink-0"
                  style={{ fontFamily: "'DM Mono', monospace" }}>{s.num}</span>
                <span className="text-[15px] font-medium text-gray-900">{s.title}</span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed pl-9">{s.content}</p>
            </div>
          ))}

          

        </div>
      </div>
    </>
  );
}