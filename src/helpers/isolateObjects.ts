import { Scene } from '@novorender/webgl-api';

export const isolateObjects = (scene: Scene, ids: number[]): void => {
  if (ids.length) {
    scene.objectHighlighter.objectHighlightIndices.fill(255);
    ids.forEach((id) => (scene.objectHighlighter.objectHighlightIndices[id] = 0));
  } else {
    scene.objectHighlighter.objectHighlightIndices.fill(0);
  }

  void scene.objectHighlighter.commit();
}