// frontend/src/services/notificationService.js
import OneSignal from 'react-onesignal';

export const initializeOneSignal = async () => {
  try {
    await OneSignal.init({
      appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
      promptOptions: {
        slidedown: {
          prompts: [
            {
              type: "push",
              autoPrompt: true,
              text: {
                actionMessage: "HealthBridge would like to send you emergency notifications",
                acceptButton: "Allow",
                cancelButton: "Deny"
              }
            }
          ]
        }
      }
    });
    await OneSignal.showSlidedownPrompt();
  } catch (error) {
    console.error('Failed to initialize OneSignal:', error);
  }
};

export const setUserExternalId = async (userId) => {
  try {
    await OneSignal.setExternalUserId(userId);
  } catch (error) {
    console.error('Failed to set OneSignal user ID:', error);
  }
};