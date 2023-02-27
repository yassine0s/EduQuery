const { execQuery } = require("./functions");

/**
 * Get a specific answer
 * Precondition:
 *  question id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 200
 *  Object: answer
 *
 */
exports.get_answers = async (req, res, next) => {
  let qry = await execQuery("SELECT * FROM `answers` WHERE questionid = ?;", [
    req.params.qid,
  ]);
  if (qry.error) return next(qry.error);
  if (qry.results.length == 0)
    return res.status(404).send({ message: "No answer is found" });

  return res.status(200).send(qry.results);
};

/**
 * add an answer.
 * Request body should contain: title, userid
 *
 *
 * Returns:
 *  status 201
 *  {message: message}
 *
 */

exports.create = async (req, res, next) => {
  if (!req.body.answer || !req.body.questionid || !req.body.userid) {
    return res
      .status(500)
      .send({ message: "answer details in the body are missing!" });
  } else {
    /* Inserting into the database */
    qry = await execQuery(
      "INSERT INTO `answers` (`answer`, `questionid`, `userid`,`accepted`) values (?,?,?,0);",
      [req.body.answer, req.body.questionid, req.body.userid]
    );
    if (qry.error) return next(qry.error);
    return res.status(201).send({ message: "Successfully added an answer" });
  }
};

/**
 * Delete a specific answer from the database
 * Precondition:
 *  answer id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 201
 *  Object: {answer}
 *
 */

exports.remove = async (req, res, next) => {
  let qry1 = await execQuery("SELECT * FROM `answers` WHERE id=?;", [
    req.params.id,
  ]);
  if (qry1.results.length == 0)
    return res.status(404).send({ message: "answer not found" });
  let qry = await execQuery("DELETE FROM `answers` WHERE id=?", [
    req.params.id,
  ]);
  await execQuery("ALTER TABLE `answers` AUTO_INCREMENT=1");

  if (qry.error) return next(qry.error);

  return res.status(200).send({ message: "answer deleted successfully" });
};

/**
 * Accept an answer.
 *  answer id must be given as a parameter to the request.
 *
 * Returns:
 *  status 201
 *  {message: message}
 *
 */

exports.accept = async (req, res, next) => {
  let qry1 = await execQuery("SELECT * FROM `answers` WHERE id=?;", [
    req.params.aid,
  ]);
  if (qry1.results.length == 0)
    return res.status(404).send({ message: "answer not found" });
    let qry = await execQuery(
    "UPDATE `answers` \
    SET `accepted` = NOT `accepted` \
    WHERE id = ?;",
    [req.params.aid]
  );
  if (qry.error) return next(qry.error);
  return res
    .status(200)
    .send({ message: "Successfully changed acceptance status" });
};
