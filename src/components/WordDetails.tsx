import searchAction from "@/actions/query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { exampleSents } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export function WordDetails(props: {
  searchResults: Awaited<ReturnType<typeof searchAction>>[0];
  language: "darija" | "english";
  examples: InferSelectModel<typeof exampleSents>[];
}) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {props.searchResults.darija_ar} - {props.searchResults.eng}
          Type: {props.searchResults.type}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside flex">
          <p>Forms:</p>
          {props.searchResults.n1 && <li>{props.searchResults.n1}</li>}
          {props.searchResults.n2 && <li>{props.searchResults.n2}</li>}
          {props.searchResults.n3 && <li>{props.searchResults.n3}</li>}
          {props.searchResults.n4 && <li>{props.searchResults.n4}</li>}
          {props.searchResults.n5 && <li>{props.searchResults.n5}</li>}
          {props.searchResults.n6 && <li>{props.searchResults.n6}</li>}
        </ul>
        <p>Examples</p>
        <div className="flex">
          <ul className="list-disc list-inside">
            {props.examples.map((example, index) => (
              <li key={index}>
                {example.eng} - {example.darija}
              </li>
            ))}
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
}
