import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '~/components/button/Button';
import IconButtom from '~/components/icons/IconButtom';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Component = ({ children, title, subheader, actions, width, ...props }) => {
  const classes = useStyles();
  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', width }}>
      <Card className={classes.root} {...props}>
        {(!!title || !!subheader || !!actions.length) &&
          <CardHeader
            title={title}
            subheader={subheader}
            action={actions.map(({ component, icon, ...action }) => component || <IconButtom color="" size="small" {...action}>{icon}</IconButtom>)}
          />}
        <CardContent>
          {children}
        </CardContent>
        {/* <CardActions>
          {actions.map(({ component, label, ...action }) => component || <Button color="" size="small" {...action}>{label}</Button>)}
        </CardActions> */}
      </Card>
    </div>);
};

Component.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  subheader: PropTypes.string,
  actions: PropTypes.array,
  width: PropTypes.string,
};

Component.defaultProps = {
  title: undefined,
  subheader: undefined,
  actions: [],
  width: '100%',
};

export default Component;
