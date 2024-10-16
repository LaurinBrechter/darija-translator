import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import { wordsTable } from "@/db/schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";

const Chat = async ({
  params,
  searchParams,
}: {
  params: { wordId: number };
  searchParams: { ctx: string[] | undefined | string };
}) => {
  const db = drizzle(process.env.DB_FILE_NAME!);

  console.log(params.wordId);

  const words = await db
    .select()
    .from(wordsTable)
    .where(eq(wordsTable.id, params.wordId))
    .limit(10);
  console.log("Getting all users from the database: ", words);

  return (
    <div className="p-28">
      {words.map((word, index) => {
        return (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle>
                {word.darija_ar} - {word.eng}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Type: {word.type}</p>
              <p>Forms:</p>
              <div>
                <ul className="list-disc list-inside">
                  <li>{word.n1}</li>
                  <li>{word.n2}</li>
                  <li>{word.n3}</li>
                  <li>{word.n4}</li>
                  <li>{word.n5}</li>
                  <li>{word.n6}</li>
                </ul>
              </div>
              {/* {word.type === "verb" && (
                <div>
                  <h3 className="font-semibold mb-2">Conjugations:</h3>
                  {Object.entries(entry.conjugations).map(
                    ([tense, conjugation]) => (
                      <div key={tense} className="mb-2">
                        <h4 className="font-medium">
                          {tense.charAt(0).toUpperCase() + tense.slice(1)}:
                        </h4>
                        <ul className="list-disc list-inside">
                          {Object.entries(conjugation).map(
                            ([pronoun, form]) => (
                              <li key={pronoun}>
                                {pronoun}: {form}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              )} */}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Chat;
