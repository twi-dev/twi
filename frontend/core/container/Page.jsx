import React, {PropTypes} from "react"
import {observer, inject} from "mobx-react"
import compose from "lodash/fp/compose"

import UIStore from "frontend/core/store/UIStore"

import DocumentTitle from "react-document-title"

const mapStoresToProps = ({ui}) => ({ui})

const Page = ({ui: {title}, children}) => (
  <DocumentTitle {...{title}}>
    <div className="page-container">
      {children}
    </div>
  </DocumentTitle>
)

Page.propTypes = {
  ui: PropTypes.instanceOf(UIStore).isRequired,
  children: PropTypes.element.isRequired
}

export default compose(inject(mapStoresToProps), observer)(Page)
