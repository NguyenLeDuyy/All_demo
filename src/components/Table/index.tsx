import React, { useState } from "react";
import { Table, Input, Button } from "antd";
import { title } from "process";
import { render } from "@testing-library/react";
import { isEditable } from "@testing-library/user-event/dist/utils";

const _Table = () => {

    const handleOnChange = (record: any, e: React.ChangeEvent<HTMLInputElement>) => {
        let index = data.findIndex(x => x.studentCode == record.studentCode);
        data[index].result = Number(e.currentTarget.value);
        let previous = data.slice(0, index);
        let after = data.slice(index + 1);
        setSearchData([...previous, data[index], ...after])
    }

    const columns = [
        { title: 'Mã số sinh viên', dataIndex: 'studentCode', key: 'studentCode' },
        { title: 'Họ và tên', dataIndex: 'studentName', key: 'studentName' },
        {
            title: 'Điểm kết thúc', dataIndex: 'result', key: 'result',
            render: (key: number, record: any, index: number) => {
                return (
                    <div>
                        {(!record.isEdited) ? <a onClick={() => {
                            let index = data.findIndex(x => x.studentCode == record.studentCode);
                            data[index].isEdited = true;
                            let previous = data.slice(0, index);
                            let after = data.slice(index + 1);
                            setSearchData([...previous, data[index], ...after])
                        }}>{record.result}</a>
                            : <input type="number" value={record.result}
                                onChange={(e) => {
                                    handleOnChange(record, e)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        let index = data.findIndex(x => x.studentCode === record.studentCode);
                                        data[index].result = Number(e.currentTarget.value);
                                        let previous = data.slice(0, index);
                                        let after = data.slice(index + 1);
                                        setSearchData([...previous, data[index], ...after])
                                    }
                                }}
                            ></input>}
                    </div>
                )
            }
        },
        { title: 'Quê quán', dataIndex: 'hometown', key: 'hometown' }
    ]

    const data = [
        {
            studentCode: '0909001', studentName: 'Lê Văn Thắng',
            result: 8, hometown: 'TPHCM', isEdited: false,
        },
        {
            studentCode: '0909003', studentName: 'Trần Minh Tâm',
            result: 7.5, hometown: 'Đồng Nai', isEdited: false,
        },
        {
            studentCode: '0909002', studentName: 'Lý Uyển Nhi',
            result: 8.6, hometown: 'TPHCM', isEdited: false,
        },
        {
            studentCode: '0909004', studentName: 'Trịnh Thị Thu Thảo',
            result: 6, hometown: 'Tiền Giang', isEdited: false,
        },
        {
            studentCode: '0909005', studentName: 'Lê Văn Thắng',
            result: 8, hometown: 'Khánh Hòa', isEdited: false,
        }
    ]

    const [searchData, setSearchData] = useState(data);
    const [searchText, setSearchText] = useState('');

    const [checkboxes, setCheckboxes] = useState({
        'TPHCM': false,
        'Đồng Nai': false,
        'Khánh Hòa': false,
        'Tiền Giang': false,
    });

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckboxes({
            ...checkboxes,
            [event.target.name]: event.target.checked,
        });
    };

    const handleClick = () => {
        const selectedLocations = Object.keys(checkboxes).filter((key) => checkboxes[key as keyof typeof checkboxes]);
        const filteredData = data.filter((item) => selectedLocations.includes(item.hometown));
        setSearchData(filteredData);
    };

    return (
        <>
            <div>
                <span>Tìm kiếm theo tên:</span>&nbsp;
                <Input type="text" value={searchText}
                    onChange={(e) => {
                        setSearchText(e.currentTarget.value);
                        setSearchData(data.filter(x => x.studentName.toUpperCase().includes(e.currentTarget.value.toUpperCase().trim())))
                    }}
                    onKeyPress={(e) => {
                        if (e.key == 'Enter') {
                            setSearchData(data.filter(x => x.studentName.toUpperCase().includes(searchText.toUpperCase().trim())))
                        }
                    }}></Input >
                {/* <input type="checkbox" name="All" onChange={handleCheckboxChange} />&nbsp;All&nbsp; */}
                <input type="checkbox" name="TPHCM" onChange={handleCheckboxChange} />&nbsp;TPHCM&nbsp;
                <input type="checkbox" name="Đồng Nai" onChange={handleCheckboxChange} />&nbsp;Đồng Nai&nbsp;
                <input type="checkbox" name="Khánh Hòa" onChange={handleCheckboxChange} />&nbsp;Khánh Hòa&nbsp;
                <input type="checkbox" name="Tiền Giang" onChange={handleCheckboxChange} />&nbsp;Tiền Giang&nbsp;
                <Button type="primary" onClick={handleClick}>Click me</Button>
                {/* <Button type="primary"
                    onClick={() => {
                        let index = data.findIndex(x => x.studentCode == '0909003');
                        data[index].result = 9;
                        let previous = data.slice(0, index);
                        let after = data.slice(index + 1);
                        setSearchData([...previous, data[index], ...after]);
                    }}
                >Click me</Button> */}
            </div>
            <div>
                <Table columns={columns} dataSource={searchData}></Table>
            </div>
        </>
    )
}
export default _Table;