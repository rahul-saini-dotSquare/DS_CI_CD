import APIManager from '@api/APIManager';
import Endpoints from '@api/Endpoints';
import { getErrorMessage } from '@api/errorHandler';
import { HomeItem } from '@api/models/response';
import toast from '@lib/toast';

export default class HomeService {
  static getData = async (): Promise<HomeItem[]> => {
    try {
      const response = await APIManager.makeRequest<HomeItem[]>({
        url: Endpoints.home,
        method: 'GET',
      });
      return response.data ?? [];
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };
}
