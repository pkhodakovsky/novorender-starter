import { API as WebglAPI, createAPI as createWebglAPI, View } from '@novorender/webgl-api';
import { API as DataAPI, SceneData, SceneLoadFail } from '@novorender/data-js-api';

export const loadScene = async (dataApi: DataAPI, canvas: HTMLCanvasElement): Promise<View | undefined> => {
  try {
    const sceneData: SceneData = await dataApi
      .loadScene(import.meta.env.VITE_SCENE_ID as string)
      .then((res: SceneData | SceneLoadFail) => {
        if ("error" in res) {
          throw res;
        }

        return res;
      });

    const { url, db, settings, camera: cameraParams } = sceneData;

    const api: WebglAPI = createWebglAPI();
    const scene = await api.loadScene(url, db);
    const view = await api.createView(settings, canvas);

    const neutral = api.createHighlight({
      kind: "neutral",
    });

    view.applySettings({
        quality: { resolution: { value: 1 } },
        objectHighlights: [neutral]
      });

    const camera = cameraParams ?? ({ kind: "flight" });

    view.camera.controller = api.createCameraController({
      ...camera,
      kind: 'flight',
    }, canvas);

    view.scene = scene;

    return view;
  } catch (e) {
    console.warn(e);
  }
};