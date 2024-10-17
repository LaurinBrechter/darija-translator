import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { eq, InferSelectModel } from "drizzle-orm";
import { exampleSents, wordsTable } from "@/db/schema";

import { like, or } from "drizzle-orm";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { WordDetails } from "@/components/WordDetails";
import searchAction from "@/actions/query";

const Chat = async ({
  params,
  searchParams,
}: {
  params: { word: string, lang: 'darija' | 'english' };
  searchParams: { ctx: string[] | undefined | string };
}) => {
  const db = drizzle(process.env.DB_FILE_NAME!);

  console.log(params.word);

  const words = await searchAction(params.word, params.lang);


  const sentences: InferSelectModel<typeof exampleSents>[][] = [];

  for (const word of words) {
    const sent = await db.select().from(exampleSents).where(like(exampleSents.eng, `%${word.eng}%`)).limit(10);
    sentences.push(sent);
  }

  return (
    <ScrollArea className="h-[400px] w-[60vw]">
      {words.map((word, index) => {
        return (
          <WordDetails searchResults={word} language="darija" examples={sentences[index]} />
        );
      })}
    </ScrollArea>
  );
};

export default Chat;
