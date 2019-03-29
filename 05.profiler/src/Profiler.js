import React, { unstable_Profiler as UnstableProfiler } from 'react';

const logProfiler = (id, phase, actualTime, baseTime, startTime, commitTime) => {
  console.log({
    id,         // profiler id
    phase,      // mount | update
    actualTime, // actual render time of the subtree
    baseTime,   // sum of all the render duration in the subtree
    startTime,  // start of the render
    commitTime  // end of the render
  });
}

const Profiler = ({ id, children }) => (
  <UnstableProfiler
    id={id}
    onRender={logProfiler}
  >
    {children}
  </UnstableProfiler>
)

export default Profiler;