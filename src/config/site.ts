// ---------------------------------------------------------------------------
// SITE-WIDE SETTINGS
// Edit the values below to update site name, contact email, and the Google
// Form links. These are intentionally kept in one place so they are easy to
// change without hunting through the code.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Al-Ihsan Academy Alumni',
  shortName: 'AIA Alumni',
  tagline: 'Newsletter & Web Platform',
  school: 'Al-Ihsan School (ISNS, Rolling Meadows)',
  description:
    'A free alumni network for past and present senior students (Grades 9-12) of ' +
    'Al-Ihsan Academy, keeping graduates connected to the ISNS community, grounded ' +
    'in their faith, and supported through peer mentorship.',
  // Where alumni / visitors can reach the editor. Change to a real address.
  contactEmail: 'alumni@al-ihsan-academy.org',
};

// ---------------------------------------------------------------------------
// FORMS
//
// The submission forms (registration, Expert Q&A, Question of the Month, alumni
// updates) are built directly into the site as native Netlify Forms — see
// `src/components/NetlifyForm.astro`. To add or change a question, edit the
// `FORMS` object in that file. Responses appear in your Netlify dashboard under
// "Forms"; turn on email alerts there (Forms → Settings & notifications).
// No Google Forms or external setup required.
// ---------------------------------------------------------------------------

// Primary navigation used in the header and footer.
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Newsletters', href: '/newsletters' },
  { label: 'Question of the Month', href: '/question-of-the-month' },
  { label: 'Expert Q&A', href: '/expert-qa' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'About', href: '/about' },
];
