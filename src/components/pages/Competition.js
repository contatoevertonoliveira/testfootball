import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTeams, fetchCompetition} from '../../actions';
import Fixtures from './Competition/Fixtures.js';
import Standings from './Competition/Standings.js';
import {
  withRouter,
  Route,
  Link,
} from 'react-router-dom';
import League from '../ui/League';
import {Loader, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Competition extends Component {
  componentDidMount() {
    const {match: {params}} = this.props;
    this.props
      .fetchCompetition(params.id)
      .then(this.props.fetchTeams(params.id));
  }

  render() {
    const {competition, loading} = this.props;

    if (loading) {
      return <Loader size="large">Loading...</Loader>;
    }
    const url = this.props.match.url;
    return (
      <div>
        <League key={`league-${competition.id}`} league={competition} />
        <Button.Group size="large" widths="3">
          <Button>
            <Link to={`${url}/fixtures`}>Fixtures</Link>
          </Button>
          <Button>
            <Link to={`${url}/standings`}>Standings</Link>
          </Button>
          <Button>
            <Link to={`${url}/teams`}>Teams</Link>
          </Button>
        </Button.Group>
        <div>
          { /* <Fixtures competition={competition} /> */ }
          <Standings competitions={competition} />
          <Route path="/competition/:id/fixtures" component={Fixtures} />
          <Route path="fixtures" component={Fixtures} />
          <Route path="standings" exact component={Standings} />
          <Route path={`${url}/teams`} exact component={Fixtures} />
        </div>
      </div>
    );
  }
}

Competition.propTypes = {
  loading: PropTypes.bool.isRequired,
  competition: PropTypes.object.isRequired,
  teams: PropTypes.array.isRequired,
  fetchTeams: PropTypes.func.isRequired,
  fetchCompetition: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.competition.loading,
    competition: state.competition.competition,
    teams: state.teams.teams,
  };
}

export default withRouter(
  connect(mapStateToProps, {fetchTeams, fetchCompetition})(Competition),
);
