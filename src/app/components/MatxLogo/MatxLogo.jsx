import React from 'react'
import useSettings from 'app/hooks/useSettings';

const MatxLogo = ({ className }) => {
    const { settings } = useSettings()

    return (
        <img style={{ width: 40 }} src="/assets/images/sliit-logo-01.png" alt="SLIIT" />
    )
}

export default MatxLogo
