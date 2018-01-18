import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../../ui/Loader';
import { navigateToPage } from '../../../actions';
import './Teams.scss';

class Teams extends Component {
  componentDidMount() {
    this.props.navigateToPage('teams');
  }

  render() {
    const { teams, loading } = this.props;

    if (loading) {
      return <Loader/>;
    }

    const rows = teams.map(t => {
      const code = t.code !== null ? t.code : t.name;
      const teamId = t._links.self.href.match(/(\d+$)/)[0];

      return (
        <li className="card" key={`team-${code}`}>
          <div className="card-team">
            <div className="card-logo">
              <div className="team-crest-container">
                <img
                  className="team-crest"
                  alt={`Crest of ${t.name}`}
                  src={t.crestUrl}
                />
              </div>
            </div>
            <div className="card-team-body">
              <h2>{t.name}</h2>
            </div>
            <Link
              className="team-roster-link animated-underline"
              to={`/teams/${teamId}/roster`}>
              View Roster
            </Link>
          </div>
        </li>
      );
    });

    return (
      <section style={{ color: '#333' }}>
        <h2 className="page-title">Teams</h2>
        <ul className="competition-team-list">{rows}</ul>
      </section>
    );
  }
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired
};
export default connect(
  state => ({
    teams: state.teams.teams,
    loading: state.teams.loading
  }),
  { navigateToPage }
)(Teams);
