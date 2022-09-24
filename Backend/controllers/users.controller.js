 const get_all = (req, res) => {
    res.status(200).json({message:'all users'})
};
module.exports = get_all;