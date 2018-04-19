import React, { Component } from 'react';
import { TableBody, TableColumn, TableHeader, TableRow, DataTable, Button } from 'react-md';

class BaseTable extends Component {

    renderHeaders(list) {
        return list.map(item => <TableColumn>{item}</TableColumn>)
    }

    renderBody(dataList, headerList) {
        return dataList.map((item, i) => <TableRow key={item.id}>
            {headerList.map(header => { return <TableColumn >{item[header]}</TableColumn> })}
            <TableColumn><Button onClick={()=>this.props.onView(item.id)} icon > view  </Button> <Button icon onClick={() => this.props.onEdit(item.id)} > edit  </Button> <Button icon onClick={() => this.props.onDelete(item.id)}> delete  </Button></TableColumn>
        </TableRow>)
    }

    render() {

        const {headerList, dataList} = this.props;

        return (
            <DataTable plain>
                <TableHeader>
                    <TableRow>
                        {this.renderHeaders(headerList)}
                        <TableColumn>actions</TableColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.renderBody(dataList, headerList)}
                </TableBody>
            </DataTable >
        );
    }
}

export default BaseTable;
