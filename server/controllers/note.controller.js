exports.getNotes = async (req, res) => {
  res.json({ message: 'Get notes' });
};

exports.addNote = async (req, res) => {
  res.json({ message: 'Add note' });
};

exports.deleteNote = async (req, res) => {
  res.json({ message: 'Delete note' });
};
