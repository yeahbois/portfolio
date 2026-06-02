export interface WordDefinition {
  word: string;
  phonetic?: string;
  partOfSpeech: string;
  definition: string;
  example?: string;
}

export async function fetchWordDefinition(word: string, lang: 'en' | 'fr' = 'en'): Promise<WordDefinition | null> {
  try {
    // Using Free Dictionary API for English, and a mock/fallback for French if needed
    // In a real production app, we might use a paid API like Oxford or Larousse
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`);
    if (!response.ok) return null;

    const data = await response.json();
    const entry = data[0];
    const meaning = entry.meanings[0];

    return {
      word: entry.word,
      phonetic: entry.phonetic,
      partOfSpeech: meaning.partOfSpeech,
      definition: meaning.definitions[0].definition,
      example: meaning.definitions[0].example,
    };
  } catch (error) {
    console.error('Error fetching definition:', error);
    return null;
  }
}
