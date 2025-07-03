import { worker } from './browser';

export const startMockWorker = () => {
  if (typeof window !== 'undefined') {
    worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};
