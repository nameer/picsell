import { scaleLinear } from 'd3-scale';
import { arc } from 'd3-shape';

import { ARC_INNER_RADIUS, ARC_OUTER_RADIUS } from './constants';

// scale to map sustainability score to angle between 0 and 180
export const angleScale = scaleLinear()
  .domain([0, 1000])
  .range([-Math.PI / 2, Math.PI / 2])
  .clamp(true);

// arc generator for generating arcs of gauge chart
export const arcGenerator = arc().cornerRadius(2);

/**
 * Get coordinates for the marker blob
 *
 * @param angle score mapped as angle
 * @param offset [defaults to `ARC_OUTER_RADIUS - (ARC_OUTER_RADIUS - ARC_INNER_RADIUS) / 2`] - offset from center
 * @returns tuple - [cx,cy] to be used as props for <circle>
 */
export const getCoordsOnArc = (
  angle,
  offset = ARC_OUTER_RADIUS - (ARC_OUTER_RADIUS - ARC_INNER_RADIUS) / 2
) => [
  Math.cos(angle - Math.PI / 2) * offset,
  Math.sin(angle - Math.PI / 2) * offset
];
