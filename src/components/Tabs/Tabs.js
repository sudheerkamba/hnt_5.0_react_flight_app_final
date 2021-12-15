import React, { Component ,ReactPropTypes} from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import Button from '@restart/ui/esm/Button';
import './Tabs.css'
import HomePage from '../../HomePage';




class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }
   

  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.children[0].props.label
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }


  render() {
   

    const {

      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className="tabs">
        <ol className="tab-list">
        <div className="row">
          <div className="col-11">
          {children.map((child) => {
            const { label } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            );
          })}
         </div>
         <div className="col-1">
          <Button className="btn btn-outline-light" onClick={()=>
        <HomePage/>
          }>Logout</Button>
          </div>
          </div>
        </ol>
        
        <div className="tab-content">
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
