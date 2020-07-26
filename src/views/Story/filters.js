import React from 'react';
import { Select } from 'antd';

function Filters({ sortOptions, typeOptions, setFilterType, setSortType }) {

    const handleFilterChange = (e) => {
        setFilterType(e);
    }

    const handleSortChange = (e) => {
        setSortType(e);
    }

    return (
        <div className="flex justify-end">
            <Select onChange={handleSortChange} className="w-64 mr-2" placeholder="Sort By">
                {
                    sortOptions.map(elem => {
                        return (
                            <Select.Option key={elem.value} value={elem.value}>{elem.text}</Select.Option>
                        )
                    })
                }
            </Select>
            <Select onChange={handleFilterChange} className="w-64" placeholder="Story Type">
                {
                    typeOptions.map(elem => {
                        return (
                            <Select.Option key={elem.value} value={elem.value}>{elem.text}</Select.Option>
                        )
                    })
                }
            </Select>
        </div>
    )
}

export default Filters;