import React from 'react'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  makeStyles,
} from '@material-ui/core'

const useStyle = makeStyles({
  panel: {
    boxShadow: 'none',
    backgroundColor: 'inherit',
    padding: 0,
    margin: 0,
    '&:before': {
      display: 'none',
    },
    '&.Mui-expanded, & .MuiAccordionSummary-root': {
      padding: 0,
      minHeight: 'inherit',
      margin: 0,
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
      padding: 0,
      cursor: 'initial',
      '&.Mui-expanded': {
        margin: 0,
        padding: 0,
      },
    },
  },
  details: {
    display: 'block',
    padding: 0,
  },
})

const HiddenContainerMemo = ({
  expanded,
  children,
  header,
  onClick,
  className,
  testid = 'hidddenContainer',
  ...props
}) => {
  const classes = useStyle(props)

  return (
    <Accordion
      square
      expanded={expanded}
      className={`${classes.panel} ${className}`}
      onClick={onClick}
      data-testid={testid}
    >
      <AccordionSummary
        style={!header ? { display: 'none' } : {}}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        {header && children[0]}
      </AccordionSummary>
      <AccordionDetails
        className={classes.details}
        data-testid="accordion-content"
      >
        {header ? children.slice(1) : children}
      </AccordionDetails>
    </Accordion>
  )
}

export const HiddenContainer = React.memo(HiddenContainerMemo)
