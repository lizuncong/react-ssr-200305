import React from 'react';

class CommonLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <div>common layout</div>
        { children }
      </div>
    );
  }
}

export default CommonLayout;
