const { parseHttpResponse } = require("selenium-webdriver/http");
const utils = require("./utils");

/*MAIN REQUEST HANDLER*/
async function getAllVerseInfo(data) {
    /*NOTE 
    each method returns this => { data: d, success: pass, error: msg, ecode: code }
    this method returns this =>
    {data: {reflections: r, tafsir: t, wordexpl: we }, success: pass, error: msg, ecode:code}
    */
    let verseInfo = {}
    let failed = false
    await getVerseReflections(data).then(async function (result) {
        if (!result.success) {
            verseInfo.success = result.success
            verseInfo.error = result.error
            verseInfo.ecode = result.ecode
            failed = true
        }
        verseInfo = { data: { reflections: result.data } };
    })

    await getVerseTafsir(data).then(async function (result) {
        if (!result.success) {
            verseInfo.success = result.success
            verseInfo.error = result.error
            verseInfo.ecode = result.ecode
            failed = true
        }
        verseInfo.data.tafsirs = result.data
    })

    await getVerseRootWords(data).then(async function (result) {
        if (!result.success) {
            verseInfo.success = result.success
            verseInfo.error = result.error
            verseInfo.ecode = result.ecode
            failed = true
        }
        verseInfo.data.roots = result.data
    })

    if (!failed) {
        verseInfo.success = true
        verseInfo.error = "Successfully fetched complete verse info"
        verseInfo.ecode = 0
    }
    return verseInfo;
}

async function getVerseReflections(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Reflection WHERE verse_id=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse reflections with verse id ${data.verse_id}.`,
        })
    );
}

async function getVerseTafsir(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Tafsir JOIN Verse ON Verse.verse_index=Tafsir.verse_id WHERE Tafsir.verse_id=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse tafsirs with verse id ${data.verse_id}.`,
        })
    );
}

async function getVerseWordExpls(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM VerseWord WHERE verse_id=$1";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse words with verse id ${data.verse_id}.`,
        })
    );
}

async function getVerseRootWords(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM (SELECT * FROM (SELECT * FROM VerseWord as vw JOIN ArabicWord as aw ON aw.word_id = vw.word_id WHERE vw.verse_id = $1) as vwa JOIN RootWord ON RootWord.root_id = vwa.root_id) as vwar JOIN RootMeaning ON RootMeaning.root_word = vwar.root_word";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verse words and roots with verse id ${data.verse_id}.`,
        })
    );
}

module.exports = {
    getAllVerseInfo: getAllVerseInfo,
    getVerseReflections: getVerseReflections,
    getVerseTafsir: getVerseTafsir,
    getVerseWordExpls: getVerseWordExpls,
    getVerseRootWords: getVerseRootWords,
}
