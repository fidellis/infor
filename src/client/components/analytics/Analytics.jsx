import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '~/config';

const isDev = process.env.NODE_ENV !== 'production';

const ANALYTICS_API = isDev ? `${config.intranetUrl}/api/analytics` : `${config.intranetUrl}/intranet/api/analytics`;

function sendInfo() {
  const url = location.href;
  const resolucao = `${window.screen.availHeight} x ${window.screen.availWidth}`;
  const data = { url, resolucao };

  axios.post(`${ANALYTICS_API}`, data, { withCredentials: true });
}

class Analytics extends Component {
  componentDidMount() {
    const { history } = this.props;

    if (!history || !history.listen) throw new Error('History invalid.');

    sendInfo();

    history.listen(() => sendInfo());
  }

  render() {
    return <div />;
  }
}

Analytics.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Analytics;
