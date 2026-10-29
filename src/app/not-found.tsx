'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/locale';

export default function NotFound() {
  const { t } = useI18n();
  return (
    <main className="layout layout--single">
      <section className="stage glass">
        <div className="empty">
          <strong>{t.notFound}</strong>
          <Link className="tag glass glass--refract" href="/">{t.backHome}</Link>
        </div>
      </section>
    </main>
  );
}
