import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="layout layout--single">
      <section className="stage glass">
        <div className="empty">
          <strong>Không tìm thấy đội hoặc mẫu thiết kế</strong>
          <Link className="tag glass glass--refract" href="/">Về trang chủ</Link>
        </div>
      </section>
    </main>
  );
}
