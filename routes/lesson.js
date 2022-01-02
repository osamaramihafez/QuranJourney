const router = require("express").Router();
const l = require("../model/lesson");
const c = require("./routingConstants");

/*
 * @api [get] /lessons
 *  summary: "Fetch all lessons." 
 *  tags:
 *    - Lessons
 *  responses:
 *    200:
 *      description: A list of lessons.
 *      response:
 *        - $ref: '#/components/schemas/AllLessons'
 *    404:
 *      description: No lessons found.
 *
 */
router.get("/lessons", async (request, response) => {
    await l.getLessons(request.body).then(async function (result) {
        return c.simpleResponse(result, response);
    });
});

/*
 * @api [get] /lesson
 *  summary: "Fetch a lesson by ID."
 *  tags:
 *    - Lessons
 *  parameters:
 *        - id: integer
 *  responses:
 *    200:
 *      description: A single lesson.
 *      response:
 *        - $ref: '#/components/schemas/lesson'
 *    404:
 *      description: No lessons found.
 *
 */
router.post("/lesson", async (request, response) => {
  await l.createLesson(request.body).then(async function (result) {
      return c.simpleResponse(result, response);
  });
});

module.exports = router;
