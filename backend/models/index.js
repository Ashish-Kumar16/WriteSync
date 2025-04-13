const User = require("./user");
const Note = require("./note");

User.hasMany(Note, { onDelete: "CASCADE" });
Note.belongsTo(User);

module.exports = {
  User,
  Note,
};
