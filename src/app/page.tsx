"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelect } from "@/components/LanguageSelect"
import searchAction from "@/actions/query"
import { Select, SelectContent, SelectItem } from "@/components/ui/select"
import { WordOptions } from "@/components/WordOptions"
import { InferSelectModel } from "drizzle-orm"



// Mock data structure for dictionary entries
const dictionary = [
  { darija: "merhba", english: "hello", type: "expression" },
  { darija: "bslama", english: "goodbye", type: "expression" },
  { darija: "kul", english: "eat", type: "verb", conjugations: {
    present: { ana: "kanakul", nta: "katakul", huwa: "kayakul" },
    past: { ana: "klit", nta: "kliti", huwa: "kla" },
    future: { ana: "ghadinkul", nta: "ghaditakul", huwa: "ghadiyakul" }
  }},
  { darija: "mshi", english: "go", type: "verb", conjugations: {
    present: { ana: "kanmshi", nta: "katmshi", huwa: "kaymshi" },
    past: { ana: "mshit", nta: "mshiti", huwa: "msha" },
    future: { ana: "ghadinmshi", nta: "ghaditamshi", huwa: "ghadiymshi" }
  }},
]

export default function DarijaDictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [language, setLanguage] = useState<'darija' | 'english'>('darija')
  const [results, setResults] = useState<Awaited<ReturnType<typeof searchAction>>>([])



  // const handleSearch = () => {
  //   const searchResults = dictionary.filter(entry => 
  //     entry[language].toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   setResults(searchResults)
  // }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Darija-English Dictionary</h1>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder={`Search in ${language}`}
          value={searchTerm}
          onChange={async (e) => {
            setSearchTerm(e.target.value)
            // handleSearch()
            const words = await searchAction(e.target.value, language)
            setResults(words)
          }}
          className="flex-grow"
        />
        <LanguageSelect onLanguageChange={setLanguage} />
        {/* <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
        </Button> */}
        
      </div>
      <WordOptions searchResults={results} language={language} />
      {/* {results.map((entry, index) => (
        <Card key={index} className="mb-4">
          <CardHeader>
            <CardTitle>{entry.darija} - {entry.english}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Type: {entry.type}</p>
            {entry.type === "verb" && (
              <div>
                <h3 className="font-semibold mb-2">Conjugations:</h3>
                {Object.entries(entry.conjugations).map(([tense, conjugation]) => (
                  <div key={tense} className="mb-2">
                    <h4 className="font-medium">{tense.charAt(0).toUpperCase() + tense.slice(1)}:</h4>
                    <ul className="list-disc list-inside">
                      {Object.entries(conjugation).map(([pronoun, form]) => (
                        <li key={pronoun}>{pronoun}: {form}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))} */}
    </div>
  )
}