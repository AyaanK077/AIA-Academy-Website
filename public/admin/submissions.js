// -----------------------------------------------------------------------------
// Adds a "Form Submissions" page to the Decap CMS admin sidebar.
//
// It renders INSIDE the admin panel (so only logged-in editors — i.e. the people
// invited in Netlify Identity — can reach it) and reads submissions from the
// secured /.netlify/functions/submissions function using the editor's login
// token. Read-only.
//
// `h` and `createClass` are globals provided by the Decap CMS bundle.
// -----------------------------------------------------------------------------
(function () {
  var FORM_LABELS = {
    register: '🎓 Alumni Registration',
    expertQa: '💬 Expert Q&A Questions',
    questionOfMonth: '❓ Question of the Month Answers',
    alumniUpdate: '📣 Alumni Updates / Stories',
  };
  var HIDDEN_FIELDS = { 'form-name': 1, 'bot-field': 1 };

  function prettyField(key) {
    return String(key).replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }
  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    } catch (e) { return iso; }
  }
  function isUrl(v) { return /^https?:\/\//.test(String(v)); }

  var COLORS = { emerald: '#14674f', emeraldDark: '#0e4a39', gold: '#9a6f0a', cream: '#f3eee0', ink: '#2d2a26' };

  var Submissions = createClass({
    getInitialState: function () {
      return { loading: true, error: null, forms: null };
    },
    componentDidMount: function () {
      this.load();
    },
    load: function () {
      var self = this;
      self.setState({ loading: true, error: null });
      var idn = window.netlifyIdentity;
      var user = idn && idn.currentUser && idn.currentUser();
      if (!user) {
        self.setState({ loading: false, error: 'You are not logged in. Please log in to the admin panel first.' });
        return;
      }
      user.jwt()
        .then(function (token) {
          return fetch('/.netlify/functions/submissions', {
            headers: { Authorization: 'Bearer ' + token },
          });
        })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (json) {
            return { ok: res.ok, status: res.status, json: json };
          });
        })
        .then(function (r) {
          if (!r.ok) {
            self.setState({ loading: false, error: (r.json && r.json.error) || ('Error ' + r.status) });
            return;
          }
          self.setState({ loading: false, forms: r.json.forms || [] });
        })
        .catch(function (err) {
          self.setState({ loading: false, error: String(err) });
        });
    },

    renderSubmission: function (s) {
      var rows = Object.keys(s.data || {})
        .filter(function (k) { return !HIDDEN_FIELDS[k] && String(s.data[k]).trim() !== ''; })
        .map(function (k) {
          var v = s.data[k];
          var valNode = isUrl(v)
            ? h('a', { href: v, target: '_blank', rel: 'noopener', style: { color: COLORS.emerald, wordBreak: 'break-all' } }, String(v))
            : String(v);
          return h('div', { key: k, style: { display: 'grid', gridTemplateColumns: '180px 1fr', gap: '12px', padding: '6px 0', borderBottom: '1px solid #eee' } },
            h('div', { style: { fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em', color: COLORS.gold } }, prettyField(k)),
            h('div', { style: { fontSize: '14px', color: COLORS.ink, whiteSpace: 'pre-wrap' } }, valNode)
          );
        });
      return h('div', { key: s.id, style: { background: '#fff', border: '1px solid ' + COLORS.cream, borderRadius: '12px', padding: '16px', marginBottom: '12px' } },
        h('div', { style: { fontSize: '12px', color: '#999', marginBottom: '8px' } }, fmtDate(s.created_at)),
        rows
      );
    },

    renderForm: function (form) {
      var label = FORM_LABELS[form.name] || form.name;
      var subs = form.submissions || [];
      var body = subs.length === 0
        ? h('div', { style: { color: '#999', fontSize: '14px' } }, 'No submissions for this form yet.')
        : subs.map(this.renderSubmission);
      return h('section', { key: form.name, style: { marginBottom: '36px' } },
        h('h2', { style: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '22px', color: COLORS.emeraldDark, marginBottom: '14px' } },
          label,
          h('span', { style: { background: COLORS.emerald, color: '#fff', borderRadius: '999px', padding: '2px 10px', fontSize: '13px', fontWeight: 600 } }, String(subs.length))
        ),
        body
      );
    },

    render: function () {
      var self = this;
      var st = this.state;

      var header = h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' } },
        h('div', {},
          h('h1', { style: { fontSize: '28px', color: COLORS.emeraldDark, margin: 0 } }, 'Form Submissions'),
          h('p', { style: { color: '#666', fontSize: '14px', margin: '4px 0 0' } }, 'Read-only. Newest first. To publish something, create an entry in one of the collections on the left.')
        ),
        h('button', {
          onClick: function () { self.load(); },
          style: { background: COLORS.emerald, color: '#fff', border: 0, borderRadius: '999px', padding: '8px 18px', fontSize: '14px', cursor: 'pointer' },
        }, st.loading ? 'Loading…' : 'Refresh')
      );

      var content;
      if (st.loading) {
        content = h('div', { style: { color: '#666' } }, 'Loading submissions…');
      } else if (st.error) {
        content = h('div', { style: { background: '#fff', border: '1px solid #f0d0d0', borderRadius: '12px', padding: '20px', color: '#a33' } },
          h('strong', {}, 'Couldn’t load submissions: '), st.error);
      } else if (!st.forms || st.forms.length === 0) {
        content = h('div', { style: { color: '#666' } }, 'No submissions yet.');
      } else {
        content = st.forms.map(this.renderForm);
      }

      return h('div', { style: { maxWidth: '900px', margin: '0 auto', padding: '32px 24px', height: '100%', overflowY: 'auto', fontFamily: 'Inter, system-ui, sans-serif' } },
        header,
        content
      );
    },
  });

  function register() {
    if (!window.CMS || !window.CMS.registerAdditionalLink) {
      // CMS bundle not ready yet — try again shortly.
      return setTimeout(register, 100);
    }
    window.CMS.registerAdditionalLink({
      id: 'submissions',
      title: 'Form Submissions',
      data: Submissions,
      options: { iconName: 'page' },
    });
  }
  register();
})();
