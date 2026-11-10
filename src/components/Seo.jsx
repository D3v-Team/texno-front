import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLang } from '../i18n/LangContext';
import { SITE } from '../data/site';

export default function Seo({ title, description }) {
  const { t } = useLang();
  const { pathname } = useLocation();
  const fullTitle = t(title);
  const desc = t(description);
  const url = `${SITE.url}${pathname}`;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {desc && <meta name="description" content={desc} />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      {desc && <meta property="og:description" content={desc} />}
      <meta property="og:url" content={url} />
    </Helmet>
  );
}
