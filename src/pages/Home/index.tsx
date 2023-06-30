import { useEffect, useRef, useState} from 'react';
import { ReadonlyVec3, ReadonlyQuat } from 'gl-matrix'
import { Canvas } from '../../components/Canvas';
import { Form } from '../../components/Form';
import { ButtonPosition } from '../../components/ButtonPosition';
import { useScene } from '../../hooks/useCanvas';
import { renderView, isolateObjects } from '../../helpers';

type Positions = {
  [key: string]: {
    position: ReadonlyVec3,
    rotation: ReadonlyQuat,
  },
}

export const Home = () => {
  const ref = useRef<null | HTMLCanvasElement>(null);
  const [positions, setPositions] = useState<Positions>({});
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const view = useScene(ref);

  useEffect(() => {
    if (view && ref.current) {
      void renderView(view, ref.current)
    }
  }, [view]);

  const handleSavePosition = (number: string) => {
    if (view) {
      const position: Float32Array = new Float32Array([...view.camera.position]);
      const rotation: Float32Array = new Float32Array([...view.camera.rotation]);
      setPositions((prevState) => ({
        ...prevState,
        [number]: {
          position,
          rotation,
        }
      }));
    }
  }

  const handleMoveToPosition = (number: string) => {
    if (positions[number] && view) {
      view.camera.controller.moveTo(positions[number].position, positions[number].rotation);
    }
  }

  const handleSearch = async (value: string) => {
    if (!view?.scene) {
      return;
    }

    if (abortController) {
      abortController.abort();
    }

    const controller: AbortController = new AbortController();
    setAbortController(() => controller);

    const signal = controller.signal;
    const iterator = view.scene.search({ searchPattern: value }, signal);
    const result: number[] = [];

    for await (const object of iterator) {
      result.push(object.id);
    }

    isolateObjects(view.scene, result);
  }

  return <div className='home'>
    <div className="button-container">
      <ButtonPosition number="1" handleSavePosition={handleSavePosition} handleMoveToPosition={handleMoveToPosition} />
      <ButtonPosition number="2" handleSavePosition={handleSavePosition} handleMoveToPosition={handleMoveToPosition} />
      <ButtonPosition number="3" handleSavePosition={handleSavePosition} handleMoveToPosition={handleMoveToPosition} />
      <Form handleSearch={handleSearch} />
    </div>
    <Canvas ref={ref} />
  </div>
}