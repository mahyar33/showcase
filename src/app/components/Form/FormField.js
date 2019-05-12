import React from 'react'
import PropTypes from 'prop-types'
import { Form as SemanticForm } from 'semantic-ui-react'

const FormField = (props) => {
  return <SemanticForm.Field {...props} />
}
FormField.propTypes = {
  as: PropTypes.any,
  children: PropTypes.element,
  className: PropTypes.string,
  content: PropTypes.element,
  control: PropTypes.any,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  inline: PropTypes.bool,
  label: PropTypes.any,
  required: PropTypes.any,
  type: PropTypes.string,
  width: PropTypes.oneOfType(PropTypes.string, PropTypes.number)

}
export default FormField
