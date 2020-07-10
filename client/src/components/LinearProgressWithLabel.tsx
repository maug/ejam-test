import React from 'react';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number, labelLeft: string }) {
  const {labelLeft, ...lpProps} = props;
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <Typography variant="body2" color="textSecondary">{labelLeft}&nbsp;&nbsp;</Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...lpProps} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          lpProps.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
