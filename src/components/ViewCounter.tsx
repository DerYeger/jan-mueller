import PageViews from '@yeger/page-views'
import type { FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'

const ViewCounter: FunctionalComponent = () => {
  const [pageViews, setPageViews] = useState<number>(0)

  useEffect(() => {
    PageViews.submitView()
      .then(() => PageViews.getViews())
      .then(setPageViews)
  }, [])

  return <span className="text-lighter">{pageViews} views</span>
}

export default ViewCounter
