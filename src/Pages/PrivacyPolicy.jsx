const SECTIONS = [
  { num: "01", title: "Information We Collect", content: "We may collect personal information such as name, email, phone number, organization details, and project requirements when you contact us or use our services." },
  { num: "02", title: "How We Use Your Information", content: "Your information is used to provide tailored IT solutions, communicate project progress, ensure smooth service delivery, and improve our offerings. We do not sell or share your data with third parties without consent." },
  { num: "03", title: "Data Security", content: "We implement industry-standard security measures to protect your personal and project data. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute safety." },
  { num: "04", title: "Third-Party Services", content: "Some services may involve third-party integrations (e.g., payment gateways, hosting providers). These providers follow their own privacy policies, and NavRasa IT Solutions is not responsible for their practices." },
  { num: "05", title: "Your Rights", content: "You may request access, correction, or deletion of your personal data by contacting us. We respect your rights and will respond promptly to any privacy-related inquiries." },
  { num: "06", title: "Updates to Policy", content: "We may update this Privacy Policy from time to time to reflect changes in technology, laws, or our practices. Continued use of our services indicates acceptance of the updated policy." },
];

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@400&display=swap');`}</style>
      <div className="min-h-screen bg-[#f9f9f8]" style={{ fontFamily: "sans-serif" }}>
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-30">

          <div className="mb-12">
            <p className="text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}>
              NavRasa IT Solutions · Legal
            </p>
            <h1 className="text-5xl font-extrabold leading-none tracking-[-0.04em] mb-3"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Privacy <span className="text-gray-300">Policy</span>
            </h1>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              NavRasa IT Solutions values your privacy and is committed to protecting your personal information.
            </p>
          </div>

          <hr className="border-gray-100" />

          {SECTIONS.map((s) => (
            <div key={s.num} className="py-7 border-b border-gray-100">
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