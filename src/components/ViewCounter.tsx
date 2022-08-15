import PageViews from '@yeger/page-views'
import { useEffect, useState } from 'react'

const ViewCounter = () => {
  const [pageViews, setPageViews] = useState<number>(0)

  useEffect(() => {
    PageViews.submitView()
      .then(() => PageViews.getViews())
      .then(setPageViews)
  }, [])

  return <span className="text-lighter">{pageViews} views</span>
}

export default ViewCounter
