import { repoType } from 'docs-hub/utils/reusable-proptypes';

import './Repo.css';

const Repo = ( { repo } ) => (
  <li className="gpalab-docs-connected-repo-item">
    <strong>{ repo.title }</strong>
  </li>
);

Repo.propTypes = {
  repo: repoType,
};

export default Repo;
