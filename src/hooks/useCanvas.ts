import {RefObject, useEffect, useMemo, useState} from 'react';
import { View } from '@novorender/webgl-api';
import { API as DataAPI, createAPI as createDataAPI } from '@novorender/data-js-api';
import { loadScene } from '../helpers';

export const useScene = (ref: RefObject<HTMLCanvasElement> | null): View | null => {
  const [sceneView, setSceneView] = useState<null | View>(null)

  const dataApi: DataAPI = useMemo(() => createDataAPI({
    serviceUrl: import.meta.env.VITE_SERVICE_URL as string,
  }), []);

  useEffect(() => {
    if (ref?.current) {
      const canvas = ref.current

      void loadScene(dataApi, canvas).then((view: View | undefined) => {
        if (view) {
          setSceneView(view)
        }
      });
    }
  }, [ref, dataApi]);

  return sceneView || null;
}