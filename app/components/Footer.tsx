export default function Footer() {
  return (
    <footer className="bg-black text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} THENX Community Forum - Unofficial Fan Site</p>
        <p className="text-sm mt-2">
          This is a fan-made community forum. Not affiliated with the official THENX organization.
        </p>
      </div>
    </footer>
  );
}
