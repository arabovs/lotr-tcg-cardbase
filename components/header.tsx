import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/ring.ico" width={44} height={44} alt="the one ring" />
          <span className="font-bold text-xl">
            Lord of the Rings TCG Cardbase
          </span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/rules">
            <Button variant="ghost">Rules</Button>
          </Link>
          <Link href="/api-docs">
            <Button variant="ghost">API</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
