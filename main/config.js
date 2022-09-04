const fleetName = process.env.BALENA_FLEET_NAME || 'OFFICE';
const state = process.env.STATE || 0;

const config = {
  state: state,
  fleetName: fleetName,
};

module.exports = { config };
