import React from 'react';
import { ElectroplixProvider, ContactForm, NewsletterSignup } from '@electroplix/components';

export default function FormsPage() {
  return (
    <ElectroplixProvider>
      <div style={{ padding: '2rem', maxWidth: '600px' }}>
        <h2>Forms Showcase</h2>
        <section style={{ marginBottom: '2rem' }}>
          <h3>Contact Form</h3>
          <ContactForm />
        </section>
        <section>
          <h3>Newsletter Signup</h3>
          <NewsletterSignup />
        </section>
      </div>
    </ElectroplixProvider>
  );
}
