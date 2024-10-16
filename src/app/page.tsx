"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Toggle } from "@/components/ui/toggle"
import { Label } from "@/components/ui/label"



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

export default async function DarijaDictionary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isEnglish, setIsEnglish] = useState(false)
  const [results, setResults] = useState([])



  const handleSearch = () => {
    const searchResults = dictionary.filter(entry => 
      entry[isEnglish ? "english" : "darija"].toLowerCase().includes(searchTerm.toLowerCase())
    )
    setResults(searchResults)
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Darija-English Dictionary</h1>
      
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder={`Search in ${isEnglish ? 'English' : 'Darija'}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <div className="flex items-center justify-center space-x-2 mb-6">
        <Label htmlFor="language-toggle">Darija</Label>
        <Toggle
          id="language-toggle"
          pressed={isEnglish}
          onPressedChange={setIsEnglish}
        />
        <Label htmlFor="language-toggle">English</Label>
      </div>

      {results.map((entry, index) => (
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
      ))}
    </div>
  )
}