import React, {Component, PropTypes} from 'react'
import {Pagination} from 'react-bootstrap';

const PagedTable = (ComposedComponent) => class extends Component {
    state = {
        currentPage: 1,
        pageSize: 5
    }

    handleSelect = (event, selectedEvent) =>
        this.setState({ currentPage: selectedEvent.eventKey })

    paginate(array) {
        const firstIndex = (this.state.currentPage - 1) * this.state.pageSize
        return array.slice(firstIndex, firstIndex + this.state.pageSize);
    }

    render = ({list} = this.props) => {
        const totalPages = Math.ceil(list.length / this.state.pageSize);
        const pagedList = this.paginate(this.props.list);

        return (
            <div>
                <ComposedComponent {...this.props} list={pagedList}/>

                <Pagination style={s.pagination} items={totalPages}
                            activePage={this.state.currentPage}
                            onSelect={this.handleSelect}/>
            </div>
        )
    }
}

const s = {
    pagination: {
        float: 'right'
    }
}

export default PagedTable
