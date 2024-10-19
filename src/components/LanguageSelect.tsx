import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  // SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 

// enum LanguageOptions {
//     Darija = "darija",
//     English = "english",
// }


export function LanguageSelect(props: {
    onLanguageChange: (language: 'darija' | 'english') => void
    language: 'darija' | 'english'
}) {
  return (
    <Select onValueChange={
        (value: 'darija' | 'english') => props.onLanguageChange(value)
    }>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="🇲🇦 darija" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="darija">🇲🇦 Darija</SelectItem>
          <SelectItem value="english">🇬🇧 English</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}