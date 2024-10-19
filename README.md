
## Darija Dictionary/Translator.

- Since I am currently learning some maroccan arabic (aka darija) I decided to build this dictionary/translator app.
- It is based on the [darija-open-dataset](https://github.com/darija-open-dataset) that contains ~3000 words in darija
    - The dictionary is not comprehensive and there might be some mistakes as I simply took this dataset as the ground truth
- additionally, there are around 40,000 example sentences that will be shown when you look up a word.
    - since the dataset is not comprehensive, the example sentences might contain words that are not in the dictionary itself.
- the app is mostly aimed at language learners.



### Features

- search for a word in darija/english and get autocompletions in the other language
- once you found the word you are looking for, you get all the forms of the word and its example sentences


### Technical

- the app is written with nextjs, tailwindcss and shadcn/ui.
- I am using a simple SQlite database for storing the raw dictionary as the data is static anyways and not sensitive.
    - this also means that we have no other components that we need to deploy seperately (e.g. a postgres database)
- all pages for the different words are statically generated at build time and therefore server-site generated (SSG)
- you can simply deploy this app for free using vercel
- you can also run deploy it yourself by running (given that you have installed nodejs and npm)

```bash
npm install

npm run build

npm run start
```