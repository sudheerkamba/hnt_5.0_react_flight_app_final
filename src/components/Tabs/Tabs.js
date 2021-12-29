import React, { Component ,ReactPropTypes} from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import Button from '@restart/ui/esm/Button';
import './Tabs.css'
import HomePage from '../../HomePage';
import { BrowserRouter, Link } from 'react-router-dom';
import AdminLogin from '../../Admin/AdminLogin';
import { Logout } from '../common/Logout';




class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }
   

  constructor(props) {
    super(props);
    let def=null;
   console.log("vall: "+ this.props.defaultval)
    if(this.props.defaultval===null ||  this.props.defaultval===undefined || this.props.defaultval==='search'){
    this.state = {
      activeTab: this.props.children[1].props.label
    };}
    else if(this.props.defaultval==='book') {
      this.state = {
        activeTab: this.props.children[0].props.label
      };
    }
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
    
    this.def='search'
  }
onLogout=(e)=>{
  return
        
        <AdminLogin/>


}

  render() {
    console.log("def: "+this.def+"oncl: "+this.oncl+"def: "+this.props.defaultval)
    if(this.props.defaultval==='book' 
    && this.def!=='search'
    ) {
      this.state = {
        activeTab: this.props.children[0].props.label
      };
      this.def='search'
      
    }
    this.def='notsearch'
    
   


    const {
      onLogout,
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
         
            <Logout/>
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
