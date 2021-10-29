import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(({ palette }) => ({
  root: {
    '& .Mui-selected': {
      color: palette.primary.main,
      background: 'rgba(var(--primary), 0.15)'
    },
  }
}));

const RequisitionFilters = ({
  activeFilter,
}) => {
  const [alignment, setAlignment] = React.useState('all')
  const styles = useStyles();

  const handleChange = (event, newAlignment) => {
      setAlignment(newAlignment)
      activeFilter(newAlignment)
  }

  return (
      <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleChange}
          className={styles.root}
      >
          <ToggleButton value="all">All Orders</ToggleButton>
          <ToggleButton value="pending">Pending</ToggleButton>
          <ToggleButton value="approved">Approved</ToggleButton>
          <ToggleButton value="declines">Declined</ToggleButton>
      </ToggleButtonGroup>
  )
}

export default RequisitionFilters
