'use client';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-muted-foreground text-sm">
        <span>&copy; {new Date().getFullYear()} Creator Platform. All rights reserved.</span>
        <a
          href="https://github.com/your-repo-url"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline mt-2 sm:mt-0"
        >
          View on GitHub
        </a>
      </div>
    </footer>
  );
}