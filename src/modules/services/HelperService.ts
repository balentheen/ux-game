import Expo from 'expo';

import { Logger } from './Logger';

export abstract class HelperService {
  private static expo = Expo;

  public static async checkForUpdates(): Promise<void> {
    try {
      const update = await HelperService.expo.Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await HelperService.expo.Updates.fetchUpdateAsync();
        /** ... notify user of update ... */
        HelperService.expo.Updates.reloadFromCache();
      }
    } catch (e) {
      /* istanbul ignore next line */
      Logger.error('Error checking for updates', e);
    }
  }
}
