/**
 *  @schema Tafsir
 *  type: object
 *  required:
 *      -tafsir_id,
 *      -tafsir_text,
 *      -book,
 *      -verse_id,
 *      -visible
 *  properties:
 *      tafsir_id:
 *          type: integer
 *          description: to identify the tafsir from others
 *          example: 1
 *      tafsir_text:
 *          type: string
 *          description: content of verse tafsir
 *          example: "In the Name of Allah—the Most Compassionate, Most Merciful."
 *      book:
 *          type: integer
 *          description: unique identifier for book in which tafsir is
 *          example: 3
 *      verse_id:
 *          type: integer
 *          description: the verse id
 *          example: 23
 *      visible:
 *          type: integer
 *          description: flag to display information
 *
 *
 */
class Tafsir {
    constructor(tafsirId, tafsirText, book, verseId, visible) {
        this.tafsirId = tafsirId;
        this.tafsirText = tafsirText;
        this.book = book;
        this.verseId = verseId;
        this.visible = visible;
    }

    // Define any model methods here
}

module.exports = Tafsir;
