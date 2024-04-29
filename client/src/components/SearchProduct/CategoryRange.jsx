import React, { useState } from 'react';
import { Checkbox } from 'antd';

const CategoryRange = ({ setCategory, category}) => {
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(true);
    const onCheckAllChange = (e) => {
        setCategory(e.target.checked ? category : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    const onChange = (checkedValues) => {
        setCategory(checkedValues);
        setIndeterminate(!!checkedValues.length && checkedValues.length < category.length);
        setCheckAll(checkedValues.length === category.length);
    };

    return (
        <div className='categoryRange'>
        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Todas las categorias
        </Checkbox>
        <Checkbox.Group className='categoryRangeGroup' options={category} value={category} onChange={onChange} />
        </div>
    );
};

export default CategoryRange;
