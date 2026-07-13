import { useEffect, useState } from 'react';
import { getIsOnline, subscribeNetwork } from '@lib/network';

const useIsOnline = () => {
  const [online, setOnline] = useState(getIsOnline());
  useEffect(() => subscribeNetwork(setOnline), []);
  return online;
};

export default useIsOnline;
