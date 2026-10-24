import { useState } from 'react';

const API_ENDPOINT = (import.meta.env.VITE_API_URL || '/api/submissions/').trim();

const activities = [
  {
    number: '01', type: 'Rencontre',
    title: 'Célébrer le professeur Raoelina Andriambololona',
    text: 'Une célébration en l’honneur de ses 90 ans pour saluer son parcours et son engagement pour la science à Madagascar.',
    timing: 'Date et programme annoncés prochainement', tone: 'red',
  },
  {
    number: '02', type: 'Conférence',
    title: 'L’intelligence artificielle avec des moyens limités',
    text: 'Chercheurs et praticiens échangeront sur des usages concrets de l’IA, adaptés aux ressources disponibles à Madagascar.',
    timing: 'À venir', tone: 'green',
  },
  {
    number: '03', type: 'Échange scientifique',
    title: 'Quel avenir pour la mécanique quantique à Madagascar ?',
    text: 'Un temps de discussion autour des compétences, des formations et des pistes de recherche en physique quantique.',
    timing: 'À venir', tone: 'gold',
  },
];

function FlagMark() {
  return <span className="flag-mark" aria-hidden="true" />;
}

function App() {
  const [submissionState, setSubmissionState] = useState('idle');
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmissionState('idle');
    setIsSending(true);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error('La requête a échoué');
      form.reset();
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="TWAS Madagascar Chapter, accueil">
          <FlagMark />
          <span className="brand-name">TWAS Madagascar <span>Chapter</span></span>
        </a>
        <nav className="main-nav" aria-label="Navigation principale">
          <a href="#accueil">Accueil</a>
          <a href="#histoire">Notre histoire</a>
          <a href="#activites">Activités</a>
          <a className="nav-cta" href="#chercheurs">Espace chercheurs <span aria-hidden="true">↗</span></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Madagascar · Science · Collaboration</p>
            <h1>La science nous rassemble.<br /><em>Faisons-la avancer.</em></h1>
            <p className="hero-intro">Le TWAS Madagascar Chapter met en lien les chercheurs du pays et fait grandir une communauté scientifique ouverte, ambitieuse et engagée.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#histoire">Découvrir le Chapter <span aria-hidden="true">↓</span></a>
              <a className="text-link" href="#chercheurs">Partager une recherche <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-note"><span className="note-rule" /> Un réseau au service de la recherche malgache</div>
          </div>
          <div className="hero-art" aria-label="Illustration évoquant la science et Madagascar" role="img">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sun" />
            <div className="art-island"><span>MG</span></div>
            <div className="art-cross cross-one">+</div>
            <div className="art-cross cross-two">+</div>
            <div className="art-caption"><FlagMark /><span>Une communauté<br />de savoirs en mouvement</span></div>
            <div className="art-index">20° S&nbsp; · &nbsp;47° E</div>
          </div>
          <div className="hero-bottom"><span>01 — 03</span><span className="bottom-line" /><span>Recherche · Transmission · Avenir</span></div>
        </section>

        <section className="mission section-shell" aria-labelledby="mission-title">
          <p className="eyebrow">Notre ambition</p>
          <div className="mission-grid">
            <h2 id="mission-title">Une ambition commune,<br /><em>une science sans frontières.</em></h2>
            <div className="mission-copy">
              <p>Notre objectif ultime : <strong>rassembler les chercheurs de Madagascar</strong>, encourager le dialogue entre disciplines et donner plus de visibilité aux travaux menés sur l’île.</p>
              <a className="text-link" href="#chercheurs">Rejoindre la conversation <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="mission-stats" aria-label="Les priorités du Chapter">
            <div><span className="stat-index">01</span><span>Connecter les chercheurs</span></div>
            <div><span className="stat-index">02</span><span>Faire circuler les idées</span></div>
            <div><span className="stat-index">03</span><span>Faire émerger des projets</span></div>
          </div>
        </section>

        <section className="history section-shell" id="histoire" aria-labelledby="history-title">
          <div className="section-heading">
            <div><p className="eyebrow">Nos racines</p><h2 id="history-title">Bâtir sur un héritage<br /><em>scientifique vivant.</em></h2></div>
            <p className="section-aside">Le Chapter s’inscrit dans une histoire portée par des scientifiques qui ont consacré leur parcours à la recherche et à son rayonnement à Madagascar.</p>
          </div>
          <div className="history-grid">
            <article className="history-card history-card-featured">
              <span className="card-label">Les pionniers</span>
              <div className="history-monogram">A<span>&amp;</span>S</div>
              <h3>Albert &amp; Suzanne<br />Rakoto Ratsimamanga</h3>
              <p>Le Dr Albert Rakoto Ratsimamanga et son épouse Suzanne comptent parmi les piliers fondateurs mis à l’honneur par le TWAS Madagascar Chapter. Leur héritage inspire la recherche et l’engagement scientifique malgaches.</p>
              <span className="card-bottom">Un héritage qui continue de nous guider <span aria-hidden="true">↗</span></span>
            </article>
            <article className="history-card">
              <span className="card-label">Fondateur du Chapter</span>
              <div className="history-monogram monogram-green">RA<span>✳</span></div>
              <h3>Professeur Raoelina<br />Andriambololona</h3>
              <p>Physicien et fondateur de l’INSTN-Madagascar, le professeur Raoelina Andriambololona est le fondateur du TWAS Madagascar Chapter. Son parcours demeure un repère pour plusieurs générations de chercheurs.</p>
              <span className="card-bottom">90 ans célébrés en 2026 <span aria-hidden="true">✳</span></span>
            </article>
          </div>
          <div className="leadership-note"><span className="leadership-mark">↗</span><p><strong>Aujourd’hui, le Chapter poursuit cette mission.</strong> Il est présidé par le professeur Jonah Ratsimbazafy, avec un nouveau bureau récemment nommé.</p><span className="note-tag">La suite s’écrit ensemble</span></div>
        </section>

        <section className="activities" id="activites" aria-labelledby="activities-title">
          <div className="section-shell">
            <div className="section-heading activities-heading">
              <div><p className="eyebrow">À venir</p><h2 id="activities-title">Des idées à partager,<br /><em>des rencontres à vivre.</em></h2></div>
              <p className="section-aside">Conférences, échanges et célébrations : les prochaines activités du Chapter ouvriront de nouveaux espaces de dialogue.</p>
            </div>
            <div className="activities-list">
              {activities.map((activity) => (
                <article className={`activity-row activity-${activity.tone}`} key={activity.number}>
                  <span className="activity-number">{activity.number}</span>
                  <div className="activity-type">{activity.type}</div>
                  <div className="activity-detail"><h3>{activity.title}</h3><p>{activity.text}</p></div>
                  <div className="activity-time"><span className="time-dot" />{activity.timing}</div>
                  <span className="activity-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
            <p className="activities-footnote"><span>*</span> Les dates et modalités seront communiquées dès leur confirmation.</p>
          </div>
        </section>

        <section className="research section-shell" id="chercheurs" aria-labelledby="research-title">
          <div className="research-intro">
            <p className="eyebrow">Espace chercheurs</p>
            <h2 id="research-title">Votre recherche<br /><em>a sa place ici.</em></h2>
            <p>Vous travaillez sur un sujet de recherche à Madagascar ? Présentez brièvement vos travaux pour aider le Chapter à mieux connaître les chercheurs et les projets du pays.</p>
            <div className="research-callout"><span className="callout-icon">✳</span><span>Quelques minutes suffisent.<br /><strong>Ces informations sont destinées à l’équipe du Chapter.</strong></span></div>
          </div>
          <form className="research-form" onSubmit={handleSubmit}>
            <div className="form-topline"><span>Formulaire de présentation</span><span>01 / 01</span></div>
            <div className="form-row">
              <label>Nom complet <span>*</span><input name="full_name" type="text" autoComplete="name" placeholder="Votre nom et prénom" required maxLength="160" /></label>
              <label>Adresse e-mail <span>*</span><input name="email" type="email" autoComplete="email" placeholder="vous@institution.mg" required maxLength="254" /></label>
            </div>
            <label>Université ou organisme <span>*</span><input name="institution" type="text" autoComplete="organization" placeholder="Nom de votre institution" required maxLength="200" /></label>
            <div className="form-row">
              <label>Titre de la recherche <span>*</span><input name="research_title" type="text" placeholder="Le sujet de vos travaux" required maxLength="240" /></label>
              <label>Domaine scientifique <span>*</span><select name="research_field" defaultValue="" required>
                <option value="" disabled>Choisir un domaine</option>
                <option>Agriculture et environnement</option>
                <option>Sciences biologiques et santé</option>
                <option>Chimie et sciences des matériaux</option>
                <option>Ingénierie et technologie</option>
                <option>Sciences physiques et mathématiques</option>
                <option>Sciences sociales et humaines</option>
                <option>Autre domaine</option>
              </select></label>
            </div>
            <label>Résumé des travaux <span>*</span><textarea name="research_summary" rows="5" placeholder="Présentez le problème étudié, votre approche et les résultats déjà obtenus." required maxLength="5000" /></label>
            <label>Mots-clés <span className="optional">Facultatif</span><input name="keywords" type="text" placeholder="Ex. biodiversité, intelligence artificielle, énergie" maxLength="300" /></label>
            <label className="consent"><input type="checkbox" name="consent" value="true" required /><span>J’accepte que ces informations soient utilisées par le TWAS Madagascar Chapter pour prendre connaissance de mes travaux et me recontacter à leur sujet. <span>*</span></span></label>
            <div className="form-footer">
              <p className="form-required"><span>*</span> Champs obligatoires</p>
              <button className="button button-dark submit-button" type="submit" disabled={isSending}>{isSending ? 'Envoi en cours…' : 'Envoyer ma présentation'} <span aria-hidden="true">↗</span></button>
            </div>
            <p className={`form-status ${submissionState}`} role="status" aria-live="polite">
              {submissionState === 'success' && 'Merci, votre présentation a bien été transmise au TWAS Madagascar Chapter.'}
              {submissionState === 'error' && 'L’envoi n’a pas abouti. Vérifiez votre connexion puis réessayez un peu plus tard.'}
            </p>
          </form>
        </section>

        <section className="closing-band" aria-label="Invitation à rejoindre le réseau">
          <div className="closing-symbol"><FlagMark /></div>
          <p>La recherche grandit<br /><em>quand on la partage.</em></p>
          <a className="button button-light" href="#chercheurs">Présenter vos travaux <span aria-hidden="true">↗</span></a>
          <span className="closing-decoration" aria-hidden="true">T</span>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#accueil"><FlagMark /><span className="brand-name">TWAS Madagascar <span>Chapter</span></span></a>
        <p>Rassembler les chercheurs. Faire avancer les idées.</p>
        <a href="https://twas.org/" target="_blank" rel="noreferrer">Découvrir TWAS <span aria-hidden="true">↗</span></a>
        <span className="footer-copy">© {new Date().getFullYear()} TWAS Madagascar Chapter</span>
      </footer>
    </>
  );
}

export default App;
