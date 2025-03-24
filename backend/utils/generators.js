// utils/generators.js
function generateRegistrationId(role) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const rolePrefix = {
      mother: 'MTH',
      physician: 'PHY',
      nurse: 'NRS',
      midwife: 'MWF',
      phm: 'PHM'
    }[role] || 'USR';
    
    return `${rolePrefix}${timestamp}${random}`;
  }
  
  module.exports = { generateRegistrationId };