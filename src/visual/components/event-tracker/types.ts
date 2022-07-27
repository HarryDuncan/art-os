import { KeypointPosition } from 'visual/hooks/use-pose-net/types';
import { POSENET_SWIPE_EVENT } from './consts';

export type PoseNetAdvancedEvent = typeof POSENET_SWIPE_EVENT;
export type AdvancedEventKey = keyof PoseNetAdvancedEvent;

export type Step = { position: KeypointPosition; timeStamp: number };
