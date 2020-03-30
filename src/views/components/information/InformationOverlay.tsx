import { Card, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { config } from '../../../env/config';
import { GitHubLatestReleaseAPIResponse } from '../../../store/information/types';

const useStyles = makeStyles((theme) => ({
  InformationOverlay: {
    width: '50%',
    padding: theme.spacing(2),
  },
}));

export function InformationOverlay() {
  const classes = useStyles();
  const [info, setInfo] = useState('Retriving release information...');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        config.information.gitHubAPILatestReleaseEndPoint
      );
      if (result.status === 200) {
        const releaseResponse = result.data as GitHubLatestReleaseAPIResponse;
        setInfo(releaseResponse.body);
      } else {
        setInfo(
          `Unabled to get release information :( (status: ${result.status})`
        );
      }
    };
    fetchData();
  }, []);

  return (
    <Card id="InformationOverlay" className={classes.InformationOverlay}>
      <ReactMarkdown source={info} />
    </Card>
  );
}
