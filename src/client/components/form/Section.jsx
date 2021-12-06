import React from 'react';

const styles = {
  container: {
    border: '1px solid rgba(0,0,0,0.125)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    background: '#FFF',
    marginBottom: 16,
  },
  header: {
    padding: 12,
    // borderBottom: '1px solid rgba(0,0,0,0.125)',
    // color: '#212529',
    // color: '#878787',
    fontSize: 15,
    background: '#f1f1f1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  body: {
    padding: 20,
  },


};
const Section = ({ children, title, ...props }) => (
  <div style={styles.container}>
    <div style={styles.header}>{title}</div>
    <div style={styles.body}>
      {children}
    </div>
  </div>
);

Section.defaultProps = {
};

export default Section;
