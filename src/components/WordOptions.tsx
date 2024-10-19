"use client";

import * as React from "react";
import searchAction from "@/actions/query";

export function WordOptions(props: { searchResults: Awaited<ReturnType<typeof searchAction>>, language: 'darija' | 'english' }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-wrap gap-3 h-[100px]">
    {props.searchResults.map((word, index) => (
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm h-[35px]">
        <a href={`/${props.language}/${props.language === 'darija' ? word.n1 : word.eng}`}>{
          
          props.language === 'darija' ? word.n1 : word.eng
          
          } ({word.type})</a>
      </div>
    ))}</div>
  );
}
