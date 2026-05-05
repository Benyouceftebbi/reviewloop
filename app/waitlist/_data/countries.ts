/*
  Country dial-code list for the waitlist phone input.

  Each entry ships with:
    - iso   : ISO-3166 alpha-2 code (used as the React key + sorting key)
    - name  : human display name (search target)
    - dial  : E.164 dial prefix incl. the "+" sign
    - flag  : Unicode regional-indicator pair. Renders as a flag glyph
              on macOS / iOS / Android / Linux. On Windows it falls
              back to two letter glyphs which is acceptable.

  Curated to ~40 markets — covers the regions our early signups come
  from without bloating the bundle. Easy to extend later.
*/

export type Country = {
  iso: string;
  name: string;
  dial: string;
  flag: string;
};

export const COUNTRIES: Country[] = [
  { iso: "US", name: "United States", dial: "+1",   flag: "\uD83C\uDDFA\uD83C\uDDF8" },
  { iso: "CA", name: "Canada",        dial: "+1",   flag: "\uD83C\uDDE8\uD83C\uDDE6" },
  { iso: "GB", name: "United Kingdom",dial: "+44",  flag: "\uD83C\uDDEC\uD83C\uDDE7" },
  { iso: "IE", name: "Ireland",       dial: "+353", flag: "\uD83C\uDDEE\uD83C\uDDEA" },
  { iso: "FR", name: "France",        dial: "+33",  flag: "\uD83C\uDDEB\uD83C\uDDF7" },
  { iso: "DE", name: "Germany",       dial: "+49",  flag: "\uD83C\uDDE9\uD83C\uDDEA" },
  { iso: "ES", name: "Spain",         dial: "+34",  flag: "\uD83C\uDDEA\uD83C\uDDF8" },
  { iso: "PT", name: "Portugal",      dial: "+351", flag: "\uD83C\uDDF5\uD83C\uDDF9" },
  { iso: "IT", name: "Italy",         dial: "+39",  flag: "\uD83C\uDDEE\uD83C\uDDF9" },
  { iso: "NL", name: "Netherlands",   dial: "+31",  flag: "\uD83C\uDDF3\uD83C\uDDF1" },
  { iso: "BE", name: "Belgium",       dial: "+32",  flag: "\uD83C\uDDE7\uD83C\uDDEA" },
  { iso: "CH", name: "Switzerland",   dial: "+41",  flag: "\uD83C\uDDE8\uD83C\uDDED" },
  { iso: "AT", name: "Austria",       dial: "+43",  flag: "\uD83C\uDDE6\uD83C\uDDF9" },
  { iso: "SE", name: "Sweden",        dial: "+46",  flag: "\uD83C\uDDF8\uD83C\uDDEA" },
  { iso: "NO", name: "Norway",        dial: "+47",  flag: "\uD83C\uDDF3\uD83C\uDDF4" },
  { iso: "DK", name: "Denmark",       dial: "+45",  flag: "\uD83C\uDDE9\uD83C\uDDF0" },
  { iso: "FI", name: "Finland",       dial: "+358", flag: "\uD83C\uDDEB\uD83C\uDDEE" },
  { iso: "PL", name: "Poland",        dial: "+48",  flag: "\uD83C\uDDF5\uD83C\uDDF1" },
  { iso: "CZ", name: "Czechia",       dial: "+420", flag: "\uD83C\uDDE8\uD83C\uDDFF" },
  { iso: "GR", name: "Greece",        dial: "+30",  flag: "\uD83C\uDDEC\uD83C\uDDF7" },
  { iso: "TR", name: "Turkey",        dial: "+90",  flag: "\uD83C\uDDF9\uD83C\uDDF7" },
  { iso: "AE", name: "United Arab Emirates", dial: "+971", flag: "\uD83C\uDDE6\uD83C\uDDEA" },
  { iso: "SA", name: "Saudi Arabia",  dial: "+966", flag: "\uD83C\uDDF8\uD83C\uDDE6" },
  { iso: "IL", name: "Israel",        dial: "+972", flag: "\uD83C\uDDEE\uD83C\uDDF1" },
  { iso: "EG", name: "Egypt",         dial: "+20",  flag: "\uD83C\uDDEA\uD83C\uDDEC" },
  { iso: "MA", name: "Morocco",       dial: "+212", flag: "\uD83C\uDDF2\uD83C\uDDE6" },
  { iso: "DZ", name: "Algeria",       dial: "+213", flag: "\uD83C\uDDE9\uD83C\uDDFF" },
  { iso: "TN", name: "Tunisia",       dial: "+216", flag: "\uD83C\uDDF9\uD83C\uDDF3" },
  { iso: "ZA", name: "South Africa",  dial: "+27",  flag: "\uD83C\uDDFF\uD83C\uDDE6" },
  { iso: "NG", name: "Nigeria",       dial: "+234", flag: "\uD83C\uDDF3\uD83C\uDDEC" },
  { iso: "KE", name: "Kenya",         dial: "+254", flag: "\uD83C\uDDF0\uD83C\uDDEA" },
  { iso: "IN", name: "India",         dial: "+91",  flag: "\uD83C\uDDEE\uD83C\uDDF3" },
  { iso: "PK", name: "Pakistan",      dial: "+92",  flag: "\uD83C\uDDF5\uD83C\uDDF0" },
  { iso: "BD", name: "Bangladesh",    dial: "+880", flag: "\uD83C\uDDE7\uD83C\uDDE9" },
  { iso: "SG", name: "Singapore",     dial: "+65",  flag: "\uD83C\uDDF8\uD83C\uDDEC" },
  { iso: "MY", name: "Malaysia",      dial: "+60",  flag: "\uD83C\uDDF2\uD83C\uDDFE" },
  { iso: "ID", name: "Indonesia",     dial: "+62",  flag: "\uD83C\uDDEE\uD83C\uDDE9" },
  { iso: "TH", name: "Thailand",      dial: "+66",  flag: "\uD83C\uDDF9\uD83C\uDDED" },
  { iso: "VN", name: "Vietnam",       dial: "+84",  flag: "\uD83C\uDDFB\uD83C\uDDF3" },
  { iso: "PH", name: "Philippines",   dial: "+63",  flag: "\uD83C\uDDF5\uD83C\uDDED" },
  { iso: "JP", name: "Japan",         dial: "+81",  flag: "\uD83C\uDDEF\uD83C\uDDF5" },
  { iso: "KR", name: "South Korea",   dial: "+82",  flag: "\uD83C\uDDF0\uD83C\uDDF7" },
  { iso: "CN", name: "China",         dial: "+86",  flag: "\uD83C\uDDE8\uD83C\uDDF3" },
  { iso: "HK", name: "Hong Kong",     dial: "+852", flag: "\uD83C\uDDED\uD83C\uDDF0" },
  { iso: "TW", name: "Taiwan",        dial: "+886", flag: "\uD83C\uDDF9\uD83C\uDDFC" },
  { iso: "AU", name: "Australia",     dial: "+61",  flag: "\uD83C\uDDE6\uD83C\uDDFA" },
  { iso: "NZ", name: "New Zealand",   dial: "+64",  flag: "\uD83C\uDDF3\uD83C\uDDFF" },
  { iso: "BR", name: "Brazil",        dial: "+55",  flag: "\uD83C\uDDE7\uD83C\uDDF7" },
  { iso: "AR", name: "Argentina",     dial: "+54",  flag: "\uD83C\uDDE6\uD83C\uDDF7" },
  { iso: "MX", name: "Mexico",        dial: "+52",  flag: "\uD83C\uDDF2\uD83C\uDDFD" },
  { iso: "CL", name: "Chile",         dial: "+56",  flag: "\uD83C\uDDE8\uD83C\uDDF1" },
  { iso: "CO", name: "Colombia",      dial: "+57",  flag: "\uD83C\uDDE8\uD83C\uDDF4" },
];

/** Default country shown on first render. Mirrors the design reference (US). */
export const DEFAULT_COUNTRY: Country = COUNTRIES[0];
