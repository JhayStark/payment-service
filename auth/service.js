const BackendService = require('./model');

const addNewBackendService = async data => {
  return await BackendService.create(data);
};

const getBackendServices = async () => {
  return await BackendService.find();
};

const getBackendServiceById = async id => {
  return await BackendService.findById(id);
};

const updateBackendService = async (id, data) => {
  return await BackendService.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  addNewBackendService,
  getBackendServices,
  getBackendServiceById,
  updateBackendService,
};
