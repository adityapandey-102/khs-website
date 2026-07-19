import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-offwhite">
      <div className="container flex items-center gap-2 py-3 text-xs text-gray-400">
        {items.map((item, index) => (
          <span key={item.label} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={12} />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-blue">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
