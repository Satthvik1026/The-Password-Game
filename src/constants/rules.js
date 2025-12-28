export const rules = [

    {
        id: 1,
        description: "Password must be at least 8 characters.",
        validate: (pwd) => pwd.length >= 8
    },

    {
        id: 2,
        description: "Password must include at least TWO numbers.",
        validate: (pwd) => (pwd.match(/\d/g) || []).length >= 2
    },

    {
        id: 3,
        description: "Password must include BOTH uppercase and lowercase letters.",
        validate: (pwd) => /[A-Z]/.test(pwd) && /[a-z]/.test(pwd)
    },

    {
        id: 4,
        description: "Password must include at least TWO special characters.",
        validate: (pwd) => (pwd.match(/[^A-Za-z0-9]/g) || []).length >= 2
    },

    {
        id: 5,
        description: "The digits in your password must add up to a MULTIPLE of 11.",
        validate: (pwd) => {
            const d = pwd.match(/\d/g);
            return d && d.reduce((a, b) => a + +b, 0) % 11 === 0;
        }
    },

    {
        id: 6,
        description: "Password must include at least TWO Roman numerals.",
        validate: (pwd) => (pwd.match(/[IVXLCDM]/g) || []).length >= 2
    },

    {
        id: 7,
        description: "Password must include at least TWO different emojis.",
        validate: (pwd) => {
            const e = pwd.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g);
            return e && new Set(e).size >= 2;
        }
    },

    {
        id: 8,
        description: "Include the company name EXACTLY once.",
        extraType: "company",
        validate: (pwd, extra) => {
            const m = pwd.match(new RegExp(extra, "gi"));
            return m && m.length === 1;
        }
    },

    {
        id: 9,
        description: "Include today's day AND tomorrow's day.",
        validate: (pwd) => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const t = new Date().getDay();
            return pwd.toLowerCase().includes(days[t].toLowerCase()) &&
                pwd.toLowerCase().includes(days[(t + 1) % 7].toLowerCase());
        }
    },

    {
        id: 10,
        description: "Roman numerals must represent 9 and 5 together.",
        validate: (pwd) => pwd.includes("IX") && pwd.includes("V")
    },

    {
        id: 11,
        description: "Captcha must appear REVERSED in the password.",
        extraType: "captcha",
        validate: (pwd, extra) =>
            pwd.includes(extra.split("").reverse().join(""))
    },

    {
        id: 12,
        description: "Include TWO different periodic table symbols.",
        validate: (pwd) => {
            const m = pwd.match(/(He|Li|Be|Ne|Na|Mg|Al|Si|Cl|Ar|Ca|Fe|Ni|Cu|Zn|Ag|Au|Pb)/g);
            return m && new Set(m).size >= 2;
        }
    },

    {
        id: 13,
        description: "Include the moon emoji AND its name.",
        extraType: "moon",
        validate: (pwd, extra) =>
            pwd.includes(extra.emoji) &&
            pwd.toLowerCase().includes(extra.name.toLowerCase())
    },

    {
        id: 14,
        description: "Include the color name AND its HEX code.",
        extraType: "color",
        validate: (pwd, extra) =>
            pwd.toLowerCase().includes(extra.name.toLowerCase()) &&
            pwd.includes(extra.hex)
    },

    {
        id: 15,
        description: "Include the country name WITHOUT using its flag.",
        extraType: "country",
        validate: (pwd, extra) =>
            pwd.toLowerCase().includes(extra.name.toLowerCase()) &&
            !pwd.includes(extra.flag)
    },

    {
        id: 16,
        description: "Include TWO leap years.",
        validate: (pwd) => (pwd.match(/(19|20)\d{2}/g) || []).length >= 2
    },

    {
        id: 17,
        description: "Include exactly THREE strength emojis.",
        validate: (pwd) => (pwd.match(/🏋️/g) || []).length === 3
    },

    {
        id: 18,
        description: "Rickroll link must NOT be clickable.",
        validate: (pwd) => pwd.includes("youtu.be/dQw4w9WgXcQ") && !pwd.includes("https://")
    },

    {
        id: 19,
        description: "Include the secret word as a palindrome.",
        extraType: "wordle",
        validate: (pwd, extra) => {
            const p = extra + extra.split("").reverse().join("");
            return pwd.toLowerCase().includes(p.toLowerCase());
        }
    },

    {
        id: 20,
        description: "Include TWO valid hex color codes.",
        validate: (pwd) => (pwd.match(/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g) || []).length >= 2
    },

    {
        id: 21,
        description: "Include TWO different continent names.",
        validate: (pwd) => {
            const c = pwd.match(/africa|antarctica|asia|australia|europe|north america|south america/gi);
            return c && new Set(c.map(x => x.toLowerCase())).size >= 2;
        }
    },

    {
        id: 22,
        description: "Include current hour AND minute (2-digit).",
        validate: (pwd) => {
            const d = new Date();
            const h = String(d.getHours());
            const m = String(d.getMinutes()).padStart(2, "0");
            return pwd.includes(h) && pwd.includes(m);
        }
    },

    {
        id: 23,
        description: "Prime number must appear TWICE.",
        extraType: "prime",
        validate: (pwd, extra) =>
            (pwd.match(new RegExp(extra, "g")) || []).length === 2
    },

    {
        id: 24,
        description: "Include all FIVE vowels at least once.",
        validate: (pwd) => ["a", "e", "i", "o", "u"].every(v => pwd.toLowerCase().includes(v))
    },

    {
        id: 25,
        description: "Gold symbol must appear at the END of password.",
        validate: (pwd) => pwd.endsWith("Au")
    },

    {
        id: 26,
        description: "Include TWO valid chess moves.",
        validate: (pwd) => (pwd.match(/[KQRBN]?[a-h][1-8]/g) || []).length >= 2
    },

    {
        id: 27,
        description: "Tech keyword must appear in alternating case.",
        extraType: "keyword",
        validate: (pwd, extra) =>
            pwd.includes(extra.split("").map((c, i) => i % 2 ? c.toLowerCase() : c).join(""))
    },

    {
        id: 28,
        description: "Include TWO DIFFERENT YouTube links.",
        validate: (pwd) => {
            const m = pwd.match(/youtube\.com|youtu\.be/g);
            return m && m.length >= 2;
        }
    },

    {
        id: 29,
        description: "Include infinity symbol EXACTLY twice.",
        validate: (pwd) => (pwd.match(/∞/g) || []).length === 2
    },

    {
        id: 30,
        description: "DONE must appear exactly once and at the center.",
        validate: (pwd) => {
            const i = pwd.indexOf("DONE");
            return i !== -1 && i === Math.floor((pwd.length - 4) / 2);
        }
    },

    {
        id: 31,
        description: "Password length must equal the current level number.",
        validate: (pwd, _, ctx) => pwd.length === ctx.level
    },

    {
        id: 32,
        description: "Include a math expression that evaluates to 42.",
        validate: (pwd) => {
            const m = pwd.match(/(\d+[\+\-\*\/]\d+)/);
            if (!m) return false;
            // Safe evaluation without eval()
            const expr = m[1];
            const parts = expr.match(/(\d+)([\+\-\*\/])(\d+)/);
            if (!parts) return false;
            const [, a, op, b] = parts;
            const numA = parseInt(a, 10);
            const numB = parseInt(b, 10);
            let result;
            switch (op) {
                case '+': result = numA + numB; break;
                case '-': result = numA - numB; break;
                case '*': result = numA * numB; break;
                case '/': result = numB !== 0 ? numA / numB : NaN; break;
                default: return false;
            }
            return Number.isFinite(result) && result === 42;
        }
    },

    {
        id: 33,
        description: "Sum of character codes must be divisible by 7.",
        validate: (pwd) => [...pwd].reduce((a, c) => a + c.charCodeAt(0), 0) % 7 === 0
    },

    {
        id: 34,
        description: "First and last characters must be the same.",
        validate: (pwd) => pwd.length > 1 && pwd[0] === pwd[pwd.length - 1]
    },

    {
        id: 35,
        description: "Password must NOT contain vowels outside DONE or I SURVIVED.",
        validate: (pwd) => {
            const cleaned = pwd.replace(/DONE|I SURVIVED/gi, "");
            return !/[aeiou]/i.test(cleaned);
        }
    },

    {
        id: 36,
        description: "Include AM or PM correctly.",
        validate: (pwd) =>
            new Date().getHours() < 12 ? pwd.includes("AM") : pwd.includes("PM")
    },

    {
        id: 37,
        description: "Include a palindrome of length ≥ 3.",
        validate: (pwd) => {
            // Optimized palindrome detection - O(n²) instead of O(n³)
            for (let center = 1; center < pwd.length - 1; center++) {
                // Check odd-length palindromes
                let left = center - 1, right = center + 1;
                while (left >= 0 && right < pwd.length && pwd[left] === pwd[right]) {
                    if (right - left + 1 >= 3) return true;
                    left--; right++;
                }
                // Check even-length palindromes
                left = center; right = center + 1;
                while (left >= 0 && right < pwd.length && pwd[left] === pwd[right]) {
                    if (right - left + 1 >= 3) return true;
                    left--; right++;
                }
            }
            return false;
        }
    },

    {
        id: 38,
        description: "Password must contain at least THREE digits.",
        validate: (pwd) => (pwd.match(/\d/g) || []).length >= 3
    },

    {
        id: 39,
        description: "Include a valid HTTP status code.",
        validate: (pwd) => /(100|101|200|201|204|301|302|304|400|401|403|404|500|502|503)/.test(pwd)
    },

    {
        id: 40,
        description: "Final Boss: Remove one previously satisfied rule.",
        validate: (pwd, _, ctx) => ctx.removedRule === true
    },

    {
        id: 41,
        description: "Password length must be PRIME OR equal to the level.",
        validate: (pwd, _, ctx) => {
            if (pwd.length === ctx.level) return true;
            for (let i = 2; i <= Math.sqrt(pwd.length); i++)
                if (pwd.length % i === 0) return false;
            return pwd.length >= 2;
        }
    },

    {
        id: 42,
        description: "Uppercase letters must equal digits.",
        validate: (pwd) =>
            (pwd.match(/[A-Z]/g) || []).length === (pwd.match(/\d/g) || []).length
    },

    {
        id: 43,
        description: "Include a valid IPv4 address.",
        validate: (pwd) =>
            /\b((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)\b/.test(pwd)
    },

    {
        id: 44,
        description: "Sum of ALL digits must be AT LEAST the level number.",
        validate: (pwd, _, ctx) => {
            const d = pwd.match(/\d/g);
            if (!d) return false;
            return d.reduce((a, b) => a + +b, 0) >= ctx.level;
        }
    },

    {
        id: 45,
        description: "Include a valid ISO date (YYYY-MM-DD).",
        validate: (pwd) =>
            /\b\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b/.test(pwd)
    },

    {
        id: 46,
        description: "Include at least ONE mirrored pair (abba, 1221).",
        validate: (pwd) => {
            for (let i = 0; i < pwd.length - 3; i++) {
                if (pwd[i] === pwd[i + 3] && pwd[i + 1] === pwd[i + 2]) return true;
            }
            return false;
        }
    },

    {
        id: 47,
        description: "Include binary representation of 10.",
        validate: (pwd) => pwd.includes("1010")
    },

    {
        id: 48,
        description: "Exactly HALF of characters must be letters.",
        validate: (pwd) => {
            const chars = [...pwd];
            const letters = chars.filter(c => /[A-Za-z]/.test(c)).length;
            return chars.length % 2 === 0 && letters === chars.length / 2;
        }
    },

    {
        id: 49,
        description: "Include a substring whose ASCII sum is exactly 300.",
        validate: (pwd) => {
            for (let i = 0; i < pwd.length; i++) {
                let sum = 0;
                for (let j = i; j < pwd.length; j++) {
                    sum += pwd.charCodeAt(j);
                    if (sum === 300) return true;
                    if (sum > 300) break;
                }
            }
            return false;
        }
    },

    {
        id: 50,
        description: "FINAL FINAL RULE: Include the text 'I SURVIVED'.",
        validate: (pwd) => pwd.includes("I SURVIVED")
    }

];
