import { useContext } from 'react';
import { MotionContext } from './motion-context';

export default function useMotion() {
  return useContext(MotionContext);
}
