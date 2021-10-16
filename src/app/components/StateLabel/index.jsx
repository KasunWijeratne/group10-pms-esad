import { makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    root: ({ type }) => ({
        padding: theme.spacing(0, 1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 80,
        height: 20,
        textTransform: 'capitalize',
        borderRadius: 10,
        fontSize: '0.8rem',
        color: '#fff',
        background:
            type === 'high' || type === 'canceled'
                ? palette.error.main
                : type === 'medium' || type === 'approved'
                ? palette.success.main
                : type === 'completed'
                ? palette.text.disabled
                : palette.info.main,
    }),
}))

const StateLabel = ({ children, type }) => {
    const classes = useStyles({ type })

    return <span className={clsx(classes.root)}>{children}</span>
}

export default StateLabel
