import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full container px-4 py-2 mx-auto">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Home">
          <video
            className="w-10 h-10 rounded-full"
            style={{
              placeSelf: "center",
              boxSizing: "border-box",
            }}
            autoPlay
            loop
            muted
          >
            <source src="./logo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Link>
        <address className="text-sm">
          <h2>Nagpur, Maharashtra, India</h2>
          <p>+91 1234567898</p>
        </address>
      </div>

      <div className="flex justify-center px-4 py-2">
        <p className="text-sm">
          CopyRight &copy; @SecureCheckoutDeals - Safe Shopping & Best Deals in
          India
        </p>
      </div>
    </footer>
  );
}
