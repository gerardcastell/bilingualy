import React from 'react'

import { Card } from 'framework7-react'

const DashboardSckeleton = () => {
    return (
        <>{[1, 2, 3].map(item =>
            <Card
                key={item}
                className="skeleton-text skeleton-effect-blink skeleton-dashboard"
                title="Card Header"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis et massa ac interdum. Cras consequat felis at consequat hendrerit."
            ></Card>
        )}
        </>
    )
}

export default DashboardSckeleton
