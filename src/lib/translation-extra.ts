import type { PhraseId } from "./phrases";

/** Extra vocabulary merged into each built-in language */
export const TRANSLATION_EXTRA: Record<string, Partial<Record<PhraseId, string>>> = {
  es: { dog: "perro", bird: "pájaro", apple: "manzana", dad: "papá", red: "rojo", blue: "azul", friend: "amigo", night: "buenas noches", love: "amor", house: "casa" },
  fr: { dog: "chien", bird: "oiseau", apple: "pomme", dad: "papa", red: "rouge", blue: "bleu", friend: "ami", night: "bonne nuit", love: "amour", house: "maison" },
  de: { dog: "Hund", bird: "Vogel", apple: "Apfel", dad: "Papa", red: "rot", blue: "blau", friend: "Freund", night: "gute Nacht", love: "Liebe", house: "Haus" },
  it: { dog: "cane", bird: "uccello", apple: "mela", dad: "papà", red: "rosso", blue: "blu", friend: "amico", night: "buonanotte", love: "amore", house: "casa" },
  pt: { dog: "cão", bird: "pássaro", apple: "maçã", dad: "pai", red: "vermelho", blue: "azul", friend: "amigo", night: "boa noite", love: "amor", house: "casa" },
  nl: { dog: "hond", bird: "vogel", apple: "appel", dad: "papa", red: "rood", blue: "blauw", friend: "vriend", night: "welterusten", love: "liefde", house: "huis" },
  tr: { dog: "köpek", bird: "kuş", apple: "elma", dad: "baba", red: "kırmızı", blue: "mavi", friend: "arkadaş", night: "iyi geceler", love: "sevgi", house: "ev" },
  ru: { dog: "собака", bird: "птица", apple: "яблоко", dad: "папа", red: "красный", blue: "синий", friend: "друг", night: "спокойной ночи", love: "любовь", house: "дом" },
  pl: { dog: "pies", bird: "ptak", apple: "jabłko", dad: "tata", red: "czerwony", blue: "niebieski", friend: "przyjaciel", night: "dobranoc", love: "miłość", house: "dom" },
  sv: { dog: "hund", bird: "fågel", apple: "äpple", dad: "pappa", red: "röd", blue: "blå", friend: "vän", night: "god natt", love: "kärlek", house: "hus" },
  ar: { dog: "kalb", bird: "ta'ir", apple: "tuffah", dad: "baba", red: "ahmar", blue: "azraq", friend: "sadiq", night: "tisbah ala khayr", love: "hub", house: "bayt" },
  zh: { dog: "gǒu", bird: "niǎo", apple: "píngguǒ", dad: "bàba", red: "hóng", blue: "lán", friend: "péngyou", night: "wǎn'ān", love: "ài", house: "fángzi" },
  ja: { dog: "inu", bird: "tori", apple: "ringo", dad: "otōsan", red: "aka", blue: "ao", friend: "tomodachi", night: "oyasumi", love: "ai", house: "ie" },
  ko: { dog: "gae", bird: "sae", apple: "sagwa", dad: "appa", red: "ppalgansaek", blue: "paransaek", friend: "chingu", night: "annyeonghi jumuseyo", love: "sarang", house: "jip" },
  hi: { dog: "kutta", bird: "chidiya", apple: "seb", dad: "papa", red: "laal", blue: "neela", friend: "dost", night: "shubh ratri", love: "pyaar", house: "ghar" },
  vi: { dog: "chó", bird: "chim", apple: "táo", dad: "bố", red: "đỏ", blue: "xanh", friend: "bạn", night: "chúc ngủ ngon", love: "yêu", house: "nhà" },
  id: { dog: "anjing", bird: "burung", apple: "apel", dad: "ayah", red: "merah", blue: "biru", friend: "teman", night: "selamat malam", love: "cinta", house: "rumah" },
  el: { dog: "skylos", bird: "poulí", apple: "mílo", dad: "bampás", red: "kókkino", blue: "galázio", friend: "filos", night: "kalinychta", love: "agápi", house: "spíti" },
  he: { dog: "kelev", bird: "tsipor", apple: "tapuach", dad: "abba", red: "adom", blue: "kachol", friend: "chaver", night: "laila tov", love: "ahava", house: "bayit" },
  uk: { dog: "sobaka", bird: "ptakh", apple: "yabluko", dad: "tato", red: "chervonyy", blue: "syniy", friend: "druh", night: "dobranich", love: "kokhannia", house: "dim" },
  ro: { dog: "câine", bird: "pasăre", apple: "măr", dad: "tată", red: "roșu", blue: "albastru", friend: "prieten", night: "noapte bună", love: "dragoste", house: "casă" },
  hu: { dog: "kutya", bird: "madár", apple: "alma", dad: "apa", red: "piros", blue: "kék", friend: "barát", night: "jó éjszakát", love: "szerelem", house: "ház" },
  fi: { dog: "koira", bird: "lintu", apple: "omena", dad: "isä", red: "punainen", blue: "sininen", friend: "ystävä", night: "hyvää yötä", love: "rakkaus", house: "talo" },
  da: { dog: "hund", bird: "fugl", apple: "æble", dad: "far", red: "rød", blue: "blå", friend: "ven", night: "god nat", love: "kærlighed", house: "hus" },
  no: { dog: "hund", bird: "fugl", apple: "eple", dad: "pappa", red: "rød", blue: "blå", friend: "venn", night: "god natt", love: "kjærlighet", house: "hus" },
  sw: { dog: "mbwa", bird: "ndege", apple: "tufaa", dad: "baba", red: "nyekundu", blue: "bluu", friend: "rafiki", night: "usiku mwema", love: "upendo", house: "nyumba" },
  ga: { dog: "madra", bird: "éan", apple: "úll", dad: "daid", red: "dearg", blue: "gorm", friend: "caraid", night: "oíche mhaith", love: "grá", house: "teach" },
  cy: { dog: "ci", bird: "aderyn", apple: "afal", dad: "tad", red: "coch", blue: "glas", friend: "ffrind", night: "nos da", love: "cariad", house: "tŷ" },
  cs: { dog: "pes", bird: "pták", apple: "jablko", dad: "táta", red: "červená", blue: "modrá", friend: "přítel", night: "dobrou noc", love: "láska", house: "dům" },
};

export function mergeTranslations(
  languageId: string,
  base: Partial<Record<PhraseId, string>>,
): Record<PhraseId, string> {
  const merged = { ...base, ...(TRANSLATION_EXTRA[languageId] ?? {}) };
  const result = {} as Record<PhraseId, string>;
  for (const key of Object.keys(merged) as PhraseId[]) {
    const word = merged[key]?.trim();
    if (word) result[key] = word;
  }
  return result;
}
