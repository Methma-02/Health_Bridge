import OneSignal from 'react-onesignal';

// Create a module-level flag to track initialization
let isInitialized = false;

export const initializeOneSignal = async () => {
  try {
    // Check if we've already initialized using our module-level flag
    if (isInitialized) {
      console.log('OneSignal already initialized by our app');
      return;
    }
    
    // Also check OneSignal's own state
    if (window.OneSignal && (window.OneSignal.initialized || window.OneSignal._initCalled)) {
      console.log('OneSignal already initialized according to OneSignal');
      isInitialized = true;
      return;
    }
    
    // Set our flag before initialization to prevent race conditions
    isInitialized = true;
    
    await OneSignal.init({
      appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
      subdomainName: null, // Use the current domain
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
    
    // Only show the prompt if initialization was successful
    // await OneSignal.showSlideDownPrompt();
    await OneSignal.Slidedown.promptPush();
    console.log('OneSignal successfully initialized');
    
  } catch (error) {
    // Reset our flag if initialization failed to allow retry
    isInitialized = false;
    console.error('Failed to initialize OneSignal:', error);
  }
};

export const setUserExternalId = async (userId) => {
  try {
    // Ensure OneSignal is initialized before setting user ID
    if (!isInitialized) {
      console.warn('OneSignal not initialized. Initializing before setting user ID.');
      await initializeOneSignal();
    }
    
    // Prefer the modern API method if available
    if (window.OneSignal && typeof window.OneSignal.setExternalId === 'function') {
      await OneSignal.setExternalId(userId);
      console.log('Successfully set OneSignal external user ID:', userId);
      return;
    }
    
    // Fall back to older method if needed
    if (window.OneSignal && typeof window.OneSignal.setExternalUserId === 'function') {
      await OneSignal.setExternalUserId(userId);
      console.log('Successfully set OneSignal external user ID (legacy method):', userId);
      return;
    }
    
    console.error('No valid method available to set OneSignal user ID');
  } catch (error) {
    console.error('Failed to set OneSignal user ID:', error);
  }
};