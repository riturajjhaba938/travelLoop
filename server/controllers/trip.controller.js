exports.getAllTrips = async (req, res) => {
  res.json({ message: 'Get all trips' });
};

exports.createTrip = async (req, res) => {
  res.json({ message: 'Create trip' });
};

exports.getTripById = async (req, res) => {
  res.json({ message: 'Get trip by id' });
};

exports.updateTrip = async (req, res) => {
  res.json({ message: 'Update trip' });
};

exports.deleteTrip = async (req, res) => {
  res.json({ message: 'Delete trip' });
};
