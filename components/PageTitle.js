import { Children } from "react";

export default function PageTitle({ title, textColor, children }) {
  return (
    <div className="space-y-4 mb-12">
      <h1 className="font-bold text-2xl md:text-3xl">
        <span className={textColor}>{title}</span>
      </h1>
      <p className="prose dark:prose-dark">{children}</p>
    </div>
  );
}
