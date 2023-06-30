import { View } from '@novorender/webgl-api';

export const renderView = async (view: View, canvas: HTMLCanvasElement): Promise<void> => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      canvas.width = entry.contentRect.width;
      canvas.height = entry.contentRect.height;
      view.applySettings({
        display: { width: canvas.width, height: canvas.height },
      });
    }
  });

  resizeObserver.observe(canvas);

  const ctx = canvas.getContext("bitmaprenderer");
  // eslint-disable-next-line
  while (true) {

    const output = await view.render();
    {
      const image = await output.getImage();
      if (image) {
        ctx?.transferFromImageBitmap(image);
        image.close();
      }
    }
  }
};