const { execQuery } = require("./functions");

/**
 * Get all questions data
 * Returns:
 *  status: 200
 *  Object: [question]
 *
 */
exports.get_all = async (req, res, next) => {
  console.log("[questions/get_all]: getting all questions : ");
  let qry = await execQuery("SELECT * FROM `questions`;", []);
  if (qry.error) return next(qry.error);
  return res.status(200).send(qry.results);
};

/**
 * Get a question related to the logged in  profile
 * Precondition:
 *  user id must be given as a parameter to the request.
 *
 * Returns:
 *  status: 200
 *  Object: question
 *
 */
exports.get_own = async (req, res, next) => {
  console.log("[questions/get_own]: getting user questions : ");
  let qry = await execQuery("SELECT * FROM `questions` WHERE id=?;", [
    req.params.uid,
  ]);
  if (qry.error) return next(qry.error);
  return res.status(200).send(qry.results);
};

/**
 * Get a question depending on a specific filter
 * Precondition:
 *
 *
 * Returns:
 *  status: 200
 *  Object: question
 *
 */
exports.get_by_category = async (req, res, next) => {
  const category = req.query.category;
  const subjectid = req.query.subjectid;

  console.log("category is : ", category);
  console.log("subjectid is : ", subjectid);

  if (category == "adminstration") {
    let qry = await execQuery("SELECT * FROM `questions` WHERE category=?;", [
      category,subjectid
    ]);
    if (qry.error) return next(qry.error);
    return res.status(200).send(qry.results);
  }
  else if (category == "educational") {
    let qry = await execQuery("SELECT * FROM `questions` inner JOIN `subjects` ON questions.subjectid = subjects.id =? WHERE category=?;", [
      subjectid,category
    ]);

    if (qry.error) return next(qry.error);
    return res.status(200).send(qry.results);
  }
};
