

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <div className="nearblack p-6 rounded-xl shadow-xl shadow-amber-900/30">
        <h1 className="text-3xl font-bold mb-4 text-amber-400">Privacy Policy</h1>
        <p className="mb-4 text-gray-400 text-sm">Effective Date: June 27, 2025</p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">1. Introduction</h2>
          <p className="text-gray-300">
            Welcome to our website. This Privacy Policy outlines how we collect,
            use, and protect your personal information when you interact with our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">2. Information We Collect</h2>
          <p className="text-gray-300 mb-2">We may collect the following types of data:</p>
          <ul className="list-disc pl-6 text-gray-300 space-y-1">
            <li>Email address</li>
            <li>Username and display name</li>
            <li>Uploaded images or avatars</li>
            <li>Usage data such as game favorites or profile interactions</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">3. How We Use Your Information</h2>
          <p className="text-gray-300">
            Your data is used to provide and improve our services, personalize your
            experience, and communicate with you when necessary.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">4. Data Sharing</h2>
          <p className="text-gray-300">
            We do not sell, rent, or share your personal data with third parties,
            except where required by law or to provide our core functionality
            (e.g., Supabase as our backend service provider).
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">5. Data Security</h2>
          <p className="text-gray-300">
            We use industry-standard measures to protect your data, including secure
            connections (HTTPS), authentication protocols, and encrypted storage.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">6. Your Rights</h2>
          <p className="text-gray-300">
            You may contact us to access, update, or delete your data at any time.
            Email us at <a href="mailto:youremail@example.com" className="text-amber-400 hover:underline">contact@gamgerank.com</a>.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">7. Changes to This Policy</h2>
          <p className="text-gray-300">
            We may update this policy as needed. Changes will be posted on this page
            with a new effective date.
          </p>
        </section>

        <p className="text-gray-400 text-sm mt-8">Last updated: June 27, 2025</p>
      </div>
    </div>
  );
}
