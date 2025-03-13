import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src="/ring.ico" width={44} height={44} alt="the one ring" />
            <span className="font-bold">Lord of the Rings TCG Cardbase</span>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <Link href="/api-docs" className="hover:text-foreground">
              API Documentation
            </Link>
            <span>© {new Date().getFullYear()} LOTR Card Database</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
