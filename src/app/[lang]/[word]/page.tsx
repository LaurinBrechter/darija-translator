import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { and, InferSelectModel } from "drizzle-orm";
import { exampleSents, wordsTable } from "@/db/schema";

import { like, or } from "drizzle-orm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WordDetails } from "@/components/WordDetails";
import searchAction from "@/actions/query";
import SearchForm from "@/components/SearchForm";

// This function gets called at build time
export async function generateStaticParams() {
  const db = drizzle(process.env.DB_FILE_NAME!);
  const words = await db.select().from(wordsTable);

  // Get the paths we want to pre-render based on posts
  const paths = words.map((word) => ({ word: word.n1, lang: "darija" }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return paths;
}

const Chat = async ({
  params,
}: // searchParams,
{
  params: { word: string; lang: "darija" | "english" };
  // searchParams: { ctx: string[] | undefined | string };
}) => {
  const db = drizzle(process.env.DB_FILE_NAME!);

  console.log(params.word);

  const words = await searchAction(params.word, params.lang);

  const sentences: InferSelectModel<typeof exampleSents>[][] = [];

  for (const word of words) {
    const sent = await db
      .select()
      .from(exampleSents)
      .where(and(
        like(exampleSents.eng, `%${word.eng}%`),
        like(exampleSents.darija, `%${word.n1}%`)
      ))
      .limit(10);
    sentences.push(sent);
  }

  return (
    <>
      <SearchForm />
      <ScrollArea className="h-[400px] w-[60vw]">
        {words.map((word, index) => {
          return (
            <WordDetails
              key={index}
              searchResults={word}
              language="darija"
              examples={sentences[index]}
            />
          );
        })}
      </ScrollArea>
    </>
  );
};

export default Chat;
