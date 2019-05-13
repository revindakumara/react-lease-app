import React from 'react';
import { connect } from "react-redux";
import { getAllLeases } from "../actions/action";
import MainList from '../components/MainList';

class Home extends React.Component {
    componentDidMount() {
        const { getAllLeases } = this.props;
        getAllLeases()
    }

    render() {
        const { all_leases } = this.props;
        return (
            <div className="App" >
                <br />
                <br />
                <br />
                <center>
                    {all_leases.map(row =>
                        <MainList data={row} />
                    )}
                </center>


            </div >
        );
    }
}

const mapStateToProps = ({ all_leases }) => {


    return { all_leases };
};

const mapActionsToProps = {
    getAllLeases
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Home);
