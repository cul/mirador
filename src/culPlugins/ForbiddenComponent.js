import PropTypes from 'prop-types';

/** */
const ForbiddenComponent = ({ id = null }) => (
  <div className="alert alert-warning w-100 d-flex">
    <h3 className="my-auto mx-auto h6">
      {`you do not currently have access to ${id}`}
    </h3>
  </div>
);

ForbiddenComponent.propTypes = {
  id: PropTypes.string,
};

export default ForbiddenComponent;
