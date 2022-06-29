import { sendExtensionOneTimeMessage } from '../../services/extension';
import { UpdatePayload } from '../../typings/webpage-message';
import { useEffect, useState } from 'react';

export function useGetData() {
  const [data, setData] = useState<Record<string, UpdatePayload['data']>>({});

  const getData = () => {
    sendExtensionOneTimeMessage(
      chrome.devtools.inspectedWindow.tabId,
      'get-devtool-data',
      (response) => {
        setData(response.data);
      },
    );
  };

  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, 100);
    return () => clearInterval(intervalId);
  }, []);

  return data;
}
