/* eslint-disable react/no-array-index-key */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  MenuItem,
  Paper,
  TextField,
  withStyles
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography/Typography';
import IconButton from '@material-ui/core/IconButton/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 4,
    padding: theme.spacing.unit * 4,
    position: 'relative'
  },
  addSite: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    },
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  heuristicWrapper: {
    position: 'relative',
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 8
  },
  addHeuristic: {
    position: 'absolute',
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    },
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2
  },
  removeSite: {
    position: 'absolute',
    top: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2
  },
  heuristicItem: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  heuristicKey: {
    width: '30%',
    marginRight: theme.spacing.unit * 2
  },
  heuristicValue: {
    width: '30%',
    marginRight: theme.spacing.unit * 2
  },
  removeHeuristic: {}
});

class ConfigForm extends Component {
  state = {
    initialSite: {
      url: '',
      location: {
        latitude: '',
        longitude: ''
      },
      crawler: '',
      overwriteHeuristics: [],
      passHeuristicsCondition: ''
    }
  };

  static propTypes = {
    classes: PropTypes.shape().isRequired,
    data: PropTypes.shape().isRequired,
    onChange: PropTypes.func.isRequired
  };

  convertFrom = baseUrls => {
    const sites = baseUrls.map(site => ({
      url: site.url || '',
      location: site.location || {
        latitude: '',
        longitude: ''
      },
      crawler: site.crawler || '',
      overwriteHeuristics: site.overwrite_heuristics
        ? [
            ...Object.entries(site.overwrite_heuristics).map(
              ([name, value]) => ({
                name,
                value
              })
            )
          ]
        : [],
      passHeuristicsCondition: site.pass_heuristics_condition || ''
    }));

    return sites;
  };

  convertTo = sites => {
    const baseUrls = sites.map(site => {
      let overwriteHeuristics = {};

      site.overwriteHeuristics.forEach(heuristic => {
        overwriteHeuristics = {
          ...overwriteHeuristics,
          [heuristic.name]: heuristic.value
        };
      });

      return {
        url: site.url,
        location: site.location,
        crawler: site.crawler || undefined,
        overwrite_heuristics: Object.keys(overwriteHeuristics).length
          ? overwriteHeuristics
          : undefined,
        pass_heuristics_condition: site.passHeuristicsCondition || undefined
      };
    });

    return JSON.parse(
      JSON.stringify({
        base_urls: baseUrls
      })
    );
  };

  handleChange = (sites, index, setCallback) => event => {
    const { onChange } = this.props;
    const { target } = event;

    const value = target.type === 'checkbox' ? target.checked : target.value;

    const newSites = sites.map((site, i) => {
      if (i !== index) return site;

      return setCallback(site, value);
    });

    onChange(this.convertTo(newSites));
  };

  addOverwriteHeuristics = (sites, index) => () => {
    const { onChange } = this.props;

    const newSites = sites.map((site, i) => {
      if (i !== index) return site;

      return {
        ...site,
        overwriteHeuristics: [
          ...site.overwriteHeuristics,
          { name: '', value: '' }
        ]
      };
    });

    onChange(this.convertTo(newSites));
  };

  removeOverwriteHeuristics = (sites, index, removeIndex) => () => {
    const { onChange } = this.props;

    const newSites = sites.map((site, i) => {
      if (i !== index) return site;

      return {
        ...site,
        overwriteHeuristics: [
          ...site.overwriteHeuristics.slice(0, removeIndex),
          ...site.overwriteHeuristics.slice(removeIndex + 1)
        ]
      };
    });

    onChange(this.convertTo(newSites));
  };

  addSite = sites => () => {
    const { initialSite } = this.state;
    const { onChange } = this.props;

    onChange(this.convertTo([...sites, initialSite]));
  };

  removeSite = (sites, removeIndex) => () => {
    const { onChange } = this.props;

    onChange(
      this.convertTo([
        ...sites.slice(0, removeIndex),
        ...sites.slice(removeIndex + 1)
      ])
    );
  };

  render() {
    const { classes, data } = this.props;
    const sites = this.convertFrom(data.base_urls);

    return (
      <form>
        {sites.map((site, i) => (
          <Paper className={classes.root} key={i}>
            <TextField
              label="Url"
              value={site.url}
              onChange={this.handleChange(sites, i, (site, value) => ({
                ...site,
                url: value
              }))}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Latitude"
              value={site.location.latitude}
              onChange={this.handleChange(sites, i, (site, value) => ({
                ...site,
                location: {
                  ...site.location,
                  latitude: value
                }
              }))}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Longitude"
              value={site.location.longitude}
              onChange={this.handleChange(sites, i, (site, value) => ({
                ...site,
                location: {
                  ...site.location,
                  longitude: value
                }
              }))}
              margin="normal"
              fullWidth
            />
            <TextField
              select
              label="Crawler"
              value={site.crawler}
              onChange={this.handleChange(sites, i, (site, value) => ({
                ...site,
                crawler: value
              }))}
              margin="normal"
              fullWidth
            >
              {[
                'RssCrawler',
                'SitemapCrawler',
                'RecursiveCrawler',
                'RecursiveSitemapCrawler'
              ].map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <div className={classes.heuristicWrapper}>
              <Typography variant="subtitle2">Overwrite Heuristics</Typography>
              {site.overwriteHeuristics.map(({ name, value }, j) => (
                <div key={j} className={classes.heuristicItem}>
                  <TextField
                    label="Name"
                    value={name}
                    className={classes.heuristicKey}
                    onChange={this.handleChange(sites, i, (site, value) => {
                      const newOverwriteHeuristics = site.overwriteHeuristics.map(
                        (heuristic, k) => {
                          if (j !== k) return heuristic;

                          return { ...heuristic, name: value };
                        }
                      );

                      return {
                        ...site,
                        overwriteHeuristics: newOverwriteHeuristics
                      };
                    })}
                    margin="normal"
                  />
                  <TextField
                    label="Value"
                    value={value}
                    onChange={this.handleChange(sites, i, (site, value) => {
                      const newOverwriteHeuristics = site.overwriteHeuristics.map(
                        (heuristic, k) => {
                          if (j !== k) return heuristic;

                          return { ...heuristic, value };
                        }
                      );

                      return {
                        ...site,
                        overwriteHeuristics: newOverwriteHeuristics
                      };
                    })}
                    margin="normal"
                  />
                  <IconButton
                    color="secondary"
                    aria-label="Remove heuristic"
                    className={classes.removeHeuristic}
                    onClick={this.removeOverwriteHeuristics(sites, i, j)}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              ))}

              <Button
                variant="fab"
                mini
                color="secondary"
                aria-label="Add"
                className={classes.addHeuristic}
                onClick={this.addOverwriteHeuristics(sites, i)}
              >
                <AddIcon />
              </Button>
            </div>
            <TextField
              label="Pass heuristics condition"
              value={site.passHeuristicsCondition}
              onChange={this.handleChange(sites, i, (site, value) => ({
                ...site,
                passHeuristicsCondition: value
              }))}
              margin="normal"
              fullWidth
            />
            <IconButton
              color="secondary"
              aria-label="Remove site"
              className={classes.removeSite}
              onClick={this.removeSite(sites, i)}
            >
              <ClearIcon />
            </IconButton>
          </Paper>
        ))}
        <Button
          variant="fab"
          color="secondary"
          aria-label="Add site"
          className={classes.addSite}
          onClick={this.addSite(sites)}
        >
          <AddIcon />
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(ConfigForm);
