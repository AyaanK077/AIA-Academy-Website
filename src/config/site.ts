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
// GOOGLE FORM LINKS
//
// HOW TO FILL THESE IN (see README for full steps):
//   1. Create a Google Form for each item below.
//   2. Click "Send" -> the "< >" (embed) tab -> copy the URL inside src="...".
//      It looks like: https://docs.google.com/forms/d/e/XXXX/viewform?embedded=true
//   3. Paste that URL as `embedUrl`.
//   4. For `shareUrl`, use the normal share link (the "link" tab, the short
//      https://forms.gle/... link is perfect), used for "open in new tab".
//
// Until you replace these, the pages will show a friendly "form coming soon"
// placeholder instead of a broken embed.
// ---------------------------------------------------------------------------

type FormLink = {
  embedUrl: string;
  shareUrl: string;
};

const PLACEHOLDER = 'REPLACE_ME';

export const forms: Record<string, FormLink> = {
  // Alumni registration (name, grad year, college/profession, contact)
  register: {
    embedUrl: PLACEHOLDER,
    shareUrl: PLACEHOLDER,
  },
  // Submit a question for the Expert Q&A (answered by Muftis / scholars)
  expertQa: {
    embedUrl: PLACEHOLDER,
    shareUrl: PLACEHOLDER,
  },
  // Submit an answer to the current Question of the Month
  questionOfMonth: {
    embedUrl: PLACEHOLDER,
    shareUrl: PLACEHOLDER,
  },
  // Share a personal update / college experience / advice
  alumniUpdate: {
    embedUrl: PLACEHOLDER,
    shareUrl: PLACEHOLDER,
  },
};

export function formIsConfigured(form: FormLink): boolean {
  return form.embedUrl !== PLACEHOLDER && form.embedUrl.length > 0;
}

// Primary navigation used in the header and footer.
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Newsletters', href: '/newsletters' },
  { label: 'Question of the Month', href: '/question-of-the-month' },
  { label: 'Expert Q&A', href: '/expert-qa' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'About', href: '/about' },
];
