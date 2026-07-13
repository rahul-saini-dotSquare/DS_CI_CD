import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

type NetworkListener = (online: boolean) => void;

let online = true;
const listeners = new Set<NetworkListener>();

const resolveOnline = (state: NetInfoState) =>
  state.isConnected === true && state.isInternetReachable !== false;

export const initNetwork = () => {
  return NetInfo.addEventListener(state => {
    const next = resolveOnline(state);
    if (next !== online) {
      online = next;
      listeners.forEach(listener => listener(online));
    }
  });
};

export const getIsOnline = () => online;

export const subscribeNetwork = (listener: NetworkListener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
