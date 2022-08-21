const faker = require("faker");
const moment = require("moment");

/**
 * In this seeded database there is:
 * - 2 lessons
 */
const seedData = {
    Lesson: [
        {
            lesson_id: 1,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "youtube.com/url_to_video",
        },
        {
            lesson_id: 2,
            lesson_date: new moment(faker.date.past(100)).format("YYYY-MM-DD"),
            source: "facebook.com/url_to_video",
        },
    ],
    Surah: [
        {
            surah_id: 1,
            surah_number: 1,
            name_complex: "Al-Fātiĥah",
            name_arabic: "الفاتحة",
        },
    ],
    SurahInfo: [
        {
            surah_info_id: 1,
            surah: 1,
            title: "The Opener",
            info: "Al-Fātiĥah consists of 7 ayah which are a prayer for guidance and mercy",
        },
    ],
    Verse: [
        {
            verse_index: 1,
            surah: 1,
            verse_number: 1,
            verse_text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
        },
    ],
    Reflection: [
        {
            reflection_id: 1,
            verse_id: 1,
            title: "Bismillah",
            reflection: "My First Reflection",
        },
        {
            reflection_id: 2,
            verse_id: 1,
            title: "Inshallah",
            reflection: "My Second Reflection",
        }
    ],
    Mufasir: [
        {
            mufasir_id: 1,
            mufasir_name: "Ibn Kathir",
            death: "774 H",
        },
    ],
    RootWord: [
        {
            root_id: 1,
            root_word: "س م و",
        },
        {
            root_id: 2,
            root_word: "ز ح ز ح"
        }
    ],
    RootMeaning: [
        {
            meaning_id: 1,
            root_word: "س م و",
            meaning: "to be high/lofty, raised, name, attribute. samawat - heights/heavens/rain, raining clouds. ismun - mark of identification by which one is recognised. It is a derivation of wsm (pl. asma). ism - stands for a distinguishing mark of a thing, sometimes said to signify its reality.",
        },
    ],
    ArabicWord: [
        {
            word_id: 1,
            word: "بِسْمِ",
            root_id: 1
        },
        {
            word_id: 2,
            word: "بِسْمِ",
            root_id: 1
        }
    ],
    VerseWord: [
        {
            verse_word_id: 1,
            verse_id: 1,
            word_id: 1,
            visible: false,
            word_explaination: "In the Name of Allah",
        },
    ],
    Tafsir: [
        {
            tafsir_id: 1,
            content: "In the name of Allah, The Most Gracious, The Most Merciful",
            book: "Tafsir Ibn Kathir",
            verse_id: 1,
            visible: false,
        }
    ],
};

/**
 * Before we start testing, we should wipe the database clean.
 */
async function clearDatabase(db) {
    tables = Object.keys(seedData);
    tables.forEach(async (table) => {
        sql = `Delete from ${table} *`;
        await db
            .query(sql, [])
            .then((result) => {
                return result.rows;
            })
            .catch((e) => {
                console.log("\n!Deletion error!\n", e);
            });
    });
}

function prepareTableSQL(table) {
    let rows = seedData[table];
    let columns = Object.keys(rows[0]);
    let columns_string = "(";
    for (var i = 0; i < columns.length; i++) {
        columns_string = columns_string + `${columns[i]}, `;
    }
    columns_string =
        columns_string.substring(0, columns_string.length - 2) + ") values (";
    for (var i = 0; i < columns.length; i++) {
        columns_string = columns_string + `\$${i + 1}, `;
    }
    columns_string =
        columns_string.substring(0, columns_string.length - 2) + ")";
    let sql = `insert into ${table} ${columns_string}`;
    rowValues = [];
    for (var row = 0; row < rows.length; row++) {
        rowValues.push(Object.values(rows[row]));
    }
    return [sql, rowValues];
}

/**
 * This is where we actually put all of the mock data above into the database
 */
async function seedDatabase(db) {
    await clearDatabase(db);
    let tables = Object.keys(seedData);
    let table;
    for (let t = 0; t < tables.length; t++) {
        table = tables[t];
        let ret = prepareTableSQL(table);
        let sql = ret[0];
        let rows = ret[1];
        for (var row = 0; row < rows.length; row++) {
            await db
                .query(sql, rows[row])
                .then((result) => {
                    return result.rows;
                })
                .catch((e) => {
                    console.log("\nInsertion error!\n", e);
                    console.log(sql, rows[row]);
                });
        }
        // Here we're just reseting the sequence for each table because
        // our manual inserts caused them to get out of sync
        let primary_key = Object.keys(seedData[table][0])[0];
        sql = `SELECT setval(pg_get_serial_sequence('${table}', '${primary_key}'), (SELECT MAX(${primary_key}) FROM ${table})+1);`;
        await db
            .query(sql, rows[row])
            .then((result) => {
                return result.rows;
            })
            .catch((e) => {
                console.log("\nInsertion error!\n", e);
                console.log(sql, rows[row]);
            });
    }
    await db.end();
}

module.exports = {
    seedDatabase: seedDatabase,
    seedData: seedData,
};
