import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-darkBg text-text dark:text-text-dark p-8 mt-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Sticky Notes, Not Sticky Situations</h2>
            <p>At Sticky, we're all about keeping your ideas organized, not your personal data. We promise to treat your information with the same care you'd give to your most precious sticky note collection.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Data We Collect (It's Not Much, We Promise)</h2>
            <p>We only collect what we need to make Sticky work for you. This includes your email, your brilliant ideas (in sticky note form), and occasionally, the number of times you've procrastinated by rearranging your virtual sticky notes.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
            <p>We use your data to make Sticky better, not to sell you things you don't need. Your sticky notes are for your eyes only (unless you choose to share them, of course).</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Security: Fort Knox, but for Sticky Notes</h2>
            <p>We protect your data like it's the last piece of cake at an office party. Our security measures are top-notch, because we know your ideas are priceless.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights (Yes, You Have Them!)</h2>
            <p>You have the right to access, correct, or delete your data at any time. Just like you can peel off a sticky note, you can remove your data from our systems.</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to This Policy</h2>
            <p>We may update this policy occasionally, but we promise not to do it as often as you change the color of your sticky notes. We'll notify you of any significant changes.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;