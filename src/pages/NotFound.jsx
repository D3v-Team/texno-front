import { L, useLang } from '../i18n/LangContext';
import { Button } from '../components/ui';
import Seo from '../components/Seo';

export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden pt-24">
      <Seo title={L('Саҳифа топилмади · Ёшлар технопарки', 'Страница не найдена · Молодёжный технопарк')} />
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure-600/25 blur-[120px]" />
      <div className="container relative text-center">
        <div className="font-display text-[120px] font-semibold leading-none text-grad sm:text-[180px]">404</div>
        <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">{t(L('Бу саҳифа ҳали ихтиро қилинмаган', 'Эту страницу ещё не изобрели'))}</h1>
        <p className="mx-auto mt-3 max-w-md text-slate-400">{t(L('Манзил нотўғри ёки саҳифа кўчирилган.', 'Адрес неверный или страница перемещена.'))}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" icon>
            {t(L('Бош саҳифа', 'На главную'))}
          </Button>
          <Button to="/biznes#ariza" variant="ghost">
            {t(L('Муаммо юбориш', 'Отправить задачу'))}
          </Button>
        </div>
      </div>
    </section>
  );
}
