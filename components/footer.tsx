import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { HeartIcon, CodeXml } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3">
        <div className="flex items-center">
            &copy; {year} {'-'} Build with 
            <HeartIcon className="h-4 w-4 mr-1 ml-1 text-red-600 fill-current" />
             by{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/HosseinKarami"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hossein Karami
            </Link>.
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons() {
  return (
    <>
      <Link
        href="https://refact.co"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <CodeXml className="h-[0.8rem] w-4 mr-2 text-primary fill-current" />
        Refact.co
      </Link>
    </>
  );
}
