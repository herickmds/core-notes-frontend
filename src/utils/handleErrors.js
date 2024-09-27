import { toast } from 'react-toastify';
import { messages } from '../constants/validationMessages';  

export function handleApiError(error) {
  console.error('API Error:', error);
  if (error.response) { 
    const status = error.response.status;

    switch (status) {
      case 400:
        toast.error(messages.apiErrors.badRequest);
        break;
      case 401:
        toast.error(messages.apiErrors.unauthorized);
        break;
      case 403:
        toast.error(messages.apiErrors.forbidden);
        break;
      case 404:
        toast.error(messages.apiErrors.notFound);
        break;
      case 500:
        toast.error(messages.apiErrors.internalServerError);
        break;
      default:
        toast.error(`Erro ${status}: ${error.response.statusText}`);
    }
  } else if (error.request) { 
    toast.error(messages.apiErrors.networkError);
  } else { 
    toast.error(messages.apiErrors.unknownError);
  }
}
