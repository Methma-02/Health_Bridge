// backend/services/oneSignalService.js
const axios = require('axios');

const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;

const sendEmergencyAlertToHospitals = async (emergency, hospitals) => {
  try {
    // Create segments or tags for these specific hospitals
    const externalIds = hospitals.map(hospital => hospital.placeId);
    
    const payload = {
      app_id: ONE_SIGNAL_APP_ID,
      include_external_user_ids: externalIds,
      contents: { 
        en: "Emergency Alert: A mother needs urgent medical assistance!" 
      },
      headings: { 
        en: "EMERGENCY ALERT" 
      },
      data: {
        emergencyId: emergency._id.toString(),
        location: {
          latitude: emergency.location.coordinates[1],
          longitude: emergency.location.coordinates[0]
        },
        additionalInfo: emergency.additionalInfo
      },
      buttons: [
        { id: "accept", text: "Accept" },
        { id: "decline", text: "Decline" }
      ],
      priority: 10
    };

    const response = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ONE_SIGNAL_API_KEY}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending OneSignal notification:', error);
    throw error;
  }
};

const sendCancellationToHospitals = async (emergency, hospitals) => {
  try {
    const externalIds = hospitals.map(hospital => hospital.placeId);
    
    const payload = {
      app_id: ONE_SIGNAL_APP_ID,
      include_external_user_ids: externalIds,
      contents: { 
        en: "Emergency Alert Canceled: No further action needed." 
      },
      headings: { 
        en: "ALERT CANCELED" 
      },
      data: {
        emergencyId: emergency._id.toString(),
        status: 'canceled'
      },
      priority: 10
    };

    const response = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ONE_SIGNAL_API_KEY}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending OneSignal notification:', error);
    throw error;
  }
};

const sendAcceptNotificationToMother = async (emergency, hospital, userId) => {
  try {
    const payload = {
      app_id: ONE_SIGNAL_APP_ID,
      include_external_user_ids: [userId],
      contents: { 
        en: `${hospital.name} has accepted your emergency alert and is sending help.` 
      },
      headings: { 
        en: "HELP IS ON THE WAY" 
      },
      data: {
        emergencyId: emergency._id.toString(),
        hospitalId: hospital._id.toString(),
        hospitalName: hospital.name,
        hospitalLocation: {
          latitude: hospital.location.coordinates[1],
          longitude: hospital.location.coordinates[0]
        },
        status: 'accepted'
      },
      priority: 10
    };

    const response = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ONE_SIGNAL_API_KEY}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending OneSignal notification:', error);
    throw error;
  }
};

const sendNotificationToOtherHospitals = async (emergency, acceptingHospital, otherHospitals) => {
  try {
    const externalIds = otherHospitals
      .filter(hospital => hospital.placeId !== acceptingHospital.placeId)
      .map(hospital => hospital.placeId);
    
    if (externalIds.length === 0) return null;
    
    const payload = {
      app_id: ONE_SIGNAL_APP_ID,
      include_external_user_ids: externalIds,
      contents: { 
        en: `Emergency Alert has been accepted by ${acceptingHospital.name}. No further action needed.` 
      },
      headings: { 
        en: "ALERT ACCEPTED" 
      },
      data: {
        emergencyId: emergency._id.toString(),
        status: 'accepted by other'
      },
      priority: 10
    };

    const response = await axios.post(
      'https://onesignal.com/api/v1/notifications',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${ONE_SIGNAL_API_KEY}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error sending OneSignal notification:', error);
    throw error;
  }
};

module.exports = {
  sendEmergencyAlertToHospitals,
  sendCancellationToHospitals,
  sendAcceptNotificationToMother,
  sendNotificationToOtherHospitals
};