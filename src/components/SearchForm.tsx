"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { LanguageSelect } from "@/components/LanguageSelect"
import searchAction from "@/actions/query"
import { WordOptions } from "@/components/WordOptions"

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState<"darija" | "english">("darija");
  const [results, setResults] = useState<
    Awaited<ReturnType<typeof searchAction>>
  >([]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Darija-English Dictionary
      </h1>

      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder={`Search in ${language}`}
          value={searchTerm}
          onChange={async (e) => {
            setSearchTerm(e.target.value);
            // handleSearch()
            const words = await searchAction(e.target.value, language);
            setResults(words);
          }}
          className="flex-grow"
        />
        <LanguageSelect onLanguageChange={setLanguage} language={language} />
      </div>
      <WordOptions searchResults={results} language={language} />
    </div>
  );
}
