/**
 *  @schema Mufasir
 *  type: object
 *  required:
 *      - mufasir_id
 *      - mufasir_name
 *      - death
 *  properties:
 *      mufasir_id:
 *          type: integer
 *          description: the id of the mufasir
 *          example: 1
 *      mufasir_name:
 *          type: string
 *          description: The name of the mufasir
 *          example: "Ibn Kathir"
 *      death:
 *          type: string
 *          description: The date that the mufasir passed away
 *          example: 1203 H
 */
class Mufasir {
    constructor(mufasirId, mufasirName, death) {
        this.mufasirId = mufasirId;
        this.mufasirName = mufasirName;
        this.death = death;
    }

    // Define any model methods here
}

module.exports = Mufasir;