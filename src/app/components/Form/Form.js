import React from 'react'
import PropTypes from 'prop-types'
import { Form as SemanticForm } from 'semantic-ui-react'

const Form = (props) => {
  return <SemanticForm {...props} />
}
Form.propTypes = {
  as: PropTypes.any,
  action: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string,
  error: PropTypes.bool,
  inverted: PropTypes.bool,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  reply: PropTypes.bool,
  size: PropTypes.string,
  success: PropTypes.bool,
  unstackable: PropTypes.bool,
  warning: PropTypes.bool,
  widths: 'equal'

}
export default Form
