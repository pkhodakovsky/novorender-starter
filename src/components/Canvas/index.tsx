import { forwardRef } from 'react';

export const Canvas = forwardRef<HTMLCanvasElement>((_props, ref) => {
  return <canvas style={{ height: "100%", width: "100%" }} ref={ref} />
});