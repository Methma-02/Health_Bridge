// backend/services/oneSignalService.js
const axios = require('axios');

const ONE_SIGNAL_APP_ID = process.env.ONE_SIGNAL_APP_ID;
const ONE_SIGNAL_API_KEY = process.env.ONE_SIGNAL_API_KEY;

const sendEmergencyAlertToHospitals = async (emergency, hospitals) => {
  try {
    const externalIds = hospitals.map(hospital => hospital.placeId);
    
    // Create the payload that would be sent
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

    // Log the notification information instead of sending
    console.log("[SIMULATION] Emergency alert would be sent to hospitals:");
    console.log("- Hospitals to notify:", externalIds.join(", "));
    console.log("- Emergency ID:", emergency._id.toString());
    console.log("- Additional Info:", emergency.additionalInfo);
    
    
    /*
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
    */
    
    // Return simulated success response
    return { 
      id: `simulated-notification-${Date.now()}`,
      recipients: hospitals.length,
      success: true
    };
  } catch (error) {
    console.error('Error sending OneSignal notification:', error);
    throw error;
  }
};

const sendCancellationToHospitals = async (emergency, hospitals) => {
  try {
    const externalIds = hospitals.map(hospital => hospital.placeId);
    
    // Log the cancellation notification
    console.log("[SIMULATION] Cancellation alert would be sent to hospitals:");
    console.log("- Hospitals to notify:", externalIds.join(", "));
    console.log("- Emergency ID:", emergency._id.toString());
    
    // Return simulated success response
    return { 
      id: `simulated-cancel-notification-${Date.now()}`,
      recipients: hospitals.length,
      success: true
    };
  } catch (error) {
    console.error('Error sending OneSignal notification:', error);
    throw error;
  }
};

const sendAcceptNotificationToMother = async (emergency, hospital, userId) => {
  try {
    // Log the mother notification
    console.log("[SIMULATION] Acceptance notification would be sent to mother:");
    console.log(`- Hospital ${hospital.name} has accepted the emergency`);
    console.log("- User ID:", userId);
    console.log("- Emergency ID:", emergency._id.toString());
    
    // Return simulated success response
    return { 
      id: `simulated-mother-notification-${Date.now()}`,
      recipients: 1,
      success: true
    };
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
    
    if (externalIds.length === 0) {
      console.log("[SIMULATION] No other hospitals to notify about acceptance");
      return null;
    }
    
    // Log the other hospitals notification
    console.log("[SIMULATION] Notification to other hospitals about acceptance:");
    console.log(`- Accepting Hospital: ${acceptingHospital.name}`);
    console.log("- Other Hospitals to notify:", externalIds.join(", "));
    
    // Return simulated success response
    return { 
      id: `simulated-others-notification-${Date.now()}`,
      recipients: externalIds.length,
      success: true
    };
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